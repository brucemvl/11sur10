import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, Animated, useWindowDimensions } from "react-native";
import { StyleSheet } from "react-native";
import Match from "./Match";
import Ldc2025 from "./Ldc2025";
import { LinearGradient } from "expo-linear-gradient";
import ucl from "../assets/logoucl.png"




function TableauEurope({ id, currentRound, rounds }) {

  const { width } = useWindowDimensions();
      
          const isMediumScreen = width <= 1024 && width > 767;

  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-Black.ttf"),
  });

  const [team, setTeam] = useState([]);
  const [index, setIndex] = useState(0);
  const slideAnim = useState(new Animated.Value(0))[0];
  const [direction, setDirection] = useState("right");

  

  const [rotateJournee, setRotateJournee] = useState(new Animated.Value(0));

  const rotateJourneeInterpolate = rotateJournee.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // 🔁 Met à jour l'index à partir du round actuel au montage
  useEffect(() => {
    const initialIndex = rounds.findIndex(round => round === currentRound);
    if (initialIndex !== -1) {
      setIndex(initialIndex);
    }
  }, [currentRound, rounds]);

  // 📡 Fetch des matchs
  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?league=${id}&season=2025`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );
        const json = await response.json();
        setTeam(json.response);
      } catch (error) {
        console.error("Erreur lors du chargement des matchs :", error);
      }
    };

    fetchFixtures();
  }, [id]);

  const animateSlide = (dir) => {
    slideAnim.setValue(dir === "right" ? 300 : -300);
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  const prev = () => {
    if (index > 0) {
      setDirection("left");
      animateSlide("left");
      setIndex(index - 1);
      Animated.timing(rotateJournee, {
        toValue: 1, // Valeur cible de la rotation
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Réinitialiser la valeur de la rotation à 0 après l'animation
        rotateJournee.setValue(0);
      });
    }
  };

  const next = () => {
    if (index < rounds.length - 1) {
      setDirection("right");
      animateSlide("right");
      setIndex(index + 1);
      Animated.timing(rotateJournee, {
        toValue: 1, // Valeur cible de la rotation
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Réinitialiser la valeur de la rotation à 0 après l'animation
        rotateJournee.setValue(0);
      });
    }
  };

  const currentRoundName = rounds[index];

  const filteredMatches = team.filter(
    match => match.league.round === currentRoundName
  );

  if (!fontsLoaded) return <Text>Loading fonts...</Text>;
  if (!team.length) return <Text>Loading matches...</Text>;

  return (

    <LinearGradient
      colors={id === 2 ? ['rgb(16, 19, 49)', 'rgba(16, 19, 49, 0.8)'] : ['rgb(50, 183, 255)', 'rgb(16, 19, 49)']}
      style={[styles.container, isMediumScreen && {paddingInline: 20}]}
    >
      <Text style={id === 15 ? styles.titleWc : styles.title}>Calendrier & Résultats</Text>
      <Image
        source={id === 2 ? ucl : { uri: `https://media.api-sports.io/football/leagues/${id}.png` }}
        style={id === 2 ? { width: 80, height: 50, objectFit: 'contain' } : { width: 50, height: 50, objectFit: 'contain' }}
      />
      { id === 2 ?
            <Ldc2025 /> : null
      }

      <View style={styles.navContainer}>
        <TouchableOpacity onPress={prev} disabled={index === 0} style={{ width: 60, height: 30, alignItems: "center" }}>
          <Text style={[id === 15 ? styles.buttonTextWc : styles.buttonText, index === 0 && { opacity: 0.3 }, isMediumScreen && {fontSize: 28}]}>{'<'}</Text>
        </TouchableOpacity>

        <Animated.Text style={[styles.roundText, { transform: [{ rotate: rotateJourneeInterpolate }] }, isMediumScreen && {fontSize: 22, paddingTop: 10}]}>
          {currentRoundName.indexOf("Group Stage") !== -1 ? currentRoundName.replace("Group Stage -", "Matchs de Poule") :
            currentRoundName === "Regular Season - 1" ? "1ere Journee" :

              currentRoundName.indexOf("League Stage") !== -1 ? currentRoundName.replace("League Stage -", "Journee") :
                currentRoundName === "Quarter-finals" ? "Quarts de finale" :
                  currentRoundName === "Semi-finals" ? "Demis-finale" :
                    currentRoundName === "Final" ? "Finale" :
                      currentRoundName === "Round of 16" ? "Huitièmes de finale" :
                        currentRoundName === "Knockout Round Play-offs" ? "Barrages" :
                          currentRoundName === "8th Finals" ? "1/8 de finale" :
                            currentRoundName}
        </Animated.Text>

        <TouchableOpacity onPress={next} disabled={index === rounds.length - 1} style={{ width: 60, height: 30, alignItems: "center" }}>
          <Text style={[id === 15 ? styles.buttonTextWc : styles.buttonText, index === rounds.length - 1 && { opacity: 0.3 }, isMediumScreen && {fontSize: 28}]}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={{ transform: [{ translateX: slideAnim }], width: "100%" }}>
        {filteredMatches.map(match => 
          <Match
            key={match.fixture.id}
            id={match.fixture.id}
            equipeDom={match.teams.home.name}
            logoDom={match.teams.home.logo}
            equipeExt={match.teams.away.name}
            logoExt={match.teams.away.logo}
            round={match.league.round}
            scoreDom={match.goals.home}
            scoreExt={match.goals.away}
            date={match.fixture.date}
          />
        )}
      </Animated.View>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingInline: 4,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 10

  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Kanitt",
    color: "white"
  },

  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    gap: 15,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 22,
    color: "white",
    marginHorizontal: 15,
    fontFamily: "Kanitt"
  },
  buttonTextWc: {
    fontSize: 22,
    color: "rgb(234, 186, 56)",
    marginHorizontal: 15,
    fontFamily: "Kanitalic",

  },
  roundText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Kanitalik",
  },
  roundTextWc: {
    color: "rgb(234, 186, 56)",
    fontSize: 16,
    fontFamily: "Kanitalik",
  },
});

export default TableauEurope