import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Match from './Match';
import { Animated, Easing } from 'react-native';


function TableauSelections({ id, currentRound, rounds }) {
  const [teamF, setTeamF] = useState([]);
  const currentIndex = rounds.findIndex(round => round === currentRound);
const [index, setIndex] = useState(currentIndex !== -1 ? currentIndex : 0);

  const slideAnim = useState(new Animated.Value(0))[0]; // Valeur X animée
const [direction, setDirection] = useState('right'); // Pour savoir dans quel sens glisser

const animateSlide = (dir = 'right') => {
  slideAnim.setValue(dir === 'right' ? 300 : -300); // départ hors de l'écran
  Animated.spring(slideAnim, {
    toValue: 0,
    friction: 6, // + = plus amorti
    tension: 60, // + = plus rapide
    useNativeDriver: true,
  }).start();
};

 useEffect(() => {
  const fetchFixtures = async () => {
    try {
      const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${id}&season=${id === 29 ? '2023' : id === 34? "2026" : '2024'}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      });
      const json = await response.json();
      
      setTeamF(json.response);
      
      // 🧠 Détection automatique du prochain round
      const now = new Date();
      const futureRounds = json.response
        .filter(match => new Date(match.fixture.date) > now)
        .map(match => match.league.round);

      const nextRound = rounds.find(round => futureRounds.includes(round));
      const nextIndex = rounds.findIndex(round => round === nextRound);
      
      setIndex(nextIndex !== -1 ? nextIndex : 0); // Par défaut, commence au premier round
    } catch (error) {
      console.error('Erreur lors du chargement des matchs:', error);
    }
  };

  fetchFixtures();
}, [id]);
console.log(teamF)
  if(!teamF){
    return(
      <Text>Loading...</Text>
    )
  }

  // Navigation entre les rounds
  const prev = () => {
  if (index > 0) {
    setDirection('left');
    animateSlide('left');
    setIndex((prevIndex) => prevIndex - 1);
  }
};

const next = () => {
  if (index < rounds.length - 1) {
    setDirection('right');
    animateSlide('right');
    setIndex((prevIndex) => prevIndex + 1);
  }
};


  const currentRoundName = rounds[index];

const filteredMatches = teamF.filter((match) => match.league.round === currentRoundName);

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
  "Hungary" : "Hongrie",
  "Belarus" : "Bielorussie",
      "Spain" : "Espagne",
      "Morocco" : "Maroc",
      "Ivory Coast" : "Cote d'Ivoire",
      "Algeria" : "Algerie",
      

}

  return (
     <View style={styles.container}>


    
    

<View style={{flexDirection: "row", alignItems: "center", gap: 10, marginBlock: 15, justifyContent: "center"}}>
<TouchableOpacity onPress={prev} disabled={index === 0} style={{width: 30, height: 30, alignItems: "center"}}>
  <Text style={[styles.buttonText, index === 0 && { opacity: 0.3 }]}>{'<'}</Text>
</TouchableOpacity>
       <Text style={{color: "black", fontFamily: "Kanitalik", fontSize: 16, marginInline: 10}}>
          {currentRoundName === "Quarter-finals" ? "Quarts de finale" :
            currentRoundName === "Semi-finals" ? "Demi-finales" :
            currentRoundName === "Final" ? "Finale" :
            currentRoundName === "Round of 16" ? "Huitièmes de finale" :
            currentRoundName}
        </Text>
<TouchableOpacity onPress={next} disabled={index === rounds.length - 1} style={{width: 30, height: 30, alignItems: "center"}}>
  <Text style={[styles.buttonText, index === rounds.length - 1 && { opacity: 0.3 }]}>{'>'}</Text>
</TouchableOpacity> 
      </View>

      <Animated.View style={{ transform: [{ translateX: slideAnim }], width: "100%" }}>
  {filteredMatches?.map((match) => (
    <Match
      key={match.fixture.id}
      id={match.fixture.id}
      equipeDom={teamName[match.teams.home.name] || match.teams.home.name}
      logoDom={match.teams.home.logo}
      equipeExt={teamName[match.teams.away.name] || match.teams.away.name}
      logoExt={match.teams.away.logo}
      round={match.league.round}
      scoreDom={match.goals.home}
      scoreExt={match.goals.away}
      date={match.fixture.date}
    />
  ))}
</Animated.View>
    </View>
  
)
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'rgba(178, 178, 178, 1)',
    justifyContent: "center",
    alignItems: "center",
    marginInline: 5,
    borderRadius: 15
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: "black"
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: "Permanent",
    color: "black",
    fontSize: 20
  }
});

export default TableauSelections;