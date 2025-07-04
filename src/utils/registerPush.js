import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import axios from 'axios';

export default async function registerForPushNotificationsAsync() {
  try {
    // Demander les permissions pour les notifications
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permission de notification refusée');
      return;
    }

    // Récupérer le token d'Expo
    const token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.easConfig?.projectId,
    })).data;

    console.log('📲 Expo Push Token:', token);

    // Récupérer le teamId depuis AsyncStorage
    const storedTeam = await AsyncStorage.getItem('teamId');
    console.log('teamId récupéré depuis AsyncStorage:', storedTeam);

    const teamId = storedTeam ? Number(storedTeam) : null;

    if (!teamId || isNaN(teamId)) {
      console.warn('⚠️ teamId invalide ou manquant :', storedTeam);
      return;
    }

    // Envoi de la requête POST pour enregistrer le token et teamId
    const response = await axios.post('https://one1sur10.onrender.com/api/register-push-token', {
      token,
      teamId, // Envoie la nouvelle teamId ici
    });
    console.log('Réponse du serveur:', response.data);


    console.log('✅ Token et teamId envoyés au serveur');
    return token;
  } catch (error) {
  console.error('❌ Erreur registerPush:', error.message);
  if (error.response) {
    console.error('🧾 Réponse du serveur :', error.response.data);
  } else if (error.request) {
    console.error('📡 Aucune réponse reçue du serveur.');
  } else {
    console.error('⚠️ Erreur Axios inconnue :', error);
  }
  }}