import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Animated, useWindowDimensions } from 'react-native';
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
import clubwc from "../assets/trophees/cdmclub.png"
import messi from "../assets/trophees/messi.jpg"

import dembeleselec from "../assets/portraits/selection/dembouz.webp"
import doueselec from "../assets/portraits/selection/doue.png"
import barcolaselec from "../assets/portraits/selection/barcola.webp"
import koundeselec from "../assets/portraits/selection/kounde.png"
import digneselec from "../assets/portraits/selection/digne.png"
import pavardselec from "../assets/portraits/selection/pavard.webp"
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
import kephrenselec from "../assets/portraits/selection/kephren.webp"
import comanselec from "../assets/portraits/selection/coman.webp"
import ekitikeselc from "../assets/portraits/selection/ekitike.webp"
import aklioucheselec from "../assets/portraits/selection/akliouche.webp"
import koneselec from "../assets/portraits/selection/kone.webp"
import salibaselec from "../assets/portraits/selection/saliba.webp"
import upamecanoselec from "../assets/portraits/selection/upamecano.webp"
import camavingaselec from "../assets/portraits/selection/camavinga.webp"
import gustoselec from "../assets/portraits/selection/gusto.webp"
import thauvinselec from "../assets/portraits/selection/thauvin.webp"
import nkunkuselec from "../assets/portraits/selection/nkunku.webp"
import matetaselec from "../assets/portraits/selection/mateta.webp"
import kanteselec from "../assets/portraits/selection/kante.webp"


import { fichesJoueurs } from "../datas/Fiches.jsx";

function FicheJoueur() {
  const { width } = useWindowDimensions();

  const isSmallScreen = width <= 767;
  const isMediumScreen = width <= 1024 && width > 767;

  const [joueur, setJoueur] = useState(null);
  const [palmares, setPalmares] = useState(null);
  const [annee, setAnnee] = useState(2025)
  const [opaque, setOpaque] = useState(false)
  const [opaque2, setOpaque2] = useState(true)

  const [openPalmares, setOpenPalmares] = useState(false);

  const route = useRoute();
  const { id, team } = route.params;
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));
  const [heightAnim, setHeightAnim] = useState(new Animated.Value(0));

  const [rotateSeason, setRotateSeason] = useState(new Animated.Value(0));


  const collapsePalmares = () => {
    setOpenPalmares(!openPalmares);

    Animated.timing(rotateValue, {
      toValue: openPalmares ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

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
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
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
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      rotateSeason.setValue(0);
    });

  }


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

  const trophees = palmares?.filter((element) => element.place === "Winner" && element.season != null);

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

  const trophyImages = {
    "FIFA Club World Cup": clubwc,
    "FIFA World Cup": cdm,
    "UEFA Champions League": ucl,
    "Premier League": pl,
    "CONMEBOL Copa America": copa,
    "UEFA Europa League": europa,
    "La Liga": liga,
    "Bundesliga": bundesliga,
    "UEFA European Championship": euro,
    "UEFA Super Cup": uefa,
    "Serie A": seriea,
    "CAF Africa Cup of Nations": can,
    "UEFA Nations League": nations,
    "FIFA Intercontinental Cup": fifa,
  };

  const getLigue1Image = (element) => {
    return element.trophies[0].season === "2024/2025"
      ? newtropheeligue1
      : tropheeligue1;
  };


  return (
    <View>
      <Precedent />
      <ScrollView contentContainerStyle={styles.blocJoueur}>
        <View style={[styles.article, isMediumScreen && { width: "90%" }]}>
          <LinearGradient colors={["black", "steelblue"]} style={[styles.infosJoueur, isMediumScreen && { height: 280 }]}>
            {team === 2 ?
              <Image source={

                joueur.player.id === 1922 ? thauvinselec : joueur.player.id === 269 ? nkunkuselec : joueur.player.id === 25927 ? matetaselec : joueur.player.id === 161907 ? gustoselec : joueur.player.id === 2207 ? camavingaselec : joueur.player.id === 1149 ? upamecanoselec : joueur.player.id === 22090 ? salibaselec : joueur.player.id === 116 ? kephrenselec : joueur.player.id === 274300 ? aklioucheselec : joueur.player.id === 508 ? comanselec : joueur.player.id === 174565 ? ekitikeselc : joueur.player.id === 22147 ? koneselec : joueur.player.id === 2725 ? pavardselec : joueur.player.id === 2724 ? digneselec : joueur.player.id === 1257 ? koundeselec : joueur.player.id === 336657 ? zaireselec : joueur.player.id === 1145 ? konateselec : joueur.player.id === 1454 ? guendouziselec : joueur.player.id === 162453 ? chevalierselec : joueur.player.id === 21104 ? kolomuaniselec : joueur.player.id === 22221 ? maignanselec : joueur.player.id === 1271 ? tchouameniselec : joueur.player.id === 33 ? lukasselec : joueur.player.id === 272 ? rabiotselec : joueur.player.id === 21509 ? thuramselec : joueur.player.id === 278 ? mbappeselec : joueur.player.id === 153 ? dembeleselec : joueur.player.id === 343027 ? doueselec : joueur.player.id === 19617 ? oliseselec : joueur.player.id === 47300 ? theoselec : joueur.player.id === 161904 ? barcolaselec : joueur.player.id === 156477 ? cherkiselec : { uri: joueur.player.photo }}
                style={{ height: "190", width: "38%" }} />
              :
              <Image
                source={fichesJoueurs[joueur.player.id] || { uri: joueur.player.photo }}
                style={[

                  fichesJoueurs[joueur.player.id] ? styles.fiche : styles.photo, isMediumScreen && { height: 260 }]}
              />
            }

            <View style={styles.bio}>
              <Text style={[styles.name, isMediumScreen && { fontSize: 22 }]}>{joueur.player.id === 307123 ? "N. O'Reilly" : joueur.player.name}</Text>
              <View style={{ width: "100%", flexDirection: "column", alignItems: "center" }}> <Text style={styles.infoText}>Né le {joueur.player.id === 37784 ? "31/03/1999" : formattedDate}</Text><View style={{ flexDirection: "row", alignItems: "center" }}><Text style={{ fontFamily: "Kanitalic", color: "white" }}> à {joueur.player.id === 37784 || joueur.player.id === 15906 ? "Paris" : joueur.player.birth.place},</Text><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: 15 }}> {joueur.player.id === 37784 || joueur.player.id === 15906 ? "France" : joueur.player.birth.country === "Spain" ? "Espagne" : joueur.player.birth.country === "Netherlands" ? "Pays-Bas" : joueur.player.birth.country === "Belgium" ? "Belgique" : joueur.player.birth.country === "Brazil" ? "Bresil" : joueur.player.birth.country === "England" ? "Angleterre" : joueur.player.birth.country === "Türkiye" ? "Turquie" : joueur.player.birth.country === "Switzerland" ? "Suisse" : joueur.player.birth.country === "Germany" ? "Allemagne" : joueur.player.birth.country}</Text></View></View>
              {joueur.player.height === null && joueur.player.weight === null ? null : <View style={{ flexDirection: "row" }}><Text style={{ fontFamily: "Kanitalik", color: "white" }}> {joueur.player.height === null ? null : joueur.player.height.slice(0,1) + "m" + joueur.player.height.slice(1,3)} {joueur.player.weight === null ? null : "- " + joueur.player.weight.slice(0,2) + "kg"}</Text></View>}
              <Text style={styles.infoText}>Poste: {joueur.statistics[0].games.position === "Midfielder" ? "Milieu" : joueur.statistics[0].games.position === "Attacker" ? "Attaquant" : joueur.statistics[0].games.position === "Defender" ? "Defenseur" : joueur.statistics[0].games.position === "Goalkeeper" ? "Gardien" : joueur.statistics[0].games.position}</Text>
              <View style={styles.logos}>
                {uniqueTeamNames.map((logo, index) => (logo === "https://media.api-sports.io/football/teams/10179.png" || logo === 'https://media.api-sports.io/football/teams/9256.png' || logo === 'https://media.api-sports.io/football/teams/8216.png' || logo === 'https://media.api-sports.io/football/teams/8190.png' || logo === 'https://media.api-sports.io/football/teams/12520.png' || logo === 'https://media.api-sports.io/football/teams/712.png' || logo === 'https://media.api-sports.io/football/teams/8194.png' ? null : logo === "https://media.api-sports.io/football/teams/10334.png" ? null : logo === "https://media.api-sports.io/football/teams/16621.png" ? null : logo === "https://media.api-sports.io/football/teams/10187.png" ? null :
                  <Image key={`logo-${index}`} source={{ uri: logo }} style={styles.logo} />
                ))}
              </View>
            </View>
          </LinearGradient>

          <View style={styles.palmares}>
            <TouchableOpacity onPress={collapsePalmares} accessible accessibilityLabel='palmarès' accessibilityHint={ openPalmares ? "Masquer le palmarès" : "Afficher le palmarès" } accessibilityState={{ expanded: openPalmares }}>
              <LinearGradient colors={["black", "steelblue"]} style={[styles.palmaresTitle, isMediumScreen && { paddingBlock: 8 }]} accessible={false} >
                <Text style={[styles.palmaresText, isMediumScreen && { fontSize: 20 }]}>Palmarès</Text>
                <Animated.Image
                  source={chevron}
                  style={[styles.chevron, { transform: [{ rotate: rotateInterpolate }] }, isMediumScreen && { left: 250 }]} accessible={false} importantForAccessibility="no" />
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
                  <View style={{ width: "55%" }} accessibilityRole="list" accessibilityLabel="Liste des compétitions remportées" >
                    {trophiesArray.map((element, index) => (
                      element.league === "Florida Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                        <Text key={"trophee" + element.league + element.season} style={{ fontFamily: "Kanito",  marginInline: 10, marginBlock: 2 }}>{element.league === "FIFA Club World Cup" ? 1 : element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                    ))}
                  </View>
                  <View style={styles.armoire}>
                    {trophiesArray.map((element) => {

                      const key = `trophy_${element.league}_${element.trophies[0].season}`;

                      // Cas spécial Ligue 1
                      const image =
                        element.league === "Ligue 1"
                          ? getLigue1Image(element)
                          : trophyImages[element.league];

                      // 👉 Si le trophée n'existe pas dans trophyImages, alors on n'affiche rien
                      if (!image) return null;

                      return (
                        <View key={key} style={styles.box}>
                          <Image source={image} style={styles.trophee} />

                          {element.trophies.length > 1 && (
                            <Text
                              style={styles.nombre}
                            >
                              x{element.trophies.length}
                            </Text>
                          )}
                        </View>
                      );
                    })}
                  </View>

                </Animated.View> :
              palmares.length < 12 ? <Animated.View style={[styles.palmaresInfos, {
                height: heightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 190]  // Ajustez la hauteur en fonction du contenu
                })
              }]}>
                <View style={{ width: "55%" }} accessibilityRole="list" accessibilityLabel="Liste des compétitions remportées">

                  {trophiesArray.map((element, index) => (
                    element.league === "Florida Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                      <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.league === "FIFA Club World Cup" ? 1 : element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                  ))}
                </View>
                <View style={styles.armoire}>
                  {trophiesArray.map((element) => {

                    const key = `trophy_${element.league}_${element.trophies[0].season}`;

                    // Cas spécial Ligue 1
                    const image =
                      element.league === "Ligue 1"
                        ? getLigue1Image(element)
                        : trophyImages[element.league];

                    // 👉 Si le trophée n'existe pas dans trophyImages, alors on n'affiche rien
                    if (!image) return null;

                    return (
                      <View key={key} style={styles.box}>
                        <Image source={image} style={styles.trophee} />

                        {element.trophies.length > 1 && (
                          <Text
                            style={styles.nombre}
                          >
                            x{element.trophies.length}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>

              </Animated.View> :
                palmares.length <= 7 ? <Animated.View style={[styles.palmaresInfos, {
                  height: heightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 120]  // Ajustez la hauteur en fonction du contenu
                  })
                }]}>
                  <View style={{ width: "55%" }} accessibilityRole="list" accessibilityLabel="Liste des compétitions remportées">

                    {trophiesArray.map((element, index) => (
                      element.league === "Florida Cup" ? null : element.league === "Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                        <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.league === "FIFA Club World Cup" ? 1 : element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                    ))}
                  </View>
                  <View style={styles.armoire}>

                    {trophiesArray.map((element) => {

                      const key = `trophy_${element.league}_${element.trophies[0].season}`;

                      // Cas spécial Ligue 1
                      const image =
                        element.league === "Ligue 1"
                          ? getLigue1Image(element)
                          : trophyImages[element.league];

                      // 👉 Si le trophée n'existe pas dans trophyImages, alors on n'affiche rien
                      if (!image) return null;

                      return (
                        <View key={key} style={styles.box}>
                          <Image source={image} style={styles.trophee} />

                          {element.trophies.length > 1 && (
                            <Text
                              style={styles.nombre}
                            >
                              x{element.trophies.length}
                            </Text>
                          )}
                        </View>
                      );
                    })}
                  </View>

                </Animated.View> :
                  <Animated.View style={[styles.palmaresInfos, {
                    height: heightAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 250]  // Ajustez la hauteur en fonction du contenu
                    })
                  }]}>
                    <View style={{ width: "55%" }} accessibilityRole="list" accessibilityLabel="Liste des compétitions remportées" >
                      {trophiesArray.map((element, index) => (
                        element.league === "Florida Cup" ? null : element.league === "Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                          <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.league === "FIFA Club World Cup" ? 1 : element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                      ))}
                    </View>
                    <View style={styles.armoire}>
                      {trophiesArray.map((element) => {

                        const key = `trophy_${element.league}_${element.trophies[0].season}`;

                        // Cas spécial Ligue 1
                        const image =
                          element.league === "Ligue 1"
                            ? getLigue1Image(element)
                            : trophyImages[element.league];

                        // 👉 Si le trophée n'existe pas dans trophyImages, alors on n'affiche rien
                        if (!image) return null;

                        return (
                          <View key={key} style={styles.box}>
                            <Image source={image} style={styles.trophee} />

                            {element.trophies.length > 1 && (
                              <Text
                                style={styles.nombre}
                              >
                                x{element.trophies.length}
                              </Text>
                            )}
                          </View>
                        );
                      })}
                    </View>

                  </Animated.View>
            }
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            {opaque === true ? <TouchableOpacity style={{ opacity: 0.2, marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: isMediumScreen ? 28 : 24, fontFamily: "Kanitt" }}>{"<"}</Text></TouchableOpacity> : <TouchableOpacity onPress={prec} style={{ marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: isMediumScreen ? 28 : 24, fontFamily: "Kanitt" }}>{"<"}</Text></TouchableOpacity>}
            <Animated.Text style={[styles.season, { transform: [{ rotate: rotateSeasonInterpolate }] }, isMediumScreen && { fontSize: 24 }]}>{annee}/{annee + 1}</Animated.Text>
            {opaque2 === true ? <TouchableOpacity style={{ opacity: 0.2, marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: isMediumScreen ? 28 : 24, fontFamily: "Kanitt" }}>{">"}</Text></TouchableOpacity> : <TouchableOpacity onPress={next} style={{ marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: isMediumScreen ? 28 : 24, fontFamily: "Kanitt" }}>{">"}</Text></TouchableOpacity>}
          </View>

          <View style={{ width: "70%", gap: 20, marginBlock: 10, flexDirection: "row", justifyContent: "space-evenly" }}>

            <View style={styles.stat}>
              <View style={{ backgroundColor: "rgb(8, 4, 82)", borderRadius: 50, width: isMediumScreen ? 65 : 45, height: isMediumScreen ? 65 : 45, alignItems: "center", justifyContent: "center" }}><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: isMediumScreen ? 22 : 18 }}>{totalMatchs}</Text></View>
              <Text style={[styles.h5, isMediumScreen && { fontSize: 16 }]}>Matchs Joués</Text>
            </View>

            <View style={styles.stat}>
              <View style={{ backgroundColor: "steelblue", borderRadius: 50, width: isMediumScreen ? 65 : 45, height: isMediumScreen ? 65 : 45, alignItems: "center", justifyContent: "center" }}><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: isMediumScreen ? 22 : 18 }}>{totalGoals}</Text></View>
              <Text style={[styles.h5, { color: "steelblue" }, isMediumScreen && { fontSize: 16 }]}>Buts</Text>
            </View>

            <View style={styles.stat}>
              <View style={{ backgroundColor: "steelblue", borderRadius: 50, width: isMediumScreen ? 65 : 45, height: isMediumScreen ? 65 : 45, alignItems: "center", justifyContent: "center" }}><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: isMediumScreen ? 22 : 18 }}>{totalPasses}</Text></View>
              <Text style={[styles.h5, { color: "steelblue" }, isMediumScreen && { fontSize: 16 }]}>Passes Dec</Text>
            </View>
          </View>

          <View style={styles.stats}>
            {joueur.statistics.map((element, index) => (
              <View key={index} style={styles.statBlock}>
                {element.games.minutes > 0 && element.league.id !== 850 ?
                  <View>
                    <LinearGradient colors={["rgba(56, 103, 142, 1)", "rgba(203, 217, 228, 1)"]} style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                      <Text style={[styles.leagueName, isMediumScreen && { fontSize: 22 }]}>{element.league.name.indexOf("Friendlies") != -1 ? element.league.name.replace("Friendlies", "Amicaux") : element.league.name}</Text>
                    </LinearGradient>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginInline: 10, paddingInline: isMediumScreen ? 25 : 8 }}>
                      <View style={styles.statList}>
                        <View style={styles.ligne}>
                          <Image source={terrain} style={styles.icone} />
                          <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Matchs joués: </Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.games.appearences}</Text>
                        </View>
                        {joueur.statistics[0].games.position === "Goalkeeper" ?
                          <View style={styles.ligne}>
                            <Image source={gardien} style={styles.icone} />
                            <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Arrets:</Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.goals.saves === null ? 0 : element.goals.saves}</Text>
                          </View> : null}
                        <View style={styles.ligne}>
                          <Image source={goal} style={styles.icone} />
                          <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Buts: </Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}>{element.goals.total}</Text>
                        </View>
                        <View style={styles.ligne}>
                          <Image source={target} style={styles.icone} />
                          <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Passes Dec: </Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.goals.assists === null ? 0 : element.goals.assists}</Text>
                        </View>
                        {joueur.statistics[0].games.position === "Goalkeeper" ? null : <View style={styles.ligne}>
                          <Image source={shoot} style={styles.icone} />
                          <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Tirs (cadrés): </Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.shots.total} ({element.shots.on === null ? 0 : element.shots.on})</Text>
                        </View>}
                        <View style={styles.ligne}>
                          <Image source={shoe} style={styles.icone} />
                          <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Passes:</Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.passes.total === null ? 0 : element.passes.total}</Text>
                        </View>
                        {joueur.statistics[0].games.position === "Defender" ?
                          <View style={styles.ligne}>
                            <Image source={tacle} style={styles.icone} />
                            <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Tacles:</Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.tackles.total === null ? 0 : element.tackles.total}</Text>
                          </View> : null}
                        {joueur.statistics[0].games.position === "Goalkeeper" ? null : <View style={styles.ligne}>
                          <Image source={player} style={styles.icone} />
                          <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Dribbles Tentés (Réussis): </Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.dribbles.attempts} ({element.dribbles.success === null ? 0 : element.dribbles.success})</Text>
                        </View>}
                        <View style={styles.ligne}>
                          <Image source={rating} style={styles.icone} />
                          <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Note moyenne: </Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.games.rating ? element.games.rating.slice(0, 4) : "-"}</Text>
                        </View>
                        <View style={styles.ligne}>
                          <Image source={yellow} style={{ height: 25, width: 25, marginRight: 8, shadowColor: "black", shadowOffset: { width: -1, height: 0 }, shadowOpacity: 0.9 }} />
                          <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Cartons jaune: </Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.cards.yellow}</Text>
                        </View>
                        <View style={styles.ligne}>
                          <Image source={redcard} style={styles.icone} />
                          <Text style={[styles.cle, isMediumScreen && { fontSize: 18 }]}>Cartons Rouge: </Text><Text style={[styles.valeur, isMediumScreen && { fontSize: 20 }]}> {element.cards.red}</Text>
                        </View>
                      </View>
                      <Image source={element.league.id === 61 ? ligue1 : element.league.id === 15 ? fifaclubwc : { uri: element.league.logo }} style={styles.logoCompet} />
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
    paddingBottom: 150,
  },
  article: {
    flexDirection: 'column',
    width: '96%',
    alignItems: "center",
  },
  infosJoueur: {
    borderRadius: 15,
    flexDirection: 'row',
    paddingInline: 10,
    width: '100%',
    color: 'white',
    marginBottom: 10,
    justifyContent: "center",
    height: 220,
    alignItems: "center"
  },
  fiche: {
    height: 200,
    width: "40%",
    objectFit: "contain"
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
    width: "60%"
  },
  name: {
    fontSize: 19,
    color: 'white',
    fontFamily: "Permanent",
    textAlign: "center"
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
    fontFamily: "Kanitalik",
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
    alignItems: "center",
    
  },

  season: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Kanito"
  },
  stats: {
    width: '100%',
    marginTop: 20,
    gap: 15
  },
  statBlock: {
    backgroundColor: 'rgba(203, 217, 228, 1)',
    borderRadius: 15,


  },
  leagueName: {
    fontSize: 18,
    fontFamily: "Bangers",
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
    shadowOpacity: 0.4, // shadow opacity
    shadowRadius: 3,
    padding: 7,
    margin: 2,
    elevation: 5



  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
  nombre: {
    position: "relative",
    bottom: 20,
    left: 15,
    backgroundColor: "black",
    color: "white",
    fontFamily: "Kanitalic",
    paddingInline: 4,
    borderRadius: 5,
    fontSize: 11,
  },
  armoire: {
    flexDirection: "row",
    justifyContent: "center",
    width: "45%",
    flexWrap: "wrap",
    alignItems: "center",
    paddingBlock: 6,
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