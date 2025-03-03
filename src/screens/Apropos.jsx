import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { StyleSheet } from "react-native"
import { useFonts } from "expo-font";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";



function Apropos() {

    const navigation = useNavigation()

    const [fontsLoaded] = useFonts({
        "Kanitt": require("../assets/fonts/Kanit/Kanit-Black.ttf"),

    });

    return (
        <View style={{flex: 1}}>
            <View style={styles.bloc}>
                <Text style={styles.titre}>Bienvenue sur 11/10 !</Text>
                <Text style={styles.text}>Vous pourrez retrouver ici toutes les infos concernant le ballon rond. Les resultats des matchs de la veille? Le classement de votre équipe favorite? Les statistiques des joueurs ou simplement la date du prochain choc? Toutes ces infos sont disponibles sur 11/10.</Text>
                <Text style={styles.text}>11/10 est une application conçue pour vous permettre de trouver facilement les informations dont vous avez besoin, sans être submergé par tout un tas de données inutiles.</Text>
                <Text style={styles.text}>L'application est nouvelle et encore en construction, n'hesitez donc pas à venir nous rendre visite régulierement pour voir les dernieres mises a jour. Vous pouvez aussi nous faire part de vos suggestions afin d'ameliorer 11/10 via le </Text><TouchableOpacity style={{ alignItems: "center", width: "100%"}} onPress={()=> navigation.navigate("Contact")}><Text style={styles.lien}>Formulaire de contact</Text></TouchableOpacity> <Text style={[styles.text, {paddingInline: 40}]}> Positive ou negative, toute critique est bonne à prendre! </Text>
                <Text style={styles.text}>Bonne visite à Tous!</Text>
            </View>
            <Footer />
        </View>
    )

}

const styles = StyleSheet.create({
    bloc: {
        paddingTop: 30,
        paddingInline: 30,
        flexGrow: 1,
        gap: 10

    },

    titre: {
        fontFamily: "Kanitt",
        fontSize: 24,
        textAlign: "center",
        shadowColor: "black",
        shadowRadius: 4,
        shadowOpacity: 0.4,
        shadowOffset: {width: 0, height: 5}

    },

    text: {
        fontFamily: "Kanito",
        textAlign: "center",
        fontSize: 15

    },
    lien: {
        color: "blue",
        fontSize: 16,
        
        fontFamily: "Kanito",
    }

})

export default Apropos