import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import TableauSelections from '../components/TableauSelections'; // Assurez-vous que ce composant est aussi adapté pour React Native
import { useRoute } from '@react-navigation/native';
import Precedent from '../components/Precedent';
import Classement from '../components/Classement';

function FicheSelections() {
  const route = useRoute();

  const { id } = route.params;
const [calendrier, setCalendrier] = useState(true)
    const [classement, setClassement] = useState(false)
    const [currentRound, setCurrentRound] = useState();
    
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(false);
    
        const [rounds, setRounds] = useState()

    const openCalendrier = ()=> {
      setCalendrier(true)
      setClassement(false)
    }

    const openClassement = ()=> {
      setCalendrier(false)
      setClassement(true)
    }

              const season = id === 34 ? "2026" : id === 29 ? "2023" : "2024";


       useEffect(() => {
  const fetchRounds = async () => {
    try {
      const response = await fetch(`https://v3.football.api-sports.io/fixtures/rounds?league=${id}&season=${season}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      });

      const result = await response.json();
     
      setRounds( result.response);  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rounds:', error);
    }
  };

  fetchRounds();
}, [id]);

console.log(rounds)

  useEffect(() => {
  const fetchRound = async () => {
    try {
      const response = await fetch(`https://v3.football.api-sports.io/fixtures/rounds?season=${season}&league=${id}&current=true`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      });
      const json = await response.json();
      setCurrentRound(json.response[0]); // 👈 ici on prend l’élément unique
    } catch (error) {
      console.error('Error fetching current round:', error);
    }
  };

  fetchRound();
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

const teamName = {
  "Germany" : "Allemagne",
  "Wales" : "Pays de Galles",
  "Netherlands" : "Pays Bas",
  "Belgium" : "Belgique",
  "Switzerland" : "Suisse",
  "Scotland" : "Ecosse",
  "Italy" : "Italie",
  "Sweden" : "Suede",
  "Austria" : "Autriche",
  "Hungary" : "Hoongrie",
    "Belarus" : "Bielorussie",
    "Spain" : "Espagne",
    "Morocco" : "Maroc",
      "Ivory Coast" : "Cote d'Ivoire",
      "Algeria" : "Algerie",

}

  return (
    <View>
    <Precedent />

    <ScrollView style={styles.blocFicheSelections}>
      <View style={{flexDirection: "row", marginBlock: 8, justifyContent: "center", gap: "5%"}}>
        <TouchableOpacity onPress={openCalendrier} >
          <Text style={calendrier ? styles.selected : styles.unSelected}>Calendrier</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openClassement}>
          <Text style={classement ? styles.selected : styles.unSelected}>Classement</Text>
        </TouchableOpacity>
      </View>
      
      {calendrier && <TableauSelections id={id} currentRound={currentRound} journey={journey} rounds={rounds} />}
                  {classement && <Classement id={id} />}

      
    
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  blocFicheSelections: {
    paddingBlock: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 50,

  },
  
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default FicheSelections;