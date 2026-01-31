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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Precedent from '../components/Precedent';

export default function HistoriquePronos() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const statusLabel = {
  FINISHED: 'Terminé',
  SCHEDULED: 'Prévu',
  LIVE: 'En cours',
};

  const fetchHistory = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');

      // 1️⃣ Récupérer les pronostics de l'utilisateur
      const predRes = await axios.get(
        'https://one1sur10.onrender.com/api/predictions/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const predictions = predRes.data;

      // 2️⃣ Pour chaque pronostic, récupérer le match correspondant
      const matchesRes = await axios.get(
        'https://one1sur10.onrender.com/api/matches',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const allMatches = matchesRes.data; // tableau de tous les matchs
      const matchMap = {};
      allMatches.forEach((m) => {
        matchMap[m.fixtureId] = m;
      });

      // 3️⃣ Créer l'historique avec points calculés
      const hist = predictions
        .map((p) => {
          const match = matchMap[p.matchId];
          if (!match) return null;

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
  points: p.points || 0,
  status: match.status,
  kickoff: match.kickoff, // 🔥 OBLIGATOIRE
};

        })
        .filter(Boolean) // enlever les nulls
        .sort((a, b) => new Date(b.kickoff) - new Date(a.kickoff)); // recent d'abord

      setHistory(hist);
      
    } catch (err) {
      console.error('Erreur chargement historique', err);
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
      <Text style={styles.title}>📜 Historique des pronostics</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.matchId.toString()}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.matchRow}>
              <Image
                source={{ uri: item.homeLogo || 'https://via.placeholder.com/32' }}
                style={styles.logo}
              />
              <Text style={styles.team}>{item.homeTeam}</Text>
              <Text style={styles.score}>
                {item.predictedHome} - {item.predictedAway}
              </Text>
              <Text style={styles.scoreReal}>
                ({item.realHome} - {item.realAway})
              </Text>
              <Text style={styles.team}>{item.awayTeam}</Text>
              <Image
                source={{ uri: item.awayLogo || 'https://via.placeholder.com/32' }}
                style={styles.logo}
              />
            </View>
            {item.status === 'FINISHED' ?
            <Text style={[styles.points, item.points === 0 && {color: "red"}]}>Points gagnés : {item.points}</Text>
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
    fontWeight: 'bold',
    marginTop: 65,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    marginBottom: 8,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  team: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  score: {
    fontWeight: 'bold',
    color: '#2563eb',
  },
  scoreReal: {
    fontSize: 12,
    color: '#6b7280',
  },
  points: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  status: {
    fontSize: 12,
    color: '#6b7280',
  },
});