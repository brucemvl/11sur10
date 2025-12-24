import { View, Text, TouchableOpacity, Dimensions, Image, Linking, useWindowDimensions } from "react-native"
import React from "react"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native";
import insta from "../assets/instagram.png"
import bm from "../assets/bm.png"



function Apropos() {

    const { width } = useWindowDimensions();
    
        const isMediumScreen = width <= 1024 && width > 767;

    const navigation = useNavigation()

        const screenHeight = Dimensions.get("window").height;

        const openExternalLink = (url) => {
        Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
      };

    return (
        <View style={{ flexDirection: "column", height: screenHeight, gap: 15,alignItems: "center" }}>
            <View style={[styles.bloc, isMediumScreen && {width: "86%", gap: 20}]}>
                <Text style={[styles.titre, isMediumScreen && {fontSize: 30}]}>Bienvenue sur 11/10 !</Text>
                <Text style={[styles.text, isMediumScreen && {fontSize: 18}]}>Vous pourrez retrouver ici toutes les infos concernant le ballon rond. Les resultats des matchs de la veille? Le classement de votre équipe favorite? Les statistiques des joueurs ou simplement la date du prochain choc? Toutes ces infos sont disponibles sur 11/10.</Text>    
                <Text style={[styles.text, isMediumScreen && {fontSize: 18}]}>11/10 est une application conçue pour vous permettre de trouver facilement les informations dont vous avez besoin, sans être submergé par tout un tas de données inutiles.</Text>
                <Text style={[styles.text, isMediumScreen && {fontSize: 18}]}>L'application est nouvelle et encore en construction, n'hesitez donc pas à venir nous rendre visite régulièrement pour voir les dernières mises à jour. Vous pouvez aussi nous faire part de vos suggestions afin d'améliorer 11/10 via le </Text>
                <TouchableOpacity style={{ }} onPress={() => navigation.navigate("Contact")} accessible accessibilityRole="text" accessibilityLabel="contact" accessibilityHint="accéder au formulaire de contact">
                    <Text style={[styles.lien, isMediumScreen && {fontSize: 20}]}>Formulaire de contact</Text>
                </TouchableOpacity>
                <Text style={[[styles.text, isMediumScreen && {fontSize: 18}], { paddingInline: 40 }]}> Positive ou negative, toute critique est bonne à prendre! </Text>
                <Text style={[styles.text, isMediumScreen && {fontSize: 18}]}>Bonne visite à Tous!</Text>
            </View>
            <View style={styles.footer}>
                        <View style={{paddingInline: 5, alignItems: "center",  flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                        <TouchableOpacity style={{width: "27%", alignItems: "center"}} onPress={()=>openExternalLink("https://www.instagram.com/11_sur_10/")} accessible accessibilityRole="imagebutton" accessibilityLabel="instagram" accessibilityHint="Accéder au compte instagram de 11 sur 10">
                  <Image source={insta} style={{height: 48, width: 48}}/>
                  </TouchableOpacity>
                  <View style={styles.droits}><Image source={bm} alt="logo developpeur" style={styles.logo}/><Text style={{color: "white", fontFamily: "Kanito", fontSize: 8}}>© 2025 BM Development. Tous droits réservés.</Text></View>
            
                       <TouchableOpacity style={{width: "27%", alignItems: "center"}} onPress={()=> navigation.navigate("Contact")} accessible accessibilityRole="text" accessibilityLabel="contact" accessibilityHint="accéder au formulaire de contact"><Text style={styles.link}>Nous contacter</Text></TouchableOpacity>
                       </View>
            
                    </View>
        </View>
    );

}

const styles = StyleSheet.create({
    bloc: {
        paddingTop: 20,
        paddingInline: 15,
        gap: 10,
        width: "100%",
        alignItems: "center"

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
        fontFamily: "Londrinak",
        textAlign: "center",
        fontSize: 17

    },
    lien: {
        color: "blue",
        fontSize: 16,
        fontFamily: "Kanitt",

    },
    footer: {
        flexDirection: "row-reverse",
        backgroundColor: "black",
        alignItems: "flex-start",
        width: "100%",
        paddingVertical: 15,
        height: 340,
        position: "absolute",
        bottom: 1
    },

    link: {
        fontFamily: "Kanito",
        textDecorationLine: "underline",
        color: "white"

    },

    droits : {
        alignItems: "center",
        gap: 10,
        width: "46%"


    },
    logo: {
        height: 55,
        width: 55,
        borderRadius: 5,
        padding: 3,
        objectFit: "contain",
        filter: "invert(1)"
    }

})

export default Apropos