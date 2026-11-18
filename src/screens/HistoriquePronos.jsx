import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  StatusBar,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import Precedent from "../components/Precedent";
import { teamName } from "../datas/teamNames";

export default function HistoriquePronos() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const statusLabel = {
    FINISHED: "Terminé",
    SCHEDULED: "À venir",
    LIVE: "En cours",
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");

      const predRes = await axios.get(
        "https://one1sur10.onrender.com/api/predictions/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const predictions = predRes.data || [];

      const matchesRes = await axios.get(
        "https://one1sur10.onrender.com/api/matches",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const allMatches = matchesRes.data || [];

      const matchMap = {};
      allMatches.forEach((match) => {
        matchMap[match.fixtureId] = match;
      });

      const calculate = (prediction, match) => {
        const system = match?.pointsSystem || {
          result: 1,
          diff: 2,
          exact: 3,
        };

        const predictedHome = prediction.predictedHome;
        const predictedAway = prediction.predictedAway;
        const realHome = match?.score?.home ?? 0;
        const realAway = match?.score?.away ?? 0;

        if (
          predictedHome === realHome &&
          predictedAway === realAway
        ) {
          return system.exact;
        }

        const predictedDiff = predictedHome - predictedAway;
        const realDiff = realHome - realAway;

        if (predictedDiff === realDiff) {
          return system.diff;
        }

        const predictedResult =
          predictedDiff > 0
            ? "HOME"
            : predictedDiff < 0
            ? "AWAY"
            : "DRAW";

        const realResult =
          realDiff > 0
            ? "HOME"
            : realDiff < 0
            ? "AWAY"
            : "DRAW";

        if (predictedResult === realResult) {
          return system.result;
        }

        return 0;
      };

      const hist = predictions
        .map((prediction) => {
          const match = matchMap[prediction.matchId];

          if (!match) return null;

          return {
            matchId: prediction.matchId,
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            homeLogo: match.homeLogo,
            awayLogo: match.awayLogo,
            predictedHome: prediction.predictedHome,
            predictedAway: prediction.predictedAway,
            realHome: match?.score?.home ?? 0,
            realAway: match?.score?.away ?? 0,
            points: calculate(prediction, match),
            status: match.status,
            kickoff: match.kickoff,
          };
        })
        .filter(Boolean)
        .sort(
          (a, b) => new Date(b.kickoff) - new Date(a.kickoff)
        );

      setHistory(hist);
    } catch (err) {
      console.error("Erreur chargement historique", err);
    } finally {
      setLoading(false);
    }
  };

  const finishedMatches = history.filter(
    (item) => item.status === "FINISHED"
  );

  const totalPoints = finishedMatches.reduce(
    (total, item) => total + item.points,
    0
  );

  const formatDate = (date) => {
    if (!date) return "Date non disponible";

    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderHeader = () => (
    <View>
      <LinearGradient
        colors={["#142b52", "#244d83", "#3478c8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>Mes pronostics</Text>
        <Text style={styles.heroSubtitle}>
          Retrouvez vos pronostics et suivez vos performances.
        </Text>

        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>
              {history.length}
            </Text>
            <Text style={styles.heroStatLabel}>Pronostics</Text>
          </View>

          <View style={styles.heroDivider} />

          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>
              {finishedMatches.length}
            </Text>
            <Text style={styles.heroStatLabel}>Terminés</Text>
          </View>

          <View style={styles.heroDivider} />

          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>
              {totalPoints}
            </Text>
            <Text style={styles.heroStatLabel}>Points gagnés</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.sectionHeading}>
        <View>
          <Text style={styles.sectionEyebrow}>VOTRE PARCOURS</Text>
          <Text style={styles.sectionTitle}>Historique des matchs</Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>{history.length}</Text>
        </View>
      </View>
    </View>
  );

  const renderMatch = ({ item }) => {
    const isFinished = item.status === "FINISHED";
    const hasWon = item.points > 0;

    return (
      <View style={styles.matchCard}>
        <View style={styles.matchHeader}>
          <Text style={styles.matchDate}>
            {formatDate(item.kickoff)}
          </Text>

          <View
            style={[
              styles.statusBadge,
              item.status === "FINISHED" && styles.statusFinished,
              item.status === "LIVE" && styles.statusLive,
              item.status === "SCHEDULED" && styles.statusScheduled,
            ]}
          >
            {item.status === "LIVE" && (
              <View style={styles.liveDot} />
            )}
            <Text
              style={[
                styles.statusText,
                item.status === "FINISHED" && styles.statusFinishedText,
                item.status === "LIVE" && styles.statusLiveText,
                item.status === "SCHEDULED" && styles.statusScheduledText,
              ]}
            >
              {statusLabel[item.status] || item.status}
            </Text>
          </View>
        </View>

        <View style={styles.matchContent}>
          <View style={styles.teamContainer}>
            <Image
              source={{
                uri:
                  item.homeLogo ||
                  "https://via.placeholder.com/50",
              }}
              style={styles.teamLogo}
            />
            <Text style={styles.teamName} numberOfLines={2}>
              {teamName[item.homeTeam] || item.homeTeam}
            </Text>
          </View>

          <View style={styles.scoresContainer}>
            <View style={styles.scoreBlock}>
              <Text style={styles.scoreLabel}>MON PRONO</Text>
              <Text style={styles.predictedScore}>
                {item.predictedHome} - {item.predictedAway}
              </Text>
            </View>

            <View style={styles.scoreSeparator} />

            <View style={styles.scoreBlock}>
              <Text style={styles.scoreLabel}>SCORE RÉEL</Text>
              <Text style={styles.realScore}>
                {isFinished
                  ? `${item.realHome} - ${item.realAway}`
                  : "—"}
              </Text>
            </View>
          </View>

          <View style={styles.teamContainer}>
            <Image
              source={{
                uri:
                  item.awayLogo ||
                  "https://via.placeholder.com/50",
              }}
              style={styles.teamLogo}
            />
            <Text style={styles.teamName} numberOfLines={2}>
              {teamName[item.awayTeam] || item.awayTeam}
            </Text>
          </View>
        </View>

        {isFinished && (
          <View
            style={[
              styles.pointsContainer,
              hasWon ? styles.pointsWon : styles.pointsLost,
            ]}
          >
            <Text style={styles.pointsIcon}>
              {hasWon ? "✓" : "✕"}
            </Text>

            <Text
              style={[
                styles.pointsText,
                hasWon ? styles.pointsWonText : styles.pointsLostText,
              ]}
            >
              {hasWon
                ? `+${item.points} ${item.points === 1 ? "point" : "points"} ${item.points === 1 ? "gagné" : "gagnés"}`
                : "Aucun point gagné"}
            </Text>
          </View>
        )}

        {!isFinished && (
          <View style={styles.pendingContainer}>
            <Text style={styles.pendingText}>
              {item.status === "LIVE"
                ? "Ton pronostic est en cours..."
                : "En attente du résultat"}
            </Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Precedent />
        <ActivityIndicator size="large" color="#3478c8" />
        <Text style={styles.loadingText}>
          Chargement de tes pronostics...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#142b52" />
      <Precedent />

      <FlatList
        data={history}
        keyExtractor={(item) => String(item.matchId)}
        renderItem={renderMatch}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>⚽</Text>
            <Text style={styles.emptyTitle}>
              Aucun pronostic pour le moment
            </Text>
            <Text style={styles.emptyText}>
              Tes pronostics apparaîtront ici dès que tu auras joué tes premiers matchs.
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f6fb",
  },

  loadingText: {
    marginTop: 14,
    color: "#64748b",
    fontFamily: "Kanitt",
    fontSize: 14,
  },

  listContent: {
    paddingBottom: 45,
  },

  // HEADER COMMUN AVEC LE CLASSEMENT
  hero: {
    paddingTop: 58,
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
    textAlign: "center",
  },

  heroDivider: {
    width: 1,
    height: 35,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  // TITRE DE SECTION
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 27,
    marginBottom: 14,
  },

  sectionEyebrow: {
    color: "#3478c8",
    fontSize: 10,
    letterSpacing: 1.5,
    fontFamily: "Kanitt",
  },

  sectionTitle: {
    color: "#172b4d",
    fontSize: 21,
    fontFamily: "Kanitt",
    marginTop: 2,
  },

  countBadge: {
    backgroundColor: "#e5eefb",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },

  countText: {
    color: "#3478c8",
    fontSize: 12,
    fontFamily: "Kanitt",
  },

  // CARTE MATCH
  matchCard: {
    marginHorizontal: 14,
    marginBottom: 13,
    padding: 14,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e8edf4",
    shadowColor: "#172b4d",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  matchDate: {
    color: "#8290a4",
    fontSize: 11,
    fontFamily: "Kanito",
    textTransform: "capitalize",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusFinished: {
    backgroundColor: "#e8f7ef",
  },

  statusLive: {
    backgroundColor: "#fff0ed",
  },

  statusScheduled: {
    backgroundColor: "#eaf2ff",
  },

  statusText: {
    fontSize: 10,
    fontFamily: "Kanitt",
  },

  statusFinishedText: {
    color: "#16834b",
  },

  statusLiveText: {
    color: "#df493b",
  },

  statusScheduledText: {
    color: "#3478c8",
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#df493b",
    marginRight: 5,
  },

  matchContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  teamContainer: {
    width: "23%",
    alignItems: "center",
    justifyContent: "center",
  },

  teamLogo: {
    width: 43,
    height: 43,
    resizeMode: "contain",
    marginBottom: 7,
  },

  teamName: {
    color: "#172b4d",
    fontSize: 11,
    fontFamily: "Bella",
    textAlign: "center",
    minHeight: 28,
  },

  scoresContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f8fc",
    borderRadius: 13,
    paddingVertical: 12,
    paddingHorizontal: 3,
  },

  scoreBlock: {
    flex: 1,
    alignItems: "center",
  },

  scoreLabel: {
    color: "#8794a7",
    fontSize: 8,
    fontFamily: "Kanitt",
    letterSpacing: 0.4,
    marginBottom: 6,
  },

  predictedScore: {
    color: "#2868bd",
    fontSize: 16,
    fontFamily: "Kanitt",
  },

  realScore: {
    color: "#172b4d",
    fontSize: 15,
    fontFamily: "Kanitt",
  },

  scoreSeparator: {
    width: 1,
    height: 32,
    backgroundColor: "#dce4ef",
  },

  // POINTS
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 14,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
  },

  pointsWon: {
    backgroundColor: "#e8f7ef",
  },

  pointsLost: {
    backgroundColor: "#fff0ed",
  },

  pointsIcon: {
    fontSize: 12,
    marginRight: 6,
  },

  pointsText: {
    fontSize: 11,
    fontFamily: "Kanitt",
  },

  pointsWonText: {
    color: "#16834b",
  },

  pointsLostText: {
    color: "#d94c43",
  },

  pendingContainer: {
    alignItems: "center",
    marginTop: 13,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eef1f5",
  },

  pendingText: {
    color: "#8290a4",
    fontSize: 11,
    fontFamily: "Kanito",
  },

  // AUCUN PRONOSTIC
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },

  emptyEmoji: {
    fontSize: 45,
  },

  emptyTitle: {
    color: "#172b4d",
    fontSize: 18,
    fontFamily: "Kanitt",
    marginTop: 12,
    textAlign: "center",
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