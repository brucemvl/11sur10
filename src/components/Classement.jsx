import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Easing,
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { portraitsJoueurs } from "../datas/Portraits";
import { allCompetitions } from "../datas/Leagues";

function Classement({ id }) {
  const { width } = useWindowDimensions();
  const isMediumScreen = width <= 1024 && width > 767;

  const [tab, setTab] = useState([]);
  const [buteurs, setButeurs] = useState([]);
  const [passeurs, setPasseurs] = useState([]);
  const navigation = useNavigation();

  const [selectedClassement, setSelectedClassement] = useState(false)
  const [selectedButeurs, setSelectedButeurs] = useState(false)
  const [selectedPasseurs, setSelectedPasseurs] = useState(false)

  // États d’ouverture
  const [openClassement, setOpenClassement] = useState(false);
  const [openButeurs, setOpenButeurs] = useState(false);
  const [openPasseurs, setOpenPasseurs] = useState(false);

  // Hauteurs dynamiques
  const [contentHeightClassement, setContentHeightClassement] = useState(0);
  const [contentHeightButeurs, setContentHeightButeurs] = useState(0);
  const [contentHeightPasseurs, setContentHeightPasseurs] = useState(0);

  const scaleClassement = useRef(new Animated.Value(1)).current;
  const scaleButeurs = useRef(new Animated.Value(1)).current;
  const scalePasseurs = useRef(new Animated.Value(1)).current;

  // Animations hauteur
  const animatedHeightClassement = useRef(new Animated.Value(0)).current;
  const animatedHeightButeurs = useRef(new Animated.Value(0)).current;
  const animatedHeightPasseurs = useRef(new Animated.Value(0)).current;


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const teamName = {
  "Germany": "Allemagne",
  "Spain": "Espagne",
  "Paris Saint Germain": "Paris St Germain",
  "Barcelona" : "FC Barcelone",
  "Borussia Dortmund" : "Dortmund",
  "Borussia Mönchengladbach" : "Mönchengladbach",
  "New York Red Bulls" : "New York RB",
  "Philadelphia Union" : "Philadelphia",
  "Italy" : "Italie",
  "Austria" : "Autriche",
  "Moldova" : "Moldavie",
  "Cyprus" : "Chypre",
  "Norway" : "Norvege",
  "Hungary" : "Hongrie",
  "Morocco" : "Maroc",
  "Ivory Coast" : "Cote d'Ivoire",
  "Switzerland" : "Suisse",
  "Sweden" : "Suede",
  "Scotland" : "Ecosse",
  "Netherlands" : "Pays-Bas",
  "Poland" : "Pologne",
  "England" : "Angleterre",
  "Central African Republic" : "Centrafrique",
  "Cape Verde Islands" : "Cap Vert",
    "Belarus" : "Bielorussie",
    "Croatia" : "Croatie",
    "Denmark" : "Danemark",
    "Malta" : "Malte",
    "Lithuania" : "Lituanie"
};


  const fetchClassement = async () => {
    try {

      const comp = allCompetitions.find((c) => c.id === id);


    // Si non trouvée → fallback
    const season = comp?.season ?? 2025; // saison par défaut si rien trouvé


      const res = await fetch(
        `https://v3.football.api-sports.io/standings?league=${id}&season=${season}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        }
      );

      const json = await res.json();

      if (!json.response?.length) throw new Error("Aucun classement trouvé");

      setTab(
        id === 15
          ? json.response[0].league.standings
          : json.response[0].league.standings[0]
      );
    } catch (err) {
      console.error("Erreur fetchClassement:", err);
      setError("Erreur de chargement du classement.");
    }
  };

  const fetchButeurs = async () => {

    const comp = allCompetitions.find((c) => c.id === id);


    // Si non trouvée → fallback
    const season = comp?.season ?? 2025; // saison par défaut si rien trouvé

    try {
      const res = await fetch(
        `https://v3.football.api-sports.io/players/topscorers?league=${id}&season=${season}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        }
      );

      const json = await res.json();

      if (!json.response?.length) throw new Error("Aucun buteur trouvé");
      setButeurs(json.response.slice(0, 10));
    } catch (err) {
      console.error("Erreur fetchButeurs:", err);
      setError("Erreur de chargement des buteurs.");
    }
  };

  const fetchPasseurs = async () => {

    const comp = allCompetitions.find((c) => c.id === id);


    // Si non trouvée → fallback
    const season = comp?.season ?? 2025;

    try {
      const res = await fetch(
        `https://v3.football.api-sports.io/players/topassists?league=${id}&season=${season}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        }
      );

      const json = await res.json();
      if (!json.response?.length) throw new Error("Aucun passeur trouvé");
      setPasseurs(json.response.slice(0, 10));
    } catch (err) {
      console.error("Erreur fetchPasseurs:", err);
      setError("Erreur de chargement des passeurs.");
    }
  };



   if (id === 29 || id === 32 || id === 34 || id === 5 || id === 15){
const [rank, setRank] = useState()
    
          const season = id === 34 ? "2026" : id === 29 ? "2023" : id === 15 ? "2025" : "2024";
    
    
      useEffect(() => {
        // Fetch data
        fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=${season}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        })
          .then((response) => response.json())
          .then((result) => {
            setRank(result.response[0].league.standings);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [id]);
    
    
      if (!rank){
        return <Text>loading</Text>
      }
      

    return (
<View style={styles.container}>
    <View style={styles.tableaux}>
            {rank?.map((subArray, index) => (
              <View key={`group${index}`} style={styles.groupe}>
                <Text style={styles.groupTitle}>{subArray[0].group}</Text>
                <View style={{margin: 10, borderRadius: 5, backgroundColor: "lightblue"}}>
                <View style={styles.barreSelec}>
                  <Text style={styles.barreItem_equipe}>Equipe</Text>
                  <Text style={styles.barreItem}>J</Text>
                  <Text style={styles.barreItem}>V</Text>
                  <Text style={styles.barreItem}>N</Text>
                  <Text style={styles.barreItem}>D</Text>
                  <Text style={styles.barreItem}>Pts</Text>
                </View>
                <FlatList
                  data={subArray}
                  keyExtractor={(item) => `champ${item.team.id}`}
                  renderItem={({ item }) => (
                    <View style={styles.equipe}>
                      <Text style={{width: "4%", marginInline: "2%", fontFamily: "Kanitus"}}>{item.rank}</Text>
                      <Image style={styles.flags} source={{ uri: item.team.logo }} />
                      <Text style={{width: "32%", marginInline: "2%", fontFamily: "Bella"}}>{teamName[item.team.name] || item.team.name}</Text>
                      <Text style={{width: "10%", fontFamily: "Kanitus"}}>{item.all.played}</Text>
                      <Text style={{width: "10%", fontFamily: "Kanitus"}}>{item.all.win}</Text>
                      <Text style={{width: "10%", fontFamily: "Kanitus"}}>{item.all.draw}</Text>
                      <Text style={{width: "9%", fontFamily: "Kanitus"}}>{item.all.lose}</Text>
                      <Text style={{width: "11%", fontFamily: "Kanitt"}}>{item.points}</Text>
                    </View>
                  )}
                />
                </View>
              </View>
            ))}
          </View>
          </View> )
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchClassement(), fetchButeurs(), fetchPasseurs()]);
      setLoading(false);
    };

    loadData();
  }, [id]);

  // 🟡 AFFICHAGE DYNAMIQUE
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }




  

  /** 🔥 Animation combinée : hauteur + effet “bubble” */
  const animateSection = (heightAnim, scaleAnim, toValue) => {
  // Animation de la hauteur (JS)
  Animated.timing(heightAnim, {
    toValue,
    duration: 300,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: false, // height n’est pas supporté par le driver natif
  }).start();

  // Animation du "bubble" (native)
  Animated.sequence([
    Animated.spring(scaleAnim, {
      toValue: toValue > 0 ? 0.90 : 0.97,
      friction: 6,
      tension: 70,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 70,
      useNativeDriver: true,
    }),
  ]).start();
};

  // Fonctions d’ouverture
 const collapseClassement = () => {
  const willOpen = !openClassement;
  setOpenClassement(willOpen);
  setOpenButeurs(false);
  setOpenPasseurs(false);
  setSelectedClassement(!selectedClassement)
  setSelectedPasseurs(false)
  setSelectedButeurs(false)

  animateSection(animatedHeightClassement, scaleClassement, willOpen ? contentHeightClassement : 0);
  animateSection(animatedHeightButeurs, scaleButeurs, 0);
  animateSection(animatedHeightPasseurs, scalePasseurs, 0);
};

const collapseButeurs = () => {
  const willOpen = !openButeurs;
  setOpenClassement(false);
  setOpenButeurs(willOpen);
  setOpenPasseurs(false);
  setSelectedClassement(false)
  setSelectedButeurs(!selectedButeurs)
    setSelectedPasseurs(false)


  animateSection(animatedHeightButeurs, scaleButeurs, willOpen ? contentHeightButeurs : 0);
  animateSection(animatedHeightClassement, scaleClassement, 0);
  animateSection(animatedHeightPasseurs, scalePasseurs, 0);
};

const collapsePasseurs = () => {
  const willOpen = !openPasseurs;
  setOpenClassement(false);
  setOpenButeurs(false);
  setOpenPasseurs(willOpen);
  setSelectedClassement(false)
  setSelectedButeurs(false)
    setSelectedPasseurs(!selectedPasseurs)


  animateSection(animatedHeightPasseurs, scalePasseurs, willOpen ? contentHeightPasseurs : 0);
  animateSection(animatedHeightClassement, scaleClassement, 0);
  animateSection(animatedHeightButeurs, scaleButeurs, 0);
};

console.log(tab)


  /** ---------------- UI ---------------- */
  return (
    <View style={{ flex: 1, alignItems: "center", paddingInline: 2 }}>
      {/* BOUTONS */}
      <View style={{ flexDirection: "row", gap: 15, marginBlock: 10, alignItems: "center" }}>
        <TouchableOpacity onPress={collapseClassement}>
          <LinearGradient
            colors={["rgba(66, 66, 66, 1)", "rgba(165, 165, 165, 1)"]}
            style={selectedClassement ? styles.boutonSelected : styles.bouton}
          >
            <Text style={selectedClassement ? styles.btnTextSelected : styles.btnText}>Classement</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={collapseButeurs}>
          <LinearGradient
            colors={["rgba(66, 66, 66, 1)", "rgba(165, 165, 165, 1)"]}
            style={selectedButeurs ? styles.boutonSelected : styles.bouton}
          >
            <Text style={selectedButeurs ? styles.btnTextSelected : styles.btnText}>Buteurs</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={collapsePasseurs}>
          <LinearGradient
            colors={["rgba(66, 66, 66, 1)", "rgba(165, 165, 165, 1)"]}
            style={selectedPasseurs ? styles.boutonSelected : styles.bouton}
          >
            <Text style={selectedPasseurs ? styles.btnTextSelected : styles.btnText}>Passeurs</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* CONTENU CLASSEMENT */}
      <Animated.View style={{ height: animatedHeightClassement, overflow: "hidden"}}>
  <Animated.View style={{ transform: [{ scale: scaleClassement }], paddingInline: 9, paddingBlock: 6 }}>
        <View
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (contentHeightClassement === 0 && h > 0)
              setContentHeightClassement(h);
          }}
        >
          <LinearGradient
            colors={["rgba(166, 166, 166, 1)", "rgba(110,110,110,1)"]}
            style={styles.gradientContent}
          >
            <View style={styles.barre}>
              <Text style={{ width: "10%", color: "white", fontFamily: "Kanitus", marginLeft: isMediumScreen ? 8 : 4 }}>Rang</Text>
              <Text style={{ width: "36%", textAlign: "center", marginRight: 2, color: "white", fontFamily: "Kanitus" }}>Equipe</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>J</Text>
              <Text style={{ width: "10%", color: "white", fontFamily: "Kanitus" }}>V</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>N</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>D</Text>
              <Text style={{ width: "9%", color: "white", fontFamily: "Kanitus" }}>GA</Text>
              <Text style={{ width: "8%", color: "white", fontFamily: "Kanitus" }}>Pts</Text>
            </View>
            {tab.map((equipe) =>
              <TouchableOpacity onPress={() => navigation.navigate("FicheEquipe", { id: equipe.team.id, league: equipe.group === "Ligue 1" || equipe.group === "Ligue 1 " ? 61 : equipe.group === "UEFA Champions League" ? 2 : equipe.group === "Premier League" ? 39 : equipe.group === "LaLiga" || equipe.group === "Primera División" ? 140 : equipe.group.indexOf("Super League 1") !== -1 ? 197 : equipe.group === "Bundesliga" ? 78 : equipe.group === "Ligue 2: Regular Season" ? 62 : equipe.group === "Serie A" ? 135 : equipe.group === "UEFA Europa League" ? 3 : equipe.group === "Saudi League" ? 307 : equipe.group === "Eastern Conference" ? 253 : equipe.group === "Primeira Liga" ? 94 : equipe.group === "Ligue 2 " ? 62 : equipe.group === "National " ? 63 : null })} style={{ flexDirection: "row", flexDirection: "row", alignItems: "center", borderBottomWidth: 1, paddingBlock: 13.7 }}>
                <Text style={{ width: "6%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.rank}</Text>
                <Image source={{ uri: equipe.team.logo }} style={[{ objectFit: "contain", height: isMediumScreen ? 35 : 25, width: "8%"}, equipe.team.id === 81 && {shadowColor: '#ffffffff', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 1}]} />
                <Text style={{ width: "30%", color: "white", fontFamily: "Bella", textAlign: "center", fontSize: isMediumScreen? 16 : 14 }}>{teamName[equipe.team.name] || equipe.team.name}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.played}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.win}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.draw}</Text>
                <Text style={{ width: "9%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.all.lose}</Text>
                <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.goalsDiff}</Text>
                <Text style={{ width: "10%", color: "white", fontFamily: "Kanito", textAlign: "center" }}>{equipe.points}</Text>
              </TouchableOpacity>

            )}
          </LinearGradient>
        </View>
      </Animated.View>
      </Animated.View>

      {/* CONTENU BUTEURS */}
      
      <Animated.View style={{ height: animatedHeightButeurs, overflow: "hidden"}}>
        
  <Animated.View style={{ transform: [{ scale: scaleButeurs }], padding: 9}}>
   
        <View
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (contentHeightButeurs === 0 && h > 0)
              setContentHeightButeurs(h);
          }}
        >
          <LinearGradient
            colors={["rgba(199, 199, 199, 1)", "rgba(110,110,110,1)"]}
            style={styles.gradientContent}
          >
            <View style={styles.barre}>
              <Text style={{ width: isMediumScreen? "60%" : "50%", color: "white", paddingStart: 20, fontFamily: "Kanitus", textAlign: "center" }}>Joueur</Text>
              <Text style={{ width:  isMediumScreen ? "20%" : "30%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Matchs Joués</Text>
              <Text style={{ width: isMediumScreen? "20%" : "20%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Buts</Text>

            </View>
             {
        buteurs.length === 0 ? <View style={{alignItems: "center", justifyContent: "center", height: 80}}><Text style={{fontFamily: "Permanent", color: "#fff"}}>Aucune donnée dispo</Text> </View>:
           buteurs.map((joueur) =>
              <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: joueur.player.id })}>
                <View style={[styles.item, isMediumScreen && {height: 72}]}>
                  <Image source={portraitsJoueurs[joueur.player.id] || { uri: joueur.player.photo }} style={{ height: isMediumScreen? 60 : 39, width: "9%", borderRadius: 50, marginInline: isMediumScreen? 20 : 5 }}/>
                  <Text style={{ fontFamily: "Bella", width: "37%" }}>{joueur.player.name}</Text>
                  <Image source={{ uri: joueur.statistics[0].team.logo }} style={[styles.logo, isMediumScreen && {height: 38}]} />
                  <Text style={[{ fontFamily: "Kanito", width: isMediumScreen ? "27%" : "30%", textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{joueur.statistics[0].games.appearences}</Text>
                  <Text style={[{ fontFamily: "Kanitt", width: isMediumScreen ? "18%" : "15%", textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{joueur.statistics[0].goals.total}</Text>

                </View>
              </TouchableOpacity>
           
            )}
          </LinearGradient>
        </View>

      </Animated.View>

      </Animated.View>

      {/* CONTENU PASSEURS */}
      
      <Animated.View style={{ height: animatedHeightPasseurs, overflow: "hidden",}}>
  <Animated.View style={{ transform: [{ scale: scalePasseurs }], padding: 9}}>
        <View
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (contentHeightPasseurs === 0 && h > 0)
              setContentHeightPasseurs(h);
          }}
        >
          <LinearGradient
            colors={["rgba(200, 200, 200, 1)", "rgba(110,110,110,1)"]}
            style={styles.gradientContent}
          >
            <View style={styles.barre}>
              <Text style={{ width: isMediumScreen? "60%" : "50%", color: "white", paddingStart: 20, fontFamily: "Kanitus", textAlign: "center" }}>Joueur</Text>
              <Text style={{ width:  isMediumScreen ? "20%" : "25%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Matchs Joués</Text>
              <Text style={{ width: isMediumScreen? "20%" : "25%", color: "white", textAlign: "center", fontFamily: "Kanitus" }}>Passes Dec</Text>

            </View>
                         {
        passeurs.length === 0 ? <View style={{alignItems: "center", justifyContent: "center", height: 80}}><Text style={{fontFamily: "Permanent", color: "#fff"}}>Aucune donnée dispo</Text> </View>:
            passeurs.map((joueur) =>
              <TouchableOpacity onPress={() => navigation.navigate('FicheJoueur', { id: joueur.player.id })}>
                <View style={[styles.item, isMediumScreen && {height: 72}]}>
                  <Image source={portraitsJoueurs[joueur.player.id] || { uri: joueur.player.photo }} style={{ height: isMediumScreen? 60 : 39, width: "9%", borderRadius: 50, marginInline: isMediumScreen? 12 : 5 }}/>
                  <Text style={{ fontFamily: "Bella", width: "37%" }}>{joueur.player.id === 37784 ? "Mamadou Sissoko" : joueur.player.name}</Text>
                  <Image source={{ uri: joueur.statistics[0].team.logo }} style={[styles.logo, isMediumScreen && {height: 38}]} />
                  <Text style={[{ fontFamily: "Kanito", width: isMediumScreen ? "27%" : "30%", textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{joueur.statistics[0].games.appearences}</Text>
                  <Text style={[{ fontFamily: "Kanitt", width: isMediumScreen ? "18%" : "15%", textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{joueur.statistics[0].goals.assists}</Text>

                </View>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>
      </Animated.View>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
flex: 1
  },
  bouton: {
    width: 85,
    height: 85,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5
  },
  boutonSelected: {
    width: 95,
    height: 95,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1
  },
  btnText: {
    color: "black",
    fontSize: 15,
    fontFamily: "Londrina"
  },
  btnTextSelected: {
    color: "white",
    fontSize: 15,
    fontFamily: "Londrinak"
  },
  gradientContent: {
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: "100%",
    height: 53
  },
 barre: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 5,
    width: "100%"
  },
  logo: {
objectFit: "contain",
height: 25,
width: "7%",  },
list: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 20,
  },
  groupe: {
    marginBlock: 6,
    borderRadius: 10,
    marginBottom: 20
  },
  tableaux: {
    marginTop: 20,
    paddingBottom: 100
  },
  
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "Kanitt",
    marginLeft: 20
  },
  barreSelec: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: "black",
    borderTopStartRadius: 5,
    borderTopEndRadius: 5
  },
  barreItem_equipe: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white",
    width: "42%",
    fontFamily: "Kanito"
  },
  barreItem: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white",
    fontFamily: "Kanito"
  },
  equipe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: "100%"
  },
  flags: {
    width: 30,
    height: 20,
    borderRadius: 2
  },

});

export default Classement;