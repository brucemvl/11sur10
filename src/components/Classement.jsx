import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Animated, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import chevron from "../assets/chevron.png"

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

  const rotateAnim = useState(new Animated.Value(0))[0]; 

  useEffect(() => {
    // Démarrer l'animation à chaque fois que l'état `rotateClassement` change
    Animated.timing(rotateAnim, {
      toValue: rotateClassement ? 1 : 0, // Rotation à 180deg ou 0deg
      duration: 300, // Durée de l'animation
      useNativeDriver: true, // Utiliser le moteur natif pour de meilleures performances
    }).start();
  }, [rotateClassement]);

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'], 
  });

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
        <Text style={{fontFamily: "Kanito", width: "45%"}}>{item.player.name}</Text>
        <Image source={{ uri: item.statistics[0].team.logo }} style={styles.logo} />
        <Text style={{fontFamily: "Kanito", width: "30%", textAlign: "center"}}>{item.statistics[0].games.appearences}</Text>
        <Text style={{fontFamily: "Kanitt", width: "15%", textAlign:"center"}}>{item.statistics[0].goals.total}</Text>

      </View>
    </TouchableOpacity>
  );

  const renderPasseursItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { playerId: item.player.id })}>
      <View style={styles.item}>
        <Text style={{fontFamily: "Kanito", width: "45%"}}>{item.player.name}</Text>
        <Image source={{ uri: item.statistics[0].team.logo }} style={styles.logo} />
        <Text style={{fontFamily: "Kanito", width: "30%", textAlign: "center"}}>{item.statistics[0].games.appearences}</Text>
        <Text style={{fontFamily: "Kanitt", width: "15%", textAlign: "center"}}>{item.statistics[0].goals.assists}</Text>

      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Classement */}
      <TouchableOpacity onPress={collapseClassement} style={styles.header}>
        <Text style={styles.title}>Classement</Text>
        {rotateClassement ? <Image source={chevron}/> : <Animated.Image source={chevron} style={{transform:[{rotate: rotateInterpolation}]}}/>}
      </TouchableOpacity>
      {openClassement && (
        <View>
          <View style={styles.barre}>
            <Text style={{width: "10%", color: "white"}}>Rang</Text>
            <Text style={{width: "36%", textAlign: "center", marginRight: 2, color: "white"}}>Equipe</Text>
            <Text style={{width: "9%", color: "white"}}>J</Text>
            <Text style={{width: "9%", color: "white"}}>V</Text>
            <Text style={{width: "9%", color: "white"}}>N</Text>
            <Text style={{width: "9%", color: "white"}}>D</Text>
            <Text style={{width: "9%", color: "white"}}>GA</Text>
            <Text style={{width: "9%", color: "white"}}>Pts</Text>
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
        <View>
        <View style={styles.barre}>
        <Text style={{width: "50%", color: "white", textAlign: "center"}}>Joueur</Text>
        <Text style={{width: "30%", color: "white", textAlign: "center"}}>Matchs Joués</Text>
        <Text style={{width: "20%", color: "white", textAlign: "center"}}>Buts</Text>
        
      </View>
        <FlatList
          data={buteurs}
          renderItem={renderButeursItem}
          keyExtractor={(item) => item.player.id.toString()}
          style={styles.list} // Ensure the list has proper styling
        />
        </View>
      )}

      {/* Meilleurs Passeurs */}
      <TouchableOpacity onPress={collapsePasseurs} style={styles.header}>
        <Text style={styles.title}>Meilleurs Passeurs</Text>
      </TouchableOpacity>
      {openPasseurs && (
        <View>
        <View style={styles.barre}>
        <Text style={{width: "50%", color: "white", textAlign: "center"}}>Joueur</Text>
        <Text style={{width: "30%", color: "white", textAlign: "center"}}>Matchs Joués</Text>
        <Text style={{width: "20%", color: "white", textAlign: "center"}}>Passes D</Text>  
      </View>
        <FlatList
          data={passeurs}
          renderItem={renderPasseursItem}
          keyExtractor={(item) => item.player.id.toString()}
          style={styles.list} // Ensure the list has proper styling
        />
        </View>
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
    justifyContent: "space-between"
  },
  title: {
    fontFamily: "Kanitt",
    textAlign: "center",
    color: "white",

  },
  barre: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "black",
    paddingBlock: 4,
    borderRadius: 5
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