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
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerForPushNotificationsAsync from '../utils/registerPush';
import axios from "axios"
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from "expo-haptics"

const teams = [
  { id: 85, name: 'Paris Saint Germain', logo: "https://media.api-sports.io/football/teams/85.png" },
  { id: 81, name: 'Marseille', logo: "https://media.api-sports.io/football/teams/81.png" },
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

const african = [
  { id: 31, name: 'Maroc', logo: "https://media.api-sports.io/football/teams/31.png" },
  { id: 1500, name: 'Mali', logo: "https://media.api-sports.io/football/teams/1500.png" },
  { id: 13, name: 'Senegal', logo: "https://media.api-sports.io/football/teams/13.png" },
  { id: 28, name: 'Tunisie', logo: "https://media.api-sports.io/football/teams/28.png" },
  { id: 1508, name: 'Congo', logo: "https://media.api-sports.io/football/teams/1508.png" },
    { id: 1501, name: 'Cote d Ivoire', logo: "https://media.api-sports.io/football/teams/1501.png" },
        { id: 1530, name: 'Cameroun', logo: "https://media.api-sports.io/football/teams/1530.png" },
    { id: 1532, name: 'Algerie', logo: "https://media.api-sports.io/football/teams/1532.png" },
    { id: 32, name: 'Egypte', logo: "https://media.api-sports.io/football/teams/32.png" },
        { id: 1524, name: 'Comores', logo: "https://media.api-sports.io/football/teams/1524.png" },
        { id: 1503, name: 'Gabon', logo: "https://media.api-sports.io/football/teams/1503.png" },
        { id: 19, name: 'Nigeria', logo: "https://media.api-sports.io/football/teams/19.png" },


];

const allTeams = [...teams, ...african]

function Notifs({ onSave, onNotifStatusChange, triggerHeaderShake }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [savedTeam, setSavedTeam] = useState(null);
const scaleAnimMap = useRef({}).current;
const [loading, setLoading] = useState(false);

const { width } = useWindowDimensions();
  
      const isMediumScreen = width <= 1024 && width > 767;

const navigation = useNavigation()

const route = useRoute()

const [clubs, setClubs]= useState(true)
const [selectedClubs, setSelectedClubs]= useState(true)

const [can, setCan] = useState(false)
const [selectedCan, setSelectedCan]= useState(false)


const openClubs = ()=> {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  setClubs(true)
  setCan(false)
  setSelectedClubs(true)
  setSelectedCan(false)
}

const openCan = ()=> {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  setClubs(false)
  setCan(true)
  setSelectedClubs(false)
  setSelectedCan(true)
}

teams.forEach(team => {
  if (!scaleAnimMap[team.id]) {
    scaleAnimMap[team.id] = new Animated.Value(1);
  }
});

african.forEach(team => {
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
      toValue: 1.8,
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

useEffect(() => {
  if (route.params?.openCan) {
    setClubs(false);
    setCan(true);
    setSelectedClubs(false);
    setSelectedCan(true);
  }
}, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Choisis ton equipe préférée :</Text>
<Text style={{textAlign:"center", fontFamily: "Kanitalic", color: "rgb(49, 49, 49)", marginBottom: 10}}>et recois une notification lorsque celle ci marque ou encaisse un but</Text>
{savedTeam && 
        <Text style={styles.saved}>
          ✅ Equipe actuelle : {allTeams.find((t) => t.id === savedTeam)?.name}
        </Text>
      }
      <View style={{flexDirection: "row", gap: 20, marginBlock: 15}}>
        <TouchableOpacity onPress={openClubs} style={[styles.bouton, selectedClubs && styles.selected]}><Text style={[styles.textbouton, selectedClubs && {color: "white", fontFamily: "Kanitt"}]}>Clubs</Text></TouchableOpacity>
                <TouchableOpacity onPress={openCan} style={[styles.bouton, selectedCan && styles.selected]}><Text style={[styles.textbouton, selectedCan && {color: "white", fontFamily: "Kanitt"}]}>CAN</Text></TouchableOpacity>

      </View>
      { clubs &&
<View style={{width: "100%", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: isMediumScreen? 18 : 8, marginBlock: 12}}>
      {teams.map((team) => 
        <TouchableOpacity
          key={team.id}
          style={[
            styles.teamButton,
            selectedTeam === team.id && styles.selectedTeam,
            isMediumScreen && {height: 125, width: "20%"}
          ]}
          onPress={() => handleSelectTeam(team.id)}
        >
          <Animated.Image
            style={[
              styles.teamLogo,
              selectedTeam === team.id && { transform: [{ scale: scaleAnimMap[team.id] }]},
              isMediumScreen && {height: 55, width: 55}
            ]}
            source={{uri: team.logo}}
          />
            
        </TouchableOpacity>
      )}

      <TouchableOpacity
          style={[
            styles.teamButton,
             isMediumScreen && {height: 125, width: "20%"}
          ]}
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); navigation.navigate("NotifsPlus")}}
        >
          <Text style={{fontFamily: "Kanitt", fontSize: 40}}>+</Text>
            
        </TouchableOpacity>
      </View>
}
{can && <View style={{width: "100%", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: isMediumScreen ? 18 : 8, marginBlock: 12}}>
      {african.map((team) => 
        <TouchableOpacity
          key={team.id}
          style={[
            styles.teamButton,
            selectedTeam === team.id && styles.selectedTeamCan,
                        isMediumScreen && {height: 125, width: "20%"}

          ]}
          onPress={() => handleSelectTeam(team.id)}
        >
          <Animated.Image
            style={[
              styles.teamLogo,
              selectedTeam === team.id && { transform: [{ scale: scaleAnimMap[team.id] }]
 },
               isMediumScreen && {height: 55, width: 55}

            ]}
            source={{uri: team.logo}}
          />
            
        </TouchableOpacity>
      )}
      </View>
      }

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
    backgroundColor: 'rgba(215, 215, 215, 1)',
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    width: "24%",
    height: 85
  },
  selectedTeam: {
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4

  },
  selectedTeamCan: {
    backgroundColor: '#db590dff',
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
  bouton: {
    backgroundColor: "rgba(184, 184, 184, 1)",
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  selected: {
backgroundColor: "rgba(47, 142, 232, 1)",
shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
     shadowOpacity: 0.6,
     shadowRadius: 3.5,
     elevation: 5,

  },
  textbouton: {
    fontFamily: "Kanito"
  }
});

export default Notifs;