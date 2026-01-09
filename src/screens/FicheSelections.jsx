import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import TableauSelections from '../components/TableauSelections';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Precedent from '../components/Precedent';
import Classement from '../components/Classement';
import cloche from "../assets/cloche3.png"
import * as Haptics from "expo-haptics"


function FicheSelections() {
  const route = useRoute();

  const navigation = useNavigation()

  const { width } = useWindowDimensions();
        
            const isMediumScreen = width <= 1024 && width > 767;

  const { id } = route.params;
const [calendrier, setCalendrier] = useState(true)
    const [classement, setClassement] = useState(false)
    const [currentRound, setCurrentRound] = useState();
    
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(false);
    
        const [rounds, setRounds] = useState()

    const openCalendrier = ()=> {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCalendrier(true)
          setClassement(false)
        }
    
        const openClassement = ()=> {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCalendrier(false)
          setClassement(true)
        }

              const season = id === 34 || id === 1 ? "2026" : id === 29 ? "2023" : id === 6 ? "2025" : "2024";


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
    <View style={{flex: 1}}>
    <Precedent />

    <ScrollView contentContainerStyle={[styles.blocFicheSelections, isMediumScreen && {padding: 50}]}>
      {id === 6 ? <TouchableOpacity onPress={() => navigation.navigate("Notifs", {openCan: true})} style={{marginBlock: 10, flexDirection: "row", alignItems: "center", gap: 5, borderWidth: 2, padding: 5, borderRadius: 10, backgroundColor: "rgba(121, 121, 121, 1)", shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 6, elevation: 5,}}>
        <Image source={cloche} style={{height: 35, width: 35, objectFit: "contain"}}/>
        <Text style={{fontFamily: "Kanitalik", color: "white", fontSize: 12}}>Suivez votre equipe</Text>
      </TouchableOpacity>
      : null}
      <View style={{flexDirection: "row", marginBlock: 8, justifyContent: "center", gap: "5%"}}>
  <TouchableOpacity onPress={openCalendrier} accessible accessibilityRole="button" accessibilityLabel="Calendrier" accessibilityState={{ selected: calendrier }}  accessibilityHint="Calendrier des matchs" >
          <Text style={calendrier ? styles.selected : styles.unSelected}>Calendrier</Text>
        </TouchableOpacity>
  <TouchableOpacity onPress={openClassement} accessible accessibilityRole="button" accessibilityLabel="Classement" accessibilityState={{ selected: classement }}  accessibilityHint="Afficher les Classements">
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
    paddingTop: 50,
            paddingBottom: 140,
            flexGrow: 1,
            alignItems: "center"

  },
  
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selected: {
      fontFamily: "Bangers",
      borderBottomColor: "red",
      borderBottomWidth: 4,
      letterSpacing: 1,
      padding: 2

    },
    unSelected: {
      fontFamily: "Bangers",
      color: "grey",
      padding: 2
    }
});

export default FicheSelections;