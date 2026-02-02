const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const User = require('../models/user');

const calculatePoints = (prediction, match) => {
  if (!match || match.status !== 'FINISHED') return 0;

  const exact =
    prediction.predictedHome === match.score.home &&
    prediction.predictedAway === match.score.away;

  const pronoDiff = prediction.predictedHome - prediction.predictedAway;
  const realDiff = match.score.home - match.score.away;

  const correctResult =
    (pronoDiff > 0 && realDiff > 0) ||
    (pronoDiff < 0 && realDiff < 0) ||
    (pronoDiff === 0 && realDiff === 0);

  if (exact) return 3;
  if (correctResult) return 1;
  return 0;
};

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

      const points = calculatePoints(p, match);

      if (!leaderboard[p.userId]) {
        leaderboard[p.userId] = {
          points: 0,
          exactScores: 0,
          goodDiffs: 0,
          goodResults: 0,
        };
      }

      leaderboard[p.userId].points += points;

      const pHome = p.predictedHome;
      const pAway = p.predictedAway;
      const rHome = match.score.home;
      const rAway = match.score.away;

      if (
        pHome == null || pAway == null ||
        rHome == null || rAway == null
      ) return;

      // 1️⃣ SCORE EXACT
      if (pHome === rHome && pAway === rAway) {
        leaderboard[p.userId].exactScores++;
        return;
      }

      const pronoDiff = pHome - pAway;
      const realDiff = rHome - rAway;

      // 2️⃣ BON ÉCART (mais pas exact)
      if (pronoDiff === realDiff) {
        leaderboard[p.userId].goodDiffs++;
        return;
      }

      // 3️⃣ BON RÉSULTAT
      const correctResult =
        (pronoDiff > 0 && realDiff > 0) ||
        (pronoDiff < 0 && realDiff < 0) ||
        (pronoDiff === 0 && realDiff === 0);

      if (correctResult) {
        leaderboard[p.userId].goodResults++;
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
      .map(userId => {
        const user = userMap[userId] || {
          username: 'Utilisateur',
          avatar: '/uploads/avatars/default-avatar.png',
        };

        return {
          userId,
          username: user.username,
          avatar: user.avatar,
          points: leaderboard[userId].points,
          exactScores: leaderboard[userId].exactScores,
          goodDiffs: leaderboard[userId].goodDiffs,
          goodResults: leaderboard[userId].goodResults,
        };
      })
      .sort((a, b) => b.points - a.points);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;