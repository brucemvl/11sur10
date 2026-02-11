import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import logo from '../assets/logoblanc.png';
import info from "../assets/info.png";
import cloche from "../assets/cloche3.png";
import clocheno from "../assets/clocheno2.png";

const { width } = Dimensions.get('window');
const CIRCLE_RADIUS = 18; // rayon du cercle autour de la cloche

const Header = forwardRef(({ notifsEnabled, selectedTeamIds = [] }, ref) => {
  const navigation = useNavigation();
  const [teams, setTeams] = useState([]);
  const fadeAnims = useRef([]).current;

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
    "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
    "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"),
    "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf"),
  });

  // Shake animation
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

  const rotate = rotateAnim.interpolate({ inputRange: [-25, 25], outputRange: ['-25deg', '25deg'] });

  // Fetch équipes dynamiquement
  useEffect(() => {
    const fetchTeams = async () => {
  if (!selectedTeamIds.length) {
    setTeams([]);
    return;
  }

  try {
    const requests = selectedTeamIds.map(id =>
      fetch(`https://v3.football.api-sports.io/teams?id=${id}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      })
        .then(res => res.json())
        .catch(err => {
          console.error(`Erreur fetch équipe ${id}:`, err);
          return null;
        })
    );

    const results = await Promise.all(requests);
    const fetchedTeams = results
      .map(r => r?.response?.[0]?.team)
      .filter(Boolean);

    setTeams(fetchedTeams);

    // Animations fade
    fetchedTeams.forEach((_, i) => {
      fadeAnims[i] = new Animated.Value(0);
      Animated.timing(fadeAnims[i], { toValue: 1, duration: 300, useNativeDriver: true, delay: i * 100 }).start();
    });

  } catch (err) {
    console.error("Erreur fetch équipes Header:", err);
  }
};
    fetchTeams();
  }, [selectedTeamIds]);

  if (!fontsLoaded) return <Text>Loading...</Text>;

  return (
    <LinearGradient
      colors={['rgba(100,160,236,1)', 'rgb(24,29,91)', 'rgba(0,0,0,1)', "rgba(94,94,94,0)"]}
      locations={[0, 0.6, 0.92, 1]}
      style={styles.header}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Apropos")}>
        <Image source={info} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>

      <Image source={logo} style={styles.logo} />

      <TouchableOpacity onPress={() => navigation.navigate("Notifs")}>
        <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
          {/* Cercle des logos */}
          {teams.map((team, i) => {
            const angle = (i / teams.length) * 2 * Math.PI - Math.PI / 2; // réparti en cercle
            const x = CIRCLE_RADIUS * Math.cos(angle);
            const y = CIRCLE_RADIUS * Math.sin(angle);

            return (
              <Animated.Image
                key={team.id}
                source={{ uri: team.logo }}
                style={{
                  width: 28,
                  height: 28,
                  resizeMode: "contain",
                  position: 'absolute',
                  left: 25 + x - 15, // centre + offset
                  top: 25 + y - 15,
                  opacity: fadeAnims[i] || 1,
                }}
              />
            );
          })}

          {/* Cloche au centre */}
          <Animated.Image
            source={notifsEnabled ? cloche : clocheno}
            style={[
              { width: 38, height: 38 },
              { transform: [{ rotate }] }
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
    marginLeft: 40,
    resizeMode: "contain",
  },
});

export default Header;