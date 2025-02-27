import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import redcard from "../assets/redcard.png"; // Assurez-vous que les images sont importées correctement
import subst from "../assets/sub.png";
import vert from "../assets/flecheverte.png"
import rouge from "../assets/flecherouge.png"


const Evenements = ({ match }) => {
  return (
    <View style={styles.evenementsContainer}>
      <Text style={styles.header}>Temps Forts</Text>
      <View style={styles.eventsContainer}>
        <FlatList
          data={match.events}
          keyExtractor={(item) => item.id}
          renderItem={({ item: element }) => {
            const isHomeTeam = element.team.name === match.teams.home.name;

            return (
              <View style={isHomeTeam ? styles.domicile : styles.exterieur} key={element.id}>
                <View>
                  <View style={{ flexDirection: "row", gap: 15 }}>
                    <Text style={styles.elapsedTime}>{element.time.elapsed}' {element.time.extra ? `+${element.time.extra}` : ""}</Text>
                    {element.type === "Goal" && element.detail != "Missed Penalty" ? <Text style={{ fontFamily: "Kanitalik", fontSize: 16 }}>But !</Text> : null}
                  </View>
                  <View style={styles.eventDetails}>
                    {element.detail === "Yellow Card" && (
                      <>
                        <Image
                          source={{ uri: "https://img.icons8.com/color/48/soccer-yellow-card.png" }}
                          style={styles.cardIcon}
                        />
                        <Text style={styles.playerName}>{element.player.name}</Text>
                        {element.comments === "Handball" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Main)</Text> : element.comments === "Foul" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Faute)</Text> : element.comments === "Argument" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Protestation)</Text> : element.comments === "Violent conduct" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Comportement violent)</Text> : element.comments === "Simulation" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Simulation)</Text> : null}
                      </>
                    )}
                    {element.detail === "Red Card" && (
                      <>
                        <Image source={redcard} style={styles.cardIcon} />
                        <Text style={styles.playerName}>{element.player.name}</Text>
                        {element.comments === "Handball" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Main)</Text> : element.comments === "Foul" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Faute)</Text> : element.comments === "Argument" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Protestation)</Text> : element.comments === "Violent conduct" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Comportement violent)</Text> : element.comments === "Simulation" ? <Text style={{ fontFamily: "Kanitalic", color: "#666" }}> (Simulation)</Text> : null}

                      </>
                    )}
                    {element.type === "Goal" && (
                      element.detail === "Missed Penalty" ? <View style={styles.goalContainer}>
                        <Text style={styles.goalText}>
                          Penalty Raté!
                        </Text>
                        {element.assist?.name && (
                          <Text style={styles.assistText}> ({element.assist.name})</Text>
                        )}
                      </View> :
                        <View style={styles.goalContainer}>
                          <Text style={styles.goalText}>
                            ⚽ {element.player.name} {element.detail === "Penalty" ? <Text style={{fontFamily: "Kanitalic"}}>(Pen.)</Text> : ""}
                          </Text>
                          {element.assist?.name && (
                            <Text style={styles.assistText}> (Passe Dec: {element.assist.name})</Text>
                          )}
                        </View>
                    )}
                    {element.type === "subst" && (
                      <View style={styles.substitutionContainer}>
                        <View style={{ alignItems: "center" }}>
                          <Text style={styles.playerName}>{element.player.name}</Text>
                          <Image source={vert} style={{ height: 15, width: 20 }} />
                          <Text style={{ color: "rgb(57, 200, 73)", fontFamily: "Kanitalic" }}>IN</Text>
                        </View>
                        <Image source={subst} style={styles.substitutionIcon} />
                        <View style={{ alignItems: "center" }}>
                          <Text style={styles.playerName}>{element.assist.name}</Text>
                          <Image source={rouge} style={{ height: 15, width: 20, transform: [{ rotate: "180deg" }] }} />
                          <Text style={{ color: "rgb(201, 38, 38)", fontFamily: "Kanitalic" }}>OUT</Text>

                        </View>
                      </View>
                    )}
                    {(element.detail === "Goal Disallowed - offside" ||
                      element.detail === "Goal cancelled" ||
                      element.detail === "Penalty confirmed" || element.detail === "Goal confirmed") && (
                        <View style={styles.varContainer}>
                          <Image
                            source={{
                              uri: "https://img.icons8.com/external-kosonicon-outline-kosonicon/64/external-var-replay-soccer-and-football-match-kosonicon-outline-kosonicon.png"
                            }}
                            style={styles.varIcon}
                          />
                          <Text style={styles.varText}>{element.detail === "Goal Disallowed - offside" ? "But refusé (Hors-Jeu)" : element.detail === "Goal cancelled" ? "But annulé" : element.detail === "Penalty confirmed" ? "Penalty confirmé !" : element.detail === "Goal confirmed" ? "But Confirmé !" : element.detail}</Text>
                        </View>
                      )}
                  </View>
                </View>
                <Image source={{ uri: element.team.logo }} style={{ height: 30, width: 30, objectFit: "contain" }} />

              </View>

            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  evenementsContainer: {
    flex: 1,
    paddingInline: 10,
    alignItems: "center"
  },
  header: {
    fontSize: 18,
    fontFamily: "Kanitt",
    marginBottom: 10,
  },
  eventsContainer: {
    marginTop: 10,
  },
  domicile: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  exterieur: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between"

  },
  elapsedTime: {
    fontSize: 12,
    fontFamily: "Kanitalic",
    backgroundColor: "black",
    color: "white",
    paddingLeft: 2,
    borderRadius: 5,
    width: 34,
    height: 32,
    textAlign: "center",
    paddingTop: 7
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardIcon: {
    width: 28,
    height: 28,
    marginLeft: 5,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: 0 }, // Ombre décalée sur l'axe Y
    shadowOpacity: 0.9, // Opacité de l'ombre
    shadowRadius: 2,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBlock: 10
  },
  goalText: {
    fontSize: 14,
    fontFamily: "Kanitt",
    color: '#333',
  },
  assistText: {
    fontSize: 12,
    fontFamily: "Kanito",
    color: '#666',
  },
  substitutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    width: "80%"
  },
  substitutionIcon: {
    width: 28,
    height: 28,
    marginHorizontal: 5,
  },
  varContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  varIcon: {
    width: 28,
    height: 28,
    marginRight: 5,
  },
  varText: {
    fontSize: 12,
    color: '#333',
    fontFamily: "Kanito"
  },
  playerName: {
    fontSize: 14,
    color: '#333',
    fontFamily: "Kanitt"
  },
});

export default Evenements;