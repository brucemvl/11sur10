import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { useNavigation } from '@react-navigation/native'; 
import { selections } from '../datas/Leagues'; // Import des données
import { useFonts } from 'expo-font';  
import cdm2026 from "../assets/cdm2026.png"


function SelectionsPage() {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
        "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
        "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf")
    });

    const { width } = useWindowDimensions();

    const isSmallScreen = width <= 767;
    const isMediumScreen = width <= 1024 && width > 767;

    const nameCompet = {
        "UEFA Nations League" : "Nations League",
       "World Cup - Qualification Europe" : "CDM 2026 Europe" ,
        "World Cup - Qualification Africa" : "CDM 2026 Afrique",
         "World Cup - Qualification South America" : "CDM 2026 AmSud"
    }

    return (
        <ScrollView contentContainerStyle={styles.competitions}>
            {/* Section Championnats */}

            <LinearGradient colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
                    style={styles.title}
                >
                    <Text style={styles.titleText}>Qualifs CDM</Text>
                </LinearGradient>

            <LinearGradient colors={["rgba(64, 82, 130, 1)", 'rgba(103, 131, 184, 1)']} style={styles.conteneur} >
                
                <View style={styles.filtres}>
                    {selections.map(({ name, id, logo, flag, season }) => (
                        id === 29 || id === 32 || id === 34 ?
                        <TouchableOpacity
                            key={"lien" + id}
                            style={[styles.lien, isSmallScreen && styles.lienMobile, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheSelections', { id })}
                        >
                            <Text style={styles.filtreTitle}>{nameCompet[name] || name}</Text>
                            <View style={styles.logoContainer}>
                                <Image source={ id === 32 ? cdm2026 : {uri: logo }} style={styles.logo} />
                            </View>
                            <Image source={{ uri: flag }} style={styles.flag} />
                        </TouchableOpacity>
                        : null
                    ))}
                </View>
            </LinearGradient>

            <LinearGradient colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
                    style={styles.title}
                >
                    <Text style={styles.titleText}>Competitions</Text>
                </LinearGradient>

<LinearGradient colors={["rgba(64, 82, 130, 1)", 'rgba(103, 131, 184, 1)']} style={styles.conteneur} >
                
                <View style={styles.filtres}>
                    {selections.map(({ name, id, logo, flag, season }) => (
                        id === 5 || id === 6 ?
                        <TouchableOpacity
                            key={"lien" + id}
                            style={[styles.lien, isSmallScreen && styles.lienMobile, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheSelections', { id })}
                        >
                            <Text style={styles.filtreTitle}>{nameCompet[name] || name}</Text>
                            <View style={styles.logoContainer}>
                                <Image source={ id === 32 ? cdm2026 : {uri: logo }} style={styles.logo} />
                            </View>
                            <Image source={{ uri: flag }} style={styles.flag} />
                        </TouchableOpacity>
                        : null
                    ))}
                </View>
            </LinearGradient>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    competitions: {
        width: "98%",
        marginTop: 10,
        paddingInlineStart: "2%",
        shadowColor: '#000', // shadow color
        shadowOffset: { width: 0, height: 5 }, // shadow offset
        shadowOpacity: 0.8, // shadow opacity
        shadowRadius: 3,
        elevation: 4,
    },
    conteneur: {
        marginBottom: 30,
        width: "100%",
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
        borderRadius: 25,
        borderColor: 'rgb(15, 23, 82)',
        paddingBlock: 6,
        backgroundColor: "aliceblue",
        overflow: "hidden"
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
        fontSize: 11.5,
        flex: 1,
        alignItems: "center",
        fontFamily: "Permanent",
    },
    flag: {

    },

    // Styles spécifiques à l'écran mobile
    lienMobile: {
        width: "31%", // Sur petits écrans, on ajuste la largeur
    },
    lienTablet: {
        width: '25%', // Sur tablettes, on ajuste également
    },
});

export default SelectionsPage;