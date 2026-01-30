const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadAvatar');
const Prediction = require('../models/Prediction');
const Match = require('../models/Match');

// 🔤 Modifier username
router.put('/username', auth, async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username requis' });
  }

  try {
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ error: 'Username déjà utilisé' });
    }

    await User.findByIdAndUpdate(req.userId, { username });
    res.json({ success: true, username });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔐 Modifier mot de passe
router.put('/password', auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  try {
    const user = await User.findById(req.userId);

    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🖼 Upload avatar
router.post(
  '/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const avatarUrl = `/uploads/avatars/${req.file.filename}`;

      await User.findByIdAndUpdate(req.userId, { avatar: avatarUrl });

      res.json({ success: true, avatar: avatarUrl });
    } catch (err) {
      res.status(500).json({ error: 'Erreur upload avatar' });
    }
  }
);

// 🔹 GET profil actuel
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).lean();

    // 🔢 Calcul des points
    const predictions = await Prediction.find({ userId: req.userId }).lean();
    const matches = await Match.find({ status: 'FINISHED' }).lean();

    const matchMap = {};
    matches.forEach(m => (matchMap[m.fixtureId] = m));

    let points = 0;

    predictions.forEach(p => {
      const match = matchMap[p.matchId];
      if (!match) return;

      const exact =
        p.predictedHome === match.score.home &&
        p.predictedAway === match.score.away;

      const diffProno = p.predictedHome - p.predictedAway;
      const diffReal = match.score.home - match.score.away;

      const correctResult =
        (diffProno > 0 && diffReal > 0) ||
        (diffProno < 0 && diffReal < 0) ||
        (diffProno === 0 && diffReal === 0);

      if (exact) points += 3;
      else if (correctResult) points += 1;
    });

    res.json({
      username: user.username,
      avatar: user.avatar
        ? `https://one1sur10.onrender.com${user.avatar}`
        : 'https://one1sur10.onrender.com/uploads/avatars/default-avatar.jpg',
      points,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;