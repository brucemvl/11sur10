const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const sendPushNotification = require('./utils/pushNotification');
const pushTokenRoutes = require('./routes/pushToken');
const PushToken = require('./models/PushToken');

const app = express();

// ✅ Middleware pour parser le JSON AVANT les routes
app.use(express.json());

// ✅ Connexion MongoDB
mongoose.connect(
  'mongodb+srv://brucemonnerville:Gogeta6823@cluster0.hsz41sr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log('✅ Connexion à MongoDB réussie !'))
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