import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import axios from "axios";
import Precedent from "./Precedent";
import getAvatarSource from "../../backend/utils/getAvatarSource";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [leaders, setLeaders] = useState([]);
  const [matches, setMatches] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          "https://one1sur10.onrender.com/api/leaderboard"
        );
        setLeaders(res.data);
      } catch (err) {
        console.error("Erreur classement :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch(
          "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );

        const json = await response.json();
        setMatches(json.response || []);
      } catch (error) {
        console.error("Erreur lors du chargement des matchs :", error);
      }
    };

    fetchFixtures();
  }, []);

  const now = new Date();

  const currentMatch = matches.find(
    (match) => new Date(match.fixture.date) > now
  );

  const currentRound = currentMatch?.league?.round;

  function getPointsSystem(round) {
    switch (round) {
      case "Round of 32":
        return { result: 1, diff: 2, exact: 4 };
      case "Round of 16":
        return { result: 2, diff: 4, exact: 6 };
      case "Quarter-finals":
        return { result: 3, diff: 5, exact: 7 };
      case "Semi-finals":
      case "3rd place":
        return { result: 5, diff: 7, exact: 10 };
      case "Final":
        return { result: 6, diff: 10, exact: 15 };
      default:
        return { result: 1, diff: 2, exact: 3 };
    }
  }

  const currentSystem = getPointsSystem(currentRound);
  const top3 = leaders.slice(0, 3);

  const bestExactScoreUser =
    leaders.length > 0
      ? leaders.reduce((best, current) =>
          current.exactScores > best.exactScores ? current : best
        )
      : null;

  const openUser = (user) => {
    navigation.navigate("userPronosScreen", {
      userId: user.userId,
      username: user.username,
      exactScores: user.exactScores,
      goodDiffs: user.goodDiffs,
      goodResults: user.goodResults,
      points: user.points,
      bestExactScoreUser,
    });
  };

  const renderPodiumItem = (user, rank) => {
    if (!user) return <View key={`empty-${rank}`} style={styles.podiumItem} />;

    return (
      <TouchableOpacity
        key={user.userId}
        style={styles.podiumItem}
        activeOpacity={0.85}
        onPress={() => openUser(user)}
      >
        <View
          style={[
            styles.podiumCard,
            rank === 1 && styles.firstPlace,
            rank === 2 && styles.secondPlace,
            rank === 3 && styles.thirdPlace,
          ]}
        >
          <View style={styles.medalContainer}>
            <Text style={styles.medal}>
              {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
            </Text>
          </View>

          <Image
            source={getAvatarSource(user.avatar)}
            style={styles.podiumAvatar}
          />

          <Text style={styles.podiumUsername} numberOfLines={1}>
            {user.username || "Joueur"}
          </Text>

          <View style={styles.podiumPoints}>
            <Text style={styles.podiumPointsValue}>
              {user.points ?? 0}
            </Text>
            <Text style={styles.podiumPointsLabel}>POINTS</Text>
          </View>
        </View>

        
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View>
      <LinearGradient
        colors={["#142b52", "#244d83", "#3478c8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>Classement</Text>
        <Text style={styles.heroSubtitle}>
          Qui domine la compétition ?
        </Text>

        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>{leaders.length}</Text>
            <Text style={styles.heroStatLabel}>Joueurs</Text>
          </View>
          <View style={styles.heroDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>
              {leaders[0]?.points ?? 0}
            </Text>
            <Text style={styles.heroStatLabel}>Points du leader</Text>
          </View>
        </View>
      </LinearGradient>

      {top3.length > 0 && (
        <View style={styles.podiumSection}>
          <View style={styles.sectionHeading}>
              <Text style={styles.sectionEyebrow}>LES MEILLEURS</Text>
          </View>

          <View style={styles.podium}>
            {renderPodiumItem(top3[1], 2)}
            {renderPodiumItem(top3[0], 1)}
            {renderPodiumItem(top3[2], 3)}
          </View>
        </View>
      )}

      <View style={styles.rankingHeading}>
        <View>
          <Text style={styles.sectionEyebrow}>LA COMPÉTITION</Text>
          <Text style={styles.sectionTitle}>Classement général</Text>
        </View>
        <View style={styles.playerCount}>
          <Text style={styles.playerCountText}>
            {leaders.length} joueurs
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPlayer = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => openUser(item)}
      style={styles.playerTouchable}
    >
      <View style={styles.playerCard}>
        <View style={styles.playerIdentity}>
          <Text style={styles.playerRank}>
            {String(index + 1).padStart(2, "0")}
          </Text>

          <Image
            source={getAvatarSource(item.avatar)}
            style={styles.playerAvatar}
          />

          <View style={styles.playerInfo}>
            <Text style={styles.playerName} numberOfLines={1}>
              {item.username
                ? item.username.charAt(0).toUpperCase() +
                  item.username.slice(1)
                : "Joueur"}
            </Text>

            <View style={styles.playerStats}>
              <Text style={styles.playerStat}>🎯 {item.exactScores ?? 0}</Text>
              <Text style={styles.statSeparator}>·</Text>
              <Text style={styles.playerStat}>⚖️ {item.goodDiffs ?? 0}</Text>
              <Text style={styles.statSeparator}>·</Text>
              <Text style={styles.playerStat}>✅ {item.goodResults ?? 0}</Text>
            </View>
          </View>
        </View>

        <View style={styles.pointsBadge}>
          <Text style={styles.pointsValue}>{item.points ?? 0}</Text>
          <Text style={styles.pointsLabel}>PTS</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => (
    <View style={styles.rulesCard}>
      <View style={styles.rulesHeading}>
        <Text style={styles.rulesIcon}>📋</Text>
        <View>
          <Text style={styles.rulesTitle}>Barème des points</Text>
          <Text style={styles.rulesSubtitle}>
            Points attribués par pronostic
          </Text>
        </View>
      </View>

      <View style={styles.ruleRow}>
        <View style={styles.ruleLeft}>
          <Text style={styles.ruleEmoji}>🎯</Text>
          <Text style={styles.ruleText}>Score exact</Text>
        </View>
        <Text style={styles.rulePoints}>+{currentSystem.exact} pts</Text>
      </View>

      <View style={styles.ruleRow}>
        <View style={styles.ruleLeft}>
          <Text style={styles.ruleEmoji}>⚖️</Text>
          <Text style={styles.ruleText}>Bonne différence de buts</Text>
        </View>
        <Text style={styles.rulePoints}>+{currentSystem.diff} pts</Text>
      </View>

      <View style={styles.ruleRow}>
        <View style={styles.ruleLeft}>
          <Text style={styles.ruleEmoji}>✅</Text>
          <Text style={styles.ruleText}>Bon résultat</Text>
        </View>
        <Text style={styles.rulePoints}>+{currentSystem.result} pts</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Precedent />
        <ActivityIndicator size="large" color="#3478c8" />
        <Text style={styles.loadingText}>Chargement du classement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#142b52" />
      <Precedent />

      <FlatList
        data={leaders}
        keyExtractor={(item) => String(item._id || item.userId)}
        renderItem={renderPlayer}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🏆</Text>
            <Text style={styles.emptyTitle}>Pas encore de classement</Text>
            <Text style={styles.emptyText}>
              Les joueurs apparaîtront ici dès que les premiers points seront attribués.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fb",
    
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#f3f6fb",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 14,
    fontFamily: "Kanitt",
    color: "#64748b",
    fontSize: 14,
  },

  listContent: {
    paddingBottom: 45,
  },

  hero: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  heroEyebrow: {
    color: "#b9d8ff",
    fontSize: 11,
    letterSpacing: 2,
    fontFamily: "Kanitt",
    textAlign: "center",
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 34,
    fontFamily: "Bangers",
    textAlign: "center",
    marginTop: 5,
  },

  heroSubtitle: {
    color: "#d9e8fb",
    fontSize: 13,
    fontFamily: "Kanitt",
    textAlign: "center",
    marginTop: 3,
  },

  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },

  heroStat: {
    flex: 1,
    alignItems: "center",
  },

  heroStatValue: {
    color: "#ffffff",
    fontSize: 24,
    fontFamily: "Kanitt",
  },

  heroStatLabel: {
    color: "#c5d8ef",
    fontSize: 11,
    fontFamily: "Kanito",
    marginTop: 2,
  },

  heroDivider: {
    width: 1,
    height: 35,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  podiumSection: {
    paddingHorizontal: 15,
    paddingTop: 28,
  },

  sectionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    paddingHorizontal: 5,
  },

  sectionEyebrow: {
    color: "#3478c8",
    fontSize: 10,
    letterSpacing: 1.5,
    fontFamily: "Kanitt",
  },

  sectionTitle: {
    color: "#172b4d",
    fontSize: 22,
    fontFamily: "Kanitt",
    marginTop: 2,
  },

  trophy: {
    fontSize: 30,
  },

  podium: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 2,
  },

  podiumItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  podiumCard: {
    width: "96%",
    minHeight: 165,
    paddingVertical: 13,
    paddingHorizontal: 5,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.07)",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#172b4d",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  firstPlace: {
    minHeight: 205,
    backgroundColor: "#d8b343",
    borderColor: "#e7bd50",
  },

  secondPlace: {
    minHeight: 180,
    backgroundColor: "#cfd8e2",
    borderColor: "#c7d0db",
  },

  thirdPlace: {
    minHeight: 165,
    backgroundColor: "#b88361",
    borderColor: "#d99b72",
  },

  medalContainer: {
    height: 30,
    justifyContent: "center",
  },

  medal: {
    fontSize: 25,
  },

  podiumAvatar: {
    width: 65,
    height: 65,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
  },

  podiumUsername: {
    width: "100%",
    color: "#172b4d",
    fontSize: 13,
    fontFamily: "Bangers",
    textAlign: "center",
    marginTop: 7,
  },

  podiumPoints: {
    alignItems: "center",
    marginTop: 5,
  },

  podiumPointsValue: {
    color: "#172b4d",
    fontSize: 19,
    fontFamily: "Kanitt",
  },

  podiumPointsLabel: {
    color: "#64748b",
    fontSize: 8,
    letterSpacing: 1,
    fontFamily: "Kanitt",
  },

  podiumBase: {
    width: "96%",
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#c7d0db",
  },

  firstBase: {
    backgroundColor: "#e2b83e",
  },

  secondBase: {
    backgroundColor: "#aeb9c7",
  },

  thirdBase: {
    backgroundColor: "#c9855b",
  },

  podiumBaseText: {
    color: "#ffffff",
    fontFamily: "Kanitt",
    fontSize: 13,
  },

  rankingHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 14,
  },

  playerCount: {
    backgroundColor: "#e5eefb",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  playerCountText: {
    color: "#3478c8",
    fontSize: 11,
    fontFamily: "Kanitt",
  },

  playerTouchable: {
    marginHorizontal: 15,
    marginBottom: 6,
  },

  playerCard: {
    minHeight: 75,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e8edf4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#172b4d",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.045,
    shadowRadius: 5,
    elevation: 2,
  },

  playerIdentity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  playerRank: {
    width: 28,
    color: "#8290a4",
    fontSize: 12,
    fontFamily: "Kanitt",
  },

  playerAvatar: {
    width: 43,
    height: 43,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: "#edf1f6",
  },

  playerInfo: {
    flex: 1,
    minWidth: 0,
  },

  playerName: {
    color: "#172b4d",
    fontSize: 13,
    fontFamily: "Kanitt",
  },

  playerStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 4,
  },

  playerStat: {
    color: "#64748b",
    fontSize: 11,
    fontFamily: "Kanito",
  },

  statSeparator: {
    color: "#c0cad6",
    fontSize: 11,
  },

  pointsBadge: {
    minWidth: 55,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eaf2ff",
    borderRadius: 11,
  },

  pointsValue: {
    color: "#1f5396",
    fontSize: 17,
    fontFamily: "Kanitt",
  },

  pointsLabel: {
    color: "#567195",
    fontSize: 8,
    fontFamily: "Kanitt",
    letterSpacing: 0.7,
  },

  rulesCard: {
    marginHorizontal: 15,
    marginTop: 22,
    padding: 18,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e8edf4",
    marginBottom: 90
  },

  rulesHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },

  rulesIcon: {
    fontSize: 25,
  },

  rulesTitle: {
    color: "#172b4d",
    fontSize: 16,
    fontFamily: "Kanitt",
  },

  rulesSubtitle: {
    color: "#8794a7",
    fontSize: 11,
    fontFamily: "Kanito",
    marginTop: 2,
  },

  ruleRow: {
    minHeight: 43,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eef1f5",
  },

  ruleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    flex: 1,
  },

  ruleEmoji: {
    fontSize: 16,
  },

  ruleText: {
    color: "#526176",
    fontSize: 12,
    fontFamily: "Kanitt",
  },

  rulePoints: {
    color: "#2868bd",
    fontSize: 12,
    fontFamily: "Kanitt",
  },

  emptyState: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 45,
  },

  emptyEmoji: {
    fontSize: 45,
  },

  emptyTitle: {
    color: "#172b4d",
    fontSize: 18,
    fontFamily: "Kanitt",
    marginTop: 12,
  },

  emptyText: {
    color: "#8290a4",
    fontSize: 13,
    fontFamily: "Kanito",
    textAlign: "center",
    lineHeight: 21,
    marginTop: 7,
  },
});