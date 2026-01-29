const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadAvatar');

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

module.exports = router;