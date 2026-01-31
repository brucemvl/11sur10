const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('../middleware/auth');
const Prediction = require('../models/Prediction');
const Match = require('../models/Match');
const localUpload = require('../middleware/uploadAvatar');
const { upload: cloudUpload } = require('../middleware/cloudinary');

// Choisir le storage selon l'environnement
const upload = process.env.NODE_ENV === 'production' ? cloudUpload : localUpload;

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
router.post('/avatar', auth, async (req, res) => {
  try {
    let uploadMiddleware;
    
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_CLOUD_NAME) {
        console.warn('⚠️ Cloudinary non configuré ! Utilisation locale impossible en prod.');
        return res.status(500).json({ error: 'Cloudinary non configuré' });
      }
      uploadMiddleware = cloudUpload.single('avatar');
      console.log('✅ Upload Cloudinary activé');
    } else {
      uploadMiddleware = localUpload.single('avatar');
      console.log('✅ Upload local activé');
    }

    // Exécuter Multer
    uploadMiddleware(req, res, async function (err) {
      if (err) {
        console.error('❌ Erreur Multer:', err);
        return res.status(500).json({ error: 'Erreur upload avatar' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier reçu' });
      }

      // URL finale selon environnement
      const avatarUrl =
        process.env.NODE_ENV === 'production'
          ? req.file.path // Cloudinary retourne la vraie URL publique
          : `/uploads/avatars/${req.file.filename}`; // Local

      await User.findByIdAndUpdate(req.userId, { avatar: avatarUrl });

      console.log(`✅ Avatar uploadé pour user ${req.userId}:`, avatarUrl);
      res.json({ success: true, avatar: avatarUrl });
    });
  } catch (err) {
    console.error('❌ Erreur serveur upload avatar:', err);
    res.status(500).json({ error: 'Erreur serveur upload avatar' });
  }
});

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
  ? user.avatar
  : 'https://one1sur10.onrender.com/uploads/avatars/default-avatar.jpg',
      points,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;