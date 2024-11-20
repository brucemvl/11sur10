import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Match from "./Match";
import Journees from "./Journees";

function Tableau({ id }) {

  const [team, setTeam] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      try {
        fetch(`https://v3.football.api-sports.io/fixtures?league=${id}&season=2024`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);  // Ajoutez un log pour voir ce qui est retourné par l'API
            setTeam(json.response);
          })
          .catch((error) => console.error("Erreur de récupération des données:", error));
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchData();
  }, [id]);

  
 

  const round = team.reduce(
    (acc, elem) => {
      if (elem.league.round && !acc.includes(elem.league.round)) {
        acc.push(elem.league.round);
      }
      return acc;
    },
    []
  );
  console.log(round); // Vérifier le contenu de `round`

  const [filter, setFilter] = useState(round);

  const [currentRound, setCurrentRound] = useState("");

  useEffect(() => {
    const fetchRound = () => {
      try {
        fetch(`https://v3.football.api-sports.io/fixtures/rounds?season=2024&league=${id}&current=true`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setCurrentRound(json.response[0]);
          });
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchRound();
  }, [id]);

  const roundd = round.sort((a, b) => {
    const numA = parseInt(a.split("-")[1].trim());
    const numB = parseInt(b.split("-")[1].trim());
    return numA - numB;
  });

  const currentIndex = roundd.findIndex((round) => {
    if (!currentRound) return false;
    const num1 = parseInt(round.split("-")[1]);
    const num2 = parseInt(currentRound.split("-")[1]);
    return num1 === num2;
  });

  return (
    <View style={styles.container}>
<Text style={styles.title}>Calendrier et Resultats</Text>
<Journees
  setFilter={setFilter}
  round={round}
  roundd={roundd}
  filter={filter}
  id={id}
  team={team}
  currentIndex={currentIndex}
/>

<FlatList
  data={team}
  keyExtractor={(item) => "match" + item.fixture.id}
  renderItem={({ item }) => {
    // Vérifier si filter est un tableau et si le round actuel est inclus
    const shouldDisplay = !filter || filter.includes(item.league.round);
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
    } else {
      return null;
    }
  }}
/>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Tableau;