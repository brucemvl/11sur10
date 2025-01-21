import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Pour le dégradé
import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import { selections } from '../datas/Leagues'; // Import des données
import { useFonts } from 'expo-font';  // Importer le hook useFonts d'Expo


function SelectionsPage() {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
        "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
        "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf")
    });

    // Utilisation du hook useWindowDimensions pour obtenir les dimensions de l'écran
    const { width } = useWindowDimensions();

    // Déterminez la taille de l'écran pour ajuster les styles
    const isSmallScreen = width <= 767;
    const isMediumScreen = width <= 1024 && width > 767;

    return (
        <ScrollView contentContainerStyle={styles.competitions}>
            {/* Section Championnats */}
            <LinearGradient colors={["rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={styles.conteneur} >
                <LinearGradient colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
                    style={styles.title}
                >
                    <Text style={styles.titleText}>Competitions</Text>
                </LinearGradient>
                <View style={styles.filtres}>
                    {selections.map(({ name, id, logo, flag, season }) => (
                        <TouchableOpacity
                            key={"lien" + id}
                            style={[styles.lien, isSmallScreen && styles.lienMobile, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheSelections', { id })}
                        >
                            <Text style={styles.filtreTitle}>{name}</Text>
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: logo }} style={styles.logo} />
                            </View>
                            <Image source={{ uri: flag }} style={styles.flag} />
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>

            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    competitions: {
        width: "98%",
        marginTop: 20,
        paddingInlineStart: "2%"
    },
    conteneur: {
        marginBottom: 30,
        width: "100%",
        backgroundColor: "#b0c4de",
        borderRadius: 15,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,

    },
    title: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        width: '75%',
        alignSelf: 'center',
        backgroundColor: "midnightblue",
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        fontFamily: "Kanitt",
    },
    filtres: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        width: "100%",
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
   
    logoContainer: {
        width: "85%",
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
    flag: {

    },

    // Styles spécifiques à l'écran mobile
    lienMobile: {
        width: 120, // Sur petits écrans, on ajuste la largeur
    },
    lienTablet: {
        width: '25%', // Sur tablettes, on ajuste également
    },
});

export default SelectionsPage;