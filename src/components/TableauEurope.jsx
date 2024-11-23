import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import Journees from "./Journees";
import Match from "./Match";

function TableauEurope({ id, index, setFilter, filter }) {
  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-Black.ttf"),
  });

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRound, setCurrentRound] = useState("");

  // Récupérer les données des matchs
  useEffect(() => {
    const fetchData = () => {
      fetch(`https://v3.football.api-sports.io/fixtures?league=${id}&season=2024`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTeam(json.response.slice(90, json.response.length));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur de récupération des données:", error);
          setLoading(false);
        });
    };
    fetchData();
  }, [id]);

  console.log(team)

  // Récupérer les rounds
  const round = team.reduce((acc, elem) => {
    if (elem.league.round && !acc.includes(elem.league.round)) {
      acc.push(elem.league.round);
    }
    return acc;
  }, []);

  const roundd = round.sort((a, b) => {
    const numA = parseInt(a.split("-")[1].trim());
    const numB = parseInt(b.split("-")[1].trim());
    return numA - numB;
  });

  // Récupérer la ronde actuelle (currentRound)
  useEffect(() => {
    const fetchRound = () => {
      fetch(`https://v3.football.api-sports.io/fixtures/rounds?season=2024&league=${id}&current=true`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.response.length > 0) {
            setCurrentRound(json.response[0]);
          }
        })
        .catch((error) => console.error("error:", error));
    };
    fetchRound();
  }, [id]);

  // Filtrage des matchs avec currentRound
  useEffect(() => {
    if (currentRound) {
      setFilter(currentRound);  // Met à jour le filtre dès que currentRound est disponible
    }
  }, [currentRound, setFilter]);

  if (!fontsLoaded || loading) {
    return <Text>Loading...</Text>; // Attendre que les polices et les données soient chargées
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendrier et Résultats</Text>
      <Journees
        setFilter={setFilter}
        round={round}
        roundd={roundd}
        filter={filter}
        id={id}
        team={team}
        currentIndex={roundd.indexOf(currentRound)} // Passer l'index de currentRound
      />
      <FlatList
        data={team}
        keyExtractor={(item) => "match" + item.fixture.id}
        renderItem={({ item }) => {
          const shouldDisplay = !filter || item.league.round === filter;
          if (shouldDisplay) {
            return (
              <Match
                equipeDom={item.teams.home.name}
                id={item.fixture.id}
                equipeExt={item.teams.away.name}
                logoDom={item.teams.home.logo}
                round={item.league.round}
                logoExt={item.teams.away.logo}
                scoreDom={item.goals.home}
                scoreExt={item.goals.away}
                date={item.fixture.date}
              />
            );
          }
          return null;
        }}
      />
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 6,
      paddingVertical: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "400",
      marginBottom: 10,
      textAlign: "center",
      fontFamily: "Kanitt",
    },
  });

  export default TableauEurope