const express = require('express');
const router = express.Router();
const PushToken = require('../models/PushToken');
const { sendPushNotification } = require('../utils/pushNotification');
const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');

// 🟢 REGISTER / UPDATE PUSH TOKEN
router.post('/register-push-token', optionalAuth, async (req, res) => {
  const { token, teamId, platform } = req.body;
  const userId = req.userId; // null ou ObjectId

  if (!token || teamId == null) {
    return res.status(400).json({ error: 'Token ou teamId manquants' });
  }

  try {
    let pushToken = await PushToken.findOne({ token });

    if (!pushToken) {
      // 🆕 Nouveau token
      pushToken = new PushToken({
        token,
        teamId,
        userId: userId || null,
        platform,
      });
    } else {
      // 🔄 Token existant → mise à jour
      pushToken.teamId = teamId;
      pushToken.userId = userId || null;
      if (platform) pushToken.platform = platform;
    }

    await pushToken.save();
    res.status(200).json({ message: 'Token mis à jour avec succès' });
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour du token :', err);
    res.status(500).json({
      error: 'Erreur lors de la mise à jour du token',
      details: err.message,
    });
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