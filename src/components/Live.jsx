import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

function Live() {
  const [live, setLive] = useState([]);

  const navigation = useNavigation()

  useEffect(() => {
    const fetchLive = () => {
      try {
        fetch('https://v3.football.api-sports.io/fixtures?live=2-39-61-78-135-140', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setLive(json.response);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchLive();
  }, []);

  console.log(live);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.matchContainer}
      onPress={() => navigation.navigate('FicheMatch', { id: item.fixture.id })}
    >
      <View style={styles.match}>
        <Image
          source={{ uri: item.league.logo }}
          style={styles.competitionLogo}
          resizeMode="contain"
        />
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
                <Text style={{color: "darkred", fontFamily: "Kanitalic", fontSize: 10}}>live</Text>
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
                <Text style={{color: "darkred", fontFamily: "Kanitalic", fontSize: 10}}>live</Text>
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
    <View style={styles.container}>
      <LinearGradient       colors={[ 'rgba(3, 42, 176, 100)', 'rgba(39, 54, 50, 75)']}
      style={styles.title}
      
        >
      <Text style={{color: "white", fontFamily: "Kanitt"}}>LIVE</Text>
      </LinearGradient>
      {live.length === 0 ? (
        <Text style={styles.noMatch}>Aucun match pour le moment</Text>
      ) : (
        <FlatList
          data={live}
          renderItem={renderItem}
          keyExtractor={(item) => item.fixture.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 15,
    backgroundColor: "#b0c4de",
    marginBottom: 0,
    width: '100%',
    marginTop: 20
  },
  title: {
    marginHorizontal: '35%',
    height: 30,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'white',
    marginBottom: 0,
    textAlign: 'center',
    paddingTop: 5,
    marginBottom: 15
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
    marginTop: 20,
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
    padding: '1%',
    width: '98%',
  },
  matchContainer: {
flexDirection: "row",
    overflow: 'hidden',
    justifyItems: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F0F0',
    paddingBlock: 10,
    paddingInline: 2
  },
  competitionLogo: {
    height: 30,
    width: 25,
    objectFit: 'contain',
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "35%",
    gap: 4,
    marginInline: 1


    
  },
  teamContainerDom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "33%",
    flexDirection: "row-reverse",
    gap: 4,
    marginInline: 1,
    
    
  },
  teamLogo: {
    height: 35,
    width: 30,
    objectFit: 'contain',
    alignItems: "center"
  },
  teamName: {
    fontSize: 13,
    fontFamily: "Kanito"
  },
  scoreContainer: {
    alignItems: 'center',
    width: "22%",
    marginInline: 2
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

export default Live;