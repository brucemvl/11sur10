import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Button, StyleSheet, ScrollView, Image, Animated, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Precedent from "../components/Precedent";
import chevron from "../assets/chevron.png";

function FicheEquipe() {
  const route = useRoute();
  const { id } = route.params;
  const { league } = route.params;

  const [equipe, setEquipe] = useState();
  const [stats, setStats] = useState(null);
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));
  const [heightAnim, setHeightAnim] = useState(new Animated.Value(0));

  const [openStade, setOpenStade] = useState(false);

  const collapseStade = () => {
    setOpenStade(!openStade);

    Animated.timing(rotateValue, {
      toValue: openStade ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animer la hauteur du palmarès
    Animated.timing(heightAnim, {
      toValue: openStade ? 0 : 1,
      duration: 300,
      useNativeDriver: false, // UseNativeDriver false for non-layout animations
    }).start();
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  useEffect(() => {
    const fetchEquipe = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/teams?id=${id}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setEquipe(json.response[0]);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchEquipe();
  }, [id]);

  console.log(equipe)

  useEffect(() => {

    // Fetch home team statistics
    fetch(`https://v3.football.api-sports.io/teams/statistics?season=2024&team=${id}&league=${league}`, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
        }
    })
        .then((response) => response.json())
        .then((json) => {
            setStats(json.response);
        })
        .catch(err => {
            console.log(err);
        });
}, [id]);



console.log(stats)

  if (!equipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Precedent />
      <LinearGradient colors={["black", "steelblue"]} style={styles.header}>
        <View>
          <Text style={styles.team}>{equipe.team.name.toUpperCase()}</Text>
          <Text style={{ color: "white", fontFamily: "Kanito" }}>{equipe.team.country === "England" ? "Angleterre" : equipe.team.country === "Spain" ? "Espagne" : equipe.team.country === "Germany" ? "Allemagne" : equipe.team.country}</Text>
          <Text style={{ color: "white", fontFamily: "Kanitus" }}>
            {equipe.team.national === false ? `Club fondé en ${equipe.team.founded}` : null}
          </Text>
        </View>
        <Image source={{ uri: equipe.team.logo }} style={{ height: 70, width: 70, objectFit: "contain" }} />
      </LinearGradient>

      <View style={styles.stade}>
        <TouchableOpacity onPress={collapseStade}>
          <LinearGradient colors={["black", "steelblue"]} style={styles.stadeTitle}>
            <Text style={styles.stadeText}>Stade</Text>
            <Animated.Image
              source={chevron}
              style={[styles.chevron, { transform: [{ rotate: rotateInterpolate }] }]}
            />
          </LinearGradient>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.stadeInfos,
            {
              height: heightAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 280], // Ajustez la hauteur en fonction du contenu
              }),
            },
          ]}
        >
          <Image style={styles.stadeImage} source={{ uri: equipe.venue.image }} />
          <Text style={{fontFamily: "Kanitt"}}>{equipe.venue.name}</Text>
          <Text style={{fontFamily: "Kanito"}}>{equipe.venue.address}, {equipe.venue.city}</Text>
          <Text style={{fontFamily: "Kanitus"}}> Capacité: {equipe.venue.capacity} places</Text>
        </Animated.View>
      </View>
      <Text style={styles.season}>2024/2025</Text>
      <View style={{width: "86%", alignItems: "center", backgroundColor: "pink", gap: 10}}>
<Text style={styles.h3}>Matchs Disputés</Text>
<Text style={{fontFamily: "Kanitt", fontSize: 22}}>{stats.fixtures.played.total}</Text>
<View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
    <View style={{alignItems: "center", width: "33%"}}>
    <Text style={styles.h4}>Victoires</Text>
    <Text style={{fontFamily: "Kanitt", color: "green", fontSize: 20}}>{stats.fixtures.wins.total}</Text>
</View>
<View style={{alignItems: "center", width: "33%"}}>
<Text style={styles.h4}>Defaites</Text>
    <Text style={{fontFamily: "Kanitt", color: "red", fontSize: 20}}>{stats.fixtures.loses.total}</Text>
</View>
<View style={{alignItems: "center", width: "33%"}}>
<Text style={styles.h4}>Nuls</Text>
    <Text style={{fontFamily: "Kanitt", color: "grey", fontSize: 20}}>{stats.fixtures.draws.total}</Text>
    </View>
</View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
padding: 10,
alignItems: "center"
    },
    header: {
flexDirection: "row",
justifyContent: "space-between",
padding: 15,
borderRadius: 15,
marginBottom: 15,
width: "98%"
    },
    team: {
        color: "white",
        fontFamily: "Permanent"
    },
    stade: {
        marginBottom: 20,
        width: '98%',
      },
      stadeTitle: {
        backgroundColor: '#4682b4',
        color: 'white',
        paddingBlock: 5,
        paddingInline: 20,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center"
      },
      stadeText: {
        fontSize: 16,
        color: 'white',
        fontFamily: "Permanent",
    
    
      },
      chevron: {
    position: "relative",
    left: 120
      },
      
      stadeInfos: {
        marginTop: 10,
        overflow: "hidden",
        alignItems: "center",
      },
    stadeImage: {
        height: 200,
        width: 340,
        borderRadius: 5,
    },
    season: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: "Kanito"
      },
      h3: {
        fontFamily: "Kanito",
        fontSize: 16,
      },
      h4: {
        fontFamily: "Kanito",
      }
  
});

export default FicheEquipe;