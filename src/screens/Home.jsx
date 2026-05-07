import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
  useWindowDimensions,
  ActivityIndicator,
  DeviceEventEmitter,
  Animated
} from "react-native";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useFonts } from "expo-font";

import Filtres from "../components/Filtres";
import Banner from "../components/Banner";
import Aujourdhui from "../components/Aujourdhui";
import Favorite from "../components/Favorite";
import share from "../assets/share.png"
import { LinearGradient } from "expo-linear-gradient";


const API_KEY = "5ff22ea19db11151a018c36f7fd0213b";

// 📌 Liste des compétitions (facile à maintenir)
const COMPETITIONS = {
  ucl: "https://v3.football.api-sports.io/fixtures?league=2&season=2025",
     wc: "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
    /* tropheechampions: "https://v3.football.api-sports.io/fixtures?league=526&season=2025",
    supercoupeespagne: "https://v3.football.api-sports.io/fixtures?league=556&season=2025", */
  france: "https://v3.football.api-sports.io/fixtures?league=61&season=2025",
  england: "https://v3.football.api-sports.io/fixtures?league=39&season=2025",
  spain: "https://v3.football.api-sports.io/fixtures?league=140&season=2025",
  germany: "https://v3.football.api-sports.io/fixtures?league=78&season=2025",
  italy: "https://v3.football.api-sports.io/fixtures?league=135&season=2025",
  cdf: 'https://v3.football.api-sports.io/fixtures?league=66&season=2025',
   fac: 'https://v3.football.api-sports.io/fixtures?league=45&season=2025',
   copa: 'https://v3.football.api-sports.io/fixtures?league=143&season=2025',
    uel: 'https://v3.football.api-sports.io/fixtures?league=3&season=2025',
     conference: 'https://v3.football.api-sports.io/fixtures?league=848&season=2025',
      arabiesaoudite: 'https://v3.football.api-sports.io/fixtures?league=307&season=2025',
       miami: 'https://v3.football.api-sports.io/fixtures?team=9568&season=2026',
        leaguecup: 'https://v3.football.api-sports.io/fixtures?league=48&season=2025',
         dfbpokal: 'https://v3.football.api-sports.io/fixtures?league=81&season=2025',
         amicaux: 'https://v3.football.api-sports.io/fixtures?league=10&season=2026'
};

const Home = ({ selectedTeamIds }) => {
  // ==========================
  // Fonts
  // ==========================
  const [fontsLoaded] = useFonts({
    "Kanitblack": require("../assets/fonts/Kanit/Kanit-Black.ttf"), 
    "Bangers": require("../assets/fonts/Bangers/Bangers-Regular.ttf"), 
    "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"), 
    "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"), 
    "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"), 
    "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"), 
    "Kanitalik": require("../assets/fonts/Kanit/Kanit-ExtraBoldItalic.ttf"), 
    "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf"), 
    "Carter": require("../assets/fonts/Carter_One/CarterOne-Regular.ttf"), 
    "Londrina": require("../assets/fonts/Londrina/LondrinaSolid-Light.ttf"), 
    "Londrinak": require("../assets/fonts/Londrina/LondrinaSolid-Regular.ttf"), 
    "Bella": require("../assets/fonts/Bella/Belanosima-Regular.ttf"), 
    "Bellak": require("../assets/fonts/Bella/Belanosima-Bold.ttf"),
  });

  // ==========================
  // Layout
  // ==========================
  const { width } = useWindowDimensions();
  const scrollRef = useRef(null);
    const scrollY = new Animated.Value(0);
  
    const aujourdhuiOpacity = scrollY.interpolate({
  inputRange: [0, 100, 120],
  outputRange: [1, 1, 0.8],
  extrapolate: "clamp",
});

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "scrollToTopHome",
      () => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
    );
    return () => subscription.remove();
  }, []);

  const fadeOut = scrollY.interpolate({
  inputRange: [0, 100],
  outputRange: [1, 0],
  extrapolate: "clamp",
});

const translateY = scrollY.interpolate({
  inputRange: [0, 100],
  outputRange: [0, -40],
  extrapolate: "clamp",
});

const scale = scrollY.interpolate({
  inputRange: [0, 100],
  outputRange: [1, 0.90],
  extrapolate: "clamp",
});

  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [matchsByKey, setMatchsByKey] = useState({});

  
  const fetchWithRetry = async (url, retries = 3) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      });

      const json = await response.json();

      if (!json.response || json.response.length === 0) {
        if (retries > 0) return fetchWithRetry(url, retries - 1);
        return null;
      }

      return json.response;
    } catch (error) {
      if (retries > 0) return fetchWithRetry(url, retries - 1);
      return null;
    }
  };


  const fetchMatches = async () => {
    const results = {};

    for (const [key, url] of Object.entries(COMPETITIONS)) {
      const data = await fetchWithRetry(url);
      if (data) {
        results[key] = data;
      }
    }

    setMatchsByKey((prev) => ({
      ...prev,
      ...results,
    }));
  };

  
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchMatches();
    setIsRefreshing(false);
  }, []);

  
  useEffect(() => {
    fetchMatches();
  }, []);


  const matchs = useMemo(() => {
    return Object.values(matchsByKey).flat();
  }, [matchsByKey]);

  
  const shareApp = async () => {
  try {
    await Share.share({
      message:
        `⚽ Découvre 11sur10 !\n` +
        `Scores en direct, stats, notifications ⚡\n` +
        `👉 https://one1sur10.onrender.com/download`,
    });
  } catch (error) {
    console.error(error);
  }
};


  if (!fontsLoaded) return null;

  return (
    <Animated.ScrollView
      ref={scrollRef}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      stickyHeaderIndices={[1]} // 👈 index du composant Filtres
      onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={6}
        style={{marginTop: 5}}
    >
      <Animated.View
        style={{
          alignItems: "center",
          width: "100%",
          opacity: fadeOut,
          transform: [{ translateY }, { scale }],
        }}
      >
        <Banner />
        </Animated.View>
<LinearGradient colors={["#f3f3f3", "#f3f3f33d"]} locations={[0.9, 1]} style={{marginBlock: 10, zIndex: 10}}>
<Filtres style={{ backgroundColor: "#f3f3f3"}} />

  
  
</LinearGradient>
        {matchs.length > 0 ? (
          <Aujourdhui matchs={matchs} onRefresh={onRefresh} />
        ) : (
          <ActivityIndicator size="large" style={{ marginTop: 30 }} />
        )}
        

        {selectedTeamIds != null && (
          <Favorite 
  selectedTeamIds={selectedTeamIds} />
        )}

        <TouchableOpacity accessible accessibilityRole="button" accessibilityLabel="Partager l'application"
  onPress={shareApp}
  style={{
    paddingTop: 10,
    paddingHorizontal: 18,
    alignSelf: 'center',
    marginBottom: 120
  }}
>
  <Image source={share} style={{height: 30, width: 30, resizeMode: "contain"}}/>
</TouchableOpacity>
      
    </Animated.ScrollView>
  );
};


const styles = StyleSheet.create({
  blocpage: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBlock: 10,
    gap: 8,
    marginBottom: 120
  },
});

export default Home;