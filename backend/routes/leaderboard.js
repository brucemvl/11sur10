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

      user.points += r.points;
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