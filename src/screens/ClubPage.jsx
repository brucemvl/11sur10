import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Pour le dégradé
import { useNavigation } from '@react-navigation/native'; // Pour la navigation
import { championnats, europe, autres, national, national2, national3 } from '../datas/Leagues'; // Import des données
import { useFonts } from 'expo-font';  // Importer le hook useFonts d'Expo
import ligue1 from "../assets/logoligue1.webp"
import ligue2 from "../assets/ligue2.jpg"
import fifaClubWc from "../assets/fifaclubwc2.png"
import { SvgUri } from 'react-native-svg';



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
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "center"}} >
            <View style={[styles.competitions, isMediumScreen && {width: "100%", paddingInlineEnd: "6%", paddingInlineStart: "6%"} ]}>

                {/* Section Compétitions Européennes */}
            <LinearGradient colors={['rgba(11, 38, 126, 0.9)', 'rgba(0, 0, 0, 0.85)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.title}>
  <Text style={styles.titleText}>Compétitions Européennes</Text>
</LinearGradient>
            <LinearGradient colors={["rgba(64, 82, 130, 1)", 'rgba(103, 131, 184, 1)']} style={styles.conteneur} >
                
                    <View style={{flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center"}}>
                    {europe.map(({ name, id, logo }) => (
                        <TouchableOpacity
                            key={"lien europe" + id}
                            style={[styles.lienEurope, isMediumScreen && {width: 150, height: 150, borderRadius: 75}]}
                            onPress={() => navigation.navigate('FicheEurope', { id })}
                            accessible accessibilityLabel={`acceder au championnat ${name}`}
                        >
                            <View style={styles.logoContainer}>
                                <Image source={{ uri: logo }} style={{width: "85%", height: "85%", objectFit: "contain"}} />
                            </View>
                        </TouchableOpacity>
                    ))}
                    </View>

            </LinearGradient>

            {/* Section Championnats */}
            <LinearGradient colors={['rgba(11, 38, 126, 0.9)', 'rgba(0, 0, 0, 0.85)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.title}>
                    <Text style={styles.titleText}>Championnats</Text>
                </LinearGradient>
            <LinearGradient colors={["rgba(64, 82, 130, 1)", 'rgba(103, 131, 184, 1)']} style={styles.conteneur} >
                
                <View style={styles.filtres}>
                    <View style={{flexDirection: "column"}}>
                    <Text style={[{textAlign: "center", fontFamily: "Kanitus", color: "white", marginBlock: 8}, isMediumScreen && {fontSize: 18}]}>Europe</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", gap: isMediumScreen? 16 : 6, justifyContent: "center"}}>
                    {championnats.map(({ name, id, flag, logo }) => (
                        <TouchableOpacity key={"lien championnat" + id} style={[styles.lien, isSmallScreen && styles.lienMobile, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheChampionnat', { id })}
                            accessible accessibilityLabel={`acceder au championnat ${name}`}

                        >
                            <Text style={[styles.filtreTitle, isMediumScreen && styles.filtreTitleTablet]}>{name}</Text>
                            <View style={styles.logoContainer}>
                            {logo === "https://media.api-sports.io/football/leagues/62.png" ? <Image source={ligue2} style={styles.logo} /> : <Image source={{ uri: logo }} style={styles.logo} />}
                            </View>
                        </TouchableOpacity>
                    ))}
                    </View>
                    </View>
                    <View style={{flexDirection: "column"}}>
                    <Text style={[{textAlign: "center", fontFamily: "Kanitus", color: "white", marginBlock: 8}, isMediumScreen && {fontSize: 18}]}>Reste du monde</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", gap: isMediumScreen ? 0 : 6, justifyContent: "center"}}>  
                      {autres.map(({ name, id, logo, country, flag }) => (
                        <View style={{alignItems: "center", marginBottom: 15, width: "32%"}}>
                        <TouchableOpacity
                            key={"lien autre" + id}
                            style={[styles.lien, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheChampionnat', { id })}
                            accessible accessibilityLabel={`acceder au championnat ${name}`}

                        >
                            <Text style={[styles.filtreTitle, isMediumScreen && styles.filtreTitleTablet]}>{name}</Text>
                            <View style={styles.logoContainer}>
                            <Image source={id === 15 ? fifaClubWc : { uri: logo }} style={styles.logo} />
                            </View>
                        </TouchableOpacity>
                            <SvgUri uri={flag} width={30} height={20} style={{position: "relative", bottom: 14, transform:[{rotateZ: "-10deg"}], marginBottom: -10}}/>
                        <Text style={{fontFamily: "Kanitalic", color: "white", width: "100%", textAlign: "center"}}>{country === "Turkey" ? "Turquie" : country === "Saudi Arabia" ? "Arabie Saoudite" : country}</Text>
                        </View>
                    ))}
                    </View>
                    </View>
                </View>
            </LinearGradient>

            <LinearGradient colors={['rgba(11, 38, 126, 0.9)', 'rgba(0, 0, 0, 0.85)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.title}>

                    <Text style={styles.titleText}>Amateurs</Text>
                </LinearGradient>

            <LinearGradient colors={["rgba(64, 82, 130, 1)", 'rgba(103, 131, 184, 1)']} style={styles.conteneur} >
                
                <View style={styles.filtres}>
                
                <View style={{flexDirection: "column"}}>
                    <Text style={{textAlign: "center", fontFamily: "Kanitus", color: "white", marginBlock: 10}}>National 2</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap", gap: 6, justifyContent: "center"}}>
                    {national2.map(({ name, id, flag, logo }) => (
                        <TouchableOpacity
                            key={"lien" + id}
                            style={[styles.lien, isSmallScreen && styles.lienMobile, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheChampionnat', { id })}
                                                        accessible accessibilityLabel={`acceder au championnat ${name}`}

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
                    <View style={{flexDirection: "row", flexWrap: "wrap", gap: 6, justifyContent: "center"}}>
                    {national3.map(({ name, id, flag, logo }) => (
                        <TouchableOpacity
                            key={"lien" + id}
                            style={[styles.lien, isSmallScreen && styles.lienMobile, isMediumScreen && styles.lienTablet]}
                            onPress={() => navigation.navigate('FicheChampionnat', { id })}
                                                        accessible accessibilityLabel={`acceder au championnat ${name}`}

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
            
            </View>
        </ScrollView>
    )
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
        paddingBottom: 110,
        alignItems: "center"
    },
    conteneur: {
        marginBottom: 25,
        borderRadius: 15,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        elevation: 4,
        paddingBlock: 15,
        width: "100%"

    },
    
    title: {
        paddingVertical: 9,
  paddingHorizontal: 18,
  borderRadius: 18,
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  marginBottom: 15,

  // effet moderne
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.15)",
  backgroundColor: "rgba(0,0,0,0.15)",
  
  // ombre légère
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
    },
    titleText: {
        fontSize: 19,
  color: "white",
  fontFamily: "Bangers",
  letterSpacing: 0.5,
  paddingInline: 2
    },
   
    filtres: {
        flexDirection: "column",
        flexWrap: 'wrap',
        alignItems: "center",
        width: "100%",
        gap: 25,
        justifyContent: "center"
    },
    lien: {
        width: 120,  // Utilise une largeur fixe pour la petite taille d'écran
        height: 120,
        alignItems: 'center',
        marginBottom: 1,
        borderWidth: 8,
        borderRadius: 60,
        borderColor: 'rgb(11, 19, 81)',
        paddingBlock: 6,
        backgroundColor: "white",
        flexDirection: "column-reverse",
        overflow: "hidden"
    },
    lienEurope: {
        width: "32%",
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 1,
        flexDirection: "column-reverse",
        borderWidth: 8,
        borderRadius: 60,
        borderColor:  'rgb(11, 19, 81)',
        paddingBlock: 6,
        backgroundColor: "white",
        height: 120,
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
        paddingBlock: 5,
        fontSize: 10,
        flex: 1,
        alignItems: "center",
        fontFamily: "Permanent",
        overflow: "hidden"
    },
    filtreTitleTablet: {
        
        paddingBlock: 6,
        fontSize: 13,
    },

    // Styles spécifiques à l'écran mobile
    lienMobile: {
        width: "32%", // Sur petits écrans, on ajuste la largeur       
        


    },
    lienTablet: {
        width: 150, // Sur tablettes, on ajuste également
        height: 150,
        alignItems: 'center',
        marginBottom: 1,
        borderWidth: 8,
        borderRadius: 75,
        borderColor: 'rgb(15, 23, 82)',
        paddingBlock: 6,
        backgroundColor: "aliceblue",
        flexDirection: "column-reverse",
        overflow: "hidden"
    },
});

export default ClubPage;