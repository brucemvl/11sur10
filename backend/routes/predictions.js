const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const auth = require('../middleware/auth');

// 🟢 Créer / mettre à jour un pronostic
router.post('/predictions', auth, async (req, res) => {
  const userId = req.userId;
  const { matchId, predictedHome, predictedAway } = req.body;

  if (
    matchId == null ||
    predictedHome == null ||
    predictedAway == null
  ) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  try {
    const existing = await Prediction.findOne({
      userId,
      matchId,
    });

    if (existing) {
      existing.predictedHome = predictedHome;
      existing.predictedAway = predictedAway;
      await existing.save();
    } else {
      await Prediction.create({
        userId,
        matchId,
        predictedHome,
        predictedAway,
      });
    }

    res.status(200).json({ message: 'Pronostic enregistré' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;