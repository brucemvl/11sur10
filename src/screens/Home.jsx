import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  DeviceEventEmitter,
} from "react-native";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useFonts } from "expo-font";

import Filtres from "../components/Filtres";
import Banner from "../components/Banner";
import Aujourdhui from "../components/Aujourdhui";
import Favorite from "../components/Favorite";

// ⚠️ IDÉAL : mets la clé API dans un .env
const API_KEY = "5ff22ea19db11151a018c36f7fd0213b";

// 📌 Liste des compétitions (facile à maintenir)
const COMPETITIONS = {
  ucl: "https://v3.football.api-sports.io/fixtures?league=2&season=2025",
  france: "https://v3.football.api-sports.io/fixtures?league=61&season=2025",
  england: "https://v3.football.api-sports.io/fixtures?league=39&season=2025",
  spain: "https://v3.football.api-sports.io/fixtures?league=140&season=2025",
  germany: "https://v3.football.api-sports.io/fixtures?league=78&season=2025",
  italy: "https://v3.football.api-sports.io/fixtures?league=135&season=2025",
  inter: "https://v3.football.api-sports.io/fixtures?league=1168&season=2025",
  can: "https://v3.football.api-sports.io/fixtures?league=6&season=2025",
  cdf: 'https://v3.football.api-sports.io/fixtures?league=66&season=2025',
   fac: 'https://v3.football.api-sports.io/fixtures?league=45&season=2025',
   copa: 'https://v3.football.api-sports.io/fixtures?league=143&season=2025',
    uel: 'https://v3.football.api-sports.io/fixtures?league=3&season=2025',
     conference: 'https://v3.football.api-sports.io/fixtures?league=848&season=2025',
      arabiesaoudite: 'https://v3.football.api-sports.io/fixtures?league=307&season=2025',
       miami: 'https://v3.football.api-sports.io/fixtures?team=9568&season=2025',
        leaguecup: 'https://v3.football.api-sports.io/fixtures?league=48&season=2025',
         dfbpokal: 'https://v3.football.api-sports.io/fixtures?league=81&season=2025'
};

const Home = ({ selectedTeamId }) => {
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

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "scrollToTopHome",
      () => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
    );
    return () => subscription.remove();
  }, []);

  
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

  
  if (!fontsLoaded) return null;

  return (
    <ScrollView
      ref={scrollRef}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.blocpage}>
        <Banner />
        <Filtres />

        {matchs.length > 0 ? (
          <Aujourdhui matchs={matchs} onRefresh={onRefresh} />
        ) : (
          <ActivityIndicator size="large" style={{ marginTop: 30 }} />
        )}

        {selectedTeamId != null && (
          <Favorite selectedTeamId={selectedTeamId} />
        )}
      </View>
    </ScrollView>
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
    marginBottom: 125
  },
});

export default Home;