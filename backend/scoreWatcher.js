const axios = require('axios');
const cron = require('node-cron');
const sendPushNotification = require('./utils/pushNotification');
const PushToken = require('./models/PushToken');

const previousScores = {}; // matchId → score

async function checkMatchScore() {
  try {
    // Récupère tous les tokens groupés par leagueId
    const groupedTokens = await PushToken.aggregate([
      {
        $group: {
          _id: '$leagueId',
          tokens: { $push: '$token' }
        }
      }
    ]);

    for (const group of groupedTokens) {
      const leagueId = group._id;
      if (!leagueId) continue; // ignore les tokens sans leagueId

      const tokens = group.tokens;
      const leagueIdStr = String(leagueId).trim(); // s’assure que c’est bien une string numérique propre
      console.log('Traitement du leagueId :', leagueIdStr); // ✅ ICI

      // Utilisation dynamique du leagueId récupéré
      const response = await axios.get(`https://v3.football.api-sports.io/fixtures?league=${leagueIdStr}&live=all`, {
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
          console.log(`⚽ But détecté dans ${homeTeam} vs ${awayTeam}`);
          console.log('Ancien score :', previousScores[matchId]);
          console.log('Nouveau score :', currentScore);

          await sendPushNotification(tokens, {
            title: '⚽ But !',
            body: `Score : ${currentScore}`,
          });
        } else {
          console.log('Pas de changement de score détecté.');
        }
        previousScores[matchId] = currentScore;
      }
    }

  } catch (err) {
    console.error('❌ Erreur dans checkMatchScore:', err.message);
  }
}

// ⏱️ Tâche cron toutes les 30 secondes
cron.schedule('*/30 * * * * *', checkMatchScore);