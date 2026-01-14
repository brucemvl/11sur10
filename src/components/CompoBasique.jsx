import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import flecheVerte from "../assets/flecheverte.png";
import flecheRouge from "../assets/flecherouge.png";
import redcard from "../assets/redcard.png";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ancelotti from "../assets/portraits/ancelotti.jpg"
import henrique from "../assets/portraits/henrique.png"
import pep from "../assets/portraits/pep.png"
import flick from "../assets/portraits/flick.png"
import arteta from "../assets/portraits/arteta.png"
import emery from "../assets/portraits/emery.png"
import simeone from "../assets/portraits/dsimeone.png"
import amorim from "../assets/portraits/amorim.webp"
import genesio from "../assets/portraits/genesio.png"
import alonso from "../assets/portraits/alonso.png"
import maresca from "../assets/portraits/maresca.png"
import rosenior from "../assets/portraits/rosenior.png"
import conte from "../assets/portraits/conte.png"

function CompoBasique({match}){

    const range = [1, 2, 3, 4, 5];
      const navigation = useNavigation();


      const coachImages = {
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
        13350: rosenior,
          2425: conte
      };

      const coachNames = {
  17396: "Javier Mascherano",
  6801: "Xabi Alonso",
  193: "Luis Enrique",
  12590: "Vincent Kompany",
  2462: "José Mourinho",
  2431: "Paulo Fonseca",
  4720: "Ruben Amorim",
  7248: "Mikel Arteta",
  4: "Pep Guardiola",
  6472: "Hans Flick",
  1595: "Diego Simeone",
  180: "Didier Deschamps",
  18: "Unai Emery",
  19134: "Didier Digard",
  2006: "Arne Slot",
  3: "Manuel Pellegrini",
  21528: "Cesc Fabregas",
  2652: "Walid Regragui",
    1155: "Vladimir Petkovic"

}


    return(
<View>
    <View style={styles.container}>
      <Text style={styles.title}>Compositions d'équipe</Text>

      <View style={styles.teamsContainer}>
        
        <View style={styles.compos}>
          
          <View style={styles.compo}>
            <Image source={{ uri: match?.teams.home.logo }} style={styles.logo} />
            <Text style={styles.systemeText}>{match.lineups[0].formation}</Text>
          </View>
          <View style={styles.compo}>
            <Image source={{ uri: match?.teams.away.logo }} style={styles.logo} />
                        <Text style={styles.systemeText}>{match.lineups[1].formation}</Text>

          </View>
        </View>

          <View style={styles.coachs}>
         {match.lineups[0].coach.id === null ? null : <TouchableOpacity onPress={() => navigation.navigate('FicheCoach', { id: match.lineups[0].coach.id })} style={{flexDirection: "column-reverse", alignItems: "center", justifyContent:"center", gap: 5,  padding: 8, borderTopRightRadius: 15, borderBottomRightRadius: 15}} accessible accessibilityRole="button" accessibilityLabel="Fiche Coach" accessibilityHint={`Accéder a la fiche de l'entraineur ${coachNames[match.lineups[0].coach.id]}`}> <Text style={{ fontFamily: "Kanitalik", color: "black", fontSize: 12, textAlign: "center" }}>{coachNames[match.lineups[0].coach.id] || match.lineups[0].coach.name}</Text><Image source={coachImages[match.lineups[0].coach.id] || {uri: match.lineups[0].coach.photo}} style={{width: 45, height: 45, borderRadius: 50, }}/></TouchableOpacity> }
         {match.lineups[1].coach.id === null ? null : <TouchableOpacity onPress={() => navigation.navigate('FicheCoach', { id: match.lineups[1].coach.id })} style={{flexDirection: "column-reverse", alignItems: "center", justifyContent:"center", gap: 5, padding: 8, borderTopLeftRadius: 15, borderBottomLeftRadius: 15}} accessible accessibilityRole="button" accessibilityLabel="Fiche Coach" accessibilityHint={`Accéder a la fiche de l'entraineur ${coachNames[match.lineups[1].coach.id]}`}> <Text style={{ fontFamily: "Kanitalik", color: "black", fontSize: 12, textAlign: "center" }}>{coachNames[match.lineups[1].coach.id] || match.lineups[1].coach.name}</Text><Image source={coachImages[match.lineups[1].coach.id] || {uri: match.lineups[1].coach.photo}} style={{width: 45, height: 45, borderRadius: 50, }}/></TouchableOpacity> }
      </View>

          <LinearGradient colors={["rgb(167, 167, 167)", "rgb(145, 145, 145)", "rgb(115, 115, 115)"]} style={styles.playersList}>
            <View style={styles.equipeDom}>
            {match.lineups[0]?.startXI.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.player.id, team: match.teams.home.id })}>
             <View style={styles.playerContainer}>
                     <Image
                       source={player.player.pos === 'G' ? { uri: "https://img.icons8.com/dotty/80/hockey-glove.png" } : { uri: "https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/external-Jersey-sport-outline-bartama-outline-64-bartama-graphic.png" }}
                       style={styles.playerImage}
                     />
                     <View style={styles.playerInfo}>
                       <Text style={styles.playerName}>{player.player.name}</Text>
                       <View style={{ flexDirection: "row" }}>
                         <Text style={styles.playerNumber}><Text style={{ fontWeight: "bold" }}>{player.player.number}</Text></Text>
                        
                       </View>
                     </View>
                   </View>
              </TouchableOpacity>
            ))}
            </View>
            <View style={styles.equipeExt}>
{match.lineups[1]?.startXI.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.player.id, team: match.teams.away.id })} style={{ justifyContent: "flex-end" }}>
             <View style={styles.playerExtContainer}>
                     <Image
                       source={player.player.pos === 'G' ? { uri: "https://img.icons8.com/dotty/80/hockey-glove.png" } : { uri: "https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/external-Jersey-sport-outline-bartama-outline-64-bartama-graphic.png" }}
                       style={styles.playerImage}
                     />
                     <View style={styles.playerExtInfo}>
                       <Text style={styles.playerName}>{player.player.name}</Text>
                       <View style={{ flexDirection: "row-reverse" }}>
                         <Text style={styles.playerExtNumber}><Text style={{ fontWeight: "bold" }}>{player.player.number}</Text></Text>
                        
                       </View>
                     </View>
                   </View>
              </TouchableOpacity>
            ))}
            </View>
          </LinearGradient>
{match.lineups[0] != undefined ? <View>
          <Text style={styles.subTitle}>Remplaçants</Text>
          <LinearGradient colors={["rgb(115, 115, 115)", "rgb(140, 140, 140)", "rgb(165, 165, 165)"]} style={styles.playersList}>
                        <View style={styles.equipeDom}>
            {match.lineups[0]?.substitutes?.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.player.id, team: match.teams.home.id })}>
              <View style={styles.playerContainer}>
                     <Image
                       source={player.player.pos === 'G' ? { uri: "https://img.icons8.com/dotty/80/hockey-glove.png" } : { uri: "https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/external-Jersey-sport-outline-bartama-outline-64-bartama-graphic.png" }}
                       style={styles.playerImage}
                     />
                     <View style={styles.playerInfo}>
                       <Text style={styles.playerName}>{player.player.name}</Text>
                       <View style={{ flexDirection: "row" }}>
                         <Text style={styles.playerNumber}><Text style={{ fontWeight: "bold" }}>{player.player.number}</Text></Text>
                        
                       </View>
                     </View>
                   </View>
              </TouchableOpacity>
            ))}
            </View>
                        <View style={styles.equipeExt}>
                          {match.lineups[1]?.substitutes?.map((player) => (
              <TouchableOpacity key={player.player.id} onPress={() => navigation.navigate('FicheJoueur', { id: player.player.id, team: match.teams.away.id })} style={{ justifyContent: "flex-end" }}>
              <View style={styles.playerExtContainer}>
                     <Image
                       source={player.player.pos === 'G' ? { uri: "https://img.icons8.com/dotty/80/hockey-glove.png" } : { uri: "https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/external-Jersey-sport-outline-bartama-outline-64-bartama-graphic.png" }}
                       style={styles.playerImage}
                     />
                     <View style={styles.playerExtInfo}>
                       <Text style={styles.playerName}>{player.player.name}</Text>
                       <View style={{ flexDirection: "row-reverse" }}>
                         <Text style={styles.playerExtNumber}><Text style={{ fontWeight: "bold" }}>{player.player.number}</Text></Text>
                        
                       </View>
                     </View>
                   </View>
              </TouchableOpacity>
            ))}
            </View>

          </LinearGradient>
          </View>
          : null
}
      </View>
    </View>
</View>
    )

}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginTop: 20
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
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
    gap: 5
  },
  coachs: {
justifyContent: "space-between",
flexDirection: "row",
width: "85%"
  },
  
  logo: {
    width: 40,
    height: 40,
    marginInline: 8,
    resizeMode: 'contain',
  },
  systemeText: {
    fontSize: 18,
    fontFamily: "Kanitt",
    backgroundColor: "black",
    color: "white",
    padding: 3,
    borderRadius: 5
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

export default CompoBasique