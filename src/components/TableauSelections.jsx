import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Match from './Match'; // Assurez-vous que Match est aussi adapté pour React Native
import JourneesSelections from './JourneesSelections'; // Assurez-vous que ce composant est aussi adapté pour React Native

function TableauSelections({ id, currentRound, journey }) {
  const [teamF, setTeamF] = useState([]);
  

  useEffect(() => {
    const fetchDataPhaseFinale = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${id}&season=2024`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        });
        const json = await response.json();
        setTeamF(json.response.slice(156));
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

  const roundd = round.map((element)=> element.slice(element.length - 5))
  console.log(roundd)

  const [filter, setFilter] = useState(journey);


  const currentIndex = roundd.findIndex((x) => {
    const num1 = parseInt(x.split('-')[1]);
    const num2 = parseInt(currentRound.split('-')[1]);
    return num1 === num2;
  });

  if (teamF.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
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
    padding: 0,
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
});

export default TableauSelections;