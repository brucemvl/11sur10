import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import TableauSelections from '../components/TableauSelections'; // Assurez-vous que ce composant est aussi adapté pour React Native
import { useRoute } from '@react-navigation/native';
import Precedent from '../components/Precedent';

function FicheSelections({ setFilter }) {
  const [classement, setClassement] = useState();
  const [loading, setLoading] = useState(true);
  const [currentRound, setCurrentRound] = useState("League B - 6");


  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    const fetchRound = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures/rounds?season=2024&league=${id}&current=true`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        });
        const json = await response.json();
      } catch (error) {
        console.error('Error fetching current round:', error);
      }
    };
    fetchRound();
  }, [id]);

  console.log(currentRound)

  const journey = currentRound.slice(currentRound.length -1)
  console.log(journey)

  useEffect(() => {
    // Fetch data
    fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=2024`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setClassement(result.response[0].league.standings);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const classementPlat = classement.flatMap(arr => arr);

  return (
    <ScrollView style={styles.blocFicheSelections}>
      <Precedent />
      <TableauSelections id={id} currentRound={currentRound} journey={journey} />

      <View style={styles.tableaux}>
        {classement.map((subArray, index) => (
          <View key={`group${index}`} style={styles.groupe}>
            <Text style={styles.groupTitle}>{subArray[0].group}</Text>
            <View style={{margin: 10, borderRadius: 5, backgroundColor: "lightblue"}}>
            <View style={styles.barre}>
              <Text style={styles.barreItem_equipe}>Equipe</Text>
              <Text style={styles.barreItem}>J</Text>
              <Text style={styles.barreItem}>V</Text>
              <Text style={styles.barreItem}>N</Text>
              <Text style={styles.barreItem}>D</Text>
              <Text style={styles.barreItem}>Pts</Text>
            </View>
            <FlatList
              data={subArray}
              keyExtractor={(item) => `champ${item.team.id}`}
              renderItem={({ item }) => (
                <View style={styles.equipe}>
                  <Text style={{width: "2%", marginInline: "2%", fontFamily: "Kanitus"}}>{item.rank}</Text>
                  <Image style={styles.flags} source={{ uri: item.team.logo }} />
                  <Text style={{width: "34%", marginInline: "2%", fontFamily: "Kanito"}}>{item.team.name}</Text>
                  <Text style={{width: "10%", fontFamily: "Kanitus"}}>{item.all.played}</Text>
                  <Text style={{width: "10%", fontFamily: "Kanitus"}}>{item.all.win}</Text>
                  <Text style={{width: "10%", fontFamily: "Kanitus"}}>{item.all.draw}</Text>
                  <Text style={{width: "9%", fontFamily: "Kanitus"}}>{item.all.lose}</Text>
                  <Text style={{width: "11%", fontFamily: "Kanitt"}}>{item.points}</Text>
                </View>
              )}
            />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blocFicheSelections: {
    flex: 1,
    paddingBlock: 10,
    backgroundColor: '#fff',
  },
  tableaux: {
    marginTop: 20,
  },
  groupe: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  barre: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: "black",
    borderTopStartRadius: 5,
    borderTopEndRadius: 5
  },
  barreItem_equipe: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white",
    width: "40%",
    fontFamily: "Kanito"
  },
  barreItem: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white",
    fontFamily: "Kanito"
  },
  equipe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: "100%"
  },
  flags: {
    width: 30,
    height: 20,
    borderRadius: 2
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FicheSelections;