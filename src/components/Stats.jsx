import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native"
import { useState, useEffect } from "react";
import { teamName } from "../datas/teamNames";
import warning from "../assets/warning.png"

function Stats({match}){

      const [statsHome, setStatsHome] = useState();
        const [statsExt, setStatsExt] = useState();


          useEffect(() => {
        
        fetch(`https://v3.football.api-sports.io/teams/statistics?season=2025&team=${match.teams.home.id}&league=${match.league.id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setStatsHome(json.response);
      })
      .catch(err => {
        console.log(err);
      });
  }, [match.fixture.id]);

  useEffect(() => {
        
        fetch(`https://v3.football.api-sports.io/teams/statistics?season=2025&team=${match.teams.away.id}&league=${match.league.id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setStatsExt(json.response);
      })
      .catch(err => {
        console.log(err);
      });
  }, [match.fixture.id]);
      
    
console.log(statsHome)
console.log(statsExt)

if(!statsHome || !statsExt){
    return (
        <ActivityIndicator />
    )
}

    return (
        <View style={styles.container}>


            {statsHome.fixtures.loses.total === 0 && statsHome.fixtures.played.total > 1 ? 
            statsHome.fixtures.wins.total === statsHome.fixtures.played.total ? 
            <Text style={{fontFamily: "Bangers", color: "darkblue", paddingInline: 1, textAlign: "center", marginBlock: 3}}>{teamName[statsHome.team.name] || statsHome.team.name} a gagné tous ses matchs en {statsHome.league.id === 6 ? "Coupe d'Afrique des Nations" : statsHome.league.name} cette saison</Text>
            :
                         <View style={{marginBlock: 5}}>
            <Text style={{fontFamily: "Bangers", color: "darkblue", paddingInline: 1, textAlign: "center", marginBlock: 2}}>{teamName[statsHome.team.name] || statsHome.team.name} n'a jamais perdu en {statsHome.league.id === 6 ? "Coupe d'Afrique des Nations" : statsHome.league.name} cette saison</Text>
                          <Text style={{fontFamily: "Bangers", color: "darkblue", paddingInline: 1, textAlign: "center"}}>({statsHome.fixtures.wins.home} {statsHome.fixtures.wins.home === 1 ? "victoire" : "victoires"} - {statsHome.fixtures.draws.home} {statsHome.fixtures.draws.home === 1 ? "nul" : "nuls"})</Text>
</View>
             : 
             null}

             {statsHome.fixtures.loses.home === 0 && statsHome.fixtures.loses.total != 0 && statsHome.league.id != 6 ? 
             <View style={{marginBlock: 5, alignItems: "center"}}>
                <Image source={warning} style={{height: 40, width: 40}}/>
            <Text style={{fontFamily: "Bangers", color: "darkblue", paddingInline: 1, textAlign: "center", marginBlock: 2}}>{teamName[statsHome.team.name] || statsHome.team.name} n'a jamais perdu a domicile en {statsHome.league.id === 6 ? "Coupe d'Afrique des Nations" : statsHome.league.name} cette saison</Text>
             <Text style={{fontFamily: "Bangers", color: "darkblue", paddingInline: 1, textAlign: "center"}}>({statsHome.fixtures.wins.home} {statsHome.fixtures.wins.home === 1 ? "victoire" : "victoires"} - {statsHome.fixtures.draws.home} {statsHome.fixtures.draws.home === 1 ? "nul" : "nuls"})</Text>
             </View>
             : 
             null}

             {statsHome.failed_to_score.total === 0 && statsHome.fixtures.played.total > 1 ? 
             <Text style={{fontFamily: "Bangers", color: "darkblue", textAlign: "center", paddingInline: 1, textAlign: "center", marginBlock: 3}}>{teamName[statsHome.team.name] || statsHome.team.name} a marqué dans tous ses matchs de {statsHome.league.id === 6 ? "Coupe d'Afrique des Nations" : statsHome.league.name} cette saison</Text>
            : null
            }

            {statsExt.failed_to_score.total === 0 && statsExt.fixtures.played.total > 1 ? 
             <Text style={{fontFamily: "Bangers", color: "rgba(90, 90, 90, 1)", textAlign: "center", paddingInline: 1, textAlign: "center", marginBlock: 3}}>{teamName[statsExt.team.name] || statsExt.team.name} a marqué dans tous ses matchs de {statsExt.league.id === 6 ? "Coupe d'Afrique des Nations" : statsExt.league.name} cette saison</Text>
            : null
            }


{statsExt.fixtures.loses.total === 0 && statsExt.fixtures.played.total > 1 ? 
            statsExt.fixtures.wins.total === statsExt.fixtures.played.total ? 
            <Text style={{fontFamily: "Bangers", color: "rgba(90, 90, 90, 1)", paddingInline: 1, textAlign: "center", marginBlock: 3}}>{teamName[statsExt.team.name] || statsExt.team.name} a gagné tous ses matchs en {statsExt.league.id === 6 ? "Coupe d'Afrique des Nations" : statsExt.league.name} cette saison</Text>
            :
            <Text style={{fontFamily: "Bangers", color: "rgba(90, 90, 90, 1)", paddingInline: 1, textAlign: "center", marginBlock: 3}}>{teamName[statsExt.team.name] || statsExt.team.name} n'a jamais perdu en {statsExt.league.id === 6 ? "Coupe d'Afrique des Nations" : statsExt.league.name} cette saison</Text>
             : 
             null}

            {statsExt.fixtures.wins.away === 0 && statsExt.fixtures.played.total > 1 && statsExt.league.id != 6 ? 
                         <View style={{marginBlock: 5}}>
            <Text style={{fontFamily: "Bangers", color: "rgba(90, 90, 90, 1)", paddingInline: 1, textAlign: "center", marginBlock: 2}}>{teamName[statsExt.team.name] || statsExt.team.name} n'a jamais gagné à l'exterieur en {statsExt.league.id === 6 ? "Coupe d'Afrique des Nations" : statsExt.league.name} cette saison</Text>
                         <Text style={{fontFamily: "Bangers", color: "rgba(90, 90, 90, 1)", paddingInline: 1, textAlign: "center"}}>({statsExt.fixtures.loses.away} {statsExt.fixtures.loses.away === 1 ? "defaite" : "defaites"} - {statsExt.fixtures.draws.away} {statsExt.fixtures.draws.away === 1 ? "nul" : "nuls"})</Text>
</View> 
             : 
             null}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 4,
        marginBlock: 5,
        paddingTop: 5
    }
})
export default Stats