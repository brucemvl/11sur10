import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import Precedent from './Precedent';
import getAvatarSource from '../../backend/utils/getAvatarSource';
import { LinearGradient } from 'expo-linear-gradient';

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [leaders, setLeaders] = useState([]);

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

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  const top3 = leaders.slice(0, 3);


console.log(leaders)

  return (
    <View style={styles.container}>
        <Precedent />
        <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Classement</Text>

      {/* TOP 3 */}
      <View style={styles.top3Container}>
  {top3.map((user, index) => (
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
  ))}
</View>


      <FlatList
  data={leaders}
  keyExtractor={(item) => item._id || item.userId}
  contentContainerStyle={{alignItems: "center", width: "100%"}}
  renderItem={({ item, index }) => (
    <LinearGradient colors={[ "#fff", "#0000000a"]}  style={styles.row}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <Image
        source={getAvatarSource(item.avatar)}
        style={styles.rowAvatar}
      />
      <Text style={styles.rowUsername}>{item.username}</Text>
      
      <Text style={styles.rowPoints}>{item.points} {item.points === 1 ? "pt" : "pts"}</Text>
      <Text style={styles.statsSmall}>
  🎯 {item.exactScores} · ⚖️ {item.goodDiffs} · ✅ {item.goodResults}
</Text>
    </LinearGradient>
  )}
/>

<View style={styles.regles}>
    <Text style={styles.reglesText}>🎯- Score exact: +3 points</Text>
    <Text style={styles.reglesText}>⚖️- Bonne difference de buts: +2 points</Text>
    <Text style={styles.reglesText}>✅- Bon resultat 1N2: +1 point</Text>
</View>
</ScrollView>
    </View>
  );
}

  const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', paddingBottom: 60  },
  scroll: {flex: 1, alignItems: "center", padding: 10  },
  title: { fontSize: 24, fontFamily: "Kanitt", marginBlock: 30, color: "black" },

  // Top 3
  top3Container: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  card: { flex: 1, marginHorizontal: 5, padding: 10, borderRadius: 15, alignItems: 'center', shadowColor: "#000", shadowOffset: {width: 0, height: 5}, shadowRadius: 4, shadowOpacity: 0.8, elevation: 4 },
  rank1: { backgroundColor: '#facc15' }, // or
  rank2: { backgroundColor: '#e5e7eb' },
  rank3: { backgroundColor: '#a74600' },
  medal: { fontSize: 30, marginBottom: 6 },
  username: { fontSize: 16, fontFamily: 'Bangers', paddingInline: 3 },
  points: { marginTop: 4, fontFamily: 'Kanito' },
  topAvatar: { width: 75, height: 75, borderRadius: 15, marginBottom: 4 },

  // Reste du classement
  row: { flexDirection: 'row', paddingBlock: 5, paddingInline: 8, borderBottomWidth: 1, borderColor: '#d2d2d2', alignItems: 'center', width: "100%", borderRadius: 10 },
  rank: { width: "4%", fontFamily: "Kanitt" },
  rowAvatar: { width: 35, height: 35, borderRadius: 20, marginRight: 10 },
  rowUsername: { color: "black", fontFamily: "Kanitt", width: "36%" },
  rowPoints: { fontFamily: "Kanitt", width: "14%", textAlign: "left"},
  statsSmall: { fontSize: 12, fontFamily: "Kanitus", width: "28%"},
  regles: {flex: 1, alignItems: "center"},
  reglesText: {color: "black", fontFamily: "Kanito"}
})
