require('dotenv').config();

const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};
const previousEvents = {};
const finishedMatches = {};
const penaltyNotified = {};
const extraTimeNotified = {};
const lastNotificationSent = {};

let activeMatches = [];

const NOTIF_COOLDOWN = 60 * 1000; // 1 minute anti-spam
const TOKEN_CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

let tokensByTeamCache = {};
let followedTeamIdsCache = new Set();
let lastTokenRefresh = 0;

const teamNameNotif = {
  "Morocco": "Maroc",
  "Ivory Coast": "Cote d'Ivoire",
  "Algeria": "Algerie",
  "Paris Saint Germain": "Paris SG",
  "Barcelona": "FC Barcelone",
  "Central African Republic": "Centrafrique",
  "Cape Verde Islands": "Cap Vert",
};

const scoreMessages = {
  opening: [
    team => `⚽ ${team} ouvre le score !`,
    team => `⚽ Ouverture du score pour ${team} !`,
    team => `⚽ Premier but du match pour ${team} !`,
  ],
  equalizer: [
    team => `⚽ Égalisation de ${team} !`,
    team => `⚽ ${team} remet les compteurs à zéro !`,
    team => `⚽ ${team} revient au score !`,
  ],
};

// -----------------------------
// Utils
// -----------------------------
function pickRandom(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

// Refresh cache tokens toutes les 2 min
async function refreshTokenCacheIfNeeded() {
  const now = Date.now();
  if (now - lastTokenRefresh < TOKEN_CACHE_DURATION) return;

  const tokenGroups = await PushToken.aggregate([
    { $unwind: "$teamIds" },
    { $group: { _id: "$teamIds", tokens: { $push: "$token" } } }
  ]);

  tokensByTeamCache = Object.fromEntries(
    tokenGroups.map(g => [String(g._id), Array.from(new Set(g.tokens))])
  );

  followedTeamIdsCache = new Set(tokenGroups.map(g => Number(g._id)).filter(Boolean));
  lastTokenRefresh = now;

  console.log(`🔄 Token cache refreshed, ${followedTeamIdsCache.size} équipes suivies`);
}

// -----------------------------
// Refresh des matchs actifs
// -----------------------------
async function refreshActiveMatches() {
  try {
    console.log("🔄 Rafraîchissement des matchs à suivre...");
    activeMatches = activeMatches.filter(m => !finishedMatches[m.matchId]);

    await refreshTokenCacheIfNeeded();

    

     const { data } = await axios.get(
  `https://v3.football.api-sports.io/fixtures?live=all`,
  {
    headers: {
      'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io',
    },
  }
);

const liveMatches = (data.response || []).filter(m =>
  ['1H', '2H', 'HT', 'ET', 'P'].includes(m.fixture.status.short)
);

liveMatches.forEach(match => {
  const homeId = match.teams.home.id;
  const awayId = match.teams.away.id;

  const followedTeams = [homeId, awayId].filter(id =>
    followedTeamIdsCache.has(id)
  );

  if (!followedTeams.length) return;

  const existing = activeMatches.find(m => m.matchId === match.fixture.id);

  if (existing) {
    followedTeams.forEach(id => existing.teamIds.add(id));
  } else {
    activeMatches.push({
      matchId: match.fixture.id,
      teamIds: new Set(followedTeams)
    });
  }
});

    

    console.log(`✅ ${activeMatches.length} match(s) actif(s) à surveiller.`);
  } catch (err) {
    console.error('❌ Erreur refreshActiveMatches:', err.message);
  }
}

// -----------------------------
// Vérification des scores et événements
// -----------------------------
async function checkMatchScore() {
  try {
    if (!activeMatches.length) {
      console.log("⏸️ Aucun match actif à surveiller.");
      return;
    }

    await refreshTokenCacheIfNeeded();

    const matchTokens = {};
    for (const { matchId, teamIds } of activeMatches) {
  if (!matchTokens[matchId]) matchTokens[matchId] = new Set();

  for (const teamId of teamIds) {
    (tokensByTeamCache[teamId] || []).forEach(t =>
      matchTokens[matchId].add(t)
    );
  }
}

    for (const matchId of Object.keys(matchTokens)) {
      const tokens = Array.from(matchTokens[matchId]);
      if (!tokens.length) continue;

      const { data } = await axios.get(
        `https://v3.football.api-sports.io/fixtures?id=${matchId}`,
        { headers: { 'x-rapidapi-key': process.env.FOOTBALL_API_KEY, 'x-rapidapi-host': 'v3.football.api-sports.io' } }
      );

      const match = data.response?.[0];
      if (!match) continue;

      const status = match.fixture.status.short;
      const homeTeam = teamNameNotif[match.teams.home.name] || match.teams.home.name;
      const awayTeam = teamNameNotif[match.teams.away.name] || match.teams.away.name;
      const homeGoals = match.goals.home ?? 0;
      const awayGoals = match.goals.away ?? 0;

      // 🎯 Tirs au but
      if (status === 'P' && !penaltyNotified[matchId]) {
        await sendPushNotification(tokens, {
          title: '🎯 Tirs au but',
          body: `${homeTeam} vs ${awayTeam} – place aux penalties !`,
          data: { screen: 'FicheMatch', matchId },
        });
        penaltyNotified[matchId] = true;
      }

      // ⏱️ Match terminé
      if (['FT','AET','PEN'].includes(status) && !finishedMatches[matchId]) {
        let bodyMessage = `Score final : ${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`;
        if (status==='PEN') {
          const homePen = match.score?.penalty?.home ?? 0;
          const awayPen = match.score?.penalty?.away ?? 0;
          const winner = homePen > awayPen ? homeTeam : (awayPen > homePen ? awayTeam : null);
          bodyMessage = `🏆 ${winner} remporte la séance de tirs au but (${homePen}-${awayPen}) !`;
        }
        if (status==='AET') {
          bodyMessage = `⏳ Victoire après prolongations\n${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`;
        }

        await sendPushNotification(tokens, {
          title: '⏱️ Match terminé',
          body: bodyMessage,
          data: { screen: 'FicheMatch', matchId },
        });

        finishedMatches[matchId] = true;
        delete previousScores[matchId];
        delete penaltyNotified[matchId];
        delete extraTimeNotified[matchId];
        Object.keys(previousEvents).forEach(k => { if(k.startsWith(`${matchId}-`)) delete previousEvents[k]; });
        activeMatches = activeMatches.filter(m => m.matchId !== matchId);
        continue;
      }

      // 🔹 Match en cours
      if (!['1H','2H','HT','ET'].includes(status)) continue;

      const prev = previousScores[matchId] ?? { home: null, away: null };
      const scoreChanged = prev.home !== homeGoals || prev.away !== awayGoals;
      if (scoreChanged && !(prev.home===null && homeGoals===0 && awayGoals===0)) {
        const prevTotal = (prev.home??0) + (prev.away??0);
        const currentTotal = homeGoals + awayGoals;
        let message = `⚽ Nouveau score : ${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`;

        if (prevTotal===0 && currentTotal===1) {
          const scorer = homeGoals > awayGoals ? homeTeam : awayTeam;
          message = pickRandom(scoreMessages.opening)(scorer);
        } else if (currentTotal > prevTotal && homeGoals === awayGoals) {
          const equalizer = homeGoals > prev.home ? homeTeam : awayTeam;
          message = pickRandom(scoreMessages.equalizer)(equalizer);
        }

        const notifKey = `${matchId}-${homeGoals}-${awayGoals}`;
        const now = Date.now();
        if (!lastNotificationSent[notifKey] || now - lastNotificationSent[notifKey] >= NOTIF_COOLDOWN) {
          await sendPushNotification(tokens, {
            title: `${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`,
            body: message,
            data: { screen: 'FicheMatch', matchId },
          });
          lastNotificationSent[notifKey] = now;
        }

        previousScores[matchId] = { home: homeGoals, away: awayGoals };
      }

      // 🧾 Événements (buts, rouges)
      for (const event of match.events || []) {
        const { player, team, time, type, detail } = event;
        if (!player?.name || !team?.name) continue;

        const eventKey = `${matchId}-${type}-${detail||''}-${team.id}-${player.id}`.toLowerCase();
        if (previousEvents[eventKey]) continue;

        const minute = time?.elapsed ?? '?';
        let body = null;
        if (type==='Goal') {
          body = `⚽ ${minute}e - But de ${player.name} (${teamNameNotif[team.name]||team.name})`;
          if(detail==='Own Goal') body = `😱 ${minute}e - CSC de ${player.name}`;
          if(detail==='Penalty') body = `⚽ ${minute}e - ${player.name} marque sur penalty`;
          if(detail==='Missed Penalty') body = `❌ ${minute}e - Penalty raté de ${player.name}`;
        }
        if(type==='Card' && detail==='Red Card') body = `🟥 ${minute}e - Carton rouge pour ${player.name}`;

        if(body) {
          await sendPushNotification(tokens, {
            title: `${homeTeam} ${homeGoals} - ${awayGoals} ${awayTeam}`,
            body,
            data: { screen: 'FicheMatch', matchId },
          });
          previousEvents[eventKey] = true;
        }
      }
    }

    console.log("✅ Matchs mis à jour");
  } catch(err) {
    console.error('❌ Erreur checkMatchScore:', err.message);
  }
}

// -----------------------------
// Cron jobs
// -----------------------------
cron.schedule('*/5 * * * *', refreshActiveMatches);      // Rafraîchit tous les 5 min
cron.schedule('*/30 * * * * *', checkMatchScore);       // Vérifie toutes les 30 sec

// ▶️ Démarrage initial
(async () => {
  await refreshActiveMatches();
  setTimeout(() => checkMatchScore(), 10000);
})();