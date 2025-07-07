import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import field from "../assets/field.webp"
import yellow from "../assets/yellow.png";
import red from "../assets/redcard.png"
import { useNavigation } from '@react-navigation/native';

import haaland from "../assets/portraits/haaland.png"
import gyokeres from "../assets/portraits/gyokeres.jpg"
import zaire from "../assets/portraits/zaire.png"
import yamal from "../assets/portraits/yamal.jpg"
import dembele from "../assets/portraits/dembele.png"
import bellingham from "../assets/portraits/bellingham.png"
import barcola from "../assets/portraits/barcola.png"
import rodrygo from "../assets/portraits/rodrygo.jpg"
import guller from "../assets/portraits/guller.jpg"
import doue from "../assets/portraits/doue.png"
import kvara from "../assets/portraits/kvara.png"
import goat from "../assets/portraits/goat.jpg"
import darwin from "../assets/portraits/darwin.png"
import salah from "../assets/portraits/salah.png"
import kounde from "../assets/portraits/kounde.jpg"
import endrick from "../assets/portraits/endrick.jpg"
import mbappe from "../assets/portraits/mbappe.png"
import vini from "../assets/portraits/vini.png"
import palmer from "../assets/portraits/palmer.png"
import messi from "../assets/trophees/messi.jpg"
import griezmann from "../assets/portraits/griezmann.png"
import olise from "../assets/portraits/olise.jpg"
import cherki from "../assets/portraits/cherki.jpg"
import rabiot from "../assets/portraits/rabiot.jpg"
import lacazette from "../assets/portraits/lacazette.jpg"
import theo from "../assets/portraits/theo.jpg"
import raphinha from "../assets/portraits/raphinha.png"
import lewandowski from "../assets/portraits/lewandowski.png"
import isak from "../assets/portraits/isak.png"
import ramos from "../assets/portraits/ramos.png"
import garnacho from "../assets/portraits/garnacho.jpg"
import vitinha from "../assets/portraits/vitinha.png"
import pacho from "../assets/portraits/pacho.png"
import joao from "../assets/portraits/joao.png"
import safonov from "../assets/portraits/safonov.png"
import tchouameni from "../assets/portraits/tchouameni.jpg"
import kolo from "../assets/portraits/kolo.png"
import kephren from "../assets/portraits/kephren.png"
import adeyemi from "../assets/portraits/adeyemi.png"
import debruyne from "../assets/portraits/debruyne.png"
import mayulu from "../assets/portraits/mayulu.png"
import diaz from "../assets/portraits/diaz.png"
import macallister from "../assets/portraits/macallister.png"
import gakpo from "../assets/portraits/gakpo.png"
import arnold from "../assets/portraits/arnold.png"
import marmoush from "../assets/portraits/marmoush.png"
import akanji from "../assets/portraits/akanji.png"
import cubarsi from "../assets/portraits/cubarsi.jpg"
import kimpembe from "../assets/portraits/kimpembe.png"
import beraldo from "../assets/portraits/beraldo.png"
import sorloth from "../assets/portraits/sorloth.png"
import alvarez from "../assets/portraits/alvarez.png"
import schik from "../assets/portraits/schik.png"
import wirtz from "../assets/portraits/wirtz.jpg"
import camavinga from "../assets/portraits/camavinga.jpg"
import modric from "../assets/portraits/modric.jpg"
import valverde from "../assets/portraits/valverde.png"
import rudiger from "../assets/portraits/rudiger.jpg"
import antony from "../assets/portraits/antony.jpg"
import isco from "../assets/portraits/isco.jpg"
import leao from "../assets/portraits/Leao.jpg"
import carvajal from "../assets/portraits/carvajal.jpg"
import militao from "../assets/portraits/militao.jpg"
import ugarte from "../assets/portraits/ugarte.png"
import lisandro from "../assets/portraits/lisandro.png"
import szoboszlai from "../assets/portraits/szoboszlai.png"
import bradley from "../assets/portraits/bradley.png"
import saka from "../assets/portraits/saka.png"
import trossard from "../assets/portraits/trossard.png"
import odegard from "../assets/portraits/odegard.png"
import saliba from "../assets/portraits/saliba.png"
import lookman from "../assets/portraits/lookman.png"
import retegui from "../assets/portraits/retegui.png"
import deketelaere from "../assets/portraits/deketelaere.png"
import donarumma from "../assets/portraits/donarumma.png"
import nuno from "../assets/portraits/nuno.png"
import hernandez from "../assets/portraits/hernandez.png"
import hakimi from "../assets/portraits/hakimi.png"
import marquinhos from "../assets/portraits/marquinhos.png"
import ascencio from "../assets/portraits/ascencio.png"
import rashford from "../assets/portraits/rashford.png"
import watkins from "../assets/portraits/watkins.png"
import malen from "../assets/portraits/malen.png"
import rogers from "../assets/portraits/rogers.png"
import rice from "../assets/portraits/rice.png"
import partey from "../assets/portraits/partey.png"
import skelly from "../assets/portraits/skelly.png"
import merino from "../assets/portraits/merino.png"
import balde from "../assets/portraits/balde.jpg"
import pedri from "../assets/portraits/pedri.jpg"
import olmo from "../assets/portraits/olmo.jpg"
import brahim from "../assets/portraits/brahim.jpg"
import beier from "../assets/portraits/beier.png"
import brandt from "../assets/portraits/brandt.png"
import mmd from "../assets/portraits/mmd.png"
import touf from "../assets/portraits/touf.png"
import mikautadze from "../assets/portraits/mikautadze.jpg"
import zirkzee from "../assets/portraits/zirkzee.png"
import hojlund from "../assets/portraits/hojlund.png"
import amad from "../assets/portraits/amad.png"
import mazraoui from "../assets/portraits/mazraoui.png"
import mainoo from "../assets/portraits/mainoo.png"
import deligt from "../assets/portraits/deligt.png"
import marcus from "../assets/portraits/marcus.png"

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

        compo.startXI.forEach(item => {
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
                           <View style={[styles.player, { backgroundColor: "#" + colors.goalExt, borderColor: "#" + colors.goalExtBorder }]}>
                               <Text style={[styles.number, { color: "#" + colors.goalExtNumber }]}>{player.number}</Text>
                           </View>
                           <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.name.split(' ').slice(-1).join(' ')}</Text>
                       </TouchableOpacity>
                        ))}
                        {/* Défenseurs */}
                        {linesDom.D.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.D.length, 2), { alignItems: "center", width: 50 }]}>
                                
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View>
                                <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Milieux */}
                        {linesDom.M.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.M.length, 3), { alignItems: "center", width: 50 }]}>
                                
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View>
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.id === 762 ? "Vini Jr" :  player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Attaquants */}
                        {linesDom.F.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.F.length, 4), { alignItems: "center", width: 53 }]}>
                                
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryDom, borderColor: "#" + colors.borderDom }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberDom }]}>{player.number}</Text>
                                </View>
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
                                
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryExt, borderColor: "#" + colors.borderExt }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberExt }]}>{player.number}</Text>
                                </View>
                                <Text style={styles.playerName}>{player.id === 762 ? "Vini Jr" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Milieux */}
                        {linesExt.M.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.M.length, 3), { alignItems: "center", width: 50 }]}>
                                
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryExt, borderColor: "#" + colors.borderExt }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberExt }]}>{player.number}</Text>
                                </View>
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.id === 762 ? "Vini Jr" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Défenseurs */}
                        {linesExt.D.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.D.length, 2), { alignItems: "center", width: 50 }]}>
                                
                                <View style={[styles.player, { backgroundColor: "#" + colors.primaryExt, borderColor: "#" + colors.borderExt }]}>
                                    <Text style={[styles.number, { color: "#" + colors.numberExt }]}>{player.number}</Text>
                                </View>
                                <Text style={styles.playerName}>{player.id === 283 ? "Arnold" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Gardien */}
                        {linesExt.G.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.G.length, 1), { alignItems: "center", width: 55 }]}>
                                <View style={[styles.player, { backgroundColor: "#" + colors.goalExt, borderColor: "#" + colors.goalExtBorder }]}>
                                    <Text style={[styles.number, { color: "#" + colors.goalExtNumber }]}>{player.number}</Text>
                                </View>
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