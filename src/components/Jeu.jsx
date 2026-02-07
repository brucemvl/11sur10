import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Animated
} from 'react-native';
import axios from 'axios';
import { fetchLigue1Matches } from '../services/apiSport';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Precedent from './Precedent';
import { teamName } from '../datas/teamNames';
import { useNavigation } from '@react-navigation/native';

export default function Jeu() {
    const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [matchesByRound, setMatchesByRound] = useState({});
  const [roundIndex, setRoundIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [existingPredictions, setExistingPredictions] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [success, setSuccess] = useState({});
  const successAnim = useRef({}).current;


  useEffect(() => {
  loadMatches();
  loadMyPredictions();
}, []);

  /* ------------------ DATA ------------------ */

  const loadMatches = async () => {
    try {
      const data = await fetchLigue1Matches();
      const grouped = groupByRound(data);
      setMatchesByRound(grouped);
    } catch (err) {
      console.error(err);
      Alert.alert('Erreur', 'Impossible de charger les matchs');
    } finally {
      setLoading(false);
    }
  };

  const groupByRound = (matches) => {
    return matches.reduce((acc, match) => {
      const round = match.league.round;
      if (!acc[round]) acc[round] = [];
      acc[round].push(match);
      return acc;
    }, {});
  };

  const rounds = Object.keys(matchesByRound).sort((a, b) => {
    const getRoundNumber = (r) => parseInt(r.match(/\d+/)[0], 10);
    return getRoundNumber(a) - getRoundNumber(b);
  });

  const currentRound = rounds[roundIndex];
  const matches = matchesByRound[currentRound] || [];

  /* ------------------ ROUND STATUS ------------------ */

  const isRoundStarted = matches.some(
    (m) => new Date(m.fixture.date) < new Date()
  );

  /* ------------------ NAVIGATION ------------------ */

  const goPrevRound = () => {
    if (roundIndex > 0) setRoundIndex(roundIndex - 1);
  };

  const goNextRound = () => {
    if (roundIndex < rounds.length - 1) setRoundIndex(roundIndex + 1);
  };

  /* ------------------ PREDICTIONS ------------------ */

  const handleScoreChange = (matchId, team, value) => {
    setScores((prev) => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [team]: value,
      },
    }));
  };

  const submitPrediction = async (match) => {
  const matchId = match.fixture.id;

  setSubmitting(prev => ({ ...prev, [matchId]: true }));

  const jwtToken = await AsyncStorage.getItem('jwtToken');
  const score = scores[matchId];

  if (!score || score.home == null || score.away == null) {
    alert("Veuillez saisir un score valide");
    setSubmitting(prev => ({ ...prev, [matchId]: false }));
    return;
  }

  try {
    await axios.post(
      'https://one1sur10.onrender.com/api/predictions',
      {
        matchId,
        predictedHome: Number(score.home),
        predictedAway: Number(score.away),
        fixtureDate: match.fixture.date,
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    // 🔥 MAJ immédiate
setExistingPredictions(prev => ({
  ...prev,
  [matchId]: score
}));

// ✅ Affiche le check
successAnim[matchId] = new Animated.Value(0);

setSuccess(prev => ({ ...prev, [matchId]: true }));

Animated.spring(successAnim[matchId], {
  toValue: 1,
  useNativeDriver: true,
}).start();



// ⏱️ Le check disparaît après 1,2s
setTimeout(() => {
  setSuccess(prev => ({ ...prev, [matchId]: false }));
}, 1200);

// 🔓 Débloque le bouton
setSubmitting(prev => ({ ...prev, [matchId]: false }));

  } catch (err) {
    setSubmitting(prev => ({ ...prev, [matchId]: false }));

    if (err.response?.status === 403) {
      alert('⛔ Match déjà commencé');
    } else {
      alert("Erreur lors de l'enregistrement");
    }
  }
};

const loadMyPredictions = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    const res = await axios.get(
      'https://one1sur10.onrender.com/api/predictions/me',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const preds = {};
    res.data.forEach(p => {
      preds[p.matchId] = {
        home: p.predictedHome.toString(),
        away: p.predictedAway.toString(),
      };
    });

    setExistingPredictions(preds);
    setScores(preds); // 🔥 pré-remplit les inputs
  } catch (err) {
    console.error('Erreur chargement pronos', err);
  }
};

  

  /* ------------------ UI ------------------ */

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      {/* 🔁 Sélecteur de journée */}
      <Precedent />
      <View style={styles.roundHeader}>
        <TouchableOpacity
          onPress={goPrevRound}
          disabled={roundIndex === 0}
          style={[
            styles.arrow,
            roundIndex === 0 && styles.arrowDisabled,
          ]}
        >
          <Text>⬅️</Text>
        </TouchableOpacity>

        <Text style={styles.roundTitle}>
          Journée {currentRound?.match(/\d+/)[0]}
        </Text>

        <TouchableOpacity
          onPress={goNextRound}
          disabled={roundIndex === rounds.length - 1}
          style={[
            styles.arrow,
            roundIndex === rounds.length - 1 && styles.arrowDisabled,
          ]}
        >
          <Text>➡️</Text>
        </TouchableOpacity>
      </View>

      {isRoundStarted && (
        <Text style={styles.lockedText}>
          🔒 Journée commencée — pronostics verrouillés
        </Text>
      )}

      <FlatList
        data={matches}
        keyExtractor={(item) => item.fixture.id.toString()}
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
        renderItem={({ item }) => {
          const id = item.fixture.id;
          const hasPrediction = !!existingPredictions[id];
          const isSubmitting = submitting[id];

          return (
            <View style={styles.card}>
              <View style={styles.match}>
                <Text style={styles.teamName}>
                {teamName[item.teams.home.name] || item.teams.home.name}
                </Text>
<Image source={{uri: item.teams.home.logo}} style={styles.logoClub} />
                <View style={styles.scoreRow}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  editable={!isRoundStarted}
                  placeholder="0"
                  value={scores[id]?.home ?? ''}
                onChangeText={(v) => handleScoreChange(id, 'home', v)}
                  
                />
                <Text style={{ marginHorizontal: 5 }}>-</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  editable={!isRoundStarted}
                  placeholder="0"
                  value={scores[id]?.away ?? ''}
                onChangeText={(v) => handleScoreChange(id, 'away', v)}
                />
              </View>
<Image source={{uri: item.teams.away.logo}} style={styles.logoClub} />

                <Text style={styles.teamName}>
                    {teamName[item.teams.away.name] || item.teams.away.name}
                    </Text>
              </View>

              
{hasPrediction && (

  <Text style={styles.alreadyPredicted}>
    ✅ Pronostic enregistré
  </Text>
)}
<View style={{flexDirection: "row", gap: "5%"}}>
    <TouchableOpacity
    onPress={()=> {navigation.navigate('FicheMatch', { id: id })}} 
    style={{width: "25%", backgroundColor: "#5986f0", borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontFamily: "Kanito", color: "white", textAlign: "center", fontSize: 12}}>
        Voir la fiche match
        </Text>
        </TouchableOpacity>
              <TouchableOpacity
  style={[
    styles.button,
    (isRoundStarted || isSubmitting) && styles.buttonDisabled,
    hasPrediction && { backgroundColor: "grey" }
  ]}
  disabled={isRoundStarted || isSubmitting}
  onPress={() => submitPrediction(item)}
>
  <Text style={styles.buttonText}>
    {isSubmitting
      ? 'Enregistrement...'
      : hasPrediction
        ? 'Modifier'
        : 'Valider'}
  </Text>
</TouchableOpacity>
{success[id] && (
  <Animated.Text
    style={[
      styles.success,
      {
        opacity: successAnim[id],
        transform: [{ scale: successAnim[id] }],
      },
    ]}
  >
    ✔️
  </Animated.Text>
)}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

/* ------------------ STYLES ------------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  roundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 65,
  },
  roundTitle: {
    fontSize: 18,
fontFamily: "Kanitalik"  },
  arrow: {
    padding: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 50,
  },
  arrowDisabled: {
    opacity: 0.4,
  },
  lockedText: {
    textAlign: 'center',
    marginTop: 8,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1
  },
  match: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },
  teamName:{
fontFamily: "Bella",
width: "31%",
textAlign: "center"
  },
  logoClub: {
height: 30,
width: 30,
resizeMode: "contain"
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 32,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    padding: 8,
    fontFamily: "Kanito"
  },
  button: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: "70%"
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: "Kanito"
  },
  alreadyPredicted: {
  color: '#16a34a',
  fontSize: 12,
  marginBottom: 6,
  fontFamily: "Kanitus"
},
success: {
  color: '#16a34a',
  fontSize: 14,
  marginTop: 6,
  textAlign: 'center',
  fontFamily: 'Kanito',
  position: "relative",
  right: 55
},
});