const express = require('express');
const router = express.Router();
const PushToken = require('../models/PushToken');
const { sendPushNotification } = require('../utils/pushNotification'); // Assure-toi que cette fonction est correctement importée

// POST /api/register-push-token
router.post('/register-push-token', async (req, res) => {
  const { token, leagueId } = req.body;

if (!token || leagueId == null) {
    return res.status(400).json({ error: 'Token ou leagueId manquants' });
  }

  try {

    console.log('Token reçu:', token);
console.log('LeagueId reçu:', leagueId);
    // Recherche le token dans la base de données
    let pushToken = await PushToken.findOne({ token });
console.log('📥 Route /register-push-token appelée');

    if (!pushToken) {
        console.log('Token introuvable, création d\'un nouveau document');

      // Si le token n'existe pas, crée un nouveau document
      pushToken = new PushToken({
        token,
        leagueId,
      });
    } else {
        console.log('Token trouvé, mise à jour du leagueId');

      // Si le token existe déjà, mets à jour le leagueId
      pushToken.leagueId = leagueId;
    }

    // Sauvegarde le document
console.log('💾 Sauvegarde de ce document :', pushToken);
await pushToken.save();
    res.status(200).json({ message: 'Token et leagueId mis à jour avec succès' });
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour du token :', err);
  res.status(500).json({ error: 'Erreur lors de la mise à jour du token', details: err });
  }
});

router.post('/unregister-push-token', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token manquant' });
  }

  try {
    const result = await PushToken.deleteOne({ token });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Token non trouvé' });
    }

    res.status(200).json({ message: 'Token supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du token' });
  }
});

module.exports = router;