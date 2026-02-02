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
      const points = calculatePoints(p, match);
      leaderboard[p.userId] = (leaderboard[p.userId] || 0) + points;
    });

    const userIds = Object.keys(leaderboard);

    const users = await User.find(
  { _id: { $in: userIds } },
  { username: 1, avatar: 1 }  // récupérer avatar
).lean();

const userMap = {};
users.forEach(u => {
  userMap[u._id] = {
    username: u.username,
    avatar: u.avatar || '/uploads/avatars/default-avatar.png',
  };
});

    const result = Object.entries(leaderboard)
  .map(([userId, points]) => {
    const user = userMap[userId] || { username: 'Utilisateur', avatar: '/uploads/avatars/default-avatar.png' };
    return {
      userId,
      username: user.username,   // string
      avatar: user.avatar,       // string
      points,
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