import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import axios from 'axios';
import { Platform } from 'react-native';

/**
 * 🔹 Login utilisateur
 * Stocke le JWT et userId localement pour sécuriser les requêtes.
 */
export async function login(email, password) {
  try {
    const response = await axios.post('https://one1sur10.onrender.com/auth/login', {
      email,
      password,
    });

    const { token, userId, username } = response.data;

    await AsyncStorage.setItem('jwtToken', token);
    await AsyncStorage.setItem('userId', userId);
    await AsyncStorage.setItem('username', username);

    console.log('✅ Login réussi, JWT stocké');
    return { success: true };
  } catch (err) {
    console.error('❌ Erreur login:', err.response?.data || err.message);
    return { success: false, error: err.response?.data?.message || err.message };
  }
}

export async function register(email, password, username) {
  try {
    const response = await axios.post(
      'https://one1sur10.onrender.com/auth/register', // <- URL CORRECTE
      {
        email,
        password,
        username,
      }
    );

    const { token, userId } = response.data;

    // Stocke JWT et userId localement après inscription pour login automatique
    await AsyncStorage.setItem('jwtToken', token);
    await AsyncStorage.setItem('userId', userId);

    console.log('✅ Inscription réussie, JWT stocké');
    return { success: true };
  } catch (err) {
    console.error('❌ Erreur inscription:', err.response?.data || err.message);
    return {
      success: false,
      error: err.response?.data?.message || err.message,
    };
  }
}

/**
 * 🔹 Enregistrer le token de notification push
 * Utilise le JWT pour sécuriser l'association avec l'utilisateur.
 */
async function registerForPushNotificationsAsync() {
  try {
    // 1️⃣ Permissions notifications
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

    // 2️⃣ Récupérer le token Expo
    const token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.easConfig?.projectId,
    })).data;

    console.log('📲 Expo Push Token:', token);

    // 3️⃣ Récupérer teamId et JWT depuis AsyncStorage
    const storedTeam = await AsyncStorage.getItem('teamId');
    const teamId = storedTeam ? Number(storedTeam) : null;
    const jwtToken = await AsyncStorage.getItem('jwtToken');

    if (!teamId || !jwtToken) {
      console.warn('⚠️ teamId ou JWT manquant');
      return;
    }

    // 4️⃣ Envoi au backend
    const response = await axios.post(
      'https://one1sur10.onrender.com/api/register-push-token',
      { token, teamId },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    console.log('✅ Token et teamId envoyés au serveur:', response.data);

    // 5️⃣ Config Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

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
  }
}

/**
 * 🔹 Déconnexion
 * Supprime JWT, userId et éventuellement le token push si tu veux "déconnecter" le device.
 */
export async function logout() {
  await AsyncStorage.removeItem('jwtToken');
  await AsyncStorage.removeItem('userId');
  console.log('✅ Déconnexion effectuée');
}

// ✅ Export default pour éviter l'erreur import
export default registerForPushNotificationsAsync;