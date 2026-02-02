const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const User = require('../models/user');

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
      if (!match) return;

      if (!leaderboard[p.userId]) {
        leaderboard[p.userId] = {
          points: 0,
          exactScores: 0,
          goodDiffs: 0,
          goodResults: 0,
        };
      }

      const predictedHome = p.predictedHome;
      const predictedAway = p.predictedAway;
      const realHome = match.score.home;
      const realAway = match.score.away;

      // ✅ EXACT SCORE
      if (predictedHome === realHome && predictedAway === realAway) {
        leaderboard[p.userId].points += 3;
        leaderboard[p.userId].exactScores += 1;
        return;
      }

      const pronoDiff = predictedHome - predictedAway;
      const realDiff = realHome - realAway;

      // ⚖️ BON ÉCART (mais pas exact)
      if (pronoDiff === realDiff) {
        leaderboard[p.userId].points += 2;
        leaderboard[p.userId].goodDiffs += 1;
        return;
      }

      // 🏆 BON RÉSULTAT (gagnant ou nul)
      const goodResult =
        (pronoDiff > 0 && realDiff > 0) ||
        (pronoDiff < 0 && realDiff < 0) ||
        (pronoDiff === 0 && realDiff === 0);

      if (goodResult) {
        leaderboard[p.userId].points += 1;
        leaderboard[p.userId].goodResults += 1;
      }
    });

    const userIds = Object.keys(leaderboard);

    const users = await User.find(
      { _id: { $in: userIds } },
      { username: 1, avatar: 1 }
    ).lean();

    const userMap = {};
    users.forEach(u => {
      userMap[u._id] = {
        username: u.username,
        avatar: u.avatar || '/uploads/avatars/default-avatar.png',
      };
    });

    const result = userIds
      .map(userId => ({
        userId,
        username: userMap[userId]?.username || 'Utilisateur',
        avatar: userMap[userId]?.avatar,
        points: leaderboard[userId].points,
        exactScores: leaderboard[userId].exactScores,
        goodDiffs: leaderboard[userId].goodDiffs,
        goodResults: leaderboard[userId].goodResults,
      }))
      .sort((a, b) => b.points - a.points);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;