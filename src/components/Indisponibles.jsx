import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import injury from "../assets/injury.png"
import yellow from "../assets/yellow.png"
import redcard from "../assets/redcard.png"
import question from "../assets/question.png"
import croixrouge from "../assets/croixrouge.png"
import malade from "../assets/malade.png"
import chirurgien from "../assets/chirurgien.png"
import fracture from "../assets/fracture.png"
import jambe from "../assets/jambe.png"
import contusion from "../assets/contusion.png"
import commotion from "../assets/commotion.png"
import coeur from "../assets/coeur.png"
import ligaments from "../assets/ligaments.png"
import entorse from "../assets/entorse.png"
import epaule from "../assets/epaule.png"
import tibia from "../assets/os.png"
import metatarse from "../assets/metatarse.png"


import { useNavigation } from "@react-navigation/native";

import haaland from "../assets/portraits/haaland.png"
import gyokeres from "../assets/portraits/gyokeres.png"
import zaire from "../assets/portraits/zaire.png"
import yamal from "../assets/portraits/yamal.jpg"
import dembele from "../assets/portraits/dembele.png"
import bellingham from "../assets/portraits/bellingham.png"
import barcola from "../assets/portraits/barcola.png"
import rodrygo from "../assets/portraits/rodrygo.jpg"
import guller from "../assets/portraits/guller.jpg"
import doue from "../assets/portraits/doue.png"
import kvara from "../assets/portraits/kvara.png"
import goat from "../assets/portraits/messi.webp"
import darwin from "../assets/portraits/darwin.png"
import salah from "../assets/portraits/salah.png"
import kounde from "../assets/portraits/kounde.jpg"
import endrick from "../assets/portraits/endrick.jpg"
import mbappe from "../assets/portraits/mbappe.png"
import vini from "../assets/portraits/vini.png"
import palmer from "../assets/portraits/palmer.png"
import griezmann from "../assets/portraits/griezmann.png"
import olise from "../assets/portraits/olise.png"
import cherki from "../assets/portraits/cherki.png"
import rabiot from "../assets/portraits/rabiot.png"
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
import tchouameni from "../assets/portraits/tchouameni.png"
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
import wirtz from "../assets/portraits/wirtz.png"
import cristiano from "../assets/portraits/cristiano.png"
import mane from "../assets/portraits/mane.png"
import camavinga from "../assets/portraits/camavinga.jpg"
import modric from "../assets/portraits/modric.png"
import valverde from "../assets/portraits/valverde.png"
import rudiger from "../assets/portraits/rudiger.jpg"
import antony from "../assets/portraits/antony.jpg"
import isco from "../assets/portraits/isco.jpg"
import leao from "../assets/portraits/leao.png"
import carvajal from "../assets/portraits/carvajal.jpg"
import militao from "../assets/portraits/militao.jpg"
import ugarte from "../assets/portraits/ugarte.png"
import lisandro from "../assets/portraits/lisandro.png"
import gravenberch from "../assets/portraits/gravenberch.png"
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
import mikautadze from "../assets/portraits/mikautadze.png"
import zirkzee from "../assets/portraits/zirkzee.png"
import hojlund from "../assets/portraits/hojlund.png"
import amad from "../assets/portraits/amad.png"
import mazraoui from "../assets/portraits/mazraoui.png"
import mainoo from "../assets/portraits/mainoo.png"
import deligt from "../assets/portraits/deligt.png"
import marcus from "../assets/portraits/marcus.png"
import james from "../assets/portraits/james.png"
import neto from "../assets/portraits/neto.png"
import collwill from "../assets/portraits/colwill.png"
import madueke from "../assets/portraits/madueke.png"
import mudryk from "../assets/portraits/mudryk.png"
import enzo from "../assets/portraits/fernandez.png"
import caicedo from "../assets/portraits/caicedo.png"
import cucurella from "../assets/portraits/cucurella.png"
import guirassy from "../assets/portraits/guirassy.png"
import kane from "../assets/portraits/kane.png"
import biereth from "../assets/portraits/biereth.png"
import nkunku from "../assets/portraits/nkunku.png"
import gusto from "../assets/portraits/gusto.png"
import delap from "../assets/portraits/delap.png"
import pedro from "../assets/portraits/pedro.png"
import benseghir from "../assets/portraits/benseghir.png"
import akliouche from "../assets/portraits/akliouche.png"
import fran from "../assets/portraits/fran.png"
import stones from "../assets/portraits/stones.png"
import rubendias from "../assets/portraits/rubendias.png"
import savinho from "../assets/portraits/savinho.png"
import lewis from "../assets/portraits/lewis.png"
import gvardiol from "../assets/portraits/gvardiol.png"
import fermin from "../assets/portraits/fermin.png"
import alisson from "../assets/portraits/alisson.png"
import frimpong from "../assets/portraits/frimpong.png"
import kerkez from "../assets/portraits/kerkez.png"
import konate from "../assets/portraits/konate.png"
import vandijk from "../assets/portraits/vandijk.png"
import chevalier from "../assets/portraits/chevalier.png"
import reijnders from "../assets/portraits/reijnders.png"
import blas from "../assets/portraits/blas.png"
import sekofofana from "../assets/portraits/sekofofana.png"
import pogba from "../assets/portraits/pogba.png"
import minamino from "../assets/portraits/minamino.png"
import fati from "../assets/portraits/fati.png"
import maupay from "../assets/portraits/maupay.png"
import gouiri from "../assets/portraits/gouiri.png"
import harit from "../assets/portraits/harit.png"
import aubameyang from "../assets/portraits/aubameyang.png"
import rowe from "../assets/portraits/rowe.png"
import greenwood from "../assets/portraits/greenwood.png"
import ekitike from "../assets/portraits/ekitike.png"
import chiesa from "../assets/portraits/chiesa.png"
import khusanov from "../assets/portraits/khusanov.png"
import maguire from "../assets/portraits/maguire.png"
import casemiro from "../assets/portraits/casemiro.png"
import mbeumo from "../assets/portraits/mbeumo.png"
import cunha from "../assets/portraits/cunha.png"
import dalot from "../assets/portraits/dalot.png"
import yoro from "../assets/portraits/yoro.png"
import mount from "../assets/portraits/mount.png"
import ruiz from "../assets/portraits/ruiz.png"
import lee from "../assets/portraits/lee.png"
import musiala from "../assets/portraits/musiala.png"
import davies from "../assets/portraits/davies.png"
import gnabry from "../assets/portraits/gnabry.png"
import boey from "../assets/portraits/boey.png"
import pavlovic from "../assets/portraits/pavlovic.png"

function Indisponibles({ injuries, match }) {

    const navigation = useNavigation();
    const incertain = injuries.filter((element) => element.player.type === "Questionable")

    const photosJoueurs = {
        1100: haaland,
        81573: marmoush,
        6716: macallister,
        335051: joao,
        41585: ramos,
        1622: donarumma,
        6009: alvarez,
        8492: sorloth,
        1946: trossard,
        47311: merino,
        909: rashford,
        133609: pedri,
        283026: biereth,
        1864: neto,
        63577: mudryk,
        5996: enzo,
        47380: cucurella,
        5: akanji,
        9: hakimi,
        33: hernandez,
        49: partey,
        56: griezmann,
        116: kephren,
        153: dembele,
        154: goat,
        184: kane,
        247: gakpo,
        248: diaz,
        249: malen,
        257: marquinhos,
        262: kimpembe,
        269: nkunku,
        272: rabiot,
        278: mbappe,
        280: alisson,
        283: arnold,
        290: vandijk,
        293: rice,
        304: mane,
        306: salah,
        372: militao,
        483: kvara,
        514: ugarte,
        521: lewandowski,
        532: deligt,
        542: gravenberch,
        545: mazraoui,
        567: rubendias,
        626: stones,
        629: debruyne,
        733: carvajal,
        736: fran,
        744: brahim,
        745: isco,
        746: ascencio,
        754: modric,
        756: valverde,
        762: vini,
        794: schik,
        874: cristiano,
        984: brandt,
        9971: antony,
        10009: rodrygo,
        10329: pedro,
        1096: szoboszlai,
        1145: konate,
        116117: caicedo,
        1257: kounde,
        1271: tchouameni,
        128384: vitinha,
        129033: gvardiol,
        129718: bellingham,
        1323: olmo,
        136723: madueke,
        1460: saka,
        1467: lacazette,
        147859: deketelaere,
        1496: raphinha,
        152654: frimpong,
        152953: collwill,
        152982: palmer,
        156477: cherki,
        157997: amad,
        158644: beier,
        161904: barcola,
        161907: gusto,
        161928: balde,
        161948: delap,
        16367: pacho,
        180317: bradley,
        184230: lewis,
        18767: lookman,
        18979: gyokeres,
        19170: rogers,
        19366: watkins,
        19545: james,
        19617: olise,
        203224: wirtz,
        206254: kerkez,
        2068: safonov,
        21104: kolo,
        21393: guirassy,
        21509: marcus,
        2207: camavinga,
        22090: saliba,
        22236: leao,
        2285: rudiger,
        2467: lisandro,
        2489: diaz,
        262: kimpembe,
        263482: nuno,
        274300: akliouche,
        284230: lewis,
        284322: mainoo,
        284324: garnacho,
        2864: isak,
        288006: hojlund,
        291964: guller,
        2937: rice,
        307835: beraldo,
        313245: skelly,
        336657: zaire,
        340626: fermin,
        343027: doue,
        343320: benseghir,
        37127: odegard,
        377122: endrick,
        386828: yamal,
        396623: cubarsi,
        409216: mayulu,
        162453: chevalier,
        36902: reijnders,
        360114: khusanov,
        21497: blas,
        30807: sekofofana,
        180496: mikautadze,
        904: pogba,
        1101: minamino,
        135775: fati,
        1465: aubameyang,
        278095: rowe,
        19364: maupay,
        85041: gouiri,
        412: harit,
        897: greenwood,
        174565: ekitike,
        30410: chiesa,
        70100: zirkzee,
        2935: maguire,
        342970: yoro,
        886: dalot,
        19220: mount,
        747: casemiro,
        20589: mbeumo,
        1165: cunha,
        328: ruiz,
        927: lee,
        266657: savinho,
        181812: musiala,
        509: davies,
        510: gnabry,
        2195: boey,
        328033: pavlovic

    };

    const nomsJoueurs = {
        154: "Lionel Messi",
        19599: "Emiliano Martinez",
        542: "R. Gravenberch",
        95: "Benoit Badiashile",
        152953: "Levi Colwill",
        643: "Gabriel Jesus",
        662: "Tanguy Ndombele",
        22163: "Dante",
        377122: "endrick",
        266657: "Savinho",
        135775: "Ansu Fati"

    }

    return (
        <View style={styles.bloc}>
            <Text style={{ fontFamily: "Kanitt", fontSize: 18, marginBottom: 10 }}>Ils sont incertains</Text>
            {incertain.length === 0 ? <Text>/</Text> : <View style={{ flexDirection: "row", backgroundColor: "rgb(203, 203, 203)", paddingBlock: 10, borderRadius: 10 }}>
                <View style={styles.domicile}>
                    {injuries.map((element) => element.team.id === match.teams.home.id && element.player.type === "Questionable" ?
                        <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                            <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                    <Image source={photosJoueurs[element.player.id] || { uri: element.player.photo }} style={styles.photo} />
                                    <View style={{ gap: 10, alignItems: "center" }}>
                                        <Image source={question} style={{ height: 20, width: 20, objectFit: "contain" }} />
                                        <Image source={{ uri: element.team.logo }} style={styles.logo} />
                                    </View>
                                </View>
                                <Text style={{ fontFamily: "Kanitalik", fontSize: 9.5 }}>{nomsJoueurs[element.player.id] || element.player.name}</Text>
                                {element.player.reason === null ? null :
                                    element.player.reason.indexOf("njur") !== -1 ?
                                        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 5 }}>
                                            <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} />
                                            {element.player.reason === "Knee Injury" || element.player.reason === "Knee injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Genou</Text> : element.player.reason === "adductor injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text> : element.player.reason === "Calf Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text> : element.player.reason === "Ankle Injury" || element.player.reason === "Injury to the ankle" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cuisse</Text> : element.player.reason === "Shoulder Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Epaule</Text> : element.player.reason === "Muscle Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Oeil</Text> : element.player.reason === "Shin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coude</Text> : element.player.reason === "Cruciate ligament injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ligaments croisés</Text> : element.player.reason === "Wrist Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poignet</Text> : element.player.reason === "Foot injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : null}
                                        </View> : element.player.reason === "Illness" ?
                                            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                <Image source={malade} style={[styles.icone, { height: 19 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Malade</Text>
                                            </View>
                                            :
                                            element.player.reason === "Surgery" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                <Image source={chirurgien} style={[styles.icone, { height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Operation</Text>
                                            </View> : element.player.reason === "Coach's decision" ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Décision du coach</Text>
                                            </View> : element.player.reason.indexOf("nock") != -1 ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text>💥</Text><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coup</Text>
                                            </View> : element.player.reason === "Broken ankle" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                <Image source={fracture} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Fracture cheville</Text>
                                            </View> : element.player.reason === "Broken Leg" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={jambe} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe cassée</Text>
                                            </View> : element.player.reason === "Contusion" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={contusion} style={[styles.icone, { width: 28, height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Contusion</Text>
                                            </View> : element.player.reason === "Concussion" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={commotion} style={[styles.icone, { width: 25, height: 25 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Commotion</Text>
                                            </View> : element.player.reason === "Heart Problems" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={coeur} style={[styles.icone, { width: 25, height: 25 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Problemes cardiaques</Text>
                                            </View> : element.player.reason === "Lacking Match Fitness" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Manque de forme</Text>
                                            </View> : element.player.reason === "Personal Reasons" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Raisons personnelles</Text>
                                            </View> : element.player.reason === "Adductor problems" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text>
                                            </View> : element.player.reason === "Bruise on the knee" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hématome Genou</Text>
                                            </View> :
                                                <View></View>}
                            </LinearGradient>
                        </TouchableOpacity> : null)}                </View>

                <View style={styles.exterieur}>
                    {injuries.map((element) => element.team.id === match.teams.away.id && element.player.type === "Questionable" ?
                        <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                            <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                <View style={{ flexDirection: "row-reverse", alignItems: "center", gap: 4 }}>
                                    <Image source={photosJoueurs[element.player.id] || { uri: element.player.photo }} style={styles.photo} />
                                    <View style={{ gap: 10, alignItems: "center" }}>
                                        <Image source={question} style={{ height: 20, width: 20, objectFit: "contain" }} />
                                        <Image source={{ uri: element.team.logo }} style={styles.logo} />
                                    </View>                    </View>
                                <Text style={{ fontFamily: "Kanitalik", fontSize: 9.5 }}>{nomsJoueurs[element.player.id] || element.player.name}</Text>
                                {element.player.reason === null ? null :
                                    element.player.reason.indexOf("njur") !== -1 ?
                                        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 5 }}>
                                            <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} />
                                            {element.player.reason === "Knee Injury" || element.player.reason === "Knee injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Genou</Text> : element.player.reason === "adductor injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text> : element.player.reason === "Calf Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text> : element.player.reason === "Ankle Injury" || element.player.reason === "Injury to the ankle" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cuisse</Text> : element.player.reason === "Shoulder Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Epaule</Text> : element.player.reason === "Muscle Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Oeil</Text> : element.player.reason === "Shin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coude</Text> : element.player.reason === "Cruciate ligament injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ligaments croisés</Text> : element.player.reason === "Wrist Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poignet</Text> : element.player.reason === "Foot injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : null}
                                        </View> :
                                        element.player.reason === "Illness" ?
                                            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                <Image source={malade} style={[styles.icone, { height: 19 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Malade</Text>
                                            </View>
                                            : element.player.reason === "Surgery" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                <Image source={chirurgien} style={[styles.icone, { height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Operation</Text>
                                            </View> : element.player.reason === "Coach's decision" ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Décision du coach</Text>
                                            </View> : element.player.reason.indexOf("nock") != -1 ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Text>💥</Text><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coup</Text>
                                            </View> : element.player.reason === "Broken ankle" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                <Image source={fracture} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Fracture cheville</Text>
                                            </View> : element.player.reason === "Broken Leg" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={jambe} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe cassée</Text>
                                            </View> : element.player.reason === "Contusion" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={contusion} style={[styles.icone, { width: 28, height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Contusion</Text>
                                            </View> : element.player.reason === "Concussion" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={commotion} style={[styles.icone, { width: 25, height: 25 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Commotion</Text>
                                            </View> : element.player.reason === "Heart Problems" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={coeur} style={[styles.icone, { width: 25, height: 25 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Problemes cardiaques</Text>
                                            </View> : element.player.reason === "Lacking Match Fitness" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Manque de forme</Text>
                                            </View> : element.player.reason === "Personal Reasons" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Raisons personnelles</Text>
                                            </View> : element.player.reason === "Adductor problems" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text>
                                            </View> : element.player.reason === "Bruise on the knee" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hématome Genou</Text>
                                            </View> : element.player.reason === "Fracture of the fibula" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={tibia} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tibia peroné</Text>
                                            </View> :<View></View>}
                            </LinearGradient>
                        </TouchableOpacity> : null)}                </View>
            </View>}

            <Text style={{ fontFamily: "Kanitt", fontSize: 18, marginBlock: 10 }}>Ils manqueront la rencontre</Text>
            <View style={{ flexDirection: "row", backgroundColor: "rgb(118, 118, 118)", paddingBlock: 10, borderRadius: 10 }}>
                <View style={styles.domicile}>
                    {injuries.map((element) => element.team.id === match.teams.home.id && element.player.type === "Missing Fixture" ?
                        <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                            <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                    <Image source={photosJoueurs[element.player.id] || { uri: element.player.photo }} style={styles.photo} />
                                    <View style={{ gap: 10, alignItems: "center" }}>
                                        <Image source={croixrouge} style={{ height: 12, width: 12, objectFit: "contain" }} />
                                        <Image source={{ uri: element.team.logo }} style={styles.logo} />
                                    </View>                    </View>
                                <Text style={{ fontFamily: "Kanitalik", fontSize: 9.5 }}>{nomsJoueurs[element.player.id] || element.player.name}</Text>
                                {element.player.reason === null ? null :
                                    element.player.reason === "Yellow Cards" ?
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Accumulation de</Text> <Image source={yellow} style={styles.icone} />
                                        </View> :
                                        element.player.reason === "Red Card" || element.player.reason === "Red card Suspended" ?
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image source={redcard} style={styles.icone} /> <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Carton Rouge</Text>
                                            </View> :
                                            element.player.reason.indexOf("njur") !== -1 ?
                                                element.player.reason === "Shoulder Injury" || element.player.reason === "Shoulder injury" ?
                                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                                        <Image source={epaule} style={[styles.icone, { width: 19, height: 19 }]} />
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Epaule</Text>
                                                    </View>
                                                    :
                                                    <View style={{ flexDirection: "row", alignItems: "baseline", gap: 5 }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} />
                                                        {element.player.reason === "Knee Injury" || element.player.reason === "Knee injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Genou</Text> : element.player.reason === "Meniscus injur" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Menisque</Text> : element.player.reason === "adductor injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text> : element.player.reason === "Calf Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text> : element.player.reason === "Ankle Injury" || element.player.reason === "Injury to the ankle" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cuisse</Text> : element.player.reason === "Muscle Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" || element.player.reason === "Hip injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Oeil</Text> : element.player.reason === "Shin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coude</Text> : element.player.reason === "Cruciate ligament injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ligaments croisés</Text> : element.player.reason === "Wrist Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poignet</Text> : element.player.reason === "Foot injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : null}
                                                    </View> : element.player.reason === "Achilles tendon problems" || element.player.reason === "Achilles tendon rupture" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tendon d'achille</Text>
                                                    </View> : element.player.reason === "Knee Problems" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Genou</Text>
                                                    </View> : element.player.reason === "torn muscle fiber in the adduc" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dechirure adducteurs</Text>
                                                    </View> : element.player.reason === "Pubalgia" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pubalgie</Text>
                                                    </View> : element.player.reason === "Thigh problems" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cuisse</Text>
                                                    </View> : element.player.reason === "Fractured Thumb" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Fracture du pouce</Text>
                                                    </View> : element.player.reason === "Illness" || element.player.reason === "Mononucleosis" ?
                                                    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={malade} style={[styles.icone, { height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Malade</Text>
                                                    </View>
                                                    : element.player.reason.indexOf("urgery") != -1 ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={chirurgien} style={[styles.icone, { height: 22, width: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Operation</Text>
                                                    </View> : element.player.reason === "Coach's decision" ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Décision du coach</Text>
                                                    </View> : element.player.reason.indexOf("nock") != -1 ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Text>💥</Text><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coup</Text>
                                                    </View> : element.player.reason === "Broken ankle" || element.player.reason === "Ankle fracture" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={fracture} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Fracture cheville</Text>
                                                    </View> : element.player.reason === "Broken Leg" || element.player.reason === "Broken leg" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={jambe} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe cassée</Text>
                                                    </View> : element.player.reason === "Ruptured cruciate ligament" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={ligaments} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ligaments croisés</Text>
                                                    </View> : element.player.reason === "Suspended" || element.player.reason === "Suspension" ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Suspendu</Text>
                                                    </View> : element.player.reason === "Contusion" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={contusion} style={[styles.icone, { width: 28, height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Contusion</Text>
                                                    </View> : element.player.reason === "Concussion" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={commotion} style={[styles.icone, { width: 25, height: 25 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Commotion</Text>
                                                    </View> : element.player.reason === "Heart Problems" || element.player.reason === "Heart Condition" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={coeur} style={[styles.icone, { width: 17, height: 18 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Problemes coeur</Text>
                                                    </View> : element.player.reason === "Rest" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Au Repos</Text>
                                                    </View> : element.player.reason === "Lacking Match Fitness" || element.player.reason === "fitness" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Manque de forme</Text>
                                                    </View> : element.player.reason === "Personal Reasons" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Raisons personnelles</Text>
                                                    </View> : element.player.reason === "Muscular problems" || element.player.reason === "Torn Muscle Fibre" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text>
                                                    </View> : element.player.reason === "Calf Problems" || element.player.reason === "Torn Muscle Fibre" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text>
                                                    </View> : element.player.reason === "Adductor problems" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text>
                                                    </View> : element.player.reason === "Bruise on the knee" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hématome Genou</Text>
                                                    </View> : element.player.reason === "hamstring strain" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Claquage ischios</Text>
                                                    </View> : element.player.reason === "Ankle sprain" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={entorse} style={[styles.icone, { width: 22, height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Entorse</Text>
                                                    </View> : element.player.reason === "Fracture of the fibula" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={tibia} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tibia peroné</Text>
                                            </View> : element.player.reason === "Metatarsal fracture" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={metatarse} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Metatarse</Text>
                                            </View> : element.player.reason === "Outer ligament tear" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={injury} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dechirure ligament</Text>
                                            </View> : element.player.reason === "Acromioclavicular joint disloc" ?
                                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                                                        <Image source={epaule} style={[styles.icone, { width: 19, height: 19 }]} />
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Luxation clavicule</Text>
                                                    </View> : <View></View>}
                            </LinearGradient>
                        </TouchableOpacity> : null)}</View>

                <View style={styles.exterieur}>
                    {injuries.map((element) => element.team.id === match.teams.away.id && element.player.type === "Missing Fixture" ?
                        <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                            <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                <View style={{ flexDirection: "row-reverse", alignItems: "center", gap: 4 }}>
                                    <Image source={photosJoueurs[element.player.id] || { uri: element.player.photo }} style={styles.photo} />
                                    <View style={{ gap: 10, alignItems: "center" }}>
                                        <Image source={croixrouge} style={{ height: 12, width: 12, objectFit: "contain" }} />
                                        <Image source={{ uri: element.team.logo }} style={styles.logo} />
                                    </View>                    </View>
                                <Text style={{ fontFamily: "Kanitalik", fontSize: 9.5 }}>{nomsJoueurs[element.player.id] || element.player.name}</Text>
                                {element.player.reason === null ? null :
                                    element.player.reason === "Yellow Cards" ?
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Accumulation de</Text> <Image source={yellow} style={styles.icone} />
                                        </View> :
                                        element.player.reason === "Red Card" || element.player.reason === "Red card Suspended" ?
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Image source={redcard} style={styles.icone} /> <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Carton Rouge</Text>
                                            </View> :
                                            element.player.reason.indexOf("njur") !== -1 ?
                                                element.player.reason === "Shoulder Injury" || element.player.reason === "Shoulder injury" ?
                                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                                        <Image source={epaule} style={[styles.icone, { width: 19, height: 19 }]} />
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Epaule</Text>
                                                    </View>
                                                    :
                                                    <View style={{ flexDirection: "row", alignItems: "baseline", gap: 5 }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} />
                                                        {element.player.reason === "Knee Injury" || element.player.reason === "Knee injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Genou</Text> : element.player.reason === "Meniscus injur" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Menisque</Text> : element.player.reason === "adductor injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text> : element.player.reason === "Calf Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text> : element.player.reason === "Ankle Injury" || element.player.reason === "Injury to the ankle" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cuisse</Text> : element.player.reason === "Muscle Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" || element.player.reason === "Hip injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Oeil</Text> : element.player.reason === "Shin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coude</Text> : element.player.reason === "Cruciate ligament injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ligaments croisés</Text> : element.player.reason === "Wrist Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poignet</Text> : element.player.reason === "Foot injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : null}
                                                    </View> : element.player.reason === "Achilles tendon problems" || element.player.reason === "Achilles tendon rupture" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tendon d'achille</Text>
                                                    </View> : element.player.reason === "Knee Problems" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Genou</Text>
                                                    </View> : element.player.reason === "torn muscle fiber in the adduc" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dechirure adducteurs</Text>
                                                    </View> : element.player.reason === "Adductor problems" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text>
                                                    </View> : element.player.reason === "Pubalgia" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pubalgie</Text>
                                                    </View> : element.player.reason === "Thigh problems" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cuisse</Text>
                                                    </View> : element.player.reason === "Fractured Thumb" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Fracture du pouce</Text>
                                                    </View> : element.player.reason === "Illness" || element.player.reason === "Mononucleosis" ?
                                                    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={malade} style={[styles.icone, { height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Malade</Text>
                                                    </View>
                                                    : element.player.reason.indexOf("urgery") != -1 ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={chirurgien} style={[styles.icone, { height: 22, width: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Operation</Text>
                                                    </View> : element.player.reason === "Coach's decision" ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Décision du coach</Text>
                                                    </View> : element.player.reason.indexOf("nock") != -1 ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Text>💥</Text><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coup</Text>
                                                    </View> : element.player.reason === "Broken ankle" || element.player.reason === "Ankle fracture" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={fracture} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 8.5 }}>Fracture cheville</Text>
                                                    </View> : element.player.reason === "Broken Leg" || element.player.reason === "Broken leg" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={jambe} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe cassée</Text>
                                                    </View> : element.player.reason === "Ruptured cruciate ligament" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={ligaments} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ligaments croisés</Text>
                                                    </View> : element.player.reason === "Suspended" ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Suspendu</Text>
                                                    </View> : element.player.reason === "Contusion" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={contusion} style={[styles.icone, { width: 28, height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Contusion</Text>
                                                    </View> : element.player.reason === "Concussion" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={commotion} style={[styles.icone, { width: 25, height: 25 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Commotion</Text>
                                                    </View> : element.player.reason === "Rest" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Au Repos</Text>
                                                    </View> : element.player.reason === "Heart Problems" || element.player.reason === "Heart Condition" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Image source={coeur} style={[styles.icone, { width: 17, height: 18 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Problemes coeur</Text>
                                                    </View> : element.player.reason === "Lacking Match Fitness" || element.player.reason === "fitness" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Manque de forme</Text>
                                                    </View> : element.player.reason === "Personal Reasons" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Raisons personnelles</Text>
                                                    </View> : element.player.reason === "Muscular problems" || element.player.reason === "Torn Muscle Fibre" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text>
                                                    </View> : element.player.reason === "Calf Problems" || element.player.reason === "Torn Muscle Fibre" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text>
                                                    </View> : element.player.reason === "Bruise on the knee" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hématome Genou</Text>
                                                    </View> : element.player.reason === "hamstring strain" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Claquage ischios</Text>
                                                    </View> : element.player.reason === "Ankle sprain" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={entorse} style={[styles.icone, { width: 22, height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Entorse</Text>
                                                    </View> : element.player.reason === "Fracture of the fibula" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={tibia} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tibia peroné</Text>
                                            </View> : element.player.reason === "Metatarsal fracture" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={metatarse} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Metatarse</Text>
                                            </View> : element.player.reason === "Outer ligament tear" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                <Image source={injury} style={styles.icone} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dechirure ligament</Text>
                                            </View> : element.player.reason === "Acromioclavicular joint disloc" ?
                                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                                                        <Image source={epaule} style={[styles.icone, { width: 19, height: 19 }]} />
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Luxation clavicule</Text>
                                                    </View> : <View></View>}
                            </LinearGradient>
                        </TouchableOpacity> : null)}</View>
            </View>
        </View>
    )

}

export default Indisponibles

const styles = StyleSheet.create({
    bloc: {
        marginBlock: 10,
        alignItems: "center",
    },
    domicile: {
        width: "51%",
        alignItems: "center",
        gap: 8,
        padding: 8,
        flexWrap: "wrap",
        flexDirection: "row",
        borderRightWidth: 2,
        borderRightColor: "black",
        justifyContent: "center",

    },
    exterieur: {
        width: "51%",
        alignItems: "center",
        gap: 8,
        padding: 8,
        flexWrap: "wrap",
        flexDirection: "row",
        borderLeftWidth: 2,
        borderLeftColor: "black",
        justifyContent: "center"


    },
    carte: {
        shadowColor: 'black', // shadow color
        shadowOffset: { width: 0, height: 2 }, // shadow offset
        shadowOpacity: 0.7, // shadow opacity
        shadowRadius: 5,
    },
    joueur: {
        justifyContent: "center",
        marginBlock: 3,
        flexDirection: "column",
        gap: 5,
        borderRadius: 15,
        elevation: 5,
        padding: 5,
        alignItems: "center",
        height: 110
    },
    photo: {
        width: 50,
        height: 55,
        borderRadius: 10
    },
    icone: {
        height: 15,
        width: 15
    },
    logo: {
        height: 20,
        width: 20,
        objectFit: "contain"
    }
})