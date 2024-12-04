import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Aujourdhui = () => {
    const [matchsEngland, setMatchsEngland] = useState();
    const [matchsSpain, setMatchsSpain] = useState();
    const [matchsFrance, setMatchsFrance] = useState();
    const [matchsUcl, setMatchsUcl] = useState();
    const [matchsGer, setMatchsGer] = useState();
    const [matchsItaly, setMatchsItaly] = useState();

    // Récupération des données des matchs via l'API (code similaire pour chaque ligue)
    useEffect(() => {
        const fetchUcl = () => {
            try {
                fetch("https://v3.football.api-sports.io/fixtures?league=2&season=2024", {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                        "x-rapidapi-host": "v3.football.api-sports.io",
                    }
                })
                    .then((response) => response.json())
                    .then((json) => {

                        setMatchsUcl(json.response)

                    })

            }
            catch (error) {
                console.error("error:", error)
            }
        };
        fetchUcl();
    }, []

    )

    useEffect(() => {
        const fetchFrance = () => {
            try {
                fetch("https://v3.football.api-sports.io/fixtures?league=61&season=2024", {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                        "x-rapidapi-host": "v3.football.api-sports.io",
                    }
                })
                    .then((response) => response.json())
                    .then((json) => {

                        setMatchsFrance(json.response)

                    })

            }
            catch (error) {
                console.error("error:", error)
            }
        };
        fetchFrance();
    }, []

    )


    useEffect(() => {
        const fetchEngland = () => {
            try {
                fetch("https://v3.football.api-sports.io/fixtures?league=39&season=2024", {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                        "x-rapidapi-host": "v3.football.api-sports.io",
                    }
                })
                    .then((response) => response.json())
                    .then((json) => {

                        setMatchsEngland(json.response)

                    })

            }
            catch (error) {
                console.error("error:", error)
            }
        };
        fetchEngland();
    }, []

    )

    useEffect(() => {
        const fetchSpain = () => {
            try {
                fetch("https://v3.football.api-sports.io/fixtures?league=140&season=2024", {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                        "x-rapidapi-host": "v3.football.api-sports.io",
                    }
                })
                    .then((response) => response.json())
                    .then((json) => {

                        setMatchsSpain(json.response)

                    })

            }
            catch (error) {
                console.error("error:", error)
            }
        };
        fetchSpain();
    }, []

    )

    useEffect(() => {
        const fetchGer = () => {
            try {
                fetch("https://v3.football.api-sports.io/fixtures?league=2&season=2024", {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                        "x-rapidapi-host": "v3.football.api-sports.io",
                    }
                })
                    .then((response) => response.json())
                    .then((json) => {

                        setMatchsGer(json.response)

                    })

            }
            catch (error) {
                console.error("error:", error)
            }
        };
        fetchGer();
    }, []

    )

    useEffect(() => {
        const fetchItaly = () => {
            try {
                fetch("https://v3.football.api-sports.io/fixtures?league=2&season=2024", {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                        "x-rapidapi-host": "v3.football.api-sports.io",
                    }
                })
                    .then((response) => response.json())
                    .then((json) => {

                        setMatchsItaly(json.response)

                    })

            }
            catch (error) {
                console.error("error:", error)
            }
        };
        fetchItaly();
    }, []

    )

    if (!matchsEngland || !matchsSpain || !matchsFrance || !matchsUcl || !matchsGer || !matchsItaly) {
        return <Text>Loading...</Text>;
    }

    // Fusion des matchs des différentes ligues
    const matchs = [...matchsUcl, ...matchsFrance, ...matchsEngland, ...matchsSpain, ...matchsGer, ...matchsItaly];

    const todayMatch = matchs.filter((match) => {
        const matchDate = match.fixture.date.slice(0, 10);
        const today = new Date().toISOString().slice(0, 10); // Date du jour au format YYYY-MM-DD
        return matchDate === today;
    });

    const formatDateAndTime = (dateString) => {
        const matchDate = new Date(dateString);
        const formattedDate = `${matchDate.getDate().toString().padStart(2, '0')}/${(matchDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`;
        const formattedHour = `${matchDate.getHours().toString().padStart(2, '0')}h${matchDate.getMinutes()
            .toString()
            .padStart(2, '0')}`;
        return { formattedDate, formattedHour };
    };

    return (
        <View style={styles.live}>
            <LinearGradient colors={['rgba(3, 42, 176, 100)', 'rgba(39, 54, 50, 75)']}
                style={styles.titre}

            >
                <Text style={styles.titreToday}>AUJOURDHUI</Text>
            </LinearGradient>
            {todayMatch.length === 0 ? (
                <Text style={styles.nomatch}>Pas de match aujourd'hui</Text>
            ) : (
                <ScrollView style={styles.liveTableau}>
                    {todayMatch.map((element) =>
                        element.fixture.status.long === 'Not Started' ? (
                            <TouchableOpacity
                                key={element.fixture.id}
                                style={styles.link}
                                onPress={() => {/* Navigation vers la fiche du match */ }}
                            >
                                <View style={styles.liveMatch}>
                                    <Image source={{ uri: element.league.logo }} style={styles.matchCompetition} />
                                    <Text style={styles.matchEquipeDom}>{element.teams.home.name}</Text>
                                    <Image source={{ uri: element.teams.home.logo }} style={styles.matchLogoDom} />

                                    <View style={styles.rdv}>
                                        <Text style={{ fontFamily: "Kanitalic" }}>{formatDateAndTime(element.fixture.date).formattedDate}</Text>
                                        <Text style={{ fontFamily: "Kanitalic" }}>{formatDateAndTime(element.fixture.date).formattedHour}</Text>
                                    </View>
                                    <Image source={{ uri: element.teams.away.logo }} style={styles.matchLogoExt} />
                                    <Text style={styles.matchEquipeExt}>{element.teams.away.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            ''
                        )
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    live: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: "pink",
        borderRadius: 15,
        width: "100%",
        marginTop: 20,
        backgroundColor: "#b0c4de",

    },
    titre: {
        width: 150,
        marginBlock: 10,
        borderRadius: 15,
    },
    titreToday: {
        color: 'white',
        textAlign: 'center',
        paddingVertical: 5,
        fontSize: 18,
        fontFamily: "Kanitt"
    },
    nomatch: {
        backgroundColor: 'red',
        color: 'white',
        width: '70%',
        textAlign: 'center',
        fontFamily: 'Permanent Marker',
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    liveTableau: {
        width: '98%',
    },

    liveMatch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "aliceblue",
        borderRadius: 10,
        paddingBlock: 10,
        marginVertical: 5,
    },
    matchCompetition: {
        height: 35,
        width: "8%",
        objectFit: 'contain',
    },
    matchEquipeDom: {
        fontSize: 14,
        fontFamily: "Kanito",
        width: "27%",
        textAlign: "center"

    },
    matchLogoDom: {
        height: 40,
        width: "9%",
        objectFit: 'contain',
    },

    rdv: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        width: "10%"
    },
    matchLogoExt: {
        height: 40,
        width: "9%",
        objectFit: 'contain',
    },
    matchEquipeExt: {
        fontSize: 14,
        fontFamily: "Kanito",
        width: "27%",
        textAlign: "center"

    },
});

export default Aujourdhui;