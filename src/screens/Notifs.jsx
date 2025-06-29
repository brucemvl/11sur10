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

const teams = [
  { id: 85, name: 'Paris Saint Germain', logo: "https://media.api-sports.io/football/teams/85.png" },
  { id: 81, name: 'Marseille', logo: "https://media.api-sports.io/football/teams/81.png" },
  { id: 84, name: 'Nice', logo: "https://media.api-sports.io/football/teams/84.png" },
  { id: 91, name: 'Monaco', logo: "https://media.api-sports.io/football/teams/91.png" },
  { id: 541, name: 'Real Madrid', logo: "https://media.api-sports.io/football/teams/541.png" },
    { id: 529, name: 'FC Barcelone', logo: "https://media.api-sports.io/football/teams/529.png" },
        { id: 33, name: 'Manchester United', logo: "https://media.api-sports.io/football/teams/33.png" },
    { id: 49, name: 'Chelsea', logo: "https://media.api-sports.io/football/teams/49.png" },
        { id: 42, name: 'Arsenal', logo: "https://media.api-sports.io/football/teams/42.png" },
    { id: 157, name: 'Bayern Munich', logo: "https://media.api-sports.io/football/teams/157.png" },



];

function Notifs({ onSave, onNotifStatusChange, triggerHeaderShake }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [savedTeam, setSavedTeam] = useState(null);
const scaleAnimMap = useRef({}).current;

teams.forEach(team => {
  if (!scaleAnimMap[team.id]) {
    scaleAnimMap[team.id] = new Animated.Value(1);
  }
});
  useEffect(() => {
    const fetchSavedTeam = async () => {
      const stored = await AsyncStorage.getItem('teamId');
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed)) {
          setSavedTeam(parsed);
          setSelectedTeam(parsed);
        }
      }
    };
    fetchSavedTeam();
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


 const handleSelectTeam = (id) => {
  setSelectedTeam(id);
  animateText(id); // ← on passe l'id spécifique
};

  const saveTeam = async () => {
    try {
      await AsyncStorage.setItem('teamId', selectedTeam.toString());
      setSavedTeam(selectedTeam);
      onSave?.(selectedTeam);
      onNotifStatusChange?.(true);  // ← activer les notifs
      triggerHeaderShake?.();       // ← lancer l’animation
      await registerForPushNotificationsAsync();
      alert('✅ Equipe enregistrée et notifs mises à jour !');
    } catch (err) {
      console.error('Erreur enregistrement teamId:', err);
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
      <Text style={styles.title}>Choisis ton equipe préférée :</Text>
<Text style={{textAlign:"center", fontFamily: "Kanitalic", color: "rgb(49, 49, 49)", marginBottom: 10}}>et recois une notification lorsque celle ci marque ou encaisse un but</Text>
{savedTeam && (
        <Text style={styles.saved}>
          ✅ Equipe actuelle : {teams.find((t) => t.id === savedTeam)?.name}
        </Text>
      )}

      {teams.map((team) => (
        <TouchableOpacity
          key={team.id}
          style={[
            styles.teamButton,
            selectedTeam === team.id && styles.selectedTeam,
          ]}
          onPress={() => handleSelectTeam(team.id)}
        >
          <Animated.Text
            style={[
              styles.teamText,
              selectedTeam === team.id && { transform: [{ scale: scaleAnimMap[team.id] }]
, color: "white", fontFamily: "Kanitt" },
            ]}
          >
            {team.name}
          </Animated.Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={saveTeam}
              style={{backgroundColor: "#007BFF", height: 40, width: "40%", alignItems: "center", justifyContent: "center", marginBlock: 15, borderRadius: 10}}

        disabled={selectedTeam === null}
      >
        <Text style={{fontFamily: "Kanitt", fontSize: 16, color: "white"}}>Enregistrer</Text>
        </TouchableOpacity>

    <Button
  title='Desactiver les Notifs'
  color={"red"}
  onPress={async () => {
    await AsyncStorage.removeItem('teamId');
    setSelectedTeam(null);
    setSavedTeam(null);
    onNotifStatusChange?.(false);
    onSave?.(null); // ← force Header à effacer le logo
    triggerHeaderShake?.();
    await disablePushNotifications();
    alert('🔕 Notifications désactivées');
  }}
/>
    

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {alignItems: "center", padding: 10 },
  title: { fontSize: 18, fontWeight: 'bold',  fontFamily: "Kanitalik" },
  teamButton: {
    padding: 9,
    marginVertical: 4,
    backgroundColor: 'rgb(210, 210, 210)',
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    width: "90%"
  },
  selectedTeam: {
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,

  },
  teamText: {
    fontSize: 15,
    color: '#000',
    fontFamily: "Kanito"
  },
  saved: {
    marginTop: 5,
    fontStyle: 'italic',
    color: 'green',
  },
});

export default Notifs;