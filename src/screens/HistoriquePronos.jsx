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
import { teamName } from '../datas/teamNames';


export default function HistoriquePronos() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const statusLabel = {
  FINISHED: 'Terminé',
  SCHEDULED: 'A Venir',
  LIVE: 'En cours',
};



  const fetchHistory = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');

    const predRes = await axios.get(
      'https://one1sur10.onrender.com/api/predictions/me',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const predictions = predRes.data;

    const matchesRes = await axios.get(
      'https://one1sur10.onrender.com/api/matches',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const allMatches = matchesRes.data || [];

    const matchMap = {};
    allMatches.forEach((m) => {
      matchMap[m.fixtureId] = m;
    });

    // ✅ SAFE calculate function
    const calculate = (p, match) => {
      const system = match?.pointsSystem || {
        result: 1,
        diff: 2,
        exact: 3,
      };

      const ph = p.predictedHome;
      const pa = p.predictedAway;
      const rh = match?.score?.home ?? 0;
      const ra = match?.score?.away ?? 0;

      if (ph === rh && pa === ra) return system.exact;

      const pd = ph - pa;
      const rd = rh - ra;

      if (pd === rd) return system.diff;

      const pw = pd > 0 ? "HOME" : pd < 0 ? "AWAY" : "DRAW";
      const rw = rd > 0 ? "HOME" : rd < 0 ? "AWAY" : "DRAW";

      if (pw === rw) return system.result;

      return 0;
    };

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
          realHome: match?.score?.home ?? 0,
          realAway: match?.score?.away ?? 0,
          points: calculate(p, match),
          status: match.status,
          kickoff: match.kickoff,
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.kickoff) - new Date(a.kickoff));

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
      <Text style={styles.title}>Mes pronostics</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.matchId.toString()}
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.matchRow}>
              
              <Text style={[styles.team, {textAlign: "right"}]}>{teamName[item.homeTeam] || item.homeTeam}</Text>
              <Image
                source={{ uri: item.homeLogo || 'https://via.placeholder.com/32' }}
                style={styles.logo}
              />
              <View style={{width: "12%"}}>
              <Text style={styles.score}>
                {item.predictedHome} - {item.predictedAway}
              </Text>
              <Text style={[styles.score, {fontSize: 7.5}]}>
                Mon Prono
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
              <Text style={[styles.team, {textAlign: "left"}]}>{teamName[item.awayTeam] || item.awayTeam}</Text>
              
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
    marginInline: 4
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