import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Animated
} from 'react-native';
import axios from 'axios';
import Precedent from '../components/Precedent';
import { LinearGradient } from 'expo-linear-gradient';
import getAvatarSource from '../../backend/utils/getAvatarSource';
import { teamName } from '../datas/teamNames';



export default function UserPronosScreen({ route }) {
  const { userId, username, exactScores, goodDiffs, goodResults, points, bestExactScoreUser } = route.params;

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState()

  useEffect(() => {
    fetchUser()
    fetchUserHistory();
  }, []);

  const statusLabel = {
    FINISHED: 'Terminé',
    SCHEDULED: 'Prévu',
    LIVE: 'En cours',
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;
  
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, []);

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


  const fetchUser = async () => {
  try {
    const res = await axios.get(
      `https://one1sur10.onrender.com/api/profile/user/${userId}`
    );

    setUser(res.data);
    console.log("User récupéré :", res.data);

  } catch (err) {
    console.error('Erreur chargement user', err);
  }
};


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

  console.log(exactScores)
  console.log(bestExactScoreUser)

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
     <View style={styles.container}>
      <Precedent />
      <LinearGradient colors={["#000000", "#000"]} locations={[0,  0.8]} style={{marginTop: 65,  width: "96%", borderRadius: 20, flexDirection: "row", alignItems: "center", padding: 16}}>
<Image source={getAvatarSource(user?.avatar)} style={{height: 130, width: 100, borderWidth: 4, borderColor: "#c7c00c", borderRadius: 14}} />
<View style={{width: "70%", alignItems: "center", gap: 10}}>
<Text style={{color: "#c7c00c", fontFamily: "Bangers", fontSize: 20, padding: 2}}>{user?.username}</Text>
<Text style={{color: "#c7c00c", fontFamily: "Bangers", fontSize: 20, padding: 2}}>Score : {points}</Text>
<View style={styles.statsSmall}>
  <View style={styles.stat}><Text style={styles.text}>🎯 {exactScores}</Text></View>
  <View style={styles.stat}><Text style={styles.text}>⚖️ {goodDiffs}</Text></View>
  <View style={styles.stat}><Text style={styles.text}>✅ {goodResults}</Text></View>
</View>
{bestExactScoreUser?.userId === user?._id && <Animated.Text style={{color: "#d8271a", fontFamily: "Bangers", padding: 2,  transform: [{ scale: scaleAnim }]}}>🎯 Expert du score exact 🎯</Animated.Text>}
</View>
      </LinearGradient>
      <Text style={styles.title}>Pronos de {username}</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.matchId.toString()}
        contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
        style={{width: "100%"}}
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
              <Text style={[styles.team, {textAlign: "left"}]}>{teamName[item.awayTeam] || item.awayTeam}</Text>
              
            </View>
            {item.status === 'FINISHED' ?
            <Text style={[styles.points, item.points === 0 && {color: "#e21f1f"}]}>{item.points > 0 ? "✅ " : "❌ "}{item.points > 0 && "+"}{item.points}{item.points === 1 ? " pt" : " pts"}</Text>
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
    alignItems: "center"
  },
  title: {
    fontSize: 22,
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: "Kanitt"
  },
  card: {
    backgroundColor: '#3c6089',
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
    color: "white"
    
  },
  score: {
    color: '#a1bbf3',
    fontFamily: "Kanito",
    textAlign: "center"
  },
  scoreReal: {
    fontSize: 12,
    color: '#dedfe1',
    fontFamily: "Kanitus",
        textAlign: "center"

  },
  points: {
    fontSize: 14,
fontFamily: "Kanitt",
    color: '#1ab553',
    shadowColor: "white", shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.5, shadowRadius: 5
  },
  status: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: "Kanitus"
  },
  statsSmall: {
    flexDirection: "row",
    gap: 12
  },
  stat: {
    backgroundColor: "#c7c00c",
    paddingBlock: 6,
    paddingInline: 14,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontFamily: "Kanitt",
    fontSize: 16
  }
});