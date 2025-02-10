import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import JourneesEurope from "./JourneesEurope";
import Match from "./Match";
import { LinearGradient } from "expo-linear-gradient";
import ucl from "../assets/logoucl.png"

function TableauEurope({ id}) {
  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-Black.ttf"),
  });


  const [phasePoules, setPhasePoules] = useState(false)
  const [phaseBarrages, setPhaseBarrages] = useState(true)

 
  const [poules, setPoules] = useState([])
  const [barrages, setBarrages] = useState([])

  useEffect(() => {
      const fetchPoules = () => {
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
if(json.response[0].league.id === 2){
                      setPoules(json.response.slice(90, 234))}
                      if(json.response[0].league.id === 3){
                        setPoules(json.response.slice(90, 224))}
                  })
          }
          catch (error) {
              console.error("error:", error)
          }
      };
      fetchPoules();
  }, [id]

  )


  useEffect(() => {
    const fetchBarrages = () => {
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
if(json.response[0].league.id === 2){
                    setBarrages(json.response.slice(234, json.response.length))}
                    if(json.response[0].league.id === 3){
                      setBarrages(json.response.slice(224, json.response.length))}
                })
        }
        catch (error) {
            console.error("error:", error)
        }
    };
    fetchBarrages();
}, [id]

)

  if (id === 848){
   return  <View style={{padding: 20, justifyContent: "center", alignItems: "center", height: 200, gap: 20}}>
    <Image source={{uri: "https://media.api-sports.io/football/leagues/848.png"}} style={{height: 70, width: 70, objectFit: "contain"}} />
    <Text style={{fontFamily: "Kanitt", fontSize: 14}}>Calendrier Europa League Conference à venir...</Text>
    <Text style={{fontFamily: "Kanitt", fontSize: 14}}>Classements et stats ci-dessous</Text>
    
   </View>
  }

  const openPoules = ()=>{
    setPhasePoules(true)
    setPhaseBarrages(false)
  }

  const openBarrages = ()=>{
    setPhasePoules(false)
    setPhaseBarrages(true)
  }

  const round = poules?.reduce(
      (acc, elem) =>
          acc.includes(elem.league.round) ? acc : acc.concat(elem.league.round),
      []
  )

  console.log(round)
  const [filterp, setFilterp] = useState("League Stage - 8")

 
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;  // Attendre que les polices et les données soient chargées
  }

 console.log(barrages)
  

 return (
  <LinearGradient
    colors={id === 2 ? ['rgb(16, 19, 49)', 'rgb(50, 183, 255)'] : ['rgb(50, 183, 255)', 'rgb(16, 19, 49)']}
    style={styles.container}
  >
    <Text style={styles.title}>Calendrier et Résultats</Text>
    <Image
      source={id === 2 ? ucl : { uri: `https://media.api-sports.io/football/leagues/${id}.png` }}
      style={id === 2 ? { width: 80, height: 50, objectFit: 'contain' } : { width: 50, height: 50, objectFit: 'contain' }}
    />
    <View style={{ flexDirection: 'row', gap: 30, marginBlock: 15 }}>
      <TouchableOpacity onPress={openPoules}>
        <Text style={phasePoules ? styles.selectedTab : styles.tab}>Poules</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openBarrages}>
        <Text style={phaseBarrages ? styles.selectedTab : styles.tab}>Barrages</Text>
      </TouchableOpacity>
    </View>

    {phasePoules && (
      <>
        <JourneesEurope setFilterp={setFilterp} round={round} filterp={filterp} />
        {poules.map((element) => {
          if (filterp === undefined) {
            return <Text key="loading">Loading...</Text>;
          }

          if (!filterp || filterp === element.league.round) {
            return (
              <Match
                key={"match" + element.fixture.id}
                equipeDom={element.teams.home.name}
                id={element.fixture.id}
                equipeExt={element.teams.away.name}
                logoDom={element.teams.home.logo}
                round={element.league.round}
                logoExt={element.teams.away.logo}
                scoreDom={element.goals.home}
                scoreExt={element.goals.away}
                date={element.fixture.date}
              />
            );
          }

          return null; // Si aucun match ne correspond, rien n'est affiché
        })}
      </>
    )}

    {phaseBarrages && (
      <>
        {barrages.map((x) => {
          return (
            <Match
              key={"match" + x.fixture.id}
              equipeDom={x.teams.home.name}
              id={x.fixture.id}
              equipeExt={x.teams.away.name}
              logoDom={x.teams.home.logo}
              round={x.league.round}
              logoExt={x.teams.away.logo}
              scoreDom={x.goals.home}
              scoreExt={x.goals.away}
              date={x.fixture.date}
            />
          );
        })}
      </>
    )}
  </LinearGradient>
);
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 10,
      paddingInline: 4,
      borderRadius: 15,
      alignItems: "center"
    },
    title: {
      fontSize: 24,
      fontWeight: "400",
      marginBottom: 10,
      textAlign: "center",
      fontFamily: "Kanitt",
      color: "white"
    },
    tab: {
      fontSize: 16,
      color: 'black',
      backgroundColor: "lightgrey",
      width: 84,
      height: 40,
      textAlign: "center",
      paddingTop: 7,
      borderRadius: 5,
      fontFamily: "Kanitus",
  },
  selectedTab: {
      fontSize: 16,
      color: '#fff',
      backgroundColor: '#007BFF',
      width: 88,
      height: 40,
      textAlign: "center",
      paddingTop: 7,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 3.5,
      fontFamily: "Kanito", 
      elevation: 5,

  },
  });

  export default TableauEurope