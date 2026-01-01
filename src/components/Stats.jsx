import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import { useState, useEffect } from "react";
import { teamName } from "../datas/teamNames";
import warning from "../assets/warning.png"
import { Animated, Easing } from 'react-native';
import { useRef } from "react";



function Stats({match}){

    const fadeAnim = useRef(new Animated.Value(0)).current;
const translateAnim = useRef(new Animated.Value(10)).current;
const pulseAnim = useRef(new Animated.Value(1)).current;

      const [statsHome, setStatsHome] = useState();
        const [statsExt, setStatsExt] = useState();


          useEffect(() => {
        
        fetch(`https://v3.football.api-sports.io/teams/statistics?season=2025&team=${match.teams.home.id}&league=${match.league.id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setStatsHome(json.response);
      })
      .catch(err => {
        console.log(err);
      });
  }, [match.fixture.id]);

  useEffect(() => {
        
        fetch(`https://v3.football.api-sports.io/teams/statistics?season=2025&team=${match.teams.away.id}&league=${match.league.id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setStatsExt(json.response);
      })
      .catch(err => {
        console.log(err);
      });
  }, [match.fixture.id]);



 const messages = [];

if (statsHome && statsExt) {

  // 🏠 HOME — Invincibilité totale
  if (
    statsHome.fixtures?.loses?.total === 0 &&
    statsHome.fixtures?.played?.total > 1
  ) {
    messages.push({
      type: 'home',
      text: `${teamName[statsHome.team.name] || statsHome.team.name} n'a jamais perdu ${statsHome.league.id === 6 ? "dans cette CAN" : "cette saison"}
            (${statsHome.fixtures?.wins.total} ${statsHome.fixtures?.wins.total === 1 ? "victoire" : "victoires"} - ${statsHome.fixtures?.draws.total} ${statsHome.fixtures?.draws.total === 1 ? "nul" : "nuls"})`,

    });
  }

  // 🏠 HOME — Invincibilité à domicile
  if (
    statsHome.fixtures?.loses?.home === 0 &&
    statsHome.fixtures?.loses?.total !== 0 &&
    statsHome.fixtures?.played?.total > 1 &&
    statsHome.league?.id !== 6
  ) {
    messages.push({
      type: 'home',
      text: `${teamName[statsHome.team.name] || statsHome.team.name} n'a jamais perdu à domicile cette saison
      (${statsHome.fixtures?.wins.home} ${statsHome.fixtures?.wins.home === 1 ? "victoire" : "victoires"} - ${statsHome.fixtures?.draws.home} ${statsHome.fixtures?.draws.home === 1 ? "nul" : "nuls"})`,
    });
  }

  // 🏠 HOME — A marqué à chaque match
  if (
    statsHome.failed_to_score?.total === 0 &&
    statsHome.fixtures?.played?.total > 1
  ) {
    messages.push({
      type: 'home',
      text: `${teamName[statsHome.team.name] || statsHome.team.name} a marqué dans tous ses matchs de ${statsHome?.league.id === 6 ? "la CAN" : statsHome?.league.name }`,
    });
  }

  // ✈️ AWAY — A marqué à chaque match
  if (
    statsExt.failed_to_score?.total === 0 &&
    statsExt.fixtures?.played?.total > 1
  ) {
    messages.push({
      type: 'away',
      text: `${teamName[statsExt.team.name] || statsExt.team.name} a marqué dans tous ses matchs de ${statsExt?.league.id === 6 ? "la CAN" : statsExt?.league.name}`,
    });
  }

  // ✈️ AWAY — Invincibilité totale
  if (
    statsExt.fixtures?.loses?.total === 0 &&
    statsExt.fixtures?.played?.total > 1
  ) {
    messages.push({
      type: 'away',
      text: `${teamName[statsExt.team.name] || statsExt.team.name} n'a jamais perdu ${statsExt.league.id === 6 ? "dans cette CAN" : "cette saison"}
      (${statsExt.fixtures?.wins.total} ${statsExt.fixtures?.wins.total === 1 ? "victoire" : "victoires"} - ${statsExt.fixtures?.draws.total} ${statsExt.fixtures?.draws.total === 1 ? "nul" : "nuls"})`,
    });
  }

  // ✈️ AWAY — Jamais gagné à l’extérieur
  if (
    statsExt.fixtures?.wins?.away === 0 &&
    statsExt.fixtures?.played?.total > 1 &&
    statsExt.league?.id !== 6
  ) {
    messages.push({
      type: 'away',
      text: `${teamName[statsExt.team.name] || statsExt.team.name} n'a jamais gagné à l'extérieur cette saison
            (${statsExt.fixtures?.loses.away} ${statsExt.fixtures?.loses.away === 1 ? "défaite" : "défaites"} - ${statsExt.fixtures?.draws.away} ${statsExt.fixtures?.draws.away === 1 ? "nul" : "nuls"})`,

    });
  }
}
   


useEffect(() => {
  if (messages.length > 0) {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }
}, [messages.length]);


   if(!statsHome || !statsExt){
    return (
        <ActivityIndicator />
    )
}

    return (
  <View style={styles.container}>
    {messages.length > 0 && (
  <Animated.View
    style={{
      opacity: fadeAnim,
      transform: [{ translateY: translateAnim }],
      alignItems: 'center',
    }}
  >
    <Animated.Image
      source={warning}
      style={{
        width: 40,
        height: 40,
        marginBottom: 6,
        transform: [{ scale: pulseAnim }],
      }}
      accessibilityLabel="Statistiques importantes"
    />

    {messages.map((item, index) => (
      <Text
        key={index}
        style={{
          fontFamily: 'Bangers',
          color: item.type === 'home' ? 'darkblue' : 'rgba(90,90,90,1)',
          textAlign: 'center',
          marginVertical: 3,
          paddingHorizontal: 3,
        }}
      >
        {item.text}
      </Text>
    ))}
  </Animated.View>
)}
  </View>
);

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 4,
        marginBlock: 5,
        paddingTop: 5
    }
})
export default Stats