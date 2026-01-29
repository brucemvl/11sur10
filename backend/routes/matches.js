const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

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

module.exports = router;