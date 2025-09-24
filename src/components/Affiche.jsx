import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Animated, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import ligue1 from "../assets/logoligue1.webp"
import ligue2 from "../assets/ligue2.jpg"
import cdm2026 from "../assets/cdm2026.png"
import ucl from "../assets/logoucl.png"
import stade from "../assets/stadewhite.png"
import calendrier from "../assets/datewhite.png"
import heure from "../assets/heurewhite.png"
import loc from "../assets/locwhite.png"
import ucl2 from "../assets/UCL2.jpg"
import grass from "../assets/grass.jpg"
import pl from "../assets/PL.jpg"
import liga from "../assets/liga.webp"
import bundesliga from "../assets/bundesliga.webp"
import arbitre from "../assets/arbitre.png"
import ligue1plus from "../assets/logos/ligue1plus.webp"
import canal from "../assets/logos/canal.png"
import bein from "../assets/logos/bein.png"
import m6 from "../assets/logos/m6.png"
import tf1 from "../assets/logos/tf1.png"
import dazn from "../assets/logos/dazn.png"
import fifaclubwc from "../assets/fifaclubwc2.png"
import red from "../assets/redcard.png"






const Affiche = ({ match, roundd, buteurHome, buteurExt, buteurHomeP, buteurExtP, formeHome, formeExt, onPress }) => {

     const { width } = useWindowDimensions();
      
          const isMediumScreen = width <= 1024 && width > 767;
    
    const navigation = useNavigation()
    const date = new Date(match.fixture.date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    const formattedHour = `${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;

    const [forme, setForme] = useState(0)

      const [fadeAnim] = useState(new Animated.Value(1)); // Animation de fade (opacité)

      const teamName = {
  "Germany": "Allemagne",
  "Spain": "Espagne",
  "Paris Saint Germain": "Paris St Germain",
  "Barcelona" : "FC Barcelone",
  "England" : "Angleterre",
  "Wales" : "Pays de Galles",
  "Netherlands" : "Pays Bas",
  "Belgium" : "Belgique",
  "Switzerland" : "Suisse",
  "Scotland" : "Ecosse",
  "Italy" : "Italie",
  "Sweden" : "Suede",
  "Austria" : "Autriche",
  "Belarus" : "Bielorussie",
  "Morocco" : "Maroc",
      "Ivory Coast" : "Cote d'Ivoire",
      "Algeria" : "Algerie",
  "Moldova" : "Moldavie",
  "Cyprus" : "Chypre",
  "Norway" : "Norvege",
  "Hungary" : "Hongrie"
};
    
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
  
  return (
        <View style={styles.container}>
            
            <LinearGradient colors={ [ 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', '#f0f0f0']} locations={[0, 0.85, 1]} style={styles.datelieu}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Image source={calendrier} style={styles.icone} />
                    <Text style={styles.textEntete}>{formattedDate} - {formattedHour}</Text>
                    <Image source={heure} style={styles.icone} />
                </View>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <Image source={stade} style={styles.icone} />
                    <Text style={styles.textEntete}>{match.fixture.venue.name === "Estadio Santiago Bernabéu" ? "Santiago Bernabeu" : match.fixture.venue.name} , {match.fixture.venue.city}</Text>
                    <Image source={loc} style={styles.icone} />
                </View>
                {match.fixture.referee === null ? null : 
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <Image source={arbitre} style={[styles.icone, {backgroundColor: "white", borderRadius: 50}]} />
                    <Text style={styles.textEntete}>{match.fixture.referee}</Text>
                </View>
                }
                </LinearGradient>
            {match.league.id === 2 || match.league.id === 61 || match.league.id === 39 || match.league.id === 140 || match.league.id === 78 ?
                <ImageBackground source={match.league.id === 2 ? ucl2 : match.league.id === 61 ? grass : match.league.id === 39 ? pl : match.league.id === 78 ? bundesliga : liga} style={[styles.afficheUcl, isMediumScreen && {height: 260}]} imageStyle={{ borderRadius: 15, filter: match.league.id === 61 ? "brightness(0.5)" : match.league.id === 39 ? "brightness(0.4)" : match.league.id === 140 ? "brightness(0.32)" : match.league.id === 78 ? "brightness(0.45)" : "brightness(0.9)" }}>
                   
                    <TouchableOpacity style={styles.domicile} onPress={() => navigation.navigate("FicheEquipe", { id: match.teams.home.id, league: match.league.id, img: match.teams.home.logo })}>
                        <Image source={{ uri: match.teams.home.logo }} style={[styles.teamLogo, isMediumScreen && { height: 100, width: 100}, match.teams.home.id === 81 ? { shadowRadius: 0.3 } : null]} />
                        <Text style={[{ fontFamily: 'Kanito', color: 'white', fontSize: 14, textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{teamName[match.teams.home.name] || match.teams.home.name}</Text>
                        <View style={{ gap: 5, flexDirection: "row", marginTop: 5 }}>{formeHome?.split('').map((char, index) => (
                            char === 'L' ? (
                                <View style={styles.defaite} >
                                    <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>D</Text>
                                </View>
                            ) :
                                char === 'W' ? (
                                    <View style={styles.victoire}  >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>V</Text>
                                    </View>
                                ) : (
                                    <View style={styles.nul} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>N</Text>
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
                                        <Text style={styles.liveText}>{match.fixture.status.elapsed}'</Text>
                                        <Animated.Text style={{ color: "white", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
                                      </View> : null}
                    </View>

                    <TouchableOpacity style={styles.exterieur} onPress={() => navigation.navigate("FicheEquipe", { id: match.teams.away.id, league: match.league.id, img: match.teams.away.logo })}>
                        <Image source={{ uri: match.teams.away.logo }} style={[styles.teamLogo, isMediumScreen && { height: 100, width: 100}, match.teams.away.id === 81 ? { shadowRadius: 0.3 } : null]} />
                        <Text style={[{ fontFamily: 'Kanito', color: 'white', fontSize: 14, textAlign: "center" }, isMediumScreen && {fontSize: 18}]}>{teamName[match.teams.away.name] || match.teams.away.name}</Text>
                        <View style={{ gap: 5, flexDirection: "row", marginTop: 5 }}>{formeExt?.split('').map((char, index) => (
                            char === 'L' ? (
                                <View style={styles.defaite} >
                                    <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>D</Text>
                                </View>
                            ) :
                                char === 'W' ? (
                                    <View style={styles.victoire} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>V</Text>
                                    </View>
                                ) : (
                                    <View style={styles.nul} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>N</Text>
                                    </View>
                                )
                        ))}</View>
                    </TouchableOpacity>
                </ImageBackground>
                :

                <LinearGradient colors={match.league.id === 531 ? ['rgb(0, 0, 0)', 'rgba(80, 80, 80, 0.7)'] : match.league.id === 15 ? ['rgb(80, 80, 80)', 'rgba(0, 0, 0, 0.8)'] : [
        'rgba(153, 190, 215, 1)',
        'rgba(70, 120, 160, 0.9)',
        'rgba(30, 30, 30, 0.85)'
      ]}  style={styles.affiche}>
                    <TouchableOpacity style={styles.domicile} onPress={() => navigation.navigate("FicheEquipe", { id: match.teams.home.id, league: match.league.id, img: match.teams.home.logo })}>
                        <Image source={{ uri: match.teams.home.logo }} style={styles.teamLogo} />
                        <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 14, textAlign: "center" }}>{teamName[match.teams.home.name] || match.teams.home.name}</Text>
                        <View style={{ gap: 5, flexDirection: "row", marginTop: 5 }}>{formeHome?.split('').map((char, index) => (
                            char === 'L' ? (
                                <View style={styles.defaite}>
                                    <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>D</Text>
                                </View>
                            ) :
                                char === 'W' ? (
                                    <View style={styles.victoire} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>V</Text>
                                    </View>
                                ) : (
                                    <View style={styles.nul}>
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>N</Text>
                                    </View>
                                )
                        ))}</View>
                    </TouchableOpacity>

                    <View style={styles.score}>
                        <Image source={match.league.id === 61 ? ligue1 : match.league.id === 2 ? ucl : match.league.id === 15 ? fifaclubwc : match.league.id === 62 ? ligue2 : match.league.id === 32 ? cdm2026 : { uri: match.league.logo }} style={{ height: 40, width: 40, objectFit: "contain", marginBlock: 1 }} />

                        <Text style={styles.scoreText}>
                            {match.goals.home} - {match.goals.away}
                        </Text>
                        {match.fixture.status.elapsed > 0 && match.fixture.status.long != "Match Finished" ? 
                        match.fixture.status.long === "Halftime" ? <Text style={{color: "white", fontFamily: "Kanitalic", fontSize: 10, backgroundColor: "darkred", padding: 2, borderRadius: 4}}>Mi-Temps</Text> :
                        <View style={styles.liveSticker}>
                                        <Text style={styles.liveText}>{match.fixture.status.elapsed}'</Text>
                                        <Animated.Text style={{ color: "white", fontFamily: "Kanitalic", fontSize: 10, opacity: fadeAnim }}>live</Animated.Text>
                                      </View> : null}
                    </View>

                    <TouchableOpacity style={styles.exterieur} onPress={() => navigation.navigate("FicheEquipe", { id: match.teams.away.id, league: match.league.id, img: match.teams.away.logo })}>
                        <Image source={{ uri: match.teams.away.logo }} style={match.teams.away.id === 81 ? styles.marseille : styles.teamLogo} />
                        <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 14, textAlign: "center" }}>{teamName[match.teams.away.name] || match.teams.away.name}</Text>
                        <View style={{ gap: 5, flexDirection: "row" }}>{formeExt?.split('').map((char, index) => (
                            char === 'L' ? (
                                <View style={styles.defaite}>
                                    <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>D</Text>
                                </View>
                            ) :
                                char === 'W' ? (
                                    <View style={styles.victoire} >
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>V</Text>
                                    </View>
                                ) : (
                                    <View style={styles.nul}>
                                        <Text key={index} style={{ color: "white", fontFamily: "Kanito" }}>N</Text>
                                    </View>
                                )
                        ))}</View>
                    </TouchableOpacity>
                </LinearGradient>}
                <View style={styles.ligue}>
                <Text style={{ fontFamily: "Kanitt", textAlign: "center" }}>{match.league.name.indexOf("Friendlies") != -1 ? match.league.name.replace("Friendlies", "Amicaux") : match.league.name} - {match.league.round.indexOf("Qualifying Round") != -1 ? "Match de Qualification" : match.league.round === "Knockout Round Play-offs" || match.league.round === "Play-offs" ? "Barrages" : match.league.round === "Extra Preliminary Round" ? "Tour Preliminaire" : match.league.round === "Regular Season - 1" || match.league.round === "League Stage - 1" ? "1ere Journee" : match.league.round === "Round of 16" ? "8eme de finale" : match.league.round === "Quarter-finals" ? "Quart de finale" : match.league.round === "Semi-finals" ? "Demi Finale" : match.league.round === "Final" ? "Finale" : match.league.round === "Relegation Round" ? "Barrage" : match.league.round === "3rd Place Final" ? "Match 3eme place" : match.league.round === "8th Finals" ? "8eme de Finale" : match.league.round === "4th Finals" ? "Quart de Finale" : `${roundd}eme Journee`}</Text>
            </View>
{match.league.id === 307 || match.league.id === 61 || match.league.id === 62 || match.league.id === 135 || match.league.id === 2 || match.league.id === 140 || match.league.id === 78 || match.league.id === 39 || match.league.id === 15 || match.league.id === 5 ? <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}><Text style={{fontFamily: "Kanitu"}}>Match diffusé sur</Text><Image source={match.league.id === 61 ? ligue1plus : match.league.id === 135 || match.league.id === 15 ? dazn : match.league.id === 2 || match.league.id === 39 || match.league.id === 307 ? canal : match.league.id === 140 || match.league.id === 62 || match.league.id === 78 ? bein : match.league.id === 5 ? tf1 : null} style={match.league.id === 61 ? {height: 25, width: 40, objectFit: "contain", marginLeft: 2}: match.league.id === 140  ? {height: 25, width: 65, objectFit: "contain", marginLeft: 5} : match.league.id === 39 || match.league.id === 2 ? {height: 25, width: 50, objectFit: "contain", marginLeft: 2} : {height: 25, width: 40, objectFit: "contain", marginLeft: 2} }/>{match.fixture.id === 1374812 ? <View style={{flexDirection: "row", alignItems: "center"}}><Text style={{fontFamily: "Kanitu"}}>et</Text><Image source={m6} style={{height: 20, objectFit: "contain", width: 40}} /></View> : match.fixture.id === 1399365 ? <View style={{flexDirection: "row", alignItems: "center"}}><Text style={{fontFamily: "Kanitu"}}>et</Text><Image source={tf1} style={{height: 20, objectFit: "contain", width: 40, marginLeft: 8}} /></View> : null}</View> : null}
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
    <TouchableOpacity onPress={() => navigation.navigate("FicheJoueur", { id: evenement.player.id, team: evenement.team.id })} style={{flexDirection: "row", alignItems: "center"}}>
        {evenement.detail === "Red Card" ? <View style={{flexDirection: "row", alignItems: "center"}}><Image source={red} style={{height: 22, width: 22, objectFit: "contain"}} /><Text style={[styles.text, {fontSize: isMediumScreen ? 14 : 11.5}]}>{evenement.player.name}, </Text><Text style={{fontFamily: "Kanitalik", fontSize: isMediumScreen ? 14 : 11.5}}>{evenement.time.elapsed}'{evenement.time.extra ? `+ ${evenement.time.extra}`:null}</Text></View> : null}
        :
        {evenement.type === "Goal" && evenement.detail != "Missed Penalty" && evenement.comments != "Penalty Shootout" ? <View><Text style={styles.text}><Text style={styles.goalIcon}>⚽</Text> <Text style={{fontSize: isMediumScreen ? 14 : 11.5}}> {evenement.player.name === "R. Lewandowski" ? "Lewandowski" : evenement.player.name}, </Text> <Text style={{fontFamily: "Kanitalik", fontSize: isMediumScreen ? 14 : 11.5}}>{evenement.time.elapsed}'{evenement.time.extra  ? `+ ${evenement.time.extra}` : null}</Text> {evenement.detail === "Own Goal" ? <Text style={styles.csc}>(csc)</Text> : null} {evenement.detail === "Penalty" ? <Text style={styles.penalty}>(pen)</Text> : null}</Text></View> : null}
    </TouchableOpacity> : null : null)}

</View>

<View style={styles.equipeExt}>
    {match.events.map((evenement) => evenement.detail === "Red Card" || evenement.type === "Goal" && evenement.detail != "Missed Penalty" ? evenement.team.id === match.teams.away.id ? 
    <TouchableOpacity onPress={() => navigation.navigate("FicheJoueur", { id: evenement.player.id, team: evenement.team.id })} style={{flexDirection: "row", alignItems: "start", justifyContent: "flex-end"}}>
        {evenement.detail === "Red Card" ? <View style={{flexDirection: "row", alignItems: "center"}}><Text style={[styles.text, {fontSize: isMediumScreen ? 14 : 11.5}]}>{evenement.player.name}, </Text><Text style={{fontFamily: "Kanitalik", fontSize: isMediumScreen ? 14 : 11.5}}>{evenement.time.elapsed}'{evenement.time.extra ? `+ ${evenement.time.extra}` : null}</Text><Image source={red} style={{height: 22, width: 22, objectFit: "contain"}} /></View> : null}
        :
        {evenement.type === "Goal" && evenement.detail != "Missed Penalty" && evenement.comments != "Penalty Shootout" ? <View><Text style={styles.text}> <Text style={{fontSize: isMediumScreen ? 14 : 11.5}}> {evenement.player.name === "R. Lewandowski" ? "Lewandowski" : evenement.player.name}, </Text>{evenement.detail === "Own Goal" ? <Text style={styles.csc}>(csc)</Text> : null} {evenement.detail === "Penalty" ? <Text style={styles.penalty}>(pen) </Text> : null} <Text style={{fontFamily: "Kanitalik", fontSize: isMediumScreen ? 14 : 11.5}}>{evenement.time.elapsed}'{evenement.time.extra ? `+ ${evenement.time.extra}` : null}</Text> <Text style={styles.goalIcon}>⚽</Text></Text></View> : null}
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
        paddingBlock: 5,
        paddingInline: 10,
        alignItems: 'center',
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
          marginBlock: 3,
           padding: 12,
            width: "100%"

    },
    icone: {
        height: 18,
        width: 18,
        objectFit: "contain"
    },
    afficheUcl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        padding: 15,
        borderRadius: 10,
        height: 170,
    },
    affiche: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        width: '100%',
        padding: 15,
        borderRadius: 15
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
        width: 70,
        height: 70,
        resizeMode: 'contain',
        shadowColor: '#fff', // shadow color
        shadowOffset: { width: 0, height: 0 }, // shadow offset
        shadowOpacity: 0.8, // shadow opacity
        shadowRadius: 4,
        padding: 9
    },
    marseille: {
        padding: 30
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
        fontFamily: "Kanitalic ",
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
        borderRadius: 5
      },
});

export default Affiche;