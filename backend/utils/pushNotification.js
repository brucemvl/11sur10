const axios = require('axios');
const PushToken = require('../models/PushToken'); // Ajoute ça en haut du fichier

async function sendPushNotification(tokens, message) {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    console.warn('⚠️ Aucun token à envoyer');
    return;
  }

  // Filtrer uniquement les tokens valides Expo
  const validTokens = tokens.filter(token => token.startsWith('ExponentPushToken'));

  if (validTokens.length === 0) {
    console.warn('⚠️ Aucun token Expo valide');
    return;
  }

  // Valider la structure du message
  if (!message || !message.title || !message.body) {
    console.warn('⚠️ Message mal formé ou incomplet');
    return;
  }

  // Construire le tableau de messages à envoyer (max 100 par requête)
  const messages = validTokens.map((token, index) => ({
  to: token,
  sound: 'default',
  title: message?.title || 'Notification',
  body: message?.body || '',
  badge: message?.badge || undefined,
  data: message?.data || undefined,
  channelId: 'default', // 🔴 Obligatoire sur Android
  _originalToken: token,
data: {
  screen: 'FicheMatch',
  ...(message?.data || {}),
},
}));

  try {
    const chunks = chunkArray(messages, 100); // Expo limite à 100 par requête

    for (const chunk of chunks) {
      const response = await axios.post('https://exp.host/--/api/v2/push/send', chunk, {
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
      });

      console.log('📦 Réponse Expo Push:', response.data);


      for (let i = 0; i < response.data.data.length; i++) {
  const resp = response.data.data[i];
  const token = chunk[i]._originalToken;

  if (resp.status !== 'ok') {
    console.warn(`❌ Erreur pour token ${token}:`, resp.message);

    if (resp.message?.includes('is not a registered push notification recipient')) {
      try {
        await PushToken.deleteOne({ token });
        console.log(`🗑️ Token supprimé : ${token}`);
      } catch (err) {
        console.error(`❌ Erreur suppression ${token} :`, err.message);
      }
    }
  } else {
    console.log(`✅ Notification OK pour ${token}`);
  }
}
      
      // Vérifier les erreurs dans la réponse
      const responseData = response.data;
      if (responseData?.errors) {
        responseData.errors.forEach(error => {
          console.warn('⚠️ Token invalide ou expiré:', error);
        });
      }

      if (process.env.NODE_ENV !== 'production') {
        console.log('✅ Notifications envoyées à un lot :', responseData);
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi des notifications :', error.response?.data || error.message);
  }
}

// Utilitaire pour découper un tableau en sous-tableaux
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

module.exports = sendPushNotification;