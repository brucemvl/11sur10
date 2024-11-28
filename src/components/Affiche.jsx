import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Affiche = ({ match, roundd, buteurHome, buteurExt }) => {

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

            <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.8)']} style={styles.affiche}>
        <View style={styles.domicile}>
          <Image source={{ uri: match.teams.home.logo }} style={styles.teamLogo} />
          <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 15 }}>{match.teams.home.name}</Text>
        </View>

        <View style={styles.score}>
          <Text style={styles.scoreText}>
            {match.goals.home} - {match.goals.away}
          </Text>
        </View>

        <View style={styles.exterieur}>
          <Image source={{ uri: match.teams.away.logo }} style={styles.teamLogo} />
          <Text style={{ fontFamily: 'Kanito', color: 'white', fontSize: 15 }}>
            {match.teams.away.name}
          </Text>
        </View>
    </LinearGradient>

            <View style={styles.buts}>
                <View style={styles.equipeDomicile}>
                    <FlatList
                        data={buteurHome}
                        keyExtractor={(item) => `buteur:${item.player.name}`}
                        renderItem={({ item }) => (
                            <View style={styles.buteurItem}>
                                <Text style={styles.text}><Text style={styles.goalIcon}>⚽</Text> {item.player.name}, {item.time.elapsed}' {item.time.extra ? ` + ${item.time.extra}` : null} {item.detail === "Own Goal" ? <Text style={styles.csc}>(csc)</Text> : null} {item.detail === "Penalty" ? <Text style={styles.penalty}>(pen)</Text> : null}</Text>
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
                                <Text style={styles.text}> {item.player.name}, {item.time.elapsed}' {item.time.extra ? ` + ${item.time.extra}` : null} {item.detail === "Own Goal" ? <Text style={styles.csc}>(csc)</Text> : null} {item.detail === "Penalty" ? <Text style={styles.penalty}>(pen)</Text> : null}<Text style={styles.goalIcon}>⚽</Text></Text>
                            </View>
                        )}
                    />
                </View>
            </View>
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
fontFamily: "Kanito"
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
        marginRight: 5,
    },
    csc: {
        fontStyle: 'italic',
        color: 'red',
    },
    penalty: {
        fontStyle: 'italic',
        color: 'blue',
    },
});

export default Affiche;