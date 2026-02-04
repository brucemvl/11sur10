const express = require('express');
const router = express.Router();

const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const User = require('../models/user');

// 🔹 Fonction de calcul des points (réutilisée de profile.js)
function analyzePrediction(prediction, match) {
  if (!match || match.status !== 'FINISHED') {
    return { points: 0, exact: 0, diff: 0, result: 0 };
  }

  const ph = prediction.predictedHome;
  const pa = prediction.predictedAway;
  const rh = match.score.home;
  const ra = match.score.away;

  // 1️⃣ Score exact
  if (ph === rh && pa === ra) return { points: 3, exact: 1, diff: 0, result: 0 };

  const pronoDiff = ph - pa;
  const realDiff = rh - ra;

  // 2️⃣ Bon écart
  if (pronoDiff === realDiff) return { points: 2, exact: 0, diff: 1, result: 0 };

  // 3️⃣ Bon résultat (1N2)
  const pronoWinner = pronoDiff > 0 ? 'HOME' : pronoDiff < 0 ? 'AWAY' : 'DRAW';
  const realWinner = realDiff > 0 ? 'HOME' : realDiff < 0 ? 'AWAY' : 'DRAW';

  if (pronoWinner === realWinner) return { points: 1, exact: 0, diff: 0, result: 1 };

  return { points: 0, exact: 0, diff: 0, result: 0 };
}

// 🔹 Route leaderboard
router.get('/', async (req, res) => {
  try {
    // 🔹 Tous les pronostics
    const predictions = await Prediction.find().lean();

    // 🔹 Tous les matchs terminés
    const matches = await Match.find({ status: 'FINISHED' }).lean();
    const matchMap = {};
    matches.forEach(m => (matchMap[m.fixtureId] = m));

    // 🔹 Calcul des stats par utilisateur
    const leaderboard = {};

    predictions.forEach(p => {
      const match = matchMap[p.matchId];
      if (!match) return;

      const r = analyzePrediction(p, match);

      if (!leaderboard[p.userId]) {
        leaderboard[p.userId] = { points: 0, exactScores: 0, goodDiffs: 0, goodResults: 0 };
      }

      leaderboard[p.userId].points += r.points;
      leaderboard[p.userId].exactScores += r.exact;
      leaderboard[p.userId].goodDiffs += r.diff;
      leaderboard[p.userId].goodResults += r.result;
    });

    // 🔹 Infos utilisateurs
    const users = await User.find({ _id: { $in: Object.keys(leaderboard) } }, { username: 1, avatar: 1 }).lean();
    const userMap = {};
    users.forEach(u => (userMap[u._id] = u));

    // 🔹 Formatage final et tri
    const result = Object.entries(leaderboard)
      .map(([userId, stats]) => ({
        userId,
        username: userMap[userId]?.username || 'Utilisateur',
        avatar: userMap[userId]?.avatar || '/uploads/avatars/default-avatar.png',
        ...stats
      }))
      .sort((a, b) => b.points - a.points);

    res.json(result);
  } catch (err) {
    console.error('Erreur leaderboard:', err);
    res.status(500).json({ error: 'Erreur leaderboard' });
  }
});

module.exports = router;