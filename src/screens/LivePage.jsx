import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Animated, ScrollView, RefreshControl } from 'react-native';
import ligue1 from "../assets/logoligue1.webp";
import { LinearGradient } from 'expo-linear-gradient';

function LivePage({ navigation }) {
  const [live, setLive] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false); // État pour gérer le rafraîchissement

  const fetchLive = async () => {
    try {
      const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      });
      const json = await response.json();
      setLive(json.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchLive();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true); // Déclenche le rafraîchissement
    fetchLive().then(() => setIsRefreshing(false)); // Rafraîchit les données et arrête le rafraîchissement
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.matchContainer}
      onPress={() => navigation.navigate('FicheMatch', { id: item.fixture.id })}
    >
      <View style={styles.match}>
        {item.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
          source={ligue1}
          style={styles.competitionLogo}
          resizeMode="contain"
        /> :
        <Image
          source={{ uri: item.league.logo }}
          style={styles.competitionLogo}
          resizeMode="contain"
        />}
        <View style={styles.teamContainerDom}>
          <Image
            source={{ uri: item.teams.home.logo }}
            style={styles.teamLogo}
            resizeMode="contain"
          />
          <Text style={styles.teamName}>{item.teams.home.name}</Text>
        </View>
        <View style={styles.scoreContainer}>
          {item.goals.home === item.goals.away ? (
            <View style={styles.score}>
              <Text style={styles.scoreText}>{item.goals.home}</Text>
              <View style={styles.liveSticker}>
                <Text style={styles.liveText}>{item.fixture.status.elapsed}'</Text>
                <Animated.Text style={{ color: "darkred", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
              </View>
              <Text style={styles.scoreText}>{item.goals.away}</Text>
            </View>
          ) : (
            <View style={styles.score}>
              <Text
                style={
                  item.goals.home > item.goals.away ? styles.winner : styles.loser
                }
              >
                {item.goals.home}
              </Text>
              <View style={styles.liveSticker}>
                <Text style={styles.liveText}>{item.fixture.status.elapsed}'</Text>
                <Text style={{ color: "darkred", fontFamily: "Kanitalic", fontSize: 10 }}>live</Text>
              </View>

              <Text
                style={
                  item.goals.away > item.goals.home ? styles.winner : styles.loser
                }
              >
                {item.goals.away}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.teamContainer}>
          <Image
            source={{ uri: item.teams.away.logo }}
            style={styles.teamLogo}
            resizeMode="contain"
          />
          <Text style={styles.teamName}>{item.teams.away.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{ width: "98%", paddingStart: "2%", marginBlock: 10, flex: 1 }}
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
        {live.length === 0 ? (
          <Text style={styles.noMatch}>Aucun match pour le moment</Text>
        ) : (
          <FlatList
            data={live}
            renderItem={renderItem}
            keyExtractor={(item) => item.fixture.id.toString()}
            style={styles.live__tableau}
            onEndReachedThreshold={0.5}
            onEndReached={onRefresh} // Si vous voulez aussi charger plus de données en bas
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: "#b0c4de",
    marginBottom: 0,
    width: '100%',
    marginTop: 20
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
    marginBottom: 10
  },
  match: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBlock: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: "100%"
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
    paddingBlock: 10,
    paddingInline: 1
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
    height: 30,
    width: 30,
    objectFit: 'contain',
    alignItems: "center",
    marginInline: 5
  },
  teamName: {
    fontSize: 12,
    fontFamily: "Kanito"
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