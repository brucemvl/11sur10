const express = require('express');
const router = express.Router();

const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const User = require('../models/user');

/**
 * Règles :
 * - Score exact → 3 pts
 * - Bon écart → 2 pts
 * - Bon résultat → 1 pt
 * - UN SEUL cas par match
 */
function analyzePrediction(prediction, match) {
  if (!match || match.status !== 'FINISHED') {
    return { points: 0, exact: 0, diff: 0, result: 0 };
  }

  const ph = prediction.predictedHome;
  const pa = prediction.predictedAway;
  const rh = match.score.home;
  const ra = match.score.away;

  // 1️⃣ SCORE EXACT
  if (ph === rh && pa === ra) {
    return { points: 3, exact: 1, diff: 0, result: 0 };
  }

  const pronoDiff = ph - pa;
  const realDiff = rh - ra;

  // 2️⃣ BON ÉCART
  if (pronoDiff === realDiff) {
    return { points: 2, exact: 0, diff: 1, result: 0 };
  }

  // 3️⃣ BON RÉSULTAT
  const pronoWinner =
    pronoDiff > 0 ? 'HOME' : pronoDiff < 0 ? 'AWAY' : 'DRAW';
  const realWinner =
    realDiff > 0 ? 'HOME' : realDiff < 0 ? 'AWAY' : 'DRAW';

  if (pronoWinner === realWinner) {
    return { points: 1, exact: 0, diff: 0, result: 1 };
  }

  return { points: 0, exact: 0, diff: 0, result: 0 };
}

router.get('/', async (req, res) => {
  try {
const predictions = await Prediction.find()
  .sort({ createdAt: -1 }) // le plus récent en premier
  .lean();
  const uniquePredictions = {};
predictions.forEach(p => {
  const key = `${p.userId}_${p.matchId}`;
  if (!uniquePredictions[key]) {
    uniquePredictions[key] = p;
  }
});
      const matches = await Match.find({ status: 'FINISHED' }).lean();

    // Map fixtureId → match
    const matchMap = {};
    matches.forEach(m => {
      matchMap[m.fixtureId] = m;
    });

    const leaderboard = {};

Object.values(uniquePredictions).forEach(p => {
          const match = matchMap[p.matchId];
      const r = analyzePrediction(p, match);

      if (!leaderboard[p.userId]) {
        leaderboard[p.userId] = {
          points: 0,
          exactScores: 0,
          goodDiffs: 0,
          goodResults: 0,
        };
      }

      leaderboard[p.userId].points += r.points;
      leaderboard[p.userId].exactScores += r.exact;
      leaderboard[p.userId].goodDiffs += r.diff;
      leaderboard[p.userId].goodResults += r.result;
    });

    const users = await User.find(
      { _id: { $in: Object.keys(leaderboard) } },
      { username: 1, avatar: 1 }
    ).lean();

    const userMap = {};
    users.forEach(u => (userMap[u._id] = u));

    const result = Object.entries(leaderboard)
      .map(([userId, stats]) => ({
        userId,
        username: userMap[userId]?.username || 'Utilisateur',
        avatar: userMap[userId]?.avatar || '/uploads/avatars/default-avatar.png',
        ...stats,
      }))
      .sort((a, b) => b.points - a.points);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur leaderboard' });
  }
});

module.exports = router;