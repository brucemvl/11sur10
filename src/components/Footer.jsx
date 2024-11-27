import bm from "../assets/bm.png"
import { View, Text, Image, TouchableOpacity} from "react-native"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useFonts } from "expo-font"

function Footer(){

    const [fontsLoaded] = useFonts({
        "Kanitt": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    })

    const navigation = useNavigation()
    return (
        <View style={styles.footer}>
           <TouchableOpacity onPress={()=> navigation.navigate("Contact")}><Text style={styles.lien}>Nous contacter</Text></TouchableOpacity>
            <View style={styles.droits}><Image source={bm} alt="logo developpeur" style={styles.logo}/><Text style={{color: "white", fontFamily: "Kanito"}}>© 2024 BM Development. Tous droits réservés.</Text></View>

        </View>
    )


}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "space-evenly", 
        width: "100%",
        height: 150
    },

    lien: {
        fontFamily: "Kanito",
        textDecorationLine: "underline",
        color: "white"

    },

    droits : {
        alignItems: "center"

    },
    logo: {
        height: 30,
        width: 30,
        filter: "invert(1)"
    }
})

export default Footer