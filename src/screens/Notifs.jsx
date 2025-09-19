import React, { useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerForPushNotificationsAsync from '../utils/registerPush';
import axios from "axios"
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Toast from 'react-native-toast-message';

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
        { id: 40, name: 'Liverpool', logo: "https://media.api-sports.io/football/teams/40.png" },
    { id: 157, name: 'Bayern Munich', logo: "https://media.api-sports.io/football/teams/157.png" },
        { id: 114, name: 'Paris FC', logo: "https://media.api-sports.io/football/teams/114.png" },


];

function Notifs({ onSave, onNotifStatusChange, triggerHeaderShake }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [savedTeam, setSavedTeam] = useState(null);
const scaleAnimMap = useRef({}).current;
const [loading, setLoading] = useState(false);

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
      toValue: 1.7,
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
          setLoading(true); // ⬅️ début du chargement
      await AsyncStorage.setItem('teamId', selectedTeam.toString());
      setSavedTeam(selectedTeam);
      onSave?.(selectedTeam);
      onNotifStatusChange?.(true);  // ← activer les notifs
      triggerHeaderShake?.();       // ← lancer l’animation
      await registerForPushNotificationsAsync();
Toast.show({
  type: 'success',
  text1: '✅ Équipe enregistrée',
  text2: 'Tu recevras une notif lors des buts !',
});    } catch (err) {
      console.error('Erreur enregistrement teamId:', err);
    } finally {
    setLoading(false); // ⬅️ fin du chargement
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

Toast.show({
  type: 'info',
  text1: '🔕 Notifications désactivées',
  text2: 'Tu ne recevras plus d’alertes pour cette équipe.',
});  } catch (error) {
    console.error('Erreur lors de la désactivation des notifications:', error.message);
    if (error.response) {
      console.error('Réponse du serveur :', error.response.data);
    }
    Toast.show({
      type: 'error',
      text1: '❌ Erreur',
      text2: 'Impossible de désactiver les notifications.',
    });
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choisis ton equipe préférée :</Text>
<Text style={{textAlign:"center", fontFamily: "Kanitalic", color: "rgb(49, 49, 49)", marginBottom: 10}}>et recois une notification lorsque celle ci marque ou encaisse un but</Text>
{savedTeam && 
        <Text style={styles.saved}>
          ✅ Equipe actuelle : {teams.find((t) => t.id === savedTeam)?.name}
        </Text>
      }
<View style={{width: "100%", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 8, marginBlock: 12}}>
      {teams.map((team) => 
        <TouchableOpacity
          key={team.id}
          style={[
            styles.teamButton,
            selectedTeam === team.id && styles.selectedTeam,
          ]}
          onPress={() => handleSelectTeam(team.id)}
        >
          <Animated.Image
            style={[
              styles.teamLogo,
              selectedTeam === team.id && { transform: [{ scale: scaleAnimMap[team.id] }]
 },
            ]}
            source={{uri: team.logo}}
          />
            
        </TouchableOpacity>
      )}
      </View>

      <TouchableOpacity
        onPress={saveTeam}
              style={{backgroundColor: "#007BFF", height: 40, width: "40%", alignItems: "center", justifyContent: "center", marginBlock: 10, borderRadius: 10}}

        disabled={selectedTeam === null}
      >
 {loading ? 
    <ActivityIndicator size="small" color="#fff" />
   : 
    <Text style={{ fontFamily: "Kanitt", fontSize: 16, color: "white" }}>
      Enregistrer
    </Text>
  }        </TouchableOpacity>

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
Toast.show({
  type: 'info',
  text1: '🔕 Notifications désactivées',
  text2: 'Tu ne recevras plus d’alertes pour cette équipe.',
});  }}
/>
    

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
     padding: 10,
     paddingBottom: 120
     },
  title: { fontSize: 18, fontWeight: 'bold',  fontFamily: "Kanitalik" },
  teamButton: {
    padding: 9,
    backgroundColor: 'rgb(210, 210, 210)',
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    width: "26%",
    height: 90
  },
  selectedTeam: {
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4

  },
  teamLogo: {
    height: 40,
    width: 40,
    objectFit: "contain"
    
  },
  saved: {
    marginTop: 5,
    fontFamily: 'Kanitalic',
    color: 'green',
  },
});

export default Notifs;