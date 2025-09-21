import React from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import Tableau from '../components/Tableau';  // Assurez-vous que Tableau est compatible avec React Native
import Classement from '../components/Classement';  // Idem pour ClassementChampionnat
import { useState, useEffect } from 'react';
import Precedent from '../components/Precedent';

function FicheChampionnat({ route }) {
    const { id } = route.params;  // Récupère l'ID du championnat depuis les paramètres de navigation

    const { width } = useWindowDimensions();
      
          const isMediumScreen = width <= 1024 && width > 767;

    const [currentRound, setCurrentRound] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

    const [rounds, setRounds] = useState()

    const [calendrier, setCalendrier] = useState(true)
    const [classement, setClassement] = useState(false)

    const openCalendrier = ()=> {
      setCalendrier(true)
      setClassement(false)
    }

    const openClassement = ()=> {
      setCalendrier(false)
      setClassement(true)
    }
    
      useEffect(() => {
  const fetchData = async () => {
    try {
      const season =  2025;

      const [roundsRes, currentRoundRes] = await Promise.all([
        fetch(`https://v3.football.api-sports.io/fixtures/rounds?league=${id}&season=${season}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        }),
        fetch(`https://v3.football.api-sports.io/fixtures/rounds?season=${season}&league=${id}&current=true`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        }),
      ]);

      const roundsJson = await roundsRes.json();
      const currentJson = await currentRoundRes.json();

      setRounds(roundsJson.response);

if (currentJson.response && currentJson.response.length > 0) {
  setCurrentRound(currentJson.response[0]);
} else {
  console.warn("Aucun round actuel détecté, fallback sur le dernier round");
  setCurrentRound(roundsJson.response?.[roundsJson.response.length - 1]);
}
    } catch (error) {
      console.error("Erreur de chargement des rounds ou du round actuel :", error);
      setError(true); // Mettre à jour l'état en cas d'erreur
    } finally {
      setLoading(false); // ✅ Toujours appelé une seule fois à la fin
    }
  };

  fetchData();
}, [id]);

 if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

if (error) {
  return <Text>Une erreur est survenue lors du chargement des données.</Text>;
}
  
    const journey = rounds.indexOf(currentRound);

    console.log('currentRound:', currentRound);
console.log('rounds:', rounds);

    return (
      <View style={{flex: 1}}>
      <Precedent />

        <ScrollView contentContainerStyle={[styles.blocChamp, isMediumScreen && {padding: 30}]}>
          <View style={{flexDirection: "row", marginBlock: 8, justifyContent: "center", gap: "5%"}}>
  <TouchableOpacity onPress={openCalendrier} >
    <Text style={calendrier ? styles.selected : styles.unSelected}>Calendrier</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={openClassement}>
    <Text style={classement ? styles.selected : styles.unSelected}>Classement</Text>
  </TouchableOpacity>
</View>
            {calendrier && <Tableau id={id} currentRound={currentRound} rounds={rounds} journey={journey} />}
            {classement && <Classement id={id} />}
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    blocChamp: {
      marginTop: 50,
        paddingBlock: 10,
        width: "100%",
        flexGrow: 1,
        paddingBottom: 130,
    },
    
    selected: {
      fontFamily: "Kanitt",
      textDecorationLine: "underline",

    },
    unSelected: {
      fontFamily: "Kanitt",
      color: "grey"
    }
});

export default FicheChampionnat;