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
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(null);
  const [loading, setLoading] = useState(true); // ← ajout pour loading
  const headerRef = useRef();

  useEffect(() => {
  const loadInitialData = async () => {
    try {
      const teamId = await AsyncStorage.getItem('teamId');
      if (teamId) {
        setSelectedTeamId(parseInt(teamId, 10));
        setNotificationsEnabled(true); // ✅ c’est actif si teamId existe
      } else {
        setNotificationsEnabled(false);
      }
    } catch (err) {
      console.error('❌ Erreur chargement initial :', err);
    } finally {
      setLoading(false);
    }
  };

  loadInitialData();
}, []);

  if (loading) {
    return null; // ou un écran de chargement personnalisé
  }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => (
          <Header
            ref={headerRef}
            notifsEnabled={notificationsEnabled}
            selectedTeamId={selectedTeamId}
          />
        ),
        cardStyleInterpolator: ({ current, next }) => {
          const progress = Animated.add(current.progress, next ? next.progress : 0);
          return {
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          };
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Apropos" component={Apropos} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="FicheChampionnat" component={FicheChampionnat} />
      <Stack.Screen name="FicheEurope" component={FicheEurope} />
      <Stack.Screen name="LivePage" component={LivePage} />
      <Stack.Screen name="ClubPage" component={ClubPage} />
      <Stack.Screen name="FicheMatch" component={FicheMatch} />
      <Stack.Screen name="FicheJoueur" component={FicheJoueur} />
      <Stack.Screen name="SelectionsPage" component={SelectionsPage} />
      <Stack.Screen name="FicheSelections" component={FicheSelections} />
      <Stack.Screen name="FicheEquipe" component={FicheEquipe} />
      <Stack.Screen name="Notifs">
        {(props) => (
          <Notifs
            {...props}
            onSave={(id) => setSelectedTeamId(id)}
            onNotifStatusChange={setNotificationsEnabled}
            triggerHeaderShake={() => headerRef.current?.triggerShake()}
                  onResetTeam={() => setSelectedTeamId(null)} // ✅ ← ajoute cette prop
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}