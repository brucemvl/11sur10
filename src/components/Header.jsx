import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'; // Importation du dégradé
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import logo from '../assets/logoblanc.png';
import insta from "../assets/insta.png"

function Header() {
  // Récupération des dimensions de l'écran
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation()

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

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;  // Attendre que les polices et les données soient chargées
  }
  return (
    <LinearGradient
      colors={['rgba(100, 160, 236, 1)', 'rgba(24, 24, 91, 1)', 'rgba(0, 0, 0, 1)']}
      style={styles.header}
    >
      <Image source={logo} style={styles.logo} />
      {/* Ici, tu peux ajouter ton menu ou d'autres éléments */}
      <View style={{alignItems: "center", gap: 30, paddingTop: 40}}>
      <TouchableOpacity onPress={()=>openExternalLink("https://www.instagram.com/11_sur_10/")}>
      <Image source={insta} style={{height: 48, width: 48}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("Apropos")}>
        <Text style={{fontFamily: "Kanito", color: "white", textDecorationLine: "underline", height: 48}}>A Propos</Text>
      </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 160,  // 10em environ    
    flexDirection: 'row',  // Alignement horizontal
    alignItems: 'center',  // Centrer verticalement
    justifyContent: 'space-between',
    paddingHorizontal: '2%',  // Utilisation de pourcentage
  },
  logo: {
    width: 100, 
    height: 100, 
    marginInline: 8, 
    resizeMode: "contain",
    marginTop: 10
  },
  // Tu peux ajouter un style pour mobile avec la largeur de l'écran
  logoSmall: {
    width: 70,  // 5em
    height: 70,  // 5em
  },
});

export default Header;