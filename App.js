import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import Menu from './src/components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerForPushNotificationsAsync from './src/utils/registerPush';

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  // ✅ Setup du channel Android → à faire DANS le composant
  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const loadSavedTeam = async () => {
      const saved = await AsyncStorage.getItem('teamId');
      if (saved) setSelectedTeamId(parseInt(saved, 10));
    };
    loadSavedTeam();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
      <Menu />
    </NavigationContainer>
  );
}