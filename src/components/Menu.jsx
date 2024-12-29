import { View, Text, TouchableOpacity, Image } from "react-native"
import { StyleSheet } from "react-native"
import home from "../assets/home.png"
import live from "../assets/live.png"
import flag from "../assets/flag.png"
import shield from "../assets/shield.png"
import { useNavigation } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { useState } from "react"

function Menu(){

    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
        "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
      });
      if (!fontsLoaded) {
        return <Text>Loading...</Text>;  // Attendre que les polices et les données soient chargées
      }

      const [selected, setSelected] = useState(true);
    const [selected2, setSelected2] = useState(false);
    const [selected3, setSelected3] = useState(false);
    const [selected4, setSelected4] = useState(false);


      const openAccueil = () => {
         navigation.navigate("Home")
         setSelected(true);
        setSelected2(false);
        setSelected3(false);
        setSelected4(false);

        
    };

    const openLive = () => {
        navigation.navigate("LivePage")
        setSelected(false);
        setSelected2(true);
        setSelected3(false);
        setSelected4(false);
    };

    const openClubs = () => {
        navigation.navigate("ClubPage")
        setSelected(false);
        setSelected2(false);
        setSelected3(true);
        setSelected4(false);

    };

    const openSelect = () => {
        navigation.navigate("SelectionsPage")
        setSelected(false);
        setSelected2(false);
        setSelected3(false);
        setSelected4(true);

    };
    return(
    <View style={styles.Menu}>
        <TouchableOpacity onPress={openAccueil} style={styles.buttonLeft}>
        <View style={selected? styles.selected : {alignItems: "center", gap: 5}}>
            <Text style={styles.text}>Accueil</Text>
            <Image source={home} style={styles.img} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openLive} style={styles.button}>
        <View style={selected2? styles.selected : {alignItems: "center", gap: 5}}>
            <Text style={styles.text}>Live</Text>
            <Image source={live} style={styles.img} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openClubs} style={styles.button}>
        <View style={selected3? styles.selected : {alignItems: "center", gap: 5}}>
            <Text style={styles.text}>Clubs</Text>
            <Image source={shield} style={styles.img} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openSelect} style={styles.buttonRight}>
        <View style={selected4? styles.selected : {alignItems: "center", gap: 5}}>
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
    buttonLeft:{
        borderRightWidth: 1,
        borderRightColor: "white",
        width: "25%"
    },
    buttonRight: {
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
    },
    selected: {
        alignItems: "center",
        gap: 5,
        shadowColor: 'white', // shadow color
        shadowOffset: { width: 0, height: -4 }, // shadow offset
        shadowOpacity: 0.7, // shadow opacity
        shadowRadius: 4,
    }
})

export default Menu