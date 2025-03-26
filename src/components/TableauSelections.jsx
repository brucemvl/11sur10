import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Match from './Match'; // Assurez-vous que Match est aussi adapté pour React Native
import JourneesSelections from './JourneesSelections'; // Assurez-vous que ce composant est aussi adapté pour React Native

function TableauSelections({ id, currentRound, journey }) {
  const [teamF, setTeamF] = useState([]);
  

  useEffect(() => {
    const fetchDataPhaseFinale = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${id}&season=${id === 29 ? "2023" : "2024"}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        });
        const json = await response.json();
        setTeamF(json.response.slice(156));
        if (id === 29){
          setTeamF(json.response)
        }
      } catch (error) {
        console.error('Error fetching data for final phase:', error);
      }
    };
    fetchDataPhaseFinale();
  }, [id]);



  const round = teamF.reduce(
    (acc, elem) =>
      acc.includes(elem.league.round) ? acc : acc.concat(elem.league.round),
    []
  );

  console.log(round)

  const roundd = round.map((element)=> element.slice(element.length - 4))
  console.log(teamF)

  const [filter, setFilter] = useState(journey);


  const currentIndex = roundd.findIndex((x) => {
    const num1 = parseInt(x.split('-')[1]);
    const num2 = parseInt(currentRound.split('-')[1]);
    return num1 === num2;
  });

  

  const phases = ["Group Stage - 1", "Group Stage - 2", "Group Stage - 3", "Group Stage - 4", "Group Stage - 5", "Group Stage - 6", "Group Stage - 7", "Group Stage - 8", "Group Stage - 9", "Group Stage - 10",]

 const [index, setIndex] = useState(journey - 1)

 const prev = ()=>{
  setIndex(index-1)

  if (index === 0){
    setIndex(0)
  }
 }

 const next = ()=>{
  setIndex(index+1)
 
 }

  return (
    id === 29 ? <View style={styles.container}>
 <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginBlock: 15}}>
         <TouchableOpacity style={{height: 34, width: 30, alignItems: "center"}} onPress={prev}><Text style={styles.buttonText}>{"<"}</Text></TouchableOpacity>   <Text style={{color: "black", fontFamily: "Permanent", fontSize: 16}}> {phases[index] === "Quarter-finals" ? "Quarts de finale" : phases[index] === "Round of 16" ? "Huitiemes de finale" : phases[index]}</Text><TouchableOpacity style={{height: 34, width: 30, alignItems: "center"}} onPress={next}><Text style={styles.buttonText}>{">"}</Text></TouchableOpacity>
 </View>

    {
    teamF.map((match)=>
      phases[index] === match.league.round ? 
      <Match
        equipeDom={match.teams.home.name}
        id={match.fixture.id}
        equipeExt={match.teams.away.name}
        logoDom={match.teams.home.logo}
        round={match.league.round}
        logoExt={match.teams.away.logo}
        scoreDom={match.goals.home}
        scoreExt={match.goals.away}
        date={match.fixture.date}
      /> : null)
  
}
        
      
    </View> :
    <View style={styles.container}>
      


      <Text style={styles.header}>Phase finale</Text>
      <JourneesSelections
        setFilter={setFilter}
        round={round}
        roundd={roundd}
        currentRound={currentRound}
        filter={filter}
        id={id}
        team={teamF}
        currentIndex={currentIndex}
      />
      <FlatList
        data={teamF}
        keyExtractor={(item) => "match" + item.fixture.id}
        renderItem={({ item }) => {
          if (!filter || filter === item.league.round) {
            return (
              <Match
                equipeDom={item.teams.home.name}
                id={item.fixture.id}
                equipeExt={item.teams.away.name}
                logoDom={item.teams.home.logo}
                round={item.league.round}
                logoExt={item.teams.away.logo}
                scoreDom={item.goals.home}
                scoreExt={item.goals.away}
                date={item.fixture.date}
              />
            );
          }
          return null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: "center",
    alignItems: "center"
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