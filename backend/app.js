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
const leaderboardRoutes = require('./routes/leaderboard');
const profileRoutes = require('./routes/profile');
const path = require('path');
const cron = require('node-cron');
const chalk = require('chalk');



const mongoURI = process.env.MONGO_URI;

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';



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

async function updateMatches(retries = 3, delay = 5000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/matches/update`);
      console.log(
        chalk.green(`[${new Date().toISOString()}] ✅ Points recalculés automatiquement :`),
        res.data.message
      );
      return; 
    } catch (err) {
      console.error(
        chalk.red(`[${new Date().toISOString()}] ❌ Erreur mise à jour (tentative ${attempt}):`),
        err.message
      );
      if (attempt < retries) {
        console.log(chalk.yellow(`🔄 Nouvelle tentative dans ${delay / 1000}s...`));
        await new Promise((r) => setTimeout(r, delay));
      } else {
        console.error(chalk.red(`💥 Toutes les tentatives ont échoué !`));
      }
    }
  }
}

// ⏱ Cron toutes les 10 minutes
cron.schedule('*/10 * * * *', async () => {
  const now = new Date().toISOString();
  console.log(chalk.cyan(`${now} ⏱ Début de la mise à jour des matchs...`));
  await updateMatches();
});

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