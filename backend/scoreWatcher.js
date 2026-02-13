require('dotenv').config();

const lastNotificationSent = {};
const NOTIF_COOLDOWN = 60 * 1000; // 1 minute anti spam

let tokensByTeamCache = {};
let followedTeamIdsCache = new Set();
let lastTokenRefresh = 0;
const TOKEN_CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};
const previousEvents = {};
const finishedMatches = {};
const penaltyNotified = {};
const extraTimeNotified = {};

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

async function refreshTokenCacheIfNeeded() {
  const now = Date.now();

  if (now - lastTokenRefresh < TOKEN_CACHE_DURATION) {
    return; // cache encore valide
  }

  const tokenGroups = await PushToken.aggregate([
    { $unwind: "$teamIds" },
    { $group: { _id: "$teamIds", tokens: { $push: "$token" } } }
  ]);

  tokensByTeamCache = Object.fromEntries(
    tokenGroups.map(g => [String(g._id), g.tokens])
  );

  followedTeamIdsCache = new Set(
    tokenGroups.map(g => Number(g._id)).filter(Boolean)
  );

  lastTokenRefresh = now;

  console.log("🔄 Token cache refreshed");
}

function pickRandom(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

// 🌟 Version combinée et optimisée
async function refreshAndCheckMatches() {
  const currentLiveMatchIds = new Set();

  try {
    await refreshTokenCacheIfNeeded();

    const tokensByTeam = tokensByTeamCache;
    const followedTeamIds = followedTeamIdsCache;

    if (!Object.keys(tokensByTeam).length) return;

    if (!process.env.FOOTBALL_API_KEY) {
      console.error("❌ FOOTBALL_API_KEY manquante !");
      return;
    }

    const response = await axios.get(
      'https://v3.football.api-sports.io/fixtures?live=all',
      {
        headers: {
          'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );

    const liveMatches = response.data.response;

    for (const match of liveMatches) {
      const matchId = match.fixture.id;
      currentLiveMatchIds.add(matchId);

      const homeTeamId = match.teams.home.id;
      const awayTeamId = match.teams.away.id;
      const homeTeamName = teamNameNotif[match.teams.home.name] || match.teams.home.name;
      const awayTeamName = teamNameNotif[match.teams.away.name] || match.teams.away.name;
      const homeGoals = match.goals.home ?? 0;
      const awayGoals = match.goals.away ?? 0;
      const status = match.fixture.status.short;

      // 🕒 Début des prolongations
if (status === 'ET' && !extraTimeNotified[matchId]) {

  await sendPushNotification(uniqueTokens, {
    title: '⏳ Prolongations',
    body: `${homeTeamName} ${homeGoals} - ${awayGoals} ${awayTeamName}\nDébut des prolongations !`,
    data: { screen: 'FicheMatch', matchId },
  });

  extraTimeNotified[matchId] = true;
}

// 🎯 Début des tirs au but
if (status === 'P' && !penaltyNotified[matchId]) {

  await sendPushNotification(uniqueTokens, {
    title: '🎯 Tirs au but',
    body: `${homeTeamName} vs ${awayTeamName}\nPlace aux penalties !`,
    data: { screen: 'FicheMatch', matchId },
  });

  penaltyNotified[matchId] = true;
}

      const tokens = [];
      if (followedTeamIds.has(homeTeamId)) tokens.push(...(tokensByTeam[homeTeamId] || []));
      if (followedTeamIds.has(awayTeamId)) tokens.push(...(tokensByTeam[awayTeamId] || []));
      const uniqueTokens = Array.from(new Set(tokens));
      if (!uniqueTokens.length) continue;

      const now = Date.now();
      const notifKey = `${matchId}-${homeGoals}-${awayGoals}`;

      if (lastNotificationSent[notifKey] && now - lastNotificationSent[notifKey] < NOTIF_COOLDOWN) {
        continue; // Anti spam
      }

      // MATCH TERMINÉ
     if (['FT', 'AET', 'PEN'].includes(status) && !finishedMatches[matchId]) {

  let bodyMessage = `Score final : ${homeTeamName} ${homeGoals} - ${awayGoals} ${awayTeamName}`;

  // 🏆 Victoire aux tirs au but
  if (status === 'PEN') {

    const homePen = match.score?.penalty?.home ?? 0;
    const awayPen = match.score?.penalty?.away ?? 0;

    let winner = null;
    if (homePen > awayPen) winner = homeTeamName;
    if (awayPen > homePen) winner = awayTeamName;

    bodyMessage = `🏆 ${winner} remporte la séance de tirs au but (${homePen}-${awayPen}) !`;
  }

  // 🕒 Victoire après prolongations
  if (status === 'AET') {
    bodyMessage = `⏳ Victoire après prolongations\n${homeTeamName} ${homeGoals} - ${awayGoals} ${awayTeamName}`;
  }

  await sendPushNotification(uniqueTokens, {
    title: '⏱️ Match terminé',
    body: bodyMessage,
    data: { screen: 'FicheMatch', matchId },
  });

  finishedMatches[matchId] = true;

  delete previousScores[matchId];
  delete previousEvents[matchId];
  delete penaltyNotified[matchId];
  delete extraTimeNotified[matchId];

  continue;
}

      // MATCH EN COURS
      if (['1H', '2H', 'HT', 'ET'].includes(status)) {

        const prev = previousScores[matchId] || { home: null, away: null };
        const scoreChanged = prev.home !== homeGoals || prev.away !== awayGoals;

if (
  scoreChanged &&
  !(prev.home === null && homeGoals === 0 && awayGoals === 0)
) {
          const prevTotal = (prev.home ?? 0) + (prev.away ?? 0);
          const currentTotal = homeGoals + awayGoals;

          let message = `⚽ Nouveau score : ${homeTeamName} ${homeGoals} - ${awayGoals} ${awayTeamName}`;

          if (prevTotal === 0 && currentTotal === 1) {
            const scorer = homeGoals > awayGoals ? homeTeamName : awayTeamName;
            message = pickRandom(scoreMessages.opening)(scorer);
          } else if (currentTotal > prevTotal && homeGoals === awayGoals) {
            const equalizer = homeGoals > prev.home ? homeTeamName : awayTeamName;
            message = pickRandom(scoreMessages.equalizer)(equalizer);
          }

          await sendPushNotification(uniqueTokens, {
            title: `${homeTeamName} ${homeGoals} - ${awayGoals} ${awayTeamName}`,
            body: message,
            data: { screen: 'FicheMatch', matchId },
          });

          lastNotificationSent[notifKey] = now;

          previousScores[matchId] = {
            home: homeGoals,
            away: awayGoals,
            homeTeamId,
            awayTeamId,
          };

          for (const event of match.events || []) {

  const { player, team, time, type, detail } = event;
  if (!player?.name || !team?.name) continue;

  const eventKey = `${matchId}-${type}-${detail || ''}-${team.id}-${player.id}`.toLowerCase();
  if (previousEvents[eventKey]) continue;

  const minute = time?.elapsed ?? '?';
  let body = null;

  if (type === 'Goal') {
    body = `⚽ ${minute}e - But de ${player.name} (${teamNameNotif[team.name] || team.name})`;

    if (detail === 'Own Goal')
      body = `😱 ${minute}e - CSC de ${player.name}`;

    if (detail === 'Penalty')
      body = `⚽ ${minute}e - ${player.name} marque sur penalty`;

    if (detail === 'Missed Penalty')
      body = `❌ ${minute}e - Penalty raté de ${player.name}`;
  }

  if (type === 'Card' && detail === 'Red Card') {
    body = `🟥 ${minute}e - Carton rouge pour ${player.name}`;
  }

  if (body) {
    await sendPushNotification(uniqueTokens, {
      title: `${homeTeamName} ${homeGoals} - ${awayGoals} ${awayTeamName}`,
      body,
      data: { screen: 'FicheMatch', matchId },
    });

    previousEvents[eventKey] = true;
    console.log(`📲 Événement envoyé : ${body}`);
  }
}

        }
      }
    }

    console.log("✅ Matchs mis à jour");

  } catch (err) {
    if (err.response) {
      console.error("❌ API Error:", err.response.status, err.response.data);
    } else {
      console.error("❌ Erreur:", err.message);
    }
  }
}

// 🕓 Cron job toutes les 25 sec
cron.schedule('*/25 * * * * *', refreshAndCheckMatches);

// ▶️ Démarrage initial
(async () => {
  await refreshAndCheckMatches();
})();