const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const axios = require('axios');
const Prediction = require('../models/Prediction');

// 🟢 Récupérer les matchs à venir
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find({
      kickoff: { $gte: new Date() },
    }).sort({ kickoff: 1 });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération matchs' });
  }
});

// 🔄 Mettre à jour les scores réels et le status des matchs
router.post('/update', async (req, res) => {
  try {
    const { data } = await axios.get('URL_API_LIGUE1'); // ton API

    for (const m of data) {
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
        { upsert: true, new: true }
      );

      // 🔹 Si le match est fini, calculer les points
      if (match.status === 'FINISHED') {
        const predictions = await Prediction.find({ matchId: match.fixtureId });

        for (const p of predictions) {
          const points = calculatePoints(p, match); // ta fonction de calcul
          p.points = points;
          await p.save();
        }

        console.log(`✅ Points recalculés pour le match ${match.fixtureId}`);
      }
    }

    res.json({ success: true, message: 'Matchs mis à jour et points recalculés' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Erreur mise à jour matchs', details: err.message });
  }
});

module.exports = router;