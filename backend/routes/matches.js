const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Prediction = require('../models/Prediction');
const axios = require('axios');
const calculatePoints = require('../utils/calculatePoints');

// 🔄 Mettre à jour matchs + recalcul points
router.post('/update', async (req, res) => {
  try {
    const { data } = await axios.get(
  'https://v3.football.api-sports.io/fixtures?league=61&season=2025',
  {
    headers: {
      'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
      'x-rapidapi-host': process.env.FOOTBALL_API_HOST,
    },
  }
);

console.log('API KEY:', process.env.FOOTBALL_API_KEY ? 'OK' : '❌ MANQUANTE');

    for (const m of data.response) {
      const isFinished = m.fixture.status.short === 'FT';

      const match = await Match.findOneAndUpdate(
        { fixtureId: m.fixture.id },
        {
          homeTeam: m.teams.home.name,
          awayTeam: m.teams.away.name,
          kickoff: m.fixture.date,
          score: {
            home: m.goals.home,
            away: m.goals.away,
          },
          status: isFinished ? 'FINISHED' : 'SCHEDULED',
        },
        { upsert: true, new: true }
      );

      // 🧮 Calcul des points UNE SEULE FOIS
      if (isFinished && !match.pointsUpdated) {
        const predictions = await Prediction.find({
          matchId: match.fixtureId,
        });

        for (const p of predictions) {
          const points = calculatePoints(
            { home: match.score.home, away: match.score.away },
            { home: p.predictedHome, away: p.predictedAway }
          );

          p.points = points;
          await p.save();
        }

        match.pointsUpdated = true;
        await match.save();

        console.log(`✅ Points calculés pour match ${match.fixtureId}`);
      }
    }

    res.json({
      success: true,
      message: 'Matchs mis à jour et points recalculés',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Erreur mise à jour matchs',
      details: err.message,
    });
  }
});

module.exports = router;