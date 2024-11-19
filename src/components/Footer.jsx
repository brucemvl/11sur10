import bm from "../assets/bm.png"
import { View, Text, Image, TouchableOpacity} from "react-native"
import { StyleSheet } from "react-native"

function Footer(){
    return (
        <View style={styles.footer}>
           <TouchableOpacity ><Text style={{color: "white"}}>A propos</Text></TouchableOpacity>
           <TouchableOpacity ><Text style={{color: "white"}}>Nous contacter</Text></TouchableOpacity>
            <View><Image source={bm} alt="logo developpeur" style={styles.logo}/><Text style={{color: "white"}}>© 2024 BM Development. Tous droits réservés.</Text></View>


        </View>
    )


}

const styles = StyleSheet.create({
    footer: {
        flex: 0.2,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "space-evenly"

    },

    logo: {
        height: 20,
        width: 20,
        filter: "invert(1)"
    }
})

export default Footer