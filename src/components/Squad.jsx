import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import haaland from "../assets/portraits/haaland.png"
import gyokeres from "../assets/portraits/gyokeres.jpg"
import zaire from "../assets/portraits/zaire.jpg"
import yamal from "../assets/portraits/yamal.jpg"
import dembele from "../assets/portraits/dembele.jpg"
import bellingham from "../assets/portraits/bellingham.jpg"
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
import mbappe from "../assets/portraits/mbappe.jpg"
import vini from "../assets/portraits/vini.jpg"
import palmer from "../assets/portraits/palmer.jpg"
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
import joao from "../assets/portraits/joao.png"
import pacho from "../assets/portraits/pacho.png"
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
import alvarez from "../assets/portraits/alvarez.png"
import sorloth from "../assets/portraits/sorloth.png"
import schik from "../assets/portraits/schik.jpg"
import wirtz from "../assets/portraits/wirtz.jpg"
import camavinga from "../assets/portraits/camavinga.jpg"
import modric from "../assets/portraits/modric.jpg"
import valverde from "../assets/portraits/valverde.jpg"
import rudiger from "../assets/portraits/rudiger.jpg"
import antony from "../assets/portraits/antony.jpg"
import isco from "../assets/portraits/isco.jpg"
import leao from "../assets/portraits/Leao.jpg"



import { LinearGradient } from "expo-linear-gradient";


function Squad({ squad }) {

    const navigation = useNavigation();

    if (!squad){
        return <Text>Loading...</Text>
    }


    return (
        <View style={{width: "98%"}}>

        <View style={styles.poste}>
            <Text style={styles.titre}>Gardiens</Text>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", gap: 24, height: 160, alignItems: "center", paddingInline: 10}}>
                {squad?.players?.map((player) => player.position === "Goalkeeper" ? <TouchableOpacity style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })}>
                <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}> 
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
          <Image source={ player.id === 2068 ? safonov : { uri: player.photo }} style={styles.photo} />
          <View style={styles.number}><Text style={[{ fontFamily: "Kanitalik", color: squad.team.id === 49 ? "rgb(27, 20, 248)" : squad.team.id === 42 ? "rgb(228, 46, 46)" : squad.team.id === 165 ? "#e2e21c" : squad.team.id === 40 || squad.team.id === 157 ? "rgb(147, 0, 0)" : squad.team.id === 541 ? "rgb(0, 0, 0)" : squad.team.id === 50 ? "rgb(29, 198, 224)" : "midnightblue", fontSize: 22}, squad.team.id === 85 ? {color: "rgb(188, 14, 14)"} : squad.team.id === 165 ? {shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.5, shadowOpacity: 1} : null]}>{player.number}</Text></View>
          </View>
          <Text style={squad.team.id === 85 ? [styles.nom, {shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 0.7, shadowOpacity: 1,}] : squad.team.id === 165 ? [styles.nom, {color: "black", shadowOffset: [{height: 0, width: 0}], shadowColor: "yellow", shadowRadius: 1.4, shadowOpacity: 1}] : squad.team.id === 40 || squad.team.id === 157 ? [styles.nom, {color: "rgb(147, 0, 0)" }] : squad.team.id === 541 ? [styles.nom, {color: "rgb(0, 0, 0)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 1.5, shadowOpacity: 1 }] : squad.team.id === 50 ? [styles.nom, {color: "rgb(29, 198, 224)", shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.2, shadowOpacity: 1 }] : squad.team.id === 42 ? [styles.nom, {color: "rgb(223, 38, 38)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 2, shadowOpacity: 1 }] : squad.team.id === 49 ? [styles.nom, {color: "rgb(23, 17, 197)"}] :  styles.nom}>{player.name. length < 21 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
          </LinearGradient>
                        </TouchableOpacity> : null)}
            </ScrollView>
        </View>

        <View style={styles.poste}>
            <Text style={styles.titre}>Defenseurs</Text>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", gap: 22, height: 160, alignItems: "center", paddingInline: 10}}>
                {squad?.players?.map((player) => player.position === "Defender" ? <TouchableOpacity style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })}>
                <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}> 
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>

          <Image source={player.id === 2285 ? rudiger : player.id === 307835 ? beraldo : player.id === 262 ? kimpembe : player.id === 396623 ? cubarsi : player.id === 5 ? akanji : player.id === 283 ? arnold : player.id === 16367 ? pacho : player.id === 1257 ? kounde : player.id === 272 ? rabiot : player.id === 156477 ? cherki : player.id === 1467 ? lacazette : player.id === 47300 ? theo : player.id === 284324 ? garnacho : player.id === 128384 ? vitinha : { uri: player.photo }} style={styles.photo} />       
          <View style={styles.number}><Text style={[{ fontFamily: "Kanitalik", color: squad.team.id === 49 ? "rgb(27, 20, 248)" : squad.team.id === 42 ? "rgb(228, 46, 46)" : squad.team.id === 165 ? "#e2e21c" : squad.team.id === 40 || squad.team.id === 157 ? "rgb(147, 0, 0)" : squad.team.id === 541 ? "rgb(0, 0, 0)" : squad.team.id === 50 ? "rgb(29, 198, 224)" : "midnightblue", fontSize: 22}, squad.team.id === 85 ? {color: "rgb(188, 14, 14)"} : squad.team.id === 165 ? {shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.5, shadowOpacity: 1} : null]}>{player.number}</Text></View>
          </View>
          <Text style={squad.team.id === 85 ? [styles.nom, {shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 0.7, shadowOpacity: 1,}] : squad.team.id === 165 ? [styles.nom, {color: "black", shadowOffset: [{height: 0, width: 0}], shadowColor: "yellow", shadowRadius: 1.4, shadowOpacity: 1}] : squad.team.id === 40 || squad.team.id === 157 ? [styles.nom, {color: "rgb(147, 0, 0)" }] : squad.team.id === 541 ? [styles.nom, {color: "rgb(0, 0, 0)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 1.5, shadowOpacity: 1 }] : squad.team.id === 50 ? [styles.nom, {color: "rgb(29, 198, 224)", shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.2, shadowOpacity: 1 }] : squad.team.id === 42 ? [styles.nom, {color: "rgb(223, 38, 38)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 2, shadowOpacity: 1 }] : squad.team.id === 49 ? [styles.nom, {color: "rgb(23, 17, 197)"}] :  styles.nom}>{player.name. length < 21 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
          </LinearGradient>
                        </TouchableOpacity> : null)}
            </ScrollView>
        </View>

        <View style={styles.poste}>
            <Text style={styles.titre}>Milieux</Text>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", gap: 22, height: 160, alignItems: "center", paddingInline: 10}}>
                {squad?.players?.map((player) => player.position === "Midfielder" ? <TouchableOpacity style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })}>
                <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}> 
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
          <Image source={ player.id === 745 ? isco : player.id === 754 ? modric : player.id === 756 ? valverde : player.id === 2207 ? camavinga : player.id === 203224 ? wirtz : player.id === 6716 ? macallister : player.id === 409216 ? mayulu : player.id === 629 ? debruyne : player.id === 116 ? kephren : player.id === 336657 ? zaire : player.id === 335051 ? joao : player.id === 129718 ? bellingham : player.id === 386828 ? yamal : player.id === 1257 ? kounde : player.id === 56 ? griezmann : player.id === 19617 ? olise : player.id === 272 ? rabiot : player.id === 156477 ? cherki  : player.id === 291964 ? guller : player.id === 1271 ? tchouameni : player.id === 47300 ? theo : player.id === 1496 ? raphinha  :  player.id === 284324 ? garnacho : player.id === 128384 ? vitinha : player.id === 152982 ? palmer : { uri: player.photo }} style={styles.photo} />
          <View style={styles.number}><Text style={[{ fontFamily: "Kanitalik", color: squad.team.id === 49 ? "rgb(27, 20, 248)" : squad.team.id === 42 ? "rgb(228, 46, 46)" : squad.team.id === 165 ? "#e2e21c" : squad.team.id === 40 || squad.team.id === 157 ? "rgb(147, 0, 0)" : squad.team.id === 541 ? "rgb(0, 0, 0)" : squad.team.id === 50 ? "rgb(29, 198, 224)" : "midnightblue", fontSize: 22}, squad.team.id === 85 ? {color: "rgb(188, 14, 14)"} : squad.team.id === 165 ? {shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.5, shadowOpacity: 1} : null]}>{player.number}</Text></View>
          </View>
          <Text style={squad.team.id === 85 ? [styles.nom, {shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 0.7, shadowOpacity: 1,}] : squad.team.id === 165 ? [styles.nom, {color: "black", shadowOffset: [{height: 0, width: 0}], shadowColor: "yellow", shadowRadius: 1.4, shadowOpacity: 1}] : squad.team.id === 40 || squad.team.id === 157 ? [styles.nom, {color: "rgb(147, 0, 0)" }] : squad.team.id === 541 ? [styles.nom, {color: "rgb(0, 0, 0)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 1.5, shadowOpacity: 1 }] : squad.team.id === 50 ? [styles.nom, {color: "rgb(29, 198, 224)", shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.2, shadowOpacity: 1 }] : squad.team.id === 42 ? [styles.nom, {color: "rgb(223, 38, 38)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 2, shadowOpacity: 1 }] : squad.team.id === 49 ? [styles.nom, {color: "rgb(23, 17, 197)"}] :  styles.nom}>{player.name. length < 21 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
          </LinearGradient>
                        </TouchableOpacity> : null)}
            </ScrollView>
        </View>

        <View style={styles.poste}>
            <Text style={styles.titre}>Attaquants</Text>
            <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", gap: 22, height: 160, alignItems: "center", paddingInline: 10}}>
                {squad?.players?.map((player) => player.position === "Attacker" ? <TouchableOpacity style={styles.carte} onPress={() => navigation.navigate('FicheJoueur', { id: player.id })}>
                    <LinearGradient style={styles.joueur} colors={["#fff", "rgb(163, 164, 165)"]} locations={[0.5, 0.9]}> 
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                    <Image source={player.id === 22236 ? leao : player.id === 9971 ? antony : player.id === 794 ? schik : player.id === 6009 ? alvarez : player.id === 8492 ? sorloth : player.id === 81573 ? marmoush : player.id === 247 ? gakpo : player.id === 2489 ? diaz : player.id === 7334 ? adeyemi : player.id === 21104 ? kolo : player.id === 1100 ? haaland : player.id === 161904 ? barcola : player.id === 336657 ? zaire : player.id === 153 ? dembele : player.id === 129718 ? bellingham : player.id === 386828 ? yamal : player.id === 10009 ? rodrygo : player.id === 18979 ? gyokeres : player.id === 291964 ? guller : player.id === 343027 ? doue : player.id === 483 ? kvara : player.id === 154 ? goat : player.id === 306 ? salah : player.id === 51617 ? darwin : player.id === 1257 ? kounde : player.id === 278 ? mbappe : player.id === 377122 ? endrick : player.id === 762 ? vini : player.id === 56 ? griezmann : player.id === 19617 ? olise : player.id === 272 ? rabiot : player.id === 156477 ? cherki : player.id === 1467 ? lacazette : player.id === 47300 ? theo : player.id === 1496 ? raphinha : player.id === 521 ? lewandowski : player.id === 2864 ? isak : player.id === 41585 ? ramos : player.id === 284324 ? garnacho : player.id === 128384 ? vitinha : { uri: player.photo }} style={styles.photo} />
                    <View style={styles.number}><Text style={[{ fontFamily: "Kanitalik", color: squad.team.id === 49 ? "rgb(27, 20, 248)" : squad.team.id === 42 ? "rgb(228, 46, 46)" : squad.team.id === 165 ? "#e2e21c" : squad.team.id === 40 || squad.team.id === 157 ? "rgb(147, 0, 0)" : squad.team.id === 541 ? "rgb(0, 0, 0)" : squad.team.id === 50 ? "rgb(29, 198, 224)" : "midnightblue", fontSize: 22}, squad.team.id === 85 ? {color: "rgb(188, 14, 14)"} : squad.team.id === 165 ? {shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.5, shadowOpacity: 1} : null]}>{player.number}</Text></View>
                    </View>
                    <Text style={squad.team.id === 85 ? [styles.nom, {shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 0.7, shadowOpacity: 1,}] : squad.team.id === 165 ? [styles.nom, {color: "black", shadowOffset: [{height: 0, width: 0}], shadowColor: "yellow", shadowRadius: 1.4, shadowOpacity: 1}] : squad.team.id === 40 || squad.team.id === 157 ? [styles.nom, {color: "rgb(147, 0, 0)" }] : squad.team.id === 541 ? [styles.nom, {color: "rgb(0, 0, 0)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 1.5, shadowOpacity: 1 }] : squad.team.id === 50 ? [styles.nom, {color: "rgb(29, 198, 224)", shadowOffset: [{height: 0, width: 0}], shadowColor: "black", shadowRadius: 1.2, shadowOpacity: 1 }] : squad.team.id === 42 ? [styles.nom, {color: "rgb(223, 38, 38)", shadowOffset: [{height: 0, width: 0}], shadowColor: "white", shadowRadius: 2, shadowOpacity: 1 }] : squad.team.id === 49 ? [styles.nom, {color: "rgb(23, 17, 197)"}] :  styles.nom}>{player.name. length < 21 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
                    </LinearGradient>
                        </TouchableOpacity> : null)}
            </ScrollView>
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
    poste: {
        gap: 10,
        width: "100%",
        marginBottom: 10,
        backgroundColor: "lightblue",
        padding: 6,
        borderRadius: 10
    },
    titre: {
        fontFamily: "Kanitalik",
        fontSize: 22,
        color: "midnightblue",
        marginBottom: 4
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
        
    }
})

export default Squad