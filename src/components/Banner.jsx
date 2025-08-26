import banner3 from "../assets/banner4.webp";
import banner4 from "../assets/banner5.jpg";
import banner5 from "../assets/banner6.jpg";
import banner6 from "../assets/banner7.jpg";
import banner7 from "../assets/banner8.webp";
import banner8 from "../assets/banner9.webp";
import banner9 from "../assets/banner10.jpg";
import banner10 from "../assets/banner11.jpg";
import banner11 from "../assets/banner12.jpg";
import banner12 from "../assets/banner13.webp";
import banner13 from "../assets/banner14.webp";
import banner14 from "../assets/banner15.webp";
import banner15 from "../assets/banner16.jpg";
import banner16 from "../assets/banner17.jpg";
import banner17 from "../assets/banner18.jpg";
import banner18 from "../assets/banner19.jpg";
import banner19 from "../assets/banner20.webp"
import banner20 from "../assets/banner21.webp"
import banner21 from "../assets/banner22.webp"
import banner22 from "../assets/banner23.webp"
import banner23 from "../assets/banner24.webp"
import banner24 from "../assets/banner25.webp"
import banner25 from "../assets/banner26.webp"
import banner26 from "../assets/banner27.jpg"
import banner27 from "../assets/banner28.webp"
import banner28 from "../assets/banner29.webp"
import banner29 from "../assets/banner30.jpg"
import banner30 from "../assets/banner31.jpg"
import banner31 from "../assets/banner32.webp"
import banner32 from "../assets/banner33.webp"
import banner33 from "../assets/banner34.jpg"
import banner34 from "../assets/banner35.webp"
import banner35 from "../assets/banner36.webp"
import banner36 from "../assets/banner37.jpg"
import banner37 from "../assets/banner38.jpg"
import banner38 from "../assets/banner39.jpg"
import banner39 from "../assets/banner40.jpg"
import banner40 from "../assets/banner41.jpg"
import banner41 from "../assets/banner42.webp"
import banner42 from "../assets/banner43.webp"
import banner43 from "../assets/banner44.jpg"
import banner44 from "../assets/banner45.webp"
import banner45 from "../assets/banner46.jpg"
import banner46 from "../assets/banner47.webp"
import banner47 from "../assets/banner48.webp"
import banner48 from "../assets/banner49.webp"
import banner49 from "../assets/banner50.jpg"
import banner50 from "../assets/banner51.webp"
import banner51 from "../assets/banner52.webp"
import banner52 from "../assets/banner53.webp"
import banner53 from "../assets/banner54.webp"
import banner54 from "../assets/banner55.webp"
import banner58 from "../assets/banner59.jpg"
import banner59 from "../assets/banner60.webp"
import banner60 from "../assets/banner61.webp"
import banner61 from "../assets/banner62.webp"
import banner62 from "../assets/banner63.webp"
import banner63 from "../assets/banner64.webp"




import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native"

const photosBan = [
  banner3, banner4, banner5, banner6, banner7, banner8, banner9,
  banner10, banner11, banner12, banner13, banner14, banner15, banner16, banner17, banner18, banner19, banner20, banner21, banner22, banner23, banner24, banner25, banner26, banner27, banner28, banner29, banner30, banner31, banner32, banner33, banner34, banner35, banner36, banner37, banner38, banner39, banner40, banner41, banner42, banner43, banner44, banner45, banner46, banner47, banner48, banner49, banner50, banner51,banner52, banner53, banner54, banner58, banner59, banner60, banner61,
  banner62, banner63
];


function Banner() {
  const [randomPhoto, setRandomPhoto] = useState(photosBan[Math.floor(Math.random() * photosBan.length)]);
  const [isActive, setIsActive] = useState(true);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Initial opacity 0

  function aleatoire(max) {
    return Math.floor(Math.random() * max);
  }

  const change = () => {
    setIsActive(false);
    // Animation pour rendre l'image invisible (opacity = 0)
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Une fois l'animation de fade-out terminée, changer la photo
      let random = aleatoire(photosBan.length);
      setRandomPhoto(photosBan[random]);

      // Animation pour faire réapparaître l'image (opacity = 1)
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in
        duration: 800,
        useNativeDriver: true,
      }).start(() => setIsActive(true)); // Set active after fade in
    });
  };

  // Utilisation de useEffect pour changer l'image toutes les 6 secondes
  useEffect(() => {
    const interval = setInterval(change, 6000); // Changer toutes les 6 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.banner}>
      <Animated.Image
        source={randomPhoto}
        style={[styles.bannerImage, { opacity: fadeAnim }]} // Animated opacity
      />
      <View style={styles.bannerText}>
        <Text style={styles.bannerTitle}>100% FOOT</Text>
        <Text style={styles.bannerSubtitle}>Toutes vos infos Football en un clic</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 170,
    borderRadius: 15,
    width: "96%",
    position: "relative",
    overflow: "hidden",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 15,
    filter: "brightness(0.5)",
  },

  bannerText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    color: "white",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    lineHeight: 0,
  },

  bannerTitle: {
    fontSize: 32,
    color: "white",
    fontFamily: "Kanitt",
    textAlign: "center",
  },

  bannerSubtitle: {
    fontSize: 18,
    color: "white",
    fontFamily: "Kanitt",
  },
});

export default Banner;