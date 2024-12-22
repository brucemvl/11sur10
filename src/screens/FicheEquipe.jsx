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


  if (!equipe) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Precedent />
      <LinearGradient colors={["black", "steelblue"]} style={styles.header}>
        <View>
          <Text style={styles.team}>{equipe.team.name.toUpperCase()}</Text>
          <Text style={{ color: "white", fontFamily: "Kanito" }}>{equipe.team.country}</Text>
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
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
padding: 10,
    },
    header: {
flexDirection: "row",
justifyContent: "space-between",
padding: 15,
borderRadius: 15,
marginBottom: 15
    },
    team: {
        color: "white",
        fontFamily: "Permanent"
    },
    stade: {
        marginBottom: 20,
        width: '100%',
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
        alignItems: "center"
      },
    stadeImage: {
        height: 160,
        width: 280,
        borderRadius: 5
    }
  
});

export default FicheEquipe;