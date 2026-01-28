import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, ScrollView, RefreshControl } from 'react-native';
import ligue1 from "../assets/logoligue1.webp";
import { LinearGradient } from 'expo-linear-gradient';
import { SvgUri } from 'react-native-svg';
import { teamName } from '../datas/teamNames';

const apiKey = process.env.API_KEY;

function LivePage({ navigation }) {
  const [lives, setLives] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false); // État pour gérer le rafraîchissement

  const fetchLives = async () => {
    try {
      const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      });
      const json = await response.json();
      setLives(json.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchLives();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true); // Déclenche le rafraîchissement
    fetchLives().then(() => setIsRefreshing(false)); // Rafraîchit les données et arrête le rafraîchissement
  };

  const leagues = [... new Set(lives.map((element) => element.league.country))]
  console.log(leagues)
  console.log(lives)
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

  const countryTranslations = {
    Denmark: "Danemark",
    Belgium: "Belgique",
    Hungary: "Hongrie",
    England: "Angleterre",
    Spain: "Espagne",
    Germany: "Allemagne",
    Poland: "Pologne",
    Cyprus: "Chypre",
    Sweden: "Suède",
    "Czech-Republic": "République Tchèque",
    Switzerland: "Suisse",
    Serbia: "Serbie",
    Algeria: "Algérie",
    Tunisia: "Tunisie",
    Turkey: "Turquie",
    Singapore: "Singapour",
    Latvia: "Lettonie",
    Romania: "Roumanie",
    Belarus: "Biélorussie",
    Russia: "Russie",
    Bulgaria: "Bulgarie",
    Cameroon: "Cameroun",
    Greece: "Grèce",
    India: "Inde",
    Cambodia: "Cambodge",
    Austria: "Autriche",
    Netherlands: "Pays-Bas",
    "Ivory-Coast": "Côte d'Ivoire",
    Wales: "Pays de Galles",
    Scotland: "Écosse",
    Italy: "Italie",
    Mexico: "Mexique",
    Lebanon: "Liban",
    Norway: "Norvège",
    "Morocco": "Maroc",
    Chile: "Chili",
    Colombia: "Colombie",

  };

  return (
    <ScrollView
      contentContainerStyle={{ width: "98%", paddingInlineStart: "2%", marginBlock: 5, justifyContent: "center" }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.shadowWrapper}>
        <LinearGradient
          colors={['rgba(11, 38, 126, 0.9)', 'rgba(0, 0, 0, 0.85)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.titlecontainer}
        >
          <Text style={styles.title}>LIVE</Text>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        {lives.length === 0 ?
          <Text style={styles.noMatch}>Aucun match pour le moment</Text>
          :
          leagues.map((league) =>
            <View style={{ marginBottom: 10 }} key={"ligue" + league}>
              <Text style={{ fontFamily: "Kanitus", color: "white", marginLeft: 10 }}>{countryTranslations[league] || league}</Text>
              {lives.map((live) => live.league.country === league ?
                <TouchableOpacity
                  style={styles.matchContainer}
                  onPress={() => navigation.navigate('FicheMatch', { id: live.fixture.id })} key={live.fixture.id}
                >
                  <View style={styles.match}>
                    {live.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
                      source={ligue1}
                      style={styles.competitionLogo}
                      resizeMode="contain"
                    />
                      :
                      <Image
                        source={{ uri: live.league.logo }}
                        style={styles.competitionLogo}
                        resizeMode="contain"
                      />}
                    <View style={styles.teamContainerDom}>
                      <Image
                        source={{ uri: live.teams.home.logo }}
                        style={styles.teamLogo}
                        resizeMode="contain"
                      />
                      <Text style={styles.teamName}>{teamName[live.teams.home.name] || live.teams.home.name}</Text>
                    </View>
                    <View style={styles.scoreContainer}>
                      
                        <View style={styles.score}>
                          <Text
                            style={
                              live.goals.home > live.goals.away ?  styles.winner : live.goals.home < live.goals.away ? styles.loser : styles.scoreText
                            }
                          >
                            {live.goals.home}
                          </Text>
                          <View style={styles.liveSticker}>
                            <Text style={styles.liveText}>{live.fixture.status.elapsed}'</Text>
                            <Animated.Text style={{ color: "darkred", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
                          </View>

                          <Text style={live.goals.home < live.goals.away ?  styles.winner : live.goals.home > live.goals.away ? styles.loser : styles.scoreText}>{live.goals.away}</Text>
                        </View>
                      
                    </View>
                    <View style={styles.teamContainer}>
                      <Image
                        source={{ uri: live.teams.away.logo }}
                        style={styles.teamLogo}
                        resizeMode="contain"
                      />
                      <Text style={styles.teamName}>{teamName[live.teams.away.name] || live.teams.away.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                : null
              )}
            </View>

          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBlock: 15,
    paddingInline: 4,
    borderRadius: 15,
    backgroundColor: "rgb(99, 164, 221)",
    width: '100%',
    marginTop: 10,
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 5 }, // shadow offset
    shadowOpacity: 0.8, // shadow opacity
    shadowRadius: 3,
    elevation: 6,
    marginBottom: 130
  },
  title: {
    color: 'white',
    fontFamily: "Bangers",
    fontSize: 18,
    letterSpacing: 0.5,
    padding: 6
  },
  shadowWrapper: {
    marginHorizontal: '35%',
    borderRadius: 18,

    // Ombre iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 4,
    shadowRadius: 4,

    // Ombre Android
    elevation: 6,
  },
  titlecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    overflow: "hidden", // OK ici
  },
  match: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBlock: 5,
    width: "100%",
  },
  noMatch: {
    marginBlock: 10,
    alignSelf: 'center',
    backgroundColor: 'red',
    color: 'white',
    width: '80%',
    textAlign: 'center',
    fontFamily: 'Permanent Marker',
    borderRadius: 5,
    height: 35,
    paddingTop: 6,
  },
  live__tableau: {
    borderRadius: 10
  },
  matchContainer: {
    flexDirection: "row",
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#F4F0F0',
    paddingBlock: 6,
    paddingInline: 1,
    marginBlock: 4,
    borderRadius: 10
  },
  competitionLogo: {
    height: 30,
    width: "9%",
    objectFit: 'contain',
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "35%",
    gap: 2,
    marginInline: 1,
    justifyContent: "start"
  },
  teamContainerDom: {
    alignItems: 'center',
    width: "34%",
    flexDirection: "row-reverse",
    gap: 2,
    marginInline: 1,
    justifyContent: "center"
  },
  teamLogo: {
    height: 30,
    width: "22%",
    objectFit: 'contain',
    alignItems: "center",
    marginInline: 3
  },
  teamName: {
    fontSize: 12,
    fontFamily: "Bella",
    width: "76%",
    textAlign: "center"
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
    paddingInline: 4,
    borderRadius: 5
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    flex: 1,
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: 5,
    height: 30,
    width: 20,
    fontFamily: "Kanito",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 4
  },
  winner: {
    flex: 1,
    backgroundColor: '#32b642',
    color: 'white',
    borderRadius: 5,
    height: 30,
    fontFamily: "Kanito",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 4
  },
  loser: {
    flex: 1,
    backgroundColor: '#ff2e2e',
    color: 'white',
    borderRadius: 5,
    height: 30,
    fontFamily: "Kanito",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 4
  },
});

export default LivePage;