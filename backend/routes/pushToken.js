const express = require('express');
const router = express.Router();
const PushToken = require('../models/PushToken');
const { sendPushNotification } = require('../utils/pushNotification');
const auth = require('../middleware/auth');

// 🟢 REGISTER / UPDATE PUSH TOKEN
router.post('/register-push-token', auth, async (req, res) => {
  const { token, teamId, platform } = req.body;
  const userId = req.userId; // 🔐 sécurisé depuis le JWT

  if (!token || teamId == null) {
    return res.status(400).json({ error: 'Token ou teamId manquants' });
  }

  try {
    // Recherche le token dans la base de données
    let pushToken = await PushToken.findOne({ token });

    if (!pushToken) {
      // Nouveau token
      pushToken = new PushToken({
        token,
        teamId,
        userId,
        platform,
      });
    } else {
      // Token existant → MAJ
      pushToken.teamId = teamId;
      pushToken.userId = userId;
      if (platform) pushToken.platform = platform;
    }

    await pushToken.save();
    res.status(200).json({ message: 'Token mis à jour avec succès' });
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour du token :', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du token', details: err.message });
  }
});

// 🟢 UNREGISTER PUSH TOKEN
router.post('/unregister-push-token', async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ error: 'Token manquant' });

  try {
    const result = await PushToken.deleteOne({ token });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Token non trouvé' });
    }

    res.status(200).json({ message: 'Token supprimé avec succès' });
  } catch (err) {
    console.error('❌ Erreur lors de la suppression du token :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression du token', details: err.message });
  }
});

module.exports = router;