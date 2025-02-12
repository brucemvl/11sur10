import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import haaland from "../assets/portraits/haaland.jpg"
import gyokeres from "../assets/portraits/gyokeres.jpg"
import zaire from "../assets/portraits/zaire.jpg"
import yamal from "../assets/portraits/yamal.jpg"
import dembele from "../assets/portraits/dembele.jpg"
import bellingham from "../assets/portraits/bellingham.jpg"
import barcola from "../assets/portraits/barcola.png"
import rodrygo from "../assets/portraits/rodrygo.jpg"
import guller from "../assets/portraits/guller.jpg"
import doue from "../assets/portraits/doue.png"
import kvara from "../assets/portraits/kvara.jpg"
import goat from "../assets/portraits/goat.jpg"
import darwin from "../assets/portraits/darwin.png"
import salah from "../assets/portraits/salah.png"
import kounde from "../assets/portraits/kounde.jpg"
import endrick from "../assets/portraits/endrick.jpg"
import mbappe from "../assets/portraits/mbappe.jpg"
import vini from "../assets/portraits/vini.jpg"
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
import ramos from "../assets/portraits/ramos.jpg"
import garnacho from "../assets/portraits/garnacho.jpg"
import vitinha from "../assets/portraits/vitinha.png"
import joao from "../assets/portraits/joao.png"
import pacho from "../assets/portraits/pacho.png"
import safonov from "../assets/portraits/safonov.png"
import tchouameni from "../assets/portraits/tchouameni.jpg"
import kolo from "../assets/portraits/kolo.png"
import kephren from "../assets/portraits/kephren.png"
import adeyemi from "../assets/portraits/adeyemi.png"


function Squad({ squad }) {

    const navigation = useNavigation();

    if (!squad){
        return <Text>Loading...</Text>
    }


    return (
        <View style={{width: "98%"}}>

        <View style={styles.poste}>
            <Text style={styles.titre}>Gardiens</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {squad?.players?.map((player) => player.position === "Goalkeeper" ? <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: player.id })}>
                    <View style={styles.joueur}> 
          <Image source={ player.id === 2068 ? safonov : { uri: player.photo }} style={styles.photo} />
                        <View style={styles.number}><Text style={{ fontFamily: "Kanitalic", color: "white" }}>{player.number}</Text></View>
                        <Text style={styles.nom}>{player.name. length < 22 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
                        </View>
                        </TouchableOpacity> : null)}
            </View>
        </View>

        <View style={styles.poste}>
            <Text style={styles.titre}>Defenseurs</Text>
            <View style={{ flexDirection: "row", gap: 15, justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {squad?.players?.map((player) => player.position === "Defender" ? <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: player.id })}>
                    <View style={styles.joueur}> 
          <Image source={ player.id === 16367 ? pacho : player.id === 1257 ? kounde : player.id === 272 ? rabiot : player.id === 156477 ? cherki : player.id === 1467 ? lacazette : player.id === 47300 ? theo : player.id === 284324 ? garnacho : player.id === 128384 ? vitinha : { uri: player.photo }} style={styles.photo} />
                        <View style={styles.number}><Text style={{ fontFamily: "Kanitalic", color: "white" }}>{player.number}</Text></View>
                        <Text style={styles.nom}>{player.name. length < 17 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
                        </View>
                        </TouchableOpacity> : null)}
            </View>
        </View>

        <View style={styles.poste}>
            <Text style={styles.titre}>Milieux</Text>
            <View style={{ flexDirection: "row", gap: 15, justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {squad?.players?.map((player) => player.position === "Midfielder" ? <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: player.id })}>
                    <View style={styles.joueur}> 
          <Image source={ player.id === 116 ? kephren : player.id === 336657 ? zaire : player.id === 335051 ? joao : player.id === 129718 ? bellingham : player.id === 386828 ? yamal : player.id === 1257 ? kounde : player.id === 56 ? griezmann : player.id === 19617 ? olise : player.id === 272 ? rabiot : player.id === 156477 ? cherki  : player.id === 291964 ? guller : player.id === 1271 ? tchouameni : player.id === 47300 ? theo : player.id === 1496 ? raphinha  :  player.id === 284324 ? garnacho : player.id === 128384 ? vitinha : player.id === 152982 ? palmer : { uri: player.photo }} style={styles.photo} />
                        <View style={styles.number}><Text style={{ fontFamily: "Kanitalic", color: "white" }}>{player.number}</Text></View>
                        <Text style={styles.nom}>{player.name. length < 22 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
                        </View>
                        </TouchableOpacity> : null)}
            </View>
        </View>

        <View style={styles.poste}>
            <Text style={styles.titre}>Attaquants</Text>
            <View style={{ flexDirection: "row", gap: 15, justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {squad?.players?.map((player) => player.position === "Attacker" ? <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: player.id })}>
                    <View style={styles.joueur}> 
          <Image source={ player.id === 7334 ? adeyemi : player.id === 21104 ? kolo : player.id === 1100 ? haaland : player.id === 161904 ? barcola : player.id === 336657 ? zaire : player.id === 153 ? dembele : player.id === 129718 ? bellingham : player.id === 386828 ? yamal : player.id === 10009 ? rodrygo : player.id === 18979 ? gyokeres : player.id === 291964 ? guller : player.id === 343027 ? doue : player.id === 483 ? kvara : player.id === 154 ? goat : player.id === 306 ? salah : player.id === 51617 ? darwin : player.id === 1257 ? kounde : player.id === 278 ? mbappe : player.id === 377122 ? endrick : player.id === 762 ? vini : player.id === 56 ? griezmann : player.id === 19617 ? olise : player.id === 272 ? rabiot : player.id === 156477 ? cherki : player.id === 1467 ? lacazette : player.id === 47300 ? theo : player.id === 1496 ? raphinha : player.id === 521 ? lewandowski : player.id === 2864 ? isak : player.id === 41585 ? ramos : player.id === 284324 ? garnacho : player.id === 128384 ? vitinha : { uri: player.photo }} style={styles.photo} />
                        <View style={styles.number}><Text style={{ fontFamily: "Kanitalic", color: "white" }}>{player.number}</Text></View>
                        <Text style={styles.nom}>{player.name. length < 19 ? player.name : player.name.split(' ').slice(-1).join(' ')}</Text>
                        </View>
                        </TouchableOpacity> : null)}
            </View>
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
    joueur: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        marginBlock: 3
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    nom: {
        fontFamily: "Kanito",
        color: "midnightblue",
        marginTop: -15,
        fontSize: 13
    },
    number: {
        backgroundColor: "midnightblue",
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        position: "relative",
        bottom: 15,
        left: 18
    }
})

export default Squad