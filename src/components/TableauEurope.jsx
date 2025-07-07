import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, Animated } from "react-native";
import { StyleSheet } from "react-native";
import Match from "./Match";
import { LinearGradient } from "expo-linear-gradient";
import ucl from "../assets/logoucl.png"
import tabldc from "../assets/banner54.webp"
import psg from "../assets/psgchampion/PSG.jpg"
import psg1 from "../assets/psgchampion/PSG1.webp"
import psg2 from "../assets/psgchampion/PSG2.jpg"
import psg3 from "../assets/psgchampion/PSG3.webp"
import psg4 from "../assets/psgchampion/PSG4.jpg"
import psg5 from "../assets/psgchampion/PSG5.webp"
import psg6 from "../assets/psgchampion/PSG6.jpg"
import psg7 from "../assets/psgchampion/PSG7.webp"
import psg8 from "../assets/psgchampion/PSG8.jpg"
import psg9 from "../assets/psgchampion/PSG9.webp"
import psg10 from "../assets/psgchampion/PSG10.webp"
import psg11 from "../assets/psgchampion/PSG11.webp"
import psg12 from "../assets/psgchampion/PSG12.webp"
import psg13 from "../assets/psgchampion/PSG13.webp"
import psg14 from "../assets/psgchampion/PSG14.webp"
import psg15 from "../assets/psgchampion/PSG15.webp"
import psg16 from "../assets/psgchampion/PSG16.webp"
import psg17 from "../assets/psgchampion/PSG17.webp"
import psg18 from "../assets/psgchampion/PSG18.webp"
import psg19 from "../assets/psgchampion/PSG19.webp"
import psg20 from "../assets/psgchampion/PSG20.webp"
import psg21 from "../assets/psgchampion/PSG21.webp"
import psg22 from "../assets/psgchampion/PSG22.webp"
import psg23 from "../assets/psgchampion/PSG23.webp"
import psg24 from "../assets/psgchampion/PSG24.webp"



function TableauEurope({ id, currentRound, rounds }) {


  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-Black.ttf"),
  });

  const [team, setTeam] = useState([]);
  const [index, setIndex] = useState(0);
  const slideAnim = useState(new Animated.Value(0))[0];
  const [direction, setDirection] = useState("right");

  const photos = [
    psg, psg1, psg2, psg3, psg4, psg5,
    psg6, psg7, psg8, psg9,psg10, psg11, psg12, psg13, psg14, psg15, psg16, psg17, psg18, psg19, psg20, psg21, psg22, psg23, psg24
  ]

  const [randomPhoto, setRandomPhoto] = useState(photos[Math.floor(Math.random() * photos.length)]);
    const [isActive, setIsActive] = useState(true);

    const fadeAnim = useState(new Animated.Value(1))[0]; // Initial opacity 0
  
    function aleatoire(max) {
      return Math.floor(Math.random() * max);
    }
  
    const change = () => {
      setIsActive(false);
      // Animation pour rendre l'image invisible (opacity = 0)
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Une fois l'animation de fade-out terminée, changer la photo
        let random = aleatoire(photos.length);
        setRandomPhoto(photos[random]);
  
        // Animation pour faire réapparaître l'image (opacity = 1)
        Animated.timing(fadeAnim, {
          toValue: 1, // Fade in
          duration: 800,
          useNativeDriver: true,
        }).start(() => setIsActive(true)); // Set active after fade in
      });
    };
  
    // Utilisation de useEffect pour changer l'image toutes les 4 secondes
    useEffect(() => {
      const interval = setInterval(change, 4000); 
      return () => clearInterval(interval);
    }, []);

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
          `https://v3.football.api-sports.io/fixtures?league=${id}&season=2024`,
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
      style={styles.container}
    >
      <Text style={id === 15 ? styles.titleWc : styles.title}>Calendrier et Résultats</Text>
      <Image
        source={id === 2 ? ucl : { uri: `https://media.api-sports.io/football/leagues/${id}.png` }}
        style={id === 2 ? { width: 80, height: 50, objectFit: 'contain' } : { width: 50, height: 50, objectFit: 'contain' }}
      />
      {id === 2 ? <Animated.Image
              source={randomPhoto}
              style={{ height: 280, width: "98%", objectFit: "contain", marginTop: 10, opacity: fadeAnim }}
            />
      :
       null}

      {/* Navigation entre rounds */}
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={prev} disabled={index === 0} style={{ width: 60, height: 30, alignItems: "center" }}>
          <Text style={[id === 15 ? styles.buttonTextWc : styles.buttonText, index === 0 && { opacity: 0.3 }]}>{'<'}</Text>
        </TouchableOpacity>

        <Animated.Text style={[id === 15 ? styles.roundTextWc : styles.roundText, { transform: [{ rotate: rotateJourneeInterpolate }] }]}>
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
    paddingVertical: 10,
    paddingInline: 4,
    borderRadius: 15,
    alignItems: "center"
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
    marginVertical: 10,
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

export default TableauEurope