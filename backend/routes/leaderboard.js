const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Prediction = require('../models/Prediction');
const Match = require('../models/Match');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '_id username avatar');

    // ✅ STATUS EN MAJUSCULES
    const finishedMatches = await Match.find({
      status: 'FINISHED',
      'score.home': { $ne: null },
      'score.away': { $ne: null },
    });

    const leaderboard = [];

    for (const user of users) {
      const predictions = await Prediction.find({ userId: user._id });

      let points = 0;
      let exactScores = 0;
      let goodDiffs = 0;
      let goodResults = 0;

      for (const prediction of predictions) {
        const match = finishedMatches.find(
          (m) => m.fixtureId === prediction.matchId
        );

        if (!match) continue;

        const pHome = prediction.predictedHome;
        const pAway = prediction.predictedAway;

        const rHome = match.score.home;
        const rAway = match.score.away;

        // 🎯 SCORE EXACT
        if (pHome === rHome && pAway === rAway) {
          points += 5;
          exactScores++;
          continue;
        }

        // 📏 BON ÉCART
        if (pHome - pAway === rHome - rAway) {
          points += 3;
          goodDiffs++;
          continue;
        }

        // ⚽ BON RÉSULTAT
        if (
          (pHome > pAway && rHome > rAway) ||
          (pHome < pAway && rHome < rAway) ||
          (pHome === pAway && rHome === rAway)
        ) {
          points += 1;
          goodResults++;
        }
      }

      leaderboard.push({
        userId: user._id,
        username: user.username,
        avatar: user.avatar,
        points,
        exactScores,
        goodDiffs,
        goodResults,
      });
    }

    leaderboard.sort((a, b) => b.points - a.points);
    res.json(leaderboard);
  } catch (err) {
    console.error('❌ Erreur leaderboard:', err);
    res.status(500).json({ message: 'Erreur serveur leaderboard' });
  }
});

module.exports = router;