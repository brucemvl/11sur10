import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import Menu from './src/components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerForPushNotificationsAsync from './src/utils/registerPush';
import NotificationHandler from './src/components/NotificationHandler';
import { navigationRef } from './src/navigation/NavigationRef';
import Toast from 'react-native-toast-message';
import RatingModal from "./src/components/ratingModal";
import {
  trackAppOpen,
  handleRatingChoice,
} from "./src/utils/RateManager";




import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [selectedTeamId, setSelectedTeamId] = useState(null);

   const [showRating, setShowRating] = useState(false);

  useEffect(() => {
  let mounted = true;

  const checkRating = async () => {
    const shouldShow = await trackAppOpen();
    if (shouldShow && mounted) {
      setShowRating(true);
    }
  };

  checkRating();

  return () => {
    mounted = false;
  };
}, []);

  const onRatingChoice = async (choice) => {
    setShowRating(false);
    await handleRatingChoice(choice);
  };


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

  const data = response.notification.request.content.data;
  console.log('📲 Notif cliquée, data :', data);

  if (data?.screen === 'FicheMatch' && data?.matchId) {
    // 🛠️ Navigation ici
  }
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
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
      <Menu />
      <NotificationHandler />
      <Toast />
      <RatingModal
        visible={showRating}
        onChoice={onRatingChoice}
      />
    </NavigationContainer>
  );
}