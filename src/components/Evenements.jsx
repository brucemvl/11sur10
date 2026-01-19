import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import redcard from "../assets/redcard.png"; // Assurez-vous que les images sont importées correctement
import subst from "../assets/sub.png";
import vert from "../assets/flecheverte.png"
import rouge from "../assets/flecherouge.png"
import { portraitsJoueurs } from '../datas/Portraits';
import { useNavigation } from '@react-navigation/native';



const Evenements = ({ match }) => {

  const navigation = useNavigation();


  const getPlayerPhoto = (playerId, fixture) => {
    return (
      match.players
        .flatMap(team => team.players)
        .find(p => p.player.id === playerId)?.player.photo ||
      "https://example.com/default-player.png"
    );
  };

  return (
    <View style={styles.evenementsContainer}>
      <Text style={styles.header}>Temps Forts</Text>
      <View style={styles.eventsContainer}>
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          data={match.events}
          keyExtractor={(item) => item.id}
          renderItem={({ item: element }) => {
            const isHomeTeam = element.team.name === match.teams.home.name;

            return (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Text style={styles.elapsedTime}>{element.time.elapsed}' {element.time.extra ? `+${element.time.extra}` : ""}</Text>

                <View style={isHomeTeam ? styles.domicile : styles.exterieur} key={element.id}>

                  <View style={{ width: "100%", justifyContent: "center"}}>
                    {element.type === "Goal" && element.detail != "Missed Penalty" ?
                      <View style={{ flexDirection: "row", paddingBlock: 3, paddingInline: 15, height: 40, justifyContent: "space-between", backgroundColor: element.type === "Goal" && element.detail != "Missed Penalty" ? "black" : null }}>
                        <Text style={{ fontFamily: "Kanitalik", fontSize: 17, color: "white", textShadowColor: "rgba(157, 157, 157, 1)", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 }}>⚽   But !</Text>
                        <Image source={{ uri: element.team.logo }} style={{ height: 25, width: 25, objectFit: "contain" }} />

                      </View>
                      :
                      element.detail === "Yellow Card" || element.detail === "Red Card" ?
                        <View style={{ flexDirection: "row", borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingBlock: 3, marginInline: 10, borderBottomWidth: 1, borderColor: "black", alignItems: "center", justifyContent: "space-between" }}>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                              source={element.detail === "Red Card" ? redcard : { uri: "https://img.icons8.com/color/48/soccer-yellow-card.png" }}
                              style={styles.cardIcon}
                            />
                            {element.detail === "Red Card" ?
                              <Text style={{ fontFamily: "Bangers", fontSize: 15, color: "black", paddingInline: 2 }}>Carton Rouge !</Text>
                              :
                              <Text style={{ fontFamily: "Bangers", fontSize: 14, color: "black", paddingInline: 2 }}>Carton Jaune</Text>
                            }
                          </View>
                          <Image source={{ uri: element.team.logo }} style={{ height: 25, width: 25, objectFit: "contain" }} />

                        </View>
                        :
                        element.detail === "Goal Disallowed - offside" ||
                          element.detail === "Goal cancelled" ||
                          element.detail === "Goal Disallowed" ||
                          element.detail === "Penalty confirmed" || element.detail === "Goal confirmed" || element.detail === "Penalty cancelled" ?
                          <View style={{ flexDirection: "row", borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingBlock: 8, marginInline: 10, borderBottomWidth: 1, borderColor: "black", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>

                              <Image
                                source={{
                                  uri: "https://img.icons8.com/external-kosonicon-outline-kosonicon/64/external-var-replay-soccer-and-football-match-kosonicon-outline-kosonicon.png"
                                }}
                                style={styles.varIcon}
                              />
                              <Text style={{ fontFamily: "Bangers", fontSize: 14, color: "black", paddingInline: 2 }}>Arbitrage Video</Text>
                            </View>
                            <Image source={{ uri: element.team.logo }} style={{ height: 25, width: 25, objectFit: "contain" }} />

                          </View>
                          :
                          element.type === "subst" ? <View style={{ flexDirection: "row", borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingBlock: 8, marginInline: 10, borderBottomWidth: 1, borderColor: "black", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>

                              <Image source={subst} style={styles.substitutionIcon} />

                              <Text style={{ fontFamily: "Bangers", fontSize: 14, color: "black", paddingInline: 2 }}>Changement</Text>
                            </View>
                            <Image source={{ uri: element.team.logo }} style={{ height: 25, width: 25, objectFit: "contain" }} />

                          </View> :
                            null}

                    <View style={styles.eventDetails}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {element.detail === "Yellow Card" && (

                          <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id, team: element.team.id })} style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={portraitsJoueurs[element.player.id] || { uri: getPlayerPhoto(element.player.id, match) }} style={{ width: 35, height: 35, borderRadius: 20, marginRight: 5, marginBlock: 4 }} />
                            <Text style={styles.playerName}>{element.player.name}</Text>
                            {element.comments === "Elbowing" ? <Text style={styles.motif}> (Coup de coude)</Text> : element.comments === "Professional handball" ? <Text style={styles.motif}> (Main volontaire)</Text> : element.comments === "Off the ball foul" ? <Text style={styles.motif}> (Faute sans ballon)</Text> : element.comments === "Handling" ? <Text style={styles.motif}> (Main)</Text> : element.comments === "Unsportsmanlike conduct" ? <Text style={styles.motif}> (Comportement Antisportif)</Text> : element.comments === "Handball" ? <Text style={styles.motif}> (Main)</Text> : element.comments === "Foul" ? <Text style={styles.motif}> (Faute)</Text> : element.comments === "Argument" ? <Text style={styles.motif}> (Protestation)</Text> : element.comments === "Violent conduct" ? <Text style={styles.motif}> (Comportement violent)</Text> : element.comments === "Simulation" || element.comments === "Diving" ? <Text style={styles.motif}> averti pour simulation</Text> : element.comments === "Professional foul last man" ? <Text style={styles.motif}> (Faute dernier defenseur)</Text> : element.comments === "Time wasting" || element.comments === "Delay of game" ? <Text style={styles.motif}> averti pour avoir joué la montre</Text> : element.comments === "Roughing" ? <Text style={styles.motif}> averti pour un contact brutal</Text> : element.comments === "Tripping" ? <Text style={styles.motif}> sanctionné apres un tacle</Text> : element.comments === "Holding" ? <Text style={styles.motif}> averti pour avoir retenu l'adversaire</Text> : element.comments === "Serious foul" ? <Text style={styles.motif}> (Grosse faute)</Text> : null}
                          </TouchableOpacity>
                        )}
                        {element.detail === "Red Card" && (
                          <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id, team: element.team.id })} style={{ flexDirection: "row", alignItems: "center", paddingBlock: 5 }}>
                            <Image source={portraitsJoueurs[element.player.id] || { uri: getPlayerPhoto(element.player.id, match) }} style={{ width: 35, height: 35, borderRadius: 20, marginRight: 5 }} />
                            <Text style={styles.playerName}>{element.player.name}</Text>
                            {element.comments === "Elbowing" ? <Text style={styles.motif}> (Coup de coude)</Text> : element.comments === "Professional handball" ? <Text style={styles.motif}> (Main volontaire)</Text> : element.comments === "Off the ball foul" ? <Text style={styles.motif}> (Faute sans ballon)</Text> : element.comments === "Unsportsmanlike conduct" ? <Text style={styles.motif}> (Comportement Antisportif)</Text> : element.comments === "Handball" ? <Text style={styles.motif}> (Main)</Text> : element.comments === "Foul" ? <Text style={styles.motif}> (Faute)</Text> : element.comments === "Argument" ? <Text style={styles.motif}> (Protestation)</Text> : element.comments === "Violent conduct" ? <Text style={styles.motif}> (Comportement violent)</Text> : element.comments === "Simulation" || element.comments === "Diving" ? <Text style={styles.motif}> (Simulation)</Text> : element.comments === "Professional foul last man" ? <Text style={styles.motif}> (Faute dernier defenseur)</Text> : element.comments === "Time wasting" ? <Text style={styles.motif}> (Joue la montre)</Text> : element.comments === "Roughing" ? <Text style={styles.motif}>  expulsé pour un contact brutal</Text> : element.comments === "Tripping" ? <Text style={styles.motif}> (Tacle)</Text> : element.comments === "Holding" ? <Text style={styles.motif}> (Retient l'adversaire)</Text> : element.comments === "Serious foul" ? <Text style={styles.motif}> (Grosse faute)</Text> : null}

                          </TouchableOpacity>
                        )}
                        {element.type === "Goal" && (
                          element.detail === "Missed Penalty" ? <View style={styles.goalContainer}>
                            <Text style={styles.goalText}>
                              ❌ Penalty Raté!
                            </Text>
                            {element.assist?.name && (
                              <Text style={styles.assistText}> ({element.assist.name})</Text>
                            )}
                          </View> :
                            <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id, team: element.team.id })} style={styles.goalContainer}>
                              <Image source={portraitsJoueurs[element.player.id] || { uri: getPlayerPhoto(element.player.id, match) }} style={{ width: 35, height: 35, borderRadius: 20 }} />
                              <Text style={styles.goalText}>
                                {element.player.name} {element.detail === "Penalty" ? <Text style={{ fontFamily: "Kanitalic" }}>(Pen.)</Text> : element.detail === "Own Goal" ? <Text style={{ fontFamily: "Kanitalic", color: "red" }}>(csc)</Text> : null}
                              </Text>
                              {element.assist?.name && (
                                <Text style={styles.assistText}>(Passe Dec: <Text style={{ fontFamily: "Kanitt", fontSize: 11 }}>{element.assist.name}</Text>)</Text>
                              )}
                            </TouchableOpacity>
                        )}
                        {element.type === "subst" && (
                          <View style={styles.substitutionContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: element.assist.id, team: element.team.id })} style={{ alignItems: "center", justifyContent: "center" }}>
                              <Text style={styles.playerName}>{element.assist.name}</Text>
                              <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                <Image source={portraitsJoueurs[element.assist.id] || { uri: getPlayerPhoto(element.assist.id, match) }} style={{height: 30, width: 30, borderRadius: 15}}/>
                              <Image source={vert} style={{ height: 15, width: 20 }} />
                              </View>
                              <Text style={{ color: "rgb(57, 200, 73)", fontFamily: "Kanitalic" }}>IN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id, team: element.team.id })} style={{ alignItems: "center" }}>
                              <Text style={styles.playerName}>{element.player.name}</Text>
                                                            <View style={{flexDirection: "row-reverse", alignItems: "center", gap: 5}}>
                                                                                              <Image source={portraitsJoueurs[element.player.id] || { uri: getPlayerPhoto(element.player.id, match) }} style={{height: 30, width: 30, borderRadius: 15}}/>

                              <Image source={rouge} style={{ height: 15, width: 20, transform: [{ rotate: "180deg" }] }} />
                              </View>
                              <Text style={{ color: "rgb(201, 38, 38)", fontFamily: "Kanitalic" }}>OUT</Text>

                            </TouchableOpacity>
                          </View>
                        )}
                        {(element.detail === "Goal Disallowed - offside" ||
                          element.detail === "Goal cancelled" ||
                          element.detail === "Goal Disallowed" ||
                          element.detail === "Penalty confirmed" || element.detail === "Goal confirmed" || element.detail === "Penalty cancelled") && (
                            <View style={styles.varContainer}>

                              <Text style={styles.varText}>{element.detail === "Goal Disallowed - offside" ? "❌  But refusé (Hors-Jeu)" : element.detail === "Goal cancelled" || element.detail === "Goal Disallowed" ? "❌   But annulé" : element.detail === "Penalty confirmed" ? "Penalty confirmé !" : element.detail === "Penalty cancelled" ? "❌   Penalty annulé !" : element.detail === "Goal confirmed" ? "But Confirmé !" : element.detail}</Text>
                            </View>
                          )}
                      </View>

                    </View>

                  </View>

                </View>
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
    paddingInline: 5,
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
    backgroundColor: '#ffffffff',
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 310,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    overflow: "hidden" ,
    marginRight: 20
  },
  exterieur: {
    backgroundColor: '#d3d3d3ff',
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 310,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    overflow: "hidden" ,
    marginLeft: 20


  },
  elapsedTime: {
    fontSize: 11,
    fontFamily: "Kanitalic",
    backgroundColor: "darkred",
    color: "white",
    borderRadius: 8,
    textAlign: "center",
    padding: 5
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    justifyContent: "space-between"
  },
  cardIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: 0 }, // Ombre décalée sur l'axe Y
    shadowOpacity: 0.9, // Opacité de l'ombre
    shadowRadius: 2,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBlock: 10,
    gap: 5
  },
  goalText: {
    fontSize: 12,
    fontFamily: "Kanitt",
    color: '#333',
  },
  assistText: {
    fontSize: 10,
    fontFamily: "Kanito",
    color: '#666',
  },
  substitutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-evenly",
    width: "85%"
  },
  substitutionIcon: {
    width: 28,
    height: 28,
    marginHorizontal: 5,
  },
  varContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  varIcon: {
    width: 28,
    height: 28,
    marginRight: 5,
  },
  varText: {
    fontSize: 13,
    color: '#333',
    fontFamily: "Kanito"
  },
  playerName: {
    fontSize: 11,
    color: '#333',
    fontFamily: "Kanitt"
  },
  motif: {
    fontFamily: "Kanitalic",
    color: "#666",
    fontSize: 12
  }
});

export default Evenements;