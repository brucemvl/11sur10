import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated, RefreshControl, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ligue1 from "../assets/logoligue1.webp"
import fifaClubWc from "../assets/fifaclubwc2.png"
import cdm2026 from "../assets/cdm2026.png"
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

function Aujourdhui({ matchs, onRefresh }) {

  const { width } = useWindowDimensions();
    
        const isSmallScreen = width <= 767;
        const isMediumScreen = width <= 1024 && width > 767;

  const navigation = useNavigation()
  const [hier, setHier] = useState(false)
  const [aujourdhui, setAujourdhui] = useState(true)
  const [demain, setDemain] = useState(false)
  const [avanthier, setavantHier] = useState(false)
  const [apresdemain, setapresDemain] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false); // État pour gérer le rafraîchissement

  const [noSpoil, setNoSpoil] = useState(true)
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(new Animated.Value(0));
  
const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
    "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
    "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"),
    "Kanitalik": require("../assets/fonts/Kanit/Kanit-ExtraBoldItalic.ttf"),
    "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf"),
        "Carter": require("../assets/fonts/Carter_One/CarterOne-Regular.ttf"),
        "Londrina": require("../assets/fonts/Londrina/LondrinaSolid-Light.ttf"),
        "Bella": require("../assets/fonts/Bella/Belanosima-Regular.ttf"),
        "Bellak": require("../assets/fonts/Bella/Belanosima-Bold.ttf"),

  });

  const teamNames = {
    "Borussia Mönchengladbach" : "B. Monchengladbach",
  "Nottingham Forest" : "Nottingham F.",
  "Paris Saint Germain" : "Paris SG",
  "Stade Brestois 29" : "Stade Brestois",
  "Barcelona" : "FC Barcelone",
  "Ivory Coast" : "Cote d'Ivoire",
  "Central African Republic" : "Centrafrique",
  "Netherlands" : "Pays Bas",
  "Spain" : "Espagne",
  "Germany" : "Allemagne",
  "England" : "Angleterre",
  "Morocco" : "Maroc",
  "Switzerland" : "Suisse",
  "Faroe Islands" : "Iles Feroe",
  "Sweden" : "Suede",
  "Scotland" : "Ecosse",
  "Poland" : "Pologne",
  "Wales" : "Pays de Galles",
  "Belgium" : "Belgique",
  "Algeria" : "Algerie",
  "Italy" : "Italie",
  "Austria" : "Autriche",
  "Moldova" : "Moldavie",
  "Cyprus" : "Chypre",
  "Norway" : "Norvege",
  "Hungary" : "Hongrie"
  }

  const spoil = () => {
    setNoSpoil(!noSpoil)
    setIsActive(!isActive)
  }

  Animated.timing(position, {
    toValue: isActive ? 0 : 25, // Déplace le bouton à gauche ou à droite
    duration: 300, // Durée de l'animation
    useNativeDriver: true, // Utilisation du moteur natif pour la fluidité
  }).start();


  const [selectedDate, setSelectedDate] = useState("AUJOURDHUI");


  const today = new Date().toISOString().slice(0, 10); // Date du jour au format YYYY-MM-DD
  console.log(today)

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  // Soustrait 1 jour à la date d'aujourd'hui
  const yesterdayDate = yesterday.toISOString().slice(0, 10); // Formate la date au format YYYY-MM-DD
  console.log(yesterdayDate);

  const avantHier = new Date();
  avantHier.setDate(avantHier.getDate() - 2);
  // Soustrait 2 jour à la date d'aujourd'hui
  const avantHierDate = avantHier.toISOString().slice(0, 10); // Formate la date au format YYYY-MM-DD

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // Ajoute 1 jour à la date d'aujourd'hui
  const tomorrowDate = tomorrow.toISOString().slice(0, 10); // Formate la date au format YYYY-MM-DD
  console.log(tomorrowDate);

  const apresDemain = new Date();
  apresDemain.setDate(apresDemain.getDate() + 2);
  // Ajoute 2 jour à la date d'aujourd'hui
  const apresDemainDate = apresDemain.toISOString().slice(0, 10); // Formate la date au format YYYY-MM-DD

  const todayMatch = matchs.filter((match) => {
    const matchDate = match.fixture.date.slice(0, 10);
    return matchDate === today;
  });

  const yesterdayMatch = matchs.filter((match) => {
    const matchDate = match.fixture.date.slice(0, 10);
    return matchDate === yesterdayDate;
  })

  const avantHierMatch = matchs.filter((match) => {
    const matchDate = match.fixture.date.slice(0, 10);
    return matchDate === avantHierDate;
  })

  const tomorrowMatch = matchs.filter((match) => {
    const matchDate = match.fixture.date.slice(0, 10);
    return matchDate === tomorrowDate;
  })

  const apresDemainMatch = matchs.filter((match) => {
    const matchDate = match.fixture.date.slice(0, 10);
    return matchDate === apresDemainDate;
  })

  const leagues = [... new Set(todayMatch.map((element) => element.league.name))]
  console.log(leagues)

  const yesterdayLeagues = [... new Set(yesterdayMatch.map((element) => element.league.name))]

  const avantHierLeagues = [... new Set(avantHierMatch.map((element) => element.league.name))]


  const tomorrowLeagues = [... new Set(tomorrowMatch.map((element) => element.league.name))]

  const apresDemainLeagues = [... new Set(apresDemainMatch.map((element) => element.league.name))]


  const handlePrevious = () => {
    if (selectedDate === "AUJOURDHUI") {
      setSelectedDate("HIER");
      setHier(true)
      setAujourdhui(false)
      setDemain(false)
      setavantHier(false)
      setapresDemain(false)
    } else if (selectedDate === "AVANT-HIER") {
      null
    } else if (selectedDate === "DEMAIN") {
      setSelectedDate("AUJOURDHUI");
      setAujourdhui(true)
      setDemain(false)
      setHier(false)
    } else if (selectedDate === "HIER"){
      setSelectedDate("AVANT-HIER");
      setHier(false)
      setAujourdhui(false)
      setDemain(false)
      setavantHier(true)
      setapresDemain(false)
    } else if (selectedDate === "APRES-DEMAIN"){
      setSelectedDate("DEMAIN");
      setHier(false)
      setAujourdhui(false)
      setDemain(true)
      setavantHier(false)
      setapresDemain(false)
    }
  };

  // Fonction de navigation vers la date suivante (demain)
  const handleNext = () => {
    if (selectedDate === "AUJOURDHUI") {
      setSelectedDate("DEMAIN");
      setDemain(true)
      setAujourdhui(false)
      setHier(false)
      setavantHier(false)
      setapresDemain(false)
    } else if (selectedDate === "HIER") {
      setSelectedDate("AUJOURDHUI");
      setAujourdhui(true)
      setHier(false)
      setDemain(false)
      setavantHier(false)
      setapresDemain(false)
    } else if (selectedDate === "APRES-DEMAIN") {

    } else if (selectedDate === "AVANT-HIER"){
      setSelectedDate("HIER");
      setHier(true)
      setAujourdhui(false)
      setDemain(false)
      setavantHier(false)
      setapresDemain(false)
    }
    else if (selectedDate === "DEMAIN"){
      setSelectedDate("APRES-DEMAIN");
      setHier(false)
      setAujourdhui(false)
      setDemain(false)
      setavantHier(false)
      setapresDemain(true)
    }
  };

  console.log(todayMatch)
  console.log(tomorrowMatch)
  const formatDateAndTime = (dateString) => {
    const matchDate = new Date(dateString);
    const formattedDate = `${matchDate.getDate().toString().padStart(2, '0')}/${(matchDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;
    const formattedHour = `${matchDate.getHours().toString().padStart(2, '0')}h${matchDate.getMinutes()
      .toString()
      .padStart(2, '0')}`;
    return { formattedDate, formattedHour };
  };

  const [fadeAnim] = useState(new Animated.Value(1)); // Animation de fade (opacité)

  useEffect(() => {
    const flash = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => flash());
    };

    flash();

    return () => fadeAnim.stopAnimation();
  }, [fadeAnim]);

  return (
    
    todayMatch.length <= 0 ? 
    <View style={[styles.today, isMediumScreen && {paddingInline: 40}]}>
      <LinearGradient colors={["rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={{ width: "96%", alignItems: 'center', borderRadius: 15, backgroundColor: "steelblue", padding: 3 }} >
      {selectedDate === "APRES-DEMAIN" ? 
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TouchableOpacity onPress={handlePrevious}>
          <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.arrow}>
            <Text style={{ color: "white", fontFamily: "Kanitalik", fontSize: 18 }}>{"<"}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <LinearGradient
          colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
          style={styles.titre}
        >
          <Text style={styles.titreToday}>
            {selectedDate}
          </Text>
        </LinearGradient>

        <TouchableOpacity style={{ width: 50 }}>

        </TouchableOpacity>

      </View> :
        selectedDate === "AVANT-HIER" ? 
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity style={{ width: 50 }}>

          </TouchableOpacity>

          <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.titre}>
            <Text style={styles.titreToday}>
              {selectedDate}
            </Text>
          </LinearGradient>

          <TouchableOpacity onPress={handleNext}>
            <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.arrow}>
              <Text style={{ color: "white", fontFamily: "Kanitalik", fontSize: 18 }}>{">"}</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View> :
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity onPress={handlePrevious} >
              <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.arrow}>
                <Text style={{ color: "white", fontFamily: "Kanitalik", fontSize: 18 }}>{"<"}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.titre}>
              <Text style={styles.titreToday}>
                {selectedDate}
              </Text>
            </LinearGradient>

            <TouchableOpacity onPress={handleNext} >
              <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.arrow}>
                <Text style={{ color: "white", fontFamily: "Kanitalik", fontSize: 18 }}>{">"}</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>}

          {avanthier && <ScrollView contentContainerStyle={styles.liveTableau}>
        {avantHierMatch.length <= 0 ? <Text style={styles.nomatch}>Aucun match avant-hier</Text> :
          avantHierLeagues.map((league) => <View style={{ marginBlock: 5 }}>
            <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
            {avantHierMatch.map((element) => element.league.name === league ?

              <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}>
                <View style={styles.match}>
                  {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? 
                  <Image source={ligue1} style={styles.matchCompetition} resizeMode="contain" />
                   :
                   element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                  <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain" />}

                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                  <Image style={styles.matchLogoDom} source={{ uri: element.teams.home.logo }} />

                  {element.goals.home === element.goals.away ? 
                    <View style={styles.matchScore}>
                      <View> <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text> {element.fixture.status.short === "PEN" && element.teams.home.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                      <View> <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>{element.fixture.status.short === "PEN" && element.teams.away.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                    </View>
                   : 
                    <View style={styles.matchScore}>
                      <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                      <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                    </View>
                  }

                  <Image style={styles.matchLogoExt} source={{ uri: element.teams.away.logo }} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                </View>
              </TouchableOpacity>
              : null
            )}
          </View>
          )
        }
      </ScrollView>}

      {hier && <ScrollView contentContainerStyle={styles.liveTableau}>
        {yesterdayMatch.length <= 0 ? <Text style={styles.nomatch}>Aucun match hier</Text> :
          yesterdayLeagues.map((league) => <View style={{ marginBlock: 5 }}>
            <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
            {yesterdayMatch.map((element) => element.league.name === league ?

              <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}>
                <View style={styles.match}>

                  {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? 
                  <Image source={ligue1} style={styles.matchCompetition} resizeMode="contain"/>
                   : 
                   element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                  <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain" />}

                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                  <Image style={styles.matchLogoDom} source={{ uri: element.teams.home.logo }} />

                  {element.goals.home === element.goals.away ? 
                    <View style={styles.matchScore}>
                      <View> <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text> {element.fixture.status.short === "PEN" && element.teams.home.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                      <View> <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>{element.fixture.status.short === "PEN" && element.teams.away.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                    </View>
                   : 
                    <View style={styles.matchScore}>
                      <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                      <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                    </View>
                  }

                  <Image style={styles.matchLogoExt} source={{ uri: element.teams.away.logo }} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                </View>
              </TouchableOpacity>
              : null
            )}
          </View>)
        }
      </ScrollView>}


      {aujourdhui &&
        <Text style={styles.nomatch}>Pas de match aujourdhui</Text>
      }
      {demain && <ScrollView contentContainerStyle={styles.liveTableau}>
        {tomorrowMatch.length <= 0 ? <Text style={styles.nomatch}>Aucun match demain</Text> :

          tomorrowLeagues.map((league) => <View style={{ marginBlock: 2 }} key={"league" + league}>
            <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
            {tomorrowMatch.map((element) => element.league.name === league ?

              <TouchableOpacity key={element.fixture.id} style={styles.link} onPress={() => { navigation.navigate("FicheMatch", { id: element.fixture.id }) }} >
                <View style={styles.match}>
                  {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? 
                  <Image source={ligue1} style={styles.matchCompetition} resizeMode="contain"/> 
                  :
                  element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                  <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain"/>}
                  
                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                  <Image source={{ uri: element.teams.home.logo }} style={styles.matchLogoDom} />
                  <Text style={{ marginInline: 4 }}>-</Text>
                  <Image source={{ uri: element.teams.away.logo }} style={styles.matchLogoExt} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                  <View style={styles.rdv}>
                    <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedDate}</Text>
                    <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedHour}</Text>
                  </View>
                </View>
              </TouchableOpacity> : null
            )}
          </View>)
        }
      </ScrollView>}

      {apresdemain && <ScrollView contentContainerStyle={styles.liveTableau}>
        {apresDemainMatch.length <= 0 ? <Text style={styles.nomatch}>Aucun match apres-demain</Text> :

          apresDemainLeagues.map((league) => <View style={{ marginBlock: 5 }}>
            <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
            {apresDemainMatch.map((element) => element.league.name === league ?

              <TouchableOpacity key={element.fixture.id} style={styles.link} onPress={() => { navigation.navigate("FicheMatch", { id: element.fixture.id }) }}>
                <View style={styles.match}>
                  {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ?
                   <Image source={ligue1} style={styles.matchCompetition} resizeMode="contain"/> 
                   :
                   element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                  <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain"/>}
                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                  <Image source={{ uri: element.teams.home.logo }} style={styles.matchLogoDom} />
                  <Text style={{ marginInline: 4 }}>-</Text>
                  <Image source={{ uri: element.teams.away.logo }} style={styles.matchLogoExt} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                  <View style={styles.rdv}>
                    <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedDate}</Text>
                    <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedHour}</Text>
                  </View>
                </View>
              </TouchableOpacity> : null
            )}
          </View>)
        }
      </ScrollView>}

    </LinearGradient></View> :

      <View style={[styles.today, isMediumScreen && {paddingInline: 40}]} refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        
        <LinearGradient colors={["rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={[{ width: "96%", alignItems: 'center', borderRadius: 15, backgroundColor: "steelblue", elevation: 4, padding:3 }, isMediumScreen && {padding: 20}]} >
          {selectedDate === "APRES-DEMAIN" ? <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity onPress={handlePrevious} >
              <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.arrow}>
                <Text style={{ color: "white", fontFamily: "Kanitalik", fontSize: 18 }}>{"<"}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.titre}>
              <Text style={styles.titreToday}>{selectedDate}</Text>
            </LinearGradient>

            <TouchableOpacity style={{ width: 50 }}>

            </TouchableOpacity>

          </View> :
            selectedDate === "AVANT-HIER" ? <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <TouchableOpacity style={{ width: 50 }}>

              </TouchableOpacity>

              <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.titre} >
                <Text style={styles.titreToday}>{selectedDate}</Text>
              </LinearGradient>

              <TouchableOpacity onPress={handleNext} >
                <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.arrow}>
                  <Text style={{ color: "white", fontFamily: "Kanitalik", fontSize: 18 }}>{">"}</Text>
                </LinearGradient>
              </TouchableOpacity>

            </View> :
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <TouchableOpacity onPress={handlePrevious} >
                  <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.arrow}>
                    <Text style={{ color: "white", fontFamily: "Kanitalik", fontSize: 18 }}>{"<"}</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.titre}>
                  <Text style={styles.titreToday}>{selectedDate}</Text>
                </LinearGradient>

                <TouchableOpacity onPress={handleNext} >
                  <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.arrow}>
                    <Text style={{ color: "white", fontFamily: "Kanitalik", fontSize: 18 }}>{">"}</Text>
                  </LinearGradient>
                </TouchableOpacity>

              </View>}

              {avanthier &&
            <ScrollView contentContainerStyle={styles.liveTableau}>
              {avantHierMatch.length <= 0 ? <Text style={styles.nomatch}>Aucun match avant-hier</Text> :

                avantHierLeagues.map((league) => <View style={{ marginBlock: 5 }}>
                  <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
                  {avantHierMatch.map((element) => element.league.name === league ?

                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}>
                      <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.25)']} style={styles.match}>

                        {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ?
                         <Image source={ligue1} style={styles.matchCompetition} resizeMode="contain" /> 
                         :
                         element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                        <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain" />}

                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                        <Image style={styles.matchLogoDom} source={{ uri: element.teams.home.logo }} />

                        {element.goals.home === element.goals.away ? 
                          <View style={styles.matchScore}>
                            <View> <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text> {element.fixture.status.short === "PEN" && element.teams.home.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                            <View> <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>{element.fixture.status.short === "PEN" && element.teams.away.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                          </View>
                         : 
                          <View style={styles.matchScore}>
                            <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                            <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                          </View>
                        }

                        <Image style={styles.matchLogoExt} source={{ uri: element.teams.away.logo }} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    : null
                  )}
                </View>)
              }

            </ScrollView>}

          {hier &&
            <ScrollView contentContainerStyle={styles.liveTableau}>
              {yesterdayMatch.length <= 0 ? <Text style={styles.nomatch}>Aucun match hier</Text> :

                yesterdayLeagues.map((league) => <View style={{ marginBlock: 5 }}>
                  <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
                  {yesterdayMatch.map((element) => element.league.name === league ?

                    <TouchableOpacity
                      style={styles.link}
                      onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}  // Naviguer vers la fiche du match
                    >
                      <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.25)']} style={styles.match}>

                        {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? 
                        <Image source={ligue1} style={styles.matchCompetition} resizeMode="contain"/>
                         :
                         element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                        <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain" />}

                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                        <Image style={styles.matchLogoDom} source={{ uri: element.teams.home.logo }} />

                        {element.goals.home === element.goals.away ? 
                          <View style={styles.matchScore}>
                            <View> <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text> {element.fixture.status.short === "PEN" && element.teams.home.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                            <View> <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>{element.fixture.status.short === "PEN" && element.teams.away.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                          </View>
                         : 
                          <View style={styles.matchScore}>
                            <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                            <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                          </View>
                        }

                        <Image style={styles.matchLogoExt} source={{ uri: element.teams.away.logo }} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    : null
                  )}
                </View>)
              }

            </ScrollView>}

          {aujourdhui &&
            <ScrollView contentContainerStyle={styles.liveTableau} refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
              />
            }>

              {leagues.map((league) => <View style={{ marginBlock: 2 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBlock: 4 }}>
                  <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
                  {league === "UEFA Champions League" && todayMatch.some((element) =>
                    element.league.name === "UEFA Champions League" &&
                    element.fixture.status.long !== 'Match Finished' &&
                    element.fixture.status.elapsed !== null &&
                    element.league.round.indexOf("ualification") === -1
                  ) ? 
                    <TouchableOpacity onPress={spoil} style={styles.button}>
                      <Animated.View
                        style={[
                          styles.toggle,
                          { transform: [{ translateX: position }] },
                        ]}
                      >
                        <Text style={isActive ? styles.textspoil : styles.textnospoil}>{isActive ? 'Spoil' : 'No Spoil'}</Text>
                      </Animated.View>
                    </TouchableOpacity>
                   : null} </View> 
                        {todayMatch.map((element) => element.league.name === league ?
                    element.fixture.status.long === 'Not Started' ? 
                      <TouchableOpacity key={element.fixture.id} onPress={() => { navigation.navigate("FicheMatch", { id: element.fixture.id }) }}>
                        <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.25)']} style={styles.match}>
                          {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ?
                          <Image source={ligue1} style={styles.matchCompetition} resizeMode="contain"/>
                            :
                            element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                          <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain"/>}
                          
                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                          <Image source={{ uri: element.teams.home.logo }} style={styles.matchLogoDom} />
                          <Text style={{ marginInline: 4 }}>-</Text>
                          <Image source={{ uri: element.teams.away.logo }} style={styles.matchLogoExt} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                          
                          <View style={styles.rdv}>
                            <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedDate}</Text>
                            <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedHour}</Text>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>
                     : element.fixture.status.long != 'Match Finished' && element.fixture.status.elapsed != null ?
                     
                     <TouchableOpacity key={element.fixture.id} onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}>
                        <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.25)']} style={styles.match}>
                          {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? 
                          <Image source={ligue1} style={styles.competitionLogo} resizeMode="contain" /> 
                          :
                          element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                          <Image source={{ uri: element.league.logo }} style={styles.competitionLogo} resizeMode="contain"/>}
                          <View style={styles.teamContainerDom}>
                            <Image source={{ uri: element.teams.home.logo }} style={styles.teamLogo} resizeMode="contain" />
                            <View style={{width: "80%", alignItems: "flex-end"}}><Text style={styles.teamName}>{element.teams.home.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.home.name === "Nottingham Forest" ? "Nottingham F." : element.teams.home.name === "Paris Saint Germain" ? "Paris SG" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name === "Barcelona" ? "FC Barcelone" : element.teams.home.name === "Ivory Coast" ? "Cote d'Ivoire" : element.teams.home.name === "Central African Republic" ? "Centrafrique" : element.teams.home.name === "Netherlands" ? "Pays Bas" : element.teams.home.name === "Spain" ? "Espagne" : element.teams.home.name === "Germany" ? "Allemagne" : element.teams.home.name === "England" ? "Angleterre" : element.teams.home.name}</Text></View>
                          </View>
                          <View style={styles.scoreContainer}>
                            {element.goals.home === element.goals.away ? 
                              <View style={styles.score}>
                                {element.league.name === "UEFA Champions League" && element.league.round.indexOf("ualification") === -1 ? noSpoil ? <Text style={styles.nospoil}>?</Text> : <Text style={styles.scoreText}>{element.goals.home}</Text> : <Text style={styles.scoreText}>{element.goals.home}</Text>}
                                {element.fixture.status.elapsed > 0 && element.fixture.status.long != "Match Finished" ? 
                                                        element.fixture.status.long === "Halftime" ? <Text style={{color: "white", fontFamily: "Kanitalic", fontSize: 10, backgroundColor: "darkred", padding: 2, borderRadius: 4, marginInline: 3}}>MT</Text> :
                                                        <View style={styles.liveSticker}>
                                                                        <Text style={styles.liveText}>{element.fixture.status.elapsed}'</Text>
                                                                        <Animated.Text style={{ color: "darkred", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
                                                                      </View> : null}
                                {element.league.name === "UEFA Champions League" && element.league.round.indexOf("ualification") === -1 ? noSpoil ? <Text style={styles.nospoil}>?</Text> : <Text style={styles.scoreText}>{element.goals.away}</Text> : <Text style={styles.scoreText}>{element.goals.away}</Text>}
                              </View>
                             : 
                              <View style={styles.score}>
                                {element.league.name === "UEFA Champions League" && element.league.round.indexOf("ualification") === -1 ? noSpoil ? <Text style={styles.nospoil}>?</Text> : <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text> : <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>}
                                {element.fixture.status.elapsed > 0 && element.fixture.status.long != "Match Finished" ? 
                                                        element.fixture.status.long === "Halftime" ? <Text style={{color: "white", fontFamily: "Kanitalic", fontSize: 10, backgroundColor: "darkred", padding: 2, borderRadius: 4, marginInline: 3}}>MT</Text> :
                                                        <View style={styles.liveSticker}>
                                                                        <Text style={styles.liveText}>{element.fixture.status.elapsed}'</Text>
                                                                        <Animated.Text style={{ color: "darkred", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
                                                                      </View> : null}

                                {element.league.name === "UEFA Champions League" && element.league.round.indexOf("ualification") === -1 ? noSpoil ? <Text style={styles.nospoil}>?</Text> : <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text> : <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>}

                              </View>
                            }
                          </View>
                          <View style={styles.teamContainer}>
                            <Image source={{ uri: element.teams.away.logo }} style={styles.teamLogo} resizeMode="contain"/>
                           <View style={{width: "80%", alignItems: "flex-start"}}> <Text style={styles.teamName}>{element.teams.away.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.away.name === "Nottingham Forest" ? "Nottingham F." : element.teams.away.name === "Paris Saint Germain" ? "Paris SG" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name === "Barcelona" ? "FC Barcelone" : element.teams.away.name === "Ivory Coast" ? "Cote d'Ivoire" : element.teams.away.name === "Central African Republic" ? "Centrafrique" : element.teams.away.name === "Netherlands" ? "Pays Bas" : element.teams.away.name === "Spain" ? "Espagne" : element.teams.away.name === "Germany" ? "Allemagne" : element.teams.away.name === "England" ? "Angleterre" : element.teams.away.name}</Text></View>
                          </View>
                        </LinearGradient>
                      </TouchableOpacity> 
                      : element.fixture.status.long === 'Match Finished' ?
                        <TouchableOpacity key={element.fixture.id} onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}>
                          <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.25)']} style={styles.match}>

                            {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? 
                            <Image source={ligue1} style={styles.matchCompetition} resizeMode="contain"/> 
                            :
                            element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                            <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain"/>}

                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                            <Image style={styles.matchLogoDom} source={{ uri: element.teams.home.logo }} />

                            {element.goals.home === element.goals.away ? 
                              <View style={styles.matchScore}>
                                <View> <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text> {element.fixture.status.short === "PEN" && element.teams.home.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                                <View> <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>{element.fixture.status.short === "PEN" && element.teams.away.winner === true ? <View style={{ backgroundColor: "green", textAlign: "center", width: 12, height: 14, justifyContent: "center", alignItems: "center", borderRadius: 3, position: "relative", bottom: 10, left: 12 }}><Text style={{ fontFamily: "Kanito", fontSize: 10, color: "white" }}>P</Text></View> : null}</View>
                              </View>
                             : 
                              <View style={styles.matchScore}>
                                <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                                <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                              </View>
                            }

                            <Image style={styles.matchLogoExt} source={{ uri: element.teams.away.logo }} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                        : null
                    : null
                  )}
              </View>)
              }
            </ScrollView>
          }

          {demain && <ScrollView contentContainerStyle={styles.liveTableau}>
            {tomorrowMatch.length <= 0 ? <Text style={styles.nomatch}>Aucun match demain</Text> :
              tomorrowLeagues.map((league) => <View style={{ marginBlock: 2 }}>
                <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
                {tomorrowMatch.map((element) => element.league.name === league ?

                  <TouchableOpacity
                    key={element.fixture.id}
                    onPress={() => { navigation.navigate("FicheMatch", { id: element.fixture.id }) }}
                  >
                    <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.3)']} style={styles.match}>
                      {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
                        source={ligue1}
                        style={styles.matchCompetition}
                        resizeMode="contain"
                      /> :
                      element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                        <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain" />}
                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                      <Image source={{ uri: element.teams.home.logo }} style={styles.matchLogoDom} />
                      <Text style={{ marginInline: 4 }}>-</Text>
                      <Image source={{ uri: element.teams.away.logo }} style={styles.matchLogoExt} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                      <View style={styles.rdv}>
                        <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedDate}</Text>
                        <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedHour}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity> : null
                )}
              </View>)
            }
          </ScrollView>}

          {apresdemain && <ScrollView contentContainerStyle={styles.liveTableau}>
            {apresDemainMatch.length <= 0 ? <Text style={styles.nomatch}>Aucun match apres-demain</Text> :
              apresDemainLeagues.map((league) => <View style={{ marginBlock: 5 }}>
                <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
                {apresDemainMatch.map((element) => element.league.name === league ?

                  <TouchableOpacity
                    key={element.fixture.id}
                    onPress={() => { navigation.navigate("FicheMatch", { id: element.fixture.id }) }}
                  >
                    <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.25)']} style={styles.match}>
                      {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? 
                      <Image source={ligue1} style={styles.matchCompetition} resizeMode="contain" /> :
                      element.league.id === 15 ? 
                  <Image source={fifaClubWc} style={styles.matchCompetition} resizeMode="contain"/>
                   : element.league.id === 32 ? 
                  <Image source={cdm2026} style={styles.matchCompetition} resizeMode="contain"/>
                   :
                        <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} resizeMode="contain" />}
                  <Text style={styles.matchEquipeDom}>{teamNames[element.teams.home.name] || element.teams.home.name}</Text>
                      <Image source={{ uri: element.teams.home.logo }} style={styles.matchLogoDom} />
                      <Text style={{ marginInline: 4 }}>-</Text>
                      <Image source={{ uri: element.teams.away.logo }} style={styles.matchLogoExt} />
                  <Text style={styles.matchEquipeExt}>{teamNames[element.teams.away.name] || element.teams.away.name}</Text>
                      <View style={styles.rdv}>
                        <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedDate}</Text>
                        <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedHour}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity> : null
                )}
              </View>)
            }
          </ScrollView>}


        </LinearGradient>

      </View> 

  );
};

const styles = StyleSheet.create({
  today: {
    flex: 1,
    alignItems: 'center',
    width: "100%",
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 5 }, // shadow offset
    shadowOpacity: 0.8, // shadow opacity
    shadowRadius: 3,
    elevation: 4

  },
  titre: {
    width: 150,
    borderRadius: 10,
    marginBlock: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  titreToday: {
    color: 'white',
    fontFamily: "Kanitalik",
  },
  nomatch: {
    color: 'white',
    width: 200,
    textAlign: 'center',
    fontFamily: 'Permanent',
    borderRadius: 5,
    height: 40,
    marginBlock: 10,
  },
  liveTableau: {
    width: '100%',
    justifyContent: "center"
  },

  matchCompetition: {
    height: 35,
    width: "7%",
    objectFit: 'contain',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
  },
  matchEquipeDom: {
    fontSize: 15,
    fontFamily: "Bella",
    width: "27%",
    textAlign: "center"

  },
  matchLogoDom: {
    height: 35,
    width: "9%",
    objectFit: 'contain',
  },

  rdv: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    width: "10%",
    backgroundColor: "black",
    borderRadius: 5,



  },
  matchLogoExt: {
    height: 35,
    width: "9%",
    objectFit: 'contain',
  },
  matchEquipeExt: {
    fontSize: 15,
    fontFamily: "Bella",
    width: "27%",
    textAlign: "center"

  },
  nul: {
    backgroundColor: 'gray',
    color: "white",
    height: 30,
    width: 25,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanito",
    paddingTop: 4
  },
  winner: {
    backgroundColor: '#32b642',
    color: "white",
    height: 30,
    width: 25,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanito",
    paddingTop: 4

  },
  looser: {
    backgroundColor: 'red',
    color: "white",
    height: 30,
    width: 25,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanito",
    paddingTop: 4

  },
  matchScore: {
    flexDirection: "row",
    width: "15%",
    justifyContent: "space-around"
  },
  match: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    width: "100%",
    backgroundColor: "aliceblue",
    borderRadius: 10,
    paddingBlock: 9,
    marginVertical: 5,
    paddingInline: 2
  },

  competitionLogo: {
    height: 25,
    width: 25,
    objectFit: 'contain',
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "35%",
    gap: 2,
    marginInline: 1

  },
  teamContainerDom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "33%",
    flexDirection: "row-reverse",
    gap: 2,
    marginInline: 1,


  },
  teamLogo: {
    height: 38,
    width: 29,
    objectFit: 'contain',
    alignItems: "center",
    marginInline: 5
  },
  teamName: {
    fontSize: 14.5,
    fontFamily: "Bella",
    textAlign: "center",
  },
  scoreContainer: {
    alignItems: 'center',
    width: "22%",
    marginInline: 1
  },
  liveSticker: {
    alignItems: "center",
    marginInline: 5

  },
  liveText: {
    color: "white",
    fontFamily: "Kanitalic",
    fontSize: 12,
    backgroundColor: "darkred",
    paddingInline: 5,
    borderRadius: 5


  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  scoreText: {
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: 5,
    height: 30,
    width: 25,
    fontFamily: "Kanito",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 4
  },
  nospoil: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 5,
    height: 30,
    width: 25,
    fontFamily: "Kanito",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 4,

  },
  arrow: {
    color: "white",
    fontFamily: "Kanitt",
    height: 35,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  toggle: {
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute"
  },
  button: {
    backgroundColor: 'lightgrey',
    width: 60,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 8
  },
  textspoil: {
    fontFamily: "Permanent",
    fontSize: 10,
    color: "green",

  },
  textnospoil: {
    fontFamily: "Permanent",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 10,
    color: "red"
  }
});

export default Aujourdhui;