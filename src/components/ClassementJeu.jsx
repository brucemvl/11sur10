import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get('https://one1sur10.onrender.com/api/leaderboard');
      setLeaders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  const top3 = data.slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classement</Text>

      {/* TOP 3 */}
      <View style={styles.top3Container}>
        {top3.map((user, index) => (
          <View key={user.userId} style={[styles.card, styles[`rank${index + 1}`]]}>
            <Image
              source={{ uri: `https://one1sur10.onrender.com${user.avatar}` }}
              style={styles.topAvatar}
            />
            <Text style={styles.medal}>
              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
            </Text>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.points}>{user.points} pts</Text>
          </View>
        ))}
      </View>


      <FlatList
        data={leaders}
        keyExtractor={(item) => item.userId}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Text style={styles.user}>{item.userId}</Text>
            <Text style={styles.points}>{item.points} pts</Text>
          </View>
        )}
      />
    </View>
  );
}

  const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },

  // Top 3
  top3Container: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  card: { flex: 1, marginHorizontal: 5, padding: 15, borderRadius: 16, alignItems: 'center' },
  rank1: { backgroundColor: '#facc15' }, // or
  rank2: { backgroundColor: '#e5e7eb' },
  rank3: { backgroundColor: '#f97316' },
  medal: { fontSize: 30, marginBottom: 6 },
  username: { fontSize: 16, fontWeight: 'bold' },
  points: { marginTop: 4, fontWeight: '600' },
  topAvatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },

  // Reste du classement
  row: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#e5e7eb', alignItems: 'center' },
  rank: { width: 30, fontWeight: 'bold' },
  rowAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  rowUsername: { flex: 1 },
  rowPoints: { fontWeight: 'bold' },
})
