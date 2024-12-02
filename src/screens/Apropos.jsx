import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { StyleSheet } from "react-native"
import { useFonts } from "expo-font";
import Footer from "../components/Footer";



function Apropos() {

    const [fontsLoaded] = useFonts({
        "Kanitt": require("../assets/fonts/Kanit/Kanit-Black.ttf"),

    });

    return (
        <View>
            <View style={styles.bloc}>
                <Text style={styles.titre}>Bienvenue sur 11/10 !</Text>
                <Text style={styles.text}>Vous pourrez retrouver ici toutes les infos concernant le ballon rond. Les resultats des matchs de la veille? Le classement de votre équipe favorite? Les statistiques des joueurs ou simplement la date du prochain choc? Toutes ces infos sont disponibles sur 11/10.</Text>
                <Text style={styles.text}>11/10 est une WebAplication, qui au contraire d'un site web classique, necessite tres peu de temps de chargement lors des changements de page, vous offrant une navigation fluide et agreable.</Text>
                <Text style={styles.text}>L'application est nouvelle et encore en construction, n'hesitez donc pas à venir nous rendre visite regulierement pour voir les dernieres mises a jour. Vous pouvez aussi nous faire part de vos suggestions afin d'ameliorer 11/10 via le <TouchableOpacity><Text style={styles.lien}>formulaire de contact</Text></TouchableOpacity> ; positive ou negative, toute critique est bonne a prendre! </Text>
                <Text style={styles.text}>Bonne visite à Tous!</Text>
            </View>
            <Footer />
        </View>
    )

}

const styles = StyleSheet.create({
    bloc: {
        padding: 30,

    },

    titre: {
        fontFamily: "Kanitt",
        fontSize: 24,
        textAlign: "center"

    },

    text: {
        fontFamily: "Kanito",
        textAlign: "center"

    },
    lien: {
        color: "blue",
        position: "relative",
        top: 7,
        fontFamily: "Kanitt",
    }

})

export default Apropos