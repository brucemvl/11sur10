import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import Menu from './src/components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerForPushNotificationsAsync from './src/utils/registerPush';


import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    // On appelle l'enregistrement dès que l'app démarre
    registerForPushNotificationsAsync();

    const subReceived = Notifications.addNotificationReceivedListener(notification => {
      console.log('📩 Notification reçue :', notification);
    });

    const subResponse = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('📲 Réponse à la notif :', response);
    });

    return () => {
      subReceived.remove();
      subResponse.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
      <Menu />
    </NavigationContainer>
  );
}