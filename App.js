import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import Menu from './src/components/Menu';

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants'; // Assure-toi d'importer ça pour accéder à l'ID de projet

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

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

  token = (await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId, // pour EAS, sinon retire `projectId`
  })).data;

  console.log('Expo Push Token:', token);

  // Envoi du token au backend
  try {
    await axios.post('http://192.168.1.11:3000/api/register-push-token', {
      token,
    });
    console.log('Token envoyé au backend');
  } catch (error) {
    console.error('Erreur lors de l\'envoi du token:', error.message);
  }

  return token;
}

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    // Listener pour notification reçue en mode foreground
    const subscriptionReceived = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification reçue:', notification);
    });

    // Listener pour réponse à une notification (app ouverte via notification)
    const subscriptionResponse = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Réponse à la notification:', response);
    });

    return () => {
      subscriptionReceived.remove();
      subscriptionResponse.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
      <Menu />
    </NavigationContainer>
  );
}