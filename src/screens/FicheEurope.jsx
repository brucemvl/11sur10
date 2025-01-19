import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TableauEurope from '../components/TableauEurope';  // Assurez-vous que Tableau est compatible avec React Native
import Classement from '../components/Classement';  // Idem pour ClassementChampionnat
import { useState, useEffect } from 'react';
import Precedent from '../components/Precedent';

function FicheEurope({ route }) {
    const { id } = route.params;  // Récupère l'ID du championnat depuis les paramètres de navigation

    const [currentRound, setCurrentRound] = useState("");

    useEffect(() => {
      const fetchRound = async () => {
        try {
          const response = await fetch(`https://v3.football.api-sports.io/fixtures/rounds?season=2024&league=${id}&current=true`, {
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
            <TableauEurope id={id} currentRound={currentRound}/>
            <Classement id={id} />
        </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    blocChamp: {
        flexGrow: 1, // Cette ligne garantit que le contenu du ScrollView occupe l'espace disponible
        padding: 10,
        width: "100%",
        marginTop: 50,
        paddingBottom: 50
    },
});

export default FicheEurope;