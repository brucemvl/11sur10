const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const auth = require('../middleware/auth'); // JWT obligatoire

// 🔹 Créer ou modifier un pronostic
router.post('/', auth, async (req, res) => {
  const userId = req.userId;
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

// 🔹 Récupérer MES pronostics
router.get('/me', auth, async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.userId });

    res.json(predictions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔒 BLOQUER APRÈS COUP D’ENVOI
  const now = new Date();
  const matchDate = new Date(fixtureDate);

  if (now >= matchDate) {
    return res.status(403).json({
      error: 'Match déjà commencé — pronostic verrouillé',
    });
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
    res.status(500).json({ error: 'Erreur serveur' });
  }
;

module.exports = router;