import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Pour le dégradé
import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import { championnats, europe, autres } from '../datas/Leagues'; // Import des données
import { useFonts } from 'expo-font';  // Importer le hook useFonts d'Expo


function ClubPage() {
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
            <View style={styles.conteneur}>
                <LinearGradient
                    colors={['rgba(60, 60, 60, 0)', 'rgba(4, 4, 4, 0.2)']}
                    style={styles.title}
                >
                    <Text style={styles.titleText}>Championnats</Text>
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
                                <Image source={{ uri: logo }} style={styles.logo} />
                            </View>
                        </TouchableOpacity>
                    ))}
                    {autres.map(({ name, id, logo }) => (
                        <TouchableOpacity
                            key={"lien" + id}
                            style={[styles.lien, isSmallScreen && styles.lienMobile, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheChampionnat', { id })}
                        >
                            <Text style={styles.filtreTitle}>{name}</Text>
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: logo }} style={styles.logo} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Section Compétitions Européennes */}
            <View style={styles.conteneur}>
                <LinearGradient
                    colors={['rgb(255, 255, 255, 0.3)', 'rgba(4, 4, 4, 1)']}
                    style={styles.title}
                >
                    <Text style={styles.titleText}>Compétitions Européennes</Text>
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
            </View>
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
        width: "100%",
        backgroundColor: "#b0c4de",
        borderRadius: 15,
        flex: 1,
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
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
        fontWeight: 'bold',
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
        borderColor: "midnightblue",
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
        borderColor: "midnightblue",
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

export default ClubPage;