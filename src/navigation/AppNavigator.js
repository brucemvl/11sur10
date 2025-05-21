import 'react-native-gesture-handler';
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Apropos from '../screens/Apropos';
import Contact from '../screens/Contact';
import FicheChampionnat from '../screens/FicheChampionnat';
import FicheEurope from "../screens/FicheEurope"
import FicheJoueur from '../screens/FicheJoueur';
import Menu from '../components/Menu';
import LivePage from '../screens/LivePage';
import ClubPage from '../screens/ClubPage';
import FicheMatch from '../screens/FicheMatch';
import SelectionsPage from '../screens/SelectionsPage';
import FicheSelections from '../screens/FicheSelections';
import FicheEquipe from '../screens/FicheEquipe';
import Notifs from '../screens/Notifs';




const Stack = createStackNavigator();

export default function AppNavigator() {

  const [notificationsEnabled, setNotificationsEnabled] = useState(null);
    const headerRef = useRef(); // ← ref ici


   useEffect(() => {
    const checkNotifStatus = async () => {
      const leagueId = await AsyncStorage.getItem('leagueId');
      setNotificationsEnabled(!!leagueId); // true si leagueId existe
    };
    checkNotifStatus();
  }, []);

if (notificationsEnabled === null) {
  return null; // ou un écran de chargement
}

  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
        header: () => <Header ref={headerRef} notifsEnabled={notificationsEnabled} />,
          cardStyleInterpolator: ({ current, next, layouts }) => {
            const progress = Animated.add(current.progress, next ? next.progress : 0);

            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1], // Faire passer l'opacité de 0 à 1
                }),
              },
            };
          },
        }}
        >
      
        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Apropos" component={Apropos} />
        <Stack.Screen name='Contact' component={Contact} />
        <Stack.Screen name="FicheChampionnat" component={FicheChampionnat} />
        <Stack.Screen name="FicheEurope" component={FicheEurope} />
        <Stack.Screen name="LivePage" component={LivePage} />
        <Stack.Screen name="ClubPage" component={ClubPage}/>
        <Stack.Screen name="FicheMatch" component={FicheMatch} />
        <Stack.Screen name="FicheJoueur" component={FicheJoueur} />
        <Stack.Screen name="SelectionsPage" component={SelectionsPage} />
        <Stack.Screen name='FicheSelections' component={FicheSelections} />
        <Stack.Screen name='FicheEquipe' component={FicheEquipe}  />
        <Stack.Screen name="Notifs">
        {props => (
          <Notifs
            {...props}
            onNotifStatusChange={setNotificationsEnabled}
            triggerHeaderShake={() => headerRef.current?.triggerShake()} // ← passer la fonction
          />
        )}
      </Stack.Screen>
      </Stack.Navigator>
  );

  
}