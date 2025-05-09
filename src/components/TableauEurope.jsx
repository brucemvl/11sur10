import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import JourneesEurope from "./JourneesEurope";
import Match from "./Match";
import { LinearGradient } from "expo-linear-gradient";
import ucl from "../assets/logoucl.png"
import tabldc from "../assets/tabldc7.png"

function TableauEurope({ id}) {
  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-Black.ttf"),
  });


  const [phasePoules, setPhasePoules] = useState(false)
  const [phaseBarrages, setPhaseBarrages] = useState(false)
  const [phaseFinale, setPhaseFinale] = useState(true)


 
  const [poules, setPoules] = useState([])
  const [barrages, setBarrages] = useState([])
  const [phaseF, setPhaseF] = useState([])



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

                        if(json.response[0].league.id === 848){
                          setPoules(json.response.slice(256, 363))}
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
                    setBarrages(json.response.slice(234, 250))}

                    if(json.response[0].league.id === 3){
                      setBarrages(json.response.slice(224, 240))}

                      if(json.response[0].league.id === 848){
                        setBarrages(json.response.slice(364, 380))}
                })
        }
        catch (error) {
            console.error("error:", error)
        }
    };
    fetchBarrages();
}, [id]

)

useEffect(() => {
  const fetchPhaseF = () => {
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
                  setPhaseF(json.response.slice(250, json.response.length))}

                  if(json.response[0].league.id === 3){
                    setPhaseF(json.response.slice(240, json.response.length))}

                    if(json.response[0].league.id === 848){
                      setPhaseF(json.response.slice(380, json.response.length))}
              })
      }
      catch (error) {
          console.error("error:", error)
      }
  };
  fetchPhaseF();
}, [id]

)
/*
  if (id === 848){
   return  <View style={{padding: 20, justifyContent: "center", alignItems: "center", height: 200, gap: 20}}>
    <Image source={{uri: "https://media.api-sports.io/football/leagues/848.png"}} style={{height: 70, width: 70, objectFit: "contain"}} />
    <Text style={{fontFamily: "Kanitt", fontSize: 14}}>Calendrier Europa League Conference à venir...</Text>
    <Text style={{fontFamily: "Kanitt", fontSize: 14}}>Classements et stats ci-dessous</Text>
    
   </View>
  }
*/



  const openPoules = ()=>{
    setPhasePoules(true)
    setPhaseBarrages(false)
    setPhaseFinale(false)

  }

  const openBarrages = ()=>{
    setPhasePoules(false)
    setPhaseBarrages(true)
    setPhaseFinale(false)
  }

  const openPhaseFinale = ()=>{
    setPhasePoules(false)
    setPhaseBarrages(false)
    setPhaseFinale(true)
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
  
 const phases = ["Round of 16", "Quarter-finals", "Semi-finals", "Final"]

 const [index, setIndex] = useState(3)

 const prev = ()=>{
  setIndex(index-1)

  if (index === 0){
    setIndex(0)
  }
 }

 const next = ()=>{
  setIndex(index+1)
  if(index === 3){
    setIndex(3)
  }
  
 }

 return (
  <LinearGradient
    colors={id === 2 ? ['rgb(16, 19, 49)', 'rgba(16, 19, 49, 0.8)'] : ['rgb(50, 183, 255)', 'rgb(16, 19, 49)']}
    style={styles.container}
  >
    <Text style={styles.title}>Calendrier et Résultats</Text>
    <Image
      source={id === 2 ? ucl : { uri: `https://media.api-sports.io/football/leagues/${id}.png` }}
      style={id === 2 ? { width: 80, height: 50, objectFit: 'contain' } : { width: 50, height: 50, objectFit: 'contain' }}
    />
           { id === 2 ? <Image source={tabldc} style={{width: "100%",  height: 300, marginBlock: 15}}/> : null }

    <View style={{ flexDirection: 'row', gap: 30, marginBlock: 15 }}>
      <TouchableOpacity onPress={openPoules}>
        <Text style={phasePoules ? styles.selectedTab : styles.tab}>Poules</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openBarrages}>
        <Text style={phaseBarrages ? styles.selectedTab : styles.tab}>Barrages</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openPhaseFinale}>
        <Text style={phaseFinale ? styles.selectedTab : styles.tab}>Phase Finale</Text>
      </TouchableOpacity>
    </View>

    {phasePoules && (
      <>
        <JourneesEurope setFilterp={setFilterp} round={round} filterp={filterp} id={id} />
        {poules.map((element) => {
          if (filterp === undefined) {
            return <Text key="loading">Loading...</Text>;
          }

          if (!filterp || filterp === element.league.round ) {
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

{phaseFinale && (
      <>
      <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginBlock: 15}}>
        <TouchableOpacity style={{height: 34, width: 30, alignItems: "center"}} onPress={prev}><Text style={styles.buttonText}>{"<"}</Text></TouchableOpacity>   <Text style={{color: "white", fontFamily: "Kanitalik", fontSize: 16}}> {phases[index] === "Quarter-finals" ? "Quarts de finale" : phases[index] === "Semi-finals" ? "Demis finales" :  phases[index] === "Final" ? "Finale" :  phases[index] === "Round of 16" ? "Huitiemes de finale" : phases[index]}</Text><TouchableOpacity style={{height: 34, width: 30, alignItems: "center"}} onPress={next}><Text style={styles.buttonText}>{">"}</Text></TouchableOpacity>
</View>
        {phaseF.map((x) => {
          return (
            phases[index] === x.league.round ? 
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
            /> : null
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
      width: 94,
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
      width: 96,
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
  buttonText: {
    fontFamily: "Permanent",
    color: "white",
    fontSize: 20
  }
  });

  export default TableauEurope