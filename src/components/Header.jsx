import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import logo from '../assets/logoblanc.png';
import info from "../assets/info.png";
import cloche from "../assets/cloche3.png";
import clocheno from "../assets/clocheno2.png";

const Header = forwardRef(({ notifsEnabled, selectedTeamId }, ref) => {

  const navigation = useNavigation();
  const [selectedTeam, setSelectedTeam] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Charge la police
  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
    "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
    "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"),
    "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf"),
  });

  // Animation du shake sur la cloche
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    triggerShake: () => {
      Animated.sequence([
        Animated.timing(rotateAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(rotateAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }));

  const rotate = rotateAnim.interpolate({
    inputRange: [-25, 25],
    outputRange: ['-25deg', '25deg'],
  });

  // Fetch dynamique du logo
  useEffect(() => {
    if (!selectedTeamId) {
      setSelectedTeam(null);
      return;
    }

    const fetchTeamById = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/teams?id=${selectedTeamId}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );

        const json = await response.json();

        if (json.response?.length > 0) {
          setSelectedTeam(json.response[0].team);
        }
      } catch (error) {
        console.error("Erreur fetch team:", error);
      }
    };

    fetchTeamById();
  }, [selectedTeamId]);

  // Animation fade-in quand le logo change
  useEffect(() => {
    if (selectedTeam) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedTeam]);

  if (!fontsLoaded) return <Text>Loading...</Text>;

  return (
    <LinearGradient
      colors={['rgba(100, 160, 236, 1)', 'rgb(24, 29, 91)', 'rgba(0, 0, 0, 1)', "rgba(94, 94, 94, 0)"]}
      locations={[0, 0.6, 0.92, 1]}
      style={styles.header}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Apropos")} accessible accessibilityLabel="A Propos" accessibilityRole="button" accessibilityHint='Infos et présentation de lapplication'>
        <Image source={info} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>

      <Image source={logo} style={styles.logo} />

      <TouchableOpacity onPress={() => navigation.navigate("Notifs")} accessible accessibilityLabel="Notifications" accessibilityRole="button" accessibilityHint='accéder aux paramètres de notifications'>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          {/* Logo dynamique avec fade-in */}
          {selectedTeam?.logo && (
            <Animated.Image
              source={{ uri: selectedTeam.logo }}
              style={{
                opacity: fadeAnim,
                width: 36,
                height: 36,
                position: "absolute",
                left: 14,
                bottom: 16,
                resizeMode: "contain",
                shadowColor: '#ffffffff', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 3, elevation: 5, padding: 4
              }}
            />
          )}

          {/* Icône de cloche */}
          <Animated.Image
            source={notifsEnabled ? cloche : clocheno}
            style={[
              { height: 38, width: 38, marginRight: 10, shadowColor: '#ffffffff', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.6, shadowRadius: 2, elevation: 5, },
              { transform: [{ rotate }] },
            ]}
          />
        </View>
      </TouchableOpacity>

    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    flexGrow: 1,
    height: 125,
    paddingTop: 30,
  },
  logo: {
    width: 100,
    height: 80,
    marginLeft: 30,
    resizeMode: "contain",
  }
});

export default Header;