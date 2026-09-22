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
import { BlurView } from 'expo-blur';


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
      <LinearGradient
  colors={["#16355f", "#0e1e3b", "#000000"]}
  locations={[0, 0.55, 1]}
  style={styles.profileHeader}
>
  

  {/* AVATAR */}
  <View style={styles.avatarWrapper}>
    <View style={styles.avatarRing}>
      <Image
        source={getAvatarSource(user?.avatar)}
        style={styles.profileAvatar}
      />
    </View>

    {/* Badge score */}
    <View style={styles.scoreBadge}>
      <Text style={styles.scoreValue}>{points}</Text>
      <Text style={styles.scoreLabel}>PTS</Text>
    </View>
  </View>

  {/* INFOS */}
  <View style={styles.profileInfo}>

    <Text
      style={styles.profileUsername}
      numberOfLines={1}
      adjustsFontSizeToFit
    >
      {user?.username}
    </Text>

    <View style={styles.statsRow}>

      <View style={styles.statCard}>
        <Text style={styles.statEmoji}>🎯</Text>
        <View>
          <Text style={styles.statValue}>{exactScores}</Text>
          <Text style={styles.statLabel}>Exact</Text>
        </View>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statEmoji}>⚖️</Text>
        <View>
          <Text style={styles.statValue}>{goodDiffs}</Text>
          <Text style={styles.statLabel}>Diff</Text>
        </View>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statEmoji}>✅</Text>
        <View>
          <Text style={styles.statValue}>{goodResults}</Text>
          <Text style={styles.statLabel}>Résultat</Text>
        </View>
      </View>

    </View>

    {/* Badge expert */}
    {bestExactScoreUser?.userId === user?._id && (
      <Animated.View
        style={[
          styles.expertBadge,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.expertBadgeText}>
          🎯 Expert du score exact
        </Text>
      </Animated.View>
    )}

  </View>
</LinearGradient>
      <Text style={styles.title}>Pronos de {username}</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.matchId.toString()}
        contentContainerStyle={{ paddingTop: 20, paddingInline: 10, paddingBottom: 100}}
        style={{width: "100%", backgroundColor: "#07111f", borderRadius: 24}}
        renderItem={({ item }) => {
          const grouped = item.reactions.reduce((acc, r) => {
  acc[r.emoji] = (acc[r.emoji] || 0) + 1;
  return acc;
}, {});

          return(
          
          <View style={styles.cardWrapper}>
  <BlurView
    intensity={35}
    tint="dark"
    style={styles.cardBlur}
  >
    <LinearGradient
      colors={[
        "rgba(255,255,255,0.14)",
        "rgba(255,255,255,0.055)",
        "rgba(20, 45, 80, 0.4)"
      ]}
      locations={[0, 0.45, 1]}
      style={styles.card}
    >
    <View pointerEvents="none" style={styles.liquidGlowOne} />
<View pointerEvents="none" style={styles.liquidGlowTwo} />
            <View style={styles.matchRow}>
              <View style={{flexDirection: "column", width: "33%", alignItems: "center", gap: 6, justifyContent: "center"}}>
                <Image
                source={{ uri: item.homeLogo || 'https://via.placeholder.com/32' }}
                style={styles.logo}
              />
              <Text style={[styles.team, {textAlign: "right"}]}>{teamName[item.homeTeam] || item.homeTeam}</Text>
              
              </View>
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
                            <View style={{flexDirection: "column", width: "33%", alignItems: "center", gap: 6}}>
<Image
                source={{ uri: item.awayLogo || 'https://via.placeholder.com/32' }}
                style={styles.logo}
              />
              <Text style={[styles.team, {textAlign: "left"}]}>{teamName[item.awayTeam] || item.awayTeam}</Text>
               
              </View>
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
           </LinearGradient>
  </BlurView>
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
    alignItems: "center",
    paddingInline: 4
  },
  title: {
    fontSize: 22,
    marginBlock: 12,
    textAlign: 'center',
    fontFamily: "Kanitt"
  },
  cardWrapper: {
  width: "100%",
  marginBottom: 18,
  borderRadius: 24,
  
},

cardBlur: {
  borderRadius: 24,
  overflow: "hidden",

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.16)",
},

card: {
  width: "100%",

  padding: 10,

  borderRadius: 24,

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.07)",

  overflow: "hidden",
},
liquidGlowOne: {
  position: "absolute",

  width: 150,
  height: 150,

  borderRadius: 75,

  backgroundColor: "rgba(70,150,255,0.10)",

  top: -90,
  right: -50,
},

liquidGlowTwo: {
  position: "absolute",

  width: 110,
  height: 110,

  borderRadius: 55,

  backgroundColor: "rgba(255,255,255,0.055)",

  bottom: -70,
  left: -35,
},
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    marginBottom: 8,
    width: "100%"
  },
  logo: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
    marginInline: 4
  },
  team: {
fontFamily: "Bella",
    textAlign: 'center',
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
    marginTop: 10
  },
  status: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: "Kanitus"
  },
  
  profileHeader: {
  marginTop: 65,
  width: "96%",
  minHeight: 190,
  borderRadius: 26,
  padding: 12,

  flexDirection: "row",
  alignItems: "center",

  overflow: "hidden",

  shadowColor: "#000",
  shadowOpacity: 0.35,
  shadowRadius: 15,
  shadowOffset: {
    width: 0,
    height: 8,
  },

  elevation: 8,
},

headerGlow: {
  position: "absolute",
  width: 180,
  height: 180,
  borderRadius: 90,

  right: -70,
  top: -80,

  backgroundColor: "rgba(61, 93, 255, 0.18)",
},

avatarWrapper: {
  width: 110,
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
},

avatarRing: {
  width: 104,
  height: 104,
  borderRadius: 52,

  padding: 2,

  backgroundColor: "#e8e8e8",

  shadowColor: "#000",
  shadowOpacity: 0.35,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 4,
  },

  elevation: 6,
},

profileAvatar: {
  width: "100%",
  height: "100%",
  borderRadius: 48,
  resizeMode: "cover",
},

scoreBadge: {
  position: "absolute",

  bottom: -19,
  right: -10,

  minWidth: 58,
  height: 58,

  borderRadius: 29,

  backgroundColor: "#dcc70e",

  borderWidth: 3,
  borderColor: "#0b1230",

  alignItems: "center",
  justifyContent: "center",

  shadowColor: "#000",
  shadowOpacity: 0.35,
  shadowRadius: 6,
  shadowOffset: {
    width: 0,
    height: 3,
  },

  elevation: 6,
},

scoreValue: {
  color: "#111",
  fontFamily: "Kanitt",
  fontSize: 17,
  lineHeight: 19,
},

scoreLabel: {
  color: "#111",
  fontFamily: "Kanito",
  fontSize: 8,
  letterSpacing: 1,
},

profileInfo: {
  flex: 1,
  marginLeft: 15,
  alignItems: "center",
  justifyContent: "center",
},

profileUsername: {
  color: "#fff",

  fontFamily: "Bangers",
  fontSize: 27,

  letterSpacing: 0.6,

  marginBottom: 12,

  maxWidth: "100%",
  padding: 2
},

statsRow: {
  width: "100%",

  flexDirection: "row",

  justifyContent: "space-between",

  gap: 6,
},

statCard: {
  flex: 1,

  minHeight: 52,

  backgroundColor: "rgba(255,255,255,0.09)",

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",

  borderRadius: 14,

  paddingInline: 6,
  paddingBlock: 7,

  flexDirection: "row",

  alignItems: "center",
  justifyContent: "center",

  gap: 5,
},

statEmoji: {
  fontSize: 16,
},

statValue: {
  color: "#fff",

  fontFamily: "Kanitt",
  fontSize: 16,

  lineHeight: 17,
},

statLabel: {
  color: "rgba(255,255,255,0.55)",

  fontFamily: "Kanito",
  fontSize: 8,

  textTransform: "uppercase",
},

expertBadge: {
  marginTop: 11,

  borderRadius: 20,

  paddingInline: 12,
  paddingBlock: 5,
},

expertBadgeText: {
  color: "#dcc70e",

  fontFamily: "Bangers",
  fontSize: 13,

  letterSpacing: 0.3,
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
  backgroundColor: "rgba(255,255,255,0.13)",

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.18)",

  borderRadius: 18,

  paddingInline: 10,
  paddingBlock: 5,

  marginRight: 6,
  marginBottom: 4,

  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 5,
  shadowOffset: {
    width: 0,
    height: 2,
  },
},

reactionText: {
  fontSize: 15,
  color: "#fff",
  fontFamily: "Kanitt",
},

addReaction: {
  paddingHorizontal: 10,
  paddingBlock: 5,

  marginLeft: "auto",

  backgroundColor: "rgba(255,255,255,0.10)",

  borderRadius: 14,

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.18)",

  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 5,
  shadowOffset: {
    width: 0,
    height: 2,
  },
},
emojiBar: {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",

  marginTop: 10,
  paddingVertical: 10,
  paddingHorizontal: 6,

  backgroundColor: "rgba(5,20,40,0.45)",

  borderRadius: 18,

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",

  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 10,
  shadowOffset: {
    width: 0,
    height: 5,
  },
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