const express = require('express');
const router = express.Router();

const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const User = require('../models/user');

const calculatePoints = require('../utils/calculatePoints');




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

      const user = leaderboard[p.userId];
if (!user) return;

const result = calculatePoints(
  { home: match.score.home, away: match.score.away },
  { home: p.predictedHome, away: p.predictedAway },
  match.pointsSystem
);

if (user.username === "akeron75") {
  console.log(
    "Match :", p.matchId,
    "Points enregistrés :", p.points,
    "Barème :", match.pointsSystem
  );
}

// On additionne les points déjà enregistrés
if (typeof p.points === "number") {
  user.points += p.points;
} else {
  // Ancien pronostic : on recalcule les points
  user.points += result.points;
}
// On compte les types de pronostics
if (result.type === "exact") user.exactScores++;
if (result.type === "diff") user.goodDiffs++;
if (result.type === "result") user.goodResults++;
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