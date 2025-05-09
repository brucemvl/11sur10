const axios = require('axios');

async function sendPushNotification(token, message) {
  if (!token) {
    console.error("❌ Token manquant !");
    return;
  }

  // Vérifie que le token a le bon format (Expo token)
  if (!token.startsWith('ExponentPushToken')) {
    console.warn("⚠️ Token non compatible Expo :", token);
    return;
  }

  const payload = {
    to: token,
    sound: 'default',
    title: message?.title || 'Notification',
    body: message?.body || '',
  };

  try {
    const response = await axios.post('https://exp.host/--/api/v2/push/send', payload);
    console.log('✅ Notification envoyée à', token, ':', response.data);
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de la notification :', error.response?.data || error.message);
  }
}

module.exports = sendPushNotification;