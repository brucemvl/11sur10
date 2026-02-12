const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};
const previousEvents = {};
const finishedMatches = {};
const penaltyNotified = {};

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

function pickRandom(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

// 🌟 Version combinée et optimisée
async function refreshAndCheckMatches() {
  const currentLiveMatchIds = new Set();

  try {
    // 1️⃣ Récupérer les équipes suivies + tokens
    const tokenGroups = await PushToken.aggregate([
      { $unwind: "$teamIds" },
      { $group: { _id: "$teamIds", tokens: { $push: "$token" } } }
    ]);

    if (!tokenGroups.length) return;

    const tokensByTeam = Object.fromEntries(tokenGroups.map(g => [String(g._id), g.tokens]));
    const followedTeamIds = new Set(tokenGroups.map(g => Number(g._id)).filter(Boolean));

    // 2️⃣ Appel API unique pour tous les matchs live
    const { data } = await axios.get(
      'https://v3.football.api-sports.io/fixtures?live=all',
      {
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );

    const liveMatches = data.response;

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

      // 3️⃣ Vérifier si cette équipe est suivie
      const tokens = [];
      if (followedTeamIds.has(homeTeamId)) tokens.push(...(tokensByTeam[homeTeamId] || []));
      if (followedTeamIds.has(awayTeamId)) tokens.push(...(tokensByTeam[awayTeamId] || []));
      const uniqueTokens = Array.from(new Set(tokens));
      if (!uniqueTokens.length) continue;

      // 4️⃣ Match terminé
      if (['FT', 'AET', 'PEN'].includes(status) && !finishedMatches[matchId]) {
        let bodyMessage = `Score final : ${homeTeamName} ${homeGoals} - ${awayGoals} ${awayTeamName}`;
        if (status === 'PEN') {
          let winner = homeGoals > awayGoals ? homeTeamName : awayGoals > homeGoals ? awayTeamName : null;
          if (winner) bodyMessage = `🏆 Vainqueur aux tirs au but : ${winner} ! (${homeGoals}-${awayGoals})`;
        }

        await sendPushNotification(uniqueTokens, {
          title: '⏱️ Match terminé',
          body: bodyMessage,
          data: { screen: 'FicheMatch', matchId },
        });

        finishedMatches[matchId] = true;
        delete previousScores[matchId];
        delete penaltyNotified[matchId];
        Object.keys(previousEvents).forEach(key => key.startsWith(`${matchId}-`) && delete previousEvents[key]);
        continue;
      }

      // 5️⃣ Pénalty
      if (status === 'P' && !penaltyNotified[matchId]) {
        await sendPushNotification(uniqueTokens, {
          title: '🎯 Tirs au but',
          body: `${homeTeamName} vs ${awayTeamName} – place aux penalties !`,
          data: { screen: 'FicheMatch', matchId },
        });
        penaltyNotified[matchId] = true;
      }

      // 6️⃣ Match en cours : buts, égalisations, VAR
      if (['1H', '2H', 'HT', 'ET'].includes(status)) {
        const prev = previousScores[matchId] || { home: null, away: null };
        const scoreChanged = prev.home !== homeGoals || prev.away !== awayGoals;

        if (scoreChanged && !(prev.home === null && homeGoals === 0 && awayGoals === 0)) {
          const prevTotal = (prev.home ?? 0) + (prev.away ?? 0);
          const currentTotal = homeGoals + awayGoals;

          if (currentTotal < prevTotal) {
            await sendPushNotification(uniqueTokens, {
              title: `${homeTeamName} ${homeGoals} - ${awayGoals} ${awayTeamName}`,
              body: '❌ VAR - But annulé !',
              data: { screen: 'FicheMatch', matchId },
            });
          } else {
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
          }

previousScores[matchId] = {
  home: homeGoals,
  away: awayGoals,
  homeTeamId,
  awayTeamId,
};
        }

        // 7️⃣ Événements spécifiques
        for (const event of match.events || []) {
          const { player, team, time, type, detail } = event;
          if (!player?.name || !team?.name) continue;

          const eventKey = `${matchId}-${type}-${detail || ''}-${team.name}-${player.name}`.toLowerCase();
          if (previousEvents[eventKey]) continue;

          const minute = time?.elapsed ?? '?';
          let body = null;
          if (type === 'Goal') {
            body = `⚽ ${minute}e - But de ${player.name} (${teamNameNotif[team.name] || team.name})`;
            if (detail === 'Own Goal') body = `😱 ${minute}e - CSC de ${player.name}`;
            if (detail === 'Penalty') body = `⚽ ${minute}e - ${player.name} marque sur penalty`;
            if (detail === 'Missed Penalty') body = `❌ ${minute}e - Penalty raté de ${player.name}`;
          } else if (type === 'Card' && detail === 'Red Card') {
            body = `🟥 ${minute}e - Carton rouge pour ${player.name}`;
          }

          if (body) {
            await sendPushNotification(uniqueTokens, {
              title: `${homeTeamName} ${homeGoals} - ${awayGoals} ${awayTeamName}`,
              body,
              data: { matchId },
            });
            previousEvents[eventKey] = true;
          }
        }
      }
    }

for (const matchId of Object.keys(previousScores))
    if (!currentLiveMatchIds.has(Number(matchId)) && !finishedMatches[matchId]) {

      const matchData = previousScores[matchId];
if (!matchData) continue;

const { homeTeamId, awayTeamId, home, away } = matchData;

const tokens = [];
if (tokensByTeam[homeTeamId]) tokens.push(...tokensByTeam[String(homeTeamId)]);
if (tokensByTeam[awayTeamId]) tokens.push(...tokensByTeam[String(awayTeamId)]);

const uniqueTokens = Array.from(new Set(tokens));
if (!uniqueTokens.length) continue;

await sendPushNotification(uniqueTokens, {
  title: '⏱️ Match terminé',
  body: `Score final : ${home} - ${away}`,
  data: { matchId },
});

    finishedMatches[matchId] = true;
    delete previousScores[matchId];
  }
}

  } catch (err) {
    console.error('❌ Erreur dans refreshAndCheckMatches:', err.message);
  }
}

// 🕓 Cron job toutes les 15 sec
cron.schedule('*/15 * * * * *', refreshAndCheckMatches);

// ▶️ Démarrage initial
(async () => {
  await refreshAndCheckMatches();
})();