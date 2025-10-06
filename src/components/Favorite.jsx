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
  const { notifsEnabled, selectedTeamId } = props;
  
      const [calendrier, setCalendrier] = useState([])

    const navigation = useNavigation();
    
         const scrollViewRef = useRef(null);
const [positions, setPositions] = useState({});
const [firstUpcomingIndex, setFirstUpcomingIndex] = useState(null);

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
    const fetchCalendrier = async () => {
      try {
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?season=2025&team=${selectedTeamId}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        });
        const json = await response.json();
        if (json.response.length > 0) {
          setCalendrier(json.response);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchCalendrier();
  }, [selectedTeamId]);
    
useEffect(() => {
  // chaque fois que selectedTeamId change, on “nettoie” le calendrier
  setCalendrier([]);
}, [selectedTeamId]);
  

  console.log(calendrier)

  const clubNames = {
  "Borussia Mönchengladbach": "Mönchengladbach",
  "Paris Saint Germain": "Paris SG",
  "Barcelona": "FC Barcelone",
  "Manchester United": "Manchester Utd"
};

    return (
<View style={styles.container}>

            <ScrollView horizontal contentContainerStyle={{ gap: 18, padding: 12 }} ref={scrollViewRef}>
                {

                    calendrier
  .slice()
  .sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date)) // Tri chronologique
  .map((element, index) => {
    const date = element.fixture.date;
    const dateh = new Date(date);
    const formattedDate = `${dateh.getDate().toString().padStart(2, '0')}/${(dateh.getMonth() + 1).toString().padStart(2, '0')}`;
    const formattedHour = `${dateh.getHours().toString().padStart(2, '0')}h${dateh.getMinutes().toString().padStart(2, '0')}`;

                        return (
                            element.league.id === 15 ? null :
                                <View
                                    key={element.fixture.id}
                                    onLayout={event => {
                                        const { x, width } = event.nativeEvent.layout;
                                        setPositions(prev => ({ ...prev, [index]: { x, width } }));
                                    }}
                                    style={styles.carte}
                                >
                                    <TouchableOpacity style={styles.carte} key={element.fixture.id} onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })} >
                                        <LinearGradient style={styles.affiche} colors={element.league.id === 2 ? ["rgb(10, 20, 40)", "rgb(24, 36, 70)"] : ["#fff", "rgb(146, 146, 146)"]} locations={[0.5, 0.9]}>
                                            <View style={{ flexDirection: "row", gap: 5, borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: element.league.id === 2 ? "white" : "black" }}>
                                                <Image source={element.league.id === 2 ? calendarWhite : calendar} style={styles.icone} />
                                                <Text style={element.league.id === 2 ? styles.textUcl : styles.text}>{formattedDate}  -  {formattedHour}</Text>
                                                <Image source={element.league.id === 2 ? heureWhite : heure} style={styles.icone} />
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                {element.fixture.status.long === "Match Finished" ? <Text style={[element.goals.home > element.goals.away ? { backgroundColor: "green" } : element.goals.home < element.goals.away ? { backgroundColor: "red" } : { backgroundColor: "grey" }, { color: "white", fontFamily: "Kanitt", paddingInline: 8, paddingBlock: 5, marginInline: 2, borderRadius: 5 }]}>{element.goals.home}</Text> : null}
                                                <View style={styles.logos}>
                                                    <Image source={{ uri: element.teams.home.logo }} style={styles.logo} />
                                                    <Image source={{ uri: element.teams.away.logo }} style={styles.logoExt} />
                                                </View>
                                                {element.fixture.status.long === "Match Finished" ? <Text style={[element.goals.away > element.goals.home ? { backgroundColor: "green" } : element.goals.away < element.goals.home ? { backgroundColor: "red" } : { backgroundColor: "grey" }, { color: "white", fontFamily: "Kanitt", paddingInline: 8, paddingBlock: 5, marginInline: 2, borderRadius: 5 }]}>{element.goals.away}</Text> : null}
                                            </View>
                                            <View style={{ width: "98%", flexDirection: "row", alignItems: "center", gap: 5, justifyContent: "center" }}>
                                                <View>
                                                    <Text style={{ fontFamily: "Kanitt", fontSize: 9.5, color: element.league.id === 2 ? "white" : "black" }}>{clubNames[element.teams.home.name] || element.teams.home.name}</Text>
                                                </View>
                                                <Text style={{ color: element.league.id === 2 ? "white" : "black" }} >-</Text>
                                                <View >
                                                    <Text style={{ fontFamily: "Kanitt", fontSize: 9.5, color: element.league.id === 2 ? "white" : "black" }}>{clubNames[element.teams.away.name] || element.teams.away.name}</Text>

                                                </View>
                                            </View>
                                            <Image source={element.league.id === 2 ? logoUcl : element.league.id === 61 ? ligue1 : element.league.id === 15 ? fifaClubWc : { uri: element.league.logo }} style={styles.league} />

                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                        )
                    })
                }
            </ScrollView>
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
        width: 170,
        height: 155,
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
        height: 60,
        width: 60,
        objectFit: "contain",
        zIndex: 2

    },
    logoExt: {
        height: 45,
        width: 45,
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