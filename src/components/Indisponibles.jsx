import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import injury from "../assets/injury.png"
import yellow from "../assets/yellow.png"
import redcard from "../assets/redcard.png"
import { useNavigation } from "@react-navigation/native";

function Indisponibles({injuries, match}){

    const navigation = useNavigation();

    return (
        <View style={styles.bloc}>
            <Text style={{fontFamily: "Kanitt"}}>Ils manqueront la rencontre</Text>
            <View style={{flexDirection: "row", gap: 30}}>
                <View style={styles.domicile}>
                {injuries.map((element)=> element.team.id === match.teams.home.id && element.player.type === "Missing Fixture" ?
                <TouchableOpacity style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                                    <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                        <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
                    <Image style={styles.photo} source={{uri: element.player.photo}}/>
                    <Image source={{uri: element.team.logo}} style={styles.logo}/>
                    </View>
                    <Text style={{fontFamily: "Kanitalik"}}>{element.player.name}</Text>
                    {element.player.reason === "Yellow Cards" ? 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image source={yellow} style={styles.icone} /> <Text style={{fontFamily: "Kanito", fontSize: 10}}>Accumulation de cartons</Text>
                    </View> : 
                    element.player.reason === "Red Card" ? 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image source={redcard} style={styles.icone} /> <Text style={{fontFamily: "Kanito", fontSize: 10}}>Carton Rouge</Text>
                    </View> :
                    element.player.reason.indexOf("Injury") !== -1 ? 
                    <View style={{flexDirection: "row", alignItems: "baseline", gap: 5}}>
                    <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /> 
                    {element.player.reason === "Knee Injury" ? <Text style={{fontFamily: "Kanito"}}>Genou</Text> : element.player.reason === "Calf Injury" ? <Text style={{fontFamily: "Kanito"}}>Mollet</Text> : element.player.reason === "Ankle Injury" ? <Text style={{fontFamily: "Kanito"}}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{fontFamily: "Kanito"}}>Cuisse</Text> : element.player.reason === "Shoulder Injury" ? <Text style={{fontFamily: "Kanito"}}>Epaule</Text> : element.player.reason === "Muscle Injury" ? <Text style={{fontFamily: "Kanito"}}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{fontFamily: "Kanito"}}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{fontFamily: "Kanito"}}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{fontFamily: "Kanito"}}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{fontFamily: "Kanito"}}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{fontFamily: "Kanito"}}>Visage</Text> : null}
                    </View>: <View></View>}
                    </LinearGradient>
                </TouchableOpacity> : null)}                </View>

                <View style={styles.exterieur}>
                {injuries.map((element)=> element.team.id === match.teams.away.id && element.player.type === "Missing Fixture" ?
                <TouchableOpacity style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: element.player.id })}>
                                    <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}>
                                        <View style={{flexDirection: "row-reverse", alignItems: "center", gap: 10}}>
                    <Image style={styles.photo} source={{uri: element.player.photo}}/>
                    <Image source={{uri: element.team.logo}} style={styles.logo}/>
                    </View>
                    <Text style={{fontFamily: "Kanitalik"}}>{element.player.name}</Text>
                    {element.player.reason === "Yellow Cards" ? 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image source={yellow} style={styles.icone} /> <Text style={{fontFamily: "Kanito", fontSize: 10}}>Accumulation de cartons</Text>
                    </View> : 
                    element.player.reason === "Red Card" ? 
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image source={redcard} style={styles.icone} /> <Text style={{fontFamily: "Kanito", fontSize: 10}}>Carton Rouge</Text>
                    </View> :
                    element.player.reason.indexOf("Injury") !== -1 ? 
                    <View style={{flexDirection: "row", alignItems: "baseline", gap: 5}}>
                    <Image source={injury} style={[styles.icone, {position: "relative", top: 3}]} /> 
{element.player.reason === "Knee Injury" ? <Text style={{fontFamily: "Kanito"}}>Genou</Text> : element.player.reason === "Calf Injury" ? <Text style={{fontFamily: "Kanito"}}>Mollet</Text> : element.player.reason === "Ankle Injury" ? <Text style={{fontFamily: "Kanito"}}>Cheville</Text> : element.player.reason === "Thigh Injury" ? <Text style={{fontFamily: "Kanito"}}>Cuisse</Text> : element.player.reason === "Shoulder Injury" ? <Text style={{fontFamily: "Kanito"}}>Epaule</Text> : element.player.reason === "Muscle Injury" ? <Text style={{fontFamily: "Kanito"}}>Musculaire</Text> : element.player.reason === "Back Injury" ? <Text style={{fontFamily: "Kanito"}}>Dos</Text> : element.player.reason === "Foot Injury" ? <Text style={{fontFamily: "Kanito"}}>Pied</Text> : element.player.reason === "Leg Injury" ? <Text style={{fontFamily: "Kanito"}}>Jambe</Text> : element.player.reason === "Groin Injury" ? <Text style={{fontFamily: "Kanito"}}>Aine</Text> : element.player.reason === "Face Injury" ? <Text style={{fontFamily: "Kanito"}}>Visage</Text> : null}
                    </View>: <View></View>}
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
        alignItems: "center"
    },
    domicile: {
        width: "55%",
        alignItems: "center",
        gap: 10,
        paddingBlock: 10

    },
    exterieur: {
        width: "55%",
        alignItems: "center",
        gap: 10,
        paddingBlock: 10

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
        gap: 10,
        borderRadius: 15,
        elevation: 5,
        padding: 5,
        alignItems: "center"
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 8
    },
    icone: {
        height: 20,
        width: 20
    },
    logo: {
        height: 30,
        width: 30,
        objectFit: "contain"
    }
})