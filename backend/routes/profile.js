const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const auth = require('../middleware/auth');
const localUpload = require('../middleware/uploadAvatar');
const { upload: cloudUpload } = require('../middleware/cloudinary');

// 🔹 Choisir le storage selon l'environnement
const upload = process.env.NODE_ENV === 'production' ? cloudUpload : localUpload;
function getPointsSystem(match) {
  const stage = match.league?.round;

  let pointsSystem = {
    result: 1,
    diff: 2,
    exact: 3,
  };

  if (stage === "Round of 32") pointsSystem = { result: 1, diff: 2, exact: 4 };
  if (stage === "Round of 16") pointsSystem = { result: 2, diff: 4, exact: 6 };
  if (stage === "Quarter-finals") pointsSystem = { result: 3, diff: 5, exact: 7 };
  if (stage === "Semi-finals") pointsSystem = { result: 5, diff: 7, exact: 10 };
  if (stage === "Final") pointsSystem = { result: 6, diff: 8, exact: 15 };

  return pointsSystem;
}

// 🔹 Fonction de calcul des points
function analyzePrediction(prediction, match) {
  if (!match || match.status !== 'FINISHED') {
    return { points: 0, exact: 0, diff: 0, result: 0 };
  }

  const system = match.pointsSystem || getPointsSystem(match);

  const ph = prediction.predictedHome;
  const pa = prediction.predictedAway;
  const rh = match.score.home;
  const ra = match.score.away;

  const pronoDiff = ph - pa;
  const realDiff = rh - ra;

  // exact
  if (ph === rh && pa === ra) {
    return { points: system.exact, exact: 1, diff: 0, result: 0 };
  }

  // diff
  if (pronoDiff === realDiff) {
    return { points: system.diff, exact: 0, diff: 1, result: 0 };
  }

  // result
  const pronoWinner = pronoDiff > 0 ? 'HOME' : pronoDiff < 0 ? 'AWAY' : 'DRAW';
  const realWinner = realDiff > 0 ? 'HOME' : realDiff < 0 ? 'AWAY' : 'DRAW';

  if (pronoWinner === realWinner) {
    return { points: system.result, exact: 0, diff: 0, result: 1 };
  }

  return { points: 0, exact: 0, diff: 0, result: 0 };
}

// 🔤 Modifier username
router.put('/username', auth, async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username requis' });

  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: 'Username déjà utilisé' });

    await User.findByIdAndUpdate(req.userId, { username });
    res.json({ success: true, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔐 Modifier mot de passe
router.put('/password', auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ error: 'Champs manquants' });

  try {
    const user = await User.findById(req.userId);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) return res.status(401).json({ error: 'Mot de passe incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🖼 Upload avatar
router.post('/avatar', auth, async (req, res) => {
  try {
    const uploadMiddleware = process.env.NODE_ENV === 'production'
      ? cloudUpload.single('avatar')
      : localUpload.single('avatar');

    uploadMiddleware(req, res, async (err) => {
      if (err) return res.status(500).json({ error: 'Erreur upload avatar', details: err.message });
      if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });

      const avatarUrl = process.env.NODE_ENV === 'production'
        ? req.file.path
        : `/uploads/avatars/${req.file.filename}`;

      await User.findByIdAndUpdate(req.userId, { avatar: avatarUrl });
      res.json({ success: true, avatar: avatarUrl });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur upload avatar' });
  }
});

router.delete('/avatar', auth, async (req, res) => {
  try {

    const user = await User.findById(req.userId);

    if (!user.avatar) {
      return res.status(400).json({ error: 'Aucun avatar à supprimer' });
    }

    // 🔥 supprimer le fichier du disque
    const fs = require('fs');
    const path = require('path');

const avatarPath = path.join(
  __dirname,
  '..',
  user.avatar.replace(/^\/+/, '')
);
    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath);
    }

    // ↩️ reset avatar
    user.avatar = null;
    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression avatar' });
  }
});

// 🔹 GET profil actuel
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).lean();
    const predictions = await Prediction.find({ userId: req.userId }).lean();
const matches = await Match.find({
  fixtureId: { $in: predictions.map(p => p.matchId) },
  status: 'FINISHED'
}).lean();

    const matchMap = {};
    matches.forEach(m => (matchMap[m.fixtureId] = m));

    let points = 0;
    let exactScores = 0;
    let goodDiffs = 0;
    let goodResults = 0;

    predictions.forEach(p => {
      const match = matchMap[p.matchId];
      if (!match) return;

      const r = analyzePrediction(p, match);
      points += r.points;
      exactScores += r.exact;
      goodDiffs += r.diff;
      goodResults += r.result;
    });

    console.log('Calcul profil:', { points, exactScores, goodDiffs, goodResults });
    console.log('Pronos:', predictions.map(p => p.matchId));
console.log('Matches FINISHED:', matches.map(m => m.fixtureId));

    res.json({
      _id: user._id,
      username: user.username,
      avatar: (() => {
    if (!user.avatar) {
      // Fallback si pas d’avatar
      return 'https://one1sur10.onrender.com/uploads/avatars/default-avatar.png';
    }

    // Production → Cloudinary (URL complète)
    if (process.env.NODE_ENV === 'production') {
      return user.avatar;
    }

    // Local → chemin relatif
    return `https://one1sur10.onrender.com${user.avatar}`;
  })(),
  points,
  exactScores,
  goodDiffs,
  goodResults
});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;