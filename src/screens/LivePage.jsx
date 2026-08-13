import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, ScrollView, RefreshControl } from 'react-native';
import ligue1 from "../assets/logoligue1.webp";
import { LinearGradient } from 'expo-linear-gradient';
import { SvgUri } from 'react-native-svg';
import { teamName } from '../datas/teamNames';
import { useWindowDimensions } from 'react-native';

const apiKey = process.env.API_KEY;

function LivePage({ navigation }) {

  const { width } = useWindowDimensions();
  
    const isSmallScreen = width <= 767;
    const isMediumScreen = width > 767 && width <= 1024;

  const [lives, setLives] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false); // État pour gérer le rafraîchissement

  const fetchLives = async () => {
    try {
      const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      });
      const json = await response.json();
      setLives(json.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchLives();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true); // Déclenche le rafraîchissement
    fetchLives().then(() => setIsRefreshing(false)); // Rafraîchit les données et arrête le rafraîchissement
  };

  const leagues = [... new Set(lives.map((element) => element.league.country))]
  console.log(leagues)
  console.log(lives)
  const [fadeAnim] = useState(new Animated.Value(1)); // Animation de fade (opacité)

  useEffect(() => {
    const flash = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => flash());
    };

    flash();



    return () => fadeAnim.stopAnimation();
  }, [fadeAnim]);

  const countryTranslations = {
    Denmark: "Danemark",
    Belgium: "Belgique",
    Hungary: "Hongrie",
    England: "Angleterre",
    Spain: "Espagne",
    Germany: "Allemagne",
    Poland: "Pologne",
    Cyprus: "Chypre",
    Sweden: "Suède",
    "Czech-Republic": "République Tchèque",
    Switzerland: "Suisse",
    Serbia: "Serbie",
    Algeria: "Algérie",
    Tunisia: "Tunisie",
    Turkey: "Turquie",
    Singapore: "Singapour",
    Latvia: "Lettonie",
    Romania: "Roumanie",
    Belarus: "Biélorussie",
    Russia: "Russie",
    Bulgaria: "Bulgarie",
    Cameroon: "Cameroun",
    Greece: "Grèce",
    India: "Inde",
    Cambodia: "Cambodge",
    Austria: "Autriche",
    Netherlands: "Pays-Bas",
    "Ivory-Coast": "Côte d'Ivoire",
    Wales: "Pays de Galles",
    Scotland: "Écosse",
    Italy: "Italie",
    Mexico: "Mexique",
    Lebanon: "Liban",
    Norway: "Norvège",
    "Morocco": "Maroc",
    Chile: "Chili",
    Colombia: "Colombie",

  };

  return (
    <ScrollView
      contentContainerStyle={{ width: "98%", paddingInlineStart: "2%", marginBlock: 5, justifyContent: "center" }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.shadowWrapper}>
        <LinearGradient
          colors={['rgba(11, 38, 126, 0.9)', 'rgba(0, 0, 0, 0.85)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.titlecontainer}
        >
          <Text style={styles.title}>LIVE</Text>
        </LinearGradient>
      </View>
      <View style={styles.container}>
        {lives.length === 0 ?
          <Text style={styles.noMatch}>Aucun match pour le moment</Text>
          :
          leagues.map((league) =>
            <View style={{ marginBottom: 10 }} key={"ligue" + league}>
              <Text style={{ fontFamily: "Kanitus", color: "white", marginLeft: 10, marginBottom: 8 }}>{countryTranslations[league] || league}</Text>
              {lives.map((live) => 
              live.league.country === league ?
                <TouchableOpacity
                  onPress={() => navigation.navigate('FicheMatch', { id: live.fixture.id })} key={live.fixture.id}
                  accessible accessibilityRole="button" accessibilityHint="Naviguer vers la fiche du match"
                  style={{marginBottom: 5}}
                >
                  <LinearGradient colors={['rgba(255, 255, 255, 0.4)', 'rgba(0, 0, 0, 0.1)',]} style={styles.match} >
                    <Image source={ {uri: live.league.logo}} style={[styles.leagueLogo, isMediumScreen && {height: 30}]} />
                    <View style={{ flexDirection: "column", alignItems: "center",   width: "32%", gap: isMediumScreen ? 16 : 3 }}>
                                              <Image source={{ uri: live.teams.home.logo }} style={[styles.teamLogo, isMediumScreen && {width: 36, height: 36}, live.league.id === 1 && {borderRadius: 25}]} />
                                                                      <Text style={[styles.team, {textAlign: "center"}, isMediumScreen && {fontSize: 18}]}>{live.teams.home.name}</Text>
                    
                                            </View>

                    <LinearGradient
                                              colors={['rgba(0,0,0,0.85)', 'rgba(110,85,20,1)', 'rgba(0,0,0,0.85)']}
                                              style={[styles.scoreBox,  isMediumScreen && {height: 42, marginInline: 4}]}
                                            >
                                              <View style={[styles.liveView, isMediumScreen && {height: 32}]}>
                                                <Text style={styles.score}>
                                                  {
                                                   
                                                        live.goals.home}
                                                </Text>
                                              </View>
                                              {
                                                live.fixture.status.long === "Halftime" ? <Text style={{ color: "white", fontFamily: "Kanitalic", fontSize: 10, backgroundColor: "darkred", padding: 2, borderRadius: 4, marginInline: 3 }}>MT</Text> :
                                                  <View style={[styles.liveSticker, live.fixture.status.extra > 0 && {marginInline: 1} ]}>
                                                    <Text style={[styles.liveText, live.fixture.status.extra > 0 && {fontSize: 9}]}>{live.fixture.status.elapsed}'{live.fixture.status.extra > 0 ? `+${live.fixture.status.extra}` : null}</Text>
                                                    <Animated.Text style={{ color: "white", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim, marginTop: -3 }}>live</Animated.Text>
                                                  </View> }
                    
                                              <View style={[styles.liveView, isMediumScreen && {height: 32}]}>
                                                <Text style={styles.score}>
                                                  {live.goals.away}
                                                </Text>
                                              </View>
                                            </LinearGradient>


                    <View style={{ flexDirection: "column", alignItems: "center",  width: "32%", gap: isMediumScreen ? 16 : 3 }}>
                                              <Image source={{ uri: live.teams.away.logo }} style={[styles.teamLogo, isMediumScreen && {width: 36, height: 36}, live.league.id === 1 && {borderRadius: 25}]} />
                                              <Text style={[styles.team, {textAlign: "center"}, isMediumScreen && {fontSize: 18}]}>{live.teams.away.name}</Text>
                                            </View>

                  </LinearGradient>
                </TouchableOpacity>
                : null
              )}
            </View>

          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBlock: 15,
    paddingInline: 4,
    borderRadius: 15,
    backgroundColor: "rgb(90, 150, 202)",
    width: '100%',
    marginTop: 10,
    shadowColor: '#000', // shadow color
    shadowOffset: { width: 0, height: 5 }, // shadow offset
    shadowOpacity: 0.8, // shadow opacity
    shadowRadius: 3,
    elevation: 6,
    marginBottom: 130
  },
  title: {
    color: 'white',
    fontFamily: "Bangers",
    fontSize: 18,
    letterSpacing: 0.5,
    padding: 6
  },
  shadowWrapper: {
    marginHorizontal: '35%',
    borderRadius: 18,

    // Ombre iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 4,
    shadowRadius: 4,

    // Ombre Android
    elevation: 6,
  },
  titlecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    overflow: "hidden", // OK ici
  },
  match: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBlock: 5,
    width: "100%",
  },
  noMatch: {
    marginBlock: 10,
    alignSelf: 'center',
    backgroundColor: 'red',
    color: 'white',
    width: '80%',
    textAlign: 'center',
    fontFamily: 'Permanent Marker',
    borderRadius: 5,
    height: 35,
    paddingTop: 6,
  },
  live__tableau: {
    borderRadius: 10
  },
  
  leagueLogo: {
    width: "8%",
    height: 25,
    resizeMode: "contain",
  },

  leagueName: {
    color: '#fff',
    fontFamily: 'Kanitus'
  },

  
  match: {
    flexDirection: 'row',
     alignItems: 'center',
      justifyContent: 'space-between',
      width: "99%",
        paddingVertical: 12,
         paddingHorizontal: 10,
          minHeight: 72,
           backgroundColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
             borderColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: 22,
               shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                 shadowOpacity: 0.18, shadowRadius: 12,
                  elevation: 5,
  },
  team: {
    color: '#FFFFFF', fontFamily: 'Bella', fontSize: 13.5, lineHeight: 16,

  },
  teamLogo: {
    height: 32,
    width: 32,
    resizeMode: "contain"
  },
  scoreBox: {
    flexDirection: 'row',
     alignItems: 'center',
      justifyContent: 'center',
       gap: 4,
        paddingHorizontal: 8,
         paddingVertical: 6,
          width: "22%",
           height: 46,
            borderRadius: 16,
             backgroundColor: 'rgba(0,0,0,0.45)',
              borderWidth: 1,
               borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  score: {
    color: '#fff',
    fontFamily: 'Kanitt',
    fontSize: 16, 
  },
  liveView: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%"
  },
  liveText: {
    color: "darkred",
    fontFamily: "Kanitalic",
    paddingInline: 2,
    borderRadius: 4,
    fontSize: 11,
    backgroundColor: "white"
  },
  liveSticker: {
    justifyContent: "space-between",
    marginInline: 4,
    alignItems: "center",
    gap: 4
  }
});

export default LivePage;