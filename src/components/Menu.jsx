import { View, Text, TouchableOpacity, Image } from "react-native"
import { StyleSheet } from "react-native"
import home from "../assets/home.png"
import live from "../assets/live.png"
import flag from "../assets/flag.png"
import shield from "../assets/shield.png"
import { useNavigation } from "@react-navigation/native"

function Menu(){

    const navigation = useNavigation();


    return(
    <View style={styles.Menu}>
        <TouchableOpacity onPress={()=> navigation.navigate("Home")} style={styles.button}>
        <View style={{alignItems: "center", gap: 5}}>
            <Text style={styles.text}>Accueil</Text>
            <Image source={home} style={styles.img} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate("LivePage")} style={styles.button}>
        <View style={{alignItems: "center", gap: 5}}>
            <Text style={styles.text}>Live</Text>
            <Image source={live} style={styles.img} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate("ClubPage")} style={styles.button}>
        <View style={{alignItems: "center", gap: 5}}>
            <Text style={styles.text}>Clubs</Text>
            <Image source={shield} style={styles.img} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate("Selections")} style={styles.button}>
        <View style={{alignItems: "center", gap: 5}}>
            <Text style={styles.text}>Selections</Text>
            <Image source={flag} style={styles.img} />

        </View>
        </TouchableOpacity>

    </View>
    )
}

const styles = StyleSheet.create({
    Menu: {
        flexDirection: "row",
        flex: 0.09,
        justifyContent: "space-around",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "grey",
        borderTopWidth: 5,
    },
    button: {
        borderRightWidth: 1,
        borderRightColor: "white",
        borderLeftWidth: 1,
        borderLeftColor: "white",
        width: "25%"
    },
    text: {
        color: "white",
        fontFamily: "Kanito"
    },
    img: {
        height: 24,
        width: 24
    }
})

export default Menu