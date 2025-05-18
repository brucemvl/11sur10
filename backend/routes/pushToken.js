const express = require('express');
const router = express.Router();
const PushToken = require('../models/PushToken');
const sendPushNotification = require('../utils/pushNotification');

router.get('/ping', (req, res) => {
  console.log('🔔 Ping reçu pour garder le serveur en éveil');
  res.status(200).json({ message: 'pong' });
});
// ✅ Route pour enregistrer un token (sans userId)
router.post('/register-push-token', async (req, res) => {
  try {
    const { token } = req.body;

    console.log('📥 Token reçu:', token);

    if (!token) {
      return res.status(400).json({ message: 'Token manquant' });
    }

    // Vérifie si le token existe déjà
    const existing = await PushToken.findOne({ token });

    if (!existing) {
      await PushToken.create({ token });
      console.log('✅ Token enregistré:', token);
    } else {
      console.log('🔁 Token déjà présent:', token);
    }

    res.status(200).json({ message: 'Token enregistré avec succès' });
  } catch (error) {
    console.error('❌ Erreur dans /register-push-token:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ Route d’envoi de notification à TOUS les tokens
router.post('/send-notification', async (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: 'Titre et message requis' });
  }

  try {
    const tokens = await PushToken.find({});

    if (tokens.length === 0) {
      return res.status(404).json({ error: 'Aucun token enregistré' });
    }

    for (const tokenObj of tokens) {
      await sendPushNotification(tokenObj.token, {
        title,
        body: message,
      });
    }

    res.status(200).json({ message: 'Notifications envoyées à tous' });
  } catch (error) {
    console.error('❌ Erreur envoi :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;