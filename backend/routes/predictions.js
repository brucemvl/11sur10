const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const auth = require('../middleware/auth');

// 🔹 Créer ou modifier un pronostic
router.post('/', auth, async (req, res) => {
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
    const match = await Match.findOne({ fixtureId: matchId });
    if (!match) {
      return res.status(404).json({ error: 'Match introuvable' });
    }

    const now = new Date();
    const matchDate = new Date(match.kickoff);

    // 🔒 Match déjà commencé
    if (now >= matchDate) {
      return res.status(403).json({
        error: 'Match déjà commencé — pronostic verrouillé',
      });
    }

    const prediction = await Prediction.findOneAndUpdate(
      { userId, matchId },
      {
        predictedHome: Number(predictedHome),
        predictedAway: Number(predictedAway),
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, prediction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET pronos d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const predictions = await Prediction.find({
      userId: req.params.userId, // ✅ correction ici
    }).lean();

    res.json(predictions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Récupérer MES pronostics
router.get('/me', auth, async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.userId }).lean();
    res.json(predictions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});



module.exports = router;