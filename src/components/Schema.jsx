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
import palmer from "../assets/portraits/palmer.jpg"
import messi from "../assets/trophees/messi.jpg"
import griezmann from "../assets/portraits/griezmann.png"
import olise from "../assets/portraits/olise.jpg"
import cherki from "../assets/portraits/cherki.jpg"
import rabiot from "../assets/portraits/rabiot.jpg"
import lacazette from "../assets/portraits/lacazette.jpg"
import theo from "../assets/portraits/theo.jpg"
import raphinha from "../assets/portraits/raphinha.png"
import lewandowski from "../assets/portraits/lewandowski.jpg"
import isak from "../assets/portraits/isak.jpg"
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
import schik from "../assets/portraits/schik.jpg"
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

function Schema({ compoDom, compoExt, match, colors }) {

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

    const noteDom = match.players[0].players.map((joueur)=> joueur.statistics[0].games.rating)
    const noteExt = match.players[1].players.map((joueur)=> joueur.statistics[0].games.rating)

    const noteMax = Math.max(...noteDom, ...noteExt)
    console.log(noteMax)


    return (
        <View style={styles.container}>
            {/* Disposition des terrains de football l'un sous l'autre */}
            <View style={styles.fieldsContainer}>
                <ImageBackground source={field} style={{ objectFit: "contain" }} >
                    <View style={[styles.field, { width: fieldWidth, height: fieldHeight }]}>

                        {/* Gardien */}
                        {linesDom.G.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.G.length, 1), { alignItems: "center", width: 54 }]}>
<View style={styles.infos}>{match.players[0].players.map((joueur) => joueur.player.id === player.id ? range.map((x) => joueur.statistics[0].goals.total >= x ? <Text key={x} style={{ fontSize: 9, marginInline: -3 }}>⚽</Text> : null) : null)}
                                {match.players[0].players.map((joueur) => joueur.player.id === player.id ? joueur.statistics[0].cards.yellow > 0 ? <Image source={yellow} style={styles.card} /> : joueur.statistics[0].cards.red > 0 ? <Image source={red} style={styles.card} /> : null : null)}
                                </View>          
                                { match.fixture.status.long === "Match Finished" ? match.players[0].players.map((joueur) => joueur.player.id === player.id ? <View style={joueur.statistics[0].games.rating >= noteMax ? [styles.note, {backgroundColor: "gold"}] : styles.note}><Text style={joueur.statistics[0].games.rating >= noteMax ? styles.mvp : styles.rate}>{joueur.statistics[0].games.rating}</Text></View> : null ) : null}

                                                      <View style={[styles.player, { backgroundColor: "#" + colors.goalDom, borderColor: "#" + colors.goalDomBorder }]}>
                               { match.players[0].players.map((joueur) => joueur.player.id === player.id ? <Image source={joueur.player.id === 1622 ? donarumma : joueur.player.id === 2068 ? safonov  : { uri: joueur.player.photo }}  style={styles.player}/> : null )}
                                </View>
                                <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Défenseurs */}
                        {linesDom.D.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.D.length, 2), { alignItems: "center", width: 50 }]}>
                                <View style={styles.infos}>{match.players[0].players.map((joueur) => joueur.player.id === player.id ? range.map((x) => joueur.statistics[0].goals.total >= x ? <Text key={x} style={{ fontSize: 9, marginInline: -3 }}>⚽</Text> : null) : null)}
                                {match.players[0].players.map((joueur) => joueur.player.id === player.id ? joueur.statistics[0].cards.yellow > 0 ? <Image source={yellow} style={styles.card} /> : joueur.statistics[0].cards.red > 0 ? <Image source={red} style={styles.card} /> : null : null)}
                                </View>
                                { match.fixture.status.long === "Match Finished" ? match.players[0].players.map((joueur) => joueur.player.id === player.id ? <View style={joueur.statistics[0].games.rating >= noteMax ? [styles.note, {backgroundColor: "gold"}] : styles.note}><Text style={joueur.statistics[0].games.rating >= noteMax ? styles.mvp : styles.rate}>{joueur.statistics[0].games.rating}</Text></View> : null ) : null}

                                <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderDom }]}>
                               { match.players[0].players.map((joueur) => joueur.player.id === player.id ? <Image source={joueur.player.id === 545 ? mazraoui : joueur.player.id === 532 ? deligt : joueur.player.id === 161928 ? balde : joueur.player.id === 313245 ? skelly : joueur.player.id === 49 ? partey : joueur.player.id === 2937 ? rice : joueur.player.id === 263482 ? nuno : joueur.player.id === 33 ? hernandez : joueur.player.id === 257 ? marquinhos : joueur.player.id === 9 ? hakimi : joueur.player.id === 6420 ? retegui : joueur.player.id === 147859 ? deketelaere : joueur.player.id === 18767 ? lookman : joueur.player.id === 22090 ? saliba : joueur.player.id === 37127 ? odegard : joueur.player.id === 1946 ? trossard : joueur.player.id === 1460 ? saka : joueur.player.id === 372 ? militao : joueur.player.id === 733 ? carvajal : joueur.player.id === 51494 ? ugarte : joueur.player.id === 2467 ? lisandro : joueur.player.id === 1096 ? szoboszlai : joueur.player.id === 180317 ? bradley : joueur.player.id === 22236 ? leao : joueur.player.id === 745 ? isco : joueur.player.id === 9971 ? antony : joueur.player.id === 2207 ? camavinga : joueur.player.id === 756 ? valverde : joueur.player.id === 754 ? modric : joueur.player.id === 2285 ? rudiger : joueur.player.id === 794 ? schik : joueur.player.id === 203224 ? wirtz : joueur.player.id === 6009 ? alvarez : joueur.player.id === 8492 ? sorloth : joueur.player.id === 307835 ? beraldo : joueur.player.id === 262 ? kimpembe : joueur.player.id === 396623 ? cubarsi : joueur.player.id === 5 ? akanji : joueur.player.id === 81573 ? marmoush : joueur.player.id === 283 ? arnold : joueur.player.id === 2489 ? diaz : joueur.player.id === 6716 ? macallister : joueur.player.id === 247 ? gakpo : joueur.player.id === 409216 ? mayulu : joueur.player.id === 629 ? debruyne : joueur.player.id === 116 ? kephren : joueur.player.id === 7334 ? adeyemi : joueur.player.id === 21104 ? kolo : joueur.player.id === 1271 ? tchouameni : joueur.player.id === 2068 ? safonov : joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : joueur.player.id === 278 ? mbappe : joueur.player.id === 377122 ? endrick : joueur.player.id === 762 ? vini : joueur.player.id === 152982 ? palmer : joueur.player.id === 56 ? griezmann : joueur.player.id === 19617 ? olise : joueur.player.id === 272 ? rabiot : joueur.player.id === 156477 ? cherki : joueur.player.id === 1467 ? lacazette : joueur.player.id === 47300 ? theo : joueur.player.id === 1496 ? raphinha : joueur.player.id === 521 ? lewandowski : joueur.player.id === 2864 ? isak : joueur.player.id === 41585 ? ramos : joueur.player.id === 284324 ? garnacho : joueur.player.id === 128384 ? vitinha : joueur.player.id === 16367 ? pacho : joueur.player.id === 335051 ? joao : { uri: joueur.player.photo }}  style={styles.player}/> : null )}
                                </View>
                                <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Milieux */}
                        {linesDom.M.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.M.length, 3), { alignItems: "center", width: 50 }]}>
                                <View style={styles.infos}>{match.players[0].players.map((joueur) => joueur.player.id === player.id ? range.map((x) => joueur.statistics[0].goals.total >= x ? <Text key={x} style={{ fontSize: 9, marginInline: -3 }}>⚽</Text> : null) : null)}
                                {match.players[0].players.map((joueur) => joueur.player.id === player.id ? joueur.statistics[0].cards.yellow > 0 ? <Image source={yellow} style={styles.card} /> : joueur.statistics[0].cards.red > 0 ? <Image source={red} style={styles.card} /> : null : null)}
                                </View>
                                { match.fixture.status.long === "Match Finished" ? match.players[0].players.map((joueur) => joueur.player.id === player.id ? <View style={joueur.statistics[0].games.rating >= noteMax ? [styles.note, {backgroundColor: "gold"}] : styles.note}><Text style={joueur.statistics[0].games.rating >= noteMax ? styles.mvp : styles.rate}>{joueur.statistics[0].games.rating}</Text></View> : null ) : null}

                                <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderDom }]}>
                               { match.players[0].players.map((joueur) => joueur.player.id === player.id ? <Image source={joueur.player.id === 545 ? mazraoui : joueur.player.id === 284322 ? mainoo : joueur.player.id === 984 ? brandt : joueur.player.id === 158644 ? beier : joueur.player.id === 744 ? brahim : joueur.player.id === 1323 ? olmo : joueur.player.id === 133609 ? pedri : joueur.player.id === 47311 ? merino : joueur.player.id === 313245 ? skelly : joueur.player.id === 49 ? partey : joueur.player.id === 2937 ? rice : joueur.player.id === 909 ? rashford : joueur.player.id === 19366 ? watkins : joueur.player.id === 249 ? malen : joueur.player.id === 746 ? ascencio : joueur.player.id === 19170 ? rogers : joueur.player.id === 6420 ? retegui : joueur.player.id === 147859 ? deketelaere : joueur.player.id === 18767 ? lookman : joueur.player.id === 22090 ? saliba : joueur.player.id === 37127 ? odegard : joueur.player.id === 1946 ? trossard : joueur.player.id === 1460 ? saka : joueur.player.id === 372 ? militao : joueur.player.id === 733 ? carvajal : joueur.player.id === 51494 ? ugarte : joueur.player.id === 2467 ? lisandro : joueur.player.id === 1096 ? szoboszlai : joueur.player.id === 180317 ? bradley : joueur.player.id === 22236 ? leao : joueur.player.id === 745 ? isco : joueur.player.id === 9971 ? antony : joueur.player.id === 2207 ? camavinga : joueur.player.id === 756 ? valverde : joueur.player.id === 754 ? modric : joueur.player.id === 2285 ? rudiger : joueur.player.id === 794 ? schik : joueur.player.id === 203224 ? wirtz : joueur.player.id === 6009 ? alvarez : joueur.player.id === 8492 ? sorloth : joueur.player.id === 307835 ? beraldo : joueur.player.id === 262 ? kimpembe : joueur.player.id === 396623 ? cubarsi : joueur.player.id === 5 ? akanji : joueur.player.id === 81573 ? marmoush : joueur.player.id === 283 ? arnold : joueur.player.id === 2489 ? diaz : joueur.player.id === 6716 ? macallister : joueur.player.id === 247 ? gakpo : joueur.player.id === 409216 ? mayulu : joueur.player.id === 629 ? debruyne : joueur.player.id === 116 ? kephren : joueur.player.id === 7334 ? adeyemi : joueur.player.id === 21104 ? kolo : joueur.player.id === 1271 ? tchouameni : joueur.player.id === 2068 ? safonov : joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : joueur.player.id === 278 ? mbappe : joueur.player.id === 377122 ? endrick : joueur.player.id === 762 ? vini : joueur.player.id === 152982 ? palmer : joueur.player.id === 56 ? griezmann : joueur.player.id === 19617 ? olise : joueur.player.id === 272 ? rabiot : joueur.player.id === 156477 ? cherki : joueur.player.id === 1467 ? lacazette : joueur.player.id === 47300 ? theo : joueur.player.id === 1496 ? raphinha : joueur.player.id === 521 ? lewandowski : joueur.player.id === 2864 ? isak : joueur.player.id === 41585 ? ramos : joueur.player.id === 284324 ? garnacho : joueur.player.id === 128384 ? vitinha : joueur.player.id === 16367 ? pacho : joueur.player.id === 335051 ? joao : { uri: joueur.player.photo }}  style={styles.player}/> : null )}
                                </View>
                                <Text style={styles.playerName}>{player.id === 762 ? "Vinicius" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Attaquants */}
                        {linesDom.F.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesDom.F.length, 4), { alignItems: "center", width: 53 }]}>
                                <View style={styles.infos}>{match.players[0].players.map((joueur) => joueur.player.id === player.id ? range.map((x) => joueur.statistics[0].goals.total >= x ? <Text key={x} style={{ fontSize: 9, marginInline: -3 }}>⚽</Text> : null) : null)}
                                {match.players[0].players.map((joueur) => joueur.player.id === player.id ? joueur.statistics[0].cards.yellow > 0 ? <Image source={yellow} style={styles.card} /> : joueur.statistics[0].cards.red > 0 ? <Image source={red} style={styles.card} /> : null : null)}
                                </View>
                                { match.fixture.status.long === "Match Finished" ? match.players[0].players.map((joueur) => joueur.player.id === player.id ? <View style={joueur.statistics[0].games.rating >= noteMax ? [styles.note, {backgroundColor: "gold"}] : styles.note}><Text style={joueur.statistics[0].games.rating >= noteMax ? styles.mvp : styles.rate}>{joueur.statistics[0].games.rating}</Text></View> : null ) : null}

                                <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderDom }]}>
                               { match.players[0].players.map((joueur) => joueur.player.id === player.id ? <Image source={joueur.player.id === 284322 ? mainoo : joueur.player.id === 288006 ? hojlund : joueur.player.id === 70100 ? zirkzee : joueur.player.id === 157997 ? amad : joueur.player.id === 180496 ? mikautadze : joueur.player.id === 21509 ? marcus : joueur.player.id === 984 ? brandt : joueur.player.id === 158644 ? beier : joueur.player.id === 744 ? brahim : joueur.player.id === 1323 ? olmo : joueur.player.id === 47311 ? merino : joueur.player.id === 909 ? rashford : joueur.player.id === 19366 ? watkins : joueur.player.id === 249 ? malen : joueur.player.id === 746 ? ascencio : joueur.player.id === 19170 ? rogers : joueur.player.id === 6420 ? retegui : joueur.player.id === 147859 ? deketelaere : joueur.player.id === 18767 ? lookman : joueur.player.id === 22090 ? saliba : joueur.player.id === 37127 ? odegard : joueur.player.id === 1946 ? trossard : joueur.player.id === 1460 ? saka : joueur.player.id === 372 ? militao : joueur.player.id === 733 ? carvajal : joueur.player.id === 51494 ? ugarte : joueur.player.id === 2467 ? lisandro : joueur.player.id === 1096 ? szoboszlai : joueur.player.id === 180317 ? bradley : joueur.player.id === 22236 ? leao : joueur.player.id === 745 ? isco : joueur.player.id === 9971 ? antony : joueur.player.id === 2207 ? camavinga : joueur.player.id === 756 ? valverde : joueur.player.id === 754 ? modric : joueur.player.id === 2285 ? rudiger : joueur.player.id === 794 ? schik : joueur.player.id === 203224 ? wirtz : joueur.player.id === 6009 ? alvarez : joueur.player.id === 8492 ? sorloth : joueur.player.id === 307835 ? beraldo : joueur.player.id === 262 ? kimpembe : joueur.player.id === 396623 ? cubarsi : joueur.player.id === 5 ? akanji : joueur.player.id === 81573 ? marmoush : joueur.player.id === 283 ? arnold : joueur.player.id === 2489 ? diaz : joueur.player.id === 6716 ? macallister : joueur.player.id === 247 ? gakpo : joueur.player.id === 409216 ? mayulu : joueur.player.id === 629 ? debruyne : joueur.player.id === 116 ? kephren : joueur.player.id === 7334 ? adeyemi : joueur.player.id === 21104 ? kolo : joueur.player.id === 1271 ? tchouameni : joueur.player.id === 2068 ? safonov : joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : joueur.player.id === 278 ? mbappe : joueur.player.id === 377122 ? endrick : joueur.player.id === 762 ? vini : joueur.player.id === 152982 ? palmer : joueur.player.id === 56 ? griezmann : joueur.player.id === 19617 ? olise : joueur.player.id === 272 ? rabiot : joueur.player.id === 156477 ? cherki : joueur.player.id === 1467 ? lacazette : joueur.player.id === 47300 ? theo : joueur.player.id === 1496 ? raphinha : joueur.player.id === 521 ? lewandowski : joueur.player.id === 2864 ? isak : joueur.player.id === 41585 ? ramos : joueur.player.id === 284324 ? garnacho : joueur.player.id === 128384 ? vitinha : joueur.player.id === 16367 ? pacho : joueur.player.id === 335051 ? joao : { uri: joueur.player.photo }}  style={styles.player}/> : null )}
                                </View>
                                <Text style={styles.playerName}>{player.id === 762 ? "Vinicius" : player.name.split(' ').slice(-1).join(' ')}</Text>
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
                                <View style={styles.infos}> {match.players[1].players.map((joueur) => joueur.player.id === player.id ? range.map((x) => joueur.statistics[0].goals.total >= x ? <Text key={x} style={{ fontSize: 9, marginInline: -3 }}>⚽</Text> : null) : null)}
                                {match.players[1].players.map((joueur) => joueur.player.id === player.id ? joueur.statistics[0].cards.yellow > 0 ? <Image source={yellow} style={styles.card} /> : joueur.statistics[0].cards.red > 0 ? <Image source={red} style={styles.card} /> : null : null)}
                                </View>
                                { match.fixture.status.long === "Match Finished" ? match.players[1].players.map((joueur) => joueur.player.id === player.id ? <View style={joueur.statistics[0].games.rating >= noteMax ? [styles.note, {backgroundColor: "gold"}] : styles.note}><Text style={joueur.statistics[0].games.rating >= noteMax ? styles.mvp : styles.rate}>{joueur.statistics[0].games.rating}</Text></View> : null ) : null}

                                <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderExt }]}>
                               { match.players[1].players.map((joueur) => joueur.player.id === player.id ? <Image source={joueur.player.id === 284322 ? mainoo : joueur.player.id === 288006 ? hojlund : joueur.player.id === 70100 ? zirkzee : joueur.player.id === 157997 ? amad : joueur.player.id === 180496 ? mikautadze : joueur.player.id === 21509 ? marcus : joueur.player.id === 984 ? brandt : joueur.player.id === 158644 ? beier : joueur.player.id === 744 ? brahim : joueur.player.id === 1323 ? olmo : joueur.player.id === 47311 ? merino : joueur.player.id === 909 ? rashford : joueur.player.id === 19366 ? watkins : joueur.player.id === 249 ? malen : joueur.player.id === 746 ? ascencio : joueur.player.id === 19170 ? rogers : joueur.player.id === 6420 ? retegui : joueur.player.id === 147859 ? deketelaere : joueur.player.id === 18767 ? lookman : joueur.player.id === 22090 ? saliba : joueur.player.id === 37127 ? odegard : joueur.player.id === 1946 ? trossard : joueur.player.id === 1460 ? saka : joueur.player.id === 372 ? militao : joueur.player.id === 733 ? carvajal : joueur.player.id === 51494 ? ugarte : joueur.player.id === 2467 ? lisandro : joueur.player.id === 1096 ? szoboszlai : joueur.player.id === 180317 ? bradley : joueur.player.id === 22236 ? leao : joueur.player.id === 745 ? isco : joueur.player.id === 9971 ? antony : joueur.player.id === 2207 ? camavinga : joueur.player.id === 756 ? valverde : joueur.player.id === 754 ? modric : joueur.player.id === 2285 ? rudiger : joueur.player.id === 794 ? schik : joueur.player.id === 203224 ? wirtz : joueur.player.id === 6009 ? alvarez : joueur.player.id === 8492 ? sorloth : joueur.player.id === 307835 ? beraldo : joueur.player.id === 262 ? kimpembe : joueur.player.id === 396623 ? cubarsi : joueur.player.id === 5 ? akanji : joueur.player.id === 81573 ? marmoush : joueur.player.id === 283 ? arnold : joueur.player.id === 2489 ? diaz : joueur.player.id === 6716 ? macallister : joueur.player.id === 247 ? gakpo : joueur.player.id === 409216 ? mayulu : joueur.player.id === 629 ? debruyne : joueur.player.id === 116 ? kephren : joueur.player.id === 7334 ? adeyemi : joueur.player.id === 21104 ? kolo : joueur.player.id === 1271 ? tchouameni : joueur.player.id === 2068 ? safonov : joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : joueur.player.id === 278 ? mbappe : joueur.player.id === 377122 ? endrick : joueur.player.id === 762 ? vini : joueur.player.id === 152982 ? palmer : joueur.player.id === 56 ? griezmann : joueur.player.id === 19617 ? olise : joueur.player.id === 272 ? rabiot : joueur.player.id === 156477 ? cherki : joueur.player.id === 1467 ? lacazette : joueur.player.id === 47300 ? theo : joueur.player.id === 1496 ? raphinha : joueur.player.id === 521 ? lewandowski : joueur.player.id === 2864 ? isak : joueur.player.id === 41585 ? ramos : joueur.player.id === 284324 ? garnacho : joueur.player.id === 128384 ? vitinha : joueur.player.id === 16367 ? pacho : joueur.player.id === 335051 ? joao : { uri: joueur.player.photo }}  style={styles.player}/> : null )}
                                </View>
                                <Text style={styles.playerName}>{player.id === 762 ? "Vinicius" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Milieux */}
                        {linesExt.M.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.M.length, 3), { alignItems: "center", width: 50 }]}>
                                <View style={styles.infos}> {match.players[1].players.map((joueur) => joueur.player.id === player.id ? range.map((x) => joueur.statistics[0].goals.total >= x ? <Text key={x} style={{ fontSize: 9, marginInline: -3 }}>⚽</Text> : null) : null)}
                                {match.players[1].players.map((joueur) => joueur.player.id === player.id ? joueur.statistics[0].cards.yellow > 0 ? <Image source={yellow} style={styles.card} /> : joueur.statistics[0].cards.red > 0 ? <Image source={red} style={styles.card} /> : null : null)}
                            </View>
                            { match.fixture.status.long === "Match Finished" ? match.players[1].players.map((joueur) => joueur.player.id === player.id ? <View style={joueur.statistics[0].games.rating >= noteMax ? [styles.note, {backgroundColor: "gold"}] : styles.note}><Text style={joueur.statistics[0].games.rating >= noteMax ? styles.mvp : styles.rate}>{joueur.statistics[0].games.rating}</Text></View> : null ) : null}

                                <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderExt }]}>
                               { match.players[1].players.map((joueur) => joueur.player.id === player.id ? <Image source={joueur.player.id === 545 ? mazraoui : joueur.player.id === 284322 ? mainoo : joueur.player.id === 984 ? brandt : joueur.player.id === 158644 ? beier : joueur.player.id === 744 ? brahim : joueur.player.id === 1323 ? olmo : joueur.player.id === 133609 ? pedri : joueur.player.id === 47311 ? merino : joueur.player.id === 313245 ? skelly : joueur.player.id === 49 ? partey : joueur.player.id === 2937 ? rice : joueur.player.id === 909 ? rashford : joueur.player.id === 19366 ? watkins : joueur.player.id === 249 ? malen : joueur.player.id === 746 ? ascencio : joueur.player.id === 19170 ? rogers : joueur.player.id === 6420 ? retegui : joueur.player.id === 147859 ? deketelaere : joueur.player.id === 18767 ? lookman : joueur.player.id === 22090 ? saliba : joueur.player.id === 37127 ? odegard : joueur.player.id === 1946 ? trossard : joueur.player.id === 1460 ? saka : joueur.player.id === 372 ? militao : joueur.player.id === 733 ? carvajal : joueur.player.id === 51494 ? ugarte : joueur.player.id === 2467 ? lisandro : joueur.player.id === 1096 ? szoboszlai : joueur.player.id === 180317 ? bradley : joueur.player.id === 22236 ? leao : joueur.player.id === 745 ? isco : joueur.player.id === 9971 ? antony : joueur.player.id === 2207 ? camavinga : joueur.player.id === 756 ? valverde : joueur.player.id === 754 ? modric : joueur.player.id === 2285 ? rudiger : joueur.player.id === 794 ? schik : joueur.player.id === 203224 ? wirtz : joueur.player.id === 6009 ? alvarez : joueur.player.id === 8492 ? sorloth : joueur.player.id === 307835 ? beraldo : joueur.player.id === 262 ? kimpembe : joueur.player.id === 396623 ? cubarsi : joueur.player.id === 5 ? akanji : joueur.player.id === 81573 ? marmoush : joueur.player.id === 283 ? arnold : joueur.player.id === 2489 ? diaz : joueur.player.id === 6716 ? macallister : joueur.player.id === 247 ? gakpo : joueur.player.id === 409216 ? mayulu : joueur.player.id === 629 ? debruyne : joueur.player.id === 116 ? kephren : joueur.player.id === 7334 ? adeyemi : joueur.player.id === 21104 ? kolo : joueur.player.id === 1271 ? tchouameni : joueur.player.id === 2068 ? safonov : joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : joueur.player.id === 278 ? mbappe : joueur.player.id === 377122 ? endrick : joueur.player.id === 762 ? vini : joueur.player.id === 152982 ? palmer : joueur.player.id === 56 ? griezmann : joueur.player.id === 19617 ? olise : joueur.player.id === 272 ? rabiot : joueur.player.id === 156477 ? cherki : joueur.player.id === 1467 ? lacazette : joueur.player.id === 47300 ? theo : joueur.player.id === 1496 ? raphinha : joueur.player.id === 521 ? lewandowski : joueur.player.id === 2864 ? isak : joueur.player.id === 41585 ? ramos : joueur.player.id === 284324 ? garnacho : joueur.player.id === 128384 ? vitinha : joueur.player.id === 16367 ? pacho : joueur.player.id === 335051 ? joao : { uri: joueur.player.photo }}  style={styles.player}/> : null )}
                                </View>
                                <Text style={styles.playerName}>{player.id === 762 ? "Vinicius" : player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Défenseurs */}
                        {linesExt.D.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.D.length, 2), { alignItems: "center", width: 50 }]}>
                                <View style={styles.infos}> {match.players[1].players.map((joueur) => joueur.player.id === player.id ? range.map((x) => joueur.statistics[0].goals.total >= x ? <Text key={x} style={{ fontSize: 9, marginInline: -3 }}>⚽</Text> : null) : null)}
                                {match.players[1].players.map((joueur) => joueur.player.id === player.id ? joueur.statistics[0].cards.yellow > 0 ? <Image source={yellow} style={styles.card} /> : joueur.statistics[0].cards.red > 0 ? <Image source={red} style={styles.card} /> : null : null)}
                                </View>
                                { match.fixture.status.long === "Match Finished" ? match.players[1].players.map((joueur) => joueur.player.id === player.id ? <View style={joueur.statistics[0].games.rating >= noteMax ? [styles.note, {backgroundColor: "gold"}] : styles.note}><Text style={joueur.statistics[0].games.rating >= noteMax ? styles.mvp : styles.rate}>{joueur.statistics[0].games.rating}</Text></View> : null ) : null}
                                <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.borderExt }]}>
                               { match.players[1].players.map((joueur) => joueur.player.id === player.id ? <Image source={joueur.player.id === 545 ? mazraoui : joueur.player.id === 532 ? deligt : joueur.player.id === 161928 ? balde : joueur.player.id === 313245 ? skelly : joueur.player.id === 49 ? partey : joueur.player.id === 2937 ? rice : joueur.player.id === 263482 ? nuno : joueur.player.id === 33 ? hernandez : joueur.player.id === 257 ? marquinhos : joueur.player.id === 9 ? hakimi : joueur.player.id === 6420 ? retegui : joueur.player.id === 147859 ? deketelaere : joueur.player.id === 18767 ? lookman : joueur.player.id === 22090 ? saliba : joueur.player.id === 37127 ? odegard : joueur.player.id === 1946 ? trossard : joueur.player.id === 1460 ? saka : joueur.player.id === 372 ? militao : joueur.player.id === 733 ? carvajal : joueur.player.id === 51494 ? ugarte : joueur.player.id === 2467 ? lisandro : joueur.player.id === 1096 ? szoboszlai : joueur.player.id === 180317 ? bradley : joueur.player.id === 22236 ? leao : joueur.player.id === 745 ? isco : joueur.player.id === 9971 ? antony : joueur.player.id === 2207 ? camavinga : joueur.player.id === 756 ? valverde : joueur.player.id === 754 ? modric : joueur.player.id === 2285 ? rudiger : joueur.player.id === 794 ? schik : joueur.player.id === 203224 ? wirtz : joueur.player.id === 6009 ? alvarez : joueur.player.id === 8492 ? sorloth : joueur.player.id === 307835 ? beraldo : joueur.player.id === 262 ? kimpembe : joueur.player.id === 396623 ? cubarsi : joueur.player.id === 5 ? akanji : joueur.player.id === 81573 ? marmoush : joueur.player.id === 283 ? arnold : joueur.player.id === 2489 ? diaz : joueur.player.id === 6716 ? macallister : joueur.player.id === 247 ? gakpo : joueur.player.id === 409216 ? mayulu : joueur.player.id === 629 ? debruyne : joueur.player.id === 116 ? kephren : joueur.player.id === 7334 ? adeyemi : joueur.player.id === 21104 ? kolo : joueur.player.id === 1271 ? tchouameni : joueur.player.id === 2068 ? safonov : joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : joueur.player.id === 278 ? mbappe : joueur.player.id === 377122 ? endrick : joueur.player.id === 762 ? vini : joueur.player.id === 152982 ? palmer : joueur.player.id === 56 ? griezmann : joueur.player.id === 19617 ? olise : joueur.player.id === 272 ? rabiot : joueur.player.id === 156477 ? cherki : joueur.player.id === 1467 ? lacazette : joueur.player.id === 47300 ? theo : joueur.player.id === 1496 ? raphinha : joueur.player.id === 521 ? lewandowski : joueur.player.id === 2864 ? isak : joueur.player.id === 41585 ? ramos : joueur.player.id === 284324 ? garnacho : joueur.player.id === 128384 ? vitinha : joueur.player.id === 16367 ? pacho : joueur.player.id === 335051 ? joao : { uri: joueur.player.photo }}  style={styles.player}/> : null )}
                                </View>
                                <Text style={styles.playerName}>{player.name.split(' ').slice(-1).join(' ')}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Gardien */}
                        {linesExt.G.map((player, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })} style={[generatePositionStyle(index, linesExt.G.length, 1), { alignItems: "center", width: 55 }]}>
                                <View style={styles.infos}>{match.players[1].players.map((joueur) => joueur.player.id === player.id ? joueur.statistics[0].cards.yellow > 0 ? <Image source={yellow} style={styles.card} /> : joueur.statistics[0].cards.red > 0 ? <Image source={red} style={styles.card} /> : null : null)}</View>
                                { match.fixture.status.long === "Match Finished" ? match.players[1].players.map((joueur) => joueur.player.id === player.id ? <View style={joueur.statistics[0].games.rating >= noteMax ? [styles.note, {backgroundColor: "gold"}] : styles.note}><Text style={joueur.statistics[0].games.rating >= noteMax ? styles.mvp : styles.rate}>{joueur.statistics[0].games.rating}</Text></View> : null ) : null}
                                <View style={[styles.player, { backgroundColor: "#f0f0f0", borderColor: "#" + colors.goalExtBorder }]}>
                                { match.players[1].players.map((joueur) => joueur.player.id === player.id ? <Image source={joueur.player.id === 2068 ? safonov: joueur.player.id === 1622 ? donarumma : { uri: joueur.player.photo }}  style={styles.player}/> : null )}
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
        width: 32,  // Taille des joueurs
        height: 32,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
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
        bottom: 37,
        left: 28,
        height: 12,
        alignItems: "center",
    },
    note: {
position: "absolute",
zIndex: 1,
backgroundColor: "grey",
top: 19,
right: 32,
height: 16,
width: 17,
borderRadius: 5,
alignItems: "center"
    },
    card: {
        height: 17,
        width: 17
    },
    rate: {
        fontSize: 10,
        color: "white",
        fontFamily: "Kanito"
    },
    mvp: {
        fontFamily: "Kanito",
        fontSize: 10,
        color: "black"
    }
});

export default Schema;