const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Prediction = require('../models/Prediction');
const Match = require('../models/Match');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '_id username avatar');

    const finishedMatches = await Match.find({
      status: 'FINISHED',
      'score.home': { $ne: null },
      'score.away': { $ne: null },
    }).lean();

    const leaderboard = [];

    for (const user of users) {
      const predictions = await Prediction.find({ userId: user._id }).lean();

      let points = 0;
      let exactScores = 0;
      let goodDiffs = 0;
      let goodResults = 0;

      for (const p of predictions) {
        const match = finishedMatches.find(
          (m) => m.fixtureId === p.matchId
        );

        if (!match) continue;

        const pHome = p.predictedHome;
        const pAway = p.predictedAway;

        const rHome = match.score.home;
        const rAway = match.score.away;

        // 🛑 sécurité
        if (
          pHome == null || pAway == null ||
          rHome == null || rAway == null
        ) continue;

        // 1️⃣ SCORE EXACT (3 pts)
        if (pHome === rHome && pAway === rAway) {
          points += 3;
          exactScores++;
          continue; // ⛔ stop ici
        }

        // 2️⃣ BON ÉCART (2 pts)
        const predictedDiff = pHome - pAway;
        const realDiff = rHome - rAway;

        if (predictedDiff === realDiff) {
          points += 2;
          goodDiffs++;
          continue;
        }

        // 3️⃣ BON RÉSULTAT (1 pt)
        const predictedWinner =
          pHome > pAway ? 'HOME' :
          pHome < pAway ? 'AWAY' : 'DRAW';

        const realWinner =
          rHome > rAway ? 'HOME' :
          rHome < rAway ? 'AWAY' : 'DRAW';

        if (predictedWinner === realWinner) {
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