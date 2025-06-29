import { useState, useEffect } from "react";
import { Text, Image, Animated, View, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from "expo-font";
import Match from "./Match";
import ligue1 from "../assets/logoligue1.webp";
import ligue2 from "../assets/ligue2.jpg";
import fifaclubwc from "../assets/fifaclubwc2.png";

function Tableau({ id, currentRound, rounds }) {
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
          `https://v3.football.api-sports.io/fixtures?league=${id}&season=${id === 71 || id === 253 || id === 15 ? 2025 : 2024}`,
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
      colors={id === 15 ? ["#505050", "#000"] : ["#32b7ff", "rgba(4,6,45,0.85)"]}
      style={styles.container}
    >
      <Text style={id === 15 ? styles.titleWc : styles.title}>Calendrier et Résultats</Text>
      <Image
        source={
          id === 61 ? ligue1 : id === 62 ? ligue2 : id === 15 ? fifaclubwc :
          { uri: `https://media.api-sports.io/football/leagues/${id}.png` }
        }
        style={{ width: 40, height: 40, resizeMode: "contain" }}
      />

      {/* Navigation entre rounds */}
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={prev} disabled={index === 0} style={{width: 60, height: 30, alignItems: "center"}}>
          <Text style={[id === 15 ? styles.buttonTextWc : styles.buttonText, index === 0 && { opacity: 0.3 }]}>{'<'}</Text>
        </TouchableOpacity>

        <Animated.Text style={[ id  === 15 ? styles.roundTextWc : styles.roundText, {transform: [{ rotate: rotateJourneeInterpolate }]}]}>
          {currentRoundName.indexOf("Group Stage") !== -1 ? currentRoundName.replace("Group Stage -", "Matchs de Poule") :
                              currentRoundName === "Regular Season - 1" ? "1ere Journee" :

          currentRoundName.indexOf("Regular Season") !== -1 ? currentRoundName.replace("Regular Season -", "Journee") :
          currentRoundName === "Quarter-finals" ? "Quarts de finale" :
           currentRoundName === "Semi-finals" ? "Demi-finales" :
           currentRoundName === "Final" ? "Finale" :
           currentRoundName === "Round of 16" ? "Huitièmes de finale" :
          currentRoundName === "Relegation Round" ? "Barrages" :
currentRoundName === "8th Finals" ? "1/8 de finale" :
           currentRoundName}
        </Animated.Text>

        <TouchableOpacity onPress={next} disabled={index === rounds.length - 1} style={{width: 60, height: 30, alignItems: "center"}}>
          <Text style={[id === 15 ? styles.buttonTextWc : styles.buttonText, index === rounds.length - 1 && { opacity: 0.3 }]}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={{ transform: [{ translateX: slideAnim }], width: "100%" }}>
        {filteredMatches.map(match => (
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
        ))}
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 4,
    borderRadius: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Kanitt",
    color: "white",
    marginBottom: 10,
  },
  titleWc: {
    fontSize: 24,
    fontFamily: "Kanitt",
    color: "rgb(234, 186, 56)",
    marginBottom: 10,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    gap: 15,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 22,
    color: "white",
    marginHorizontal: 15,
    fontFamily: "Kanitalic"
  },
  buttonTextWc: {
    fontSize: 22,
    color: "rgb(234, 186, 56)",
    marginHorizontal: 15,
    fontFamily: "Kanitalic",
    
  },
  roundText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Kanitalik",
  },
  roundTextWc: {
    color: "rgb(234, 186, 56)",
    fontSize: 16,
    fontFamily: "Kanitalik",
  },
});

export default Tableau;