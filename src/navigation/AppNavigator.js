import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Header from '../components/Header';
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
import FicheCoach from '../screens/FicheCoach';
import Notifs from '../screens/Notifs';
import NotifsPlus from '../screens/NotifsPlus';
import Login from '../screens/Login';
import Register from '../screens/Register';
import AccueilJeu from '../screens/AccueilJeu';
import MonProfil from '../screens/MonProfil';
import HistoriquePronos from '../screens/HistoriquePronos';
import Jeu from '../components/Jeu';
import ClassementJeu from '../components/ClassementJeu';




const Stack = createStackNavigator();

export default function AppNavigator() {
const [selectedTeamIds, setSelectedTeamIds] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(null);
  const [loading, setLoading] = useState(true); // ← ajout pour loading
  const headerRef = useRef();
    const homeRef = useRef();


  useEffect(() => {
  const loadInitialData = async () => {
    try {
      const stored = await AsyncStorage.getItem('teamIds');
      if (stored) {
        const ids = JSON.parse(stored); // JSON.parse car c’est un tableau
        setSelectedTeamIds(ids);
        setNotificationsEnabled(ids.length > 0);
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
selectedTeamIds={selectedTeamIds}          />
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
<Stack.Screen name="Home">
  {(props) => (
    <Home
      {...props}
      ref={homeRef}
      notifsEnabled={notificationsEnabled}
      selectedTeamIds={selectedTeamIds}
    />
  )}
</Stack.Screen>
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
      <Stack.Screen name="FicheCoach" component={FicheCoach} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AccueilJeu" component={AccueilJeu} />
      <Stack.Screen name="Jeu" component={Jeu} />
      <Stack.Screen name="MonProfil" component={MonProfil} />
      <Stack.Screen name="HistoriquePronos" component={HistoriquePronos} />
      <Stack.Screen name="ClassementJeu" component={ClassementJeu} />
      <Stack.Screen name="Notifs">
        {(props) => (
          <Notifs
            {...props}
            onSave={(ids) => setSelectedTeamIds(ids)}
            onNotifStatusChange={setNotificationsEnabled}
            triggerHeaderShake={() => headerRef.current?.triggerShake()}
                  onResetTeam={() => setSelectedTeamIds(null)} // ✅ ← ajoute cette prop
          />                    
        )}
      </Stack.Screen>
      <Stack.Screen name="NotifsPlus">
        {(props) => (
          <NotifsPlus
            {...props}
            onSave={(id) => setSelectedTeamIds(id)}
            onNotifStatusChange={setNotificationsEnabled}
            triggerHeaderShake={() => headerRef.current?.triggerShake()}
                  onResetTeam={() => setSelectedTeamIds(null)} // ✅ ← ajoute cette prop
          />                    
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}