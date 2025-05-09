const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification'); // ✅ Chemin mis à jour
const PushToken = require('./models/PushToken'); // Assure-toi que ce modèle existe
const { getAllTokens } = require('./db/tokenStore');

let previousScore = null; // Peut aussi être stocké en DB si besoin

async function checkMatchScore() {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures?id=1345391', {
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        'x-rapidapi-host': "v3.football.api-sports.io"
      }
    });

    const match = response.data.response[0];
    const homeTeam = match.teams.home.name;
    const awayTeam = match.teams.away.name;
    const homeGoals = match.goals.home;
    const awayGoals = match.goals.away;

    const currentScore = `${homeTeam} ${homeGoals} - ${awayTeam} ${awayGoals}`;

    const tokens = await getAllTokens();

    if (previousScore && previousScore !== currentScore) {
      console.log('⚽ But détecté ! Envoi de notifications...');
      console.log('Ancien score :', previousScore);
      console.log('Nouveau score :', currentScore);

      for (const token of tokens) {
        await sendPushNotification(token, {
          title: '⚽ But !',
          body: `Nouveau score : ${currentScore}`,
        });
      }
    } else {
      console.log('Pas de changement de score détecté.');
    }

    previousScore = currentScore;
  } catch (err) {
    console.error('Erreur dans la vérification du score :', err.message);
  }
}

// Planifie la tâche toutes les 30 secondes
cron.schedule('*/30 * * * * *', checkMatchScore);

