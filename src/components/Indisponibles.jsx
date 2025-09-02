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

import {portraitsJoueurs} from "../datas/Portraits"

function Indisponibles({ injuries, match }) {

    const navigation = useNavigation();
    const incertain = injuries.filter((element) => element.player.type === "Questionable")



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
        135775: "Ansu Fati",
        2207: "E. Camavinga"

    }

    return (
        <View style={styles.bloc}>
            {incertain.length === 0 ? null :
            <View>
            <Text style={{ fontFamily: "Kanitt", fontSize: 18, marginBottom: 10 }}>Ils sont incertains</Text>
             <View style={{ flexDirection: "row", backgroundColor: "rgb(203, 203, 203)", paddingBlock: 10, borderRadius: 15 }}>
                <View style={styles.domicile}>
                    {injuries.map((element) => element.team.id === match.teams.home.id && element.player.type === "Questionable" ?
                        <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                            <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                    <Image source={portraitsJoueurs[element.player.id] || { uri: element.player.photo }} style={styles.photo} />
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
                                    <Image source={portraitsJoueurs[element.player.id] || { uri: element.player.photo }} style={styles.photo} />
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
            </View> </View>}

            <Text style={{ fontFamily: "Kanitt", fontSize: 18, marginBlock: 10 }}>Ils manqueront la rencontre</Text>
            <View style={{ flexDirection: "row", backgroundColor: "rgb(118, 118, 118)", paddingBlock: 10, borderRadius: 15, marginHorizontal: 1 }}>
                <View style={styles.domicile}>
                    {injuries.map((element) => element.team.id === match.teams.home.id && element.player.type === "Missing Fixture" ?
                        <TouchableOpacity key={"blessure" + element.player.id} style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                            <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                    <Image source={portraitsJoueurs[element.player.id] || { uri: element.player.photo }} style={styles.photo} />
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
                                                        {element.player.reason === "Knee Injury" || element.player.reason === "Knee injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Genou</Text> : element.player.reason === "Meniscus injur" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Menisque</Text> : element.player.reason === "adductor injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text> : element.player.reason === "Calf Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text> : element.player.reason === "Ankle Injury" || element.player.reason === "Injury to the ankle" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cuisse</Text> : element.player.reason === "Muscle Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" || element.player.reason === "Hip injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Oeil</Text> : element.player.reason === "Shin Injury" || element.player.reason === "Shinbone injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coude</Text> : element.player.reason === "Cruciate ligament injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ligaments croisés</Text> : element.player.reason === "Wrist Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poignet</Text> : element.player.reason === "Foot injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : null}
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
                                                    </View> : element.player.reason === "Muscular problems" || element.player.reason === "Torn Muscle Fibre" || element.player.reason === "Muscle fatigue" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text>
                                                    </View> : element.player.reason === "Calf Problems" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text>
                                                    </View> : element.player.reason === "Adductor problems" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text>
                                                    </View> : element.player.reason === "Bruise on the knee" || element.player.reason === "Bruised Knee" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hématome Genou</Text>
                                                    </View> : element.player.reason === "hamstring strain" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Claquage ischios</Text>
                                                    </View> : element.player.reason === "Ankle sprain" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={entorse} style={[styles.icone, { width: 22, height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Entorse</Text>
                                                    </View> : element.player.reason === "Partial patellar tendon tear" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tendon rotulien</Text>
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
                                    <Image source={portraitsJoueurs[element.player.id] || { uri: element.player.photo }} style={styles.photo} />
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
                                                        {element.player.reason === "Knee Injury" || element.player.reason === "Knee injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Genou</Text> : element.player.reason === "Meniscus injur" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Menisque</Text> : element.player.reason === "adductor injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Adducteurs</Text> : element.player.reason === "Calf Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text> : element.player.reason === "Ankle Injury" || element.player.reason === "Injury to the ankle" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cuisse</Text> : element.player.reason === "Muscle Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Visage</Text> : element.player.reason === "Toe Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Orteil</Text> : element.player.reason === "Achilles Tendon Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 8 }}>Tendon d'achille</Text> : element.player.reason === "Hip Injury" || element.player.reason === "Hip injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hanche</Text> : element.player.reason === "Ribs Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Cotes</Text> : element.player.reason === "Head Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tête</Text> : element.player.reason === "Hamstring Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ischios</Text> : element.player.reason === "Eye injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Oeil</Text> : element.player.reason === "Shin Injury" || element.player.reason === "Shinbone injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tibia</Text> : element.player.reason === "Heel Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Talon</Text> : element.player.reason === "Lower Back Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Lombaires</Text> : element.player.reason === "Finger Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Doigt</Text> : element.player.reason === "Chest Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poitrine</Text> : element.player.reason === "Elbow Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Coude</Text> : element.player.reason === "Cruciate ligament injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Ligaments croisés</Text> : element.player.reason === "Wrist Injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Poignet</Text> : element.player.reason === "Foot injury" ? <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Pied</Text> : null}
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
                                                    </View> : element.player.reason === "Suspended" || element.player.reason === "Suspension" ? <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                                                    </View> : element.player.reason === "Muscular problems" || element.player.reason === "Torn Muscle Fibre" || element.player.reason === "Muscle fatigue" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                                                        <Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Musculaire</Text>
                                                    </View> : element.player.reason === "Calf Problems" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Mollet</Text>
                                                    </View> : element.player.reason === "Bruise on the knee" || element.player.reason === "Bruised Knee" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Hématome Genou</Text>
                                                    </View> : element.player.reason === "hamstring strain" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, { position: "relative", top: 3 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Claquage ischios</Text>
                                                    </View> : element.player.reason === "Ankle sprain" ? <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                                        <Image source={entorse} style={[styles.icone, { width: 22, height: 22 }]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Entorse</Text>
                                                    </View> : element.player.reason === "Partial patellar tendon tear" ? <View style={{ flexDirection: "row", gap: 2, alignItems: "baseline" }}>
                                                        <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /><Text style={{ fontFamily: "Kanito", fontSize: 9 }}>Tendon rotulien</Text>
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
        width: "50%",
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
        width: "50%",
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