const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};  // { matchId: { home, away } }
const previousEvents = {};  // { eventKey: true }
let activeMatches = [];     // [{ matchId, teamId }]

// 🔁 Met à jour la liste des matchs actifs toutes les 30 minutes
async function refreshActiveMatches() {
  try {
    console.log("🔄 Rafraîchissement des matchs à suivre...");
    activeMatches = [];

    const groupedTokens = await PushToken.aggregate([
      {
        $group: {
          _id: '$teamId',
          tokens: { $push: '$token' }
        }
      }
    ]);

    for (const group of groupedTokens) {
      const teamId = group._id;
      if (!teamId) continue;

      const response = await axios.get(
        `https://v3.football.api-sports.io/fixtures?team=${teamId}&next=5`,
        {
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        }
      );

      const now = new Date();
      const matches = response.data.response;

      for (const match of matches) {
        const start = new Date(match.fixture.date);
        const diff = Math.abs(start - now) / 60000; // minutes

        // Conserve les matchs à moins de 120 minutes
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

// ✅ Vérifie le score seulement pour les matchs actifs
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
      const tokens = tokensByTeam[teamId] || [];

      const response = await axios.get(
        `https://v3.football.api-sports.io/fixtures?team=${teamId}&live=all`,
        {
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        }
      );

      const matches = response.data.response;

      for (const match of matches) {
        const matchId = match.fixture.id;
        if (!teamMatches[teamId].includes(matchId)) continue;

        const homeTeam = match.teams.home.name;
        const awayTeam = match.teams.away.name;
        const currentHomeGoals = match.goals.home;
        const currentAwayGoals = match.goals.away;

        const prevScore = previousScores[matchId] || { home: null, away: null };

        if (
          prevScore.home !== currentHomeGoals ||
          prevScore.away !== currentAwayGoals
        ) {
          const scoreMsg = `⚽ Nouveau score : ${homeTeam} ${currentHomeGoals} - ${currentAwayGoals} ${awayTeam}`;
          console.log(scoreMsg);

          await sendPushNotification(tokens, {
            title: `${homeTeam} vs ${awayTeam}`,
            body: scoreMsg,
          });

          previousScores[matchId] = {
            home: currentHomeGoals,
            away: currentAwayGoals,
          };
        }

        const events = match.events || [];
        for (const event of events) {
          const playerName = event.player?.name;
          const teamName = event.team?.name;
          const minute = event.time?.elapsed;
          const type = event.type;
          const detail = event.detail;

          if (!playerName || !teamName || minute == null) continue;

          if (type === 'Goal') {
            const eventKey = `${matchId}-GOAL-${playerName}-${minute}`;
            if (previousEvents[eventKey]) continue;

            let goalMsg = `⚽ ${minute}e - But de ${playerName} pour ${teamName}`;
            if (detail === 'Own Goal') {
              goalMsg = `😱 ${minute}e - CSC de ${playerName} (${teamName})`;
            } else if (detail === 'Penalty') {
              goalMsg = `⚽ ${minute}e - Penalty de ${playerName}`;
            }

            console.log(goalMsg);
            await sendPushNotification(tokens, {
              title: `${homeTeam} vs ${awayTeam}`,
              body: goalMsg,
            });

            previousEvents[eventKey] = true;
          }

          if (type === 'Card' && detail === 'Red Card') {
            const eventKey = `${matchId}-RED-${playerName}-${minute}`;
            if (previousEvents[eventKey]) continue;

            const redCardMsg = `🟥 ${minute}e - ${playerName} (${teamName}) expulsé`;

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

// ⏱ Rafraîchir la liste toutes les 30 minutes
cron.schedule('*/30 * * * *', refreshActiveMatches);

// ⏱ Vérifier les scores toutes les 3à secondes
cron.schedule('*/30 * * * * *', checkMatchScore);

// Démarrage initial
refreshActiveMatches();