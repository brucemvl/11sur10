const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};
const previousEvents = {};
let activeMatches = [];

// 🔁 Rafraîchit la liste des matchs à suivre toutes les 30 minutes
async function refreshActiveMatches() {
  try {
    console.log("🔄 Rafraîchissement des matchs à suivre...");
    activeMatches = [];

    const groupedTokens = await PushToken.aggregate([
      { $group: { _id: '$teamId', tokens: { $push: '$token' } } }
    ]);

    const now = new Date();

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

      const matches = data.response;

      for (const match of matches) {
        const start = new Date(match.fixture.date);
        const diff = Math.abs(start - now) / 60000;

        if (diff <= 120) {
          activeMatches.push({ matchId: match.fixture.id, teamId });
        }
      }
    }

    console.log(`✅ ${activeMatches.length} match(s) à surveiller.`);
  } catch (err) {
    console.error('❌ Erreur dans refreshActiveMatches:', err.message);
  }
}

// ✅ Vérifie les scores des matchs en direct
async function checkMatchScore() {
  try {
    if (activeMatches.length === 0) {
      console.log("⏸️ Aucun match actif à surveiller.");
      return;
    }

    const tokenGroups = await PushToken.aggregate([
      { $group: { _id: '$teamId', tokens: { $push: '$token' } } }
    ]);
    const tokensByTeam = Object.fromEntries(tokenGroups.map(g => [String(g._id), g.tokens]));

    const teamMatches = {};
    for (const { matchId, teamId } of activeMatches) {
      if (!teamMatches[teamId]) teamMatches[teamId] = [];
      teamMatches[teamId].push(matchId);
    }

    for (const teamId of Object.keys(teamMatches)) {
      const matchIds = teamMatches[teamId];
      const tokens = tokensByTeam[teamId] || [];

      for (const matchId of matchIds) {
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

        const status = match.fixture.status.short;
        if (!['1H', '2H', 'ET'].includes(status)) continue; // Vérifie que le match est en cours

        const homeTeam = match.teams.home.name;
        const awayTeam = match.teams.away.name;
        const currentHomeGoals = match.goals.home;
        const currentAwayGoals = match.goals.away;

        const prevScore = previousScores[matchId] || { home: null, away: null };

        if (prevScore.home !== currentHomeGoals || prevScore.away !== currentAwayGoals) {
          const scoreMsg = `⚽ Nouveau score : ${homeTeam} ${currentHomeGoals} - ${currentAwayGoals} ${awayTeam}`;
          console.log(scoreMsg);

          await sendPushNotification(tokens, {
            title: `${homeTeam} vs ${awayTeam}`,
            body: scoreMsg,
          });
          console.log(`📲 Notification envoyée à ${tokens.length} token(s).`);

          previousScores[matchId] = {
            home: currentHomeGoals,
            away: currentAwayGoals,
          };
        }

        const events = match.events || [];
        for (const event of events) {
          const { player, team, time, type, detail } = event;
          if (!player?.name || !team?.name || time?.elapsed == null) continue;

          const playerName = player.name;
          const teamName = team.name;
          const minute = time.elapsed;

          if (type === 'Goal') {
            const eventKey = `${matchId}-GOAL-${playerName}-${minute}`;
            if (previousEvents[eventKey]) continue;

            let goalMsg = `⚽ ${minute}e - But de ${playerName} pour ${teamName}`;
            if (detail === 'Own Goal') {
              goalMsg = `😱 ${minute}e - CSC de ${playerName} (${teamName})`;
            } else if (detail === 'Penalty') {
              goalMsg = `⚽ ${minute}e - But de ${playerName} sur penalty!`;
            }

            console.log(goalMsg);
            await sendPushNotification(tokens, {
              title: `${homeTeam} - ${awayTeam}`,
              body: goalMsg,
            });
            previousEvents[eventKey] = true;
          }

          if (type === 'Card' && detail === 'Red Card') {
            const eventKey = `${matchId}-RED-${playerName}-${minute}`;
            if (previousEvents[eventKey]) continue;

            const redCardMsg = `🟥 ${minute}e - Carton rouge pour ${playerName} (${teamName})`;

            console.log(redCardMsg);
            await sendPushNotification(tokens, {
              title: `${homeTeam} vs ${awayTeam}`,
              body: redCardMsg,
            });

            previousEvents[eventKey] = true;
          }
        }
      }
    }
  } catch (err) {
    console.error('❌ Erreur dans checkMatchScore:', err.message);
  }
}

// Planification CRON
cron.schedule('*/30 * * * *', refreshActiveMatches); // Toutes les 30 minutes
cron.schedule('*/30 * * * * *', checkMatchScore);   // Toutes les 30 secondes

// Démarrage initial
refreshActiveMatches();