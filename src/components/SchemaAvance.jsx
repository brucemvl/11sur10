import React from 'react';
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




import { useNavigation } from '@react-navigation/native';



function SchemaAvance({ compoDom, compoExt, match, colors }) {

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

        compo?.startXI.forEach(item => {
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
            top = (fieldHeight * 0.79); // Attaquant
        } else if (linePosition === 5) {
            top = (fieldHeight * 0.9); // Attaquant
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
  96: toulouse

};


    return (
        <View style={styles.container}>
            <Text style={{fontFamily: "Kanitt"}}>Les Compos sont disponibles!</Text>
            
            {/* Disposition des terrains de football l'un sous l'autre */}
            <View style={styles.fieldsContainer}>
                <ImageBackground source={field} style={{ objectFit: "contain" }} >
                    <View style={[styles.field, { width: fieldWidth, height: fieldHeight }]}>

                        {/* Gardien */}
                        {linesDom.G.map((player, index) => (
                           <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.G.length, 1), { alignItems: "center", width: 55 }]}>
                           {match.league.id === 61 ?
                               compoDom.team.id === 108 || compoDom.team.id === 112 || compoDom.team.id === 96 || compoDom.team.id === 83 || compoDom.team.id === 85 || compoDom.team.id === 80 || compoDom.team.id === 91 || compoDom.team.id === 116 || compoDom.team.id === 81 || compoDom.team.id === 84 || compoDom.team.id === 106 || compoDom.team.id === 79 || compoDom.team.id === 114 || compoDom.team.id === 97 ? <Image source={teamImages[compoDom.team.id]} style={{ width: 35, height: 35 }}/> 
                                :
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> : <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> }
                           <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.name.split(' ').slice(-1).join(' ')}</Text>
                       </TouchableOpacity>
                        ))}
                        {/* Défenseurs */}
                        {linesDom.D.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.D.length, 2), { alignItems: "center", width: 50 }]}>
                                {match.league.id === 61 ?
                               compoDom.team.id === 108 || compoDom.team.id === 112 || compoDom.team.id === 96 || compoDom.team.id === 83 || compoDom.team.id === 85 || compoDom.team.id === 80 || compoDom.team.id === 91 || compoDom.team.id === 116 || compoDom.team.id === 81 || compoDom.team.id === 84 || compoDom.team.id === 106 || compoDom.team.id === 79 || compoDom.team.id === 114 || compoDom.team.id === 97 ? <Image source={teamImages[compoDom.team.id]} style={{ width: 35, height: 35 }}/> 
                                :
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> : <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> }
                                <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Milieux */}
                        {linesDom.M.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.M.length, 3), { alignItems: "center", width: 50 }]}>
                                {match.league.id === 61 ?
                               compoDom.team.id === 108 || compoDom.team.id === 112 || compoDom.team.id === 96 || compoDom.team.id === 83 || compoDom.team.id === 85 || compoDom.team.id === 80 || compoDom.team.id === 91 || compoDom.team.id === 116 || compoDom.team.id === 81 || compoDom.team.id === 84 || compoDom.team.id === 106 || compoDom.team.id === 79 || compoDom.team.id === 114 || compoDom.team.id === 97 ? <Image source={teamImages[compoDom.team.id]} style={{ width: 35, height: 35 }}/> 
                                :
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> : <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> }
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.id === 762 ? "Vini Jr" :  player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Attaquants */}
                        {linesDom.F.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.F.length, 4), { alignItems: "center", width: 53 }]}>
                                {match.league.id === 61 ?
                               compoDom.team.id === 108 || compoDom.team.id === 112 || compoDom.team.id === 96 || compoDom.team.id === 83 || compoDom.team.id === 85 || compoDom.team.id === 80 || compoDom.team.id === 91 || compoDom.team.id === 116 || compoDom.team.id === 81 || compoDom.team.id === 84 || compoDom.team.id === 106 || compoDom.team.id === 79 || compoDom.team.id === 114 || compoDom.team.id === 97 ? <Image source={teamImages[compoDom.team.id]} style={{ width: 35, height: 35 }}/> 
                                :
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> : <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> }
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
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.F.length, 4), { alignItems: "center", width: 53 }]}>
                                {match.league.id === 61 ?
                               compoExt.team.id === 108 || compoExt.team.id === 112 || compoExt.team.id === 96 || compoExt.team.id === 83 || compoExt.team.id === 85 || compoExt.team.id === 80 || compoExt.team.id === 91 || compoExt.team.id === 116 || compoExt.team.id === 81 || compoExt.team.id === 84 || compoExt.team.id === 106 || compoExt.team.id === 79 || compoExt.team.id === 114 || compoExt.team.id === 97 ? <Image source={teamImages[compoExt.team.id]} style={{ width: 35, height: 35 }}/> 
                                :
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> : <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> }
                                <Text style={styles.playerName}>{player.id === 762 ? "Vini Jr" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Milieux */}
                        {linesExt.M.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.M.length, 3), { alignItems: "center", width: 50 }]}>
                                {match.league.id === 61 ?
                               compoExt.team.id === 108 || compoExt.team.id === 112 || compoExt.team.id === 96 || compoExt.team.id === 83 || compoExt.team.id === 85 || compoExt.team.id === 80 || compoExt.team.id === 91 || compoExt.team.id === 116 || compoExt.team.id === 81 || compoExt.team.id === 84 || compoExt.team.id === 106 || compoExt.team.id === 79 || compoExt.team.id === 114 || compoExt.team.id === 97 ? <Image source={teamImages[compoExt.team.id]} style={{ width: 35, height: 35 }}/> 
                                :
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> : <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> }
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.id === 762 ? "Vini Jr" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Défenseurs */}
                        {linesExt.D.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.D.length, 2), { alignItems: "center", width: 50 }]}>
                                {match.league.id === 61 ?
                               compoExt.team.id === 108 || compoExt.team.id === 112 || compoExt.team.id === 96 || compoExt.team.id === 83 || compoExt.team.id === 85 || compoExt.team.id === 80 || compoExt.team.id === 91 || compoExt.team.id === 116 || compoExt.team.id === 81 || compoExt.team.id === 84 || compoExt.team.id === 106 || compoExt.team.id === 79 || compoExt.team.id === 114 || compoExt.team.id === 97 ? <Image source={teamImages[compoExt.team.id]} style={{ width: 35, height: 35 }}/> 
                                :
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> : <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> }
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Gardien */}
                        {linesExt.G.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.G.length, 1), { alignItems: "center", width: 55 }]}>
                                {match.league.id === 61 ?
                               compoExt.team.id === 108 || compoExt.team.id === 112 || compoExt.team.id === 96 || compoExt.team.id === 83 || compoExt.team.id === 85 || compoExt.team.id === 80 || compoExt.team.id === 91 || compoExt.team.id === 116 || compoExt.team.id === 81 || compoExt.team.id === 84 || compoExt.team.id === 106 || compoExt.team.id === 79 || compoExt.team.id === 114 || compoExt.team.id === 97 ? <Image source={teamImages[compoExt.team.id]} style={{ width: 35, height: 35 }}/> 
                                :
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> : <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View> }
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
        width: 21,  // Taille des joueurs
        height: 21,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2
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