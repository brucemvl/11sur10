import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { SvgUri } from 'react-native-svg';
import { useFonts } from 'expo-font';

import ligue1 from "../assets/logoligue1.webp";
import fifaClubWc from "../assets/fifaclubwc2.png";
import cdm2026 from "../assets/cdm2026.png";
import { teamName } from '../datas/teamNames';



export default function Aujourdhui({ matchs, onRefresh }) {

  const daysScrollRef = React.useRef(null);

  const scrollToDay = (index) => {
    const ITEM_WIDTH = 72; // largeur approximative d’un jour
    daysScrollRef.current?.scrollTo({
      x: index * ITEM_WIDTH - ITEM_WIDTH,
      animated: true,
    });
  };

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

  const DAYS = [
    { label: formatDateAndTime(new Date()).formattedDate, offset: -3 },
    { labelDate: formatDateAndTime(new Date()).formattedDate, label: 'AVANT-HIER', offset: -2 },
    { labelDate: formatDateAndTime(new Date()).formattedDate, label: 'HIER', offset: -1 },
    { labelDate: formatDateAndTime(new Date()).formattedDate, label: "AUJOURD'HUI", offset: 0 },
    { labelDate: formatDateAndTime(new Date()).formattedDate, label: 'DEMAIN', offset: 1 },
    { labelDate: formatDateAndTime(new Date()).formattedDate, label: 'APRÈS-DEMAIN', offset: 2 },
    { label: formatDateAndTime(new Date()).formattedDate, offset: 3 },
  ];

  const [dayIndex, setDayIndex] = useState(3); // AUJOURD'HUI


  /* -------------------- DATE COURANTE -------------------- */
  const currentDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + DAYS[dayIndex].offset);
    return d.toISOString().slice(0, 10);
  }, [dayIndex]);

  /* -------------------- MATCHS DU JOUR -------------------- */
  const matchesOfDay = useMemo(() => {
    return matchs.filter(
      m => m.fixture.date.slice(0, 10) === currentDate
    );
  }, [matchs, currentDate]);

  /* -------------------- LIGUES -------------------- */
  const leagues = useMemo(() => {
    return [...new Set(matchesOfDay.map(m => m.league.id))];
  }, [matchesOfDay]);




  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const isSmallScreen = width <= 767;
  const isMediumScreen = width > 767 && width <= 1024;

  const [refreshing, setRefreshing] = useState(false);
  const [noSpoil, setNoSpoil] = useState(true);
  const [toggleAnim] = useState(new Animated.Value(0));

  const flags = {
    "Ligue 1" : "https://media.api-sports.io/flags/fr.svg",
    "Coupe de France" : "https://media.api-sports.io/flags/fr.svg",
    "Premier League" : "https://media.api-sports.io/flags/gb-eng.svg",
    "League Cup" : "https://media.api-sports.io/flags/gb-eng.svg",
    "FA Cup" : "https://media.api-sports.io/flags/gb-eng.svg",
    "La Liga" : "https://media.api-sports.io/flags/es.svg",
    "Copa del Rey" : "https://media.api-sports.io/flags/es.svg",
    "Bundesliga" : "https://media.api-sports.io/flags/de.svg",
    "DFB Pokal" : "https://media.api-sports.io/flags/de.svg",
    "Serie A" : "https://media.api-sports.io/flags/it.svg",
    "Pro League" : "https://media.api-sports.io/flags/sa.svg",
    "Major League Soccer" : "https://media.api-sports.io/flags/us.svg",
  }

  const [fontsLoaded] = useFonts({
    Kanitt: require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
    Kanito: require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
    Kanitus: require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    Bellak: require("../assets/fonts/Bella/Belanosima-Bold.ttf"),
  });

  const [activeAnim] = useState(new Animated.Value(0));




  /* -------------------- ANIMATION SPOIL -------------------- */
  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: noSpoil ? 0 : 25, // Déplace le bouton à gauche ou à droite
      duration: 300, // Durée de l'animation
      useNativeDriver: true, // Utilisation du moteur natif pour la fluidité
    }).start();
  })

  const toggleSpoil = () => {
    Haptics.selectionAsync();
    setNoSpoil(prev => !prev);
  };

  const changeDay = (direction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setDayIndex(prev => {
      const next = Math.min(6, Math.max(0, prev + direction));
      scrollToDay(next);
      return next;
    });
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 1.3,
      useNativeDriver: true,
      friction: 4,
      tension: 100,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Retour à la taille normale
      useNativeDriver: true,
      friction: 4,
      tension: 100,
    }).start();
  };

  const onPressIn2 = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim2, {
      toValue: 1.3,
      useNativeDriver: true,
      friction: 4,
      tension: 100,
    }).start();
  };

  const onPressOut2 = () => {
    Animated.spring(scaleAnim2, {
      toValue: 1, // Retour à la taille normale
      useNativeDriver: true,
      friction: 4,
      tension: 100,
    }).start();
  };

  useEffect(() => {
    // Centre AUJOURD'HUI au premier rendu
    scrollToDay(dayIndex);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToDay(dayIndex);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    Animated.timing(activeAnim, {
      toValue: dayIndex,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [dayIndex]);

  if (!fontsLoaded) return null;

  const showNoSpoil = useMemo(() => {
    return matchs.some(m =>
      m.league.id === 2 &&
      ['1H', '2H', 'HT', 'ET'].includes(m.fixture.status.short)
    );
  }, [matchs]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);

  const getDayLabel = (offset, label) => {
    if (offset === -3) {
      const date = new Date();
      date.setDate(date.getDate() + offset);
      return formatDateAndTime(date).formattedDate;
    }
    if (offset === 3) {
      const date = new Date();
      date.setDate(date.getDate() + offset);
      return formatDateAndTime(date).formattedDate;
    }
    return label;
  };

  const getDateLabel = (offset, labelDate) => {
    if (offset === -3) {

      return null;
    }
    if (offset === 3) {

      return null;
    }
    else {
      const date = new Date();
      date.setDate(date.getDate() + offset);
      return formatDateAndTime(date).formattedDate;
    }
    return labelDate;
  };

  /* ====================== RENDER ====================== */
  return (
    <View style={[styles.container, isMediumScreen && {width: "90%"}]}>
      <LinearGradient colors={["rgba(255, 255, 255, 0.1)", 'rgba(0, 0, 0, 0.35)']} style={{ alignItems: 'center', borderRadius: 15, backgroundColor: "steelblue", paddingInline: isMediumScreen ? 20 : 2, paddingBlock: isMediumScreen? 10 : 5, width: "100%" }} >

        {/* ----------- HEADER DATE ----------- */}
        <View style={styles.dateHeader}>
          <TouchableWithoutFeedback disabled={dayIndex === 0} onPress={() => changeDay(-1)} onPressIn={onPressIn} onPressOut={onPressOut} accessible accessibilityRole='button' accessibilityLabel='précédent' accessibilityHint='naviguer vers le jour précédent' >
            <Animated.View style={{ opacity: dayIndex === 0 ? 0.3 : 1, backgroundColor: "rgba(11, 19, 81, 1)", borderRadius: 10, width: 32, height: 32, alignItems: "center", justifyContent: "center", transform: [{ scale: scaleAnim }] }}>
              <Text style={styles.arrow}>◀</Text>
            </Animated.View>
          </TouchableWithoutFeedback>

          <ScrollView
            horizontal
            ref={daysScrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysScroll}
            style={{ borderRadius: 20, backgroundColor: "rgba(235, 235, 235, 1)" }}
          >
            {DAYS.map((day, index) => {
              const scale = activeAnim.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [1, 1.15, 1],
                extrapolate: 'clamp',
              });

              const opacity = activeAnim.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.6, 1, 0.6],
                extrapolate: 'clamp',
              });

              const backgroundColor = activeAnim.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [
                  'rgba(140, 140, 140, 0.4)',
                  'rgba(11, 19, 81, 1)',
                  'rgba(140, 140, 140, 0.4)',
                ],
                extrapolate: 'clamp',
              });
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setDayIndex(index);
                    scrollToDay(index);
                  }}

                >
                  <Animated.View style={[styles.dayItem, { backgroundColor }]}>
                    {getDateLabel(day.offset, day.labelDate) && (
                      <Animated.Text style={[
                        styles.dayText,
                        { transform: [{ scale }], opacity, fontSize: 9, fontFamily: "Kanitalik" },

                      ]}>
                        {getDateLabel(day.offset, day.labelDate)}
                      </Animated.Text>
                    )}

                    <Animated.Text style={[
                      styles.dayText,
                      { transform: [{ scale }], opacity }
                    ]}>
                      {getDayLabel(day.offset, day.label)}
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableWithoutFeedback disabled={dayIndex === 6} onPress={() => changeDay(1)} onPressIn={onPressIn2} onPressOut={onPressOut2} accessible accessibilityRole='button' accessibilityLabel='suivant' accessibilityHint='naviguer vers le jour suivant' >
            <Animated.View style={{opacity: dayIndex === 6 ? 0.3 : 1, backgroundColor: "rgba(11, 19, 81, 1)", borderRadius: 10, width: 32, height: 32, alignItems: "center", justifyContent: "center", transform: [{ scale: scaleAnim2 }] }}>
              <Text style={styles.arrow}>▶</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>

        {/* ----------- TOGGLE SPOIL ----------- */}
        {showNoSpoil && (
          <TouchableOpacity onPress={toggleSpoil} style={styles.spoilContainer}>
            <Animated.View
              style={[
                styles.toggleCircle,
                { transform: [{ translateX: toggleAnim }] },
              ]}
            >
              <Text style={[styles.spoilText, noSpoil && { color: "red" }]}>{noSpoil ? "No spoil" : "Spoil"}</Text>
            </Animated.View>
          </TouchableOpacity>
        )}

        {/* ----------- LISTE MATCHS ----------- */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await onRefresh();
                setRefreshing(false);
              }}
            />
          }
        >
          {leagues.map(leagueId => {
            const leagueMatches = matchesOfDay.filter(
              m => m.league.id === leagueId
            );
            const league = leagueMatches[0].league;



            return (
              <View key={leagueId} style={styles.leagueBlock}>
                <View style={styles.leagueHeader}>
                  <View style={{ borderRadius: 8, overflow: "hidden" }}>
                    <SvgUri uri={flags[league.name]} width={22} height={20} />
                  </View>
                  <Text style={styles.leagueName}>{league.name}</Text>
                </View>

                {leagueMatches.map(match => {
                  const home = teamName[match.teams.home.name] || match.teams.home.name;
                  const away = teamName[match.teams.away.name] || match.teams.away.name;
                  const hideScore = noSpoil && match.league.id === 2 &&
                    ['1H', '2H', 'HT', 'ET'].includes(match.fixture.status.short);
                  const isLive = match.fixture.status.elapsed > 0 && match.fixture.status.long != "Match Finished"
                  const finished = match.fixture.status.long === "Match Finished"

                  return (
                    <TouchableOpacity
                      key={match.fixture.id}
                      style={styles.matchCard}
                      onPress={() =>
                        navigation.navigate('FicheMatch', { matchId: match.fixture.id })
                      }
                      accessible accessibilityHint={`naviguer vers la fiche du match: ${match.teams.home.name} ${match.teams.away.name}`}
                    >
                      <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.25)']} style={[styles.match, isMediumScreen && {height: 60}]}>

                        <Image source={{ uri: league.logo }} style={[styles.leagueLogo, isMediumScreen && {height: 30}, match.league.id === 61 && {width: 40}]} />

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: finished ? "38%" : "35%", gap: isMediumScreen ? 16 : 3 }}>
                          <Text style={[styles.team, {textAlign: "right"}, isMediumScreen && {fontSize: 18}]}>{home}</Text>
                          <Image source={{ uri: match.teams.home.logo }} style={[styles.teamLogo, isMediumScreen && {width: 36, height: 36}]} />
                        </View>

                        <LinearGradient
                          colors={['rgba(0,0,0,0.85)', 'rgba(110,85,20,1)', 'rgba(0,0,0,0.85)']}
                          style={[styles.scoreBox, isLive && { width: "18%" }, finished && { width: "15%" }, isMediumScreen && {height: 42, marginInline: 4}]}
                        >
                          <View style={[match.goals.home > match.goals.away ? isLive ? styles.liveView : styles.winner : match.goals.home < match.goals.away ? isLive ? styles.liveView : styles.looser : finished ? styles.neutre : {alignItems: "center", justifyContent: "center"}, isMediumScreen && {height: 32}]}>
                            <Text style={styles.score}>
                              {
                                match.fixture.status.short === "NS" ? " - " :
                                  hideScore ? '?' :
                                    match.goals.home}
                            </Text>
                          </View>
                          {isLive ?
                            match.fixture.status.long === "Halftime" ? <Text style={{ color: "white", fontFamily: "Kanitalic", fontSize: 10, backgroundColor: "darkred", padding: 2, borderRadius: 4, marginInline: 3 }}>MT</Text> :
                              <View style={[styles.liveSticker, match.fixture.status.extra > 0 && {marginInline: 1} ]}>
                                <Text style={[styles.liveText, match.fixture.status.extra > 0 && {fontSize: 9}]}>{match.fixture.status.elapsed}'{match.fixture.status.extra > 0 ? `+${match.fixture.status.extra}` : null}</Text>
                                <Animated.Text style={{ color: "white", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim, marginTop: -3 }}>live</Animated.Text>
                              </View> : <Text style={styles.score}> : </Text>}

                          <View style={[match.goals.home < match.goals.away ? isLive ? styles.liveView : styles.winner : match.goals.home > match.goals.away ? isLive ? styles.liveView : styles.looser : finished ? styles.neutre : {alignItems: "center", justifyContent: "center"}, isMediumScreen && {height: 32}]}>
                            <Text style={styles.score}>
                              {
                                match.fixture.status.short === "NS" ? " - " :
                                  hideScore ? '?' :
                                    match.goals.away}
                            </Text>
                          </View>
                        </LinearGradient>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: finished ? "38%" : "33%", gap: isMediumScreen ? 16 : 3 }}>
                          <Image source={{ uri: match.teams.away.logo }} style={[styles.teamLogo, isMediumScreen && {width: 36, height: 36}]} />
                          <Text style={[styles.team, {textAlign: "left"}, isMediumScreen && {fontSize: 18}]}>{away}</Text>
                        </View>

                        {isLive || finished ? null :
                          <View style={[styles.rdv, isMediumScreen && {height: 38, borderRadius: 10}]}>
                            <Text style={{ fontFamily: "Kanitalic", fontSize: isMediumScreen? 12 : 10.5, color: "white" }}>{formatDateAndTime(match.fixture.date).formattedDate}</Text>
                            <Text style={{ fontFamily: "Kanitalic", fontSize: isMediumScreen? 12 : 10.5, color: "white" }}>{formatDateAndTime(match.fixture.date).formattedHour}</Text>
                          </View>
                        }
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

/* ====================== STYLES ====================== */
const styles = StyleSheet.create({
  container: { flex: 1, width: "97%", alignItems: "center" },

  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    width: 350,
    gap: 10
  },
  arrow: { color: 'rgb(255, 255, 255)', fontSize: 20 },


  spoilContainer: {
    backgroundColor: '#212121ff',
    width: 60,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 8, alignSelf: "flex-end"
  },
  spoilText: {
    fontFamily: "Bangers",
    fontSize: 12,
    color: "green",
    letterSpacing: 0.5,
    textAlign: "center"
  },

  toggle: {
    backgroundColor: 'white',
    width: 38,
    height: 38,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",

  },
  toggleCircle: {
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
  },

  leagueBlock: {
    marginVertical: 10
  },
  leagueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 5,
  },
  leagueLogo: {
    width: "7%",
    height: 25,
    resizeMode: "contain",
  },

  leagueName: {
    color: '#fff',
    fontFamily: 'Kanitus'
  },

  matchCard: {

    marginBlock: 4,
  },
  match: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    width: "100%",
    backgroundColor: "aliceblue",
    borderRadius: 10,
    paddingBlock: 6,
    paddingInline: 2,
    height: 48
  },
  team: {
    color: '#000000ff',
    fontFamily: "Bella",
    fontSize: 13.5,

  },
  teamLogo: {
    height: 29,
    width: 29,
    resizeMode: "contain"
  },
  scoreBox: {
    paddingVertical: 3,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginInline: 3,
    flexDirection: "row",
    width: "13%",
    height: 36
  },
  score: {
    color: '#fff',
    fontFamily: 'Kanitt',
    fontSize: 16, 
  },
  rdv: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "10%",
    backgroundColor: "black",
    borderRadius: 5,
  },
  winner: {
    backgroundColor: "green",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "32%",
  },
  looser: {
    backgroundColor: "red",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "32%"

  },
  neutre: {
    backgroundColor: "grey",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "32%"
  },
  liveView: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%"
  },
  liveText: {
    color: "darkred",
    fontFamily: "Kanitalic",
    paddingInline: 2,
    borderRadius: 4,
    fontSize: 11,
    backgroundColor: "white"
  },
  liveSticker: {
    justifyContent: "space-between",
    marginInline: 4,
    alignItems: "center"
  },
  daysScroll: {
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 70,
    justifyContent: "center",
  },

  dayItem: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 2,
    height: "90%",
    justifyContent: "center",
    width: 68,
    justifyContent: "space-around"
  },

  dayItemActive: {
  },
  dayText: {
    fontSize: 7.5,
    fontFamily: "Kanitalik",
    textAlign: "center",
    color: "white",

  },
  dayTextActive: {
  },
});