const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Prediction = require('../models/Prediction');
const Match = require('../models/Match');

router.get('/', async (req, res) => {
  try {
    // 1️⃣ récupérer tous les utilisateurs
    const users = await User.find({}, '_id username avatar');

    // 2️⃣ récupérer tous les matchs terminés
    const finishedMatches = await Match.find({
      status: 'finished',
      homeScore: { $ne: null },
      awayScore: { $ne: null },
    });

    const leaderboard = [];

    for (const user of users) {
      const predictions = await Prediction.find({
        userId: user._id,
      });

      let points = 0;
      let exactScores = 0;
      let goodDiffs = 0;
      let goodResults = 0;

      for (const prediction of predictions) {
        const match = finishedMatches.find(
          (m) => m._id.toString() === prediction.matchId.toString()
        );

        if (!match) continue;

        const pHome = prediction.homeScore;
        const pAway = prediction.awayScore;
        const rHome = match.homeScore;
        const rAway = match.awayScore;

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

        // ⚽ BON RÉSULTAT (vainqueur / nul)
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

    // 3️⃣ tri par points décroissants
    leaderboard.sort((a, b) => b.points - a.points);

    res.json(leaderboard);
  } catch (err) {
    console.error('❌ Erreur leaderboard:', err);
    res.status(500).json({ message: 'Erreur serveur leaderboard' });
  }
});

module.exports = router;