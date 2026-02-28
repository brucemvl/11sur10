import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Button } from "react-native";
import Precedent from "../components/Precedent";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import registerForPushNotificationsAsync from '../utils/registerPush';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import axios from "axios";
import { useTranslation } from 'react-i18next';


function NotifsPlus({ onSave, onNotifStatusChange, triggerHeaderShake }) {

  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [league, setLeague] = useState(61);
  const [loading, setLoading] = useState(false);
  const [savedTeams, setSavedTeams] = useState([]);
  const [selected, setSelected] = useState()
  const {t} = useTranslation()

  const leagues = [
    { id: 61, name: "Ligue 1", logo: "https://media.api-sports.io/football/leagues/61.png" },
    { id: 39, name: "Premier League", logo: "https://media.api-sports.io/football/leagues/39.png" },
    { id: 140, name: "La Liga", logo: "https://media.api-sports.io/football/leagues/140.png" },
    { id: 78, name: "Bundesliga", logo: "https://media.api-sports.io/football/leagues/78.png" },
    { id: 135, name: "Serie A", logo: "https://media.api-sports.io/football/leagues/135.png" },
    { id: 94, name: "Primeira Liga", logo: "https://media.api-sports.io/football/leagues/94.png" },
  ];

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

  // Charger les équipes sauvegardées
  useEffect(() => {
    const fetchSavedTeams = async () => {
      const stored = await AsyncStorage.getItem('teamIds');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedTeams(parsed);
          setSelectedTeams(parsed);
        }
      }
    };
    fetchSavedTeams();
  }, []);

  // Toggle sélection d’une équipe
  const handleSelectTeam = (id) => {
    if (selectedTeams.includes(id)) {
      setSelectedTeams(prev => prev.filter(t => t !== id));
    } else {
      if (selectedTeams.length >= 5) {
        Toast.show({
          type: 'error',
          text1: '❌ Limite atteinte',
          text2: 'Tu ne peux sélectionner que 5 équipes.',
        });
        return;
      }
      setSelectedTeams(prev => [...prev, id]);
    }
  };

  const saveTeams = async () => {
  if (selectedTeams.length === 0) return;

  setLoading(true);
  try {
    // 1️⃣ Sauvegarde locale
    await AsyncStorage.setItem('teamIds', JSON.stringify(selectedTeams));
    setSavedTeams(selectedTeams);

    // 2️⃣ Récupération du token Expo
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.easConfig?.projectId,
    });

    const token = tokenData.data;

    // 3️⃣ Envoyer au serveur
    await axios.post(
      'https://one1sur10.onrender.com/api/register-push-token',
      {
        token: token,
        teamIds: selectedTeams,
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    // 4️⃣ Callback pour UI
    onSave?.(selectedTeams);
    onNotifStatusChange?.(true);
    triggerHeaderShake?.();

    Toast.show({
      type: 'success',
      text1: '✅ Équipes enregistrées',
      text2: 'Tu recevras des notifications pour tes équipes !'
    });

  } catch (err) {
    console.error("Erreur enregistrement équipes :", err.response?.data || err.message);
    Toast.show({
      type: 'error',
      text1: '❌ Erreur',
      text2: 'Impossible d’enregistrer tes équipes.'
    });
  } finally {
    setLoading(false);
  }
};

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

      <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center", paddingTop: 50, paddingBottom: 100}}>
        <Text style={styles.title}>{t("titreNotifs")}</Text>
        <Text style={styles.subtitle}>{t("sousTitreNotifs")}</Text>

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

        {selectedTeams.length > 0 && (
          <Text style={{ marginTop: 15, fontFamily: "Kanitalic" }}>
            ✅ Équipe(s) sélectionnée(s) :{" "}
            {selectedTeams.map(id => teams.find(t => t.team.id === id)?.team.name).filter(Boolean).join(', ')}
          </Text>
        )}

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBlock: 30, gap: 15, alignItems: "center", justifyContent: "center" }}>
          {teams.map(({ team }) => (
            <TouchableOpacity
              key={team.id}
              style={[
                { width: 50, height: 50, alignItems: "center", justifyContent: "center", opacity: 0.3 },
                selectedTeams.includes(team.id) && styles.selected
              ]}
              onPress={() => handleSelectTeam(team.id)}
            >
              <Image source={{ uri: team.logo }} style={{ width: 40, height: 40, objectFit: "contain" }} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={saveTeams}
          style={{ backgroundColor: "#007BFF", height: 40, width: "40%", alignItems: "center", justifyContent: "center", marginBlock: 10, borderRadius: 10 }}
          disabled={selectedTeams.length === 0 || loading}
        >
          {loading ? <ActivityIndicator size="small" color="#fff" /> :
            <Text style={{ fontFamily: "Kanitt", fontSize: 16, color: "white" }}>{t("enregistrer")}</Text>
          }
        </TouchableOpacity>

        <Button
      title={t('disableNotifications')}
      color="red"
      onPress={async () => {
        await AsyncStorage.removeItem('teamIds');
        setSelectedTeams([]);
        setSavedTeams(null);
        onNotifStatusChange?.(false);
        onSave?.([]); // ← force Header à effacer le logo
        triggerHeaderShake?.();
        await disablePushNotifications();
        Toast.show({
          type: 'info',
          text1: t('notificationsDisabledTitle'),
          text2: t('notificationsDisabledMessage'),
        });
      }}
    />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Kanitalik",
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "Kanitalic",
    color: "rgb(49, 49, 49)",
    marginBottom: 10,
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