import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

export default function NotificationHandler() {
  const navigation = useNavigation();
  const responseListener = useRef();

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      console.log("📲 Notif cliquée, data :", data);

      if (data?.screen === 'FicheMatch' && data?.matchId) {
        navigation.navigate('FicheMatch', { matchId: data.matchId });
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null;
}