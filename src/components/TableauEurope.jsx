import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import Journees from "./Journees";
import Match from "./Match";

function TableauEurope({ id, currentRound}) {
  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-Black.ttf"),
  });

 
  const [team, setTeam] = useState([])

  useEffect(() => {
      const fetchData = () => {
          try {
              fetch(`https://v3.football.api-sports.io/fixtures?league=${id}&season=2024`, {
                  method: "GET",
                  headers: {
                      "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                      "x-rapidapi-host": "v3.football.api-sports.io",
                  }
              })
                  .then((response) => response.json())
                  .then((json) => {
                      console.log(json.response)

                      setTeam(json.response.slice(90, json.response.length))
                  })
          }
          catch (error) {
              console.error("error:", error)
          }
      };
      fetchData();
  }, [id]

  )

  const round = team.reduce(
      (acc, elem) =>
          acc.includes(elem.league.round) ? acc : acc.concat(elem.league.round),
      []
  )

  const [filter, setFilter] = useState(round)


  const roundd = round.sort((a, b) => {
      const numA = parseInt(a.split('-')[1].trim());
      const numB = parseInt(b.split('-')[1].trim());
      return numA - numB;
  });

  const currentIndex = roundd.findIndex(x => {
      const num1 = parseInt(x.split('-')[1]);
      const num2 = parseInt(currentRound.split('-')[1]);
      return num1 === num2;
  });


  if (!fontsLoaded) {
    return <Text>Loading...</Text>;  // Attendre que les polices et les données soient chargées
  }

  if(currentRound.length === 0){
    return <Text>loading</Text>
  }
  
console.log(filter)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendrier et Résultats</Text>
      <Journees
        setFilter={setFilter}
        round={round}
        roundd={roundd}
        filter={filter}  // Assurez-vous que filter a une valeur au départ
        id={id}
        team={team}
        currentIndex={currentIndex} // Passer l'index de currentRound
      />
      {team.map(element => filter === undefined ? <Text>Loading</Text> : !filter || filter === element.league.round ?

<Match equipeDom={element.teams.home.name} id={element.fixture.id} equipeExt={element.teams.away.name} logoDom={element.teams.home.logo} round={element.league.round} logoExt={element.teams.away.logo} scoreDom={element.goals.home} scoreExt={element.goals.away} date={element.fixture.date} key={"match" + element.fixture.id} /> : null

)}
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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