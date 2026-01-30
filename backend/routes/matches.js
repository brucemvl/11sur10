const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Prediction = require('../models/Prediction');
const axios = require('axios');

// 🔹 Fonction de calcul des points
function calculatePoints(prediction, match) {
  const { predictedHome, predictedAway } = prediction;
  const { home: realHome, away: realAway } = match.score;

  let points = 0;

  // Exact score
  if (predictedHome === realHome && predictedAway === realAway) {
    points = 3;
  }
  // Bon résultat mais pas le score exact (victoire/défaite/nul)
  else if (
    (predictedHome - predictedAway > 0 && realHome - realAway > 0) || // victoire maison
    (predictedHome - predictedAway < 0 && realHome - realAway < 0) || // victoire extérieur
    (predictedHome === predictedAway && realHome === realAway) // nul
  ) {
    points = 1;
  }

  return points;
}

// 🔄 Route mise à jour matchs et points
router.post('/update', async (req, res) => {
  try {
    // 🔹 Récupérer les matchs depuis l'API externe
    const { data } = await axios.get('URL_API_LIGUE1'); // Remplace par ton URL API

    for (const m of data) {
      // Mettre à jour ou créer le match
      const match = await Match.findOneAndUpdate(
        { fixtureId: m.fixture.id },
        {
          homeTeam: m.teams.home.name,
          awayTeam: m.teams.away.name,
          kickoff: m.fixture.date,
          score: {
            home: m.score.home,
            away: m.score.away,
          },
          status:
            m.score.home != null && m.score.away != null
              ? 'FINISHED'
              : 'SCHEDULED',
        },
        { upsert: true, new: true } // 🔹 new: true pour récupérer le match après update
      );

      // 🔹 Si le match est terminé et que les points n'ont pas encore été calculés
      if (match.status === 'FINISHED' && !match.pointsUpdated) {
        const predictions = await Prediction.find({ matchId: match.fixtureId });

        for (const p of predictions) {
          const points = calculatePoints(p, match);
          p.points = points;
          await p.save();
        }

        // Marquer le match comme points mis à jour
        match.pointsUpdated = true;
        await match.save();

        console.log(`✅ Points recalculés pour le match ${match.fixtureId}`);
      }
    }

    res.json({ success: true, message: 'Matchs mis à jour et points recalculés' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur mise à jour matchs', details: err.message });
  }
});

module.exports = router;