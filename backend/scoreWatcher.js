const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};
const previousEvents = {};
let activeMatches = [];

const teamNameNotif = {
  "Morocco": "Maroc",
  "Ivory Coast": "Cote d'Ivoire",
  "Algeria": "Algerie",
  "Paris Saint Germain": "Paris SG",
  "Barcelona": "FC Barcelone",
  "Central African Republic": "Centrafrique",
  "Cape Verde Islands": "Cap Vert",
  "Tunisia": "Tunisie",
  "Manchester United": "Manchester Utd",
  "Manchester City": "Man City"
};

const scoreMessages = {
  opening: [
    (team) => `⚽ ${team} ouvre le score !`,
    (team) => `⚽ Ouverture du score pour ${team} !`,
    (team) => `⚽ Premier but du match pour ${team} !`,
  ],
  equalizer: [
    (team) => `⚽ Égalisation de ${team} !`,
    (team) => `⚽ ${team} remet les compteurs à zéro !`,
    (team) => `⚽ ${team} revient au score !`,
  ],
  scoreUpdate: [
    (home, away, h, a) => `⚽ Nouveau score : ${home} ${h} - ${a} ${away}`,
  ],
};

function pickRandom(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

// 🔁 Rafraîchit la liste des matchs à suivre
async function refreshActiveMatches() {
  try {
    console.log("🔄 Rafraîchissement des matchs à suivre...");
    activeMatches = [];

    const groupedTokens = await PushToken.aggregate([
      { $group: { _id: '$teamId', tokens: { $push: '$token' } } }
    ]);

    for (const { _id: teamId } of groupedTokens) {
      if (!teamId) continue;

      const { data } = await axios.get(
        `https://v3.football.api-sports.io/fixtures?team=${teamId}&next=5`,
        {
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        }
      );

      const matches = data.response || [];
      const liveMatches = matches.filter(match =>
        ['1H', '2H', 'HT', 'ET', 'P'].includes(match.fixture.status.short)
      );

      liveMatches.forEach(match => {
        activeMatches.push({ matchId: match.fixture.id, teamId });
      });
    }

    activeMatches = Array.from(
      new Map(activeMatches.map(m => [`${m.matchId}-${m.teamId}`, m])).values()
    );

    console.log(`✅ ${activeMatches.length} match(s) actif(s) à surveiller.`);
  } catch (err) {
    console.error('❌ Erreur refreshActiveMatches:', err.message);
  }
}

// ✅ CHECK MATCHS (CORRIGÉ)
async function checkMatchScore() {
  try {
    if (activeMatches.length === 0) {
      console.log("⏸️ Aucun match actif à surveiller.");
      return;
    }

    console.log("🎯 Liste des matchs actifs :", activeMatches);

    // 🔑 Tokens par team
    const tokenGroups = await PushToken.aggregate([
      { $group: { _id: '$teamId', tokens: { $push: '$token' } } }
    ]);
    const tokensByTeam = Object.fromEntries(
      tokenGroups.map(g => [String(g._id), g.tokens])
    );

    // 🔑 NOUVEAU : tokens regroupés PAR MATCH
    const matchTokens = {};
    for (const { matchId, teamId } of activeMatches) {
      const tokens = tokensByTeam[teamId] || [];
      if (!matchTokens[matchId]) matchTokens[matchId] = new Set();
      tokens.forEach(t => matchTokens[matchId].add(t));
    }

    // 🔁 UNE SEULE BOUCLE PAR MATCH
    for (const matchId of Object.keys(matchTokens)) {
      const tokens = Array.from(matchTokens[matchId]);

      const { data } = await axios.get(
        `https://v3.football.api-sports.io/fixtures?id=${matchId}`,
        {
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        }
      );

      const match = data.response[0];
      if (!match) continue;

      const homeTeam = match.teams.home.name;
const awayTeam = match.teams.away.name;
const currentHomeGoals = match.goals.home;
const currentAwayGoals = match.goals.away;

const statusShort = match.fixture.status.short;
const statusLong = match.fixture.status.long;


// ✅ MATCH TERMINÉ (FT)
if (statusShort === 'FT') {
  await sendPushNotification(tokens, {
    title: `⏱️ Match terminé`,
    body: `Score final : ${homeTeam} ${currentHomeGoals} - ${currentAwayGoals} ${awayTeam}`,
    data: { screen: 'FicheMatch', matchId },
  });

  // ⛔ On arrête de suivre ce match
  activeMatches = activeMatches.filter(m => m.matchId !== matchId);
  continue;
}

// ⛔ Ignorer ce qui n'est pas en cours
if (!['1H', '2H', 'HT', 'ET'].includes(statusShort)) continue;


      const prevScore = previousScores[matchId] || { home: null, away: null };

      if (
        (prevScore.home !== currentHomeGoals ||
          prevScore.away !== currentAwayGoals) &&
        !(prevScore.home === null && currentHomeGoals === 0 && currentAwayGoals === 0)
      ) {
        const home = teamNameNotif[homeTeam] || homeTeam;
        const away = teamNameNotif[awayTeam] || awayTeam;

        let scoreMsg = pickRandom(scoreMessages.scoreUpdate)(
          home,
          away,
          currentHomeGoals,
          currentAwayGoals
        );

        const prevTotal = (prevScore.home ?? 0) + (prevScore.away ?? 0);
        const currentTotal = currentHomeGoals + currentAwayGoals;

        if ((prevScore.home === 0 && prevScore.away === 0) && currentTotal === 1) {
          const scoringTeam =
            currentHomeGoals > currentAwayGoals ? home : away;
          scoreMsg = pickRandom(scoreMessages.opening)(scoringTeam);
        }

        if (currentTotal > prevTotal && currentHomeGoals === currentAwayGoals) {
          const equalizingTeam =
            currentHomeGoals > prevScore.home ? home : away;
          scoreMsg = pickRandom(scoreMessages.equalizer)(equalizingTeam);
        }

        await sendPushNotification(tokens, {
          title: `${home} ${currentHomeGoals} - ${currentAwayGoals} ${away}`,
          body: scoreMsg,
          data: { screen: 'FicheMatch', matchId },
        });

        previousScores[matchId] = {
          home: currentHomeGoals,
          away: currentAwayGoals,
        };
      }

      // 🔔 EVENTS
      for (const event of match.events || []) {
        const { player, team, time, type, detail } = event;
        if (!player?.name || !team?.name) continue;

        const key = `${matchId}-${type}-${detail || ''}-${team.name}-${player.name}`;
        if (previousEvents[key]) continue;

        const minute = time?.elapsed ?? '?';
        const teamName = teamNameNotif[team.name] || team.name;

        if (type === 'Goal') {
          let msg = `⚽ ${minute}e - But de ${player.name} pour ${teamName}`;
          if (detail === 'Own Goal') msg = `😱 ${minute}e - CSC de ${player.name}`;
          if (detail === 'Penalty') msg = `⚽ ${minute}e - Penalty de ${player.name}`;

          await sendPushNotification(tokens, {
            title: `${homeTeam} ${currentHomeGoals} - ${currentAwayGoals} ${awayTeam}`,
            body: msg,
            data: { screen: 'FicheMatch', matchId },
          });
        }

        if (type === 'Card' && detail === 'Red Card') {
          await sendPushNotification(tokens, {
            title: `${homeTeam} vs ${awayTeam}`,
            body: `🟥 ${minute}e - Carton rouge pour ${player.name} (${teamName})`,
            data: { screen: 'FicheMatch', matchId },
          });
        }

        previousEvents[key] = true;
      }

     
    }
  } catch (err) {
    console.error('❌ Erreur checkMatchScore:', err.message);
  }
}

// ⏱️ CRON
cron.schedule('*/5 * * * *', refreshActiveMatches);
cron.schedule('*/30 * * * * *', checkMatchScore);

// ▶️ START
(async () => {
  await refreshActiveMatches();
  setTimeout(checkMatchScore, 10000);
})();