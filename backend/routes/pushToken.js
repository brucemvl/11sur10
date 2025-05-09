const express = require('express');
const router = express.Router();
const PushToken = require('../models/PushToken');

router.post('/register-push-token', async (req, res) => {
  const { token, userId } = req.body;

  if (!token || !userId) {
    return res.status(400).json({ error: 'Token et userId requis' });
  }

  try {
    // Vérifie si le token existe déjà
    const existing = await PushToken.findOne({ token });

    if (!existing) {
      const newToken = new PushToken({ token, userId });
      await newToken.save();
      return res.status(201).json({ message: 'Token enregistré' });
    }

    res.status(200).json({ message: 'Token déjà enregistré' });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;