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


import { useNavigation } from "@react-navigation/native";

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
import goat from "../assets/portraits/messi.webp"
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
import cherki from "../assets/portraits/cherki.png"
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
import mikautadze from "../assets/portraits/mikautadze.jpg"
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
import lewis from "../assets/portraits/lewis.png"
import gvardiol from "../assets/portraits/gvardiol.png"

function Indisponibles({injuries, match}){

    const navigation = useNavigation();
const incertain = injuries.filter((element)=> element.player.type === "Questionable")
console.log(incertain)

    return (
        <View style={styles.bloc}>
                       <Text style={{fontFamily: "Kanitt", fontSize: 18, marginBottom: 10}}>Ils sont incertains</Text> 
                        {incertain.length === 0 ? <Text>/</Text> : <View style={{flexDirection: "row", backgroundColor: "rgb(203, 203, 203)", paddingBlock: 10, borderRadius: 10}}>
                        <View style={styles.domicile}>
                {injuries.map((element)=> element.team.id === match.teams.home.id && element.player.type === "Questionable" ?
                <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                                    <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 4}}>
          <Image source={element.player.id === 542 ? gravenberch : element.player.id === 567 ? rubendias : element.player.id === 284230 ? lewis : element.player.id === 129033 ? gvardiol : element.player.id === 626 ? stones : element.player.id === 304 ? mane : element.player.id === 874 ? cristiano : element.player.id === 736 ? fran : element.player.id === 274300 ? akliouche : element.player.id === 343320 ? benseghir : element.player.id === 161948 ? delap : element.player.id === 161907 ? gusto : element.player.id === 10329 ? pedro : element.player.id === 269 ? nkunku : element.player.id === 283026 ? biereth : element.player.id === 184 ? kane : element.player.id === 21393 ? guirassy : element.player.id === 116117 ? caicedo : element.player.id === 152953 ? collwill : element.player.id === 47380 ? cucurella : element.player.id === 19545 ? james : element.player.id === 5996 ? enzo : element.player.id === 63577 ? mudryk : element.player.id === 1864 ? neto : element.player.id === 136723 ? madueke : element.player.id === 283058 ? jackson :element.player.id === 284322 ? mainoo : element.player.id === 545 ? mazraoui : element.player.id === 532 ? deligt : element.player.id === 288006 ? hojlund : element.player.id === 70100 ? zirkzee : element.player.id === 157997 ? amad : element.player.id === 180496 ? mikautadze : element.player.id === 21509 ? marcus : element.player.id === 984 ? brandt : element.player.id === 158644 ? beier : element.player.id === 744 ? brahim : element.player.id === 1323 ? olmo : element.player.id === 133609 ? pedri : element.player.id === 161928 ? balde : element.player.id === 47311 ? merino : element.player.id === 313245 ? skelly : element.player.id === 49 ? partey : element.player.id === 2937 ? rice : element.player.id === 909 ? rashford : element.player.id === 19366 ? watkins : element.player.id === 249 ? malen : element.player.id === 746 ? ascencio : element.player.id === 19170 ? rogers : element.player.id === 1622 ? donarumma : element.player.id === 9 ? hakimi : element.player.id === 263482 ? nuno : element.player.id === 33 ? hernandez : element.player.id === 257 ? marquinhos : element.player.id === 6420 ? retegui : element.player.id === 147859 ? deketelaere : element.player.id === 18767 ? lookman : element.player.id === 22090 ? saliba : element.player.id === 1946 ? trossard : element.player.id === 37127 ? odegard : element.player.id === 1460 ? saka : element.player.id === 372 ? militao : element.player.id === 733 ? carvajal : element.player.id === 51494 ? ugarte : element.player.id === 2467 ? lisandro : element.player.id === 1096 ? szoboszlai : element.player.id === 180317 ? bradley : element.player.id === 22236 ? leao : element.player.id === 745 ? isco : element.player.id === 9971 ? antony : element.player.id === 2207 ? camavinga : element.player.id === 756 ? valverde : element.player.id === 754 ? modric : element.player.id === 2285 ? rudiger : element.player.id === 794 ? schik : element.player.id === 203224 ? wirtz : element.player.id === 6009 ? alvarez : element.player.id === 8492 ? sorloth : element.player.id === 307835 ? beraldo : element.player.id === 262 ? kimpembe : element.player.id === 396623 ? cubarsi : element.player.id === 5 ? akanji : element.player.id === 81573 ? marmoush : element.player.id === 283 ? arnold : element.player.id === 2489 ? diaz : element.player.id === 6716 ? macallister : element.player.id === 247 ? gakpo : element.player.id === 409216 ? mayulu : element.player.id === 629 ? debruyne : element.player.id === 116 ? kephren : element.player.id === 7334 ? adeyemi : element.player.id === 21104 ? kolo : element.player.id === 1271 ? tchouameni : element.player.id === 2068 ? safonov : element.player.id === 1100 ? haaland : element.player.id === 161904 ? barcola : element.player.id === 336657 ? zaire : element.player.id === 153 ? dembele : element.player.id === 129718 ? bellingham : element.player.id === 386828 ? yamal : element.player.id === 10009 ? rodrygo : element.player.id === 18979 ? gyokeres : element.player.id === 291964 ? guller : element.player.id === 343027 ? doue : element.player.id === 483 ? kvara : element.player.id === 154 ? goat : element.player.id === 306 ? salah : element.player.id === 51617 ? darwin : element.player.id === 1257 ? kounde : element.player.id === 278 ? mbappe : element.player.id === 377122 ? endrick : element.player.id === 762 ? vini : element.player.id === 152982 ? palmer : element.player.id === 56 ? griezmann : element.player.id === 19617 ? olise : element.player.id === 272 ? rabiot : element.player.id === 156477 ? cherki : element.player.id === 1467 ? lacazette : element.player.id === 47300 ? theo : element.player.id === 1496 ? raphinha : element.player.id === 521 ? lewandowski : element.player.id === 2864 ? isak : element.player.id === 41585 ? ramos : element.player.id === 284324 ? garnacho : element.player.id === 128384 ? vitinha : element.player.id === 16367 ? pacho : element.player.id === 335051 ? joao : { uri: element.player.photo }} style={styles.photo} />
                    <View style={{gap: 10, alignItems: "center"}}>
                    <Image source={question} style={{height: 20, width: 20, objectFit: "contain"}}/>
                    <Image source={{uri: element.team.logo}} style={styles.logo}/>
                    </View>
                    </View>
                    <Text style={{fontFamily: "Kanitalik", fontSize: 9.5}}>{element.player.name}</Text>
                    {
                    element.player.reason.indexOf("njury") !== -1 ? 
                    <View style={{flexDirection: "row", alignItems: "baseline", gap: 5}}>
                    <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /> 
                    {element.player.reason === "Knee Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Genou</Text> : element.player.reason === "Calf Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Mollet</Text> :  element.player.reason === "Ankle Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cuisse</Text> : element.player.reason === "Shoulder Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Epaule</Text> : element.player.reason === "Muscle Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 8}}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Oeil</Text> : element.player.reason === "Shin Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Coude</Text> : element.player.reason === "Wrist Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Poignet</Text> : null}
                    </View>: element.player.reason === "Illness" ? 
                                        <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                            <Image source={malade} style={[styles.icone, {height: 19}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Malade</Text>
                                            </View>
                                        :
                                        element.player.reason === "Surgery" ? <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                        <Image source={chirurgien} style={[styles.icone, {height: 22}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Operation</Text>
                                    </View> : element.player.reason === "Coach's decision" ? <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Décision du coach</Text>
                                    </View> : element.player.reason === "Knock" ? <View style={{flexDirection: "row",  alignItems: "center"}}>
                                        <Text>💥</Text><Text style={{fontFamily: "Kanito", fontSize: 9}}>Coup</Text>
                                    </View> : element.player.reason === "Broken ankle" ? <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                        <Image source={fracture} style={styles.icone} /><Text style={{fontFamily: "Kanito", fontSize: 8}}>Fracture cheville</Text>
                                    </View> : element.player.reason === "Broken Leg" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={jambe} style={styles.icone} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Jambe cassée</Text>
                                    </View> : element.player.reason === "Contusion" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={contusion} style={[styles.icone, {width: 28, height: 22}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Contusion</Text>
                                    </View> : element.player.reason === "Concussion" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={commotion} style={[styles.icone, {width: 25, height: 25}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Commotion</Text>
                                    </View> : element.player.reason === "Heart Problems" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={coeur} style={[styles.icone, {width: 25, height: 25}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Problemes cardiaques</Text>
                                    </View> : element.player.reason === "Lacking Match Fitness" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Manque de forme</Text>
                                    </View> : element.player.reason === "Personal Reasons" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Raisons personnelles</Text>
                                    </View> :
                                        <View></View>}
                    </LinearGradient>
                </TouchableOpacity> : null)}                </View>

                <View style={styles.exterieur}>
                {injuries.map((element)=> element.team.id === match.teams.away.id && element.player.type === "Questionable" ?
                <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                                    <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                        <View style={{flexDirection: "row-reverse", alignItems: "center", gap: 4}}>
          <Image source={element.player.id === 542 ? gravenberch : element.player.id === 567 ? rubendias : element.player.id === 284230 ? lewis : element.player.id === 129033 ? gvardiol : element.player.id === 626 ? stones : element.player.id === 304 ? mane : element.player.id === 874 ? cristiano : element.player.id === 736 ? fran : element.player.id === 274300 ? akliouche : element.player.id === 343320 ? benseghir : element.player.id === 161948 ? delap : element.player.id === 161907 ? gusto : element.player.id === 10329 ? pedro : element.player.id === 269 ? nkunku : element.player.id === 283026 ? biereth : element.player.id === 184 ? kane : element.player.id === 21393 ? guirassy : element.player.id === 116117 ? caicedo : element.player.id === 152953 ? collwill : element.player.id === 47380 ? cucurella : element.player.id === 19545 ? james : element.player.id === 5996 ? enzo : element.player.id === 63577 ? mudryk : element.player.id === 1864 ? neto : element.player.id === 136723 ? madueke : element.player.id === 283058 ? jackson :element.player.id === 284322 ? mainoo : element.player.id === 545 ? mazraoui : element.player.id === 532 ? deligt : element.player.id === 288006 ? hojlund : element.player.id === 70100 ? zirkzee : element.player.id === 157997 ? amad : element.player.id === 180496 ? mikautadze : element.player.id === 21509 ? marcus : element.player.id === 984 ? brandt : element.player.id === 158644 ? beier : element.player.id === 744 ? brahim : element.player.id === 1323 ? olmo : element.player.id === 133609 ? pedri : element.player.id === 161928 ? balde : element.player.id === 47311 ? merino : element.player.id === 313245 ? skelly : element.player.id === 49 ? partey : element.player.id === 2937 ? rice : element.player.id === 909 ? rashford : element.player.id === 19366 ? watkins : element.player.id === 249 ? malen : element.player.id === 746 ? ascencio : element.player.id === 19170 ? rogers : element.player.id === 1622 ? donarumma : element.player.id === 9 ? hakimi : element.player.id === 263482 ? nuno : element.player.id === 33 ? hernandez : element.player.id === 257 ? marquinhos : element.player.id === 6420 ? retegui : element.player.id === 147859 ? deketelaere : element.player.id === 18767 ? lookman : element.player.id === 22090 ? saliba : element.player.id === 1946 ? trossard : element.player.id === 37127 ? odegard : element.player.id === 1460 ? saka : element.player.id === 372 ? militao : element.player.id === 733 ? carvajal : element.player.id === 51494 ? ugarte : element.player.id === 2467 ? lisandro : element.player.id === 1096 ? szoboszlai : element.player.id === 180317 ? bradley : element.player.id === 22236 ? leao : element.player.id === 745 ? isco : element.player.id === 9971 ? antony : element.player.id === 2207 ? camavinga : element.player.id === 756 ? valverde : element.player.id === 754 ? modric : element.player.id === 2285 ? rudiger : element.player.id === 794 ? schik : element.player.id === 203224 ? wirtz : element.player.id === 6009 ? alvarez : element.player.id === 8492 ? sorloth : element.player.id === 307835 ? beraldo : element.player.id === 262 ? kimpembe : element.player.id === 396623 ? cubarsi : element.player.id === 5 ? akanji : element.player.id === 81573 ? marmoush : element.player.id === 283 ? arnold : element.player.id === 2489 ? diaz : element.player.id === 6716 ? macallister : element.player.id === 247 ? gakpo : element.player.id === 409216 ? mayulu : element.player.id === 629 ? debruyne : element.player.id === 116 ? kephren : element.player.id === 7334 ? adeyemi : element.player.id === 21104 ? kolo : element.player.id === 1271 ? tchouameni : element.player.id === 2068 ? safonov : element.player.id === 1100 ? haaland : element.player.id === 161904 ? barcola : element.player.id === 336657 ? zaire : element.player.id === 153 ? dembele : element.player.id === 129718 ? bellingham : element.player.id === 386828 ? yamal : element.player.id === 10009 ? rodrygo : element.player.id === 18979 ? gyokeres : element.player.id === 291964 ? guller : element.player.id === 343027 ? doue : element.player.id === 483 ? kvara : element.player.id === 154 ? goat : element.player.id === 306 ? salah : element.player.id === 51617 ? darwin : element.player.id === 1257 ? kounde : element.player.id === 278 ? mbappe : element.player.id === 377122 ? endrick : element.player.id === 762 ? vini : element.player.id === 152982 ? palmer : element.player.id === 56 ? griezmann : element.player.id === 19617 ? olise : element.player.id === 272 ? rabiot : element.player.id === 156477 ? cherki : element.player.id === 1467 ? lacazette : element.player.id === 47300 ? theo : element.player.id === 1496 ? raphinha : element.player.id === 521 ? lewandowski : element.player.id === 2864 ? isak : element.player.id === 41585 ? ramos : element.player.id === 284324 ? garnacho : element.player.id === 128384 ? vitinha : element.player.id === 16367 ? pacho : element.player.id === 335051 ? joao : { uri: element.player.photo }} style={styles.photo} />
                    <View style={{gap: 10, alignItems: "center"}}>
                    <Image source={question} style={{height: 20, width: 20, objectFit: "contain"}}/>
                    <Image source={{uri: element.team.logo}} style={styles.logo}/>
                    </View>                    </View>
                    <Text style={{fontFamily: "Kanitalik", fontSize: 9.5}}>{element.player.name}</Text>
                    {
                    element.player.reason.indexOf("njury") !== -1 ? 
                    <View style={{flexDirection: "row", alignItems: "baseline", gap: 5}}>
                    <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /> 
                    {element.player.reason === "Knee Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Genou</Text> : element.player.reason === "Calf Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Mollet</Text> :  element.player.reason === "Ankle Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cuisse</Text> : element.player.reason === "Shoulder Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Epaule</Text> : element.player.reason === "Muscle Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 8}}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Oeil</Text> : element.player.reason === "Shin Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Coude</Text> : element.player.reason === "Wrist Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Poignet</Text> : null}
                    </View>:
                                       element.player.reason === "Illness" ? 
                                       <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                            <Image source={malade} style={[styles.icone, {height: 19}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Malade</Text>
                                            </View>
                                       : element.player.reason === "Surgery" ? <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                       <Image source={chirurgien} style={[styles.icone, {height: 22}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Operation</Text>
                                   </View> : element.player.reason === "Coach's decision" ? <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Décision du coach</Text>
                                    </View> : element.player.reason === "Knock" ? <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text>💥</Text><Text style={{fontFamily: "Kanito", fontSize: 9}}>Coup</Text>
                                    </View> : element.player.reason === "Broken ankle" ? <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                        <Image source={fracture} style={styles.icone} /><Text style={{fontFamily: "Kanito", fontSize: 8}}>Fracture cheville</Text>
                                    </View> : element.player.reason === "Broken Leg" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={jambe} style={styles.icone} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Jambe cassée</Text>
                                    </View> : element.player.reason === "Contusion" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={contusion} style={[styles.icone, {width: 28, height: 22}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Contusion</Text>
                                    </View> : element.player.reason === "Concussion" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={commotion} style={[styles.icone, {width: 25, height: 25}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Commotion</Text>
                                    </View> : element.player.reason === "Heart Problems" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={coeur} style={[styles.icone, {width: 25, height: 25}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Problemes cardiaques</Text>
                                    </View> : element.player.reason === "Lacking Match Fitness" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Manque de forme</Text>
                                    </View> : element.player.reason === "Personal Reasons" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Raisons personnelles</Text>
                                    </View> : <View></View>}
                    </LinearGradient>
                </TouchableOpacity> : null)}                </View>
</View>}
            <Text style={{fontFamily: "Kanitt", fontSize: 18, marginBlock: 10}}>Ils manqueront la rencontre</Text>
            <View style={{flexDirection: "row", backgroundColor: "rgb(118, 118, 118)", paddingBlock: 10, borderRadius: 10}}>
                <View style={styles.domicile}>
                {injuries.map((element)=> element.team.id === match.teams.home.id && element.player.type === "Missing Fixture" ?
                <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                                    <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 4}}>
          <Image source={element.player.id === 542 ? gravenberch : element.player.id === 567 ? rubendias : element.player.id === 284230 ? lewis : element.player.id === 129033 ? gvardiol : element.player.id === 626 ? stones : element.player.id === 304 ? mane : element.player.id === 874 ? cristiano : element.player.id === 736 ? fran : element.player.id === 274300 ? akliouche : element.player.id === 343320 ? benseghir : element.player.id === 161948 ? delap : element.player.id === 161907 ? gusto : element.player.id === 10329 ? pedro : element.player.id === 269 ? nkunku : element.player.id === 283026 ? biereth : element.player.id === 184 ? kane : element.player.id === 21393 ? guirassy : element.player.id === 116117 ? caicedo : element.player.id === 152953 ? collwill : element.player.id === 47380 ? cucurella : element.player.id === 19545 ? james : element.player.id === 5996 ? enzo : element.player.id === 63577 ? mudryk : element.player.id === 1864 ? neto : element.player.id === 136723 ? madueke : element.player.id === 283058 ? jackson :element.player.id === 284322 ? mainoo : element.player.id === 545 ? mazraoui : element.player.id === 532 ? deligt : element.player.id === 288006 ? hojlund : element.player.id === 70100 ? zirkzee : element.player.id === 157997 ? amad : element.player.id === 180496 ? mikautadze : element.player.id === 21509 ? marcus : element.player.id === 984 ? brandt : element.player.id === 158644 ? beier : element.player.id === 744 ? brahim : element.player.id === 1323 ? olmo : element.player.id === 133609 ? pedri : element.player.id === 161928 ? balde : element.player.id === 47311 ? merino : element.player.id === 313245 ? skelly : element.player.id === 49 ? partey : element.player.id === 2937 ? rice : element.player.id === 909 ? rashford : element.player.id === 19366 ? watkins : element.player.id === 249 ? malen : element.player.id === 746 ? ascencio : element.player.id === 19170 ? rogers : element.player.id === 1622 ? donarumma : element.player.id === 9 ? hakimi : element.player.id === 263482 ? nuno : element.player.id === 33 ? hernandez : element.player.id === 257 ? marquinhos : element.player.id === 6420 ? retegui : element.player.id === 147859 ? deketelaere : element.player.id === 18767 ? lookman : element.player.id === 22090 ? saliba : element.player.id === 1946 ? trossard : element.player.id === 37127 ? odegard : element.player.id === 1460 ? saka : element.player.id === 372 ? militao : element.player.id === 733 ? carvajal : element.player.id === 51494 ? ugarte : element.player.id === 2467 ? lisandro : element.player.id === 1096 ? szoboszlai : element.player.id === 180317 ? bradley : element.player.id === 22236 ? leao : element.player.id === 745 ? isco : element.player.id === 9971 ? antony : element.player.id === 2207 ? camavinga : element.player.id === 756 ? valverde : element.player.id === 754 ? modric : element.player.id === 2285 ? rudiger : element.player.id === 794 ? schik : element.player.id === 203224 ? wirtz : element.player.id === 6009 ? alvarez : element.player.id === 8492 ? sorloth : element.player.id === 307835 ? beraldo : element.player.id === 262 ? kimpembe : element.player.id === 396623 ? cubarsi : element.player.id === 5 ? akanji : element.player.id === 81573 ? marmoush : element.player.id === 283 ? arnold : element.player.id === 2489 ? diaz : element.player.id === 6716 ? macallister : element.player.id === 247 ? gakpo : element.player.id === 409216 ? mayulu : element.player.id === 629 ? debruyne : element.player.id === 116 ? kephren : element.player.id === 7334 ? adeyemi : element.player.id === 21104 ? kolo : element.player.id === 1271 ? tchouameni : element.player.id === 2068 ? safonov : element.player.id === 1100 ? haaland : element.player.id === 161904 ? barcola : element.player.id === 336657 ? zaire : element.player.id === 153 ? dembele : element.player.id === 129718 ? bellingham : element.player.id === 386828 ? yamal : element.player.id === 10009 ? rodrygo : element.player.id === 18979 ? gyokeres : element.player.id === 291964 ? guller : element.player.id === 343027 ? doue : element.player.id === 483 ? kvara : element.player.id === 154 ? goat : element.player.id === 306 ? salah : element.player.id === 51617 ? darwin : element.player.id === 1257 ? kounde : element.player.id === 278 ? mbappe : element.player.id === 377122 ? endrick : element.player.id === 762 ? vini : element.player.id === 152982 ? palmer : element.player.id === 56 ? griezmann : element.player.id === 19617 ? olise : element.player.id === 272 ? rabiot : element.player.id === 156477 ? cherki : element.player.id === 1467 ? lacazette : element.player.id === 47300 ? theo : element.player.id === 1496 ? raphinha : element.player.id === 521 ? lewandowski : element.player.id === 2864 ? isak : element.player.id === 41585 ? ramos : element.player.id === 284324 ? garnacho : element.player.id === 128384 ? vitinha : element.player.id === 16367 ? pacho : element.player.id === 335051 ? joao : { uri: element.player.photo }} style={styles.photo} />
                    <View style={{gap: 10, alignItems: "center"}}>
                    <Image source={croixrouge} style={{height: 12, width: 12, objectFit: "contain"}}/>
                    <Image source={{uri: element.team.logo}} style={styles.logo}/>
                    </View>                    </View>
                    <Text style={{fontFamily: "Kanitalik", fontSize: 9.5}}>{element.player.name}</Text>
                    {element.player.reason === "Yellow Cards" ? 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                       <Text style={{fontFamily: "Kanito", fontSize: 8}}>Accumulation de</Text> <Image source={yellow} style={styles.icone} />
                    </View> : 
                    element.player.reason === "Red Card" ? 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image source={redcard} style={styles.icone} /> <Text style={{fontFamily: "Kanito", fontSize: 9}}>Carton Rouge</Text>
                    </View> :
                    element.player.reason.indexOf("njury") !== -1 ? 
                    <View style={{flexDirection: "row", alignItems: "baseline", gap: 5}}>
                    <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /> 
                    {element.player.reason === "Knee Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Genou</Text> : element.player.reason === "Calf Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Mollet</Text> :  element.player.reason === "Ankle Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cuisse</Text> : element.player.reason === "Shoulder Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Epaule</Text> : element.player.reason === "Muscle Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 8}}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Oeil</Text> : element.player.reason === "Shin Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Coude</Text> : element.player.reason === "Wrist Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Poignet</Text> : null}
                    </View>: element.player.reason === "Illness" ? 
                                        <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                            <Image source={malade} style={[styles.icone, {height: 19}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Malade</Text>
                                        </View>
                                        : element.player.reason === "Surgery" ? <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                        <Image source={chirurgien} style={[styles.icone, {height: 22, width: 22}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Operation</Text>
                                    </View> : element.player.reason === "Coach's decision" ? <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Décision du coach</Text>
                                    </View> : element.player.reason === "Knock" ? <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text>💥</Text><Text style={{fontFamily: "Kanito", fontSize: 9}}>Coup</Text>
                                    </View> : element.player.reason === "Broken ankle" ? <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                        <Image source={fracture} style={styles.icone} /><Text style={{fontFamily: "Kanito", fontSize: 8}}>Fracture cheville</Text>
                                    </View> : element.player.reason === "Broken Leg" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={jambe} style={styles.icone} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Jambe cassée</Text>
                                    </View> : element.player.reason === "Suspended" ? <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Suspendu</Text>
                                    </View> : element.player.reason === "Contusion" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={contusion} style={[styles.icone, {width: 28, height: 22}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Contusion</Text>
                                    </View> : element.player.reason === "Concussion" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={commotion} style={[styles.icone, {width: 25, height: 25}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Commotion</Text>
                                    </View> : element.player.reason === "Heart Problems" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={coeur} style={[styles.icone, {width: 17, height: 18}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Problemes coeur</Text>
                                    </View> : element.player.reason === "Rest" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Au Repos</Text>
                                    </View> : element.player.reason === "Lacking Match Fitness" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Manque de forme</Text>
                                    </View> : element.player.reason === "Personal Reasons" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Raisons personnelles</Text>
                                    </View> : <View></View>}
                    </LinearGradient>
                </TouchableOpacity> : null)}                </View>

                <View style={styles.exterieur}>
                {injuries.map((element)=> element.team.id === match.teams.away.id && element.player.type === "Missing Fixture" ?
                <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                                    <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                        <View style={{flexDirection: "row-reverse", alignItems: "center", gap: 4}}>
          <Image source={element.player.id === 542 ? gravenberch : element.player.id === 567 ? rubendias : element.player.id === 284230 ? lewis : element.player.id === 129033 ? gvardiol : element.player.id === 626 ? stones : element.player.id === 304 ? mane : element.player.id === 874 ? cristiano : element.player.id === 736 ? fran : element.player.id === 274300 ? akliouche : element.player.id === 343320 ? benseghir : element.player.id === 161948 ? delap : element.player.id === 161907 ? gusto : element.player.id === 10329 ? pedro : element.player.id === 269 ? nkunku : element.player.id === 283026 ? biereth : element.player.id === 184 ? kane : element.player.id === 21393 ? guirassy : element.player.id === 116117 ? caicedo : element.player.id === 152953 ? collwill : element.player.id === 47380 ? cucurella : element.player.id === 19545 ? james : element.player.id === 5996 ? enzo : element.player.id === 63577 ? mudryk : element.player.id === 1864 ? neto : element.player.id === 136723 ? madueke : element.player.id === 283058 ? jackson :element.player.id === 284322 ? mainoo : element.player.id === 545 ? mazraoui : element.player.id === 532 ? deligt : element.player.id === 288006 ? hojlund : element.player.id === 70100 ? zirkzee : element.player.id === 157997 ? amad : element.player.id === 180496 ? mikautadze : element.player.id === 21509 ? marcus : element.player.id === 984 ? brandt : element.player.id === 158644 ? beier : element.player.id === 744 ? brahim : element.player.id === 1323 ? olmo : element.player.id === 133609 ? pedri : element.player.id === 161928 ? balde : element.player.id === 47311 ? merino : element.player.id === 313245 ? skelly : element.player.id === 49 ? partey : element.player.id === 2937 ? rice : element.player.id === 909 ? rashford : element.player.id === 19366 ? watkins : element.player.id === 249 ? malen : element.player.id === 746 ? ascencio : element.player.id === 19170 ? rogers : element.player.id === 1622 ? donarumma : element.player.id === 9 ? hakimi : element.player.id === 263482 ? nuno : element.player.id === 33 ? hernandez : element.player.id === 257 ? marquinhos : element.player.id === 6420 ? retegui : element.player.id === 147859 ? deketelaere : element.player.id === 18767 ? lookman : element.player.id === 22090 ? saliba : element.player.id === 1946 ? trossard : element.player.id === 37127 ? odegard : element.player.id === 1460 ? saka : element.player.id === 372 ? militao : element.player.id === 733 ? carvajal : element.player.id === 51494 ? ugarte : element.player.id === 2467 ? lisandro : element.player.id === 1096 ? szoboszlai : element.player.id === 180317 ? bradley : element.player.id === 22236 ? leao : element.player.id === 745 ? isco : element.player.id === 9971 ? antony : element.player.id === 2207 ? camavinga : element.player.id === 756 ? valverde : element.player.id === 754 ? modric : element.player.id === 2285 ? rudiger : element.player.id === 794 ? schik : element.player.id === 203224 ? wirtz : element.player.id === 6009 ? alvarez : element.player.id === 8492 ? sorloth : element.player.id === 307835 ? beraldo : element.player.id === 262 ? kimpembe : element.player.id === 396623 ? cubarsi : element.player.id === 5 ? akanji : element.player.id === 81573 ? marmoush : element.player.id === 283 ? arnold : element.player.id === 2489 ? diaz : element.player.id === 6716 ? macallister : element.player.id === 247 ? gakpo : element.player.id === 409216 ? mayulu : element.player.id === 629 ? debruyne : element.player.id === 116 ? kephren : element.player.id === 7334 ? adeyemi : element.player.id === 21104 ? kolo : element.player.id === 1271 ? tchouameni : element.player.id === 2068 ? safonov : element.player.id === 1100 ? haaland : element.player.id === 161904 ? barcola : element.player.id === 336657 ? zaire : element.player.id === 153 ? dembele : element.player.id === 129718 ? bellingham : element.player.id === 386828 ? yamal : element.player.id === 10009 ? rodrygo : element.player.id === 18979 ? gyokeres : element.player.id === 291964 ? guller : element.player.id === 343027 ? doue : element.player.id === 483 ? kvara : element.player.id === 154 ? goat : element.player.id === 306 ? salah : element.player.id === 51617 ? darwin : element.player.id === 1257 ? kounde : element.player.id === 278 ? mbappe : element.player.id === 377122 ? endrick : element.player.id === 762 ? vini : element.player.id === 152982 ? palmer : element.player.id === 56 ? griezmann : element.player.id === 19617 ? olise : element.player.id === 272 ? rabiot : element.player.id === 156477 ? cherki : element.player.id === 1467 ? lacazette : element.player.id === 47300 ? theo : element.player.id === 1496 ? raphinha : element.player.id === 521 ? lewandowski : element.player.id === 2864 ? isak : element.player.id === 41585 ? ramos : element.player.id === 284324 ? garnacho : element.player.id === 128384 ? vitinha : element.player.id === 16367 ? pacho : element.player.id === 335051 ? joao : { uri: element.player.photo }} style={styles.photo} />
                    <View style={{gap: 10, alignItems: "center"}}>
                    <Image source={croixrouge} style={{height: 12, width: 12, objectFit: "contain"}}/>
                    <Image source={{uri: element.team.logo}} style={styles.logo}/>
                    </View>                    </View>
                    <Text style={{fontFamily: "Kanitalik", fontSize: 9.5}}>{element.player.name}</Text>
                    {element.player.reason === "Yellow Cards" ? 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                       <Text style={{fontFamily: "Kanito", fontSize: 8}}>Accumulation de</Text> <Image source={yellow} style={styles.icone} />
                       </View> : 
                    element.player.reason === "Red Card" ? 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image source={redcard} style={styles.icone} /> <Text style={{fontFamily: "Kanito", fontSize: 9}}>Carton Rouge</Text>
                    </View> :
                    element.player.reason.indexOf("njury") !== -1 ? 
                    <View style={{flexDirection: "row", alignItems: "baseline", gap: 5}}>
                    <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /> 
                    {element.player.reason === "Knee Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Genou</Text> : element.player.reason === "Calf Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Mollet</Text> :  element.player.reason === "Ankle Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cuisse</Text> : element.player.reason === "Shoulder Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Epaule</Text> : element.player.reason === "Muscle Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 8}}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Oeil</Text> : element.player.reason === "Shin Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Coude</Text> : element.player.reason === "Wrist Injury" ? <Text style={{fontFamily: "Kanito", fontSize: 9}}>Poignet</Text> : null}
                    </View>: element.player.reason === "Illness" ? 
                                        <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                            <Image source={malade} style={[styles.icone, {height: 19}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Malade</Text>
                                            </View>
                                        : element.player.reason === "Surgery" ? <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                        <Image source={chirurgien} style={[styles.icone, {height: 22, width: 22}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Operation</Text>
                                    </View> : element.player.reason === "Coach's decision" ? <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Décision du coach</Text>
                                    </View> : element.player.reason === "Knock" ? <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                        <Text>💥</Text><Text style={{fontFamily: "Kanito", fontSize: 9}}>Coup</Text>
                                    </View> : element.player.reason === "Broken ankle" ? <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                        <Image source={fracture} style={styles.icone} /><Text style={{fontFamily: "Kanito", fontSize: 8.5}}>Fracture cheville</Text>
                                    </View> : element.player.reason === "Broken Leg" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={jambe} style={styles.icone} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Jambe cassée</Text>
                                    </View> : element.player.reason === "Suspended" ? <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Suspendu</Text>
                                    </View> : element.player.reason === "Contusion" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={contusion} style={[styles.icone, {width: 28, height: 22}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Contusion</Text>
                                    </View> : element.player.reason === "Concussion" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={commotion} style={[styles.icone, {width: 25, height: 25}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Commotion</Text>
                                    </View> : element.player.reason === "Rest" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Au Repos</Text>
                                    </View> : element.player.reason === "Heart Problems" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Image source={coeur} style={[styles.icone, {width: 17, height: 18}]} /><Text style={{fontFamily: "Kanito", fontSize: 9}}>Problemes coeur</Text>
                                    </View> : element.player.reason === "Lacking Match Fitness" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Manque de forme</Text>
                                    </View> : element.player.reason === "Personal Reasons" ? <View style={{flexDirection: "row", gap: 2, alignItems: "center"}}>
                                        <Text style={{fontFamily: "Kanito", fontSize: 9}}>Raisons personnelles</Text>
                                    </View> : <View></View>}
                    </LinearGradient>
                </TouchableOpacity> : null)}                </View>
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
    carte:{
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