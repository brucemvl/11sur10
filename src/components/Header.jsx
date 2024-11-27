import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'; // Importation du dégradé
import { useNavigation } from '@react-navigation/native';

import logo from '../assets/logoblanc.png';
import insta from "../assets/insta.png"

function Header() {
  // Récupération des dimensions de l'écran
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation()


  const openExternalLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  };

  return (
    <LinearGradient
      colors={['rgba(255,255,255, 45)', 'rgba(17, 27, 101, 100)', 'rgba(0, 0, 0, 75)']}
      style={styles.header}
    >
      <Image source={logo} style={styles.logo} />
      {/* Ici, tu peux ajouter ton menu ou d'autres éléments */}
      <View style={{alignItems: "center", gap: 25, paddingTop: 30}}>
      <TouchableOpacity onPress={()=>openExternalLink("https://www.instagram.com/11_sur_10/")}>
      <Image source={insta} style={{height: 40, width: 40}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate("Apropos")}>
        <Text style={{fontFamily: "Kanito", color: "white", textDecorationLine: "underline"}}>A Propos</Text>
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
    backgroundColor: 'midnightblue', 
  },
  logo: {
    width: 100, 
    height: 100, 
    borderBottomColor: "white",
    borderBottomWidth: 6,
    borderTopColor: "white",
    borderTopWidth: 6,
    marginInline: 8, 
    resizeMode: "contain"
  },
  // Tu peux ajouter un style pour mobile avec la largeur de l'écran
  logoSmall: {
    width: 70,  // 5em
    height: 70,  // 5em
  },
});

export default Header;