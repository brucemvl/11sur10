const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {};  // { matchId: { home, away } }
const previousEvents = {};  // { eventKey: true }

async function checkMatchScore() {
  try {
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

      const tokens = group.tokens;
      const teamIdStr = String(teamId).trim();
      console.log('🔍 Vérification du teamId :', teamIdStr);

      const response = await axios.get(
        `https://v3.football.api-sports.io/fixtures?team=${teamIdStr}&live=all`,
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
        const homeTeam = match.teams.home.name;
        const awayTeam = match.teams.away.name;
        const currentHomeGoals = match.goals.home;
        const currentAwayGoals = match.goals.away;

        // ✅ Partie 1 : Notification au changement de score global
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

        // ✅ Partie 2 : Notification immédiate des buts depuis `match.events`
        const events = match.events || [];
        for (const event of events) {
          if (event.type !== 'Goal') continue;

          const playerName = event.player?.name;
          const teamName = event.team?.name;
          const minute = event.time?.elapsed;

          // Vérifie que le joueur ET l'équipe sont bien renseignés
          if (!playerName || !teamName || minute == null) continue;

          const eventKey = `${matchId}-${playerName}-${minute}`;

          // Si jamais cet event a déjà été traité, on ignore
          if (previousEvents[eventKey]) continue;

          // Déterminer le type de but
          let goalMsg = `⚽ ${minute}e minute - But de ${playerName} pour ${teamName}`;
          if (event.detail === 'Own Goal') {
            goalMsg = `😱 ${minute}e - But contre son camp de ${playerName} (${teamName})`;
          } else if (event.detail === 'Penalty') {
            goalMsg += ' (penalty)';
          }

          console.log(goalMsg);

          await sendPushNotification(tokens, {
            title: `${homeTeam} vs ${awayTeam}`,
            body: goalMsg,
          });

          previousEvents[eventKey] = true;
        }
      }
    }
  } catch (err) {
    console.error('❌ Erreur dans checkMatchScore:', err.message);
  }
}

// ⏱️ Toutes les 35 secondes
cron.schedule('*/35 * * * * *', checkMatchScore);