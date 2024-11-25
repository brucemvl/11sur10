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
      <Text style={{width: "5%"}}>{item.rank}</Text>
      <Image source={{ uri: item.team.logo }} style={styles.logo} />
      <Text style={{fontFamily: "Kanito", width: "30%"}}>{item.team.name}</Text>
      <Text style={{fontFamily: "Kanito", width: "9%", textAlign: "center"}}>{item.all.played}</Text>
      <Text style={{fontFamily: "Kanito", width: "9%", textAlign: "center"}}>{item.all.win}</Text>
      <Text style={{fontFamily: "Kanito", width: "9%", textAlign: "center"}}>{item.all.draw}</Text>
      <Text style={{fontFamily: "Kanito", width: "9%", textAlign: "center"}}>{item.all.lose}</Text>
      <Text style={{fontFamily: "Kanito", width: "9%", textAlign: "center"}}>{item.all.goals.for - item.all.goals.against}</Text>
      <Text style={{fontFamily: "Kanitt", width: "9%", textAlign: "center"}}>{item.points}</Text>
    </View>
  );

  const renderButeursItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { playerId: item.player.id })}>
      <View style={styles.item}>
        <Text style={{fontFamily: "Kanito"}}>{item.player.name}</Text>
        <Image source={{ uri: item.statistics[0].team.logo }} style={styles.logo} />
        <Text style={{fontFamily: "Kanito"}}>{item.statistics[0].goals.total}</Text>
        <Text style={{fontFamily: "Kanito"}}>{item.statistics[0].games.appearences}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPasseursItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { playerId: item.player.id })}>
      <View style={styles.item}>
        <Text style={{fontFamily: "Kanito"}}>{item.player.name}</Text>
        <Image source={{ uri: item.statistics[0].team.logo }} style={styles.logo} />
        <Text style={{fontFamily: "Kanito"}}>{item.statistics[0].goals.assists}</Text>
        <Text style={{fontFamily: "Kanito"}}>{item.statistics[0].games.appearences}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Classement */}
      <TouchableOpacity onPress={collapseClassement} style={styles.header}>
        <Text style={styles.title}>Classement</Text>
      </TouchableOpacity>
      {openClassement && (
        <View>
          <View style={styles.barre}>
            <Text style={{width: "10%"}}>Rang</Text>
            <Text style={{width: "36%", textAlign: "center", marginRight: 2}}>Equipe</Text>
            <Text style={{width: "9%"}}>J</Text>
            <Text style={{width: "9%"}}>V</Text>
            <Text style={{width: "9%"}}>N</Text>
            <Text style={{width: "9%"}}>D</Text>
            <Text style={{width: "9%"}}>GA</Text>
            <Text style={{width: "9%"}}>Pts</Text>
          </View>
        <FlatList
          data={tab}
          renderItem={renderClassementItem}
          keyExtractor={(item) => item.team.id.toString()}
          style={styles.list} // Ensure the list has proper styling
        />
        </View>

      )}

      {/* Meilleurs Buteurs */}
      <TouchableOpacity onPress={collapseButeurs} style={styles.header}>
        <Text style={styles.title}>Meilleurs Buteurs</Text>
      </TouchableOpacity>
      {openButeurs && (
        <FlatList
          data={buteurs}
          renderItem={renderButeursItem}
          keyExtractor={(item) => item.player.id.toString()}
          style={styles.list} // Ensure the list has proper styling
        />
      )}

      {/* Meilleurs Passeurs */}
      <TouchableOpacity onPress={collapsePasseurs} style={styles.header}>
        <Text style={styles.title}>Meilleurs Passeurs</Text>
      </TouchableOpacity>
      {openPasseurs && (
        <FlatList
          data={passeurs}
          renderItem={renderPasseursItem}
          keyExtractor={(item) => item.player.id.toString()}
          style={styles.list} // Ensure the list has proper styling
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },
  header: {
    padding: 10,
    backgroundColor: 'midnightblue',
    marginBlock: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  title: {
    fontFamily: "Kanitt",
    textAlign: "center",
    color: "white",

  },
  barre: {
    flexDirection: "row",
    width: "100%",
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: "100%"
  },
  logo: {
    width: "6%",
    height: 25,
    objectFit: "contain",
    marginRight: 4

  },
  list: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 20, // Ensure the content doesn't overlap with other elements
  }
});

export default Classement;