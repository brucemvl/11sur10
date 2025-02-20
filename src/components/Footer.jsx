import bm from "../assets/bm.png"
import { View, Text, Image, TouchableOpacity} from "react-native"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useFonts } from "expo-font"
import insta from "../assets/insta.png"


function Footer(){

    const [fontsLoaded] = useFonts({
        "Kanitt": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    })

    const openExternalLink = (url) => {
        Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
      };

    const navigation = useNavigation()
    return (
        <View style={styles.footer}>
            <View style={{paddingInline: 5, alignItems: "center",  flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
            <TouchableOpacity style={{width: "27%", alignItems: "center"}} onPress={()=>openExternalLink("https://www.instagram.com/11_sur_10/")}>
      <Image source={insta} style={{height: 48, width: 48}}/>
      </TouchableOpacity>
      <View style={styles.droits}><Image source={bm} alt="logo developpeur" style={styles.logo}/><Text style={{color: "white", fontFamily: "Kanito", fontSize: 8}}>© 2024 BM Development. Tous droits réservés.</Text></View>

           <TouchableOpacity style={{width: "27%", alignItems: "center"}} onPress={()=> navigation.navigate("Contact")}><Text style={styles.lien}>Nous contacter</Text></TouchableOpacity>
           </View>

        </View>
    )


}

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row-reverse",
        backgroundColor: "black",
        alignItems: "center",
        width: "100%",
flexGrow: 1    },

    lien: {
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

export default Footer