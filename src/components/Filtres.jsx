import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Pour le dégradé
import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import { championnats, europe } from '../datas/Leagues'; // Import des données
import { useFonts } from 'expo-font';  // Importer le hook useFonts d'Expo
import ligue1 from "../assets/logoligue1.webp"
import ligue2 from "../assets/ligue2.jpg"


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
        <ScrollView contentContainerStyle={styles.competitions}>
            {/* Section Championnats */}
            <LinearGradient colors={[ "rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={styles.conteneur}>
                <LinearGradient colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.title}>
                    <Text style={styles.titleText}>CHAMPIONNATS</Text>
                </LinearGradient>
                <View style={styles.filtres}>
                    {championnats.map(({ name, id, logo }) => (
                        <TouchableOpacity
                            key={"lien" + id}
                            style={[styles.lien, isSmallScreen && styles.lienMobile, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheChampionnat', { id })}
                        >
                            <Text style={styles.filtreTitle}>{name}</Text>
                            <View style={styles.logoContainer}>
                            { logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image source={ligue1} style={styles.logo} /> : logo === "https://media.api-sports.io/football/leagues/62.png" ? <Image source={ligue2} style={styles.logo} /> : <Image source={{ uri: logo }} style={styles.logo} />}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>

            {/* Section Compétitions Européennes */}
            <LinearGradient colors={[ "rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={styles.conteneur}>
            <LinearGradient colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.title}>
                    <Text style={styles.titleText}>COMPETITIONS EUROPEENNES</Text>
                </LinearGradient>
                <View style={styles.filtres}>
                    {europe.map(({ name, id, logo }) => (
                        <TouchableOpacity
                            key={"lien" + id}
                            style={[styles.lienEurope, isSmallScreen && styles.lienMobile, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheEurope', { id })}
                        >
                            <View style={styles.logoContainer}>
                               <Image source={{ uri: logo }} style={styles.logo} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    competitions: {
        width: "100%",
        marginTop: 20
    },
    conteneur: {
        marginBottom: 30,
        borderRadius: 15,
        flexDirection: "column",
        backgroundColor: "steelblue",
        justifyContent: "center",
        padding: 5
        
    },
    title: {
        paddingBlock: 10,
        paddingInline: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        alignSelf: 'center',
        backgroundColor: "midnightblue",
      },
    titleText: {
        color: 'white',
        fontFamily: "Kanitt",

    },
    filtres: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        gap: 10,
        width: "100%",
        justifyContent: "center"
    },
    lien: {
        width: 100,  // Utilise une largeur fixe pour la petite taille d'écran
        height: 125,
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: "column-reverse",
        borderWidth: 8,
        borderRadius: 15,
        borderColor: 'rgb(15, 23, 82)',
        paddingBlock: 6,
        backgroundColor: "aliceblue",
    },
    lienEurope: {
        width: '30%',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 20,
        flexDirection: "column-reverse",
        borderWidth: 8,
        borderRadius: 15,
        borderColor: 'rgb(15, 23, 82)',
        paddingBlock: 6,
        backgroundColor: "aliceblue",
        height: 125
    },
    logoContainer: {
        width: "85%",
        height: "85%",
        justifyContent: 'center',
        alignItems: 'center',
        height: "70%",
    },
    logo: {
        width: "75%",
        height: "75%",
        resizeMode: 'contain',
    },
    filtreTitle: {
        color: 'white',
        backgroundColor: '#19721b',
        width: '100%',
        textAlign: 'center',
        fontWeight: '400',
        paddingBlock: 5,
        fontSize: 12.1,
        flex: 1,
        alignItems: "center",
        fontFamily: "Permanent",


    },
   
    // Styles spécifiques à l'écran mobile
    lienMobile: {
        width: 120, // Sur petits écrans, on ajuste la largeur
    },
    lienTablet: {
        width: '25%', // Sur tablettes, on ajuste également
    },
});

export default Filtres;