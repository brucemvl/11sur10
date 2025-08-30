import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Pour récupérer les paramètres de la route
import redcard from "../assets/redcard.png";
import chevron from "../assets/chevron.png";
import { LinearGradient } from 'expo-linear-gradient';
import terrain from "../assets/terrain.png";
import goal from "../assets/goal.png"
import tacle from "../assets/tacle.png"
import target from "../assets/target.png"
import shoot from "../assets/shoot.png"
import shoe from "../assets/shoe.png"
import rating from "../assets/rating.png"
import gardien from "../assets/gardien.png"
import player from "../assets/player.png"
import yellow from "../assets/yellow.png"
import Precedent from '../components/Precedent';
import fifaclubwc from "../assets/fifaclubwc2.png"
import ligue1 from "../assets/logoligue1.webp"
import cdm from "../assets/trophees/cdm.png"
import ucl from "../assets/trophees/ucl.png"
import pl from "../assets/trophees/pl.png"
import copa from "../assets/trophees/copaamerica.png"
import europa from "../assets/trophees/europaleague.png"
import tropheeligue1 from "../assets/trophees/ligue1.png"
import newtropheeligue1 from "../assets/trophees/ligue11.webp"
import liga from "../assets/trophees/liga.png"
import bundesliga from "../assets/trophees/bundesliga.png"
import euro from "../assets/trophees/euro.png"
import uefa from "../assets/trophees/uefasupercup.png"
import seriea from "../assets/trophees/seriea.png"
import can from "../assets/trophees/can.png"
import nations from "../assets/trophees/nations.png"
import fifa from "../assets/trophees/fifa.png"
import messi from "../assets/trophees/messi.jpg"

import dembeleselec from "../assets/portraits/selection/dembouz.webp"
import doueselec from "../assets/portraits/selection/doue.png"
import barcolaselec from "../assets/portraits/selection/barcola.webp"
import cherkiselec from "../assets/portraits/selection/cherki.webp"
import theoselec from "../assets/portraits/selection/theo.png"
import mbappeselec from "../assets/portraits/selection/mbappe.webp"
import thuramselec from "../assets/portraits/selection/thuram.webp"
import oliseselec from "../assets/portraits/selection/olise.png"
import rabiotselec from "../assets/portraits/selection/rabiot.webp"
import lukasselec from "../assets/portraits/selection/lukas.webp"
import chevalierselec from "../assets/portraits/selection/chevalier.png"
import konateselec from "../assets/portraits/selection/konate.webp"
import guendouziselec from "../assets/portraits/selection/guendouzi.webp"
import zaireselec from "../assets/portraits/selection/zaire.webp"
import maignanselec from "../assets/portraits/selection/maignan.webp"
import tchouameniselec from "../assets/portraits/selection/tchouameni.webp"
import kolomuaniselec from "../assets/portraits/selection/kolomuani.webp"

import {fichesJoueurs} from "../datas/Fiches.jsx";

function FicheJoueur() {
  const [joueur, setJoueur] = useState(null);
  const [palmares, setPalmares] = useState(null);
  const [annee, setAnnee] = useState(2025)
  const [opaque, setOpaque] = useState(false)
  const [opaque2, setOpaque2] = useState(true)

  const [openPalmares, setOpenPalmares] = useState(false);

  const route = useRoute();
  const { id, team } = route.params; // Utilisation des paramètres de route dans React Native
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0)); // Pour la rotation de l'icône
  const [heightAnim, setHeightAnim] = useState(new Animated.Value(0)); // Pour la hauteur du palmarès

  const [rotateSeason, setRotateSeason] = useState(new Animated.Value(0));


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
    fetch(`https://v3.football.api-sports.io/players?id=${id}&season=${annee}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      
      .then((result) => setJoueur(result.response[0]))
      .catch((error) => { console.error(error) });
  }, [id, annee]);

  console.log(joueur)



  const prec = () => {
    if (annee > 2025 - 4) {
      setAnnee((prev) => prev - 1)
    }
    if (annee === 2022) {
      setOpaque(true)
    }
    if (annee === 2025) {
      setOpaque2(false)
    }

    Animated.timing(rotateSeason, {
      toValue: 1, // Valeur cible de la rotation
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Réinitialiser la valeur de la rotation à 0 après l'animation
      rotateSeason.setValue(0);
    });

  }

  const next = () => {
    if (annee < 2025) {
      setAnnee((next) => next + 1)
    }
    if (annee === 2021) {
      setOpaque(false)
    }
    if (annee === 2024) {
      setOpaque2(true)
    }

    Animated.timing(rotateSeason, {
      toValue: 1, // Valeur cible de la rotation
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Réinitialiser la valeur de la rotation à 0 après l'animation
      rotateSeason.setValue(0);
    });

  }

/*
const prec = () => {
    if (annee > 2024 - 3) {
      setAnnee((prev) => prev - 1)
    }
    if (annee === 2022) {
      setOpaque(true)
    }
    if (annee === 2024) {
      setOpaque2(false)
    }

    Animated.timing(rotateSeason, {
      toValue: 1, // Valeur cible de la rotation
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Réinitialiser la valeur de la rotation à 0 après l'animation
      rotateSeason.setValue(0);
    });

  }

  const next = () => {
    if (annee < 2024) {
      setAnnee((next) => next + 1)
    }
    if (annee === 2021) {
      setOpaque(false)
    }
    if (annee === 2023) {
      setOpaque2(true)
    }

    Animated.timing(rotateSeason, {
      toValue: 1, // Valeur cible de la rotation
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Réinitialiser la valeur de la rotation à 0 après l'animation
      rotateSeason.setValue(0);
    });

  }

  */

  if (!joueur || !palmares) {

    return <View>
      <Precedent />
      <Text style={{ textAlign: "center", marginTop: 100, fontFamily: "Kanitt", fontSize: 14 }}>Aucune Donnée dispo</Text>;
    </View>
  }

  const totalGoals = joueur?.statistics.reduce((acc, stat) => {
    if (stat.league.name !== 'Copa America' && stat.league.name !== "Euro Championship") {
      acc += stat.goals.total;
    }
    return acc;
  }, 0);

  const totalPasses = joueur?.statistics.reduce((acc, stat) => {
    if (stat.league.name !== 'Copa America' && stat.league.name !== "Euro Championship") {
      acc += stat.goals.assists;
    }
    return acc;
  }, 0);

  const totalMatchs = joueur?.statistics.reduce((acc, stat) => {
    if (stat.league.name !== 'Copa America' && stat.league.name !== "Euro Championship") {
      acc += stat.games.appearences;
    }
    return acc;
  }, 0);

  console.log(totalGoals)
  console.log(totalPasses)

console.log(team)


  const teamNames = joueur?.statistics.map((element) => element.team.name);
  const uniqueTeamNames = joueur?.statistics.reduce((acc, element) => {
    if (!acc.includes(element.team.logo) && element.games.minutes > 0) {
      acc.push(element.team.logo);
    }
    return acc;
  }, []);

  console.log(uniqueTeamNames)

  const date = new Date(joueur?.player.birth.date);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const trophees = palmares?.filter((element) => element.place === "Winner");

  const trophies = trophees.reduce((acc, trophy) => {
    if (!acc[trophy.league]) {
      acc[trophy.league] = [];
    }
    acc[trophy.league].push(trophy);
    return acc;
  }, {});

  const trophiesArray = Object.entries(trophies).map(([league, trophies, season]) => ({
    league,
    trophies,
  }));

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const rotateSeasonInterpolate = rotateSeason.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  console.log(trophiesArray)



  return (
    <View>
      <Precedent />
      <ScrollView contentContainerStyle={styles.blocJoueur}>
        <View style={styles.article}>
          <LinearGradient colors={["black", "steelblue"]} style={styles.infosJoueur}>
{team === 2 ? 
            <Image source={
              
               joueur.player.id === 336657 ? zaireselec : joueur.player.id === 1145 ? konateselec : joueur.player.id === 1454 ? guendouziselec : joueur.player.id === 162453 ? chevalierselec :joueur.player.id === 21104 ? kolomuaniselec : joueur.player.id === 22221 ? maignanselec : joueur.player.id === 1271 ? tchouameniselec : joueur.player.id === 33 ? lukasselec : joueur.player.id === 272 ? rabiotselec : joueur.player.id === 21509 ? thuramselec : joueur.player.id === 278 ? mbappeselec : joueur.player.id === 153 ? dembeleselec : joueur.player.id === 343027 ? doueselec : joueur.player.id === 19617 ? oliseselec : joueur.player.id === 47300 ? theoselec : joueur.player.id === 161904 ? barcolaselec : joueur.player.id === 156477 ? cherkiselec : {uri: joueur.player.photo}}
              style={{height: "190", width: "35%"}}/>
               :
              <Image
  source={fichesJoueurs[joueur.player.id] || { uri: joueur.player.photo }}
  style={
                
             joueur.player.id === 904 || joueur.player.id === 276 || joueur.player.id === 340626 || joueur.player.id === 340626 || joueur.player.id === 542 || joueur.player.id === 542 || joueur.player.id === 153 || joueur.player.id === 153 || joueur.player.id === 567 || joueur.player.id === 63577 || joueur.player.id === 247 || joueur.player.id === 1864 || joueur.player.id === 152953 || joueur.player.id === 336657 || joueur.player.id === 386828 || joueur.player.id === 1257 || joueur.player.id === 1323 || joueur.player.id === 9971 || joueur.player.id === 133609 || joueur.player.id === 521 || joueur.player.id === 396623 || joueur.player.id === 1496 || joueur.player.id === 263482 || joueur.player.id === 306 || joueur.player.id === 51617 || joueur.player.id === 6716 || joueur.player.id === 1096 || joueur.player.id === 180317 || joueur.player.id === 147859 || joueur.player.id === 278 || joueur.player.id === 483 ? { height: 230, width: "39%"}:
              joueur.player.id === 22236 || joueur.player.id === 18861 || joueur.player.id === 409216 || joueur.player.id === 154 || joueur.player.id === 1622 || joueur.player.id === 128384  ? { height: "100%", width: "46%", marginRight: -30} :
        joueur.player.id === 21393 || joueur.player.id === 7334 || joueur.player.id === 67972 || joueur.player.id === 29 || joueur.player.id === 47301 || joueur.player.id === 449249 || joueur.player.id === 653 || joueur.player.id === 336711 || joueur.player.id === 284300 || joueur.player.id === 15911 || joueur.player.id === 2295 || joueur.player.id === 2413 || joueur.player.id === 157052 || joueur.player.id === 328033 || joueur.player.id === 2195 || joueur.player.id === 2897 || joueur.player.id === 2489 || joueur.player.id === 545 || joueur.player.id === 532 || joueur.player.id === 288006 || joueur.player.id === 70100 || joueur.player.id === 2935 || joueur.player.id === 342970 || joueur.player.id === 1165 || joueur.player.id === 19220 || joueur.player.id === 886 || joueur.player.id === 747 || joueur.player.id === 272 || joueur.player.id === 135775 || joueur.player.id === 1101 || joueur.player.id === 180496 || joueur.player.id === 30807 || joueur.player.id === 21497 || joueur.player.id === 641 || joueur.player.id === 38746 || joueur.player.id === 22224 || joueur.player.id === 18979 || joueur.player.id === 152654 || joueur.player.id === 290 || joueur.player.id === 1145 || joueur.player.id === 206254 || joueur.player.id === 280 || joueur.player.id === 909 || joueur.player.id === 19959 || joueur.player.id === 127769 || joueur.player.id === 19465 || joueur.player.id === 2937 || joueur.player.id === 1946 || joueur.player.id === 22090 || joueur.player.id === 1149 || joueur.player.id === 497 || joueur.player.id === 972 || joueur.player.id === 21138 || joueur.player.id === 129033 || joueur.player.id === 284230 || joueur.player.id === 626 || joueur.player.id === 153430 || joueur.player.id === 508 || joueur.player.id === 181812 || joueur.player.id === 6420 || joueur.player.id === 510 || joueur.player.id === 184 || joueur.player.id === 19617 || joueur.player.id === 161928 || joueur.player.id === 372 || joueur.player.id === 291964 || joueur.player.id === 511 || joueur.player.id === 502 || joueur.player.id === 509 || joueur.player.id === 323935 || joueur.player.id === 631 || joueur.player.id === 36902 || joueur.player.id === 156477 || joueur.player.id === 161585 || joueur.player.id === 266 ||  joueur.player.id === 2068 || joueur.player.id === 6009 || joueur.player.id === 8492 || joueur.player.id === 56 || joueur.player.id === 744 || joueur.player.id === 1271 || joueur.player.id === 283 || joueur.player.id === 361497 || joueur.player.id === 9 ||  joueur.player.id === 41585 || joueur.player.id === 161904 || joueur.player.id === 33 || joueur.player.id === 257 || joueur.player.id === 16367 || joueur.player.id === 21509 || joueur.player.id === 2802 || joueur.player.id === 31009 || joueur.player.id === 30558 || joueur.player.id === 226 || joueur.player.id === 81573 || joueur.player.id === 5  ? {height: "100%", width: "40%", marginRight: -20} :
            joueur.player.id === 506 || joueur.player.id === 2194 || joueur.player.id === 1159 || joueur.player.id === 984 || joueur.player.id === 289 || joueur.player.id === 1600 || joueur.player.id === 19035 || joueur.player.id === 293 || joueur.player.id === 343027 || joueur.player.id === 927 || joueur.player.id === 284322 || joueur.player.id === 20589 || joueur.player.id === 157997 || joueur.player.id === 30410 || joueur.player.id === 1465 || joueur.player.id === 278095 || joueur.player.id === 19364 || joueur.player.id === 85041 || joueur.player.id === 412 || joueur.player.id === 360114 || joueur.player.id === 162453 || joueur.player.id === 313245 || joueur.player.id === 629 || joueur.player.id === 174565 || joueur.player.id === 136723 || joueur.player.id === 304 || joueur.player.id === 874 || joueur.player.id === 759 || joueur.player.id === 1460 || joueur.player.id === 37127 || joueur.player.id === 1100 || joueur.player.id === 897 || joueur.player.id === 203224 || joueur.player.id === 736 || joueur.player.id === 274300 || joueur.player.id === 343320 || joueur.player.id === 283026 || joueur.player.id === 10329 || joueur.player.id === 161948 || joueur.player.id === 161907 || joueur.player.id === 1485 || joueur.player.id === 284324 || joueur.player.id === 266657 || joueur.player.id === 335051 || joueur.player.id === 157 || joueur.player.id === 262 || joueur.player.id === 1422 || joueur.player.id === 636 || joueur.player.id === 44 || joueur.player.id === 762 || joueur.player.id === 129718 || joueur.player.id === 10009 || joueur.player.id === 756 || joueur.player.id === 2207 || joueur.player.id === 377122 || joueur.player.id === 754 || joueur.player.id === 2285 || joueur.player.id === 733 || joueur.player.id === 328 || joueur.player.id === 217 || joueur.player.id === 18767 || joueur.player.id === 644 || joueur.player.id === 47380 || joueur.player.id === 22094 || joueur.player.id === 152982 || joueur.player.id === 283058 || joueur.player.id === 5996 || joueur.player.id === 19545 || joueur.player.id === 116117 ? {height: "105%", width: "43%", marginRight: -20, objectFit: "contain"} :
               joueur.player.id === 269 ? {height: "125%", width: "44%", objectFit: "contain", marginLeft: -10}
                : styles.photo}
                 />
              }
            
            <View style={styles.bio}>
              <Text style={styles.name}>{joueur.player.id === 15906 ? "Toufik Chemakh" : joueur.player.id === 37784 ? "Mamadou Sissoko" : joueur.player.name}</Text>
             <View style={{ width: "100%", flexDirection: "column", alignItems: "center"}}> <Text style={styles.infoText}>Né le {joueur.player.id === 37784 ? "31/03/1999" : formattedDate}</Text><View style={{flexDirection: "row", alignItems: "center"}}><Text style={{fontFamily: "Kanitalic", color: "white"}}> à {joueur.player.id === 37784 || joueur.player.id === 15906 ? "Paris" : joueur.player.birth.place},</Text><Text style={{fontFamily: "Kanitalik", color: "white", fontSize: 15}}> {joueur.player.id === 37784 || joueur.player.id === 15906 ? "France" : joueur.player.birth.country === "Spain" ? "Espagne" : joueur.player.birth.country === "Netherlands" ? "Pays-Bas" : joueur.player.birth.country === "Belgium" ? "Belgique" : joueur.player.birth.country === "Brazil" ? "Bresil" : joueur.player.birth.country === "England" ? "Angleterre" : joueur.player.birth.country === "Türkiye" ? "Turquie" : joueur.player.birth.country === "Switzerland" ? "Suisse" : joueur.player.birth.country === "Germany" ? "Allemagne" : joueur.player.birth.country}</Text></View></View>
              <View style={{flexDirection: "row"}}><Text style={{fontFamily: "Kanitalik", color: "white"}}> { joueur.player.id === 37784 ? "180cm" : joueur.player.height} - {joueur.player.id === 37784 ? "70kg" :joueur.player.weight}</Text></View>
              <Text style={styles.infoText}>Poste: {joueur.statistics[0].games.position === "Midfielder" ? "Milieu" : joueur.statistics[0].games.position === "Attacker" ? "Attaquant" : joueur.statistics[0].games.position === "Defender" ? "Defenseur" : joueur.statistics[0].games.position === "Goalkeeper" ? "Gardien" : joueur.statistics[0].games.position}</Text>
              <View style={styles.logos}>
                {uniqueTeamNames.map((logo, index) => (logo === "https://media.api-sports.io/football/teams/10179.png" || logo === 'https://media.api-sports.io/football/teams/9256.png' || logo === 'https://media.api-sports.io/football/teams/8216.png' || logo === 'https://media.api-sports.io/football/teams/8190.png' || logo === 'https://media.api-sports.io/football/teams/12520.png' || logo === 'https://media.api-sports.io/football/teams/712.png' || logo === 'https://media.api-sports.io/football/teams/8194.png' ? null : logo === "https://media.api-sports.io/football/teams/10334.png" ? null : logo === "https://media.api-sports.io/football/teams/16621.png" ? null : logo === "https://media.api-sports.io/football/teams/10187.png" ? null :
                  <Image key={`logo-${index}`} source={{ uri: logo }} style={styles.logo} />
                ))}
              </View>
            </View>
          </LinearGradient>

          <View style={styles.palmares}>
            <TouchableOpacity onPress={collapsePalmares}>
              <LinearGradient colors={["black", "steelblue"]} style={styles.palmaresTitle} >
                <Text style={styles.palmaresText}>Palmarès</Text>
                <Animated.Image
                  source={chevron}
                  style={[styles.chevron, { transform: [{ rotate: rotateInterpolate }] }]}
                />
              </LinearGradient>
            </TouchableOpacity>

            {palmares.length > 22 ?
              joueur.player.id === 154 ? <Animated.View style={[styles.palmaresInfos, {
                height: heightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 280]  // Ajustez la hauteur en fonction du contenu
                })
              }]}>
                <Image source={messi} style={{ objectFit: "contain", width: "100%" }} />
              </Animated.View> :
                <Animated.View style={[styles.palmaresInfos, {
                  height: heightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 380]  // Ajustez la hauteur en fonction du contenu
                  })
                }]}>
                  <View style={{ width: "55%" }} >
                    {trophiesArray.map((element, index) => (
                      element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                        <Text key={"trophee" + element.league + element.season} style={{ fontFamily: "Kanito", marginInline: 10, marginBlock: 2 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                    ))}
                  </View>
                  <View style={styles.armoire}>
                    {trophiesArray.map((element) => <View key={"trophy" + element.league + element.trophies[0].season} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? element.trophies[0].season === "2024/2025" ? <Image source={newtropheeligue1} style={styles.trophee} /> : <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
                  </View>

                </Animated.View> :
              palmares.length < 12 ? <Animated.View style={[styles.palmaresInfos, {
                height: heightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 190]  // Ajustez la hauteur en fonction du contenu
                })
              }]}>
                <View style={{ width: "55%" }}>
                  {trophiesArray.map((element, index) => (
                        element.league === "Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                      <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                  ))}
                </View>
                <View style={styles.armoire}>
                    {trophiesArray.map((element) => <View key={"trophy" + element.league + element.trophies[0].season} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? element.trophies[0].season === "2024/2025" ? <Image source={newtropheeligue1} style={styles.trophee} /> : <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
                </View>

              </Animated.View> :
                palmares.length <= 7 ? <Animated.View style={[styles.palmaresInfos, {
                  height: heightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 120]  // Ajustez la hauteur en fonction du contenu
                  })
                }]}>
                  <View style={{ width: "55%" }}>
                    {trophiesArray.map((element, index) => (
                        element.league === "Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                        <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                    ))}
                  </View>
                  <View style={styles.armoire}>
                    {trophiesArray.map((element) => <View key={"trophy" + element.league + element.trophies[0].season} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? element.trophies[0].season === "2024/2025" ? <Image source={newtropheeligue1} style={styles.trophee} /> : <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
                  </View>

                </Animated.View> :
                  <Animated.View style={[styles.palmaresInfos, {
                    height: heightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 240]  // Ajustez la hauteur en fonction du contenu
                    })
                  }]}>
                    <View style={{ width: "55%" }} >
                      {trophiesArray.map((element, index) => (
                        element.league === "Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                          <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                      ))}
                    </View>
                    <View style={styles.armoire}>
                    {trophiesArray.map((element) => <View key={"trophy" + element.league + element.trophies[0].season} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? element.trophies[0].season === "2024/2025" ? <Image source={newtropheeligue1} style={styles.trophee} /> : <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
                    </View>

                  </Animated.View>
            }
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            {opaque === true ? <TouchableOpacity style={{ opacity: 0.2, marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 24, fontFamily: "Kanitt" }}>{"<"}</Text></TouchableOpacity> : <TouchableOpacity onPress={prec} style={{ marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 24, fontFamily: "Kanitt" }}>{"<"}</Text></TouchableOpacity>}
            <Animated.Text style={[styles.season, { transform: [{ rotate: rotateSeasonInterpolate }] }]}>{annee}/{annee + 1}</Animated.Text>
            {opaque2 === true ? <TouchableOpacity style={{ opacity: 0.2, marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 24, fontFamily: "Kanitt" }}>{">"}</Text></TouchableOpacity> : <TouchableOpacity onPress={next} style={{ marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 24, fontFamily: "Kanitt" }}>{">"}</Text></TouchableOpacity>}
          </View>

          <View style={{ width: "70%", gap: 20, marginBlock: 10, flexDirection: "row", justifyContent: "space-evenly" }}>

            <View style={styles.stat}>
              <View style={{ backgroundColor: "rgb(8, 4, 82)", borderRadius: 50, width: 45, height: 45, alignItems: "center", justifyContent: "center" }}><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: 18 }}>{totalMatchs}</Text></View>
              <Text style={styles.h5}>Matchs Joués</Text>
            </View>

            <View style={styles.stat}>
              <View style={{ backgroundColor: "steelblue", borderRadius: 50, width: 45, height: 45, alignItems: "center", justifyContent: "center" }}><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: 18 }}>{totalGoals}</Text></View>
              <Text style={[styles.h5, {color: "steelblue"}]}>Buts</Text>
            </View>

            <View style={styles.stat}>
              <View style={{ backgroundColor: "steelblue", borderRadius: 50, width: 45, height: 45, alignItems: "center", justifyContent: "center" }}><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: 18 }}>{totalPasses}</Text></View>
              <Text style={[styles.h5, {color: "steelblue"}]}>Passes Dec</Text>
            </View>
          </View>

          <View style={styles.stats}>
            {joueur.statistics.map((element, index) => (
              <View key={index} style={styles.statBlock}>
                {element.games.minutes > 0 ? 
                  <View>
                    <LinearGradient colors={["rgba(56, 103, 142, 1)", "rgba(203, 217, 228, 1)"]}  style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                      <Text style={styles.leagueName}>{element.league.name === "Friendlies" ? "Amicaux" : element.league.name}</Text>
                    </LinearGradient>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginInline: 10 }}>
                      <View style={styles.statList}>
                        <View style={styles.ligne}>
                          <Image source={terrain} style={styles.icone} />
                          <Text style={styles.cle}>Matchs joués: </Text><Text style={styles.valeur}> {element.games.appearences}</Text>
                        </View>
                        {joueur.statistics[0].games.position === "Goalkeeper" ? 
                        <View style={styles.ligne}>
                          <Image source={gardien} style={styles.icone} />
                          <Text style={styles.cle}>Arrets:</Text><Text style={styles.valeur}> {element.goals.saves === null ? 0 : element.goals.saves}</Text>
                        </View> : null}
                        <View style={styles.ligne}>
                          <Image source={goal} style={styles.icone} />
                          <Text style={styles.cle}>Buts: </Text><Text style={styles.valeur}>{element.goals.total}</Text>
                        </View>
                        <View style={styles.ligne}>
                          <Image source={target} style={styles.icone} />
                          <Text style={styles.cle}>Passes Dec: </Text><Text style={styles.valeur}> {element.goals.assists === null ? 0 : element.goals.assists}</Text>
                        </View>
                       {joueur.statistics[0].games.position === "Goalkeeper" ? null : <View style={styles.ligne}>
                          <Image source={shoot} style={styles.icone} />
                          <Text style={styles.cle}>Tirs (cadrés): </Text><Text style={styles.valeur}> {element.shots.total} ({element.shots.on === null ? 0 : element.shots.on})</Text>
                        </View>}
                        <View style={styles.ligne}>
                          <Image source={shoe} style={styles.icone} />
                          <Text style={styles.cle}>Passes:</Text><Text style={styles.valeur}> {element.passes.total === null ? 0 : element.passes.total}</Text>
                        </View>
{joueur.statistics[0].games.position === "Defender" ? 
                        <View style={styles.ligne}>
                          <Image source={tacle} style={styles.icone} />
                          <Text style={styles.cle}>Tacles:</Text><Text style={styles.valeur}> {element.tackles.total === null ? 0 : element.tackles.total}</Text>
                        </View> : null}
                        {joueur.statistics[0].games.position === "Goalkeeper" ? null : <View style={styles.ligne}>
                          <Image source={player} style={styles.icone} />
                          <Text style={styles.cle}>Dribbles Tentés (Réussis): </Text><Text style={styles.valeur}> {element.dribbles.attempts} ({element.dribbles.success === null ? 0 : element.dribbles.success})</Text>
                        </View>}
                        <View style={styles.ligne}>
                          <Image source={rating} style={styles.icone} />
                          <Text style={styles.cle}>Note moyenne: </Text><Text style={styles.valeur}> {element.games.rating ? element.games.rating.slice(0, 4) : "-"}</Text>
                        </View>
                        <View style={styles.ligne}>
                          <Image source={yellow} style={{ height: 25, width: 25, marginRight: 8, shadowColor: "black", shadowOffset: { width: -1, height: 0 }, shadowOpacity: 0.9 }} />
                          <Text style={styles.cle}>Cartons jaune: </Text><Text style={styles.valeur}> {element.cards.yellow}</Text>
                        </View>
                        <View style={styles.ligne}>
                          <Image source={redcard} style={styles.icone} />
                          <Text style={styles.cle}>Cartons Rouge: </Text><Text style={styles.valeur}> {element.cards.red}</Text>
                        </View>
                      </View>
                      <Image source={ element.league.id === 61 ? ligue1 : element.league.id === 15 ? fifaclubwc : {uri: element.league.logo} } style={styles.logoCompet} />
                    </View>
                  </View>
                  : null
                }
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  blocJoueur: {
    flexDirection: 'column',
    width: '98%',
    alignItems: 'center',
    margin: '1%',
    marginTop: 65,
    paddingBottom: 100,
  },
  article: {
    flexDirection: 'column',
    width: '96%',
    alignItems: "center",
  },
  infosJoueur: {
    borderRadius: 15,
    flexDirection: 'row',
    padding: 12,
    width: '100%',
    color: 'white',
    marginBottom: 10,
  },

  photo: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  bio: {
    flexDirection: 'column',
    marginLeft: 6,
    gap: 4,
    alignItems: "center",
    width: "65%"
 },
  name: {
    fontSize: 19,
    color: 'white',
    fontFamily: "Permanent"
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    fontFamily: "Kanito",
    textAlign: "center"
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
    borderRadius: 10,
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
    flexDirection: "row",
    overflow: "hidden",
    width: "100%",
    alignItems: "center"
  },

  season: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Kanito"
  },
  stats: {
    width: '100%',
  },
  statBlock: {
        backgroundColor: 'rgba(203, 217, 228, 1)',
        borderRadius: 15,
        marginTop: 20

  },
  leagueName: {
    fontSize: 16,
    fontFamily: "Permanent",
    textAlign: "center",
    color: "white",
    marginBlockStart: 7,
    marginBlockEnd: 18
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
  trophee: {
    height: 74,
    width: 74,
    objectFit: "contain",
    overflow: "hidden",
    shadowColor: '#000', // shadow color
    shadowOffset: { width: -3, height: -3 }, // shadow offset
    shadowOpacity: 0.3, // shadow opacity
    shadowRadius: 3,
    padding: 7,
    margin: 2,
    elevation: 5



  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
  armoire: {
    flexDirection: "row",
    justifyContent: "center",
    width: "45%",
    flexWrap: "wrap",
    alignItems: "center",
    paddingBlock: 6
  },
  cle: {
    fontFamily: "Kanito",
    fontSize: 14,
    color: "rgb(8, 4, 82)"
  },
  valeur: {
    fontFamily: "Kanitt",
    fontSize: 16,
    color: "rgb(8, 4, 82)"
  },
  stat: {
    alignItems: "center"
  },
  h5: {
    fontFamily: "Kanitalik",
    color: "rgb(8, 4, 82)",
  }
});

export default FicheJoueur;