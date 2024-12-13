import banner3 from "../assets/banner4.jpg";
import banner4 from "../assets/banner5.jpg";
import banner5 from "../assets/banner6.jpg";
import banner6 from "../assets/banner7.jpg";
import banner7 from "../assets/banner8.webp";
import banner8 from "../assets/banner9.webp";
import banner9 from "../assets/banner10.webp";
import banner10 from "../assets/banner11.jpg";
import banner11 from "../assets/banner12.webp";
import banner12 from "../assets/banner13.webp";
import banner13 from "../assets/banner14.jpg";
import banner14 from "../assets/banner15.webp";
import banner15 from "../assets/banner16.jpg";
import banner16 from "../assets/banner17.webp";
import banner17 from "../assets/banner18.jpg";
import banner18 from "../assets/banner19.webp";
import banner19 from "../assets/banner20.webp"
import banner20 from "../assets/banner21.webp"
import banner21 from "../assets/banner22.webp"
import banner22 from "../assets/banner23.webp"




import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";


function Banner(){

    const [fontsLoaded] = useFonts({
        "Kanitt": require("../assets/fonts/Kanit/Kanit-Black.ttf"),
        
      });

    const photosBan = [
        banner3, banner4, banner5, banner6, banner7, banner8, banner9,
        banner10, banner11, banner12, banner13, banner14, banner15, banner16, banner17, banner18, banner19, banner20, banner21, banner22
      ];
    
      const [randomPhoto, setRandomPhoto] = useState(photosBan[Math.floor(Math.random() * photosBan.length)]);
      const [isActive, setIsActive] = useState(true);
    
      function aleatoire(max) {
        return Math.floor(Math.random() * max);
      }
    
      const change = () => {
        setIsActive(false);
        setTimeout(() => {
          let random = aleatoire(photosBan.length);
          setRandomPhoto(photosBan[random]);
          setIsActive(true);
        }, 300);
      };
    
      useEffect(() => {
        const interval = setInterval(change, 6000); // Changer toutes les 6 secondes
        return () => clearInterval(interval);
      }, []);

      if (!fontsLoaded) {
        return <Text>Loading...</Text>;  // Attendre que les polices et les données soient chargées
      }

    return(

<View style={styles.banner}>
        <Image
          source={randomPhoto}
          style={[styles.bannerImage, isActive && styles.active]}
        />
        <View style={styles.bannerText}>
          <Text style={{fontFamily: "Kanitt", color: "white", fontSize: 32,}}>100% FOOT</Text>
          <Text style={styles.bannerSubtitle}>Toutes vos infos Football en un clic</Text>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({

banner: {
    height: 160,
    borderRadius: 15,
    width: "100%",
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
    opacity: 0.6,
    filter: "brightness(0.5)", // Cette propriété n'est pas supportée en React Native
    transition: "opacity 0.2s ease-in-out", // Pas supporté en React Native
  },

  active: {
    opacity: 1,
    transitionDuration: "0.6s", // Pas supporté, utilise plutôt une animation
  },

  bannerText: {
    position: "absolute",
    bottom: "35%",
    left: "13%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontSize: 24,
    lineHeight: 0,
  },

  bannerTitle: {
    fontWeight: "900",
    fontSize: 32,
    color: "white",
    fontFamily: "Kanitt"

  },

  bannerSubtitle: {
    fontWeight: "900",
    fontSize: 18,
    color: "white",
    fontFamily: "Kanitt"

  },

  "@media (max-width: 767px)": {
    blocpage: {
      banner: {
        height: 80,
        bannerImage: {
          objectPosition: "0 -25px",
        },
        bannerText: {
          bannerTitle: {
            fontSize: 16,
          },
          bannerSubtitle: {
            fontSize: 12,
          },
        },
      },
    },
  },
})

export default Banner