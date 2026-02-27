require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const sendPushNotification = require('./utils/pushNotification');
const pushTokenRoutes = require('./routes/pushToken.js');
const PushToken = require('./models/PushToken');
const authRoutes = require('./routes/auth.js');
const matchRoutes = require('./routes/matches');
const predictionRoutes = require('./routes/predictions');
const leaderboardRoutes = require('./routes/leaderBoard');
const profileRoutes = require('./routes/profile');
const path = require('path');
const startCrons = require('./cron');



const mongoURI = process.env.MONGO_URI;

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';



const app = express();

// ✅ Middleware pour parser le JSON AVANT les routes
app.use(express.json());

async function migrateTeamIdToTeamIds() {
  try {
    const result = await PushToken.updateMany(
      { teamId: { $exists: true } },
      [
        {
          $set: {
            teamIds: {
              $cond: [
                { $isArray: "$teamIds" },
                "$teamIds",
                ["$teamId"]
              ]
            }
          }
        },
        { $unset: "teamId" }
      ]
    );

    console.log(`✅ ${result.modifiedCount} tokens migrés vers teamIds`);
  } catch (err) {
    console.error('❌ Erreur migration teamIds :', err.message);
  }
}

// ✅ Connexion MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('✅ Connexion à MongoDB réussie !');
    await migrateTeamIdToTeamIds();  // Lancer le correctif après la connexion
    startCrons(); // 🚀 démarre les cron ici
  })
  .catch(err => console.error('❌ Connexion à MongoDB échouée :', err));

// servir les avatars et toutes les images dans /uploads
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    },
  })
);

// ✅ Enregistrement des routes
app.use('/api', pushTokenRoutes);
app.use('/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/profile', profileRoutes);





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

app.get('/download', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';

  // 📱 Android
  if (/android/i.test(userAgent)) {
    return res.redirect(
      'https://play.google.com/store/apps/details?id=com.onzesur10.app'
    );
  }

  //  iOS
  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return res.redirect(
      'https://apps.apple.com/fr/app/11sur10-r%C3%A9sultats-foot-live/id6739251747'
    );
  }

  // 💻 Fallback (PC, autres)
  return res.redirect('https://apps.apple.com/fr/app/11sur10-r%C3%A9sultats-foot-live/id6739251747');
});

// ✅ Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});



module.exports = app;