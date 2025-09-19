import ancelotti from "../assets/portraits/ancelotti.jpg"
import henrique from "../assets/portraits/henrique.png"
import pep from "../assets/portraits/pep.png"
import flick from "../assets/portraits/flick.png"
import arteta from "../assets/portraits/arteta.png"
import kompany from "../assets/portraits/kompany.png"
import emery from "../assets/portraits/emery.png"
import simeone from "../assets/portraits/dsimeone.png"
import amorim from "../assets/portraits/amorim.webp"
import genesio from "../assets/portraits/genesio.png"
import alonso from "../assets/portraits/alonso.png"
import maresca from "../assets/portraits/maresca.png"
import beye from "../assets/portraits/beye.png"
import slot from "../assets/portraits/slot.png"
import mourinho from "../assets/portraits/mourinho.png"
import deschamps from "../assets/portraits/deschamps.png"
import dezerbi from "../assets/portraits/dezerbi.png"
import { View, Text, Image, StyleSheet, ScrollView, Animated, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native";
import Precedent from "../components/Precedent"
import { LinearGradient } from "expo-linear-gradient"
import chevron from "../assets/chevron.png";
import cdm from "../assets/trophees/cdm.png"
import ucl from "../assets/trophees/ucl.png"
import pl from "../assets/trophees/pl.png"
import copa from "../assets/trophees/copaamerica.png"
import europa from "../assets/trophees/europaleague.png"
import tropheeligue1 from "../assets/trophees/ligue1.png"
import newtropheeligue1 from "../assets/trophees/ligue11.webp"
import liga from "../assets/trophees/liga.png"
import bundesliga from "../assets/trophees/bundesliga.png"
import euro from "../assets/trophees/euro.png"
import uefa from "../assets/trophees/uefasupercup.png"
import seriea from "../assets/trophees/seriea.png"
import can from "../assets/trophees/can.png"
import nations from "../assets/trophees/nations.png"
import fifa from "../assets/trophees/fifa.png"



function FicheCoach() {

  const route = useRoute();
  const { id } = route.params;
  const [coach, setCoach] = useState('')
  const [palmares, setPalmares] = useState('')

  const [openPalmares, setOpenPalmares] = useState(false);
  const [heightAnim, setHeightAnim] = useState(new Animated.Value(0)); // Pour la hauteur du palmarès


  const [rotateValue, setRotateValue] = useState(new Animated.Value(0)); // Pour la rotation de l'icône

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const collapsePalmares = () => {
    setOpenPalmares(!openPalmares);

    Animated.timing(rotateValue, {
      toValue: openPalmares ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animer la hauteur du palmarès
    Animated.timing(heightAnim, {
      toValue: openPalmares ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {

    // Fetch home team statistics
    fetch(`https://v3.football.api-sports.io/coachs?id=${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
      }
    })
      .then((response) => response.json())
      .then((result) => setCoach(result.response[0]))
      .catch((error) => { console.error(error) });
  }, []);


  useEffect(() => {

    // Fetch home team statistics
    fetch(`https://v3.football.api-sports.io/trophies?coach=${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
      }
    })
      .then((response) => response.json())
      .then((result) => setPalmares(result.response))
      .catch((error) => { console.error(error) });
  }, []);


  if (!coach || !palmares) {
    return <View>
      <Precedent />
      <Text style={{ textAlign: "center", marginTop: 100, fontFamily: "Kanitt", fontSize: 14 }}>Aucune Donnée dispo</Text>;
    </View>
  }

  console.log(palmares)

  const trophees = palmares.filter((element) => element.place === "Winner")

  const tropheesRegroupes = [];

  const map = new Map();

  trophees.forEach(({ league, season }) => {
    if (!map.has(league)) {
      map.set(league, new Set());
    }
    map.get(league).add(season);
  });

  map.forEach((saisons, league) => {
    const saisonsTriees = Array.from(saisons).sort((a, b) => {
      const parseYear = s => parseInt(s.slice(0, 4));
      return parseYear(b) - parseYear(a);
    });

    tropheesRegroupes.push({ league, saisons: saisonsTriees });
  });

  console.log(coach)




  const date = new Date(coach?.birth.date);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const coachImages = {
    2424: dezerbi,
    12629: maresca,
    6801: alonso,
    68: genesio,
    1595: simeone,
    4720: amorim,
    18: emery,
    6472: flick,
    4: pep,
    7248: arteta,
    2407: ancelotti,
    193: henrique,
    12590: kompany,
    2006: slot,
    17926: beye,
    2462: mourinho,
    180: deschamps
  };


  return (
    <View style={styles.bloc}>
      <Precedent />
      <ScrollView contentContainerStyle={styles.blocCoach}>
        <LinearGradient colors={["black", "steelblue"]} style={styles.infosCoach}>
          <Image source={coachImages[coach.id] || { uri: coach.photo }} style={{ height: 90, width: 90, borderRadius: 40, zIndex: 2 }} />
          <Image source={coach.id === 180 ? {uri: "https://media.api-sports.io/football/teams/2.png"} : {uri: coach.team.logo }} style={{ height: 70, width: 70, position: "relative", right: 48, bottom: 20, objectFit: "contain"
           }} />
          <View style={styles.bio}>
            <Text style={styles.name}>{coach.name}</Text>
            <View style={{ width: "100%", flexDirection: "column", alignItems: "center" }}> <Text style={styles.infoText}>Né le {formattedDate}</Text><View style={{ flexDirection: "row", alignItems: "center" }}><Text style={{ fontFamily: "Kanitalic", color: "white" }}> à {coach.birth.place},</Text><Text style={{ fontFamily: "Kanitalik", color: "white", fontSize: 15 }}> {coach.birth.country === "Spain" ? "Espagne" : coach.birth.country === "Netherlands" ? "Pays-Bas" : coach.birth.country === "Belgium" ? "Belgique" : coach.birth.country === "Brazil" ? "Bresil" : coach.birth.country === "England" ? "Angleterre" : coach.birth.country === "Türkiye" ? "Turquie" : coach.birth.country === "Switzerland" ? "Suisse" : coach.birth.country === "Germany" ? "Allemagne" : coach.birth.country}</Text></View></View>

          </View>
        </LinearGradient>
        <View style={{ flexDirection: "column", gap: 10, alignItems: "center", width: "100%" }}>
          <TouchableOpacity onPress={collapsePalmares} style={{ width: "90%" }}>
            <LinearGradient colors={["black", "steelblue"]} style={styles.palmaresTitle} >
              <Text style={styles.palmaresText}>Palmarès</Text>
              <Animated.Image
                source={chevron}
                style={[styles.chevron, { transform: [{ rotate: rotateInterpolate }] }]}
              />
            </LinearGradient>
          </TouchableOpacity>
          <Animated.View style={[styles.palmaresInfos, {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 260]  // Ajustez la hauteur en fonction du contenu
            })
          }]}>                                          <View style={{ width: "55%" }}>
              {tropheesRegroupes.map((element, index) => (
                element.league === "Cup" ? null : element.league === "Trofeo Joan Gamper" ? null : element.league === "FA Youth Cup" ? null : element.league === "Supercopa de Catalunya" ? null : element.league === "Copa del Rey Juvenil" ? null : element.league === "Audi Cup" ? null : element.league === "Ekstraklasa" ? null :
                  <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.saisons.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
              ))}
            </View>
            <View style={styles.armoire}>
              {tropheesRegroupes.map((element) => <View key={"trophy" + element.league + element.saisons[0]} style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? element.saisons[0] === "2024/2025" ? <Image source={newtropheeligue1} style={styles.trophee} /> : <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null}</View>)}
            </View>
          </Animated.View>
          <Text style={{ fontFamily: "Kanitt", fontSize: 18 }}>Carriere</Text>
          {coach.career.map((mandat) =>
            <View style={styles.mandat}>
                        {coach.id === 180 && mandat.team.name === "Spain" ? null :

              <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Kanitalik", fontSize: 11, width: "50%", textAlign: "center" }}>
                  {mandat.end === null
                    ? "Actuellement"
                    : `${new Date(mandat.start).toLocaleDateString("fr")} - ${new Date(mandat.end).toLocaleDateString("fr")}`}
                </Text>
                <View style={styles.equipe}>
                  <Image source={{ uri: mandat.team.logo }} style={{ height: 40, width: 40, objectFit: "contain" }} />
                  <Text style={{ fontFamily: "Kanitt" }}>{ mandat.team.name === "Spain" ? "Espagne" : mandat.team.name === "Germany" ? "Allemagne" : mandat.team.name === "Barcelona" ? "FC Barcelone" : mandat.team.name}</Text>
                </View>
              </View>}

            </View>)}
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  blocCoach: {
    flexDirection: 'column',
    width: '98%',
    alignItems: 'center',
    margin: '1%',
    marginTop: 65,
    paddingBlockEnd: 140,
  },
  infosCoach: {
    borderRadius: 15,
    flexDirection: 'row',
    padding: 12,
    width: '90%',
    color: 'white',
    marginBottom: 10,
    justifyContent: "space-around",
    height: 140,
    justifyContent: "center",
    alignItems: "center"

  },
  bio: {
    alignItems: "center"
  },
  name: {
    fontFamily: "Permanent",
    fontSize: 18,
    color: "white",
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    fontFamily: "Kanito",
    textAlign: "center"
  },
  mandat: {
    backgroundColor: "rgba(218, 218, 218, 1)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: 15,
    paddingBlock: 8,
    borderRadius: 10,
    width: "85%"
  },
  equipe: {
    alignItems: "center",
    gap: 5,
    width: "50%",
  },
  trophee: {
    height: 74,
    width: 74,
    objectFit: "contain",
    overflow: "hidden",
    shadowColor: '#000', // shadow color
    shadowOffset: { width: -3, height: -3 }, // shadow offset
    shadowOpacity: 0.3, // shadow opacity
    shadowRadius: 3,
    padding: 7,
    margin: 2,
    elevation: 5



  },
  palmaresTitle: {
    backgroundColor: '#4682b4',
    color: 'white',
    paddingBlock: 5,
    paddingInline: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%"
  },
  palmaresText: {
    fontSize: 16,
    color: 'white',
    fontFamily: "Permanent",


  },
  palmaresInfos: {
    marginTop: 10,
    flexDirection: "row",
    overflow: "hidden",
    width: "100%",
    alignItems: "center"
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
  armoire: {
    flexDirection: "row",
    justifyContent: "center",
    width: "45%",
    flexWrap: "wrap",
    alignItems: "center",
    paddingBlock: 6
  },
  chevron: {
    position: "relative",
    left: 100
  },

});

export default FicheCoach;