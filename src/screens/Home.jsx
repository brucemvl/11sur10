import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import Filtres from "../components/Filtres";
import Banner from "../components/Banner";
import Aujourdhui from "../components/Aujourdhui";
import { useFonts } from "expo-font";

function Home() {
  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
    "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
    "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"),
    "Kanitalik": require("../assets/fonts/Kanit/Kanit-ExtraBoldItalic.ttf"),
    "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf")
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

 const [matchsEngland, setMatchsEngland] = useState([]);
  const [matchsSpain, setMatchsSpain] = useState([]);
  const [matchsFrance, setMatchsFrance] = useState([]);
  const [matchsUcl, setMatchsUcl] = useState([]);
  const [matchsGer, setMatchsGer] = useState([]);
  const [matchsItaly, setMatchsItaly] = useState([]);
  const [matchsCdf, setMatchsCdf] = useState([]);
  const [matchsFac, setMatchsFac] = useState([]);
  const [matchsEfl, setMatchsEfl] = useState([]);
  const [matchsCopa, setMatchsCopa] = useState([]);
  const [matchsUel, setMatchsUel] = useState([]);

  const fetchMatches = async () => {

    const fetchData = async (url) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      });
      const data = await response.json();
      return data.response;
    };

    try {
      const [ucl, france, england, spain, ger, italy, cdf, fac, efl, copa, uel] = await Promise.all([
        fetchData('https://v3.football.api-sports.io/fixtures?league=2&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=61&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=39&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=140&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=78&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=135&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=66&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=45&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=46&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=143&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=3&season=2024'),
      ]);

      // Mise à jour de l'état avec les nouveaux matchs récupérés
      setMatchsUcl(ucl);
      setMatchsFrance(france);
      setMatchsEngland(england);
      setMatchsSpain(spain);
      setMatchsGer(ger);
      setMatchsItaly(italy);
      setMatchsCdf(cdf);
      setMatchsFac(fac);
      setMatchsEfl(efl);
      setMatchsCopa(copa);
      setMatchsUel(uel);
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

   const onRefresh = useCallback(() => {
      setIsRefreshing(true);
      fetchMatches().finally(() => setIsRefreshing(false)); // Rafraîchit les matchs et arrête le rafraîchissement
    }, []);
  
    useEffect(() => {
      fetchMatches(); // Charger initialement les données au montage du composant
    }, []);
  

  const matchs = [...matchsUcl, ...matchsFrance, ...matchsEngland, ...matchsSpain, ...matchsGer, ...matchsItaly, ...matchsCdf, ...matchsFac, ...matchsEfl, ...matchsCopa, ...matchsUel]

  

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView 
    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.blocpage}>
        <Banner />
        </View>
        <Filtres />
        <View style={styles.blocpage}>
        <Aujourdhui onRefresh={onRefresh} matchs={matchs} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blocpage: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "98%",
    paddingInlineStart: "2%",
    marginBlock: 10
  },
});

export default Home;