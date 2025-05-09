const express = require('express');
const router = express.Router();
const PushToken = require('../models/PushToken');

router.post('/register-push-token', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token manquant' });
  }

  try {
    // Insère uniquement s'il n'existe pas déjà
    const existing = await PushToken.findOne({ token });
    if (!existing) {
      await PushToken.create({ token });
      console.log('✅ Token enregistré:', token);
    }

    res.status(200).json({ message: 'Token enregistré' });
  } catch (err) {
    console.error('❌ Erreur enregistrement token complète:', err); // log complet    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;