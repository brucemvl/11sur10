import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  DeviceEventEmitter,
  StyleSheet,
  Dimensions,
  useWindowDimensions
} from "react-native";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";

import home from "../assets/home.png";
import home2 from "../assets/home2.png";
import live from "../assets/live.png";
import live2 from "../assets/live2.png";
import flag from "../assets/flag.png";
import flag2 from "../assets/flag3.png";
import shield from "../assets/shield.png";
import shield2 from "../assets/shield2.png";





function Menu() {

  const { width } = useWindowDimensions();
      
          const isMediumScreen = width <= 1024 && width > 767;
  const navigation = useNavigation();

  const SCREEN_WIDTH = Dimensions.get("window").width;
const MENU_WIDTH = isMediumScreen ? SCREEN_WIDTH * 0.75 : SCREEN_WIDTH * 0.85;
const BUTTON_WIDTH = MENU_WIDTH / 4;

  const [fontsLoaded] = useFonts({
    Kanito: require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
    Kanitt: require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  if (!fontsLoaded) return null;

  const moveBubble = (index) => {
    setActiveIndex(index);

    Animated.spring(translateX, {
      toValue: index,
      stiffness: 220,
      damping: 12,
      useNativeDriver: true,
    }).start();
  };

  const MenuButton = ({ index, label, icon, icon2, onPress, style }) => {
    const isActive = activeIndex === index;

    return (
      <TouchableOpacity
        style={style}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
        onPress={() => {
                    onPress();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          moveBubble(index);
        }}
      >
        <View style={styles.buttonContent}>
          <Text style={isActive ? styles.selectedText : styles.text}>{label}</Text>

          {/* 🟢 ICÔNE AVEC GLOW */}
          <View>
            <Image
              source={isActive ? icon2 : icon}
              style={[
                styles.img,
                isActive && styles.activeIcon,
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.Menu, isMediumScreen && {width: "74%", left: "13%"}]}>

      {/* BULLE */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.bubble,
          {
            width: "24.2%",
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [0, 1, 2, 3],
                  outputRange: [
                    0,
                    BUTTON_WIDTH,
                    BUTTON_WIDTH * 2,
                    BUTTON_WIDTH * 3,
                  ],
                }),
              },
            ],
          },
        ]}
      />

      <MenuButton
        index={0}
        label="ACCUEIL"
        icon={home}
        icon2={home2}
        style={styles.buttonLeft}
        onPress={() => {
          if (navigation.getCurrentRoute()?.name === "Home") {
            DeviceEventEmitter.emit("scrollToTopHome");
          } else {
            navigation.navigate("Home");
          }
        }}
      />

      <MenuButton
        index={1}
        label="LIVE"
        icon={live}
        icon2={live2}
        style={styles.button}
        onPress={() => navigation.navigate("LivePage")}
      />

      <MenuButton
        index={2}
        label="CLUBS"
        icon={shield}
        icon2={shield2}
        style={styles.button}
        onPress={() => navigation.navigate("ClubPage")}
      />

      <MenuButton
        index={3}
        label="SÉLECTIONS"
        icon={flag}
        icon2={flag2}
        style={styles.buttonRight}
        onPress={() => navigation.navigate("SelectionsPage")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Menu: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    left: "8%",
    width: "84%",
    backgroundColor: "rgb(31, 160, 57)",
    borderRadius: 30,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 4,
    overflow: "hidden",
    alignItems: "center",
  },

  bubble: {
    position: "absolute",
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    borderRadius: 30,
  },

  button: {
    width: "25.5%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "white",
  },

  buttonLeft: {
    width: "25%",
    borderRightWidth: 1,
    borderColor: "white",
  },

  buttonRight: {
    width: "25%",
    borderLeftWidth: 1,
    borderColor: "white",
  },

  buttonContent: {
    alignItems: "center",
    gap: 6,
  },

  text: {
    color: "white",
    fontFamily: "Kanitt",
    fontSize: 11,
  },
  selectedText: {
color: "green",
    fontFamily: "Kanitt",
    fontSize: 11,
  },

  img: {
    width: 24,
    height: 24,
  },

  /* ✨ GLOW */
  

  activeIcon: {
    transform: [{ scale: 1.10 }],
  },
});

export default Menu;