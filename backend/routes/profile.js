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

// 🔹 Fonction de calcul des points
function analyzePrediction(prediction, match) {
  if (!match || match.status !== 'FINISHED') return { points: 0, exact: 0, diff: 0, result: 0 };

  const ph = prediction.predictedHome;
  const pa = prediction.predictedAway;
  const rh = match.score.home;
  const ra = match.score.away;

  // 1️⃣ Score exact
  if (ph === rh && pa === ra) return { points: 3, exact: 1, diff: 0, result: 0 };

  const pronoDiff = ph - pa;
  const realDiff = rh - ra;

  // 2️⃣ Bon écart (même différence + au moins un score correct)
  if (pronoDiff === realDiff && (ph === rh || pa === ra)) return { points: 2, exact: 0, diff: 1, result: 0 };

  // 3️⃣ Bon résultat (1N2)
  const pronoWinner = pronoDiff > 0 ? 'HOME' : pronoDiff < 0 ? 'AWAY' : 'DRAW';
  const realWinner = realDiff > 0 ? 'HOME' : realDiff < 0 ? 'AWAY' : 'DRAW';
  if (pronoWinner === realWinner) return { points: 1, exact: 0, diff: 0, result: 1 };

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

// 🔹 GET profil actuel
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).lean();
    const predictions = await Prediction.find({ userId: req.userId }).lean();
    const matches = await Match.find({ status: 'FINISHED' }).lean();

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

    res.json({
      username: user.username,
      avatar: user.avatar
        ? user.avatar
        : 'https://one1sur10.onrender.com/uploads/avatars/default-avatar.jpg',
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

module.exports = router;