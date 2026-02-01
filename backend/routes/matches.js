const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const updateMatches = require('../services/updateMatches');

// 🔄 Mettre à jour matchs + recalcul points
router.post('/update', async (req, res) => {
  try {
    const msg = await updateMatches();
    res.json({ success: true, message: msg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur update matchs' });
  }
});

// 📥 GET tous les matchs
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().lean();
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur récupération matchs' });
  }
});

module.exports = router;