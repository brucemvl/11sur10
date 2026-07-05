const express = require('express');
const router = express.Router();

const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const User = require('../models/user');

const calculatePoints = require('../utils/calculatePoints');

const result = calculatePoints(
  { home: match.score.home, away: match.score.away },
  { home: p.predictedHome, away: p.predictedAway },
  match.pointsSystem
);

user.points += p.points;

if (result.type === "exact") user.exactScores++;
if (result.type === "diff") user.goodDiffs++;
if (result.type === "result") user.goodResults++;



// 🔹 Route leaderboard
router.get('/', async (req, res) => {
  try {
    // 🔹 Tous les users
    const users = await User.find({}, { username: 1, avatar: 1 }).lean();

    // 🔹 Init leaderboard avec TOUS les users à 0
    const leaderboard = {};
    users.forEach(u => {
      leaderboard[u._id] = {
        userId: u._id,
        username: u.username,
        avatar: u.avatar || '/uploads/avatars/facteur.jpg',
        points: 0,
        exactScores: 0,
        goodDiffs: 0,
        goodResults: 0
      };
    });

    // 🔹 Tous les pronostics
    const predictions = await Prediction.find().lean();

    // 🔹 Tous les matchs terminés
    const matches = await Match.find({ status: 'FINISHED' }).lean();
    const matchMap = {};
    matches.forEach(m => (matchMap[m.fixtureId] = m));

    // 🔹 Calcul des points
    predictions.forEach(p => {
      const match = matchMap[p.matchId];
      if (!match) return;

      const r = analyzePrediction(p, match);
      const user = leaderboard[p.userId];
      if (!user) return;

      user.points += p.points || 0;
      user.exactScores += r.exact;
      user.goodDiffs += r.diff;
      user.goodResults += r.result;
    });

    // 🔹 Tri final
    const result = Object.values(leaderboard).sort(
      (a, b) => b.points - a.points
    );

    res.json(result);
  } catch (err) {
    console.error('Erreur leaderboard:', err);
    res.status(500).json({ error: 'Erreur leaderboard' });
  }
});

module.exports = router;