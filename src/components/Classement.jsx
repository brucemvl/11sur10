import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

function Classement({ id }) {
  const [openButeurs, setOpenButeurs] = useState(false);
  const [openPasseurs, setOpenPasseurs] = useState(false);
  const [openClassement, setOpenClassement] = useState(false);
  const [rotateButeurs, setRotationB] = useState(true);
  const [rotatePasseurs, setRotationP] = useState(true);
  const [rotateClassement, setRotationC] = useState(true);

  const [tab, setTab] = useState([]);
  const [buteurs, setButeurs] = useState([]);
  const [passeurs, setPasseurs] = useState([]);
  const navigation = useNavigation();

  const fetchClassement = () => {
    fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=2024`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      }
    })
      .then((response) => response.json())
      .then((json) => setTab(json.response[0].league.standings[0]))
      .catch((error) => console.error("Error:", error));
  };

  const fetchButeurs = () => {
    fetch(`https://v3.football.api-sports.io/players/topscorers?league=${id}&season=2024`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      }
    })
      .then((response) => response.json())
      .then((json) => setButeurs(json.response.slice(0, 10)))
      .catch((error) => console.error("Error:", error));
  };

  const fetchPasseurs = () => {
    fetch(`https://v3.football.api-sports.io/players/topassists?league=${id}&season=2024`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      }
    })
      .then((response) => response.json())
      .then((json) => setPasseurs(json.response.slice(0, 10)))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchClassement();
    fetchButeurs();
    fetchPasseurs();
  }, [id]);

  const collapseClassement = () => {
    setOpenClassement(!openClassement);
    setRotationC(!rotateClassement);
  };

  const collapseButeurs = () => {
    setOpenButeurs(!openButeurs);
    setRotationB(!rotateButeurs);
  };

  const collapsePasseurs = () => {
    setOpenPasseurs(!openPasseurs);
    setRotationP(!rotatePasseurs);
  };

  const renderClassementItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.rank}</Text>
      <Image source={{ uri: item.team.logo }} style={styles.logo} />
      <Text>{item.team.name}</Text>
      <Text>{item.all.played}</Text>
      <Text>{item.all.win}</Text>
      <Text>{item.all.draw}</Text>
      <Text>{item.all.lose}</Text>
      <Text>{item.all.goals.for}</Text>
      <Text>{item.all.goals.against}</Text>
      <Text>{item.points}</Text>
    </View>
  );

  const renderButeursItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { playerId: item.player.id })}>
      <View style={styles.item}>
        <Text>{item.player.name}</Text>
        <Image source={{ uri: item.statistics[0].team.logo }} style={styles.logo} />
        <Text>{item.statistics[0].goals.total}</Text>
        <Text>{item.statistics[0].games.appearences}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPasseursItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { playerId: item.player.id })}>
      <View style={styles.item}>
        <Text>{item.player.name}</Text>
        <Image source={{ uri: item.statistics[0].team.logo }} style={styles.logo} />
        <Text>{item.statistics[0].goals.assists}</Text>
        <Text>{item.statistics[0].games.appearences}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Classement */}
      <TouchableOpacity onPress={collapseClassement} style={styles.header}>
        <Text>Classement</Text>
      </TouchableOpacity>
      {openClassement && (
        <FlatList
          data={tab}
          renderItem={renderClassementItem}
          keyExtractor={(item) => item.team.id.toString()}
        />
      )}

      {/* Meilleurs Buteurs */}
      <TouchableOpacity onPress={collapseButeurs} style={styles.header}>
        <Text>Meilleurs Buteurs</Text>
      </TouchableOpacity>
      {openButeurs && (
        <FlatList
          data={buteurs}
          renderItem={renderButeursItem}
          keyExtractor={(item) => item.player.id.toString()}
        />
      )}

      {/* Meilleurs Passeurs */}
      <TouchableOpacity onPress={collapsePasseurs} style={styles.header}>
        <Text>Meilleurs Passeurs</Text>
      </TouchableOpacity>
      {openPasseurs && (
        <FlatList
          data={passeurs}
          renderItem={renderPasseursItem}
          keyExtractor={(item) => item.player.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    padding: 10,
    backgroundColor: '#ddd',
    marginBlock: 5,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 30,
    height: 30,
  },
});

export default Classement;