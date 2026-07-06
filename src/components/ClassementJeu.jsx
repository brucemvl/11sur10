import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Precedent from './Precedent';
import getAvatarSource from '../../backend/utils/getAvatarSource';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [leaders, setLeaders] = useState([]);
  const navigation = useNavigation();
  const [matches, setMatches] = useState()



  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get('https://one1sur10.onrender.com/api/leaderboard');
      console.log(res.data);
      setLeaders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?league=1&season=2026`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );
        const json = await response.json();
        setMatches(json.response);
      } catch (error) {
        console.error("Erreur lors du chargement des matchs :", error);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  const top3 = leaders.slice(0, 3);



  const now = new Date();

const currentMatch = matches.find(
  m => new Date(m.fixture.date) > now
);

const currentRound = currentMatch?.league.round;

function getPointsSystem(round) {
  switch (round) {
    case "Round of 32":
      return { result: 1, diff: 2, exact: 4 };

    case "Round of 16":
      return { result: 2, diff: 4, exact: 6 };

    case "Quarter-finals":
      return { result: 3, diff: 5, exact: 7 };

    case "Semi-finals":
      return { result: 5, diff: 7, exact: 10 };

      case "3rd place":
      return { result: 5, diff: 7, exact: 10 };

    case "Final":
      return { result: 6, diff: 10, exact: 15 };

    default:
      return { result: 1, diff: 2, exact: 3 };
  }
}

const currentSystem = getPointsSystem(currentRound);

  const bestExactScoreUser =
  leaders.length > 0
    ? leaders.reduce((best, current) =>
        current.exactScores > best.exactScores
          ? current
          : best
      )
    : null;



  return (
    <View style={styles.container}>
        <Precedent />
        <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Classement</Text>

      {/* TOP 3 */}
      <View style={styles.top3Container}>
  {top3.map((user, index) => (
    <TouchableOpacity
    onPress={() =>
      navigation.navigate("userPronosScreen", {
        userId: user.userId,
        username: user.username,
        exactScores: user.exactScores,
        goodDiffs: user.goodDiffs,
        goodResults: user.goodResults,
                points: user.points,

        bestExactScoreUser: bestExactScoreUser
      })
    }
    activeOpacity={0.8}
    style={{flex: 1}}
  >
    <View key={user.userId} style={[styles.card, styles[`rank${index + 1}`]]}>
      <Image
  source={getAvatarSource(user.avatar)}
  style={styles.topAvatar}
/>
      <Text style={styles.medal}>
        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
      </Text>
      <Text style={styles.username}>{user.username}</Text>  {/* ✅ ici */}
      
    </View>
    </TouchableOpacity>
  ))}
</View>


      <FlatList
  data={leaders}
  keyExtractor={(item) => item._id || item.userId}
  contentContainerStyle={{alignItems: "center", width: "100%"}}
  renderItem={({ item, index }) => (
    <TouchableOpacity
    onPress={() =>
      navigation.navigate("userPronosScreen", {
        userId: item.userId,
        username: item.username,
        exactScores: item.exactScores,
        goodDiffs: item.goodDiffs,
        goodResults: item.goodResults,
        points: item.points,
                bestExactScoreUser: bestExactScoreUser

      })
    }
    activeOpacity={0.8}
  >
    <LinearGradient colors={[ "#fff", "#0000002b"]}  style={styles.row}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <Image
        source={getAvatarSource(item.avatar)}
        style={styles.rowAvatar}
      />
      <Text style={styles.rowUsername}>{item.username.slice(0,1).toUpperCase() + item.username.slice(1,item.username.length)}</Text>
      
      <Text style={styles.rowPoints}>{item.points} {item.points === 1 ? "pt" : "pts"}</Text>
      <Text style={styles.statsSmall}>
  🎯 {item.exactScores} · ⚖️ {item.goodDiffs} · ✅ {item.goodResults}
</Text>
    </LinearGradient>
    </TouchableOpacity>
  )}
/>

<View style={styles.regles}>
    <Text style={styles.reglesText}>🎯 Score exact : +{currentSystem.exact}</Text>
    <Text style={styles.reglesText}>⚖️ Bonne difference de buts : +{currentSystem.diff}</Text>
    <Text style={styles.reglesText}>✅ Bon résultat : +{currentSystem.result}</Text>
    
</View>
</ScrollView>
    </View>
  );
}

  const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6'  },
  scroll: { alignItems: "center", padding: 8, paddingBottom: 100  },
  title: { fontSize: 24, fontFamily: "Kanitt", marginBlock: 20, color: "black" },

  // Top 3
  top3Container: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  card: { borderWidth: 1, marginHorizontal: 5, padding: 10, borderRadius: 15, alignItems: 'center', shadowColor: "#000", shadowOffset: {width: 0, height: 5}, shadowRadius: 4, shadowOpacity: 0.8, elevation: 4 },
  rank1: { backgroundColor: '#facc15' }, // or
  rank2: { backgroundColor: '#d7dde2' },
  rank3: { backgroundColor: '#bf5a11' },
  medal: { fontSize: 30, marginBottom: 6 },
  username: { fontSize: 16, fontFamily: 'Bangers', paddingInline: 3 },
  points: { marginTop: 4, fontFamily: 'Kanito' },
  topAvatar: { width: 95, height: 75, borderRadius: 10, marginBottom: 4, borderWidth: 1 },

  // Reste du classement
  row: { flexDirection: 'row', paddingBlock: 5, paddingInline: 4, borderBottomWidth: 1, borderColor: '#d2d2d2', alignItems: 'center', width: "100%", borderRadius: 10 },
  rank: { width: "5%", fontFamily: "Kanitt" },
  rowAvatar: { width: 35, height: 35, borderRadius: 20, marginRight: 10 },
  rowUsername: { color: "black", fontFamily: "Kanitt", width: "34%" },
  rowPoints: { fontFamily: "Kanitt", width: "15%", textAlign: "left"},
  statsSmall: { fontSize: 11.8, fontFamily: "Kanitus", width: "30%"},
  regles: {alignItems: "center", padding: 8},
  reglesText: {color: "black", fontFamily: "Kanito", fontSize: 14}
})
