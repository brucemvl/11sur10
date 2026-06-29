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
    })
    .populate("reactions.userId", "username avatar")
    .lean();

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

//REACTIONS
router.post("/:predictionId/reaction", auth, async (req, res) => {
  try {
    const { emoji } = req.body;

    if (!emoji) {
      return res.status(400).json({ error: "Emoji requis" });
    }

    const prediction = await Prediction.findById(req.params.predictionId);

    if (!prediction) {
      return res.status(404).json({ error: "Pronostic introuvable" });
    }

    // Cherche si l'utilisateur a déjà réagi
    const existingReaction = prediction.reactions.find(
      r => r.userId.toString() === req.userId
    );

    if (existingReaction) {
      // On remplace simplement son emoji
      existingReaction.emoji = emoji;
    } else {
      // Première réaction
      prediction.reactions.push({
        userId: req.userId,
        emoji,
      });
    }

    await prediction.save();

    // Recharge avec les infos des utilisateurs
    const updatedPrediction = await Prediction.findById(prediction._id)
      .populate("reactions.userId", "username avatar");

    res.json(updatedPrediction);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



module.exports = router;