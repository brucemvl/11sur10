import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Tableau from '../components/Tableau';  // Assurez-vous que Tableau est compatible avec React Native
import Classement from '../components/Classement';  // Idem pour ClassementChampionnat
import { useState, useEffect } from 'react';
import Precedent from '../components/Precedent';

function FicheChampionnat({ route }) {
    const { id } = route.params;  // Récupère l'ID du championnat depuis les paramètres de navigation


    const [currentRound, setCurrentRound] = useState("");


  useEffect(() => {
    const fetchRound = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures/rounds?season=${id === 71 || id === 253 || id === 15 ? 2025 : 2024}&league=${id}&current=true`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setCurrentRound(json.response[0]);
        }

        if (id === 61 || id === 62 || id === 78){
          setCurrentRound("Regular Season - 34")
        }

        if (id === 88){
          setCurrentRound("Regular Season - 32")
        }

        if (id === 140 || id === 39 || id === 135){
          setCurrentRound("Regular Season - 38")
        }

         if (json.response[0].indexOf("Conference") !== -1) {
          setCurrentRound("Regular Season 26");
        }
        
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchRound();
  }, [id]);

    return (
      <View style={{flex: 1}}>
      <Precedent />

        <ScrollView contentContainerStyle={styles.blocChamp}>
            {/* Passer l'ID du championnat et la fonction setFilter aux composants */}
            <Tableau id={id} currentRound={currentRound} />
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