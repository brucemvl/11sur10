import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { championnats, europe, selections } from '../datas/Leagues';
import { useFonts } from 'expo-font';

import ligue1 from "../assets/logoligue1.webp";
import ligue2 from "../assets/ligue2.jpg";
import can from "../assets/logocan.png";
import ucl from "../assets/logoucl.png";
import plus from "../assets/plus.png";

function Filtres() {
    const navigation = useNavigation();

    // fonts
    const [fontsLoaded] = useFonts({
        "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
        "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
        "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
        "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"),
        "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf")
    });

    const { width } = useWindowDimensions();
    const isTablet = width > 767;

    if (!fontsLoaded) return <Text>Loading...</Text>;

    // ---- UNIVERSAL RENDER FUNCTION ----
    const renderItem = ({ id, logo, onPress, bgColor, localImage, name }) => (
        <TouchableOpacity
            key={`item-${id}`}
            onPress={onPress}
            style={[styles.touch, isTablet && styles.touchTablet, { marginHorizontal: 4 }]}
            accessible accessibilityRole='button' accessibilityLabel={`championnat ${name}`} accessibilityHint={`acceder aux infos du championnat ${name}`}
        >
            <View style={[styles.lien, { backgroundColor: bgColor }]}>
                <Image
                    source={localImage ? localImage : { uri: logo }}
                    style={[styles.logo, id === 61 && {width: "80%", height: "80%"}]}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.competitions}
        >

            {/* SELECTIONS */}
            {selections.map(({ id, logo, name }) =>
                id === 6 &&
                renderItem({
                    id,
                    logo,
                    name,
                    bgColor: 'rgba(128, 0, 0, 1)',
                                            localImage: id === 6 ? can : null,
                    onPress: () => navigation.navigate('FicheSelections', { id })
                })
            )}
            

            {/* EUROPE */}
            {europe.map(({ id, logo, name }) =>
                (id === 848 || id === 3)
                    ? null
                    : renderItem({
                        id,
                        logo,
                        name,
                        bgColor: id === 2 ? 'rgba(32, 46, 91, 1)' : null,
                        localImage: id === 2 ? ucl : null,
                        onPress: () => navigation.navigate('FicheEurope', { id })
                    })
            )}

            {/* CHAMPIONNATS */}
            {championnats.map(({ id, logo, name }) =>
                (id === 197 || id === 144)
                    ? null
                    : renderItem({
                        id,
                        logo,
                        name,
                        bgColor:
                            id === 62 || id === 135 ? "#fff" :
                            id === 78 ? "#D10515" :
                            id === 140 ? "rgb(242, 235, 106)" :
                            null,
                        localImage:
                            logo === "https://media.api-sports.io/football/leagues/62.png" ? ligue2 :
                            null,
                        onPress: () => navigation.navigate('FicheChampionnat', { id })
                    })
            )}

            {/* BOUTON + */}
            <TouchableOpacity
                onPress={() => navigation.navigate('ClubPage')}
                style={[styles.touch, isTablet && styles.touchTablet, { marginHorizontal: 4 }]}
                accessible accessibilityRole='button' accessibilityLabel='+' accessibilityHint='acceder a plus de championnats'
            >
                <View style={styles.lien}>
                    <Image source={plus} style={styles.logo} />
                </View>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    competitions: {
        paddingVertical: 2,
        alignItems: "center",
    },

    // Hitbox du bouton
    touch: {
        height: 82,
        width: 82,
        
    },

    touchTablet: {
        height: 100,
        width: 100,
    },

    // Le cercle intérieur
    lien: {
        flex: 1,
        borderWidth: 6,
        borderColor: 'rgb(11, 19, 81)',
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },

    // Logo au centre
    logo: {
        width: "60%",
        height: "60%",
        resizeMode: "contain",
    },
});

export default Filtres;