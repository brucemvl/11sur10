import React from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import Tableau from '../components/Tableau';  // Assurez-vous que Tableau est compatible avec React Native
import Classement from '../components/Classement';  // Idem pour ClassementChampionnat
import { useState, useEffect } from 'react';
import Precedent from '../components/Precedent';

function FicheChampionnat({ route }) {
    const { id } = route.params;  // Récupère l'ID du championnat depuis les paramètres de navigation


    const [currentRound, setCurrentRound] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

    const [rounds, setRounds] = useState()
    
      useEffect(() => {
  const fetchData = async () => {
    try {
      const season = id === 71 || id === 253 || id === 15 ? 2025 : 2024;

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

        <ScrollView contentContainerStyle={styles.blocChamp}>
            {/* Passer l'ID du championnat et la fonction setFilter aux composants */}
            <Tableau id={id} currentRound={currentRound} rounds={rounds} journey={journey} />
            <Classement id={id} />
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    blocChamp: {
      marginTop: 50,
        padding: 10,
        width: "100%",
        flexGrow: 1,
        paddingBottom: 50,

    },
});

export default FicheChampionnat;