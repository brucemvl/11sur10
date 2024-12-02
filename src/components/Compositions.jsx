import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Link } from '@react-navigation/native';
import flecheVerte from "../assets/flecheverte.png";
import flecheRouge from "../assets/flecherouge.png";
import redcard from "../assets/redcard.png";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Compositions = ({ match, titulairesDom, titulairesExt, coachDom, coachExt, systemeDom, systemeExt, substituteDom, substituteExt }) => {

  const range = [1, 2, 3, 4, 5];
  const navigation = useNavigation();



  const renderPlayer = (player, isSubstitute = false) => {
    return (
      <View style={styles.playerContainer}>
        <Image
          source={player.statistics[0].games.position === 'G' ? {uri: "https://img.icons8.com/dotty/80/hockey-glove.png"} : {uri: "https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/external-Jersey-sport-outline-bartama-outline-64-bartama-graphic.png"}}
          style={styles.playerImage}
        />
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{player.player.name}</Text>
          <View style={{flexDirection: "row"}}>
          <Text style={styles.playerNumber}><Text style={{fontWeight: "bold"}}>{player.statistics[0].games.number}</Text></Text>
          <View style={styles.playerStats}>
            {range.map((x) => player.statistics[0].goals.total >= x ? <Text key={x} style={styles.goal}>⚽</Text> : null)}
            {player.statistics[0].cards.yellow >= 1 && (
              <Image source={{uri: "https://img.icons8.com/color/48/soccer-yellow-card.png"}} style={styles.cardImage} />
            )}
            {player.statistics[0].cards.red >= 1 && <Image source={redcard} style={styles.cardImage} />}
            {player.statistics[0].games.minutes < 90 && match.fixture.status.long === "Match Finished" && !isSubstitute && (
              <View style={styles.changeContainer}>
                <Text style={styles.changeTime}><Text style={{fontStyle: "italic"}}>{player.statistics[0].games.minutes}'</Text></Text>
                <Image source={flecheRouge} style={styles.arrowImage} />
              </View>
            )}
            {player.statistics[0].games.minutes !== null && isSubstitute && (
              <View style={styles.changeContainer}>
                <Text style={styles.changeTime}><Text style={{fontStyle: "italic"}}>{90 - player.statistics[0].games.minutes}'</Text></Text>
                <Image source={flecheVerte} style={styles.arrowImage} />
              </View>
            )}
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
          source={player.statistics[0].games.position === 'G' ? {uri: "https://img.icons8.com/dotty/80/hockey-glove.png"} : {uri: "https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/external-Jersey-sport-outline-bartama-outline-64-bartama-graphic.png"}}
          style={styles.playerImage}
        />
        <View style={styles.playerExtInfo}>
          <Text style={styles.playerName}>{player.player.name}</Text>
          <View style={{flexDirection: "row-reverse"}}>
          <Text style={styles.playerExtNumber}><Text style={{fontWeight: "bold"}}>{player.statistics[0].games.number}</Text></Text>
          <View style={styles.playerExtStats}>
            {range.map((x) => player.statistics[0].goals.total >= x ? <Text key={x} style={styles.goal}>⚽</Text> : null)}
            {player.statistics[0].cards.yellow >= 1 && (
              <Image source={{uri: "https://img.icons8.com/color/48/soccer-yellow-card.png"}} style={styles.cardImage} />
            )}
            {player.statistics[0].cards.red >= 1 && <Image source={redcard} style={styles.cardImage} />}
            {player.statistics[0].games.minutes < 90 && match.fixture.status.long === "Match Finished" && !isSubstitute && (
              <View style={styles.changeContainer}>
                <Text style={styles.changeTime}><Text style={{fontStyle: "italic"}}>{player.statistics[0].games.minutes}'</Text></Text>
                <Image source={flecheRouge} style={styles.arrowImage} />
              </View>
            )}
            {player.statistics[0].games.minutes !== null && isSubstitute && (
              <View style={styles.changeContainer}>
                <Text style={styles.changeTime}><Text style={{fontStyle: "italic"}}>{90 - player.statistics[0].games.minutes}'</Text></Text>
                <Image source={flecheVerte} style={styles.arrowImage} />
              </View>
            )}
          </View>
          </View>
        </View>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compositions d'équipe</Text>
      <View style={styles.teamsContainer}>
        <View style={styles.teamContainer}>
          <View style={styles.headerCompo}>
            <Image source={{uri: match.teams.home.logo}} style={styles.logo} />
            <Text style={styles.systemeText}>{systemeDom}</Text>
            </View>

              <Text style={styles.subTitle}>Titulaires</Text>
          <LinearGradient colors={[ "rgb(41, 154, 55)", 'rgba(32, 119, 42, 1)']} style={styles.playersList}>
            {titulairesDom.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', {id: player.player.id })}>
                {renderPlayer(player)}
              </TouchableOpacity>
            ))}
          </LinearGradient>
          <Text style={styles.subTitle}>Remplaçants</Text>
          <LinearGradient colors={[ "rgb(189, 152, 161)", 'rgba(90, 103, 92, 0.9)']} style={styles.playersList}>
            {substituteDom.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', {id: player.player.id })}>
                {renderPlayer(player, true)}
              </TouchableOpacity>
            ))}
          </LinearGradient>
          <Text style={{fontFamily: "Kanitus"}}>Coach: {coachDom}</Text>
        </View>

        <View style={styles.teamExtContainer}>
          <View style={styles.headerExtCompo}>
              <Text style={styles.systemeText}>{systemeExt}</Text>
              <Image source={{uri: match.teams.away.logo}} style={styles.logo} />
            </View>
            
            <Text style={styles.subTitleExt}>Titulaires</Text>

            <LinearGradient colors={[ "rgb(41, 154, 55)", 'rgba(32, 119, 42, 1)']} style={styles.playersExtList}>
            {titulairesExt.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', {id: player.player.id })} style={{justifyContent: "flex-end"}}>
                {renderExtPlayer(player)}
              </TouchableOpacity>
            ))}
          </LinearGradient>
          <Text style={styles.subTitle}>Remplaçants</Text>
          <LinearGradient colors={[ "rgb(189, 152, 161)", 'rgba(90, 103, 92, 0.9)']} style={styles.playersExtList}>
            {substituteExt.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', {id: player.player.id })} style={{justifyContent: "flex-end"}}>
                {renderExtPlayer(player, true)}
              </TouchableOpacity>
            ))}
          </LinearGradient>
          <Text style={{fontFamily: "Kanitus"}}>Coach: {coachExt}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 2,
    paddingBlock: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5
  },
  teamContainer: {
    width: '47%',
  },
  teamExtContainer: {
    width: '47%',
  },
  headerCompo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerExtCompo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: "flex-end"
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
    resizeMode: 'contain',
  },
  systemeText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    marginBottom: 16,
borderTopRightRadius: 15,
borderBottomRightRadius: 15
  },
  playersExtList: {
    marginBottom: 16,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15

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