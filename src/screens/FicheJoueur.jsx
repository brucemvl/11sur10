import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Pour récupérer les paramètres de la route
import redcard from "../assets/redcard.png";
import chevron from "../assets/chevron.png";
import { LinearGradient } from 'expo-linear-gradient';
import player from "../assets/player.png";
import goal from "../assets/goal.png"
import target from "../assets/target.png"
import shoot from "../assets/shoot.png"
import shoe from "../assets/shoe.png"
import rating from "../assets/rating.png"
import yellow from "../assets/yellow.png"
import Precedent from '../components/Precedent';
import ligue1 from "../assets/logoligue1.webp"
import cdm from "../assets/trophees/cdm.png"
import ucl from "../assets/trophees/ucl.png"
import pl from "../assets/trophees/pl.png"
import copa from "../assets/trophees/copaamerica.png"
import europa from "../assets/trophees/europaleague.png"
import tropheeligue1 from "../assets/trophees/ligue1.png"
import liga from "../assets/trophees/liga.png"
import bundesliga from "../assets/trophees/bundesliga.png"
import euro from "../assets/trophees/euro.png"
import uefa from "../assets/trophees/uefasupercup.png"
import seriea from "../assets/trophees/seriea.png"
import can from "../assets/trophees/can.png"
import nations from "../assets/trophees/nations.png"
import fifa from "../assets/trophees/fifa.png"
import haaland from "../assets/portraits/haaland.jpg"
import gyokeres from "../assets/portraits/gyokeres.jpg"
import zaire from "../assets/portraits/zaire.jpg"
import yamal from "../assets/portraits/yamal.jpg"
import dembele from "../assets/portraits/dembele.jpg"
import bellingham from "../assets/portraits/bellingham.jpg"
import barcola from "../assets/portraits/barcola.jpg"
import rodrygo from "../assets/portraits/rodrygo.jpg"
import guller from "../assets/portraits/guller.jpg"
import doue from "../assets/portraits/doue.png"
import kvara from "../assets/portraits/kvara.jpg"
import goat from "../assets/portraits/goat.jpg"
import darwin from "../assets/portraits/darwin.png"
import salah from "../assets/portraits/salah.png"
import kounde from "../assets/portraits/kounde.jpg"







function FicheJoueur() {
  const [joueur, setJoueur] = useState(null);
  const [palmares, setPalmares] = useState(null);
  const [annee, setAnnee] = useState(2024)
  const [opaque, setOpaque] = useState(false)
  const [opaque2, setOpaque2] = useState(true)


  const [openPalmares, setOpenPalmares] = useState(false);

  const route = useRoute();
  const { id } = route.params; // Utilisation des paramètres de route dans React Native

  const [rotateValue, setRotateValue] = useState(new Animated.Value(0)); // Pour la rotation de l'icône
  const [heightAnim, setHeightAnim] = useState(new Animated.Value(0)); // Pour la hauteur du palmarès

    const [rotateSeason, setRotateSeason] = useState(new Animated.Value(0));
  

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
    fetch(`https://v3.football.api-sports.io/trophies?player=${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      .then((result) => setPalmares(result.response))
      .catch((error) => { console.error(error) });
  }, [id]);

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/players?id=${id}&season=${annee}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      .then((result) => setJoueur(result.response[0]))
      .catch((error) => { console.error(error) });
  }, [id, annee]);

  console.log(joueur)

  const prec = ()=> {
    if (annee > 2024 - 3){
    setAnnee((prev)=> prev - 1)}
    if (annee === 2022){
      setOpaque(true)
    }
    if (annee === 2024){
      setOpaque2(false)
    }

    Animated.timing(rotateSeason, {
          toValue:  1,
          duration: 300,
          useNativeDriver: true,
        }).start();
    
  }

  const next = ()=>{
    if (annee < 2024) {
      setAnnee((next)=> next +1)
    }
    if (annee === 2021){
      setOpaque(false)
    }
    if (annee === 2023){
      setOpaque2(true)
    }
   
  }


  if (!joueur || !palmares) {
    return <View>
      <Precedent />
          <Text style={{textAlign: "center", marginTop: 100, fontFamily: "Kanitt", fontSize: 14}}>Aucune Donnée dispo</Text>;
    </View>
  }

  const teamNames = joueur.statistics.map((element) => element.team.name);
  const uniqueTeamNames = joueur.statistics.reduce((acc, element) => {
    if (!acc.includes(element.team.logo) && element.games.minutes > 0) {
      acc.push(element.team.logo);
    }
    return acc;
  }, []);

  const date = new Date(joueur.player.birth.date);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const trophees = palmares.filter((element) => element.place === "Winner");

  const trophies = trophees.reduce((acc, trophy) => {
    if (!acc[trophy.league]) {
      acc[trophy.league] = [];
    }
    acc[trophy.league].push(trophy);
    return acc;
  }, {});

  const trophiesArray = Object.entries(trophies).map(([league, trophies]) => ({
    league,
    trophies,
  }));

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const rotateSeasonInterpolate = rotateSeason.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  console.log(palmares)


  return (
    <View>
    <Precedent />
    <ScrollView contentContainerStyle={styles.blocJoueur}>
      <View style={styles.article}>
        <LinearGradient colors={["black", "steelblue"]} style={styles.infosJoueur}>
          <Image source={ joueur.player.id === 1100 ? haaland : joueur.player.id === 161904 ? barcola : joueur.player.id === 336657 ? zaire : joueur.player.id === 153 ? dembele : joueur.player.id === 129718 ? bellingham : joueur.player.id === 386828 ? yamal : joueur.player.id === 10009 ? rodrygo : joueur.player.id === 18979 ? gyokeres : joueur.player.id === 291964 ? guller : joueur.player.id === 343027 ? doue : joueur.player.id === 483 ? kvara : joueur.player.id === 154 ? goat : joueur.player.id === 306 ? salah : joueur.player.id === 51617 ? darwin : joueur.player.id === 1257 ? kounde : { uri: joueur.player.photo }} style={styles.photo} />
          <View style={styles.bio}>
            <Text style={styles.name}>{joueur.player.name}</Text>
            <Text style={styles.infoText}>Né le {formattedDate} à {joueur.player.birth.place}, {joueur.player.birth.country}</Text>
            <Text style={styles.infoText}>Taille: {joueur.player.height}, Poids: {joueur.player.weight}</Text>
            <Text style={styles.infoText}>Poste: {joueur.statistics[0].games.position === "Midfielder" ? "Milieu" : joueur.statistics[0].games.position === "Attacker" ? "Attaquant" : joueur.statistics[0].games.position === "Defender" ? "Defenseur" : joueur.statistics[0].games.position === "Goalkeeper" ? "Gardien" : joueur.statistics[0].games.position}</Text>
            <View style={styles.logos}>
              {uniqueTeamNames.map((logo, index) => (
                <Image key={`logo-${index}`} source={{ uri: logo }} style={styles.logo} />
              ))}
            </View>
          </View>
        </LinearGradient>

        <View style={styles.palmares}>
          <TouchableOpacity onPress={collapsePalmares}>
            <LinearGradient colors={["black", "steelblue"]} style={styles.palmaresTitle} >
              <Text style={styles.palmaresText}>Palmarès</Text>
              <Animated.Image
                source={chevron}
                style={[styles.chevron, { transform: [{ rotate: rotateInterpolate }] }]}
              />
            </LinearGradient>
          </TouchableOpacity>
          {palmares.length > 22 ?
            <Animated.View style={[styles.palmaresInfos, {
              height: heightAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 380]  // Ajustez la hauteur en fonction du contenu
              })
            }]}>
              <View style={{width: "55%"}} >
                {trophiesArray.map((element, index) => (
                  element.league === "Trofeo Joan Gamper" ? null :
                    <Text style={{ fontFamily: "Kanito", marginInline: 10, marginBlock: 2 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                ))}
              </View>
              <View style={styles.armoire}>
              {trophiesArray.map((element) => <View style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null }</View>)}
              </View>

            </Animated.View> : 
            palmares.length < 12 ? <Animated.View style={[styles.palmaresInfos, {
              height: heightAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 160]  // Ajustez la hauteur en fonction du contenu
              })
            }]}>
              <View style={{width: "55%"}}>
                {trophiesArray.map((element, index) => (
                  element.league === "Trofeo Joan Gamper" ? null :
                    <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                ))}
              </View>
              <View style={styles.armoire}>
              {trophiesArray.map((element) => <View style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A"  ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null }</View>)}
              </View>

            </Animated.View> : 
            palmares.length <= 7 ? <Animated.View style={[styles.palmaresInfos, {
              height: heightAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 120]  // Ajustez la hauteur en fonction du contenu
              })
            }]}>
              <View style={{width: "55%"}}>
                {trophiesArray.map((element, index) => (
                  element.league === "Trofeo Joan Gamper" ? null :
                    <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                ))}
              </View>
              <View style={styles.armoire}>
              {trophiesArray.map((element) => <View style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null }</View>)}
              </View>

            </Animated.View> :
            <Animated.View style={[styles.palmaresInfos, {
              height: heightAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 240]  // Ajustez la hauteur en fonction du contenu
              })
            }]}>
              <View style={{width: "55%"}} >
                {trophiesArray.map((element, index) => (
                  element.league === "Trofeo Joan Gamper" ? null :
                    <Text style={{ fontFamily: "Kanito", marginInline: 10 }}>{element.trophies.length}x {element.league === "CAF Africa Cup of Nations" ? "CAN" : element.league === "Trofeo Joan Gamper" ? null : element.league === "UEFA European Championship" ? "Euro" : element.league}</Text>
                ))}
              </View>
              <View style={styles.armoire}>
              {trophiesArray.map((element) => <View style={styles.box}> {element.league === "FIFA World Cup" ? <Image source={cdm} style={styles.trophee} /> : element.league === "UEFA Champions League" ? <Image source={ucl} style={styles.trophee} /> : element.league === "Premier League" ? <Image source={pl} style={styles.trophee} /> : element.league === "CONMEBOL Copa America" ? <Image source={copa} style={styles.trophee} /> : element.league === "UEFA Europa League" ? <Image source={europa} style={styles.trophee} /> : element.league === "Ligue 1" ? <Image source={tropheeligue1} style={styles.trophee} /> : element.league === "La Liga" ? <Image source={liga} style={styles.trophee} /> : element.league === "Bundesliga" ? <Image source={bundesliga} style={styles.trophee} /> : element.league === "UEFA European Championship" ? <Image source={euro} style={styles.trophee} /> : element.league === "UEFA Super Cup" ? <Image source={uefa} style={styles.trophee} /> : element.league === "Serie A" ? <Image source={seriea} style={styles.trophee} /> : element.league === "CAF Africa Cup of Nations" ? <Image source={can} style={styles.trophee} /> : element.league === "UEFA Nations League" ? <Image source={nations} style={styles.trophee} /> : element.league === "FIFA Intercontinental Cup" ? <Image source={fifa} style={styles.trophee} /> : null }</View>)}
              </View>

            </Animated.View>}
        </View>

        <View style={{flexDirection: "row", alignItems: "center", gap: 20, marginBottom: 10}}>
{opaque === true ? <TouchableOpacity  style={{opacity: 0.2, marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center"}}><Text style={{fontSize: 20, fontFamily: "Kanitt"}}>{"<"}</Text></TouchableOpacity> :<TouchableOpacity onPress={prec} style={{marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center"}}><Text style={{fontSize: 20, fontFamily: "Kanitt"}}>{"<"}</Text></TouchableOpacity>}
<Animated.Text style={[styles.season, { transform: [{ rotate: rotateSeasonInterpolate }] }]}>{annee}/{annee +1}</Animated.Text>
{opaque2 === true ? <TouchableOpacity  style={{opacity: 0.2, marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center"}}><Text style={{fontSize: 20, fontFamily: "Kanitt"}}>{">"}</Text></TouchableOpacity> :<TouchableOpacity onPress={next} style={{marginBlock: 10, width: 50, height: 50, alignItems: "center", justifyContent: "center"}}><Text style={{fontSize: 20, fontFamily: "Kanitt"}}>{">"}</Text></TouchableOpacity>}
        </View>

        <View style={styles.stats}>
          {joueur.statistics.map((element, index) => (
            <View key={index} style={styles.statBlock}>
              {element.games.minutes > 0 && (
                <View>
                  <LinearGradient colors={["black", "steelblue"]} style={{ borderRadius: 5 }}>
                    <Text style={styles.leagueName}>{element.league.name === "Friendlies" ? "Amicaux" : element.league.name}</Text>
                  </LinearGradient>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginInline: 10 }}>
                    <View style={styles.statList}>
                      <View style={styles.ligne}>
                        <Image source={player} style={styles.icone} />
                        <Text style={{ fontFamily: "Kanito", fontSize: 16 }}>Matchs joués: {element.games.appearences}</Text>
                      </View>
                      <View style={styles.ligne}>
                        <Image source={goal} style={styles.icone} />
                        <Text style={{ fontFamily: "Kanito", fontSize: 16 }}>Buts: {element.goals.total}</Text>
                      </View>
                      <View style={styles.ligne}>
                        <Image source={target} style={styles.icone} />
                        <Text style={{ fontFamily: "Kanito", fontSize: 16 }}>Passes Dec: {element.goals.assists}</Text>
                      </View>
                      <View style={styles.ligne}>
                        <Image source={shoot} style={styles.icone} />
                        <Text style={{ fontFamily: "Kanito", fontSize: 16 }}>Tirs (cadrés): {element.shots.total} ({element.shots.on === null ? 0 : element.shots.on})</Text>
                      </View>
                      <View style={styles.ligne}>
                        <Image source={shoe} style={styles.icone} />
                        <Text style={{ fontFamily: "Kanito", fontSize: 16 }}>Passes: {element.passes.total}</Text>
                      </View>
                      <View style={styles.ligne}>
                        <Image source={rating} style={styles.icone} />
                        <Text style={{ fontFamily: "Kanito", fontSize: 16 }}>Note moyenne: {element.games.rating ? element.games.rating.slice(0, 4) : ""}</Text>
                      </View>
                      <View style={styles.ligne}>
                        <Image source={yellow} style={{ height: 25, width: 25, marginRight: 8, shadowColor: "black", shadowOffset: { width: -1, height: 0 }, shadowOpacity: 0.9 }} />
                        <Text style={{ fontFamily: "Kanito", fontSize: 16 }}>Cartons jaune: {element.cards.yellow}</Text>
                      </View>
                      <View style={styles.ligne}>
                        <Image source={redcard} style={styles.icone} />
                        <Text style={{ fontFamily: "Kanito", fontSize: 16 }}>Cartons Rouge: {element.cards.red}</Text>
                      </View>
                    </View>
                    {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image source={ligue1} style={styles.logoCompet} /> : <Image source={{ uri: element.league.logo }} style={styles.logoCompet} />}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  blocJoueur: {
    flexDirection: 'column',
    width: '98%',
    alignItems: 'center',
    margin: '1%',
    marginTop: 65,
    paddingBottom: 50
  },
  article: {
    flexDirection: 'column',
    width: '98%',
    alignItems: "center",
  },
  infosJoueur: {
    backgroundColor: '#4682b4',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    color: 'white',
    marginBottom: 10
  },
  photo: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  bio: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    width: "80%"
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontFamily: "Permanent"
  },
  infoText: {
    fontSize: 14,
    color: 'white',
    fontFamily: "Kanito"
  },
  logos: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 30
  },
  logo: {
    height: 40,
    width: 40,
    marginLeft: 5,
    objectFit: "contain"
  },
  palmares: {
    marginBottom: 20,
    width: '100%',
  },
  palmaresTitle: {
    backgroundColor: '#4682b4',
    color: 'white',
    paddingBlock: 5,
    paddingInline: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center"
  },
  palmaresText: {
    fontSize: 16,
    color: 'white',
    fontFamily: "Permanent",


  },
  chevron: {
    position: "relative",
    left: 120
  },

  palmaresInfos: {
    marginTop: 10,
    flexDirection: "row",
    overflow: "hidden",
    width: "100%",
    alignItems: "center"
  },

  season: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Kanito"
  },
  stats: {
    width: '100%',
  },
  statBlock: {
    marginBottom: 20,
  },
  leagueName: {
    fontSize: 16,
    fontFamily: "Permanent",
    textAlign: "center",
    color: "white",
    marginBlock: 5
  },
  statList: {
    marginTop: 10,
  },
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    marginBlock: 6
  },
  logoCompet: {
    height: 70,
    width: 70,
    marginTop: 10,
    objectFit: "contain"
  },
  icone: {
    height: 25,
    width: 25,
    marginRight: 8
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
    margin: 2
    
        
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
  }
});

export default FicheJoueur;