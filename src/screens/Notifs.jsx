import React, { useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerForPushNotificationsAsync from '../utils/registerPush';
import axios from "axios"
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const leagues = [
  { id: 39, name: 'Premier League', logo: "https://media.api-sports.io/football/leagues/39.png" },
  { id: 140, name: 'La Liga', logo: "https://media.api-sports.io/football/leagues/140.png" },
  { id: 135, name: 'Serie A', logo: "https://media.api-sports.io/football/leagues/135.png" },
  { id: 78, name: 'Bundesliga', logo: "https://media.api-sports.io/football/leagues/78.png" },
  { id: 61, name: 'Ligue 1' },
  { id: 1, name: 'UEFA Champions League', logo: "https://media.api-sports.io/football/leagues/1.png" },
  { id: 2, name: 'Europa League', logo: "https://media.api-sports.io/football/leagues/2.png" },
    { id: 848, name: 'Europa League Conference', logo: "https://media.api-sports.io/football/leagues/848.png" },

];

function Notifs({ onSave, onNotifStatusChange, triggerHeaderShake }) {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [savedLeague, setSavedLeague] = useState(null);
const scaleAnimMap = useRef({}).current;

leagues.forEach(league => {
  if (!scaleAnimMap[league.id]) {
    scaleAnimMap[league.id] = new Animated.Value(1);
  }
});
  useEffect(() => {
    const fetchSavedLeague = async () => {
      const stored = await AsyncStorage.getItem('leagueId');
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed)) {
          setSavedLeague(parsed);
          setSelectedLeague(parsed);
        }
      }
    };
    fetchSavedLeague();
  }, []);

  const animateText = (id) => {
  Animated.sequence([
    Animated.timing(scaleAnimMap[id], {
      toValue: 1.5,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnimMap[id], {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
  ]).start();
};


 const handleSelectLeague = (id) => {
  setSelectedLeague(id);
  animateText(id); // ← on passe l'id spécifique
};

  const saveLeague = async () => {
    try {
      await AsyncStorage.setItem('leagueId', selectedLeague.toString());
      setSavedLeague(selectedLeague);
      onSave?.(selectedLeague);
      onNotifStatusChange?.(true);  // ← activer les notifs
      triggerHeaderShake?.();       // ← lancer l’animation
      await registerForPushNotificationsAsync();
      alert('✅ Ligue enregistrée et notifs mises à jour !');
    } catch (err) {
      console.error('Erreur enregistrement leagueId:', err);
    }
}

const disablePushNotifications = async () => {
  try {
    const token = (await Notifications.getExpoPushTokenAsync({
  projectId: Constants?.easConfig?.projectId,
})).data;

    // ⚠️ Important : supprimer côté serveur aussi
    await axios.post('https://one1sur10.onrender.com/api/unregister-push-token', {
      token,
    });

    console.log('🚫 Token supprimé côté serveur');

    alert('🔕 Notifications désactivées');
  } catch (error) {
    console.error('Erreur lors de la désactivation des notifications:', error.message);
    if (error.response) {
      console.error('Réponse du serveur :', error.response.data);
    }
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choisis ta ligue préférée :</Text>

{savedLeague && (
        <Text style={styles.saved}>
          ✅ Ligue actuelle : {leagues.find((l) => l.id === savedLeague)?.name}
        </Text>
      )}

      {leagues.map((league) => (
        <TouchableOpacity
          key={league.id}
          style={[
            styles.leagueButton,
            selectedLeague === league.id && styles.selectedLeague,
          ]}
          onPress={() => handleSelectLeague(league.id)}
        >
          <Animated.Text
            style={[
              styles.leagueText,
              selectedLeague === league.id && { transform: [{ scale: scaleAnimMap[league.id] }]
, color: "white", fontFamily: "Kanitt" },
            ]}
          >
            {league.name}
          </Animated.Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={saveLeague}
              style={{backgroundColor: "#007BFF", height: 40, width: "40%", alignItems: "center", justifyContent: "center", marginBlock: 20, borderRadius: 10}}

        disabled={selectedLeague === null}
      >
        <Text style={{fontFamily: "Kanitt", fontSize: 16, color: "white"}}>Enregistrer</Text>
        </TouchableOpacity>

     <Button
  title='Desactiver les Notifs'
  color={"red"}
  onPress={async () => {
    await AsyncStorage.removeItem('leagueId');
    setSelectedLeague(0);
    setSavedLeague(0);
    onNotifStatusChange?.(false);
    triggerHeaderShake?.(); // ← vibration aussi
    await disablePushNotifications();
    alert('🔕 Notifications désactivées');
  }}
/>
    

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: "center", padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, fontFamily: "Kanitalik" },
  leagueButton: {
    padding: 10,
    marginVertical: 7,
    backgroundColor: 'rgb(210, 210, 210)',
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    width: "90%"
  },
  selectedLeague: {
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,

  },
  leagueText: {
    fontSize: 16,
    color: '#000',
    fontFamily: "Kanito"
  },
  saved: {
    marginTop: 15,
    fontStyle: 'italic',
    color: 'green',
  },
});

export default Notifs;