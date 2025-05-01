import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet,  Image } from 'react-native';
import Details from "../components/Details.jsx";
import Compositions from '../components/Compositions.jsx';
import Evenements from '../components/Evenements.jsx';
import Affiche from '../components/Affiche.jsx';
import Precedent from '../components/Precedent.jsx';
import { useNavigation } from '@react-navigation/native';
import Classement from"../components/Classement.jsx";
import { LinearGradient } from 'expo-linear-gradient';
import Histo from '../components/Histo.jsx';
import Schema from '../components/Schema.jsx';
import SchemaAvance from '../components/SchemaAvance.jsx';
import Indisponibles from "../components/Indisponibles.jsx"


const FicheMatch = () => {
    const [match, setMatch] = useState(null);
    const [live, setLive] = useState(false);
    const [details, setDetails] = useState(true);
    const [compos, setCompos] = useState(false);
    const [compos2, setCompos2] = useState(true);
    const [apercu, setApercu] = useState(true)

    const [injuries, setInjuries] = useState([]);

    const [coachDomicile, setCoachDom] = useState()
    const [classement, setClassement] = useState(false);
    const [histo, setHisto] = useState(false);
    const [histo2, setHisto2] = useState(false);

    const [historique, setHistorique] = useState(null)

    const [selected, setSelected] = useState(true);
    const [selected2, setSelected2] = useState(false);
    const [selected3, setSelected3] = useState(false);
    const [selected4, setSelected4] = useState(false);
    const [selected5, setSelected5] = useState(false);
    const [selected6, setSelected6] = useState(false);
    const [selected7, setSelected7] = useState(true);
    const [selected8, setSelected8] = useState(true);
    const [selected9, setSelected9] = useState(false);




    const [homeStats, setHomeStats] = useState(null);
    const [extStats, setExtStats] = useState(null);
    
    const route = useRoute();
    const { id } = route.params;
    const leagueMatch = match?.league?.id;
    const homeId = match?.teams?.home?.id;
    const extId = match?.teams?.away?.id;

    // Fetch match details
    useEffect(() => {
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
                setMatch(null);
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

    useEffect(() => {

        // Fetch head-to-head history
        fetch(`https://v3.football.api-sports.io/fixtures/headtohead?h2h=${homeId}-${extId}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                "x-rapidapi-host": "v3.football.api-sports.io",
            }
        })
            .then((response) => response.json())
            .then((result) => {
                
                    setHistorique(result.response);
            })
            .catch((error) => { 
                console.error(error);
                setHistorique(null)
            });
    }, [homeId, extId]);


    

    console.log(historique)

    // Fetch injuries
    useEffect(() => {
        fetch(`https://v3.football.api-sports.io/injuries?fixture=${id}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
                "x-rapidapi-host": "v3.football.api-sports.io",
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.response && result.response[0]) {
                    setInjuries(result.response);
                }
            })
            .catch((error) => { 
                console.error(error);
                setInjuries(null);
            });
    }, [id]);

console.log(injuries)


    // Logic for switching between tabs
    const openDetails = () => {
        setDetails(true);
        setLive(false);
        setCompos(false);
        setHisto(false);
        setClassement(false);
        setSelected(true);
        setSelected2(false);
        setSelected3(false);
        setSelected4(false);
        setSelected5(false);
        setSelected8(false)
        setApercu(false)
    };

    const openCompos = () => {
        setCompos(true);
        setCompos2(true);

        setLive(false);
        setDetails(false);
        setHisto(false);
        setClassement(false);
        setSelected(false);
        setSelected2(true);
        setSelected3(false);
        setSelected4(false);
        setSelected5(false);
        setSelected7(true);
        setSelected8(false)
        setSelected9(false)

        setApercu(false)

    };

    const openLive = () => {
        setLive(true);
        setCompos(false);
        setCompos2(false);

        setDetails(false);
        setHisto(false);
        setClassement(false);
        setSelected(false);
        setSelected2(false);
        setSelected3(true);
        setSelected4(false);
        setSelected5(false);
        setSelected7(false);

        setSelected8(false)
        setSelected9(false)

        setApercu(false)
    };


    const openHisto = () => {
        setLive(false);
        setCompos(false);
        setDetails(false);
        setHisto(true);
        setHisto2(true);
        setCompos2(false);

        setClassement(false);
        setSelected(false);
        setSelected2(false);
        setSelected3(false);
        setSelected4(true);
        setSelected5(false);
        setSelected6(true);
        setSelected7(false);
        setSelected8(false)
        setSelected9(false)

        setApercu(false)

    };

    const openClassement = () => {
        setLive(false);
        setCompos(false);
        setCompos2(false);

        setDetails(false);
        setClassement(false);
        setHisto(false);
        setHisto2(false);
        setClassement(true);
        
        setSelected(false);
        setSelected2(false);
        setSelected3(false);
        setSelected4(false);
        setSelected5(true)
        setSelected6(false)
        setSelected7(false);
        setSelected8(false)
        setSelected9(false)

        setApercu(false)


    };

    const openApercu = ()=>{
        setLive(false);
        setCompos(false);
        setCompos2(false);

        setDetails(false);
        setClassement(false);
        setHisto(false);
        setHisto2(false);
        setClassement(false);
        
        setSelected(false);
        setSelected2(false);
        setSelected3(false);
        setSelected4(false);
        setSelected5(false)
        setSelected6(false)
        setSelected7(false);
        setSelected8(true)
        setSelected9(true)

        setApercu(true)
    }

    // If no match data available
    if (!match) {
        return <Text>Loading match info...</Text>;
    }

    if (!historique ) {
        return <Text>Loading match info...</Text>;
    }

    const round = match.league.round;
    const roundd = round.slice(round.length - 2);
    const date = new Date(match.fixture.date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    const formattedHour = `${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;

    const buteurs = match.events.filter((element) => element.type === "Goal" && element.detail != "Missed Penalty");
    const buteursnopen = buteurs.filter((element)=> element.comments != "Penalty Shootout");
    const buteursPen = match.events.filter((element)=> element.comments === "Penalty Shootout");
    const buteurHome = buteursnopen.filter((buteur) => buteur.team.name === match.teams.home.name);
    const buteurExt = buteursnopen.filter((buteur) => buteur.team.name === match.teams.away.name);
    const buteurHomeP = buteursPen.filter((buteur) => buteur.team.name === match.teams.home.name);
    const buteurExtP = buteursPen.filter((buteur) => buteur.team.name === match.teams.away.name);

    const formeHome = homeStats?.form?.slice(homeStats.form.length - 5, homeStats.form.length);
    const formeExt = extStats?.form?.slice(extStats.form.length - 5, extStats.form.length);

    const totalMatchsHome = homeStats?.fixtures?.played.total;
    const totalMatchsExt = extStats?.fixtures?.played.total;

    // Additional logic to manage statistics
    const stats = match.statistics.filter((element) => element.statistics);
    const statss = stats.map((element) => element.statistics);
    
    const poss = statss.map((element) => element.filter((el) => el.type === "Ball Possession"));
    const xg = statss.map((element) => element.filter((el) => el.type === "expected_goals"));
    const tirs = statss.map((element) => element.filter((el) => el.type === "Total Shots"));
    const tirsCadres = statss.map((element) => element.filter((el) => el.type === "Shots on Goal"));
    const jaune = statss.map((element) => element.filter((el) => el.type === "Yellow Cards"));
    const rouge = statss.map((element) => element.filter((el) => el.type === "Red Cards"));
    const corners = statss.map((element) => element.filter((el) => el.type === "Corners"));
    const fautes = statss.map((element) => element.filter((el) => el.type === "Fouls"));
    const passes = statss.map((element) => 
        element.filter((element)=> element.type === "Total passes"))
    
    const passesReussies = statss.map((element) => 
        element.filter((element)=> element.type === "Passes accurate"))
    
    const accuracy = statss.map((element) => 
        element.filter((element)=> element.type === "Passes %"))

    const compoDom = match.lineups && match.lineups[0];
    const compoExt = match.lineups && match.lineups[1];
        
    const coachDom = compoDom ? compoDom.coach?.name : 'Unknown'; // Utilisation de l'opérateur de chaînage optionnel (?.)
    const coachExt = compoExt ? compoExt.coach?.name : 'Unknown';
    const coachDomId = compoDom?.coach?.id
    const coachExtId = compoExt?.coach?.id

    

    
    const colors = {
        primaryDom : match.lineups[0]?.team?.colors?.player?.primary,
        primaryExt : match.lineups[1]?.team?.colors?.player?.primary,
        borderDom : match.lineups[0]?.team?.colors?.player?.border,
        borderExt : match.lineups[1]?.team?.colors?.player?.border,
        numberDom: match.lineups[0]?.team?.colors?.player?.number,
        numberExt : match.lineups[1]?.team?.colors?.player?.number,
        goalDom : match.lineups[0]?.team?.colors?.goalkeeper?.primary,
        goalExt : match.lineups[1]?.team?.colors?.goalkeeper?.primary,
        goalDomBorder : match.lineups[0]?.team?.colors?.goalkeeper?.border,
        goalExtBorder : match.lineups[1]?.team?.colors?.goalkeeper?.border,
        goalDomNumber : match.lineups[0]?.team?.colors?.goalkeeper?.number,
        goalDomExt : match.lineups[1]?.team?.colors?.goalkeeper?.number
    
    }
    
    
    console.log (match)
    

    //LORQUE LES COMPOS SONT DISPONIBLES
    if (match.lineups.length === 2 && match.fixture.status.long === "Not Started") {
        return (
            <View>
                <Precedent />
                <ScrollView contentContainerStyle={styles.bloc}>
                <Affiche match={match} roundd={roundd} buteurHome={buteurHome} buteurExt={buteurExt} buteurHomeP={buteurHomeP} buteurExtP={buteurExtP} formeHome={formeHome} formeExt={formeExt} />
                <View style={{flexDirection: "row", marginBottom: 10}}>
                <TouchableOpacity onPress={openCompos}>
                            <Text style={selected7 ? [styles.selectedTab, {width: 100}] : [styles.tab, {width: 92}]}>Compos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openApercu}>
                            <Text style={selected9 ? [styles.selectedTab, {width: 100}] : [styles.tab, {width: 92}]}>Apercu</Text>
                        </TouchableOpacity>
        <TouchableOpacity onPress={openHisto}>
                            <Text style={selected4 ? [styles.selectedTab, {width: 100}] : [styles.tab, {width: 92}]}>Historique</Text>
                        </TouchableOpacity>
                      { match.league.standings === true ?  <TouchableOpacity onPress={openClassement}>
                            <Text style={selected5 ? [styles.selectedTab, {width: 100}] : [styles.tab, {width: 92}]}>Classement</Text>
                        </TouchableOpacity> : null }
                        </View>
                        {compos2 && <SchemaAvance match={match} compoDom={compoDom} compoExt={compoExt} colors={colors} />}
                        {apercu && <Indisponibles injuries={injuries} match={match} />}
                        {histo && <Histo historique={historique} />}
                        {classement && <Classement id={match.league.id}/>}    

        </ScrollView>
        </View>
        )
    }
        
    //COMPOS NON DISPOS
    if (!compoDom || !compoExt) {
        return (
            <View>
            <Precedent />
    
        <ScrollView contentContainerStyle={styles.bloc}>
        
        <Affiche match={match} roundd={roundd} buteurHome={buteurHome} buteurExt={buteurExt} buteurHomeP={buteurHomeP} buteurExtP={buteurExtP} formeHome={formeHome} formeExt={formeExt} />
        <View style={{flexDirection: "row", marginBottom: 10}}>
        {match.fixture.status.long === "Not Started" ? 
        injuries.length <= 0 ? null :
        <TouchableOpacity onPress={openApercu}>
                            <Text style={selected8 ? [styles.selectedTab, {width: 100}] : [styles.tab, {width: 100}]}>Apercu</Text>
                        </TouchableOpacity> : null }
        <TouchableOpacity onPress={openHisto}>
                            <Text style={selected6 ? [styles.selectedTab, {width: 100}] : [styles.tab, {width: 100}]}>Historique</Text>
                        </TouchableOpacity>
                      { match.league.standings === true ?  <TouchableOpacity onPress={openClassement}>
                            <Text style={selected5 ? [styles.selectedTab, {width: 100}] : [styles.tab, {width: 100}]}>Classement</Text>
                        </TouchableOpacity> : null }
                        </View>
                        {apercu && <Indisponibles injuries={injuries} match={match} />}
                        {histo2 && <Histo historique={historique} />}
                        {classement && <Classement id={match.league.id}/>}       
                         </ScrollView>
        </View>
        )
    }
        
        const systemeDom = compoDom.formation
        const systemeExt = compoExt.formation
    
        if (match.players.length === 0) {
            return (
                <View>
                <Precedent />
                <ScrollView contentContainerStyle={styles.bloc}>
                <Affiche match={match} roundd={roundd} buteurHome={buteurHome} buteurExt={buteurExt} buteurHomeP={buteurHomeP} buteurExtP={buteurExtP} />
                <View style={{flexDirection: "row", marginBottom: 10}}>
                { match.statistics.length > 0 ? <TouchableOpacity onPress={openDetails}>
                            <Text style={selected ? styles.selectedTab : styles.tab}>Details</Text>
                        </TouchableOpacity> : null }
                    {match.lineups.length === 2 ? <TouchableOpacity onPress={openCompos}>
                            <Text style={selected7 ? [styles.selectedTab, {width: 100}] : [styles.tab, {width: 92}]}>Compos</Text>
                        </TouchableOpacity> : null }
                {match.events.length > 0 ? <TouchableOpacity onPress={openLive}>
                            <Text style={selected3 ? styles.selectedTab : styles.tab}>Live</Text>
                        </TouchableOpacity> : null }
                        { match.league.standings === true ?  <TouchableOpacity onPress={openClassement}>
                            <Text style={selected5 ? styles.selectedTab : styles.tab}>Classement</Text>
                        </TouchableOpacity> : null }
                        </View>
                       {match.statistics.length > 0 ?  details && <Details match={match} possession={poss} expectedGoals={xg} tirs={tirs} tirsCadres={tirsCadres} jaune={jaune} rouge={rouge} passes={passes} passesReussies={passesReussies} accuracy={accuracy}/> : null }

                        {compos2 && <SchemaAvance match={match} compoDom={compoDom} compoExt={compoExt} colors={colors} />}

                        {live && <Evenements match={match} />}
                        {classement && <Classement id={match.league.id}/>}

                </ScrollView>
                </View>
                )
        }

        
        
        const tituDom = match.players && match?.players[0]?.players.slice(0, 11)
        const tituExt = match.players && match?.players[1]?.players.slice(0, 11)
        
        const substituteDom = match?.players[0]?.players.slice(11, match.players[0].players.length)
        const substituteExt = match?.players[1]?.players.slice(11, match.players[1].players.length)
        
        const remplacement = match.events.filter((element)=>
        element.detail.indexOf( "Substitution"))


    return (
        <View>
            <Precedent />
            <ScrollView contentContainerStyle={styles.bloc}>
                <Affiche match={match} roundd={roundd} homeStats={homeStats} extStats={extStats} buteurHome={buteurHome} buteurExt={buteurExt} buteurHomeP={buteurHomeP} buteurExtP={buteurExtP} />
                <View style={styles.section}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ficheSelecteur}>
                        <TouchableOpacity onPress={openDetails}>
                            <Text style={selected ? styles.selectedTab : styles.tab}>Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openCompos}>
                            <Text style={selected2 ? styles.selectedTab : styles.tab}>Compos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openLive}>
                            <Text style={selected3 ? styles.selectedTab : styles.tab}>Live</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={openHisto}>
                            <Text style={selected4 ? styles.selectedTab : styles.tab}>Historique</Text>
                        </TouchableOpacity>
                      { match.league.standings === true ?  <TouchableOpacity onPress={openClassement}>
                            <Text style={selected5 ? styles.selectedTab : styles.tab}>Classement</Text>
                        </TouchableOpacity> : null }
                    </ScrollView>

                    {details && match && <Details match={match} possession={poss} expectedGoals={xg} tirs={tirs} tirsCadres={tirsCadres} jaune={jaune} rouge={rouge} passes={passes} passesReussies={passesReussies} accuracy={accuracy}/>}
                {compos && <Compositions match={match} titulairesDom={tituDom} titulairesExt={tituExt} coachDom={coachDom} coachExt={coachExt} coachDomId={coachDomId} coachExtId={coachExtId} systemeDom={systemeDom} systemeExt={systemeExt} substituteDom={substituteDom} substituteExt={substituteExt} compoDom={compoDom} compoExt={compoExt} colors={colors} homeId={homeId} extId={extId}/>}
                {live && <Evenements match={match} />}
                {histo && <Histo historique={historique} />}
                {classement && <Classement id={match.league.id}/>}


                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    bloc: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 40,
        paddingBottom: 50
    },
    section: {
        width: '100%',
        alignItems: 'center',
    },
    ficheSelecteur: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingBlock: 15
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
        marginInline: 4
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
        shadowOpacity: 0.3,
        shadowRadius: 3.5,
        fontFamily: "Kanito", 
        elevation: 5,
        marginInline: 4

    },
    match: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBlock: 8,
        width: "100%",
      },
      dateheure: {
        flex: 1,
        alignItems: 'flex-start',
        width: "12%",
        backgroundColor: "black",
        borderRadius: 5,
        marginLeft: 2,
        alignItems: "center",
      },
      equipeDom: {
        fontSize: 12,
        width: "27%",
    textAlign: "center",
    fontFamily: "Kanito"
    
      },
      logoDom: {
        width: "9%",
        height: 30,
        marginRight: 10,
        objectFit: "contain"
      },
      matchScore: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        width: "14%",
        justifyContent: "space-evenly"
      },
      nul: {
        fontSize: 16,
        backgroundColor: 'gray',
        color: "white",
        height: 25,
        width: 20,
        borderRadius: 5,
        textAlign: "center",
        fontFamily: "Kanito"
    
      },
      winner: {
        fontSize: 16,
        backgroundColor: '#32b642',
        color: "white",
        height: 25,
        width: 20,
        borderRadius: 5,
        textAlign: "center",
        fontFamily: "Kanito"
    
      },
      looser: {
        fontSize: 16,
        backgroundColor: 'red',
        color: "white",
        height: 25,
        width: 20,
        borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanito"
    
      },
      logoExt: {
        width: "9%",
        height: 30,
        marginLeft: 10,
        objectFit: "contain",
      },
      equipeExt: {
        fontSize: 12,
        width: "28%",
    textAlign: "center",
    fontFamily: "Kanito"
    },
    
});

export default FicheMatch;