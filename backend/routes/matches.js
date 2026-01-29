const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const axios = require('axios');

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
    // Récupérer les matchs depuis l'API externe
    const { data } = await axios.get('URL_API_LIGUE1'); // Remplace par ton URL API

    for (const m of data) {
      await Match.findOneAndUpdate(
        { fixtureId: m.fixture.id },
        {
          homeTeam: m.teams.home.name,
          awayTeam: m.teams.away.name,
          kickoff: m.fixture.date,
          score: {
            home: m.score.home,
            away: m.score.away,
          },
          status: m.score.home != null && m.score.away != null ? 'FINISHED' : 'SCHEDULED',
        },
        { upsert: true, new: true }
      );
    }

    res.json({ success: true, message: 'Matchs mis à jour' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur mise à jour matchs', details: err.message });
  }
});

module.exports = router;