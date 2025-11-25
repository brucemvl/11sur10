import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import field from "../assets/field.webp"
import psg from "../assets/maillots/psg.png"
import marseille from "../assets/maillots/marseille.png"
import lille from "../assets/maillots/lille.png"
import lyon from "../assets/maillots/lyon.png"
import pfc from "../assets/maillots/pfc.png"
import lens from "../assets/maillots/lens.png"
import nice from "../assets/maillots/nice.png"
import brest from "../assets/maillots/brest.png"
import monaco from "../assets/maillots/monaco.png"
import nantes from "../assets/maillots/nantes.png"
import lorient from "../assets/maillots/lorient.png"
import auxerre from "../assets/maillots/auxerre.png"
import metz from "../assets/maillots/metz.png"
import toulouse from "../assets/maillots/toulouse.png"
import lehavre from "../assets/maillots/lehavre.png"
import angers from "../assets/maillots/angers.png"
import strasbourg from "../assets/maillots/strasbourg.png"
import rennes from "../assets/maillots/rennes.png"

import { useNavigation } from '@react-navigation/native';
import {portraitsJoueurs} from "../datas/Portraits"



function SchemaAvance({ compoDom, compoExt, match, colors, id }) {

    const range = [1, 2, 3, 4, 5];

      const navigation = useNavigation();
    

    // Récupération des dimensions de l'écran pour un ajustement réactif
    const { width } = Dimensions.get('window');
    const fieldWidth = width * 0.47; // Chaque terrain occupe 80% de la largeur de l'écran
    const fieldHeight = fieldWidth * 1.2; // Hauteur ajustée du terrain pour lui donner une forme rectangulaire

    // Organiser les joueurs par ligne
    const organizePlayersByLine = (compo) => {
        const lines = { G: [], D: [], M: [], F: [] };
        console.log(match)

        compo?.startXI?.forEach(item => {
            const { player } = item;
            if (player.pos === 'G') lines.G.push(player); // Gardien
            if (player.pos === 'D') lines.D.push(player); // Défense
            if (player.pos === 'M') lines.M.push(player); // Milieu
            if (player.pos === 'F') lines.F.push(player); // Attaquant
        });

        return lines;
    };


    const linesDom = organizePlayersByLine(compoDom);
    const linesExt = organizePlayersByLine(compoExt);


    // Fonction pour calculer la position horizontale des joueurs dans chaque ligne
    const generatePositionStyle = (index, numPlayersInLine, linePosition) => {
        const playerWidth = 53;  // Largeur du joueur
        const totalPlayerWidth = playerWidth * numPlayersInLine;
        const totalSpacing = fieldWidth - totalPlayerWidth; // Espace restant sur le terrain
        const spaceBetweenPlayers = totalSpacing / (numPlayersInLine + 1); // Espacement entre les joueurs

        // Calculer la position horizontale
        const left = spaceBetweenPlayers * (index + 1) + playerWidth * index; // Espacement ajusté

        // Ajuster la position verticale en fonction de la ligne
        let top;
        if (linePosition === 1) {
            top = (fieldHeight * 0.02); // Gardien
        } else if (linePosition === 2) {
            top = (fieldHeight * 0.24); // Défense
        } else if (linePosition === 3) {
            top = (fieldHeight * 0.53); // Milieu
        } else if (linePosition === 4) {
            top = (fieldHeight * 0.77); // Attaquant
        } else if (linePosition === 5) {
            top = (fieldHeight * 0.88); // Attaquant
        }
        else {
            top = (fieldHeight * linePosition) / 5;
        }

        return {
            position: 'absolute',
            left,
            top,
        };
    };

    const teamImages = {
  85: psg,
  114: pfc,
  91: monaco,
  116: lens,
  81: marseille,
  106: brest,
  84: nice,
  83: nantes,
  80: lyon,
  79: lille,
  97: lorient,
  108: auxerre,
  112: metz,
  96: toulouse,
  77: angers,
  95: strasbourg,
  111: lehavre,
  94: rennes

};

const [squadDom, setSquadDom] = useState()
const [squadExt, setSquadExt] = useState([])

useEffect(() => {
    const fetchSquad = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/players/squads?team=${compoDom.team.id}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setSquadDom(json.response[0]);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchSquad();
  }, [id]);



  useEffect(() => {
    const fetchSquadExt = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/players/squads?team=${match.teams.away.id}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setSquadExt(json.response[0]);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchSquadExt();
  }, [id]);

  if (!squadDom){

    return (
        <Text>Loading</Text>
    )
  }

  console.log (squadDom)
    return (
        <View style={styles.container}>
            <Text style={{fontFamily: "Kanitt"}}>Les Compos sont disponibles!</Text>
            
            {/* Disposition des terrains de football l'un sous l'autre */}
            <View style={styles.fieldsContainer}>
                <ImageBackground source={field} style={{ objectFit: "contain" }} >
                    <View style={[styles.field, { width: fieldWidth, height: fieldHeight }]}>

                        {/* Gardien */}
                        {linesDom.G.map((player, index) => (
                           <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: match.teams.home.id })} style={[generatePositionStyle(index, linesExt.G.length, 1), { alignItems: "center", width: 55 }]}>
                           {match.league.id === 61 ?
                              <Image source={teamImages[compoDom.team.id]} style={{ width: 40, height: 40 }}/> 
                                :
                                                                                                                        <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.goalDomBorder }]}>

                                   {squadDom.players.map((element) => element.id === player.id ? <Image source={portraitsJoueurs[player.id] || {uri: element.photo}} style={{height: 28, width: 28, borderRadius: 28}}/> : null)}
                                     </View>}
                           <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.name.split(' ').slice(-1).join(' ')}</Text>
                       </TouchableOpacity>
                        ))}
                        {/* Défenseurs */}
                        {linesDom.D.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: match.teams.home.id })} style={[generatePositionStyle(index, linesDom.D.length, 2), { alignItems: "center", width: 50 }]}>
                                {match.league.id === 61 ?
                              <Image source={teamImages[compoDom.team.id]} style={{ width: 40, height: 40 }}/> 
                                :
                                                                                       <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderDom }]}>
                                 
                                   {squadDom.players.map((element) => element.id === player.id ? <Image source={portraitsJoueurs[player.id] || {uri: element.photo}} style={{height: 28, width: 28, borderRadius: 28}}/> : null)}
                                     </View>}
                           <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.name.split(' ').slice(-1).join(' ')}</Text>
                       </TouchableOpacity>
                        ))}
                        {/* Milieux */}
                        {linesDom.M.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: match.teams.home.id })} style={[generatePositionStyle(index, linesDom.M.length, 3), { alignItems: "center", width: 50 }]}>
                                {match.league.id === 61 ?
                              <Image source={teamImages[compoDom.team.id]} style={{ width: 40, height: 40 }}/> 
                                :
                                                                                       <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderDom }]}>
                                 
                                   {squadDom.players.map((element) => element.id === player.id ? <Image source={portraitsJoueurs[player.id] || {uri: element.photo}} style={{height: 28, width: 28, borderRadius: 28}}/> : null)}
                                     </View>}
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.id === 762 ? "Vini Jr" :  player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Attaquants */}
                        {linesDom.F.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: match.teams.home.id })} style={[generatePositionStyle(index, linesDom.F.length, 4), { alignItems: "center", width: 53 }]}>
                                {match.league.id === 61 ?
                              <Image source={teamImages[compoDom.team.id]} style={{ width: 40, height: 40 }}/> 
                                :
                                                                                       <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderDom }]}>
                                 
                                   {squadDom.players.map((element) => element.id === player.id ? <Image source={portraitsJoueurs[player.id] || {uri: element.photo}} style={{height: 28, width: 28, borderRadius: 28}}/> : null)}
                                     </View>}
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.id === 762 ? "Vini Jr" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ImageBackground>
                {/* Terrain 2 avec compoExt - Miroir du terrain 1 */}
                <ImageBackground source={field} style={{ objectFit: "contain" }}>
                    <View style={[styles.field, { width: fieldWidth, height: fieldHeight }]}>
                        {/* Attaquants (inversés pour compoExt) */}
                        {linesExt.F.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: match.teams.away.id })} style={[generatePositionStyle(index, linesExt.F.length, 4), { alignItems: "center", width: 53 }]}>
                                {match.league.id === 61 ?
                              <Image source={teamImages[compoExt.team.id]} style={{ width: 40, height: 40 }}/> 
                                :
                                                                                       <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderExt }]}>
                                 
                                   {squadExt.players.map((element) => element.id === player.id ? <Image source={portraitsJoueurs[player.id] || {uri: element.photo}} style={{height: 28, width: 28}}/> : null)}
                                     </View>}
                                <Text style={styles.playerName}>{player.id === 762 ? "Vini Jr" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Milieux */}
                        {linesExt.M.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: match.teams.away.id })} style={[generatePositionStyle(index, linesExt.M.length, 3), { alignItems: "center", width: 50 }]}>
                                {match.league.id === 61 ?
                              <Image source={teamImages[compoExt.team.id]} style={{ width: 40, height: 40 }}/> 
                                :
                                                                                       <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderExt }]}>
                                 
                                   {squadExt.players.map((element) => element.id === player.id ? <Image source={portraitsJoueurs[player.id] || {uri: element.photo}} style={{height: 28, width: 28}}/> : null)}
                                     </View>}
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.id === 762 ? "Vini Jr" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Défenseurs */}
                        {linesExt.D.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: match.teams.away.id })} style={[generatePositionStyle(index, linesExt.D.length, 2), { alignItems: "center", width: 50 }]}>
                                {match.league.id === 61 ?
                              <Image source={teamImages[compoExt.team.id]} style={{ width: 40, height: 40 }}/> 
                                :
                                                                                       <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderExt }]}>
                                 
                                   {squadExt.players.map((element) => element.id === player.id ? <Image source={portraitsJoueurs[player.id] || {uri: element.photo}} style={{height: 28, width: 28}}/> : null)}
                                     </View>}
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Gardien */}
                        {linesExt.G.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: match.teams.home.id })} style={[generatePositionStyle(index, linesExt.G.length, 1), { alignItems: "center", width: 55 }]}>
                                {match.league.id === 61 ?
                              <Image source={teamImages[compoExt.team.id]} style={{ width: 40, height: 40 }}/> 
                                :
                                                                                       <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.GoalExtBorder }]}>
                                 
                                   {squadExt.players.map((element) => element.id === player.id ? <Image source={portraitsJoueurs[player.id] || {uri: element.photo}} style={{height: 28, width: 28}}/> : null)}
                                     </View>}
                                <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center"
    },
    coachName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    formation: {
        fontSize: 18,
        marginTop: 10,
    },
    fieldsContainer: {
        flexDirection: 'row', // Disposition des terrains l'un sous l'autre
        justifyContent: 'space-between', // Espacement égal entre les terrains
        marginTop: 20,
        gap: 10
    },
    field: {
        position: 'relative',
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',  // Centrage vertical du terrain
        alignItems: 'center',  // Centrage horizontal du terrain
    },
    player: {
        width: 28,  // Taille des joueurs
        height: 28,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        overflow: "hidden"
    },
    playerName: {
        fontSize: 8.5,
        color: '#fff',
        fontFamily: "Kanito",
        margin: -2
    },
    number: {
        fontSize: 9,
        fontFamily: "Kanitt",
    },
    infos: {
        flexDirection: "row",
        position: "absolute",
        zIndex: 1,
        bottom: 30,
        left: 28,
        height: 12,
        alignItems: "center"
    },
    card: {
        height: 17,
        width: 17
    }
});

export default SchemaAvance;