import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking, Animated } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'; // Importation du dégradé
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import logo from '../assets/logoblanc.png';
import insta from "../assets/insta.png"
import cloche from "../assets/cloche.png"
import clocheno from "../assets/clocheno.png"



const Header = forwardRef(({ notifsEnabled }, ref) => {
  // Récupération des dimensions de l'écran
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation()
    const shakeAnim = useRef(new Animated.Value(0)).current;


  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
    "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
    "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"),
    "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf")
  });


  const openExternalLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  };

  useImperativeHandle(ref, () => ({
    triggerShake: () => {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }));

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;  // Attendre que les polices et les données soient chargées
  }
  return (
    <LinearGradient
      colors={['rgba(100, 160, 236, 1)', 'rgb(24, 29, 91)', 'rgba(0, 0, 0, 1)', "rgba(94, 94, 94, 0)"]}
      locations={[0, 0.6, 0.92, 1]} // Spécifie les positions des couleurs
      style={styles.header}
    >
      <View style={{alignItems: "center"}}>
      <TouchableOpacity onPress={()=>openExternalLink("https://www.instagram.com/11_sur_10/")} style={{position: "relative", bottom: 8}}>
      <Image source={insta} style={{height: 44, width: 44}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("Apropos")}>
        <Text style={{fontFamily: "Kanitt", color: "white", textDecorationLine: "underline"}}>A Propos</Text>
      </TouchableOpacity>
      </View>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.navigate("Notifs")}>
  <Animated.Image
    source={notifsEnabled ? cloche : clocheno}
    style={[
      {height: 30, width: 30, marginRight: 10},
      { transform: [{ translateX: shakeAnim }] } // ← Vibration ici
    ]}
  />
</TouchableOpacity>
    </LinearGradient>
  );
})

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',  // Alignement horizontal
    alignItems: 'center',  // Centrer verticalement
    justifyContent: 'space-between',
    paddingHorizontal: '3%',  // Utilisation de pourcentage
    flexGrow: 1,
    height: 125,
    paddingTop: 30
  },
  logo: {
    width: 100, 
    height: 80, 
    marginLeft: 20, 
    resizeMode: "contain",
  },
  // Tu peux ajouter un style pour mobile avec la largeur de l'écran
  logoSmall: {
    width: 70,  // 5em
    height: 70,  // 5em
  },
});

export default Header;