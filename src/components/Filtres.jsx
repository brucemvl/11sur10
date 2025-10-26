import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import { championnats, europe, autres, selections } from '../datas/Leagues'; // Import des données
import { useFonts } from 'expo-font';  // Importer le hook useFonts d'Expo
import ligue1 from "../assets/logoligue1.webp"
import ligue2 from "../assets/ligue2.jpg"
import ucl from "../assets/logoucl.png"
import fifaclubwc from "../assets/fifaclubwc2.png"
import plus from "../assets/plus.png"


function Filtres() {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
        "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
        "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
        "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"),
        "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf")
    });

    // Utilisation du hook useWindowDimensions pour obtenir les dimensions de l'écran
    const { width } = useWindowDimensions();

    const isSmallScreen = width <= 767;
    const isMediumScreen = width <= 1024 && width > 767;

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.competitions}>
            {europe.map(({ id, logo }) => id === 848 || id === 3 ? null : <TouchableOpacity key={"lien" + id} onPress={() => navigation.navigate('FicheEurope', { id })} style={{ marginInline: 4 }}><View style={[styles.lien, { backgroundColor: id === 2 ? 'rgba(32, 46, 91, 1)' : null }, isMediumScreen && styles.lienTablet]}><Image source={id === 2 ? ucl : { uri: logo }} style={id === 2 ? {height: 45,  objectFit: "contain"} : styles.logo} /></View></TouchableOpacity>)}
            {championnats.map(({ id, logo }) => id === 197 ? null : <TouchableOpacity key={"lien" + id} onPress={() => navigation.navigate('FicheChampionnat', { id })} style={{ marginInline: 4, shadowColor: "black" }}><View style={[styles.lien, { backgroundColor: id === 61 ? "#085dfe" : id === 135 || id === 62 ? "#fff" : id === 78 ? "#D10515" : id === 140 ? 'rgb(242, 235, 106)' : null }, isMediumScreen && styles.lienTablet]}><Image source={logo === "https://media.api-sports.io/football/leagues/61.png" ? ligue1 : logo === "https://media.api-sports.io/football/leagues/62.png" ? ligue2 : { uri: logo }} style={styles.logo} /></View></TouchableOpacity>)}
<TouchableOpacity onPress={()=> navigation.navigate('ClubPage')}>
    <View style={[styles.lien, isMediumScreen && styles.lienTablet]}> 
<Image source={plus} style={{height: 40, width: 40}}/>    
</View>
</TouchableOpacity>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    competitions: {
        alignItems: "center"

    },
    lien: {
        borderWidth: 6,
        borderColor: 'rgb(11, 19, 81)',
        borderRadius: 50,
        height: 72,
        width: 72,
        justifyContent: "center",
        alignItems: "center",
        padding: 35,
    },

    lienTablet: {
height: 100,
width: 100
    },

    logo: {
        width: 48,
        height: 48,
        objectFit: 'contain',
    }
});

export default Filtres;