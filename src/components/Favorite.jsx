import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native"
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import calendar from "../assets/date.png"
import calendarWhite from "../assets/datewhite.png"
import heureWhite from "../assets/heurewhite.png"
import heure from "../assets/heure.png"
import ligue1 from "../assets/logoligue1.webp"
import fifaClubWc from "../assets/fifaclubwc2.png"
import logoUcl from "../assets/logoucl.png"
import { teamName } from "../datas/teamNames";
import { InteractionManager } from "react-native";

const teams = [
    { id: 85, name: 'Paris Saint Germain', logo: "https://media.api-sports.io/football/teams/85.png" },
    { id: 81, name: 'Marseille', logo: "https://media.api-sports.io/football/teams/81.png" },
    { id: 80, name: 'Lyon', logo: "https://media.api-sports.io/football/teams/80.png" },
    { id: 84, name: 'Nice', logo: "https://media.api-sports.io/football/teams/84.png" },
    { id: 91, name: 'Monaco', logo: "https://media.api-sports.io/football/teams/91.png" },
    { id: 541, name: 'Real Madrid', logo: "https://media.api-sports.io/football/teams/541.png" },
    { id: 529, name: 'FC Barcelone', logo: "https://media.api-sports.io/football/teams/529.png" },
    { id: 33, name: 'Manchester United', logo: "https://media.api-sports.io/football/teams/33.png" },
    { id: 49, name: 'Chelsea', logo: "https://media.api-sports.io/football/teams/49.png" },
    { id: 42, name: 'Arsenal', logo: "https://media.api-sports.io/football/teams/42.png" },
    { id: 40, name: 'Liverpool', logo: "https://media.api-sports.io/football/teams/40.png" },
    { id: 157, name: 'Bayern Munich', logo: "https://media.api-sports.io/football/teams/157.png" },
    { id: 114, name: 'Paris FC', logo: "https://media.api-sports.io/football/teams/114.png" },
];

const Favorite = forwardRef((props, ref) => {
    const { notifsEnabled, selectedTeamIds = [] } = props;

    const [calendrier, setCalendrier] = useState([]);
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const [positions, setPositions] = useState({});
    const [firstUpcomingIndex, setFirstUpcomingIndex] = useState(null);
    const [calendriers, setCalendriers] = useState({});
    const scrollRefs = useRef({});
    const [firstUpcomingMatchIds, setFirstUpcomingMatchIds] = useState({});


    useEffect(() => {
        const now = new Date();
        const index = calendrier
            .slice()
            .sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date))
            .findIndex(match => new Date(match.fixture.date) >= now);

        setFirstUpcomingIndex(index);
    }, [calendrier]);

    useEffect(() => {
        if (firstUpcomingIndex !== null && positions[firstUpcomingIndex]) {
            scrollViewRef.current?.scrollTo({
                x: positions[firstUpcomingIndex].x,
                animated: true
            });
        }
    }, [positions, firstUpcomingIndex]);


    useEffect(() => {
        if (!selectedTeamIds || selectedTeamIds.length === 0) {
            setCalendriers({});
            return;
        }

        const fetchAllCalendars = async () => {
            try {
                const results = {};

                await Promise.all(
                    selectedTeamIds.map(async (teamId) => {
                        const response = await fetch(
                            `https://v3.football.api-sports.io/fixtures?season=2025&team=${teamId}`,
                            {
                                method: "GET",
                                headers: {
                                    "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                                    "x-rapidapi-host": "v3.football.api-sports.io",
                                },
                            }
                        );

                        const json = await response.json();

                        const sorted = json.response
                            ? json.response.sort(
                                (a, b) =>
                                    new Date(a.fixture.date) - new Date(b.fixture.date)
                            )
                            : [];

                        results[teamId] = sorted;

                        // 🔥 Scroll auto vers prochain match
                        const now = new Date();
                        const firstUpcomingMatch = sorted.find(m => new Date(m.fixture.date) >= now);
                        const firstUpcomingMatchId = firstUpcomingMatch?.fixture?.id;

                        setFirstUpcomingMatchIds(prev => ({ ...prev, [teamId]: firstUpcomingMatchId }));

                        if (firstUpcomingMatch) {
                            // attendre que le ScrollView soit rendu
                            InteractionManager.runAfterInteractions(() => {
                                scrollRefs.current[teamId]?.scrollTo({
                                    x: positions[firstUpcomingMatch.fixture.id] || 0,
                                    animated: true,
                                });
                            });
                        }
                    })
                );

                setCalendriers(results);


            } catch (error) {
                console.error("Erreur fetch calendrier:", error);
            }
        };

        fetchAllCalendars();
    }, [JSON.stringify(selectedTeamIds)]);



    return (
        <View style={{ width: "100%" }}>
            {selectedTeamIds.map((teamId) => {
                const teamMatches = calendriers[teamId] || [];

                return (
                    <View key={teamId} style={{}}>

                        {/* Header équipe */}
                        <Image
                            source={{ uri: `https://media.api-sports.io/football/teams/${teamId}.png` }}
                            style={{ width: 50, height: 50, resizeMode: "contain", position: "absolute", zIndex: 9, opacity: 0.75 }}
                        />

                        {/* Scroll horizontal propre à l'équipe */}
                        <ScrollView
                            ref={ref => (scrollRefs.current[teamId] = ref)}
                            horizontal
                            snapToInterval={188}
                            decelerationRate="fast"
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 18, padding: 12 }}
                        >
                            {teamMatches.map((element) => {
                                const date = element.fixture.date;
                                const dateh = new Date(date);
                                const formattedDate = `${dateh.getDate().toString().padStart(2, '0')}/${(dateh.getMonth() + 1).toString().padStart(2, '0')}`;
                                const formattedHour = `${dateh.getHours().toString().padStart(2, '0')}h${dateh.getMinutes().toString().padStart(2, '0')}`;

                                return (
                                    element.league.id === 15 ? null :

                                        <TouchableOpacity
                                            key={element.fixture.id}
                                            style={styles.carte}
                                            onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}
                                            onLayout={e => {
                                                const layoutX = e.nativeEvent.layout.x;  // copie immédiatement
                                                setPositions(prev => {
                                                    const newPositions = { ...prev, [element.fixture.id]: layoutX };
                                                    const matchIdToScroll = firstUpcomingMatchIds[teamId];

                                                    if (matchIdToScroll && newPositions[matchIdToScroll] !== undefined) {
                                                        InteractionManager.runAfterInteractions(() => {
                                                            scrollRefs.current[teamId]?.scrollTo({
                                                                x: newPositions[matchIdToScroll],
                                                                animated: true,
                                                            });
                                                        });
                                                    }

                                                    return newPositions;
                                                });
                                            }}
                                        >                                                       <LinearGradient style={styles.affiche} colors={element.league.id === 2 ? ["rgb(10, 20, 40)", "rgb(24, 36, 70)"] : element.league.id === 6 ? ["rgba(172, 101, 31, 1)", "rgba(128, 0, 0, 1)"] : element.league.standings === false ? ["rgba(123, 131, 151, 1)", "rgba(255, 255, 255, 1)"] : ["#fff", "rgb(146, 146, 146)"]} locations={[0.5, 0.9]}>
                                                <View style={{ flexDirection: "row", gap: 5, borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: element.league.id === 2 ? "white" : "black" }}>
                                                    <Image source={element.league.id === 2 ? calendarWhite : calendar} style={styles.icone} />
                                                    <Text style={element.league.id === 2 ? styles.textUcl : styles.text}>{formattedDate}  -  {formattedHour}</Text>
                                                    <Image source={element.league.id === 2 ? heureWhite : heure} style={styles.icone} />
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    {element.fixture.status.long === "Match Finished" ? <Text style={[element.goals.home > element.goals.away ? { backgroundColor: "green" } : element.goals.home < element.goals.away ? { backgroundColor: "red" } : { backgroundColor: "grey" }, { color: "white", fontFamily: "Kanitt", paddingInline: 8, paddingBlock: 5, borderRadius: 5, marginInline: 2 }]}>{element.goals.home}</Text> : null}
                                                    <View style={styles.logos}>
                                                        <Image source={{ uri: element.teams.home.logo }} style={styles.logo} />
                                                        <Image source={{ uri: element.teams.away.logo }} style={styles.logoExt} />
                                                    </View>
                                                    {element.fixture.status.long === "Match Finished" ? <Text style={[element.goals.away > element.goals.home ? { backgroundColor: "green" } : element.goals.away < element.goals.home ? { backgroundColor: "red" } : { backgroundColor: "grey" }, { color: "white", fontFamily: "Kanitt", paddingInline: 8, paddingBlock: 5, borderRadius: 5, marginInline: 2 }]}>{element.goals.away}</Text> : null}
                                                </View>
                                                <View style={{ width: "98%", flexDirection: "row", alignItems: "center", gap: 5, justifyContent: "center" }}>
                                                    <View>
                                                        <Text style={{ fontFamily: "Kanitt", fontSize: 9.5, color: element.league.id === 2 ? "white" : "black" }}>{element.teams.home.name === "Borussia Mönchengladbach" ? "Mönchengladbach" : element.teams.home.name === "Paris Saint Germain" ? "Paris SG" : element.teams.home.name}</Text>
                                                    </View>
                                                    <Text style={{ color: element.league.id === 2 ? "white" : "black" }} >-</Text>
                                                    <View >
                                                        <Text style={{ fontFamily: "Kanitt", fontSize: 9.5, color: element.league.id === 2 ? "white" : "black" }}>{element.teams.away.name === "Borussia Mönchengladbach" ? "Mönchengladbach" : element.teams.away.name === "Paris Saint Germain" ? "Paris SG" : element.teams.away.name}</Text>

                                                    </View>
                                                </View>
                                                <Image source={element.league.id === 2 ? logoUcl : element.league.id === 61 ? ligue1 : element.league.id === 15 ? fifaClubWc : { uri: element.league.logo }} style={styles.league} />

                                            </LinearGradient>
                                        </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                );
            })}
        </View>
    )
}
)

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 190,
        marginVertical: "auto"
    },
    carte: {
        shadowColor: 'black', // shadow color
        shadowOffset: { width: 0, height: 2 }, // shadow offset
        shadowOpacity: 0.6, // shadow opacity
        shadowRadius: 4,

    },
    affiche: {
        justifyContent: "space-around",
        width: 165,
        height: 150,
        marginBlock: 3,
        flexDirection: "column",
        gap: 5,
        borderRadius: 15,
        elevation: 5,
        alignItems: "center",
        padding: 4
    },
    dateheure: {
        alignItems: "center",
        width: "35%",
        justifyContent: "flex-start",
        flexDirection: "row"

    },
    logos: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        height: 55,
        width: 55,
        objectFit: "contain",
        zIndex: 2

    },
    logoExt: {
        height: 40,
        width: 40,
        position: "relative",
        right: 14,
        objectFit: "contain"

    },
    league: {
        height: 28, width: 28, objectFit: "contain",
    },
    icone: {
        height: 14,
        width: 14,
        objectFit: "contain"
    },
    text: {
        fontFamily: "Kanitalic",
        fontSize: 9,
        backgroundColor: "black",
        color: "white",
        paddingInline: 4,
        borderRadius: 5
    },
    textUcl: {
        fontFamily: "Kanitalic",
        fontSize: 9,
        backgroundColor: "white",
        color: "black",
        paddingInline: 4,
        borderRadius: 5
    }
})

export default Favorite