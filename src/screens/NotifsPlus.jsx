import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Precedent from "../components/Precedent";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Button } from "react-native";
import Toast from "react-native-toast-message";
import registerForPushNotificationsAsync from '../utils/registerPush';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import axios from "axios"


function NotifsPlus({ onSave, onNotifStatusChange, triggerHeaderShake }){

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [league, setLeague] = useState(61)
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false)
    const [savedTeam, setSavedTeam] = useState(null);
  


  const leagues = [
    {
        "id": 61,
        "name": "Ligue 1",
        "country": "France",
        "logo": "https://media.api-sports.io/football/leagues/61.png",
        "flag": "https://media.api-sports.io/flags/fr.svg",
        "season": 2025,
    },

    {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media.api-sports.io/football/leagues/39.png",
        "flag": "https://media.api-sports.io/flags/gb.svg",
        "season": 2025,
    },


    {
        "id": 140,
        "name": "La Liga",
        "country": "Spain",
        "logo": "https://media.api-sports.io/football/leagues/140.png",
        "flag": "https://media.api-sports.io/flags/es.svg",
        "season": 2025,
    },

    {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media.api-sports.io/football/leagues/78.png",
        "flag": "https://media.api-sports.io/flags/de.svg",
        "season": 2025
    },

    {
        "id": 135,
        "name": "Serie A",
        "country": "Italy",
        "logo": "https://media.api-sports.io/football/leagues/135.png",
        "flag": "https://media.api-sports.io/flags/it.svg",
        "season": 2025,
    },

    
    {
        "id": 94,
        "name": "Primeira Liga",
        "country": "Portugal",
        "logo": "https://media.api-sports.io/football/leagues/94.png",
        "flag": "https://media.api-sports.io/flags/pt.svg",
        "season": 2025,
    },
  ]

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        `https://v3.football.api-sports.io/teams?league=${league}&season=2025`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        }
      );
      const json = await response.json();
      setTeams(json.response || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [league]);

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
    <View style={{ flex: 1 }}>
      <Precedent />

      {/* ✅ SCROLLVIEW SANS LE PICKER */}
      <View style={styles.container}>
        <Text style={styles.title}>Choisis ton equipe préférée :</Text>
        <Text style={styles.subtitle}>
          et recois une notification lorsque celle ci marque ou encaisse un but
        </Text>

        {selectedTeam && (
  <Text style={{ marginTop: 15, fontFamily: "Kanitalic" }}>
    ✅ Équipe sélectionnée :{" "}
    {teams.find((t) => t.team.id === selectedTeam)?.team.name}
  </Text>
)}


        <View style={{flexDirection: "row", marginBlock: 30, gap: 15}}>
            {leagues.map((element)=> {

                            const isSelected = league === element.id


            const choix = ()=>  {
setLeague(element.id)
setSelected(true)
    }
    return(
            <TouchableOpacity style={[{width: 50, height: 50, alignItems: "center", justifyContent: "center", opacity: 0.3}, isSelected && styles.selected]} onPress={choix}><Image source={{uri: element.logo}} style={{width: element.id === 61 ? 60 : 40, height: element.id === 61 ? 60 : 40, objectFit: "contain"}} /></TouchableOpacity>)})}
        </View>

      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedTeam}
          onValueChange={(itemValue) => setSelectedTeam(itemValue)}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="-- Sélectionne une équipe --" value={null} />
          {teams.map((element) => (
            <Picker.Item
              key={element.team.id}
              label={element.team.name}
              value={element.team.id}
            />
          ))}
        </Picker>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    padding: 10,
    paddingBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Kanitalik",
  },

  picker: {
  width: "100%",
  height: 200,
},

  subtitle: {
    textAlign: "center",
    fontFamily: "Kanitalic",
    color: "rgb(49, 49, 49)",
    marginBottom: 10,
  },

  dropdownContainer: {
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  selected: {
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
     shadowOpacity: 0.6,
     shadowRadius: 3.5,
     elevation: 5,

  }
});

export default NotifsPlus;