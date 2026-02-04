const express = require('express');
const router = express.Router();

const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const User = require('../models/user');

function analyzePrediction(prediction, match) {
  if (!match || match.status !== 'FINISHED') {
    return { points: 0, exact: 0, diff: 0, result: 0 };
  }

  const ph = Number(prediction.predictedHome);
  const pa = Number(prediction.predictedAway);
  const rh = Number(match.score.home);
  const ra = Number(match.score.away);

  // 🎯 SCORE EXACT
  if (ph === rh && pa === ra) {
    return { points: 3, exact: 1, diff: 0, result: 0 };
  }

  const pronoDiff = ph - pa;
  const realDiff = rh - ra;

  // 📏 BON ÉCART
  if (pronoDiff === realDiff) {
    return { points: 2, exact: 0, diff: 1, result: 0 };
  }

  // ✅ BON RÉSULTAT
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
    const predictions = await Prediction.find().lean();
    const matches = await Match.find({ status: 'FINISHED' }).lean();

    const matchMap = {};
    matches.forEach(m => {
      matchMap[m.fixtureId] = m;
    });

    const leaderboard = {};

    predictions.forEach(p => {
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
    users.forEach(u => {
      userMap[u._id] = u;
    });

    const result = Object.entries(leaderboard)
      .map(([userId, stats]) => ({
        userId,
        username: userMap[userId]?.username || 'Utilisateur',
        avatar:
          userMap[userId]?.avatar ||
          '/uploads/avatars/default-avatar.png',
        ...stats,
      }))
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.exactScores !== a.exactScores)
          return b.exactScores - a.exactScores;
        if (b.goodDiffs !== a.goodDiffs)
          return b.goodDiffs - a.goodDiffs;
        return b.goodResults - a.goodResults;
      });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur leaderboard' });
  }
});

module.exports = router;