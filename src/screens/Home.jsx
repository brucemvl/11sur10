import { View, Text, ScrollView, RefreshControl, StyleSheet, useWindowDimensions, ActivityIndicator } from "react-native";
import { useState, useEffect, useCallback, forwardRef } from "react";
import Filtres from "../components/Filtres";
import Banner from "../components/Banner";
import Aujourdhui from "../components/Aujourdhui";
import Favorite from "../components/Favorite";
import { useFonts } from "expo-font";

const Home = forwardRef(({ notifsEnabled, selectedTeamId }) => {
  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
    "Kanito": require("../assets/fonts/Carter_One/CarterOne-Regular.ttf"),
    "Kanitu": require("../assets/fonts/Kanit/Kanit-Regular.ttf"),
    "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"),
    "Kanitalik": require("../assets/fonts/Kanit/Kanit-ExtraBoldItalic.ttf"),
    "Kanitaliq": require("../assets/fonts/Kanit/Kanit-SemiBoldItalic.ttf"),
    "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf")
  });

  const { width } = useWindowDimensions();
  
      const isSmallScreen = width <= 767;
      const isMediumScreen = width <= 1024 && width > 767;

  const [isRefreshing, setIsRefreshing] = useState(false);

 const [matchsEngland, setMatchsEngland] = useState([]);
  const [matchsSpain, setMatchsSpain] = useState([]);
  const [matchsFrance, setMatchsFrance] = useState([]);
  const [matchsUcl, setMatchsUcl] = useState([]);
  const [matchsGer, setMatchsGer] = useState([]);
  const [matchsItaly, setMatchsItaly] = useState([]);
  const [matchsCdf, setMatchsCdf] = useState([]);
  const [matchsFac, setMatchsFac] = useState([]);
  const [matchsCopa, setMatchsCopa] = useState([]);
  const [matchsUel, setMatchsUel] = useState([]);
  const [matchsAfrica, setMatchsAfrica] = useState([]);
  const [matchsEurope, setMatchsEurope] = useState([]);
  const [matchsConference, setMatchsConference] = useState([]);
  const [matchsArabieSaoudite, setMatchsArabieSaoudite] = useState([]);
  const [matchsMiami, setMatchsMiami] = useState([]);
  const [matchsCommunity, setMatchsCommunity] = useState([]);



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
      const [ucl, france, england, spain, ger, italy, cdf, /*fac,*/ copa, uel, africa, europe, conference, arabieSaoudite, miami, community] = await Promise.all([
        fetchData('https://v3.football.api-sports.io/fixtures?league=2&season=2025'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=61&season=2025'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=39&season=2025'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=140&season=2025'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=78&season=2025'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=135&season=2025'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=66&season=2025'),
       /* fetchData('https://v3.football.api-sports.io/fixtures?league=45&season=2025'),*/
        fetchData('https://v3.football.api-sports.io/fixtures?league=143&season=2025'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=3&season=2025'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=29&season=2023'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=32&season=2024'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=848&season=2025'),
        fetchData('https://v3.football.api-sports.io/fixtures?league=307&season=2025'),
                fetchData('https://v3.football.api-sports.io/fixtures?team=9568&season=2025'),
                        fetchData('https://v3.football.api-sports.io/fixtures?league=48&season=2025'),






      ]);

      // Mise à jour de l'état avec les nouveaux matchs récupérés
      setMatchsUcl(ucl);
      setMatchsFrance(france);
      setMatchsEngland(england);
      setMatchsSpain(spain);
      setMatchsGer(ger);
      setMatchsItaly(italy);
      setMatchsCdf(cdf);
      /*setMatchsFac(fac);*/
      setMatchsCopa(copa);
      setMatchsUel(uel);
      setMatchsAfrica(africa);
      setMatchsEurope(europe);
      setMatchsConference(conference);
      setMatchsArabieSaoudite(arabieSaoudite);
      setMatchsMiami(miami)
      setMatchsCommunity(community)


    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    } 
  };

   const onRefresh = useCallback(() => {
      setIsRefreshing(true);
      fetchMatches().finally(() => setIsRefreshing(false)); // Rafraîchit les matchs et arrête le rafraîchissement
    }, []);
  
    useEffect(() => {
      fetchMatches(); // Charger initialement les données au montage du composant
    }, []);
  

  const matchs = [...matchsUcl, ...matchsFrance, ...matchsEngland, ...matchsSpain, ...matchsGer, ...matchsItaly, ...matchsCdf,/* ...matchsFac,*/ ...matchsCopa, ...matchsUel, ...matchsAfrica, ...matchsEurope, ... matchsConference, ... matchsArabieSaoudite, ...matchsMiami, ...matchsCommunity]

  console.log(selectedTeamId)

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView 
    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.blocpage}>
        <Banner />
        <Filtres />
{
  matchs.length > 0 ? (
    <Aujourdhui onRefresh={onRefresh} matchs={matchs} style={{ marginBlock: 5 }} />
  ) : (
    <ActivityIndicator size="medium" color="black" style={{marginTop: 20}} />
  )
}
{selectedTeamId != null && (
          <Favorite selectedTeamId={selectedTeamId} />
        )}
</View>
    </ScrollView>
  );
}
)

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