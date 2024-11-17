import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';  // Pour le dégradé
import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import { championnats, europe } from '../datas/Leagues'; // Import des données

const { width } = Dimensions.get('window');  // Récupère la largeur de l'écran

function Filtres() {
    const navigation = useNavigation();

    // On calcule la taille de l'écran
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        // Écoute les changements de la taille de l'écran
        const onChange = () => {
            setWindowWidth(Dimensions.get('window').width);
        };

        Dimensions.addEventListener('change', onChange);

        return () => {
            Dimensions.removeEventListener('change', onChange);
        };
    }, []);

    const isSmallScreen = windowWidth <= 767;
    const isMediumScreen = windowWidth <= 1024 && windowWidth > 767;

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
                            style={styles.lien}
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

            {/* Section Competitions Européennes */}
            <View style={styles.conteneur}>
                <LinearGradient
                    colors={['rgba(60, 60, 60, 0)', 'rgba(4, 4, 4, 0.2)']}
                    style={styles.title}
                >
                    <Text style={styles.titleText}>Compétitions Européennes</Text>
                </LinearGradient>
                <View style={styles.filtres}>
                    {europe.map(({ name, id, logo }) => (
                        <TouchableOpacity
                            key={"lien" + id}
                            style={styles.lienEurope}
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
        padding: 10,
        paddingBottom: 20,
    },
    conteneur: {
        marginBottom: 30,
    },
    title: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        width: '60%',
        alignSelf: 'center',
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    filtres: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    lien: {
        width: '25%',  // Utilise une largeur fixe pour la petite taille d'écran
        alignItems: 'center',
        marginBottom: 20,
        flex: 1,
        flexDirection: "column",
    },
    lienEurope: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoContainer: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    filtreTitle: {
        color: 'white',
        backgroundColor: '#19721b',
        width: '100%',
        textAlign: 'center',
        paddingVertical: 5,
        fontWeight: '600',
    },
    europeText: {
        color: 'white',
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 12,
    },
    // Styles spécifiques à l'écran mobile
    lienMobile: {
        width: '45%', // Sur petits écrans, on ajuste la largeur
    },
    lienTablet: {
        width: '30%', // Sur tablettes, on ajuste également
    },
});

export default Filtres;