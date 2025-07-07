const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousEvents = {}; // matchId + playerName + minute + event type

async function checkMatchScore() {
  try {
    // Récupère tous les tokens groupés par teamId
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
      console.log('🔍 Traitement du teamId :', teamIdStr);

      const response = await axios.get(`https://v3.football.api-sports.io/fixtures?team=${teamIdStr}&live=all`, {
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      });

      const matches = response.data.response;

      for (const match of matches) {
        const matchId = match.fixture.id;

        if (!match.events || !Array.isArray(match.events)) continue;

        for (const event of match.events) {
          const minute = event.time?.elapsed;
          const playerName = event.player?.name || 'Joueur inconnu';
          const teamName = event.team?.name || 'Équipe inconnue';

          if (event.type === 'Goal') {
            const assistName = event.assist?.name;
            const detail = event.detail; // e.g. "Normal Goal", "Own Goal", "Penalty"
            const eventKey = `${matchId}-${playerName}-${minute}-GOAL`;

            if (!previousEvents[eventKey]) {
              let goalMsg = `⚽ ${minute}e minute - But de ${playerName}!`;

              if (detail === 'Own Goal') {
                goalMsg = `${playerName} a marqué contre son camp à la ${minute}e minute`;
              } else if (detail === 'Penalty') {
                goalMsg += ' sur penalty';
              }


              console.log(`⚽ ${goalMsg}`);

              await sendPushNotification(tokens, {
                title: `${match.teams.home.name} - ${match.teams.away.name}`,
                body: goalMsg,
              });

              previousEvents[eventKey] = true;
            }
          }

          if (event.type === 'Card' && event.detail === 'Red Card') {
            const eventKey = `${matchId}-${playerName}-${minute}-RED`;

            if (!previousEvents[eventKey]) {
              const redCardMsg = `🟥 ${minute}e minute - ${playerName} a reçu un carton rouge`;
              console.log(`🟥 ${redCardMsg}`);

              await sendPushNotification(tokens, {
                title: `${match.teams.home.name} - ${match.teams.away.name}`,
                body: redCardMsg,
              });

              previousEvents[eventKey] = true;
            }
          }
        }
      }
    }

  } catch (err) {
    console.error('❌ Erreur dans checkMatchScore:', err.message);
  }
}

// ⏱️ Tâche cron toutes les 35 secondes
cron.schedule('*/35 * * * * *', checkMatchScore);