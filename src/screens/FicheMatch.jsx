import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import Details from "../components/Details.jsx";
import Compositions from '../components/Compositions.jsx';
import Evenements from '../components/Evenements.jsx';
import subst from "../assets/sub.png";
import redcard from "../assets/redcard.png";
import Affiche from '../components/Affiche.jsx';
import Precedent from '../components/Precedent.jsx';
import Schema from '../components/Schema.jsx';

const FicheMatch = () => {
    const [match, setMatch] = useState(null);
    const [live, setLive] = useState(false);
    const [details, setDetails] = useState(true);
    const [compos, setCompos] = useState(false);
    const [selected, setSelected] = useState(true);
    const [selected2, setSelected2] = useState(false);
    const [selected3, setSelected3] = useState(false);
    const [homeStats, setHomeStats] = useState(null);
    const [extStats, setExtStats] = useState(null);

    const route = useRoute();
    const { id } = route.params;
    const leagueMatch = match?.league?.id;
    const homeId = match?.teams?.home?.id;
    const extId = match?.teams?.away?.id;

    const openDetails = () => {
        setDetails(true);
        setLive(false);
        setCompos(false);
        setSelected(true);
        setSelected2(false);
        setSelected3(false);
    };

    const openCompos = () => {
        setCompos(true);
        setLive(false);
        setDetails(false);
        setSelected(false);
        setSelected2(true);
        setSelected3(false);
    };

    const openLive = () => {
        setLive(true);
        setCompos(false);
        setDetails(false);
        setSelected(false);
        setSelected2(false);
        setSelected3(true);
    };

    useEffect(() => {
        // Fetch match details
        fetch(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                "x-rapidapi-host": "v3.football.api-sports.io",
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.response && result.response[0]) {
                    setMatch(result.response[0]);
                }
            })
            .catch((error) => { 
                console.error(error);
                setMatch(null);  // In case of an error, set match to null
            });
    }, [id]);

    useEffect(() => {
        if (!homeId || !leagueMatch) return;

        // Fetch home team statistics
        fetch(`https://v3.football.api-sports.io/teams/statistics?season=2024&team=${homeId}&league=${leagueMatch}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setHomeStats(json.response);
            })
            .catch(err => {
                console.log(err);
            });
    }, [homeId, leagueMatch]);

    useEffect(() => {
        if (!extId || !leagueMatch) return;

        // Fetch away team statistics
        fetch(`https://v3.football.api-sports.io/teams/statistics?season=2024&team=${extId}&league=${leagueMatch}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setExtStats(json.response);
            })
            .catch(err => {
                console.log(err);
            });
    }, [extId, leagueMatch]);

    if (!match) {
        return <Text>Loading match info...</Text>;
    }


    const round = match.league.round;
    const roundd = round.slice(round.length - 2);
    const date = new Date(match.fixture.date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    const formattedHour = `${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;

    const buteurs = match.events.filter((element) => element.type === "Goal");
    const buteurHome = buteurs.filter((buteur) => buteur.team.name === match.teams.home.name);
    const buteurExt = buteurs.filter((buteur) => buteur.team.name === match.teams.away.name);

    // PARTIE FICHE EQUIPE

    const formeHome = homeStats?.form?.slice(homeStats.form.length - 5, homeStats.form.length)
    const formeExt = extStats?.form?.slice(extStats.form.length - 5, extStats.form.length)

    const totalMatchsHome = homeStats?.fixtures.played.total
    const totalMatchsExt = extStats?.fixtures.played.total
    //PARTIE DETAILS

const stats = match.statistics.filter((element)=>
    element.statistics
    )
    
    const statss = stats.map((element)=>
    element.statistics )
    
    const poss = statss.map((element) => 
    element.filter((element)=> element.type === "Ball Possession"))
    
    const xg = statss.map((element) => 
        element.filter((element)=> element.type === "expected_goals"))
    
    const tirs = statss.map((element) => 
        element.filter((element)=> element.type === "Total Shots"))
    
    const tirsCadres = statss.map((element) => 
        element.filter((element)=> element.type === "Shots on Goal"))
    
    const jaune = statss.map((element) => 
        element.filter((element)=> element.type === "Yellow Cards"))
    
    const rouge = statss.map((element) => 
        element.filter((element)=> element.type === "Red Cards"))
    
    const passes = statss.map((element) => 
        element.filter((element)=> element.type === "Total passes"))
    
    const passesReussies = statss.map((element) => 
        element.filter((element)=> element.type === "Passes accurate"))
    
    const accuracy = statss.map((element) => 
        element.filter((element)=> element.type === "Passes %"))
    
    // PARTIE COMPOS
    
    const compoDom = match.lineups && match.lineups[0];
const compoExt = match.lineups && match.lineups[1];
    
const coachDom = compoDom ? compoDom.coach?.name : 'Unknown'; // Utilisation de l'opérateur de chaînage optionnel (?.)
const coachExt = compoExt ? compoExt.coach?.name : 'Unknown'; 

const colors = {
    primaryDom : match.lineups[0]?.team.colors.player.primary,
    primaryExt : match.lineups[1]?.team.colors.player.primary,
    borderDom : match.lineups[0]?.team.colors.player.border,
    borderExt : match.lineups[1]?.team.colors.player.border,
    numberDom: match.lineups[0]?.team.colors.player.number,
    numberExt : match.lineups[1]?.team.colors.player.number,
    goalDom : match.lineups[0]?.team.colors.goalkeeper.primary,
    goalExt : match.lineups[1]?.team.colors.goalkeeper.primary,
    goalDomBorder : match.lineups[0]?.team.colors.goalkeeper.border,
    goalExtBorder : match.lineups[1]?.team.colors.goalkeeper.border,
    goalDomNumber : match.lineups[0]?.team.colors.goalkeeper.number,
    goalDomExt : match.lineups[1]?.team.colors.goalkeeper.number

}

console.log (colors.primaryDom)

if (!compoDom || !compoExt) {
    return (
    <ScrollView contentContainerStyle={styles.bloc}>
    <Precedent />
    <Affiche match={match} roundd={roundd} buteurHome={buteurHome} buteurExt={buteurExt} formeHome={formeHome} formeExt={formeExt}/>
    </ScrollView>
    )
}
    
    const systemeDom = compoDom.formation
    const systemeExt = compoExt.formation

    if (match.players.length === 0) {
        return (
            <ScrollView contentContainerStyle={styles.bloc}>
            <Precedent />
            <Affiche match={match} roundd={roundd} buteurHome={buteurHome} buteurExt={buteurExt}/>
            </ScrollView>
            )
    }
    
    
    const tituDom = match.players && match?.players[0]?.players.slice(0, 11)
    const tituExt = match.players && match?.players[1]?.players.slice(0, 11)
    
    const substituteDom = match?.players[0]?.players.slice(11, match.players[0].players.length)
    const substituteExt = match?.players[1]?.players.slice(11, match.players[1].players.length)
    
    const remplacement = match.events.filter((element)=>
    element.detail.indexOf( "Substitution"))
    
    console.log(remplacement)
    
    console.log(substituteDom)
    
    
    console.log(tituDom)
    console.log(match)

    return (
        <ScrollView contentContainerStyle={styles.bloc}>
            <Precedent />
            <Affiche match={match} roundd={roundd} buteurHome={buteurHome} buteurExt={buteurExt} formeHome={formeHome} formeExt={formeExt}/>
            <View style={styles.section}>
                {/* Your existing JSX */}
                <View style={styles.ficheSelecteur}>
                    <TouchableOpacity onPress={openDetails}>
                        <Text style={selected ? styles.selectedTab : styles.tab}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openCompos} style={{}}>
                        <Text style={selected2 ? styles.selectedTab : styles.tab}>Compos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openLive}>
                        <Text style={selected3 ? styles.selectedTab : styles.tab}>Live</Text>
                    </TouchableOpacity>
                </View>
                {details && match && <Details match={match} possession={poss} expectedGoals={xg} tirs={tirs} tirsCadres={tirsCadres} jaune={jaune} rouge={rouge} passes={passes} passesReussies={passesReussies} accuracy={accuracy}/>}
                {compos && <Compositions match={match} titulairesDom={tituDom} titulairesExt={tituExt} coachDom={coachDom} coachExt={coachExt} systemeDom={systemeDom} systemeExt={systemeExt} substituteDom={substituteDom} substituteExt={substituteExt} compoDom={compoDom} compoExt={compoExt} colors={colors}/>}
                {live && <Evenements match={match} />}

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bloc: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
    },
    section: {
        width: '100%',
        alignItems: 'center',
    },
    ligue: {
        marginBottom: 10,
    },
    datelieu: {
        alignItems: 'center',
        marginBottom: 10,
    },
    affiche: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4682b4',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: '90%',
    },
    domicile: {
        alignItems: 'center',
    },
    teamLogo: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
    },
    score: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
    },
    exterieur: {
        alignItems: 'center',
    },
    buts: {
        width: '90%',
        marginBottom: 10,
    },
    buteurText: {
        fontSize: 16,
        marginBottom: 5,
    },
    ficheSelecteur: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: "center",
        gap: 8
    
    },
    tab: {
        fontSize: 18,
        color: 'black',
        backgroundColor: "lightgrey",
        width: 85,
        height: 40,
        textAlign: "center",
        paddingTop: 7,
        fontFamily: "Kanitus",
        borderRadius: 5
    },
    selectedTab: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: '#007BFF',
        width: 85,
        height: 40,
        textAlign: "center",
        paddingTop: 7,
        fontFamily: "Kanito",
        borderRadius: 5,
        shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 }, // Ombre décalée sur l'axe Y
    shadowOpacity: 0.3, // Opacité de l'ombre
    shadowRadius: 3.5, // Rayon de l'ombre (flou)
    },
});

export default FicheMatch;