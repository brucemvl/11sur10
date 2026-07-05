import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Animated,
  TouchableOpacity,
  Modal
} from 'react-native';
import axios from 'axios';
import Precedent from '../components/Precedent';
import { LinearGradient } from 'expo-linear-gradient';
import getAvatarSource from '../../backend/utils/getAvatarSource';
import { teamName } from '../datas/teamNames';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function UserPronosScreen({ route }) {
  const { userId, username, exactScores, goodDiffs, goodResults, points, bestExactScoreUser } = route.params;

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState()

  const [reactionUsers, setReactionUsers] = useState([]);
const [reactionModal, setReactionModal] = useState(false);
const [selectedEmoji, setSelectedEmoji] = useState("");


const [openedPrediction, setOpenedPrediction] = useState(null);

const [myUserId, setMyUserId] = useState(null);

const fetchMe = async () => {
    const token = await AsyncStorage.getItem("token");

    const res = await axios.get(
        "https://one1sur10.onrender.com/api/profile/me",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    setMyUserId(res.data._id);
};

useEffect(() => {
    fetchUser()
    fetchUserHistory();
    fetchMe()
  }, []);


const ReactionChip = ({emoji,count})=>{

const scale = useRef(new Animated.Value(0)).current;

useEffect(()=>{

Animated.spring(scale,{
toValue:1,
useNativeDriver:true
}).start();

},[]);

return(

<Animated.View
    style={[
      styles.reactionChip,
      {
        transform: [{ scale }]
      }
    ]}
  >
    <Text style={styles.reactionText}>
      {emoji} {count}
    </Text>
  </Animated.View>


);

}

  

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

      const calculate = (p, match) => {
  const system = match.pointsSystem || {
    result: 1,
    diff: 2,
    exact: 3,
  };

  const ph = p.predictedHome;
  const pa = p.predictedAway;
  const rh = match.score.home;
  const ra = match.score.away;

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

    // 🔒 Autoriser uniquement LIVE ou FINISHED
    if (match.status !== 'LIVE' && match.status !== 'FINISHED') {
      return null;
    }

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
  points: calculate(p, match),   // 👈 IMPORTANT
  status: match.status,
  kickoff: match.kickoff,
  predictionId: p._id,
  reactions: p.reactions || [],
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


  const openReactionBar = (predictionId) => {
    setOpenedPrediction(prev =>
        prev === predictionId ? null : predictionId
    );
};

const showReactionUsers=(emoji,reactions)=>{

const users=reactions.filter(r=>r.emoji===emoji);

setSelectedEmoji(emoji); 
setReactionUsers(users);

setReactionModal(true);

}

const sendReaction = async (emoji) => {
    const token = await AsyncStorage.getItem("jwtToken");
console.log("TOKEN =", token);
    try {

        await axios.post(
            `https://one1sur10.onrender.com/api/predictions/${openedPrediction}/reaction`,
            { emoji },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setOpenedPrediction(null);

        setHistory(old =>
            old.map(pred => {

                if (pred.predictionId !== openedPrediction)
                    return pred;

                const reactions = [...pred.reactions];

                const existing = reactions.find(
                    r =>
                        (typeof r.userId === "object"
                            ? r.userId._id
                            : r.userId) === myUserId
                );

                if (existing) {
                    existing.emoji = emoji;
                } else {
                    reactions.push({
                        emoji,
                        userId: {
                            _id: myUserId,
                        },
                    });
                }

                return {
                    ...pred,
                    reactions,
                };
            })
        );

        setTimeout(() => {
    fetchUserHistory();
}, 500);

    } catch (err) {
        console.log(err);
    }
};

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
<Text style={{color: "#c7c00c", fontFamily: "Kanito", fontSize: 20, padding: 2}}>Score : {points}</Text>
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
        renderItem={({ item }) => {
          const grouped = item.reactions.reduce((acc, r) => {
  acc[r.emoji] = (acc[r.emoji] || 0) + 1;
  return acc;
}, {});

          return(
          
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
<View style={styles.reactionBar}>

  {Object.entries(grouped).map(([emoji, count]) => (
<TouchableOpacity
    key={emoji}
    onLongPress={() => showReactionUsers(emoji, item.reactions)}
>
        <ReactionChip
    emoji={emoji}
    count={count}
/>
    </TouchableOpacity>
  ))}

  <TouchableOpacity
    onPress={() => openReactionBar(item.predictionId)}
    style={styles.addReaction}
  >
    <Text style={{ fontSize: 22, color: "white", fontFamily: "Kanitt" }}>😊+</Text>
  </TouchableOpacity>

</View>
{openedPrediction === item.predictionId && (

<View style={styles.emojiBar}>

{["😂","😭","😱","🔥","👏","🤯","😎", "🖕", "😤"].map(e => (

<TouchableOpacity
key={e}
onPress={() => sendReaction(e)}
>

<Text style={{fontSize:26}}>
{e}
</Text>

</TouchableOpacity>

))}

</View>

)}
          </View>
        )}}
      />

      <Modal
    visible={reactionModal}
    transparent
    animationType="fade"
    onRequestClose={() => setReactionModal(false)}
>

    <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setReactionModal(false)}
    >

        <TouchableOpacity
            activeOpacity={1}
            style={styles.modalCard}
        >

            <Text style={styles.modalTitle}>
                {selectedEmoji} Réactions
            </Text>

            <FlatList
                data={reactionUsers}
                keyExtractor={(item) => item.userId._id}
                renderItem={({ item }) => (
                    <View style={styles.userRow}>
                        <Image
                            source={getAvatarSource(item.userId.avatar)}
                            style={styles.avatar}
                        />

                        <Text style={styles.username}>
                            {item.userId.username}
                        </Text>
                    </View>
                )}
            />

            <TouchableOpacity
                onPress={() => setReactionModal(false)}
                style={styles.closeButton}
            >
                <Text style={{color:"white"}}>
                    Fermer
                </Text>
            </TouchableOpacity>

        </TouchableOpacity>

    </TouchableOpacity>

</Modal>
      
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
    marginBottom: 20,
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
  },
 reactionBar: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 8,
  flexWrap: "wrap",
},

reactionChip: {
  backgroundColor: "#ffffff",
  borderRadius: 20,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginRight: 6,
  marginBottom: 4,
},

reactionText: {
  fontSize: 16,
},

addReaction: {
  paddingHorizontal: 8,
  marginLeft: "auto",
  backgroundColor: "#0c4574",
  borderRadius: 10
  
  

},
emojiBar: {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: 10,
  paddingVertical: 10,
  backgroundColor: "#23476c",
  borderRadius: 15,
},
modalOverlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.45)",
    justifyContent:"center",
    alignItems:"center"
},

modalCard:{
    width:"80%",
    maxHeight:"60%",
    backgroundColor:"white",
    borderRadius:20,
    padding:20
},

modalTitle:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:15,
    textAlign:"center"
},

userRow:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical:8
},

avatar:{
    width:40,
    height:40,
    borderRadius:20,
    marginRight:10
},

username:{
    fontSize:16,
    fontFamily: "Kanito"
},

closeButton:{
    marginTop:20,
    backgroundColor:"#23476c",
    padding:12,
    borderRadius:12,
    alignItems:"center"
}
});