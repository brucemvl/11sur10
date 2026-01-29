const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const auth = require('../middleware/auth'); // JWT obligatoire

router.post('/', auth, async (req, res) => {
  const userId = req.userId; // récupéré via JWT
  const { matchId, predictedHome, predictedAway } = req.body;

  if (!matchId || predictedHome == null || predictedAway == null) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  try {
    const prediction = await Prediction.findOneAndUpdate(
      { userId, matchId },
      { predictedHome, predictedAway },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, prediction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

module.exports = router;