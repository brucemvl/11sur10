import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ligue1 from "../assets/logoligue1.webp"

function Histo({historique, historique2}) {
    return (
        <View style={{paddingInline: 10, alignItems: "center"}}>
          <Text style={{fontFamily: "Kanitt", fontSize: 18, marginBottom: 10}}>Derniers face-à-face</Text>
            {historique.map((element) => {
                const date = new Date(element.fixture.date);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                return (  
                  <View style={{alignItems: "center", marginBottom: 20}}>
<View style={styles.dateheure}>
                            <Text style={{fontSize: 8.5, fontFamily: "Kanitalic", color: "white"}}>{formattedDate}</Text>
                        </View>  
                    <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.3)']} style={styles.match} key={element.fixture.id}> {/* Ajout de key pour éviter des warnings */}
                            <Image source={element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? ligue1 : { uri: element.league.logo }} style={{width: "8%", height: 30, objectFit: "contain", marginLeft: 2}}/>

                        <Text style={styles.equipeDom}>{element.teams.home.name === "Paris Saint Germain" ? "Paris St Germain" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name}</Text>
                        <Image style={styles.logoDom} source={{ uri: element.teams.home.logo }} />

                        {element.goals.home === element.goals.away ? (
                            <View style={styles.matchScore}>
                                <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text>
                                
                                <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>
                            </View>
                        ) : (
                            <View style={styles.matchScore}>
                                <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                                <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                            </View>
                        )}

                        <Image style={styles.logoExt} source={{ uri: element.teams.away.logo }} />
                        <Text style={styles.equipeExt}>{element.teams.away.name === "Paris Saint Germain" ? "Paris St Germain" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name}</Text>
                    </LinearGradient>
                    </View>
                );
            })}

{historique2.map((element) => {
                const date = new Date(element.fixture.date);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                return (  
                  <View style={{alignItems: "center", marginBottom: 20}}>
<View style={styles.dateheure}>
                            <Text style={{fontSize: 8.5, fontFamily: "Kanitalic", color: "white"}}>{formattedDate}</Text>
                        </View>  
                    <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.3)']} style={styles.match} key={element.fixture.id}> {/* Ajout de key pour éviter des warnings */}
                            <Image source={element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? ligue1 : { uri: element.league.logo }} style={{width: "8%", height: 30, objectFit: "contain", marginLeft: 2}}/>

                        <Text style={styles.equipeDom}>{element.teams.home.name === "Paris Saint Germain" ? "Paris St Germain" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name}</Text>
                        <Image style={styles.logoDom} source={{ uri: element.teams.home.logo }} />

                        {element.goals.home === element.goals.away ? (
                            <View style={styles.matchScore}>
                                <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text>
                                
                                <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>
                            </View>
                        ) : (
                            <View style={styles.matchScore}>
                                <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                                <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                            </View>
                        )}

                        <Image style={styles.logoExt} source={{ uri: element.teams.away.logo }} />
                        <Text style={styles.equipeExt}>{element.teams.away.name === "Paris Saint Germain" ? "Paris St Germain" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name}</Text>
                    </LinearGradient>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    match: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBlock: 8,
        width: "100%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        
    },
    dateheure: {
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 5,
        marginLeft: 2,
        alignItems: "center",
        width: "16%",
        height: 20,
        justifyContent: "center",
        paddingInline: 3
    },
    equipeDom: {
        fontSize: 12,
        width: "25%",
        textAlign: "center",
        fontFamily: "Kanito"
    },
    logoDom: {
        width: "8%",
        height: 30,
        marginRight: 10,
        objectFit: "contain"
    },
    matchScore: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        width: "13%",
        justifyContent: "space-evenly"
    },
    nul: {
        fontSize: 16,
        backgroundColor: 'gray',
        color: "white",
        height: 25,
        width: 20,
        borderRadius: 5,
        textAlign: "center",
        fontFamily: "Kanito"
    },
    winner: {
        fontSize: 16,
        backgroundColor: '#32b642',
        color: "white",
        height: 25,
        width: 20,
        borderRadius: 5,
        textAlign: "center",
        fontFamily: "Kanito"
    },
    looser: {
        fontSize: 16,
        backgroundColor: 'red',
        color: "white",
        height: 25,
        width: 20,
        borderRadius: 5,
        textAlign: "center",
        fontFamily: "Kanito"
    },
    logoExt: {
        width: "8%",
        height: 30,
        marginLeft: 10,
        objectFit: "contain",
    },
    equipeExt: {
        fontSize: 12,
        width: "27%",
        textAlign: "center",
        fontFamily: "Kanito"
    },
});

export default Histo;