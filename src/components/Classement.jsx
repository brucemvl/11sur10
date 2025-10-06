import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Animated, StyleSheet, ActivityIndicator, useWindowDimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import chevron from "../assets/chevron.png"
import { LinearGradient } from "expo-linear-gradient";
import {portraitsJoueurs} from "../datas/Portraits"

function Classement({ id }) {

  const { width } = useWindowDimensions();
          
              const isMediumScreen = width <= 1024 && width > 767;

  const [openButeurs, setOpenButeurs] = useState(false);
  const [openPasseurs, setOpenPasseurs] = useState(false);
  const [openClassement, setOpenClassement] = useState(false);


  const [tab, setTab] = useState([]);
  const [buteurs, setButeurs] = useState([]);
  const [passeurs, setPasseurs] = useState([]);
  const navigation = useNavigation();

  // États distincts pour chaque animation
  const [rotateClassement, setRotateClassement] = useState(new Animated.Value(0));
  const [rotateButeurs, setRotateButeurs] = useState(new Animated.Value(0));
  const [rotatePasseurs, setRotatePasseurs] = useState(new Animated.Value(0));

const [contentHeight, setContentHeight] = useState(0);
const animatedHeight = useRef(new Animated.Value(0)).current;
const [heightClassement, setHeightClassement] = useState(new Animated.Value(0));
  const [heightButeurs, setHeightButeurs] = useState(new Animated.Value(0));
  const [heightPasseurs, setHeightPasseurs] = useState(new Animated.Value(0));


  const fetchClassement = () => {
    fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=${id === 71 || id === 253 ? 2024 : 2025}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      }
    })
      .then((response) => response.json())
      .then((json) => setTab(id === 15 ? json.response[0].league.standings : json.response[0].league.standings[0]))

      .catch((error) => console.error("Error:", error));


  };

  console.log(tab)

  const fetchButeurs = () => {
    fetch(`https://v3.football.api-sports.io/players/topscorers?league=${id}&season=${id === 71 || id === 253   ? 2024 : 2025}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      }
    })
      .then((response) => response.json())
      .then((json) => setButeurs(json.response.slice(1, 11)))
      .catch((error) => console.error("Error:", error));
  };

  console.log(buteurs)
  const fetchPasseurs = () => {
    fetch(`https://v3.football.api-sports.io/players/topassists?league=${id}&season=${id === 71 || id === 253  ? 2024 : 2025}`, {
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
setOpenClassement(prev => {
    const toValue = !prev ? contentHeight : 0;

    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false, // useNativeDriver must be false for height animations
    }).start();

    return !prev;
  });
      Animated.timing(rotateClassement, {
      toValue: openClassement ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

  };

  const collapseButeurs = () => {
    setOpenButeurs(!openButeurs);
    Animated.timing(rotateButeurs, {
      toValue: openButeurs ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(heightButeurs, {
      toValue: openButeurs ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const collapsePasseurs = () => {
    setOpenPasseurs(!openPasseurs);
    Animated.timing(rotatePasseurs, {
      toValue: openPasseurs ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(heightPasseurs, {
      toValue: openPasseurs ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateClassementInterpolate = rotateClassement.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const rotateButeursInterpolate = rotateButeurs.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const rotatePasseursInterpolate = rotatePasseurs.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });


  const teamName = {
  "Germany": "Allemagne",
  "Spain": "Espagne",
  "Paris Saint Germain": "Paris St Germain",
  "Barcelona" : "FC Barcelone",
  "Borussia Dortmund" : "Dortmund",
  "Borussia Mönchengladbach" : "Mönchengladbach",
  "New York Red Bulls" : "New York RB",
  "Philadelphia Union" : "Philadelphia",
  "Italy" : "Italie",
  "Austria" : "Autriche",
  "Moldova" : "Moldavie",
  "Cyprus" : "Chypre",
  "Norway" : "Norvege",
  "Hungary" : "Hongrie",
  "Morocco" : "Maroc",
  "Ivory Coast" : "Cote d'Ivoire"
};

console.log(tab)

  if (id === 15) {

    const collapseClassement = () => { setOpenClassement(!openClassement); Animated.timing(rotateClassement, { toValue: openClassement ? 0 : 1, duration: 300, useNativeDriver: true, }).start(); Animated.timing(heightClassement, { toValue: openClassement ? 0 : 1, duration: 250, useNativeDriver: false, }).start(); };

    return (
      <View style={styles.container}>
        {/* Classement */}
        <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
          style={{ marginBlock: 10, height: 40, justifyContent: "center", borderRadius: 10 }}
        >
          <TouchableOpacity onPress={collapseClassement} style={openClassement ? [styles.header, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }] : styles.header}>
            <Text style={styles.title}>Classement</Text>
            <Animated.Image
              source={chevron}
              style={[styles.chevron, { transform: [{ rotate: rotateClassementInterpolate }] }]}
            />      </TouchableOpacity>
        </LinearGradient>
        <Animated.View style={[styles.content, {
          height: heightClassement.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1600] // Ajustez la hauteur en fonction du contenu
          })
        }]}>
          {tab.map((grp) =>
            <View style={styles.groupe}>
              <Text style={{ fontFamily: "Kanitt" }}>{grp[0].group}</Text>
              <View style={styles.barre}>
                <Text style={{ width: "10%", color: "white", fontFamily: "Kanitus", marginLeft: 5 }}>Rang</Text>
                <Text style={{ width: "36%", textAlign: "center", marginRight: 2, color: "white", fontFamily: "Kanitus" }}>Equipe</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>J</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>V</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>N</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>D</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>GA</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>Pts</Text>
              </View>
              <View style={{ backgroundColor: "rgb(147, 147, 147)", borderRadius: 5, paddingBlock: 3 }}>
                {grp.map((equipe) =>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBlock: 4 }}>
                    <Text style={{ width: "6%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.rank}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("FicheEquipe", { id: equipe.team.id, league: equipe.group === "Ligue 1" ? 61 : equipe.group === "UEFA Champions League" ? 2 : equipe.group === "Premier League" ? 39 : equipe.group === "LaLiga" ? 140 : equipe.group.indexOf("Super League 1") !== -1 ? 197 : equipe.group === "Bundesliga" ? 78 : equipe.group === "Ligue 2: Regular Season" ? 62 : equipe.group === "Serie A" ? 135 : equipe.group === "UEFA Europa League" ? 3 : equipe.group === "Saudi League" ? 307 : equipe.group === "Eastern Conference" ? 253 : equipe.group === "Primeira Liga" ? 94 : equipe.description === "Promotion - FIFA Club World Cup (Play Offs: 1/8-finals)" ? 15 : equipe.group.indexOf("Group") != -1 ? 15 : null })} style={{ width: "38%", flexDirection: "row" }}>
                      <Image source={{ uri: equipe.team.logo }} style={{ objectFit: "contain", height: 20, width: "18%" }} />
                      <Text style={{ width: "82%", color: "white", fontFamily: "Kanito", textAlign: "center", fontSize: 13 }}>{equipe.team.name === "Paris Saint Germain" ? "Paris SG" : equipe.team.name === "Stade Brestois 29" ? "Stade Brestois" : equipe.team.name === "Barcelona" ? "FC Barcelone" : equipe.team.name}</Text>
                    </TouchableOpacity>
                    <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.played}</Text>
                    <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.win}</Text>
                    <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.draw}</Text>
                    <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.lose}</Text>
                    <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.goalsDiff}</Text>
                    <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.points}</Text>

                  </View>
                )}
              </View>
            </View>


          )}


        </Animated.View>


        {/* Meilleurs Buteurs */}

      </View>
    )
  }

  if (id ===  29 || id === 32 || id === 34 || id === 5){
  const [classement, setClassement] = useState();

     const [loading, setLoading] = useState(true);
    
          const season = id === 34 ? "2026" : id === 29 ? "2023" : "2024";
    
    
      useEffect(() => {
        // Fetch data
        fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=${season}`, {
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
    
    
      
      if (loading ) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (

    <View style={styles.tableaux}>
            {classement?.map((subArray, index) => (
              <View key={`group${index}`} style={styles.groupe}>
                <Text style={styles.groupTitle}>{subArray[0].group}</Text>
                <View style={{margin: 10, borderRadius: 5, backgroundColor: "lightblue"}}>
                <View style={styles.barreSelec}>
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
                      <Text style={{width: "4%", marginInline: "2%", fontFamily: "Kanitus"}}>{item.rank}</Text>
                      <Image style={styles.flags} source={{ uri: item.team.logo }} />
                      <Text style={{width: "32%", marginInline: "2%", fontFamily: "Bella"}}>{teamName[item.team.name] || item.team.name}</Text>
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
          </View> )
  }


  return (
    <View style={styles.container}>

      <View>
        <LinearGradient colors={['rgba(75, 75, 75, 1)', 'rgb(186, 186, 186)']}
          style={{ marginBlock: 0, height: 50, justifyContent: "center", borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: openClassement ? 0 : 10, borderBottomRightRadius: openClassement ? 0 : 10 }}
        >
          <TouchableOpacity onPress={collapseClassement} style={styles.header}>
            <Text style={styles.title}>Classement {tab[0]?.group}</Text>
            <Animated.Image source={chevron} style={[styles.chevron, { transform: [{ rotate: rotateClassementInterpolate }] }]} />
          </TouchableOpacity>
        </LinearGradient>
        <Animated.View style={[styles.content, { height: animatedHeight }]}>
  
          <LinearGradient colors={['rgb(186, 186, 186)', 'rgba(110, 110, 110, 1)']}
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
    onLayout={(event) => {
      const height = event.nativeEvent.layout.height;
      setContentHeight(height);
    }}>
            <View style={styles.barre}>
              <Text style={{ width: "10%", color: "white", fontFamily: "Kanitus", marginLeft: isMediumScreen ? 8 : 4 }}>Rang</Text>
              <Text style={{ width: "36%", textAlign: "center", marginRight: 2, color: "white", fontFamily: "Kanitus" }}>Equipe</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>J</Text>
              <Text style={{ width: "10%", color: "white", fontFamily: "Kanitus" }}>V</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>N</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>D</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>GA</Text>
              <Text style={{ width: "8%", color: "white", fontFamily: "Kanitus" }}>Pts</Text>
            </View>

            {tab.map((equipe) =>
              <TouchableOpacity onPress={() => navigation.navigate("FicheEquipe", { id: equipe.team.id, league: equipe.group === "Ligue 1" ? 61 : equipe.group === "UEFA Champions League" ? 2 : equipe.group === "Premier League" ? 39 : equipe.group === "LaLiga" || equipe.group === "Primera División" ? 140 : equipe.group.indexOf("Super League 1") !== -1 ? 197 : equipe.group === "Bundesliga" ? 78 : equipe.group === "Ligue 2: Regular Season" ? 62 : equipe.group === "Serie A" ? 135 : equipe.group === "UEFA Europa League" ? 3 : equipe.group === "Saudi League" ? 307 : equipe.group === "Eastern Conference" ? 253 : equipe.group === "Primeira Liga" ? 94 : equipe.group === "Ligue 2 " ? 62 : null })} style={{ flexDirection: "row", flexDirection: "row", alignItems: "center", borderBottomWidth: 1, paddingBlock: 13.7 }}>
                <Text style={{ width: "6%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.rank}</Text>
                <Image source={{ uri: equipe.team.logo }} style={{ objectFit: "contain", height: isMediumScreen ? 35 : 25, width: "8%" }} />
                <Text style={{ width: "30%", color: "white", fontFamily: "Bella", textAlign: "center", fontSize: isMediumScreen? 16 : 14 }}>{teamName[equipe.team.name] || equipe.team.name}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.played}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.win}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.draw}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.lose}</Text>
                <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.goalsDiff}</Text>
                <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.points}</Text>
              </TouchableOpacity>

            )}
          </LinearGradient>
        </Animated.View>

      </View>

      <View>
        <LinearGradient
          colors={['rgba(84, 84, 84, 1)', 'rgba(224, 224, 224, 1)']}
          style={{ marginBlock: 0, height: 50, justifyContent: "center", borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: openButeurs ? 0 : 10, borderBottomRightRadius: openButeurs ? 0 : 10 }}
        >
          <TouchableOpacity onPress={collapseButeurs} style={styles.header}>
            <Text style={styles.title}>Buteurs</Text>
            <Animated.Image
              source={chevron}
              style={[styles.chevron, { transform: [{ rotate: rotateButeursInterpolate }] }]}
            />
          </TouchableOpacity>
        </LinearGradient>
        <Animated.View style={[styles.content, {
          height: heightButeurs.interpolate({
            inputRange: [0, 1],
            outputRange: [0, isMediumScreen ? 746 : 556]  // Ajustez la hauteur en fonction du contenu
          })
        }]}>
          <LinearGradient colors={['#e0e0e0', '#a6a6a6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ marginTop: 5, paddingInline: 2 }}>

            <View style={styles.barre}>
              <Text style={{ width: isMediumScreen? "60%" : "55%", color: "white", paddingStart: 20, fontFamily: "Kanitus", textAlign: "center" }}>Joueur</Text>
              <Text style={{ width:  isMediumScreen ? "20%" : "28%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Matchs Joués</Text>
              <Text style={{ width: isMediumScreen? "20%" : "17%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Buts</Text>

            </View>
            {buteurs.map((joueur) => joueur.player.id === 7398 ? null :
              <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: joueur.player.id })}>
                <View style={[styles.item, isMediumScreen && {height: 72}]}>
                  <Image source={portraitsJoueurs[joueur.player.id] || { uri: joueur.player.photo }} style={{ height: isMediumScreen? 60 : 35, width: "9%", borderRadius: 50, marginRight: isMediumScreen? 20 : 5 }}/>
                  <Text style={{ fontFamily: "Kanitt", width: "37%" }}>{joueur.player.id === 37784 ? "Mamadou Sissoko" : joueur.player.name}</Text>
                  <Image source={{ uri: joueur.statistics[0].team.logo }} style={[styles.logo, isMediumScreen && {height: 38}]} />
                  <Text style={[{ fontFamily: "Kanito", width: isMediumScreen ? "27%" : "35%", textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{joueur.statistics[0].games.appearences}</Text>
                  <Text style={[{ fontFamily: "Kanitt", width: isMediumScreen ? "18%" : "10%", textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{joueur.statistics[0].goals.total}</Text>

                </View>
              </TouchableOpacity>
            )}
          </LinearGradient>

        </Animated.View>

      </View>

      <View>
        <LinearGradient
          colors={['rgba(84, 84, 84, 1)', 'rgba(224, 224, 224, 1)']}
          style={{ marginBlock: 0, height: 50, justifyContent: "center", borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: openPasseurs ? 0 : 10, borderBottomRightRadius: openPasseurs ? 0 : 10 }}
        >
          <TouchableOpacity onPress={collapsePasseurs} style={styles.header}>
            <Text style={styles.title}>Passeurs</Text>
            <Animated.Image
              source={chevron}
              style={[styles.chevron, { transform: [{ rotate: rotatePasseursInterpolate }] }]}
            />
          </TouchableOpacity>
        </LinearGradient>
        <Animated.View style={[styles.content, {
          height: heightPasseurs.interpolate({
            inputRange: [0, 1],
            outputRange: [0, isMediumScreen ? 746 : 556]  // Ajustez la hauteur en fonction du contenu
          })
        }]}>
          <LinearGradient colors={['#d3d3d3', '#8e8e8e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ marginTop: 5, paddingInline: 2 }}>

            <View style={styles.barre}>
              <Text style={{ width: isMediumScreen? "60%" : "55%", color: "white", paddingStart: 20, fontFamily: "Kanitus", textAlign: "center" }}>Joueur</Text>
              <Text style={{ width:  isMediumScreen ? "20%" : "28%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Matchs Joués</Text>
              <Text style={{ width: isMediumScreen? "20%" : "17%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Passes D</Text>
            </View>

            {passeurs.map((joueur) =>
              <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: joueur.player.id })}>
                <View style={[styles.item, isMediumScreen && {height: 72}]}>
                  <Image source={portraitsJoueurs[joueur.player.id] || { uri: joueur.player.photo }} style={{ height: isMediumScreen? 60 : 35, width: "9%", borderRadius: 50, marginRight: isMediumScreen? 20 : 5 }}/>
                  <Text style={{ fontFamily: "Kanitt", width: "37%" }}>{joueur.player.id === 37784 ? "Mamadou Sissoko" : joueur.player.name}</Text>
                  <Image source={{ uri: joueur.statistics[0].team.logo }} style={[styles.logo, isMediumScreen && {height: 38}]} />
                  <Text style={[{ fontFamily: "Kanito", width: isMediumScreen ? "27%" : "35%", textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{joueur.statistics[0].games.appearences}</Text>
                  <Text style={[{ fontFamily: "Kanitt", width: isMediumScreen ? "18%" : "10%", textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{joueur.statistics[0].goals.assists}</Text>

                </View>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBlock: 10,
    flex: 1,
    paddingBottom: 25,
    gap: 20,
    marginHorizontal: 12

  },
  header: {
    paddingInline: 25,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 10
  },
  title: {
    fontFamily: "Kanitt",
    textAlign: "center",
    color: "white",
    fontSize: 16

  },
  content: {
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: "rgb(186, 186, 186)",

  },
  barre: {
    flexDirection: "row",
    width: "102%",
    backgroundColor: "black",
    padding: 5,
    marginInlineStart: "-1%"
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: "100%",
    height: 53
  },
  logo: {
    width: "7%",
    height: 25,
    objectFit: "contain",
    marginRight: 4

  },
  list: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 20,
  },
  groupe: {
    marginBlock: 6,
    borderRadius: 10
  },
  tableaux: {
    marginTop: 20,
    paddingBottom: 100
  },
  groupe: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "Kanitt",
    marginLeft: 20
  },
  barreSelec: {
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
    width: "42%",
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
});

export default Classement;