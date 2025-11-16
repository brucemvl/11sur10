import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import {portraitsJoueurs} from "../datas/Portraits.jsx";
import {coachImages} from "../screens/FicheCoach.jsx"


import { LinearGradient } from "expo-linear-gradient";


function Squad({ squad, coach }) {

    const navigation = useNavigation();

    if (!squad){
        return <Text>Loading...</Text>
    }

    if (!coach){
        return <Text>Loading...</Text>
    }

    


    return (
        <View style={{width: "98%", gap: 15}}>

        <View style={styles.poste}>
            <LinearGradient colors={["rgba(48, 88, 120, 1)", "rgba(199, 222, 240, 1)"]}  style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
            <Text style={styles.titre}>Gardiens</Text>
            </LinearGradient>
            <View style={{padding: 6}}>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", gap: 24, height: 160, alignItems: "center", paddingInline: 10}}>
                {squad?.players?.map((player) => player.position === "Goalkeeper" ? 
                <TouchableOpacity style={styles.carte} key={player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: squad.team.id })}>
                <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}> 
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                              <Image source={portraitsJoueurs[player.id] || { uri: player.photo }} style={styles.photo} />
          <View style={styles.number}><Text style={[{ fontFamily: "Kanitalik", color: squad.team.id === 49 ? "rgb(20, 15, 182)" : squad.team.id === 42 ? "rgb(228, 46, 46)" : squad.team.id === 165 ? "#e2e21c" : squad.team.id === 40 || squad.team.id === 157 ? "rgb(147, 0, 0)" : squad.team.id === 541 ? "rgb(0, 0, 0)" : squad.team.id === 50 || squad.team.id === 81 ? "rgb(0, 174, 255)" : "midnightblue", fontSize: 22}, squad.team.id === 85 ? {color: "rgb(188, 14, 14)"} : squad.team.id === 165 ? {shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.5, shadowOpacity: 1} : null]}>{player.number}</Text><Image source={{uri:squad.team.logo}} style={{height: 28, width: 28, objectFit: "contain"}} /></View>
          </View>
          <Text style={squad.team.id === 85 ? [styles.nom, {shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 0.7, shadowOpacity: 1,}] : squad.team.id === 165 ? [styles.nom, {color: "black", shadowOffset: [{height: 0, width: 0}], shadowColor: "yellow", shadowRadius: 1.4, shadowOpacity: 1}] : squad.team.id === 40 || squad.team.id === 157 ? [styles.nom, {color: "rgb(147, 0, 0)" }] : squad.team.id === 541 ? [styles.nom, {color: "rgb(0, 0, 0)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 1.5, shadowOpacity: 1 }] : squad.team.id === 50 || squad.team.id === 81 ? [styles.nom, {color: "rgb(0, 174, 255)", shadowOffset: [{height: 0, width: 0}], shadowColor: squad.team.id === 81 ? "white" : "black", shadowRadius: 1.2, shadowOpacity: 1 }] : squad.team.id === 42 ? [styles.nom, {color: "rgb(223, 38, 38)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 2, shadowOpacity: 1 }] : squad.team.id === 49 ? [styles.nom, {color: "rgb(20, 15, 182)"}] :  styles.nom}>{player?.name. length < 21 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
          </LinearGradient>
                        </TouchableOpacity> : null)}
            </ScrollView>
            </View>
        </View>

        <View style={styles.poste}>
            <LinearGradient colors={["rgba(48, 88, 120, 1)", "rgba(199, 222, 240, 1)"]}  style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
            <Text style={styles.titre}>Defenseurs</Text>
            </LinearGradient>   
                        <View style={{padding: 6}}>
         <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", gap: 22, height: 160, alignItems: "center", paddingInline: 10}}>
                {squad?.players?.map((player) => player.position === "Defender" ? <TouchableOpacity style={styles.carte} key={player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: squad.team.id })}>
                <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}> 
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>

          <Image source={portraitsJoueurs[player.id] || { uri: player.photo }} style={styles.photo} />
          <View style={styles.number}><Text style={[{ fontFamily: "Kanitalik", color: squad.team.id === 49 ? "rgb(20, 15, 182)" : squad.team.id === 42 ? "rgb(228, 46, 46)" : squad.team.id === 165 ? "#e2e21c" : squad.team.id === 40 || squad.team.id === 157 ? "rgb(147, 0, 0)" : squad.team.id === 541 ? "rgb(0, 0, 0)" : squad.team.id === 50 || squad.team.id === 81 ? "rgb(0, 174, 255)" : "midnightblue", fontSize: 22}, squad.team.id === 85 ? {color: "rgb(188, 14, 14)"} : squad.team.id === 165 ? {shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.5, shadowOpacity: 1} : null]}>{player.number}</Text><Image source={{uri:squad.team.logo}} style={{height: 28, width: 28, objectFit: "contain"}} /></View>
          </View>
          <Text style={squad.team.id === 85 ? [styles.nom, {shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 0.7, shadowOpacity: 1,}] : squad.team.id === 165 ? [styles.nom, {color: "black", shadowOffset: [{height: 0, width: 0}], shadowColor: "yellow", shadowRadius: 1.4, shadowOpacity: 1}] : squad.team.id === 40 || squad.team.id === 157 ? [styles.nom, {color: "rgb(147, 0, 0)" }] : squad.team.id === 541 ? [styles.nom, {color: "rgb(0, 0, 0)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 1.5, shadowOpacity: 1 }] : squad.team.id === 50 || squad.team.id === 81 ? [styles.nom, {color: "rgb(0, 174, 255)", shadowOffset: [{height: 0, width: 0}], shadowColor: squad.team.id === 81 ? "white" : "black", shadowRadius: 1.2, shadowOpacity: 1 }] : squad.team.id === 42 ? [styles.nom, {color: "rgb(223, 38, 38)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 2, shadowOpacity: 1 }] : squad.team.id === 49 ? [styles.nom, {color: "rgb(20, 15, 182)"}] :  styles.nom}>{player?.name.length < 21 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
          </LinearGradient>
                        </TouchableOpacity> : null)}
            </ScrollView>
            </View>
        </View>

        <View style={styles.poste}>
<LinearGradient colors={["rgba(48, 88, 120, 1)", "rgba(199, 222, 240, 1)"]}  style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
            <Text style={styles.titre}>Milieux</Text>
            </LinearGradient>  
                        <View style={{padding: 6}}>
          <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", gap: 22, height: 160, alignItems: "center", paddingInline: 10}}>
                {squad?.players?.map((player) => player.position === "Midfielder" ? <TouchableOpacity style={styles.carte} key={player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: squad.team.id })}>
                <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}> 
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
          <Image source={portraitsJoueurs[player.id] || { uri: player.photo }} style={styles.photo} />
          <View style={styles.number}><Text style={[{ fontFamily: "Kanitalik", color: squad.team.id === 49 ? "rgb(20, 15, 182)" : squad.team.id === 42 ? "rgb(228, 46, 46)" : squad.team.id === 165 ? "#e2e21c" : squad.team.id === 40 || squad.team.id === 157 ? "rgb(147, 0, 0)" : squad.team.id === 541 ? "rgb(0, 0, 0)" : squad.team.id === 50 || squad.team.id === 81 ? "rgb(0, 174, 255)" : "midnightblue", fontSize: 22}, squad.team.id === 85 ? {color: "rgb(188, 14, 14)"} : squad.team.id === 165 ? {shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.5, shadowOpacity: 1} : null]}>{player.number}</Text><Image source={{uri:squad.team.logo}} style={{height: 28, width: 28, objectFit: "contain"}} /></View>
          </View>
          <Text style={squad.team.id === 85 ? [styles.nom, {shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 0.7, shadowOpacity: 1,}] : squad.team.id === 165 ? [styles.nom, {color: "black", shadowOffset: [{height: 0, width: 0}], shadowColor: "yellow", shadowRadius: 1.4, shadowOpacity: 1}] : squad.team.id === 40 || squad.team.id === 157 ? [styles.nom, {color: "rgb(147, 0, 0)" }] : squad.team.id === 541 ? [styles.nom, {color: "rgb(0, 0, 0)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 1.5, shadowOpacity: 1 }] : squad.team.id === 50 || squad.team.id === 81 ? [styles.nom, {color: "rgb(0, 174, 255)", shadowOffset: [{height: 0, width: 0}], shadowColor: squad.team.id === 81 ? "white" : "black", shadowRadius: 1.2, shadowOpacity: 1 }] : squad.team.id === 42 ? [styles.nom, {color: "rgb(223, 38, 38)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 2, shadowOpacity: 1 }] : squad.team.id === 49 ? [styles.nom, {color: "rgb(20, 15, 182)"}] :  styles.nom}>{player?.name.length < 21 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
          </LinearGradient>
                        </TouchableOpacity> : null)}
            </ScrollView>
            </View>
        </View>

        <View style={styles.poste}>
<LinearGradient colors={["rgba(48, 88, 120, 1)", "rgba(199, 222, 240, 1)"]}  style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
            <Text style={styles.titre}>Attaquants</Text>
            </LinearGradient>     
                        <View style={{padding: 6}}>
       <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", gap: 22, height: 160, alignItems: "center", paddingInline: 10}}>
                {squad?.players?.map((player) => player.position === "Attacker" ? <TouchableOpacity style={styles.carte} key={player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.id, team: squad.team.id })}>
                    <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}> 
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
          <Image source={portraitsJoueurs[player.id] || { uri: player.photo }} style={styles.photo} />
          <View style={styles.number}><Text style={[{ fontFamily: "Kanitalik", color: squad.team.id === 49 ? "rgb(20, 15, 182)" : squad.team.id === 42 ? "rgb(228, 46, 46)" : squad.team.id === 165 ? "#e2e21c" : squad.team.id === 40 || squad.team.id === 157 ? "rgb(147, 0, 0)" : squad.team.id === 541 ? "rgb(0, 0, 0)" : squad.team.id === 50 || squad.team.id === 81 ? "rgb(0, 174, 255)" : "midnightblue", fontSize: 22}, squad.team.id === 85 ? {color: "rgb(188, 14, 14)"} : squad.team.id === 165 ? {shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.5, shadowOpacity: 1} : null]}>{player.number}</Text><Image source={{uri:squad.team.logo}} style={{height: 28, width: 28, objectFit: "contain"}} /></View>
                    </View>
          <Text style={squad.team.id === 85 ? [styles.nom, {shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 0.7, shadowOpacity: 1,}] : squad.team.id === 165 ? [styles.nom, {color: "black", shadowOffset: [{height: 0, width: 0}], shadowColor: "yellow", shadowRadius: 1.4, shadowOpacity: 1}] : squad.team.id === 40 || squad.team.id === 157 ? [styles.nom, {color: "rgb(147, 0, 0)" }] : squad.team.id === 541 ? [styles.nom, {color: "rgb(0, 0, 0)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 1.5, shadowOpacity: 1 }] : squad.team.id === 50 || squad.team.id === 81 ? [styles.nom, {color: "rgb(0, 174, 255)", shadowOffset: [{height: 0, width: 0}], shadowColor: squad.team.id === 81 ? "white" : "black", shadowRadius: 1.2, shadowOpacity: 1 }] : squad.team.id === 42 ? [styles.nom, {color: "rgb(223, 38, 38)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 2, shadowOpacity: 1 }] : squad.team.id === 49 ? [styles.nom, {color: "rgb(20, 15, 182)"}] :  styles.nom}>{player?.name.length < 21 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
                    </LinearGradient>
                        </TouchableOpacity> : null)}
            </ScrollView>
            </View>
        </View>


        </View>
    )
}

const styles = StyleSheet.create({
    poste: {
        width: "100%",
        backgroundColor: "rgba(199, 222, 240, 1)",
        borderRadius: 15,
        gap: 2
    },
    titre: {
        fontFamily: "Bangers",
        fontSize: 22,
        color: "white",
        marginBlock: 10,
        marginLeft: 15
    },
    carte:{
        shadowColor: 'black', // shadow color
        shadowOffset: { width: 0, height: 2 }, // shadow offset
        shadowOpacity: 0.7, // shadow opacity
        shadowRadius: 5,
    },
    joueur: {
        justifyContent: "center",
        width: 108,
        height: 130,
        marginBlock: 3,
        flexDirection: "column",
        gap: 10,
        borderRadius: 15,
        elevation: 5
        
        
    },
    photo: {
        width: 55,
        height: 70,
        borderRadius:10
    },
    nom: {
        fontFamily: "Kanitalik",
        color: "midnightblue",
        textAlign: "center",
        fontSize: 13
    },
    number: {
        
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column-reverse"
        
    }
})

export default Squad