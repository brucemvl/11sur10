import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Pour récupérer les paramètres de la route
import redcard from "../assets/redcard.png";
import chevron from "../assets/chevron.png";
import { LinearGradient } from 'expo-linear-gradient';
import player from "../assets/player.png";
import goal from "../assets/goal.png"
import target from "../assets/target.png"
import shoot from "../assets/shoot.png"
import shoe from "../assets/shoe.png"
import rating from "../assets/rating.png"
import yellow from "../assets/yellow.png"
import Precedent from '../components/Precedent';
import ligue1 from "../assets/logoligue1.webp"


function FicheJoueur() {
  const [joueur, setJoueur] = useState(null);
  const [palmares, setPalmares] = useState(null);

  const [openPalmares, setOpenPalmares] = useState(false);

  const route = useRoute();
  const { id } = route.params; // Utilisation des paramètres de route dans React Native

  const [rotateValue, setRotateValue] = useState(new Animated.Value(0)); // Pour la rotation de l'icône
  const [heightAnim, setHeightAnim] = useState(new Animated.Value(0)); // Pour la hauteur du palmarès

  const collapsePalmares = () => {
    setOpenPalmares(!openPalmares);

    Animated.timing(rotateValue, {
        toValue: openPalmares ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
  
      // Animer la hauteur du palmarès
      Animated.timing(heightAnim, {
        toValue: openPalmares ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
  };

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/trophies?player=${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      .then((result) => setPalmares(result.response))
      .catch((error) => { console.error(error) });
  }, [id]);

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/players?id=${id}&season=2024`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      .then((result) => setJoueur(result.response[0]))
      .catch((error) => { console.error(error) });
  }, [id]);

  if (!joueur || !palmares) {
    return <Text>Loading...</Text>;
  }

  const teamNames = joueur.statistics.map((element) => element.team.name);
  const uniqueTeamNames = joueur.statistics.reduce((acc, element) => {
    if (!acc.includes(element.team.logo) && element.games.minutes > 0) {
      acc.push(element.team.logo);
    }
    return acc;
  }, []);

  const date = new Date(joueur.player.birth.date);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const trophees = palmares.filter((element) => element.place === "Winner");

  const trophies = trophees.reduce((acc, trophy) => {
    if (!acc[trophy.league]) {
      acc[trophy.league] = [];
    }
    acc[trophy.league].push(trophy);
    return acc;
  }, {});

  const trophiesArray = Object.entries(trophies).map(([league, trophies]) => ({
    league,
    trophies,
  }));

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  console.log(palmares)
  

  return (
    <ScrollView contentContainerStyle={styles.blocJoueur}>
      <Precedent />
      <View style={styles.article}>
        <LinearGradient colors={["black", "steelblue"]} style={styles.infosJoueur}>
          <Image source={{ uri: joueur.player.photo }} style={styles.photo} />
          <View style={styles.bio}>
            <Text style={styles.name}>{joueur.player.name}</Text>
            <Text style={styles.infoText}>Né le {formattedDate} à {joueur.player.birth.place}, {joueur.player.birth.country}</Text>
            <Text style={styles.infoText}>Taille: {joueur.player.height}, Poids: {joueur.player.weight}</Text>
            <Text style={styles.infoText}>Poste: {joueur.statistics[0].games.position === "Midfielder" ? "Milieu" : joueur.statistics[0].games.position === "Attacker" ? "Attaquant" : joueur.statistics[0].games.position === "Defender" ? "Defenseur" : joueur.statistics[0].games.position === "Goalkeeper" ? "Gardien" : joueur.statistics[0].games.position}</Text>
            <View style={styles.logos}>
              {uniqueTeamNames.map((logo, index) => (
                <Image key={`logo-${index}`} source={{ uri: logo }} style={styles.logo} />
              ))}
            </View>
          </View>
        </LinearGradient>

        <View style={styles.palmares}>
          <TouchableOpacity  onPress={collapsePalmares}>
            <LinearGradient colors={["black", "steelblue"]} style={styles.palmaresTitle} >
            <Text style={styles.palmaresText}>Palmarès</Text>
            <Animated.Image
            source={chevron}
            style={[styles.chevron, { transform: [{ rotate: rotateInterpolate }] }]}
          /> 
          </LinearGradient>
            </TouchableOpacity>
            {palmares.length > 22 ?
            <Animated.View style={[styles.palmaresInfos, { height: heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 280]  // Ajustez la hauteur en fonction du contenu
          }) }]}>
          {trophiesArray.map((element, index) => (
            <View key={index}>
              <Text style={{fontFamily: "Kanito", marginInline: 10}}>{element.trophies.length}x {element.league}</Text>
            </View>
          ))}
        </Animated.View> : palmares.length < 10 ? <Animated.View style={[styles.palmaresInfos, { height: heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 120]  // Ajustez la hauteur en fonction du contenu
          }) }]}>
          {trophiesArray.map((element, index) => (
            <View key={index}>
              <Text style={{fontFamily: "Kanito", marginInline: 10}}>{element.trophies.length}x {element.league}</Text>
            </View>
          ))}
        </Animated.View> : <Animated.View style={[styles.palmaresInfos, { height: heightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 200]  // Ajustez la hauteur en fonction du contenu
          }) }]}>
          {trophiesArray.map((element, index) => (
            <View key={index}>
              <Text style={{fontFamily: "Kanito", marginInline: 10}}>{element.trophies.length}x {element.league}</Text>
            </View>
          ))}
        </Animated.View>}
        </View>

        <Text style={styles.season}>2024/2025</Text>
        <View style={styles.stats}>
          {joueur.statistics.map((element, index) => (
            <View key={index} style={styles.statBlock}>
              {element.games.minutes > 0 && (
                <View>
                    <LinearGradient colors={["black", "steelblue"]} style={{borderRadius: 5}}>
                  <Text style={styles.leagueName}>{element.league.name === "Friendlies" ? "Amicaux" : element.league.name}</Text>
                  </LinearGradient>
                  <View style={{flexDirection: "row", justifyContent: "space-between", marginInline: 10}}>
                  <View style={styles.statList}>
                    <View style={styles.ligne}>
                        <Image source={player} style={styles.icone} />
                    <Text style={{fontFamily: "Kanito", fontSize: 16}}>Matchs joués: {element.games.appearences}</Text>
                    </View>
                    <View style={styles.ligne}>
<Image source={goal} style={styles.icone} />
                    <Text style={{fontFamily: "Kanito", fontSize: 16}}>Buts: {element.goals.total}</Text>
                    </View>
                    <View style={styles.ligne}>
<Image source={target} style={styles.icone} />
                    <Text style={{fontFamily: "Kanito", fontSize: 16}}>Passes Dec: {element.goals.assists}</Text>
                    </View>
                    <View style={styles.ligne}>
                    <Image source={shoot} style={styles.icone} />
                    <Text style={{fontFamily: "Kanito", fontSize: 16}}>Tirs (cadrés): {element.shots.total} ({element.shots.on})</Text>
                    </View>
                    <View style={styles.ligne}>
                    <Image source={shoe} style={styles.icone} />
                    <Text style={{fontFamily: "Kanito", fontSize: 16}}>Passes: {element.passes.total}</Text>
                    </View>
                    <View style={styles.ligne}>
<Image source={rating} style={styles.icone} />
                    <Text style={{fontFamily: "Kanito", fontSize: 16}}>Note moyenne: {element.games.rating ? element.games.rating.slice(0, 4) : ""}</Text>
                    </View>
                    <View style={styles.ligne}>
                    <Image source={yellow} style={styles.icone} />
                    <Text style={{fontFamily: "Kanito", fontSize: 16}}>Cartons jaune: {element.cards.yellow}</Text>
                    </View>
                    <View style={styles.ligne}>
                    <Image source={redcard} style={styles.icone} />
                    <Text style={{fontFamily: "Kanito", fontSize: 16}}>Cartons Rouge: {element.cards.red}</Text>
                    </View>
                  </View>
                  {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image source={ligue1} style={styles.logoCompet} /> : <Image source={{ uri: element.league.logo }} style={styles.logoCompet} />} 
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blocJoueur: {
    flexDirection: 'column',
    width: '98%',
    alignItems: 'center',
    margin: '1%',
    marginTop: 20,
  },
  article: {
    flexDirection: 'column',
    width: '98%',
    alignItems: "center"
  },
  infosJoueur: {
    backgroundColor: '#4682b4',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    color: 'white',
    marginBottom: 10
  },
  photo: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  bio: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    width: "80%"
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontFamily: "Permanent"
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    fontFamily: "Kanito"
  },
  logos: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 30
  },
  logo: {
    height: 40,
    width: 40,
    marginLeft: 5,
    objectFit: "contain"
  },
  palmares: {
    marginBottom: 20,
    width: '100%',
  },
  palmaresTitle: {
    backgroundColor: '#4682b4',
    color: 'white',
    paddingBlock: 5,
    paddingInline: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  palmaresText: {
    fontSize: 16,
    color: 'white',
    fontFamily: "Permanent",


  },
  chevron: {
position: "relative",
left: 120
  },
  
  palmaresInfos: {
    marginTop: 10,
  },
  season: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "Kanito"
  },
  stats: {
    width: '100%',
  },
  statBlock: {
    marginBottom: 20,
  },
  leagueName: {
    fontSize: 16,
fontFamily: "Permanent",
textAlign: "center",
color: "white",
marginBlock: 5
},
  statList: {
    marginTop: 10,
  },
  ligne: {
flexDirection: "row",
alignItems: "center",
marginBlock: 6
  },
  logoCompet: {
    height: 70,
    width: 70,
    marginTop: 10,
    objectFit: "contain"
  },
  icone: {
    height: 25,
    width: 25,
    marginRight: 8
  },
});

export default FicheJoueur;