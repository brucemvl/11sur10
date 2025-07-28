import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Link } from '@react-navigation/native';
import flecheVerte from "../assets/flecheverte.png";
import flecheRouge from "../assets/flecherouge.png";
import redcard from "../assets/redcard.png";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Schema from './Schema';
import ancelotti from "../assets/portraits/ancelotti.jpg"
import henrique from "../assets/portraits/henrique.png"
import pep from "../assets/portraits/pep.png"


const Compositions = ({ match, titulairesDom, homeId, extId, titulairesExt, coachDom, coachExt, coachDomId, coachExtId, systemeDom, systemeExt, substituteDom, substituteExt, compoDom, compoExt, colors }) => {

  const range = [1, 2, 3, 4, 5];
  const navigation = useNavigation();
  const[coachDomicile, setCoachDom] = useState()
  const[coachExterieur, setCoachExt] = useState()


useEffect(() => {
        fetch(`https://v3.football.api-sports.io/coachs?team=${homeId}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                "x-rapidapi-host": "v3.football.api-sports.io",
            }
        })
            .then((response) => response.json())
            .then((result) => {
                setCoachDom(result.response[0])
            })
            .catch((error) => { 
                console.error(error);
                setCoachDom(null);
            });
    }, []);

   

    useEffect(() => {
      fetch(`https://v3.football.api-sports.io/coachs?team=${extId}`, {
          method: "GET",
          headers: {
              "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
              "x-rapidapi-host": "v3.football.api-sports.io",
          }
      })
          .then((response) => response.json())
          .then((result) => {
              setCoachExt(result.response[0])
          })
          .catch((error) => { 
              console.error(error);
              setCoachExt(null);
          });
  }, []);

  
  
  const noteDom = match.players[0].players.map((joueur)=> joueur.statistics[0].games.rating)
  const noteExt = match.players[1].players.map((joueur)=> joueur.statistics[0].games.rating)

  const noteMax = Math.max(...noteDom, ...noteExt)

    console.log(coachDomicile)

  const renderPlayer = (player, isSubstitute = false) => {
    return (
      <View style={styles.playerContainer}>
        <Image
          source={player.statistics[0].games.position === 'G' ? { uri: "https://img.icons8.com/dotty/80/hockey-glove.png" } : { uri: "https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/external-Jersey-sport-outline-bartama-outline-64-bartama-graphic.png" }}
          style={styles.playerImage}
        />
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{player.player.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.playerNumber}><Text style={{ fontWeight: "bold" }}>{player.statistics[0].games.number}</Text></Text>
            <View style={styles.playerStats}>
              {range.map((x) => player.statistics[0].goals.total >= x ? <Text key={x} style={styles.goal}>⚽</Text> : null)}
              {player.statistics[0].cards.yellow >= 1 && (
                <Image source={{ uri: "https://img.icons8.com/color/48/soccer-yellow-card.png" }} style={styles.cardImage} />
              )}
              {player.statistics[0].cards.red >= 1 && <Image source={redcard} style={styles.cardImage} />}
              {player.statistics[0].games.minutes < 90 && match.fixture.status.long === "Match Finished" && !isSubstitute && (
                <View style={styles.changeContainer}>
                  <Text style={styles.changeTime}><Text style={{ fontStyle: "italic" }}>{player.statistics[0].games.minutes}'</Text></Text>
                  <Image source={flecheRouge} style={styles.arrowImage} />
                </View>
              )}
              {player.statistics[0].games.minutes !== null && isSubstitute && (
                <View style={styles.changeContainer}>
                  <Text style={styles.changeTime}><Text style={{ fontStyle: "italic" }}>{90 - player.statistics[0].games.minutes}'</Text></Text>
                  <Image source={flecheVerte} style={styles.arrowImage} />
                </View>
              )}
                            {match.fixture.status.long === "Match Finished" && player.statistics[0].games.rating >= noteMax ? <Text>⭐</Text> : null }

            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderExtPlayer = (player, isSubstitute = false) => {
    return (
      <View style={styles.playerExtContainer}>
        <Image
          source={player.statistics[0].games.position === 'G' ? { uri: "https://img.icons8.com/dotty/80/hockey-glove.png" } : { uri: "https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/external-Jersey-sport-outline-bartama-outline-64-bartama-graphic.png" }}
          style={styles.playerImage}
        />
        <View style={styles.playerExtInfo}>
          <Text style={styles.playerName}>{player.player.name}</Text>
          <View style={{ flexDirection: "row-reverse" }}>
            <Text style={styles.playerExtNumber}><Text style={{ fontWeight: "bold" }}>{player.statistics[0].games.number}</Text></Text>
            <View style={styles.playerExtStats}>
              {range.map((x) => player.statistics[0].goals.total >= x ? <Text key={x} style={styles.goal}>⚽</Text> : null)}
              {player.statistics[0].cards.yellow >= 1 && (
                <Image source={{ uri: "https://img.icons8.com/color/48/soccer-yellow-card.png" }} style={styles.cardImage} />
              )}
              {player.statistics[0].cards.red >= 1 && <Image source={redcard} style={styles.cardImage} />}
              {player.statistics[0].games.minutes < 90 && match.fixture.status.long === "Match Finished" && !isSubstitute && (
                <View style={styles.changeContainer}>
                  <Text style={styles.changeTime}><Text style={{ fontStyle: "italic" }}>{player.statistics[0].games.minutes}'</Text></Text>
                  <Image source={flecheRouge} style={styles.arrowImage} />
                </View>
              )}
              {player.statistics[0].games.minutes !== null && isSubstitute && (
                <View style={styles.changeContainer}>
                  <Text style={styles.changeTime}><Text style={{ fontStyle: "italic" }}>{90 - player.statistics[0].games.minutes}'</Text></Text>
                  <Image source={flecheVerte} style={styles.arrowImage} />
                </View>
              )}
              {match.fixture.status.long === "Match Finished" && player.statistics[0].games.rating >= noteMax ? <Text>⭐</Text> : null }
            </View>
          </View>
        </View>
      </View>
    );
  };

if (match.players.length === 0){
  return (
    <Text>Aucune info</Text>
  )
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compositions d'équipe</Text>
      <Schema compoDom={compoDom} compoExt={compoExt} colors={colors} match={match} />

      <View style={styles.teamsContainer}>
        
        <View style={styles.compos}>
          
          <View style={styles.compo}>
            <Image source={{ uri: match?.teams.home.logo }} style={styles.logo} />
            <Text style={styles.systemeText}>{systemeDom}</Text>
          </View>
          <View style={styles.compo}>
            <Text style={styles.systemeText}>{systemeExt}</Text>
            <Image source={{ uri: match?.teams.away.logo }} style={styles.logo} />
          </View>
        </View>

          <View style={styles.coachs}>
         {compoDom.coach.id === null ? null : <View style={{flexDirection: "column-reverse", alignItems: "center", justifyContent:"center", gap: 5,  padding: 8, borderTopRightRadius: 15, borderBottomRightRadius: 15}}> <Text style={{ fontFamily: "Kanitalik", color: "black", fontSize: 12, textAlign: "center" }}>{compoDom.coach.id === 17396 ? "Javier Mascherano" : compoDom.coach.id === 6801 ? "Xabi Alonso" : compoDom.coach.id === 193 ? "Luis Enrique" : compoDom.coach.id === 12590 ? "Vincent Kompany" : compoDom.coach.name}</Text><Image source={compoDom.coach.id === 4 ? pep : compoDom.coach.id === 2407 ? ancelotti : compoDom.coach.id === 193 ? henrique : {uri: compoDom.coach.photo}} style={{width: 45, height: 45, borderRadius: 50, }}/></View> }
         {compoExt.coach.id === null ? null : <View style={{flexDirection: "column-reverse", alignItems: "center", justifyContent:"center", gap: 5, padding: 8, borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}> <Text style={{ fontFamily: "Kanitalik", color: "black", fontSize: 12, textAlign: "center" }}>{compoExt.coach.id === 17396 ? "Javier Mascherano" : compoExt.coach.id === 6801 ? "Xabi Alonso" : compoExt.coach.id === 193 ? "Luis Enrique" : compoExt.coach.id === 12590 ? "Vincent Kompany" : compoExt.coach.name}</Text><Image source={compoExt.coach.id === 4 ? pep : compoExt.coach.id === 2407 ? ancelotti : compoExt.coach.id === 193 ? henrique : {uri: compoExt.coach.photo}} style={{width: 45, height: 45, borderRadius: 50, }}/></View> }
      </View>

          <LinearGradient colors={["rgb(167, 167, 167)", "rgb(145, 145, 145)", "rgb(115, 115, 115)"]} style={styles.playersList}>
            <View style={styles.equipeDom}>
            {titulairesDom.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.player.id, team: match.teams.home.id })}>
                {renderPlayer(player)}
              </TouchableOpacity>
            ))}
            </View>
            <View style={styles.equipeExt}>
{titulairesExt.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.player.id, team: match.teams.away.id })} style={{ justifyContent: "flex-end" }}>
                {renderExtPlayer(player)}
              </TouchableOpacity>
            ))}
            </View>
          </LinearGradient>

          <Text style={styles.subTitle}>Remplaçants</Text>
          <LinearGradient colors={["rgb(115, 115, 115)", "rgb(140, 140, 140)", "rgb(165, 165, 165)"]} style={styles.playersList}>
                        <View style={styles.equipeDom}>
            {substituteDom.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.player.id, team: match.teams.home.id })}>
                {renderPlayer(player, true)}
              </TouchableOpacity>
            ))}
            </View>
                        <View style={styles.equipeExt}>
                          {substituteExt.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.player.id, team: match.teams.away.id })} style={{ justifyContent: "flex-end" }}>
                {renderExtPlayer(player, true)}
              </TouchableOpacity>
            ))}
            </View>

          </LinearGradient>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%"
  },
  title: {
    fontSize: 18,
    fontFamily: "Kanitt"
  },
  teamsContainer: {
    flexDirection: 'column',
    gap: 5,
    width: "100%",
    alignItems: "center"
  },
  compos: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%"
  },
  teamExtContainer: {
    width: '50%',
  },
  compo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  coachs: {
justifyContent: "space-around",
flexDirection: "row",
width: "100%"
  },
  
  logo: {
    width: 40,
    height: 40,
    marginInline: 8,
    resizeMode: 'contain',
  },
  systemeText: {
    fontSize: 18,
    fontFamily: "Kanitt"
  },
  subTitle: {
    fontSize: 16,
    margin: 8,
    textAlign: "center",
    fontFamily: "Kanito"
  },
  subTitleExt: {
    fontSize: 16,
    margin: 8,
    textAlign: "center",
    fontFamily: "Kanito"
  },

  playersList: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBlock: 15,
    width: "100%",
    justifyContent: "space-between",
    paddingInline: 2

  },
  equipeDom: {
flexDirection: "column",
alignItems: "flex-start",
borderRightWidth: 1,
width: "50%"
  },
  equipeExt: {
flexDirection: "column",
alignItems: "flex-end",
borderLeftWidth: 1,
width: "50%"
  },
  playersExtList: {
    marginBottom: 16,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingBlock: 10
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  playerExtContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 14,
  },
  playerImage: {
    width: 28,
    height: 28,
  },
  playerInfo: {
    marginLeft: 5,

  },
  playerExtInfo: {
    marginRight: 5,
  },
  playerName: {
    fontSize: 14,
    fontFamily: "Kanito",
    color: "white"
  },
  playerNumber: {
    fontSize: 16,
    marginRight: 8,
    color: "white",
    fontFamily: "Kanitalic"

  },
  playerExtNumber: {
    fontSize: 16,
    marginLeft: 8,
    textAlign: "right",
    color: "white",
    fontFamily: "Kanitalic"
  },
  playerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerExtStats: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  goal: {
    fontSize: 14,
  },
  cardImage: {
    width: 22,
    height: 22,
    shadowColor: '#000',
    shadowOffset: { width: -1, height: 0 }, // Ombre décalée sur l'axe Y
    shadowOpacity: 0.9, // Opacité de l'ombre
    shadowRadius: 2, // Rayon de l'ombre (flou)
  },
  changeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  changeTime: {
    fontSize: 10,
    color: 'black',
    marginRight: 4,
    color: "white"
  },
  arrowImage: {
    width: 16,
    height: 16,
  },
});

export default Compositions;