import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'; // Importation du dégradé

import logo from '../assets/logoblanc.png';  // Assure-toi que l'image est bien dans ton projet

function Header() {
  // Récupération des dimensions de l'écran
  const screenWidth = Dimensions.get('window').width;

  return (
    <LinearGradient
      colors={['rgba(255,255,255, 45)', 'rgba(17, 27, 101, 100)', 'rgba(0, 0, 0, 75)']}
      style={styles.header}
    >
      <Image source={logo} style={styles.logo} />
      {/* Ici, tu peux ajouter ton menu ou d'autres éléments */}
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