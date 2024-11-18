import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Pour le dégradé
import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import { championnats, europe } from '../datas/Leagues'; // Import des données

function Filtres() {
    const navigation = useNavigation();

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
                            <Text style={styles.europeText}>{name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    competitions: {
        paddingBottom: 20,
        width: "100%",
        fontFamily: "PermanentMarker-Regular",
    },
    conteneur: {
        marginBottom: 30,
        width: "100%",
        backgroundColor: "#b0c4de",
        borderRadius: 15,
    },
    title: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        width: '60%',
        alignSelf: 'center',
        backgroundColor: "midnightblue",
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
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
        marginBottom: 20,
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
        marginBottom: 20,
    },
    logoContainer: {
        width: "90%",
        height: "90%",
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: '600',
        paddingBlock: 5,
        fontSize: 12,
        flex: 1,
        alignItems: "center",
    },
    europeText: {
        color: 'white',
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 12,
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