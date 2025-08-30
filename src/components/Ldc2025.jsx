import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"



function Ldc2025(){

    const [selected, setSelected] = useState(false)

    const teams = [
  { id: 85, name: 'Paris Saint Germain', logo: "https://media.api-sports.io/football/teams/85.png" },
  { id: 81, name: 'Marseille', logo: "https://media.api-sports.io/football/teams/81.png" },
  { id: 91, name: 'Monaco', logo: "https://media.api-sports.io/football/teams/91.png" },
  { id: 541, name: 'Real Madrid', logo: "https://media.api-sports.io/football/teams/541.png" },
    { id: 529, name: 'FC Barcelone', logo: "https://media.api-sports.io/football/teams/529.png" },
        { id: 47, name: 'Tottenham', logo: "https://media.api-sports.io/football/teams/47.png" },
        { id: 50, name: 'Manchester City', logo: "https://media.api-sports.io/football/teams/50.png" },
    { id: 49, name: 'Chelsea', logo: "https://media.api-sports.io/football/teams/49.png" },
        { id: 42, name: 'Arsenal', logo: "https://media.api-sports.io/football/teams/42.png" },
        { id: 40, name: 'Liverpool', logo: "https://media.api-sports.io/football/teams/40.png" },
    { id: 157, name: 'Bayern Munich', logo: "https://media.api-sports.io/football/teams/157.png" },
        { id: 34, name: 'Newcastle', logo: "https://media.api-sports.io/football/teams/34.png" },
        { id: 530, name: 'Atletico Madrid', logo: "https://media.api-sports.io/football/teams/530.png" },
          { id: 165, name: 'Borussia Dortmund', logo: "https://media.api-sports.io/football/teams/165.png" },
          { id: 505, name: 'Inter Milan', logo: "https://media.api-sports.io/football/teams/505.png" },



];

const [team, setTeam] = useState(85)
    const [matchs, setMatchs] = useState([])

     useEffect(() => {
        const fetchMatchs = () => {
          try {
            fetch(`https://v3.football.api-sports.io/fixtures?league=2&season=2025&team=${team}`, {
              method: 'GET',
              headers: {
                'x-rapidapi-key': '5ff22ea19db11151a018c36f7fd0213b',
                'x-rapidapi-host': 'v3.football.api-sports.io',
              },
            })
              .then((response) => response.json())
              .then((json) => {
                setMatchs(json.response);
              });
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchMatchs();
      }, [team]);


// Filtre les matchs


    return (
        <View style={styles.container}>
            <View style={styles.scroll}>
            <ScrollView contentContainerStyle={{gap: 20, paddingInline: 10, paddingBlock: 15}}>
{teams.map((element) => 
{
            const isSelected = team === element.id

    const choix = ()=>  {
setTeam(element.id)
setSelected(true)
    }
    
    return (<TouchableOpacity onPress={choix} ><Image source={{uri : element.logo}} style={isSelected ? styles.selected : styles.unselected}/></TouchableOpacity>)}
)}</ScrollView>
</View>
<View style={{ gap: 8, flexDirection: "column", justifyContent: "center", alignItems: "center", width: "72%"}}>
<Text style={{fontFamily: "Kanitalik", color: "white"}}>Tirage {team === 165 || team === 85 || team === 541 || team === 529 || team === 157 ? "du " : "de "}{teams.map((element) => element.id === team ? element.name : null)}</Text>

            <View style={styles.tirage}>
            {matchs.map((element) => (
    <Image
    key={element.fixture.id}
      source={{
        uri:
          element.teams.home.id !== team
            ? element.teams.home.logo
            : element.teams.away.logo,
      }}
      style={styles.adversaires}
    />
))}
</View>
</View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {flexDirection: "row",
     alignItems: "center",
       width: "96%",
       paddingInline: 20,
       borderRadius: 15,
       height: 250,
       justifyContent: "space-between",
       marginBlock: 5
    },
    scroll: {
        backgroundColor: "rgba(233, 233, 233, 1)",
        borderRadius: 40,
        overflow: "hidden",
        height: "85%",
    },
    tirage: {
        flexDirection: "row",
             flexWrap: "wrap",
              backgroundColor: "rgba(233, 233, 233, 1)",
              justifyContent: "center",
              padding: 15,
              borderRadius: 20,
              gap: 5
    },
    selected: {
        width: 50,
        height: 50,
        objectFit: "contain"

    },
    unselected: {
width: 50,
        height: 50,
        objectFit: "contain",
        opacity: 0.35
    },
    adversaires: {
        width: 40,
        height: 40,
        objectFit: "contain"
    }
})

export default Ldc2025