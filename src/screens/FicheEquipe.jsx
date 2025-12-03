import React from "react";
import Calendrier from "../components/Calendrier";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Button, StyleSheet, ScrollView, Image, Animated, TouchableOpacity, useWindowDimensions, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Precedent from "../components/Precedent";
import chevron from "../assets/chevron.png";
import ligue1 from "../assets/logoligue1.webp"
import Squad from "../components/Squad";
import fifaclubwc from "../assets/fifaclubwc2.png";
import { teamName } from "../datas/teamNames";


function FicheEquipe() {
  const route = useRoute();
  const { id, league, img } = route.params;

  const { width } = useWindowDimensions();
        
            const isMediumScreen = width <= 1024 && width > 767;

  const [compet, setCompet] = useState(league)
  const [selectedId, setSelectedId] = useState(league);

  const [equipe, setEquipe] = useState();
  const [leagues, setLeagues] = useState([])
  const [stats, setStats] = useState();
  const [squad, setSquad] = useState([])
  const [calendrier, setCalendrier] = useState([])
  const [coach, setCoach] = useState([])



  const [rotateStadeValue, setRotateStadeValue] = useState(new Animated.Value(0));
  const [rotateSquadValue, setRotateSquadValue] = useState(new Animated.Value(0));
  const [rotateCalendrierValue, setRotateCalendrierValue] = useState(new Animated.Value(0));

  const [heightStadeAnim, setHeightStadeAnim] = useState(new Animated.Value(0));
  const [heightSquadAnim, setHeightSquadAnim] = useState(new Animated.Value(0));
  const [heightCalendrierAnim, setHeightCalendrierAnim] = useState(new Animated.Value(0));


  const [openStade, setOpenStade] = useState(false);
  const [openSquad, setOpenSquad] = useState(false);
  const [openCalendrier, setOpenCalendrier] = useState(false);


  const collapseStade = () => {
    setOpenStade(!openStade);

    Animated.timing(rotateStadeValue, {
      toValue: openStade ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animer la hauteur du stade
    Animated.timing(heightStadeAnim, {
      toValue: openStade ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const collapseSquad = () => {
    setOpenSquad(!openSquad);

    Animated.timing(rotateSquadValue, {
      toValue: openSquad ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animer la hauteur de l'effectif
    Animated.timing(heightSquadAnim, {
      toValue: openSquad ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const collapseCalendrier = () => {
    setOpenCalendrier(!openCalendrier);

    Animated.timing(rotateCalendrierValue, {
      toValue: openCalendrier ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animer la hauteur du Calendrier
    Animated.timing(heightCalendrierAnim, {
      toValue: openCalendrier ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateStadeInterpolate = rotateStadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const rotateSquadInterpolate = rotateSquadValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const rotateCalendrierInterpolate = rotateCalendrierValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  useEffect(() => {
    const fetchEquipe = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/teams?id=${id}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setEquipe(json.response[0]);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchEquipe();
  }, [id]);

  console.log(equipe)

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/leagues?season=2025&team=${id}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setLeagues(json.response);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchLeagues();
  }, [id]);

  console.log(leagues)
  useEffect(() => {

    // Fetch home team statistics
    fetch(`https://v3.football.api-sports.io/teams/statistics?season=2025&team=${id}&league=${compet}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setStats(json.response);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id, compet]);


  useEffect(() => {
    const fetchSquad = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/players/squads?team=${id}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setSquad(json.response[0]);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchSquad();
  }, [id]);

  useEffect(() => {
    const fetchCalendrier = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?season=2025&team=${id}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setCalendrier(json.response);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchCalendrier();
  }, [id]);


  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/coachs?team=${id}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setCoach(json.response[0]);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchCoach();
  }, [id]);

if (!stats) {
    return <ActivityIndicator size="large" color="#0000ff" />

  }
  
  console.log(stats)
  console.log(squad)
  console.log(calendrier)
  console.log(coach)

  if (!equipe) {
    return           <ActivityIndicator size="large" color="#0000ff" />
    ;
  }

  if (!stats) {
    return           <ActivityIndicator size="large" color="#0000ff" />
    ;
  }


  if (!squad) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if (!coach) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }



  return (
    <View>
      <Precedent />
      <ScrollView contentContainerStyle={[styles.container, isMediumScreen && {padding: 40}]}>
        <LinearGradient colors={["black", "steelblue"]} style={[styles.header, isMediumScreen && {padding: 50, height: 160}]}>
          <View>
            <Text style={[styles.team, isMediumScreen && {fontSize: 20}]}>{teamName[equipe.team.name] || equipe.team.name.toUpperCase()}</Text>
            <Text style={{ color: "white", fontFamily: "Kanito", fontSize: isMediumScreen ? 16 : 14 }}>{equipe.team.country === "England" ? "Angleterre" : equipe.team.country === "Spain" ? "Espagne" : equipe.team.country === "Germany" ? "Allemagne" : equipe.team.country === "Netherlands" ? "Pays Bas" : equipe.team.country}</Text>
            <Text style={{ color: "white", fontFamily: "Kanitus", fontSize: isMediumScreen ? 15 : 14 }}>
              {equipe.team.national === false ? equipe.team.founded === null ? null : "Club fondé en " + equipe.team.founded : null}
            </Text>
          </View>
          <Image source={{ uri: equipe.team.logo }} style={{ height: isMediumScreen ? 90 : 75, width: isMediumScreen ? 90 : 75, objectFit: "contain" }} />
        </LinearGradient>

        <View style={styles.stade}>
          <TouchableOpacity onPress={collapseStade}>
            <LinearGradient colors={["black", "steelblue"]} style={[styles.stadeTitle, isMediumScreen && {paddingBlock: 10}]}>
              <Text style={[styles.stadeText, isMediumScreen && {fontSize: 18}]}>Stade</Text>
              <Animated.Image
                source={chevron}
                style={[styles.chevron, { transform: [{ rotate: rotateStadeInterpolate }] }]}
              />
            </LinearGradient>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.stadeInfos,
              {
                height: heightStadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 280], // Ajustez la hauteur en fonction du contenu
                })
              }
            ]}
          >
            <Image style={styles.stadeImage} source={{ uri: equipe.venue.image }} />
            <Text style={{ fontFamily: "Kanitt" }}>{equipe.venue.name}</Text>
            <Text style={{ fontFamily: "Kanito" }}>{equipe.venue.address}, {equipe.venue.city}</Text>
            <Text style={{ fontFamily: "Kanitus" }}> Capacité: {equipe.venue.capacity} places</Text>
          </Animated.View>
        </View>

        <View style={styles.stade}>
          <TouchableOpacity onPress={collapseSquad}>
            <LinearGradient colors={["black", "steelblue"]} style={[styles.stadeTitle, isMediumScreen && {paddingBlock: 10}]}>
              <Text style={[styles.stadeText, isMediumScreen && {fontSize: 18}]}>Effectif</Text>
              <Animated.Image
                source={chevron}
                style={[styles.chevron, { transform: [{ rotate: rotateSquadInterpolate }] }]}
              />
            </LinearGradient>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.stadeInfos,
              {
                height: heightSquadAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 970], // Ajustez la hauteur en fonction du contenu
                })
              }
            ]}
          >
            <Squad squad={squad} coach={coach}/>
          </Animated.View>
        </View>

        <View style={[styles.stade, { alignItems: "center" }]}>
          <TouchableOpacity onPress={collapseCalendrier} style={{ width: "100%" }}>
            <LinearGradient colors={["black", "steelblue"]} style={[styles.stadeTitle, isMediumScreen && {paddingBlock: 10}]}>
              <Text style={[styles.stadeText, isMediumScreen && {fontSize: 18}]}>Calendrier</Text>

              <Animated.Image
                source={chevron}
                style={[styles.chevron, { transform: [{ rotate: rotateCalendrierInterpolate }] }]}
              />

            </LinearGradient>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.stadeInfos,
              {
                height: heightCalendrierAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 220], // Ajustez la hauteur en fonction du contenu
                }),
                width: "110%"
              }
            ]}
          >
            <Calendrier calendrier={calendrier} />
          </Animated.View>
        </View>

        <Text style></Text>
        <Text style={styles.season}>2025/2026</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.leagues}>
          {leagues.map((element) => {
            if (element.league.name === "Friendlies Clubs") return null; const isSelected = selectedId === element.league.id;
            return <TouchableOpacity key={element.league.id} onPress={() => { setCompet(element.league.id); setSelectedId(element.league.id) }} style={isSelected ? styles.selected : { opacity: 0.3 }}> <Image source={element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? ligue1 : element.league.id === 15 ? fifaclubwc : { uri: element.league.logo }} style={{ height: 60, width: 60, marginBottom: 20, objectFit: "contain", marginInline: 12 }} /></TouchableOpacity>
          })}
        </ScrollView>
        <View style={styles.bloc}>
          <Text style={styles.h3}>Matchs Disputés</Text>
          <Text style={{ fontFamily: "Kanitt", fontSize: 22 }}>{stats?.fixtures?.played.total}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <View style={{ alignItems: "center", width: "33%" }}>
              <Text style={styles.h4}>Victoires</Text>
              <Text style={{ fontFamily: "Kanitt", color: "green", fontSize: 20 }}>{stats?.fixtures?.wins.total}</Text>
            </View>
            <View style={{ alignItems: "center", width: "33%", borderLeftWidth: 2, borderRightWidth: 2 }}>
              <Text style={styles.h4}>Defaites</Text>
              <Text style={{ fontFamily: "Kanitt", color: "red", fontSize: 20 }}>{stats?.fixtures?.loses.total}</Text>
            </View>
            <View style={{ alignItems: "center", width: "33%" }}>
              <Text style={styles.h4}>Nuls</Text>
              <Text style={{ fontFamily: "Kanitt", color: "grey", fontSize: 20 }}>{stats?.fixtures?.draws.total}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bloc}>
          <Text style={styles.h3}>Buts</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}>
            <View style={{ alignItems: "center", borderRightWidth: 1, paddingRight: 30 }}>
              <Text style={styles.h4}>Marqués</Text>
              <Text style={{ fontFamily: "Kanitt", color: "green", fontSize: 20 }}>{stats?.goals?.for.total.total}</Text>
              <Text style={{ fontFamily: "Kanitus", fontSize: 11 }}>(Moyenne par match :<Text style={{ fontFamily: "Kanito" }}> {stats.goals.for.average.total}</Text>)</Text>
            </View>
            <View style={{ alignItems: "center", borderLeftWidth: 1, paddingLeft: 30 }}>
              <Text style={styles.h4}>Encaissés</Text>
              <Text style={{ fontFamily: "Kanitt", color: "red", fontSize: 20 }}>{stats?.goals?.against.total.total}</Text>
              <Text style={{ fontFamily: "Kanitus", fontSize: 11 }}>(Moyenne par match :<Text style={{ fontFamily: "Kanito" }}>{stats.goals.against.average.total}</Text>)</Text>

            </View>
          </View>
        </View>
        <View style={styles.bloc}>

          <Text style={styles.h3}>Plus large victoire</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignItems: "center", borderRightWidth: 1, paddingRight: 40 }}>
              <Text style={styles.h5}>Domicile</Text>
              <Text style={{ color: "green", fontFamily: "Kanitt" }}>{stats.biggest.wins.home}</Text>
            </View>
            <View style={{ alignItems: "center", borderLeftWidth: 1, paddingLeft: 40 }}>
              <Text style={styles.h5}>Exterieur</Text>
              <Text style={{ color: "green", fontFamily: "Kanitt" }}>{stats.biggest.wins.away}</Text>
            </View>
          </View>



          <Text style={styles.h3}>Plus large defaite</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignItems: "center", borderRightWidth: 1, paddingRight: 40 }}>
              <Text style={styles.h5}>Domicile</Text>
              <Text style={{ color: "red", fontFamily: "Kanitt" }}>{stats.biggest.loses.home}</Text>
            </View>
            <View style={{ alignItems: "center", borderLeftWidth: 1, paddingLeft: 40 }}>
              <Text style={styles.h5}>Exterieur</Text>
              <Text style={{ color: "red", fontFamily: "Kanitt" }}>{stats.biggest.loses.away}</Text>
            </View>
          </View>

        </View>

        <View style={styles.bloc}>
          <Text style={styles.h3}>Clean-sheets</Text>
          <Text style={{ fontFamily: "Kanitt", fontSize: 20 }}>{stats.clean_sheet.total}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <View style={{ width: "50%", alignItems: "center" }}>
              <Text style={styles.h4}>Domicile</Text>
              <Text style={{ fontFamily: "Kanitt" }}>{stats.clean_sheet.home}</Text>
            </View>
            <View style={{ width: "50%", alignItems: "center" }}>
              <Text style={styles.h4}>Exterieur</Text>
              <Text style={{ fontFamily: "Kanitt" }}>{stats.clean_sheet.away}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    marginTop: 60,
    flexGrow: 1,
    paddingBottom: 140,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    width: "98%",
    height: 130,
    alignItems: "center"
  },
  team: {
    color: "white",
    fontFamily: "Permanent"
  },
  stade: {
    marginBottom: 20,
    width: '98%',
  },
  stadeTitle: {
    backgroundColor: '#4682b4',
    color: 'white',
    paddingBlock: 5,
    paddingInline: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  stadeText: {
    fontSize: 16,
    color: 'white',
    fontFamily: "Kanitalik",


  },
  chevron: {
    position: "absolute",
    right: 20
  },

  stadeInfos: {
    marginTop: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  stadeImage: {
    height: 200,
    width: 340,
    borderRadius: 5,
  },
  season: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "Kanito"
  },
  h3: {
    fontFamily: "Kanito",
    fontSize: 16,
  },
  h4: {
    fontFamily: "Kanito",
  },
  h5: {
    fontFamily: "Kanito",
    fontSize: 12
  },
  bloc: {
    width: "86%",
    alignItems: "center",
    backgroundColor: "#cee8fe",
    gap: 10, borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 0 }, // shadow offset
    shadowOpacity: 0.5, // shadow opacity
    shadowRadius: 4,
    elevation: 5
  },
  leagues: {
    flexDirection: "row",
    width: 240,
    height: 85,
    padding: 10,
    backgroundColor: "rgba(223, 223, 223, 0.5)",
    borderRadius: 35,
    marginBottom: 10
  },
  selected: {
    opacity: 1,
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 0 }, // shadow offset
    shadowOpacity: 0.7, // shadow opacity
    shadowRadius: 5,
    elevation: 3
  }


});

export default FicheEquipe;