import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking, Animated } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'; // Importation du dégradé
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import logo from '../assets/logoblanc.png';
import info from "../assets/info.png"
import cloche from "../assets/cloche.png"
import clocheno from "../assets/clocheno.png"

 const teams = [
  { id: 85, name: 'Paris Saint Germain', logo: "https://media.api-sports.io/football/teams/85.png" },
  { id: 81, name: 'Marseille', logo: "https://media.api-sports.io/football/teams/81.png" },
  { id: 80, name: 'Lyon', logo: "https://media.api-sports.io/football/teams/80.png" },
  { id: 84, name: 'Nice', logo: "https://media.api-sports.io/football/teams/84.png" },
  { id: 91, name: 'Monaco', logo: "https://media.api-sports.io/football/teams/91.png" },
  { id: 541, name: 'Real Madrid', logo: "https://media.api-sports.io/football/teams/541.png" },
    { id: 529, name: 'FC Barcelone', logo: "https://media.api-sports.io/football/teams/529.png" },
        { id: 33, name: 'Manchester United', logo: "https://media.api-sports.io/football/teams/33.png" },
    { id: 49, name: 'Chelsea', logo: "https://media.api-sports.io/football/teams/49.png" },
        { id: 42, name: 'Arsenal', logo: "https://media.api-sports.io/football/teams/42.png" },
{ id: 40, name: 'Liverpool', logo: "https://media.api-sports.io/football/teams/40.png" },
    { id: 157, name: 'Bayern Munich', logo: "https://media.api-sports.io/football/teams/157.png" },
        { id: 114, name: 'Paris FC', logo: "https://media.api-sports.io/football/teams/114.png" },
];

const Header = forwardRef(({ notifsEnabled, selectedTeamId }, ref) => {
  // Récupération des dimensions de l'écran
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation()
    const shakeAnim = useRef(new Animated.Value(0)).current;

const selectedTeam = selectedTeamId
  ? teams.find(team => team.id === selectedTeamId)
  : null;

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
        Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
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
      
      <TouchableOpacity onPress={()=> navigation.navigate("Apropos")}>
<Image source={info} style={{height: 30, width:30}}/>      </TouchableOpacity>
      </View>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity onPress={() => navigation.navigate("Notifs")}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  {selectedTeamId && selectedTeam?.logo ? (
  <Image
    key={selectedTeamId}
    source={{ uri: selectedTeam.logo }}
    style={{ width: 20, height: 20, position: "absolute", zIndex: 1, left: 20, bottom: 18 }}
  />
) : null}
  <Animated.Image
    source={notifsEnabled ? cloche : clocheno}
    style={[{ height: 32, width: 32, marginRight: 10 }, { transform: [{ translateX: shakeAnim }] }]}
  />
</View>
</TouchableOpacity>
    </LinearGradient>
  );
})

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',  // Alignement horizontal
    alignItems: 'center',  // Centrer verticalement
    justifyContent: 'space-between',
    paddingHorizontal: '4%',  // Utilisation de pourcentage
    flexGrow: 1,
    height: 135,
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