const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const Match = require('../models/Match'); // on a besoin de la date du match
const auth = require('../middleware/auth');

// 🔹 Créer ou modifier un pronostic
router.post('/', auth, async (req, res) => {
  const userId = req.userId;
  const { matchId, predictedHome, predictedAway } = req.body;

  if (!matchId || predictedHome == null || predictedAway == null) {
    return res.status(400).json({ error: 'Données manquantes' });
  }

  try {
    // 🔹 Récupérer la date du match
    const match = await Match.findOne({ fixtureId: matchId });
    if (!match) return res.status(404).json({ error: 'Match introuvable' });

    const now = new Date();
    const matchDate = new Date(match.kickoff);

    // 🔒 Bloquer si le match a commencé
    if (now >= matchDate) {
      return res.status(403).json({
        error: 'Match déjà commencé — pronostic verrouillé',
      });
    }

    // 🔹 Créer ou modifier le pronostic
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

module.exports = router;