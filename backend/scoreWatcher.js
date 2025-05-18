const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification'); // version batch recommandée
const { getAllTokens } = require('./db/tokenStore');

const previousScores = {}; // Stocke les scores par matchId

async function checkMatchScore() {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures?league=633&live=all', {
      headers: {
        'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    });

    const matches = response.data.response;

    for (const match of matches) {
      const matchId = match.fixture.id;
      const homeTeam = match.teams.home.name;
      const awayTeam = match.teams.away.name;
      const homeGoals = match.goals.home;
      const awayGoals = match.goals.away;

      const currentScore = `${homeTeam} ${homeGoals} - ${awayTeam} ${awayGoals}`;

      if (previousScores[matchId] && previousScores[matchId] !== currentScore) {
        console.log(`⚽ But détecté dans ${homeTeam} vs ${awayTeam} !`);
        console.log('Ancien score :', previousScores[matchId]);
        console.log('Nouveau score :', currentScore);

        const tokens = await getAllTokens();

        await sendPushNotification(tokens, {
          title: '⚽ But !',
          body: `Score : ${currentScore}`,
        });
      }
      else {
        console.log('Pas de changement de score détecté.');
      }

      // Met à jour le score actuel pour ce match
      previousScores[matchId] = currentScore;
    }

  } catch (err) {
    console.error('Erreur dans la vérification du score :', err.message);
  }
}

// Tâche toutes les 30 secondes
cron.schedule('*/30 * * * * *', checkMatchScore);

