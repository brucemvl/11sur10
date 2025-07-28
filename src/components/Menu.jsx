import { View, Text, TouchableOpacity, Image, Animated, Easing } from "react-native";
import { StyleSheet } from "react-native";
import home from "../assets/home.png";
import live from "../assets/live.png";
import flag from "../assets/flag.png";
import shield from "../assets/shield.png";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState } from "react";



function Menu() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
    "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
  });

  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);

  // Assurez-vous que fontsLoaded ne provoque pas de problème
  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Attendre que les polices et les données soient chargées
  }

  const openAccueil = () => {
    navigation.navigate("Home");
    setSelected(true);
    setSelected2(false);
    setSelected3(false);
    setSelected4(false);
  };

  const openLive = () => {
    navigation.navigate("LivePage");
    setSelected(false);
    setSelected2(true);
    setSelected3(false);
    setSelected4(false);
  };

  const openClubs = () => {
    navigation.navigate("ClubPage");
    setSelected(false);
    setSelected2(false);
    setSelected3(true);
    setSelected4(false);
  };

  const openSelect = () => {
    navigation.navigate("SelectionsPage");
    setSelected(false);
    setSelected2(false);
    setSelected3(false);
    setSelected4(true);
  };

  function AnimatedMenuButton({ onPress, selected, label, icon }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.button}
    >
      <Animated.View
        style={[
          selected ? styles.selected : { alignItems: "center", gap: 5 },
          { transform: [{ scale }] }
        ]}
      >
        <Text style={styles.text}>{label}</Text>
        <Image source={icon} style={styles.img} />
      </Animated.View>
    </TouchableOpacity>
  );
}

  return (
    <View style={styles.Menu}>
      <TouchableOpacity onPress={openAccueil} style={styles.buttonLeft}>
        <View style={selected ? styles.selected : { alignItems: "center", gap: 5 }}>
          <Text style={styles.text}>Accueil</Text>
          <Image source={home} style={styles.img} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={openLive} style={styles.button}>
        <View style={selected2 ? styles.selected : { alignItems: "center", gap: 5 }}>
          <Text style={styles.text}>Live</Text>
          <Image source={live} style={styles.img} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={openClubs} style={styles.button}>
        <View style={selected3 ? styles.selected : { alignItems: "center", gap: 5 }}>
          <Text style={styles.text}>Clubs</Text>
          <Image source={shield} style={styles.img} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={openSelect} style={styles.buttonRight}>
        <View style={selected4 ? styles.selected : { alignItems: "center", gap: 5 }}>
          <Text style={styles.text}>Selections</Text>
          <Image source={flag} style={styles.img} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    Menu: {
        flexDirection: "row",
        paddingBlock: 10,
        backgroundColor: "rgb(31, 160, 57)",
        width: "85%",
position: "absolute",
bottom: 20,
left: "7.5%",
 borderRadius: 30,
 shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 0 }, // shadow offset
    shadowOpacity: 0.9, // shadow opacity
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: "white",
    elevation: 4
    },

    button: {
        borderRightWidth: 1,
        borderRightColor: "white",
        borderLeftWidth: 1,
        borderLeftColor: "white",
        width: "25.3%",
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
        shadowOpacity: 0.9, // shadow opacity
        shadowRadius: 4,
    }
})

export default Menu