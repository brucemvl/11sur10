import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import Precedent from '../components/Precedent';
import user from '../../backend/models/user';

export default function UserPronosScreen({ route }) {
  const { userId, username } = route.params;

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchUserHistory();
  }, []);

  const statusLabel = {
    FINISHED: 'Terminé',
    SCHEDULED: 'Prévu',
    LIVE: 'En cours',
  };

  function analyzePrediction(prediction, match) {
    if (!match || match.status !== 'FINISHED') {
      return { points: 0 };
    }

    const ph = prediction.predictedHome;
    const pa = prediction.predictedAway;
    const rh = match.score.home;
    const ra = match.score.away;

    const pronoDiff = ph - pa;
    const realDiff = rh - ra;

    if (ph === rh && pa === ra) return { points: 3 };
    if (pronoDiff === realDiff) return { points: 2 };

    const pronoWinner = pronoDiff > 0 ? 'HOME' : pronoDiff < 0 ? 'AWAY' : 'DRAW';
    const realWinner = realDiff > 0 ? 'HOME' : realDiff < 0 ? 'AWAY' : 'DRAW';

    if (pronoWinner === realWinner) return { points: 1 };

    return { points: 0 };
  }

  const fetchUserHistory = async () => {
    try {
      // 🔥 Route backend à créer si elle n'existe pas
      const predRes = await axios.get(
        `https://one1sur10.onrender.com/api/predictions/user/${userId}`
      );

      const predictions = predRes.data;

      const matchesRes = await axios.get(
        `https://one1sur10.onrender.com/api/matches`
      );

      const allMatches = matchesRes.data;
      const matchMap = {};
      allMatches.forEach((m) => {
        matchMap[m.fixtureId] = m;
      });

      const hist = predictions
  .map((p) => {
    const match = matchMap[p.matchId];
    if (!match) return null;

    // 🔒 Autoriser uniquement LIVE ou FINISHED
    if (match.status !== 'LIVE' && match.status !== 'FINISHED') {
      return null;
    }

    const r = analyzePrediction(p, match);

    return {
      matchId: p.matchId,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeLogo: match.homeLogo,
      awayLogo: match.awayLogo,
      predictedHome: p.predictedHome,
      predictedAway: p.predictedAway,
      realHome: match.score.home,
      realAway: match.score.away,
      points: r.points,
      status: match.status,
      kickoff: match.kickoff,
    };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.kickoff) - new Date(a.kickoff));

      setHistory(hist);
    } catch (err) {
      console.error('Erreur chargement user history', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
     <View style={styles.container}>
      <Precedent />
      <Text style={styles.title}>Pronos de {username}</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.matchId.toString()}
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.matchRow}>
              
              <Text style={[styles.team, {textAlign: "center"}]}>{item.homeTeam}</Text>
              <Image
                source={{ uri: item.homeLogo || 'https://via.placeholder.com/32' }}
                style={styles.logo}
              />
              <View style={{width: "12%"}}>
              <Text style={styles.score}>
                {item.predictedHome} - {item.predictedAway}
              </Text>
              <Text style={[styles.score, {fontSize: 7.5}]}>
                Son Prono
              </Text>

              </View>
                            <View style={{width: "12%"}}>

              <Text style={styles.scoreReal}>
                ({item.realHome} - {item.realAway})
              </Text>
              <Text style={[styles.scoreReal, {fontSize: 7.5}]}>
                Score Exact
              </Text>
              </View>
              <Image
                source={{ uri: item.awayLogo || 'https://via.placeholder.com/32' }}
                style={styles.logo}
              />
              <Text style={[styles.team, {textAlign: "center"}]}>{item.awayTeam}</Text>
              
            </View>
            {item.status === 'FINISHED' ?
            <Text style={[styles.points, item.points === 0 && {color: "red"}]}>{item.points > 0 ? "✅ " : "❌ "}Points gagnés : {item.points}</Text>
            : null }
            <Text style={styles.status}>
  Statut : {statusLabel[item.status] || item.status}
</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 22,
    marginTop: 65,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: "Kanitt"
  },
  card: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 8,
  },
  logo: {
    width: "8%",
    height: 32,
    resizeMode: 'contain',
  },
  team: {
fontFamily: "Bella",
    textAlign: 'center',
    width: "30%",
    fontSize: 13,
    
  },
  score: {
    color: '#2563eb',
    fontFamily: "Kanito",
    textAlign: "center"
  },
  scoreReal: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: "Kanitus",
        textAlign: "center"

  },
  points: {
    fontSize: 14,
fontFamily: "Kanito",
    color: '#16a34a',
  },
  status: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: "Kanitus"
  },
});