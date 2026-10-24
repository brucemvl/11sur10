import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Animated, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import ligue1 from "../assets/logoligue1.webp"
import ligue2 from "../assets/ligue2.jpg"
import cdm2026 from "../assets/cdm2026.png"
import ucl from "../assets/logoucl.png"
import stade from "../assets/stade.png"
import round from "../assets/calendrier.png"
import heure from "../assets/heure.png"
import calendrier from "../assets/date.png"
import tv from "../assets/screen2.png"
import loc from "../assets/loc.png"
import ucl2 from "../assets/UCL2.jpg"
import grass from "../assets/grass.jpg"
import pl from "../assets/PL.jpg"
import liga from "../assets/liga.webp"
import bundesliga from "../assets/bundesliga.webp"
import can from "../assets/can.webp"
import arbitre from "../assets/arbitre.png"
import ligue1plus from "../assets/logos/ligue1plus.webp"
import canal from "../assets/logos/canal.png"
import lequipe from "../assets/logos/lequipe.png"
import bein from "../assets/logos/bein.png"
import m6 from "../assets/logos/m6.png"
import tf1 from "../assets/logos/tf1.png"
import dazn from "../assets/logos/dazn.png"
import disney from "../assets/logos/disney.png"
import fifaclubwc from "../assets/fifaclubwc2.png"
import red from "../assets/redcard.png"
import parc from "../assets/stades/parc.jpg"
import velodrome from "../assets/stades/velodrome.jpg"
import louisII from "../assets/stades/louisll.jpeg"
import bollaert from "../assets/stades/bollaert.jpg"
import bernabeu from "../assets/stades/bernabeu.webp"
import emirates from "../assets/stades/emirates.webp"
import oldtrafford from "../assets/stades/oldtrafford.webp"
import allianz from "../assets/stades/allianz.jpeg"
import anfield from "../assets/stades/anfield.webp"
import signal from "../assets/stades/signal.jpg"
import sansiro from "../assets/stades/sansiro.jpeg"
import giuseppe from "../assets/stades/giuseppe.jpg"
import diego from "../assets/stades/diego.jpg"
import { teamName } from '../datas/teamNames';
import { useTranslation } from 'react-i18next';
import { SvgUri } from 'react-native-svg';


const buteursNames = {
    44 : "Rodri",
    1323: "Dani Olmo",
    182219 : "Alex Baena",
    377122: "Endrick"


}

const flags = {
    "Ligue 1" : "https://media.api-sports.io/flags/fr.svg",
    "Coupe de France" : "https://media.api-sports.io/flags/fr.svg",
    "Premier League" : "https://media.api-sports.io/flags/gb-eng.svg",
    "League Cup" : "https://media.api-sports.io/flags/gb-eng.svg",
    "FA Cup" : "https://media.api-sports.io/flags/gb-eng.svg",
    "La Liga" : "https://media.api-sports.io/flags/es.svg",
    "Copa del Rey" : "https://media.api-sports.io/flags/es.svg",
    "Bundesliga" : "https://media.api-sports.io/flags/de.svg",
    "DFB Pokal" : "https://media.api-sports.io/flags/de.svg",
    "Serie A" : "https://media.api-sports.io/flags/it.svg",
    "Pro League" : "https://media.api-sports.io/flags/sa.svg",
    "Major League Soccer" : "https://media.api-sports.io/flags/us.svg",
  }



const Affiche = ({ match, roundd, buteurHome, buteurExt, buteurHomeP, buteurExtP, formeHome, formeExt, onPress, classement }) => {

     const { width } = useWindowDimensions();
     const {t, i18n} = useTranslation()
      
          const isMediumScreen = width <= 1024 && width > 767;
    
    const navigation = useNavigation()
    const date = new Date(match.fixture.date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    const formattedHour = `${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;

    const [forme, setForme] = useState(0)

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

 
  
  const imageBackgrounds = {
  leagues: {
    2: ucl2,
    6: can,             // Coupe d’Afrique des Nations
    61: {               // Ligue 1 (cas particuliers)
      81: velodrome,    // Olympique de Marseille (Stade Vélodrome)
      85: parc,         // Paris Saint-Germain (Parc des Princes)
      91: louisII,
      116: bollaert,
      default: grass    // Autres clubs de Ligue 1
    },
    140: {
        541: bernabeu,
        default: liga
    },
    39: {
        42: emirates,
        33: oldtrafford,
        40: anfield,
        default: pl
    },
    78: {
        157: allianz,
        165: signal,
        default: bundesliga
    },
    135 : {
        489: sansiro,
        505: giuseppe,
        492: diego,
        default: pl
    }
  },
  default: grass
};

 const league = match.league.id;
const homeTeam = match.teams.home.id;

const backgroundSource =
  imageBackgrounds.leagues[league]?.[homeTeam] ??
  imageBackgrounds.leagues[league]?.default ??
  imageBackgrounds.leagues[league] ??
  imageBackgrounds.default;

  const placeDom = classement?.filter((element)=> element.team.id === homeTeam)
  const placeExt = classement?.filter((element)=> element.team.id === match.teams.away.id)

 function getRoundLabel(match) {
  // 🔹 Si langue anglaise, on retourne simplement le nom du round
  if (i18n.language === 'en') {
    return `${match.league.round}`;
  }

  // 🔹 Sinon, français : on applique la logique existante
  const league = match.league.name.includes("Friendlies")
    ? "Amicaux"
    : match.league.id === 6
    ? "Coupe d'Afrique des Nations"
    : match.league.name;

  let round = match.league.round;

  if (round.includes("Qualifying Round")) round = "Match de Qualification";

  else if (round.includes("Friendlies")) round = "Match Amical";
  else if (round === "Knockout Round Play-offs" || round === "Play-offs") round = "Barrages";
  else if (round === "Extra Preliminary Round") round = "Tour Préliminaire";
  else if (["Regular Season - 1", "League Stage - 1", "Group Stage - 1"].includes(round)) round = "1ere Journée";
  else if (round === "Round of 16") round = "8eme de finale";
  else if (round === "Quarter-finals") round = "Quart de finale";
  else if (round === "Semi-finals") round = "Demi Finale";
  else if (round === "Final") round = "Finale";
  else if (round === "3rd place" || round === "3rd Place Final") round = "Match 3eme place";
  else if (round === "Relegation Round") round = "Barrage";
  else if (["8th Finals", "1/32-finals", "Round of 64"].includes(round)) round = "32e de Finale";
  else if (round === "1/128-finals") round = "128e de Finale";
  else if (round === "1/64-finals") round = "64e de Finale";
  else if (round === "4th Finals") round = "Quart de Finale";
  else if (round === "1") round = "1ere Journée";
  else round = `${roundd}ème Journée`; // fallback

  return `${round}`;
}
  

  return (
        <View style={styles.container}>
            
            {match.league.id === 2 || match.league.id === 61 || match.league.id === 39 || match.league.id === 140 || match.league.id === 78 || match.league.id === 135 || match.league.id === 6 ?
                <ImageBackground source={backgroundSource} style={[styles.afficheUcl, isMediumScreen && {height: 260}]} imageStyle={{ borderRadius: 16, filter: match.league.id === 61 || match.league.id === 135 ? "brightness(0.5)" : match.league.id === 39 ? "brightness(0.4)" : match.league.id === 140 || match.league. id === 6 ? "brightness(0.32)" : match.league.id === 78 ? "brightness(0.45)" : "brightness(0.9)" }}>
                   
                    <TouchableOpacity accessible accessibilityLabel={`logo de ${match.teams.home.name}`} accessibilityHint={`naviguer vers la fiche complète de ${match.teams.home.name}`} style={styles.domicile} onPress={() => navigation.navigate("FicheEquipe", { id: match.teams.home.id, league: match.league.id, img: match.teams.home.logo })}>
                        <Image source={{ uri: match.teams.home.logo }} style={[styles.teamLogo, isMediumScreen && { height: 100, width: 100}, match.teams.home.id === 81 ? { shadowRadius: 0.3 } : null]} />
                        <Text style={[{ fontFamily: 'Bella', color: 'white', fontSize: 16, textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{teamName[match.teams.home.name] || match.teams.home.name}</Text>
                        {placeDom.length <= 0 || placeExt.length <= 0 ? null : <Text style={{color: "white", fontSize: 10, fontFamily: "Kanitus"}}>{`(${placeDom[0]?.rank}${placeDom[0]?.rank === 1 ? "er" : "e"})`}</Text>}
                        <View style={{ gap: 5, flexDirection: "row", marginTop: 5 }}>{formeHome?.split('').map((char, index) => (
                            char === 'L' ? (
                                <View style={styles.defaite} >
                                    <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("d")}</Text>
                                </View>
                            ) :
                                char === 'W' ? (
                                    <View style={styles.victoire}  >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("v")}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.nul} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("n")}</Text>
                                    </View>
                                )
                        ))}</View>
                    </TouchableOpacity>

                    <View style={styles.score}>
                        <Image source={match.league.id === 61 ? ligue1 : match.league.id === 2 ? ucl : match.league.id === 15 ? fifaclubwc : match.league.id === 62 ? ligue2 : match.league.id === 32 ? cdm2026 : { uri: match.league.logo }} style={[{ height: 40, width: 40, objectFit: "contain", marginBlock: 1 }, isMediumScreen && {height: 60, width: 60}]} />

                        <Text style={[styles.scoreText, isMediumScreen && {fontSize: 32}]}>
                            {match.goals.home} - {match.goals.away}
                        </Text>
                        {match.fixture.status.elapsed > 0 && match.fixture.status.long != "Match Finished" ? 
                        match.fixture.status.long === "Halftime" ? <Text style={{color: "white", fontFamily: "Kanitalic", fontSize: 10, backgroundColor: "darkred", padding: 2, borderRadius: 4}}>Mi-Temps</Text> :
                        <View style={styles.liveSticker}>
                                        <Text style={styles.liveText}>{match.fixture.status.elapsed}'{match.fixture.status.extra > 0 ? `+${match.fixture.status.extra}` : null}</Text>
                                        <Animated.Text style={{ color: "white", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
                                      </View> : match.fixture.status.long === "Match Finished" ? <View style={[styles.liveSticker, {width: 105}]}>
                                        <Text style={styles.liveText}>{t("fini")}</Text></View> : null}
                    </View>

                    <TouchableOpacity accessible accessibilityLabel={`logo de ${match.teams.away.name}`} accessibilityHint={`naviguer vers la fiche complète de ${match.teams.away.name}`} style={styles.exterieur} onPress={() => navigation.navigate("FicheEquipe", { id: match.teams.away.id, league: match.league.id, img: match.teams.away.logo })}>
                        <Image source={{ uri: match.teams.away.logo }} style={[styles.teamLogo, isMediumScreen && { height: 100, width: 100}, match.teams.away.id === 81 ? { shadowRadius: 0.3 } : null]} />
                        <Text style={[{ fontFamily: 'Bella', color: 'white', fontSize: 16, textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{teamName[match.teams.away.name] || match.teams.away.name}</Text>
                        {placeExt.length <= 0 || placeDom.length <= 0 ? null : <Text style={{color: "white", fontSize: 10, fontFamily: "Kanitus"}}>{`(${placeExt[0]?.rank}${placeExt[0]?.rank === 1 ? "er" : "e"})`}</Text>}
                        <View style={{ gap: 5, flexDirection: "row", marginTop: 5 }}>{formeExt?.split('').map((char, index) => (
                            char === 'L' ? (
                                <View style={styles.defaite} >
                                    <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("d")}</Text>
                                </View>
                            ) :
                                char === 'W' ? (
                                    <View style={styles.victoire} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("v")}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.nul} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("n")}</Text>
                                    </View>
                                )
                        ))}</View>
                    </TouchableOpacity>
                </ImageBackground>
                :

                <LinearGradient colors={match.league.id === 531 || match.league.id === 526  ? ['rgb(0, 0, 0)', 'rgba(80, 80, 80, 0.7)'] : match.league.id === 15 || match.league.id === 1168 || match.league.id === 556  ? ['rgb(80, 80, 80)', 'rgba(0, 0, 0, 0.9)'] :  match.league.id === 1 ? ['rgb(156, 127, 30)', 'rgba(0, 0, 0, 0.9)'] : [
        'rgba(153, 190, 215, 1)',
        'rgba(42, 109, 164, 0.9)',
        'rgba(30, 30, 30, 0.85)'
      ]}  style={styles.affiche}>
                    <TouchableOpacity accessible accessibilityLabel={`logo de ${match.teams.home.name}`} accessibilityHint={`naviguer vers la fiche complète de ${match.teams.home.name}`} style={styles.domicile} onPress={() => navigation.navigate("FicheEquipe", { id: match.teams.home.id, league: match.league.id, img: match.teams.home.logo })}>
                        <Image source={{ uri: match.teams.home.logo }} style={match.teams.home.id === 81 ? styles.marseille : styles.teamLogo} />
                        <Text style={{ fontFamily: 'Bella', color: 'white', fontSize: 16, textAlign: "center" }}>{teamName[match.teams.home.name] || match.teams.home.name}</Text>
                        <View style={{ gap: 5, flexDirection: "row", marginTop: 5 }}>{formeHome?.split('').map((char, index) => (
                            char === 'L' ? (
                                <View style={styles.defaite}>
                                    <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("d")}</Text>
                                </View>
                            ) :
                                char === 'W' ? (
                                    <View style={styles.victoire} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("v")}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.nul}>
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("n")}</Text>
                                    </View>
                                )
                        ))}</View>
                    </TouchableOpacity>

                    <View style={styles.score}>
                        <Image source={match.league.id === 61 ? ligue1 : match.league.id === 2 ? ucl : match.league.id === 15 ? fifaclubwc : match.league.id === 62 ? ligue2 : match.league.id === 1 ? cdm2026 : { uri: match.league.logo }} style={{ height: 40, width: 40, objectFit: "contain", marginBlock: 1 }} />

                        <Text style={styles.scoreText}>
                            {match.goals.home} - {match.goals.away}
                        </Text>
                        {match.fixture.status.elapsed > 0 && match.fixture.status.long != "Match Finished" ? 
                        match.fixture.status.long === "Halftime" ? <Text style={{color: "white", fontFamily: "Kanitalic", fontSize: 10, backgroundColor: "darkred", padding: 2, borderRadius: 4}}>Mi-Temps</Text> :
                        <View style={styles.liveSticker}>
                                        <Text style={styles.liveText}>{match.fixture.status.elapsed}'{match.fixture.status.extra > 0 ? `+${match.fixture.status.extra}` : null}</Text>
                                        <Animated.Text style={{ color: "white", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
                                      </View> : match.fixture.status.long === "Match Finished" ? <View style={[styles.liveSticker, {width: 105}]}>
                                        <Text style={styles.liveText}>{t("fini")}</Text></View> : null}
                    </View>

                    <TouchableOpacity accessible accessibilityLabel={`logo de ${match.teams.away.name}`} accessibilityHint={`naviguer vers la fiche complète de ${match.teams.away.name}`} style={styles.exterieur} onPress={() => navigation.navigate("FicheEquipe", { id: match.teams.away.id, league: match.league.id, img: match.teams.away.logo })}>
                        <Image source={{ uri: match.teams.away.logo }} style={match.teams.away.id === 81 ? styles.marseille : styles.teamLogo} />
                        <Text style={{ fontFamily: 'Bella', color: 'white', fontSize: 16, textAlign: "center" }}>{teamName[match.teams.away.name] || match.teams.away.name}</Text>
                        <View style={{ gap: 5, flexDirection: "row" }}>{formeExt?.split('').map((char, index) => (
                            char === 'L' ? (
                                <View style={styles.defaite}>
                                    <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("d")}</Text>
                                </View>
                            ) :
                                char === 'W' ? (
                                    <View style={styles.victoire} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("v")}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.nul}>
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>{t("n")}</Text>
                                    </View>
                                )
                        ))}</View>
                    </TouchableOpacity>
                </LinearGradient>}

<View style={{marginTop: 5, marginBottom: 15, flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{ gap: 4, width: "50%"}}>
                    <View style={styles.badge}>
                        <SvgUri uri={flags[match.league.name]} width={22} height={20} />
<Text style={styles.badgeText}>{match.league.name}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Image source={round} style={styles.icone} />
<Text style={styles.badgeText}>{getRoundLabel(match)}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Image source={calendrier} style={styles.icone} />
<Text style={styles.badgeText}>{formattedDate}</Text>
                    </View>
                    <View style={styles.badge}>
                        <Image source={heure} style={styles.icone} />
<Text style={styles.badgeText}>{formattedHour}</Text>
                    </View>
                    
    </View>
    <View style={{gap: 4, width: "50%"}}>
    {match.fixture.venue.name === null ? null :
    <View style={{gap: 4}}>
                <View style={[styles.badge, {alignSelf: "flex-end", flexDirection: "row-reverse"}]}>
                    <Image source={stade} style={styles.icone} />
                    <Text style={styles.badgeText}>{match.fixture.venue.name === "Estadio Santiago Bernabéu" ? "Santiago Bernabeu" : match.fixture.venue.name}</Text>
                    </View>
                    <View style={[styles.badge, {alignSelf: "flex-end", flexDirection: "row-reverse"}]}>
                    <Image source={loc} style={styles.icone} />
                    <Text style={styles.badgeText}>{match.fixture.venue.city}</Text>
                    </View>
                </View>
}
{match.league.id === 1 || match.league.id === 1168  || match.league.id === 48 || match.league.id === 143 || match.league.id === 307 || match.league.id === 61 || match.league.id === 62 || match.league.id === 135 || match.league.id === 2 || match.league.id === 140 || match.league.id === 78 || match.league.id === 39 || match.league.id === 15 || match.league.id === 5 || match.league.id === 6
 ? 
 <View style={[styles.badge, {alignSelf: "flex-end", flexDirection: "row-reverse"}]}>
    <Image source={tv} style={styles.icone}/>
    <Image source={ match.league.id === 61 ? ligue1plus : match.league.id === 135 || match.league.id === 15 || match.league.id === 140 ? dazn : match.league.id === 2 || match.league.id === 39 || match.league.id === 307 ? canal :  match.league.id === 62 || match.league.id === 78 || match.league.id === 1168 || match.league.id === 48 || match.league.id === 6 || match.league.id === 1 ? bein : match.league.id === 5 ? tf1 : match.league.id === 143 ? lequipe : null} style={match.league.id === 61 ? {height: 22, width: 40, objectFit: "contain", marginLeft: 2}:  match.league.id === 6 || match.league.id === 48 || match.league.id === 1 || match.league.id === 78  || match.league.id === 1168  ? {height: 22, width: 65, objectFit: "contain", marginLeft: 5} : match.league.id === 39 || match.league.id === 2 || match.league.id === 143 ? {height: 22, width: 50, objectFit: "contain", marginLeft: 2} : match.league.id === 140 ? {height: 22, width: 25, marginLeft: 4} : {height: 22, width: 40, objectFit: "contain", marginLeft: 2} }/>{match.teams.home.id === 2 || match.teams.away.id === 2  ? <View style={{flexDirection: "row", alignItems: "center"}}><Text style={{fontFamily: "Kanitus"}}> et</Text><Image source={m6} style={{height: 22, objectFit: "contain", width: 35}} /></View> : match.league.id === 140 ? <View style={{flexDirection: "row", alignItems: "center"}}><Text style={{fontFamily: "Kanitus"}}> et</Text><Image source={disney} style={{height: 22, objectFit: "contain", width: 45, marginLeft: 4}} /></View> : match.fixture.id === 1399365 ? <View style={{flexDirection: "row", alignItems: "center"}}><Text style={{fontFamily: "Kanitus"}}>et</Text><Image source={tf1} style={{height: 22, objectFit: "contain", width: 40, marginLeft: 8}} /></View> : null}
    </View> : null}
    {match.fixture.referee === null ? null : 
                <View style={[styles.badge, {alignSelf: "flex-end",  flexDirection: "row-reverse"}]}>
                    <Image source={arbitre} style={styles.icone} />
                    <Text style={styles.badgeText}>{match.fixture.referee}</Text>
                </View>
                }
                </View>
                </View>
                

            <View style={styles.buts}>
{/*
                <View style={styles.equipeDomicile}>
                                        {match.events.map((evenement) => evenement.detail === "Red Card" ? evenement.team.id === match.teams.home.id ? <View style={{flexDirection: "row", alignItems: "center"}}><Image source={red} style={{height: 22, width: 22, objectFit: "contain"}} /><Text style={styles.text}>{evenement.player.name}, </Text><Text style={{fontFamily: "Kanitalik", fontSize: 11.5}}>{evenement.time.elapsed}'{evenement.time.extra ? `+ ${evenement.time.extra}` : null}</Text></View> : null : null)}
                    <FlatList
                        data={buteurHome}
                        keyExtractor={(item) => `buteur:${item.player.name}`}
                        renderItem={({ item }) => (
                            <View style={styles.buteurItem}>
                                <Text style={styles.text}><Text style={styles.goalIcon}>⚽</Text> {item.player.name === "R. Lewandowski" ? "Lewandowski" : item.player.name}, <Text style={{fontFamily: "Kanitalik"}}>{item.time.elapsed}'{item.time.extra ? `+ ${item.time.extra}` : null}</Text> {item.detail === "Own Goal" ? <Text style={styles.csc}>(csc)</Text> : null} {item.detail === "Penalty" ? <Text style={styles.penalty}>(pen)</Text> : null}</Text>
                            </View>
                        )}
                    />
                </View>
*/}
<View style={styles.equipeDomicile}>
    {match.events.map((evenement) => evenement.detail === "Red Card" || evenement.type === "Goal" && evenement.detail != "Missed Penalty" ? evenement.team.id === match.teams.home.id ? 
    <TouchableOpacity accessible accessibilityLabel={`Afficher la fiche complète de ${evenement.player.name}`} accessibilityHint={evenement.detail === "Red Card" ? `carton rouge pour ${evenement.player.name} à la ${evenement.time.elapsed}ème minute` : `but de ${evenement.player.name} à la ${evenement.time.elapsed}ème minute`} onPress={() => navigation.navigate("FicheJoueur", { id: evenement.player.id, team: evenement.team.id })} style={{flexDirection: "row", alignItems: "center"}}>
        {evenement.detail === "Red Card" ? <View style={{flexDirection: "row", alignItems: "center"}}><Image source={red} style={{height: 22, width: 22, objectFit: "contain"}} /><Text style={[styles.text, {fontSize: isMediumScreen ? 14 : 11.5}]}>{evenement.player.name}, </Text><Text style={{fontFamily: "Kanitalik", fontSize: isMediumScreen ? 14 : 11.5}}>{evenement.time.elapsed}'{evenement.time.extra ? `+ ${evenement.time.extra}`:null}</Text></View> : null}
        :
        {evenement.type === "Goal" && evenement.detail != "Missed Penalty" && evenement.comments != "Penalty Shootout" ? <View style={{alignItems: "center"}}><Text style={styles.text}><Text style={styles.goalIcon}>⚽</Text> <Text style={{fontSize: isMediumScreen ? 14 : 11.5}}> {buteursNames[evenement.player.id] || evenement.player.name}, </Text> <Text style={{fontFamily: "Kanitalik", fontSize: isMediumScreen ? 14 : 11.5}}>{evenement.time.elapsed}'{evenement.time.extra  ? `+ ${evenement.time.extra}` : null}</Text> {evenement.detail === "Own Goal" ? <Text style={styles.csc}>(csc)</Text> : null} {evenement.detail === "Penalty" ? <Text style={styles.penalty}>(pen)</Text> : null}</Text></View> : null}
    </TouchableOpacity> : null : null)}

</View>

<View style={styles.equipeExt}>
    {match.events.map((evenement) => evenement.detail === "Red Card" || evenement.type === "Goal" && evenement.detail != "Missed Penalty" ? evenement.team.id === match.teams.away.id ? 
    <TouchableOpacity accessible accessibilityLabel={`Afficher la fiche complète de ${evenement.player.name}`} accessibilityHint={evenement.detail === "Red Card" ? `carton rouge pour ${evenement.player.name} à la ${evenement.time.elapsed}ème minute` : `but de ${evenement.player.name} à la ${evenement.time.elapsed}ème minute`} onPress={() => navigation.navigate("FicheJoueur", { id: evenement.player.id, team: evenement.team.id })} style={{flexDirection: "row", alignItems: "start", justifyContent: "flex-end"}}>
        {evenement.detail === "Red Card" ? <View style={{flexDirection: "row", alignItems: "center"}}><Text style={[styles.text, {fontSize: isMediumScreen ? 14 : 11.5}]}>{evenement.player.name}, </Text><Text style={{fontFamily: "Kanitalik", fontSize: isMediumScreen ? 14 : 11.5}}>{evenement.time.elapsed}'{evenement.time.extra ? `+ ${evenement.time.extra}` : null}</Text><Image source={red} style={{height: 22, width: 22, objectFit: "contain"}} /></View> : null}
        :
        {evenement.type === "Goal" && evenement.detail != "Missed Penalty" && evenement.comments != "Penalty Shootout" ? <View><Text style={styles.text}> <Text style={{fontSize: isMediumScreen ? 14 : 11.5}}> {buteursNames[evenement.player.id] || evenement.player.name}, </Text>{evenement.detail === "Own Goal" ? <Text style={styles.csc}>(csc)</Text> : null} {evenement.detail === "Penalty" ? <Text style={styles.penalty}>(pen) </Text> : null} <Text style={{fontFamily: "Kanitalik", fontSize: isMediumScreen ? 14 : 11.5}}>{evenement.time.elapsed}'{evenement.time.extra ? `+ ${evenement.time.extra}` : null}</Text> <Text style={styles.goalIcon}>⚽</Text></Text></View> : null}
    </TouchableOpacity> : null : null)}

</View>


            </View>
            {match.fixture.status.short === "PEN" ?
                <View style={{ width: "85%", justifyContent: "center", alignItems: "center", marginBlock: 20 }}>
                    <Text style={{ fontFamily: "Kanito", color: "red" }}>Tirs au But</Text>
                    <View style={{ backgroundColor: "darkgrey", width: "100%", flexDirection: "row", borderRadius: 5, padding: 4 }}>
                        <View style={{ width: "50%" }}>
                            <FlatList data={buteurHomeP} renderItem={({ item }) => (<View style={{ flexDirection: "row", gap: 3, margin: 3, alignItems: "center" }}>{item.detail === "Missed Penalty" ? <Text>❌</Text>  : <Text style={styles.goalIcon}>⚽</Text>} <Text style={{ fontFamily: "Kanito" }}> {item.player.name} </Text></View>)} />
                        </View>
                        <View style={{ width: "50%" }}>
                            <FlatList data={buteurExtP} renderItem={({ item }) => (<View style={{ flexDirection: "row", gap: 3, margin: 3, alignItems: "center", justifyContent: "flex-end" }}> <Text style={{ fontFamily: "Kanito" }}> {item.player.name} </Text> {item.detail === "Missed Penalty" ? <Text>❌</Text> : <Text style={styles.goalIcon}>⚽</Text>}</View>)} />
                        </View>
                    </View>

                </View> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        paddingBlock: 10,
        paddingInline: 10,
        alignItems: "center",
        width: "100%"
    },
    ligue: {
        marginBottom: 5,
        borderBottomWidth:  1,
        borderBottomColor: "black",
    },
    datelieu: {
        alignItems: 'center',
        gap: 5,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
          marginBlock: 3,
           padding: 12,
            width: "100%"

    },
    icone: {
        height: 20,
        width: 20,
        objectFit: "contain"
    },
    afficheUcl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        padding: 15,
        borderRadius: 16,
        height: 170,
    },
    affiche: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        width: '100%',
        padding: 15,
        borderRadius: 16
    },
    domicile: {
        alignItems: 'center',
        width: "39%"
    },
    score: {
        alignItems: 'center',
        width: "22%"
    },
    exterieur: {
        alignItems: 'center',
        width: "39%"
    },
    teamLogo: {
        width: 78,
        height: 78,
        resizeMode: 'contain',
        shadowColor: '#fff', // shadow color
        shadowOffset: { width: 0, height: 0 }, // shadow offset
        shadowOpacity: 0.8, // shadow opacity
        shadowRadius: 4,
        padding: 9
    },
    marseille: {
        width: 78,
        height: 78,
        resizeMode: 'contain',
        shadowColor: '#fff', // shadow color
        shadowOffset: { width: 0, height: 0 }, // shadow offset
        shadowOpacity: 1, // shadow opacity
        shadowRadius: 0.5,
        padding: 9
    },
    textEntete: {
fontFamily: "Kanito",
        fontSize: 12,
        color: "white",
        textAlign: "center"
    },
    text: {
        fontFamily: "Kanito",
        fontSize: 12,
    },
    scoreText: {
        fontSize: 26,
        color: "white",
        fontFamily: "Kanitt"
    },
    buts: {
        width: '100%',
        flexDirection: "row"
    },
    equipeDomicile: {
        marginBottom: 10,
        width: "50%",


    },
    equipeExt: {
        marginBottom: 10,
        width: "50%"
    },
    buteurItem: {
        flexDirection: 'row',
        marginVertical: 2,
    },
    buteurExtItem: {
        flexDirection: "row-reverse"
    },
    goalIcon: {
        fontSize: 14,
    },
    csc: {
        fontFamily: "Kanitus",
        color: 'red',
    },
    penalty: {
        fontFamily: "Kanitalic"
    },

    victoire: {
        backgroundColor: "green",
        paddingBlock: 2,
        paddingInline: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    defaite: {
        backgroundColor: "red",
        paddingBlock: 2,
        paddingInline: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    nul: {
        backgroundColor: "grey",
        paddingBlock: 2,
        paddingInline: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    liveSticker: {
        alignItems: "center",
        marginInline: 5
      },
      liveText: {
        color: "white",
        fontFamily: "Kanitalic",
        fontSize: 12,
        backgroundColor: "darkred",
        paddingInline: 4,
        borderRadius: 5,
        textAlign: "center"
      },
      badge: {
  backgroundColor: "#69869074",
  borderRadius: 12,
  paddingVertical: 8,
  paddingHorizontal: 12,
  alignSelf: "flex-start",
  alignItems: "center",
  flexDirection: "row",
  gap: 6,
  borderWidth: 1,
  borderColor: "#24234525"
},

badgeText: {
  fontFamily: "Kanito",
  color: "#000",
  fontSize: 12,
},
});

export default Affiche;