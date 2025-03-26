import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Animated, ScrollView, RefreshControl } from 'react-native';
import ligue1 from "../assets/logoligue1.webp";
import { LinearGradient } from 'expo-linear-gradient';
import { SvgUri } from 'react-native-svg';

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

  

  return (
    <ScrollView
      contentContainerStyle={{ width: "98%", paddingInlineStart: "2%", marginBlock: 5,  justifyContent: "center" }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <LinearGradient colors={['rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.titlecontainer}>
          <Text style={styles.title}>LIVE</Text>
        </LinearGradient>
        {lives.length === 0 ? (
          <Text style={styles.noMatch}>Aucun match pour le moment</Text>
        ) :
        
        (
          leagues.map((league) => <View style={{marginBottom: 10}}>
            <Text style={{fontFamily: "Kanitus", color: "white"}}>{league === "Denmark" ? "Danemark" : league === "Belgium" ? "Belgique" : league === "Hungary" ? "Hongrie" : league === "England" ? "Angleterre" : league === "Spain" ? "Espagne" : league === "Germany" ? "Allemagne" : league === "Poland" ? "Pologne" : league === "Cyprus" ? "Chypre" : league === "Sweden" ? "Suede" : league === "Czech-Republic" ? "Republique Tcheque" : league === "Switzerland" ? "Suisse" : league === "Serbia" ? "Serbie" : league === "Algeria" ? "Algerie" : league === "Tunisia" ? "Tunisie" : league === "Turkey" ? "Turquie" : league === "Singapore" ? "Singapour" : league === "Latvia" ? "Letonie" : league === "Romania" ? "Roumanie" : league === "Belarus" ? "Bielorussie" : league === "Russia" ? "Russie" : league === "Bulgaria" ? "Bulgarie" : league === "Cameroon" ? "Cameroun" : league === "Greece" ? "Grece" : league === "India" ? "Inde" : league === "Cambodia" ? "Cambodge" : league === "Austria" ? "Autriche" : league === "Netherlands" ? "Pays Bas" : league === "Ivory-Coast" ? "Cote d'Ivoire" : league === "Wales" ? "Pays de Galles" : league === "Scotland" ? "Ecosse" : league === "Italy" ? "Italie" : league === "Mexico" ? "Mexique" : league === "Lebanon" ? "Liban" : league === "Norway" ? "Norvege" : league === "Morocco" ? "Maroc" : league === "Chile" ? "Chilie" : league}</Text>
          {lives.map((live) => live.league.country === league ? 
          <TouchableOpacity
      style={styles.matchContainer}
      onPress={() => navigation.navigate('FicheMatch', { id: live.fixture.id })}
    >
      <View style={styles.match}>
        {live.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
          source={ligue1}
          style={styles.competitionLogo}
          resizeMode="contain"
        /> :
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
          <Text style={styles.teamName}>{live.teams.home.name}</Text>
        </View>
        <View style={styles.scoreContainer}>
          {live.goals.home === live.goals.away ? (
            <View style={styles.score}>
              <Text style={styles.scoreText}>{live.goals.home}</Text>
              <View style={styles.liveSticker}>
                <Text style={styles.liveText}>{live.fixture.status.elapsed}'</Text>
                <Animated.Text style={{ color: "darkred", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
              </View>
              <Text style={styles.scoreText}>{live.goals.away}</Text>
            </View>
          ) : (
            <View style={styles.score}>
              <Text
                style={
                  live.goals.home > live.goals.away ? styles.winner : styles.loser
                }
              >
                {live.goals.home}
              </Text>
              <View style={styles.liveSticker}>
                <Text style={styles.liveText}>{live.fixture.status.elapsed}'</Text>
                <Animated.Text style={{ color: "darkred", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
              </View>

              <Text
                style={
                  live.goals.away > live.goals.home ? styles.winner : styles.loser
                }
              >
                {live.goals.away}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.teamContainer}>
          <Image
            source={{ uri: live.teams.away.logo }}
            style={styles.teamLogo}
            resizeMode="contain"
          />
          <Text style={styles.teamName}>{live.teams.away.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
    : null
          )}
          </View>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBlock: 10,
    paddingInline: 4,
    borderRadius: 15,
    backgroundColor: "rgb(99, 164, 221)",
    marginBottom: 20,
    width: '100%',
    marginTop: 20,
    shadowColor: '#000', // shadow color
        shadowOffset: { width: 0, height: 5 }, // shadow offset
        shadowOpacity: 0.8, // shadow opacity
        shadowRadius: 3,
        elevation: 4
  },
  title: {
    color: 'white',
    borderColor: 'white',
    fontFamily: "Kanitt",
  },
  titlecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '35%',
    borderRadius: 10,
    height: 30,
    marginBottom: 10,
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
    alignlives: 'center',
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
    fontFamily: "Kanito",
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