import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { teamName } from "../datas/teamNames";
import warning from "../assets/warning.png";
import { Animated, Easing } from 'react-native';
import { portraitsJoueurs } from "../datas/Portraits";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

function Stats({ match, injuries }) {
  const navigation = useNavigation();

  // 🔹 Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(10)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // 🔹 States
  const [statsHome, setStatsHome] = useState(null);
  const [statsExt, setStatsExt] = useState(null);
  const [playersHome, setPlayersHome] = useState(null);
  const [playersExt, setPlayersExt] = useState(null);

  // 🔹 Fetch combiné pour stats + joueurs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          `https://v3.football.api-sports.io/teams/statistics?season=2025&team=${match.teams.home.id}&league=${match.league.id}`,
          `https://v3.football.api-sports.io/teams/statistics?season=2025&team=${match.teams.away.id}&league=${match.league.id}`,
          `https://v3.football.api-sports.io/players?league=${match.league.id}&season=2025&team=${match.teams.home.id}`,
          `https://v3.football.api-sports.io/players?league=${match.league.id}&season=2025&team=${match.teams.away.id}`,
        ];

        const headers = {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        };

        const responses = await Promise.all(urls.map(url => fetch(url, { headers }).then(r => r.json())));

        setStatsHome(responses[0].response);
        setStatsExt(responses[1].response);
        setPlayersHome(responses[2].response);
        setPlayersExt(responses[3].response);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [match.fixture.id]);

  // 🔹 Messages — gardés exactement comme tu avais
  const messages = [];

  if (statsHome && statsExt) {
    // 🏠 HOME — Invincibilité totale
    if (
      statsHome.fixtures?.loses?.total === 0 &&
      statsHome.fixtures?.played?.total > 1
    ) {
      messages.push({
        type: 'home',
        text: `* ${teamName[statsHome.team.name] || statsHome.team.name} n'a jamais perdu ${statsHome.league.id === 6 ? "dans cette CAN" : "cette saison"}
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
        text: `* ${teamName[statsHome.team.name] || statsHome.team.name} n'a jamais perdu à domicile cette saison
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
        text: `* ${teamName[statsHome.team.name] || statsHome.team.name} a marqué dans tous ses matchs de ${statsHome?.league.id === 6 ? "la CAN" : statsHome?.league.name}`,
      });
    }

    // ✈️ AWAY — A marqué à chaque match
    if (
      statsExt.failed_to_score?.total === 0 &&
      statsExt.fixtures?.played?.total > 1
    ) {
      messages.push({
        type: 'away',
        text: `* ${teamName[statsExt.team.name] || statsExt.team.name} a marqué dans tous ses matchs de ${statsExt?.league.id === 6 ? "la CAN" : statsExt?.league.name}`,
      });
    }

    // ✈️ AWAY — Invincibilité totale
    if (
      statsExt.fixtures?.loses?.total === 0 &&
      statsExt.fixtures?.played?.total > 1
    ) {
      messages.push({
        type: 'away',
        text: `* ${teamName[statsExt.team.name] || statsExt.team.name} n'a jamais perdu ${statsExt.league.id === 6 ? "dans cette CAN" : "cette saison"} 
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
        text: `* ${teamName[statsExt.team.name] || statsExt.team.name} n'a jamais gagné à l'extérieur cette saison
        (${statsExt.fixtures?.loses.away} ${statsExt.fixtures?.loses.away === 1 ? "défaite" : "défaites"} - ${statsExt.fixtures?.draws.away} ${statsExt.fixtures?.draws.away === 1 ? "nul" : "nuls"})`,
      });
    }
  }

  // 🔹 Animations des messages
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

  if (!statsHome || !statsExt || !playersHome || !playersExt) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  

  const injuredPlayerIds = new Set(
  injuries?.map(i => i.player?.id).filter(Boolean)
);

  const players = playersHome
  .filter(p => !injuredPlayerIds.has(p.player.id))
  .map(p => {
    const stat = p.statistics[0];
    return {
      id: p.player.id,
      name: p.player.name,
      photo: p.player.photo,
      goals: stat.goals?.total ?? 0,
      assists: stat.goals?.assists ?? 0,
      minutes: stat.games?.minutes,
    };
  })
  .filter(p => p.minutes !== null);

  const topScorerHome = players.length > 0 ? players.reduce((best, p) => (p.goals > best.goals ? p : best)) : null;
  const topAssistHome = players.length > 0 ? players.reduce((best, p) => (p.assists > best.assists ? p : best)) : null;

  const ratedPlayers = playersHome
  .filter(p => !injuredPlayerIds.has(p.player.id))
  .map(p => {
    const stat = p.statistics[0];
    return {
      id: p.player.id,
      name: p.player.name,
      photo: p.player.photo,
      rating: stat.games?.rating ? parseFloat(stat.games.rating) : null,
      minutes: stat.games?.minutes,
    };
  })
  .filter(p => p.rating !== null && p.minutes >= 90);

  const bestRatedHome = ratedPlayers.length > 0 ? ratedPlayers.reduce((best, p) => (p.rating > best.rating ? p : best)) : null;

  const playersExtFiltered = playersExt
  .filter(p => !injuredPlayerIds.has(p.player.id))
  .map(p => {
    const stat = p.statistics[0];
    return {
      id: p.player.id,
      name: p.player.name,
      photo: p.player.photo,
      goals: stat.goals?.total ?? 0,
      assists: stat.goals?.assists ?? 0,
      minutes: stat.games?.minutes,
    };
  })
  .filter(p => p.minutes !== null);

  const topScorerExt = playersExtFiltered.length > 0 ? playersExtFiltered.reduce((best, p) => (p.goals > best.goals ? p : best)) : null;
  const topAssistExt = playersExtFiltered.length > 0 ? playersExtFiltered.reduce((best, p) => (p.assists > best.assists ? p : best)) : null;

  const ratedPlayersExt = playersExt
  .filter(p => !injuredPlayerIds.has(p.player.id))
  .map(p => {
    const stat = p.statistics[0];
    return {
      id: p.player.id,
      name: p.player.name,
      photo: p.player.photo,
      rating: stat.games?.rating ? parseFloat(stat.games.rating) : null,
      minutes: stat.games?.minutes,
    };
  })
  .filter(p => p.rating !== null && p.minutes >= 90);

  const bestRatedExt = ratedPlayersExt.length > 0 ? ratedPlayersExt.reduce((best, p) => (p.rating > best.rating ? p : best)) : null;

  const hasAnyTopPlayer =
  topScorerHome ||
  topScorerExt ||
  topAssistHome ||
  topAssistExt ||
  bestRatedHome ||
  bestRatedExt;

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
          fontSize: 15
        }}
      >
        {item.text}
      </Text>
    ))}
  </Animated.View>
)}
        {hasAnyTopPlayer && (

<View style={styles.joueurs}>
    <Text style={{fontFamily: "Kanitt", fontSize: 18, textAlign: "center"}}>Joueurs à surveiller</Text>
    <View style={styles.bloc}>
        <LinearGradient colors={["rgba(56, 56, 56, 1)", "white"]} locations={[0.35, 0.99]} style={{height: 35, alignItems: "center", justifyContent: "center"}}>
        <Text style={styles.title}>Buteurs</Text>
        </LinearGradient>

        <View style={{alignItems: "center", backgroundColor: "white", flexDirection: "row", gap: 25, paddingInline: 5,  paddingBlock: 5}} >
            <Image source={{uri: match.league.logo}} style={{height: 48, width: 48, resizeMode: "contain"}} />
            <View>
                        {topScorerHome && (

            <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: topScorerHome.id})} style={[styles.ligne, {borderBottomWidth: 2}]}>
                <Image source={{uri: match.teams.home.logo}} style={styles.logoClub}/>
                <Image source={portraitsJoueurs[topScorerHome.id] || {uri: topScorerHome.photo}} style={styles.photoJoueur} />
                <Text style={{fontFamily: "Kanito", fontSize: 12, width: "58%"}}>{topScorerHome.name}</Text>
                <Text style={{fontFamily: "Kanitalik"}}>{topScorerHome.goals} ⚽</Text>
                </TouchableOpacity>
                        )}
                                {topScorerExt && (

            <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: topScorerExt.id})} style={styles.ligne}>
<Image source={{uri: match.teams.away.logo}} style={styles.logoClub}/>
                <Image source={portraitsJoueurs[topScorerExt.id] || {uri: topScorerExt.photo}} style={styles.photoJoueur} />
                <Text style={{fontFamily: "Kanito", fontSize: 12, width: "58%"}}>{topScorerExt.name}</Text>
                <Text style={{fontFamily: "Kanitalik"}}>{topScorerExt.goals} ⚽</Text>
                </TouchableOpacity>
                                )}
                </View>
        </View>
        
    </View>

    <View style={styles.bloc}>
        <LinearGradient colors={["rgba(56, 56, 56, 1)", "white"]} locations={[0.35, 0.99]} style={{height: 35, alignItems: "center", justifyContent: "center"}}>
        <Text style={styles.title}>Passeurs</Text>
        </LinearGradient>

        <View style={{alignItems: "center", backgroundColor: "white", flexDirection: "row", gap: 25, paddingInline: 5,  paddingBlock: 5}} >
            <Image source={{uri: match.league.logo}} style={{height: 48, width: 48, resizeMode: "contain"}} />
            <View>
                        {topAssistHome && (

            <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: topAssistHome.id})} style={[styles.ligne, {borderBottomWidth: 2}]}>
                <Image source={{uri: match.teams.home.logo}} style={styles.logoClub}/>
                <Image source={portraitsJoueurs[topAssistHome.id] || {uri: topAssistHome.photo}} style={styles.photoJoueur} />
                <Text style={{fontFamily: "Kanito", fontSize: 12, width: "55%"}}>{topAssistHome.name}</Text>
                <Text style={{fontFamily: "Kanitalik"}}>{topAssistHome.assists} 🎯</Text>
                </TouchableOpacity>
                        )}
                                {topAssistExt && (

            <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: topAssistExt.id})} style={styles.ligne}>
<Image source={{uri: match.teams.away.logo}} style={styles.logoClub}/>
                <Image source={portraitsJoueurs[topAssistExt.id] || {uri: topAssistExt.photo}} style={styles.photoJoueur} />
                <Text style={{fontFamily: "Kanito", fontSize: 12, width: "55%"}}>{topAssistExt.name}</Text>
                <Text style={{fontFamily: "Kanitalik"}}>{topAssistExt.assists} 🎯</Text>
                </TouchableOpacity>
                                )}
                </View>
        </View>
        
    </View>

    <View style={styles.bloc}>
        <LinearGradient colors={["rgba(56, 56, 56, 1)", "white"]} locations={[0.35, 0.99]} style={{height: 35, alignItems: "center", justifyContent: "center"}}>
        <Text style={styles.title}>Les mieux notés</Text>
        </LinearGradient>
        <View style={{alignItems: "center", backgroundColor: "white", flexDirection: "row", gap: 15, paddingInline: 5, paddingBlock: 5}} >
            <Image source={{uri: match.league.logo}} style={{height: 48, width: 48, resizeMode: "contain"}} />
            <View>
                        {bestRatedHome && (
            <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: bestRatedHome.id})} style={[styles.ligne, {borderBottomWidth: 2, gap: 5}]}>
                <Image source={{uri: match.teams.home.logo}} style={styles.logoClub}/>
                <Image source={portraitsJoueurs[bestRatedHome.id] || {uri: bestRatedHome.photo}} style={styles.photoJoueur} />
                <Text style={{fontFamily: "Kanito", fontSize: 12, width: "48%"}}>{bestRatedHome.name}</Text>
                                <Text style={{fontFamily: "Kanitus", fontSize: 9.5, width: 40, textAlign: "center"}}>Note Moyenne:</Text>
                <Text style={{fontFamily: "Kanitalik"}}>{bestRatedHome.rating}</Text>
                </TouchableOpacity>
                        )}
                                {bestRatedExt && (
            <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: bestRatedExt.id})} style={[styles.ligne, { gap: 5}]}>
<Image source={{uri: match.teams.away.logo}} style={styles.logoClub}/>
                <Image source={portraitsJoueurs[bestRatedExt.id] || {uri: bestRatedExt.photo}} style={styles.photoJoueur} />
                <Text style={{fontFamily: "Kanito", fontSize: 12, width: "48%"}}>{bestRatedExt.name}</Text>
                <Text style={{fontFamily: "Kanitus", fontSize: 9.5, width: 40, textAlign: "center"}}>Note Moyenne:</Text>
                <Text style={{fontFamily: "Kanitalik"}}>{bestRatedExt.rating}</Text>
                </TouchableOpacity>
                                )}
                </View>
        </View>

    </View>
</View>
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
        paddingTop: 5,
        width: "100%"
    },
    joueurs: {
        width: "94%",
        marginBlock: 20
    },
    bloc:{
borderRadius: 15,
borderWidth: 1,
overflow: "hidden",
marginTop: 15,
    },
    ligne: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "85%",
        height: 45,
        
    },
     logoClub: {
        height: 23,
        width: 23,
        resizeMode: "contain"
     },
     photoJoueur: {
        height: 30,
        width: 30,
        resizeMode: "contain"
     },
     title: {
        fontFamily: "Bangers",
        color: "white",
        fontSize: 16,
        paddingInline: 2,
        shadowOffset: [{height: 0, width: 0}],
        shadowColor: "black",
        shadowRadius: 3,
        shadowOpacity: 1
     }
})
export default Stats