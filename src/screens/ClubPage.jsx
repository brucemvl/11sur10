import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Pour le dégradé
import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import { championnats, europe, autres, national, national2, national3 } from '../datas/Leagues'; // Import des données
import { useFonts } from 'expo-font';  // Importer le hook useFonts d'Expo
import ligue1 from "../assets/logoligue1.webp"
import ligue2 from "../assets/ligue2.jpg"
import  SvgUri  from 'react-native-svg';

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
        <ScrollView >
            <View style={styles.competitions}>
            {/* Section Championnats */}
            <LinearGradient colors={["rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={styles.conteneur} >
                <LinearGradient colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']}
                    style={styles.title}
                >
                    <Text style={styles.titleText}>Championnats</Text>
                </LinearGradient>
                <View style={styles.filtres}>
                    <View style={{flexDirection: "column"}}>
                    <Text style={{textAlign: "center", fontFamily: "Kanitus", color: "white", marginBlock: 10}}>Europe</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center"}}>
                    {championnats.map(({ name, id, flag, logo }) => (
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
                    </View>
                    <View style={{flexDirection: "column"}}>
                    <Text style={{textAlign: "center", fontFamily: "Kanitus", color: "white", marginBlock: 10}}>Reste du monde</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center"}}>  
                      {autres.map(({ name, id, logo, country }) => (
                        <View style={{alignItems: "center", marginBottom: 10}}>
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
                        <Text style={{fontFamily: "Kanitalic", color: "white"}}>{country === "Turkey" ? "Turquie" : country === "Saudi Arabia" ? "Arabie Saoudite" : country}</Text>
                        </View>
                    ))}
                    </View>
                    </View>
                </View>
            </LinearGradient>

            {/* Section Compétitions Européennes */}
            <LinearGradient colors={["rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={styles.conteneur} >
                <LinearGradient colors={[ 'rgb(11, 38, 126)', 'rgb(0, 0, 0)']} style={styles.title}
                >
                    <Text style={styles.titleText}>Compétitions Européennes</Text>
                </LinearGradient>
                <View style={styles.filtres}>
                    <View style={{flexDirection: "row", gap: 10}}>
                    {europe.map(({ name, id, logo }) => (
                        <TouchableOpacity
                            key={"lien" + id}
                            style={styles.lienEurope}
                            onPress={() => navigation.navigate('FicheEurope', { id })}
                        >
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: logo }} style={styles.logo} />
                            </View>
                        </TouchableOpacity>
                    ))}
                    </View>

                </View>
            </LinearGradient>
{/*
            <LinearGradient colors={["rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={styles.conteneur} >
                <LinearGradient colors={['rgba(3, 42, 176, 100)', 'rgba(39, 54, 50, 75)']} style={styles.title}
                >
                    <Text style={styles.titleText}>Amateurs</Text>
                </LinearGradient>
                <View style={styles.filtres}>
                <View style={{flexDirection: "column"}}>
                    <Text style={{textAlign: "center", fontFamily: "Kanitus", color: "white", marginBlock: 10}}>National</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center"}}>
                    {national.map(({ name, id, flag, logo }) => (
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
                <View style={{flexDirection: "column"}}>
                    <Text style={{textAlign: "center", fontFamily: "Kanitus", color: "white", marginBlock: 10}}>National 2</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center"}}>
                    {national2.map(({ name, id, flag, logo }) => (
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

                    <View style={{flexDirection: "column"}}>
                    <Text style={{textAlign: "center", fontFamily: "Kanitus", color: "white", marginBlock: 10}}>National 3</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center"}}>
                    {national3.map(({ name, id, flag, logo }) => (
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
                </View>
                </View>
            </LinearGradient>
            */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    competitions: {
        width: "98%",
        marginTop: 20,
        paddingInlineStart: "2%",
        shadowColor: '#000', // shadow color
        shadowOffset: { width: 0, height: 5 }, // shadow offset
        shadowOpacity: 0.8, // shadow opacity
        shadowRadius: 3,
    },
    conteneur: {
        marginBottom: 20,
        backgroundColor: "#b0c4de",
        borderRadius: 15,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        elevation: 4

    },
    title: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        width: '75%',
        backgroundColor: "midnightblue",
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        fontFamily: "Kanitt",
    },
    filtres: {
        flexDirection: "column",
        flexWrap: 'wrap',
        alignItems: "center",
    },
    lien: {
        width: 100,  // Utilise une largeur fixe pour la petite taille d'écran
        height: 125,
        alignItems: 'center',
        marginBottom: 1,
        borderWidth: 8,
        borderRadius: 15,
        borderColor: 'rgb(11, 19, 81)',
        paddingBlock: 6,
        backgroundColor: "aliceblue",
        flexDirection: "column-reverse"
    },
    lienEurope: {
        width: 120,
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 1,
        flexDirection: "column-reverse",
        borderWidth: 8,
        borderRadius: 15,
        borderColor:  'rgb(11, 19, 81)',
        paddingBlock: 6,
        backgroundColor: "aliceblue",
        height: 125
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
        height: 125,
        alignItems: 'center',
        marginBottom: 1,
        borderWidth: 8,
        borderRadius: 15,
        borderColor: 'rgb(15, 23, 82)',
        paddingBlock: 6,
        backgroundColor: "aliceblue",
        flexDirection: "column-reverse"

    },
    lienTablet: {
        width: '22%', // Sur tablettes, on ajuste également
    },
});

export default ClubPage;