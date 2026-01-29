const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const Prediction = require('../models/Prediction');
const calculatePoints = require('../utils/calculatePoints');

// 🟢 Finir un match
router.post('/:matchId/finish', async (req, res) => {
  const { home, away } = req.body;

  try {
    const match = await Match.findOne({ matchId: req.params.matchId });
    if (!match) return res.status(404).json({ error: 'Match introuvable' });

    match.score = { home, away };
    match.status = 'FINISHED';
    await match.save();

    const predictions = await Prediction.find({
      matchId: match.matchId,
    });

    for (const p of predictions) {
      p.points = calculatePoints(
        { home, away },
        { home: p.predictedHome, away: p.predictedAway }
      );
      await p.save();
    }

    res.json({ message: 'Match terminé, points calculés' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur fin de match' });
  }
});

module.exports = router;