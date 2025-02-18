import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ligue1 from "../assets/logoligue1.webp"
import ucl from "../assets/logoucl.png"
import stade from "../assets/stade.png"
import calendrier from "../assets/date.png"
import heure from "../assets/heure.png"
import loc from "../assets/loc.png"
import ucl1 from "../assets/UCL1.jpg"
import ucl2 from "../assets/UCL2.jpg"
import grass from "../assets/grass.jpg"




const Affiche = ({ match, roundd, buteurHome, buteurExt, buteurHomeP, buteurExtP, formeHome, formeExt, onPress }) => {

    const navigation = useNavigation()
    const date = new Date(match.fixture.date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    const formattedHour = `${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;
   
    return (
        <View style={styles.container}>
            <View style={styles.ligue}>
               { match.league.standings === true ?  <Text style={{fontFamily: "Kanitt"}}>{match.league.name} - Journee {roundd}</Text> :  <Text style={{fontFamily: "Kanitt"}}>{match.league.name}</Text>  }
            </View>
            <View style={styles.datelieu}>
                <View style={{flexDirection: "row", gap: 5}}>
                    <Image source={calendrier} style={styles.icone} />
                <Text style={styles.text}>{formattedDate} - {formattedHour}</Text>
                    <Image source={heure} style={styles.icone} />
                </View>
                <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                    <Image source={stade} style={styles.icone}/>
                <Text style={styles.text}>{match.fixture.venue.name} , {match.fixture.venue.city}</Text>
                    <Image source={loc} style={styles.icone}/>
                </View>
            </View>
{match.league.id === 2 || match.league.id === 61 ? 
    <ImageBackground source={match.league.id === 2 ? ucl2 : grass}  style={styles.afficheUcl} imageStyle={{borderRadius: 10, filter: match.league.id === 61 ? "brightness(0.5)" : "brightness(0.9)"}}>
            <TouchableOpacity style={styles.domicile} onPress={()=> navigation.navigate("FicheEquipe", {id: match.teams.home.id, league: match.league.id, img: match.teams.home.logo})}>
          <Image source={{ uri: match.teams.home.logo }} style={styles.teamLogo} />
          <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 14 }}>{match.teams.home.name}</Text>
          <View style={{gap: 5, flexDirection: "row", marginTop: 5}}>{formeHome?.split('').map((char, index) => (
          char === 'L' ? (
            <View style={styles.defaite}>
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>D</Text>
            </View>
          ) : 
          char === 'W' ? (
            <View style={styles.victoire} >
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>V</Text>
            </View>
          ) :(
            <View style={styles.nul}>
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>N</Text>
            </View>
          )
        ))}</View>
        </TouchableOpacity>

        <View style={styles.score}>
        <Image source={ match.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? ligue1 : match.league.logo === "https://media.api-sports.io/football/leagues/2.png" ? ucl : {uri : match.league.logo}} style={{height: 40, width: 40, objectFit: "contain", marginBlock: 1}} />

          <Text style={styles.scoreText}>
            {match.goals.home} - {match.goals.away}
          </Text>
        </View>

        <TouchableOpacity style={styles.exterieur} onPress={()=> navigation.navigate("FicheEquipe", {id: match.teams.away.id, league: match.league.id, img: match.teams.away.logo})}>
          <Image source={{ uri: match.teams.away.logo }} style={styles.teamLogo} />
          <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 14 }}>{match.teams.away.name}</Text>
          <View style={{gap: 5, flexDirection: "row"}}>{formeExt?.split('').map((char, index) => (
          char === 'L' ? (
            <View style={styles.defaite}>
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>D</Text>
            </View>
          ) : 
          char === 'W' ? (
            <View style={styles.victoire} >
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>V</Text>
            </View>
          ) :(
            <View style={styles.nul}>
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>N</Text>
            </View>
          )
        ))}</View>
        </TouchableOpacity>
    </ImageBackground>
     :

            <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.8)']} style={styles.affiche}>
            <TouchableOpacity style={styles.domicile} onPress={()=> navigation.navigate("FicheEquipe", {id: match.teams.home.id, league: match.league.id, img: match.teams.home.logo})}>
          <Image source={{ uri: match.teams.home.logo }} style={styles.teamLogo} />
          <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 14 }}>{match.teams.home.name}</Text>
          <View style={{gap: 5, flexDirection: "row", marginTop: 5}}>{formeHome?.split('').map((char, index) => (
          char === 'L' ? (
            <View style={styles.defaite}>
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>D</Text>
            </View>
          ) : 
          char === 'W' ? (
            <View style={styles.victoire} >
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>V</Text>
            </View>
          ) :(
            <View style={styles.nul}>
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>N</Text>
            </View>
          )
        ))}</View>
        </TouchableOpacity>

        <View style={styles.score}>
        <Image source={ match.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? ligue1 : match.league.logo === "https://media.api-sports.io/football/leagues/2.png" ? ucl : {uri : match.league.logo}} style={{height: 40, width: 40, objectFit: "contain", marginBlock: 1}} />

          <Text style={styles.scoreText}>
            {match.goals.home} - {match.goals.away}
          </Text>
        </View>

        <TouchableOpacity style={styles.exterieur} onPress={()=> navigation.navigate("FicheEquipe", {id: match.teams.away.id, league: match.league.id, img: match.teams.away.logo})}>
          <Image source={{ uri: match.teams.away.logo }} style={styles.teamLogo} />
          <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 14 }}>{match.teams.away.name}</Text>
          <View style={{gap: 5, flexDirection: "row"}}>{formeExt?.split('').map((char, index) => (
          char === 'L' ? (
            <View style={styles.defaite}>
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>D</Text>
            </View>
          ) : 
          char === 'W' ? (
            <View style={styles.victoire} >
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>V</Text>
            </View>
          ) :(
            <View style={styles.nul}>
            <Text key={index} style={{color: "white", fontFamily: "Kanito"}}>N</Text>
            </View>
          )
        ))}</View>
        </TouchableOpacity>
    </LinearGradient>}

            <View style={styles.buts}>

                <View style={styles.equipeDomicile}>
                    <FlatList
                        data={buteurHome}
                        keyExtractor={(item) => `buteur:${item.player.name}`}
                        renderItem={({ item }) => (
                            <View style={styles.buteurItem}>
                                <Text style={styles.text}><Text style={styles.goalIcon}>⚽</Text> {item.player.name === "R. Lewandowski" ? "Lewandowski" : item.player.name}, {item.time.elapsed}' {item.time.extra ? `+ ${item.time.extra}` : null} {item.detail === "Own Goal" ? <Text style={styles.csc}>(csc)</Text> : null} {item.detail === "Penalty" ? <Text style={styles.penalty}>(pen)</Text> : null}</Text>
                            </View>
                        )}
                    />
                </View>

                <View style={styles.equipeExt}>
                    <FlatList
                        data={buteurExt}
                        keyExtractor={(item) => `buteurExt:${item.player.name}`}
                        renderItem={({ item }) => (
                            <View style={styles.buteurExtItem}>
                                <Text style={styles.text}> {item.player.name === "R. Lewandowski" ? "Lewandowski" : item.player.name}, {item.time.elapsed}' {item.time.extra ? `+ ${item.time.extra}` : null} {item.detail === "Own Goal" ? <Text style={styles.csc}>(csc)</Text> : null} {item.detail === "Penalty" ? <Text style={styles.penalty}>(pen)</Text> : null}<Text style={styles.goalIcon}>⚽</Text></Text>
                            </View>
                        )}
                    />
                </View> 

            </View>
{match.fixture.status.short === "PEN" ?
            <View style={{ width: "85%", justifyContent: "center", alignItems: "center", marginBlock: 20}}>
<Text style={{fontFamily: "Kanito", color: "red"}}>Tirs au But</Text>
<View style={{backgroundColor: "darkgrey", width: "100%", flexDirection: "row", borderRadius: 5, padding: 4}}>
<View style={{width: "50%"}}>
<FlatList data={buteurHomeP} renderItem={({item}) => (<View style={{flexDirection: "row", gap: 3, margin: 3, alignItems: "center"}}>{item.detail === "Missed Penalty" ? <Text>❌</Text> : <Text style={styles.goalIcon}>⚽</Text>} <Text style={{fontFamily: "Kanito"}}> {item.player.name} </Text></View>)} />
</View>
<View style={{width: "50%"}}>
<FlatList data={buteurExtP} renderItem={({item}) => (<View style={{flexDirection: "row", gap: 3, margin: 3, alignItems: "center", justifyContent: "flex-end"}}> <Text style={{fontFamily: "Kanito"}}> {item.player.name} </Text> {item.detail === "Missed Penalty" ? <Text>❌</Text> : <Text style={styles.goalIcon}>⚽</Text>}</View>)} />
</View>
</View>

            </View>: null}
        </View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
      },
    container: {
        padding: 10,
        alignItems: 'center',
        width: "100%"
    },
    ligue: {
        marginBottom: 10,
    },
    datelieu: {
        marginBottom: 10,
        alignItems: 'center',
        gap: 5
    },
    icone: {
        height: 18,
         width: 18, 
         objectFit: "contain"
    },
    afficheUcl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        padding: 15,
        borderRadius: 10,
        height: 170,
    },
    affiche: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        width: '100%',
        backgroundColor: "steelblue",
        padding: 15,
        borderRadius: 10
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
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    text:{
fontFamily: "Kanito",
fontSize: 12
    },
    scoreText: {
        fontSize: 26,
        color: "white",
        fontFamily: "Kanito"
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
fontFamily: "Kanitalic"    },

victoire: {
    backgroundColor: "green",
    paddingBlock: 2,
    paddingInline: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
},
defaite : {
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
}
});

export default Affiche;