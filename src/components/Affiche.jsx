import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

const Affiche = ({ match, roundd, buteurHome, buteurExt, buteurHomeP, buteurExtP, formeHome, formeExt, onPress }) => {

    const navigation = useNavigation()
    const date = new Date(match.fixture.date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    const formattedHour = `${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;


    return (
        <View style={styles.container}>
            <View style={styles.ligue}>
                <Text style={{fontFamily: "Kanitt"}}>{match.league.name} - Journee {roundd}</Text>
            </View>

            <View style={styles.datelieu}>
                <Text style={styles.text}>{formattedDate} - {formattedHour}</Text>
                <Text style={styles.text}>{match.fixture.venue.name} , {match.fixture.venue.city}</Text>
            </View>

            <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.8)']} style={styles.affiche}>
            <TouchableOpacity style={styles.domicile} onPress={onPress}>
          <SharedElement id="logo">
          <Image source={{ uri: match.teams.home.logo }} style={styles.teamLogo} />
          </SharedElement>
          <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 15 }}>{match.teams.home.name}</Text>
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
          <Text style={styles.scoreText}>
            {match.goals.home} - {match.goals.away}
          </Text>
        </View>

        <TouchableOpacity style={styles.exterieur} onPress={()=> navigation.navigate("FicheEquipe", {id: match.teams.away.id, league: match.league.id, img: match.teams.away.logo})}>
          <Image source={{ uri: match.teams.away.logo }} style={styles.teamLogo} />
          <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 15 }}>{match.teams.away.name}</Text>
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
    </LinearGradient>

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
        fontSize: 24,
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