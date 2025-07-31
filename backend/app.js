require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const sendPushNotification = require('./utils/pushNotification');
const pushTokenRoutes = require('./routes/pushToken.js');
const PushToken = require('./models/PushToken');

const mongoURI = process.env.MONGO_URI;




const app = express();

// ✅ Middleware pour parser le JSON AVANT les routes
app.use(express.json());

async function fixTokensWithoutTeamId(defaultTeamId = '0') {
  try {
    const result = await PushToken.updateMany(
      {
        $or: [
          { teamId: { $exists: false } },
          { teamId: null },
          { teamId: '' }
        ]
      },
      { $set: { teamId: defaultTeamId } }
    );

    console.log(`✅ ${result.modifiedCount} anciens tokens mis à jour avec teamId = ${defaultTeamId}`);
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour des tokens :', err.message);
  }
}

// ✅ Connexion MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('✅ Connexion à MongoDB réussie !');
    await fixTokensWithoutTeamId();  // Lancer le correctif après la connexion
  })
  .catch(err => console.error('❌ Connexion à MongoDB échouée :', err));

// ✅ Enregistrement des routes
app.use('/api', pushTokenRoutes);     // autres routes liées aux tokens (si nécessaire)

// ✅ Route d'envoi de notification à un utilisateur spécifique
app.post('/send-notification', async (req, res) => {
  const { userId, title, message } = req.body;

  try {
    const tokens = await PushToken.find({ userId });

    if (tokens.length === 0) {
      return res.status(400).json({ error: 'Aucun token trouvé pour cet utilisateur' });
    }

    for (const tokenObj of tokens) {
      await sendPushNotification(tokenObj.token, {
        title,
        body: message,
      });
    }

    res.status(200).json({ message: 'Notifications envoyées avec succès' });
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi des notifications :', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de la notification' });
  }
});

// ✅ Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

module.exports = app;