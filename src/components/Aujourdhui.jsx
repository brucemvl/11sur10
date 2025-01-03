import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ligue1 from "../assets/logoligue1.webp"
import { useNavigation } from '@react-navigation/native';

function Aujourdhui() {


  const navigation = useNavigation()
  const [hier, setHier] = useState(false)
  const [aujourdhui, setAujourdhui] = useState(true)
  const [demain, setDemain] = useState(false)

  

  const [matchsEngland, setMatchsEngland] = useState([]);
  const [matchsSpain, setMatchsSpain] = useState([]);
  const [matchsFrance, setMatchsFrance] = useState([]);
  const [matchsUcl, setMatchsUcl] = useState([]);
  const [matchsGer, setMatchsGer] = useState([]);
  const [matchsItaly, setMatchsItaly] = useState([]);
  const [matchsCdf, setMatchsCdf] = useState([])

  useEffect(() => {
    const fetchUcl = () => {
      try {
        fetch("https://v3.football.api-sports.io/fixtures?league=2&season=2024", {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          }
        })
          .then((response) => response.json())
          .then((json) => {

            setMatchsUcl(json.response)

          })

      }
      catch (error) {
        null
      }
    };
    fetchUcl();
  }, []

  )

  useEffect(() => {
    const fetchFrance = () => {
      try {
        fetch("https://v3.football.api-sports.io/fixtures?league=61&season=2024", {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          }
        })
          .then((response) => response.json())
          .then((json) => {

            setMatchsFrance(json.response)

          })

      }
      catch (error) {
        null
      }
    };
    fetchFrance();
  }, []

  )


  useEffect(() => {
    const fetchEngland = () => {
      try {
        fetch("https://v3.football.api-sports.io/fixtures?league=39&season=2024", {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          }
        })
          .then((response) => response.json())
          .then((json) => {

            setMatchsEngland(json.response)

          })

      }
      catch (error) {
        null
      }
    };
    fetchEngland();
  }, []

  )

  useEffect(() => {
    const fetchSpain = () => {
      try {
        fetch("https://v3.football.api-sports.io/fixtures?league=140&season=2024", {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          }
        })
          .then((response) => response.json())
          .then((json) => {

            setMatchsSpain(json.response)

          })

      }
      catch (error) {
        null
      }
    };
    fetchSpain();
  }, []

  )

  useEffect(() => {
    const fetchGer = () => {
      try {
        fetch("https://v3.football.api-sports.io/fixtures?league=78&season=2024", {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          }
        })
          .then((response) => response.json())
          .then((json) => {

            setMatchsGer(json.response)

          })

      }
      catch (error) {
        null
      }
    };
    fetchGer();
  }, []

  )

  useEffect(() => {
    const fetchItaly = () => {
      try {
        fetch("https://v3.football.api-sports.io/fixtures?league=135&season=2024", {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          }
        })
          .then((response) => response.json())
          .then((json) => {

            setMatchsItaly(json.response)

          })

      }
      catch (error) {
        null
      }
    };
    fetchItaly();
  }, []

  )

  useEffect(() => {
    const fetchCdf = () => {
      try {
        fetch("https://v3.football.api-sports.io/fixtures?league=66&season=2024", {
          method: "GET",
          headers: {
            "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
            "x-rapidapi-host": "v3.football.api-sports.io",
          }
        })
          .then((response) => response.json())
          .then((json) => {

            setMatchsCdf(json.response)

          })

      }
      catch (error) {
        null
      }
    };
    fetchCdf();
  }, []

  )

  

  const matchs = [...matchsUcl, ...matchsFrance, ...matchsEngland, ...matchsSpain, ...matchsGer, ...matchsItaly, ...matchsCdf]

  const [selectedDate, setSelectedDate] = useState("AUJOURDHUI");


  const today = new Date().toISOString().slice(0, 10); // Date du jour au format YYYY-MM-DD
  console.log(today)

  const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
// Soustrait 1 jour à la date d'aujourd'hui
const yesterdayDate = yesterday.toISOString().slice(0, 10); // Formate la date au format YYYY-MM-DD
console.log(yesterdayDate);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
// Soustrait 1 jour à la date d'aujourd'hui
const tomorrowDate = tomorrow.toISOString().slice(0, 10); // Formate la date au format YYYY-MM-DD
console.log(tomorrowDate);

  const todayMatch = matchs.filter((match) => {
    const matchDate = match.fixture.date.slice(0, 10);
    return matchDate === today;
  });

  const yesterdayMatch = matchs.filter((match) => {
    const matchDate = match.fixture.date.slice(0, 10);
    return matchDate === yesterdayDate;
  })

  const tomorrowMatch = matchs.filter((match) => {
    const matchDate = match.fixture.date.slice(0, 10);
    return matchDate === tomorrowDate;
  })

  const leagues = [... new Set(todayMatch.map((element) => element.league.name))]
  console.log(leagues)

  const yesterdayLeagues = [... new Set(yesterdayMatch.map((element) => element.league.name))]

  const tomorrowLeagues = [... new Set(tomorrowMatch.map((element) => element.league.name))]

  const handlePrevious = () => {
    if (selectedDate === "AUJOURDHUI") {
      setSelectedDate("HIER");
      setHier(true)
      setAujourdhui(false)
      setDemain(false)
    } else if (selectedDate === "HIER") {
      null
    } else if (selectedDate === "DEMAIN") {
      setSelectedDate("AUJOURDHUI");
      setAujourdhui(true)
      setDemain(false)
      setHier(false)
    }
  };

  // Fonction de navigation vers la date suivante (demain)
  const handleNext = () => {
    if (selectedDate === "AUJOURDHUI") {
      setSelectedDate("DEMAIN");
      setDemain(true)
      setAujourdhui(false)
      setHier(false)
    } else if (selectedDate === "HIER") {
      setSelectedDate("AUJOURDHUI");
      setAujourdhui(true)
      setHier(false)
      setDemain(false)
    } else if (selectedDate === "DEMAIN") {
       
    }
  };

  console.log(todayMatch)
  console.log(tomorrowMatch)
  const formatDateAndTime = (dateString) => {
    const matchDate = new Date(dateString);
    const formattedDate = `${matchDate.getDate().toString().padStart(2, '0')}/${(matchDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;
    const formattedHour = `${matchDate.getHours().toString().padStart(2, '0')}h${matchDate.getMinutes()
      .toString()
      .padStart(2, '0')}`;
    return { formattedDate, formattedHour };
  };

  return (
    todayMatch.length <= 0 ? <LinearGradient colors={["rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={styles.today}>
    { selectedDate === "DEMAIN" ? <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
    <TouchableOpacity onPress={handlePrevious} style={styles.arrow}>
      <Text style={{color: "white", fontFamily: "Kanitt"}}>{"<"}</Text>
    </TouchableOpacity>

    <LinearGradient
      colors={['rgba(3, 42, 176, 100)', 'rgba(39, 54, 50, 75)']}
      style={styles.titre}
    >
      <Text style={styles.titreToday}>
        {selectedDate}
      </Text>
    </LinearGradient>

    <TouchableOpacity style={{width: 30}}>
      
    </TouchableOpacity>

    </View> :
    selectedDate === "HIER" ? <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
    <TouchableOpacity style={{width: 30}}>
      
      </TouchableOpacity>

    <LinearGradient
      colors={['rgba(3, 42, 176, 100)', 'rgba(39, 54, 50, 75)']}
      style={styles.titre}
    >
      <Text style={styles.titreToday}>
        {selectedDate}
      </Text>
    </LinearGradient>

    <TouchableOpacity onPress={handleNext} style={styles.arrow}>
      <Text style={{color: "white", fontFamily: "Kanitt"}}>{">"}</Text>
    </TouchableOpacity>

    </View> :
    <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
    <TouchableOpacity onPress={handlePrevious} style={styles.arrow}>
      <Text style={{color: "white", fontFamily: "Kanitt"}}>{"<"}</Text>
    </TouchableOpacity>

    <LinearGradient
      colors={['rgba(3, 42, 176, 100)', 'rgba(39, 54, 50, 75)']}
      style={styles.titre}
    >
      <Text style={styles.titreToday}>
        {selectedDate}
      </Text>
    </LinearGradient>

    <TouchableOpacity onPress={handleNext} style={styles.arrow}>
      <Text style={{color: "white", fontFamily: "Kanitt"}}>{">"}</Text>
    </TouchableOpacity>

    </View>}
{ hier && <ScrollView style={styles.liveTableau}>
      {yesterdayLeagues.map((league) => <View style={{ marginBlock: 5 }}>
        <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
        {yesterdayMatch.map((element) => element.league.name === league ?
          
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}  // Naviguer vers la fiche du match
            >
              <View style={styles.match}>

                {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
                  source={ligue1}
                  style={styles.matchCompetition}
                  resizeMode="contain"
                /> :
                  <Image
                    source={{ uri: element.league.logo }}
                    style={styles.matchCompetition}
                    resizeMode="contain"
                  />}

                <Text style={styles.matchEquipeDom}>{element.teams.home.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.home.name === "Nottingham Forest" ? "Nottingham F." : element.teams.home.name === "Paris Saint Germain" ? "Paris SG" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name}</Text>
                <Image style={styles.matchLogoDom} source={{ uri: element.teams.home.logo }} />

                {element.goals.home === element.goals.away ? (
                  <View style={styles.matchScore}>
                    <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text>
                    <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>
                  </View>
                ) : (
                  <View style={styles.matchScore}>
                    <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                    <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                  </View>
                )}

                <Image style={styles.matchLogoExt} source={{ uri: element.teams.away.logo }} />
                <Text style={styles.matchEquipeExt}>{element.teams.away.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.away.name === "Nottingham Forest" ? "Nottingham F." : element.teams.away.name === "Paris Saint Germain" ? "Paris SG" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name}</Text>
              </View>
            </TouchableOpacity>
            : null
        )}
      </View>)
      }
    </ScrollView> }
    {aujourdhui &&
      <Text style={styles.nomatch}>Pas de match aujourdhui</Text>
}
{demain && <ScrollView style={styles.liveTableau}>
      
{tomorrowLeagues.map((league) => <View style={{ marginBlock: 5 }}>
        <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
        {tomorrowMatch.map((element) => element.league.name === league ?
          
            <TouchableOpacity
              key={element.fixture.id}
              style={styles.link}
              onPress={() => { navigation.navigate("FicheMatch", { id: element.fixture.id }) }}
            >
              <View style={styles.match}>
                {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
                  source={ligue1}
                  style={styles.matchCompetition}
                  resizeMode="contain"
                /> :
                  <Image
                    source={{ uri: element.league.logo }}
                    style={styles.matchCompetition}
                    resizeMode="contain"
                  />}                                    <Text style={styles.matchEquipeDom}>{element.teams.home.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.home.name === "Nottingham Forest" ? "Nottingham F." : element.teams.home.name === "Paris Saint Germain" ? "Paris SG" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name}</Text>
                <Image source={{ uri: element.teams.home.logo }} style={styles.matchLogoDom} />
                <Text style={{ marginInline: 4 }}>-</Text>
                <Image source={{ uri: element.teams.away.logo }} style={styles.matchLogoExt} />
                <Text style={styles.matchEquipeExt}>{element.teams.away.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.away.name === "Nottingham Forest" ? "Nottingham F." : element.teams.away.name === "Paris Saint Germain" ? "Paris SG" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name}</Text>
                <View style={styles.rdv}>
                  <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedDate}</Text>
                  <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedHour}</Text>
                </View>
              </View>
            </TouchableOpacity> : null
        )}
      </View>)
      }
    </ScrollView> }


  </LinearGradient> :
    <LinearGradient colors={["rgb(176, 196, 222)", 'rgba(0, 0, 0, 0.35)']} style={styles.today}>
      { selectedDate === "DEMAIN" ? <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
      <TouchableOpacity onPress={handlePrevious} style={styles.arrow}>
        <Text style={{color: "white", fontFamily: "Kanitt"}}>{"<"}</Text>
      </TouchableOpacity>

      <LinearGradient
        colors={['rgba(3, 42, 176, 100)', 'rgba(39, 54, 50, 75)']}
        style={styles.titre}
      >
        <Text style={styles.titreToday}>
          {selectedDate}
        </Text>
      </LinearGradient>

      <TouchableOpacity style={{width: 30}}>
        
      </TouchableOpacity>

      </View> :
      selectedDate === "HIER" ? <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
      <TouchableOpacity style={{width: 30}}>
        
        </TouchableOpacity>

      <LinearGradient
        colors={['rgba(3, 42, 176, 100)', 'rgba(39, 54, 50, 75)']}
        style={styles.titre}
      >
        <Text style={styles.titreToday}>
          {selectedDate}
        </Text>
      </LinearGradient>

      <TouchableOpacity onPress={handleNext} style={styles.arrow}>
        <Text style={{color: "white", fontFamily: "Kanitt"}}>{">"}</Text>
      </TouchableOpacity>

      </View> :
      <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
      <TouchableOpacity onPress={handlePrevious} style={styles.arrow}>
        <Text style={{color: "white", fontFamily: "Kanitt"}}>{"<"}</Text>
      </TouchableOpacity>

      <LinearGradient
        colors={['rgba(3, 42, 176, 100)', 'rgba(39, 54, 50, 75)']}
        style={styles.titre}
      >
        <Text style={styles.titreToday}>
          {selectedDate}
        </Text>
      </LinearGradient>

      <TouchableOpacity onPress={handleNext} style={styles.arrow}>
        <Text style={{color: "white", fontFamily: "Kanitt"}}>{">"}</Text>
      </TouchableOpacity>

      </View>}
{ hier && yesterdayMatch.length === 0 ? <Text style={styles.nomatch}>Aucun match hier</Text> :
  <ScrollView style={styles.liveTableau}>

        {yesterdayLeagues.map((league) => <View style={{ marginBlock: 5 }}>
          <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
          {yesterdayMatch.map((element) => element.league.name === league ?
            
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}  // Naviguer vers la fiche du match
              >
                <View style={styles.match}>

                  {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
                    source={ligue1}
                    style={styles.matchCompetition}
                    resizeMode="contain"
                  /> :
                    <Image
                      source={{ uri: element.league.logo }}
                      style={styles.matchCompetition}
                      resizeMode="contain"
                    />}

                  <Text style={styles.matchEquipeDom}>{element.teams.home.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.home.name === "Nottingham Forest" ? "Nottingham F." : element.teams.home.name === "Paris Saint Germain" ? "Paris SG" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name}</Text>
                  <Image style={styles.matchLogoDom} source={{ uri: element.teams.home.logo }} />

                  {element.goals.home === element.goals.away ? (
                    <View style={styles.matchScore}>
                      <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text>
                      <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>
                    </View>
                  ) : (
                    <View style={styles.matchScore}>
                      <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                      <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                    </View>
                  )}

                  <Image style={styles.matchLogoExt} source={{ uri: element.teams.away.logo }} />
                  <Text style={styles.matchEquipeExt}>{element.teams.away.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.away.name === "Nottingham Forest" ? "Nottingham F." : element.teams.away.name === "Paris Saint Germain" ? "Paris SG" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name}</Text>
                </View>
              </TouchableOpacity>
              : null
          )}
        </View>)
        }
      </ScrollView> }
      {aujourdhui &&
      <ScrollView style={styles.liveTableau}>
        {leagues.map((league) => <View style={{ marginBlock: 5 }}>
          <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
          {todayMatch.map((element) => element.league.name === league ?
            element.fixture.status.long === 'Not Started' ? (
              <TouchableOpacity
                key={element.fixture.id}
                style={styles.link}
                onPress={() => { navigation.navigate("FicheMatch", { id: element.fixture.id }) }}
              >
                <View style={styles.match}>
                  {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
                    source={ligue1}
                    style={styles.matchCompetition}
                    resizeMode="contain"
                  /> :
                    <Image
                      source={{ uri: element.league.logo }}
                      style={styles.matchCompetition}
                      resizeMode="contain"
                    />}                                    <Text style={styles.matchEquipeDom}>{element.teams.home.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.home.name === "Nottingham Forest" ? "Nottingham F." : element.teams.home.name === "Paris Saint Germain" ? "Paris SG" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name}</Text>
                  <Image source={{ uri: element.teams.home.logo }} style={styles.matchLogoDom} />
                  <Text style={{ marginInline: 4 }}>-</Text>
                  <Image source={{ uri: element.teams.away.logo }} style={styles.matchLogoExt} />
                  <Text style={styles.matchEquipeExt}>{element.teams.away.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.away.name === "Nottingham Forest" ? "Nottingham F." : element.teams.away.name === "Paris Saint Germain" ? "Paris SG" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name}</Text>
                  <View style={styles.rdv}>
                    <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedDate}</Text>
                    <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedHour}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : element.fixture.status.long != 'Match Finished' && element.fixture.status.elapsed != null ? <TouchableOpacity
              style={styles.link}
              onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}
            >
              <View style={styles.match}>
                {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
                  source={ligue1}
                  style={styles.competitionLogo}
                  resizeMode="contain"
                /> :
                  <Image
                    source={{ uri: element.league.logo }}
                    style={styles.competitionLogo}
                    resizeMode="contain"
                  />}
                <View style={styles.teamContainerDom}>
                  <Image
                    source={{ uri: element.teams.home.logo }}
                    style={styles.teamLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.teamName}>{element.teams.home.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.home.name === "Nottingham Forest" ? "Nottingham F." : element.teams.home.name === "Paris Saint Germain" ? "Paris SG" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name}</Text>
                </View>
                <View style={styles.scoreContainer}>
                  {element.goals.home === element.goals.away ? (
                    <View style={styles.score}>
                      <Text style={styles.scoreText}>{element.goals.home}</Text>
                      <View style={styles.liveSticker}>
                        <Text style={styles.liveText}>{element.fixture.status.elapsed}'</Text>
                        <Text style={{ color: "darkred", fontFamily: "Kanitalic", fontSize: 10 }}>live</Text>
                      </View>
                      <Text style={styles.scoreText}>{element.goals.away}</Text>
                    </View>
                  ) : (
                    <View style={styles.score}>
                      <Text
                        style={
                          element.goals.home > element.goals.away ? styles.winner : styles.looser
                        }
                      >
                        {element.goals.home}
                      </Text>
                      <View style={styles.liveSticker}>
                        <Text style={styles.liveText}>{element.fixture.status.elapsed}'</Text>
                        <Text style={{ color: "darkred", fontFamily: "Kanitalic", fontSize: 10 }}>live</Text>
                      </View>

                      <Text
                        style={
                          element.goals.away > element.goals.home ? styles.winner : styles.looser
                        }
                      >
                        {element.goals.away}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.teamContainer}>
                  <Image
                    source={{ uri: element.teams.away.logo }}
                    style={styles.teamLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.teamName}>{element.teams.away.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.away.name === "Nottingham Forest" ? "Nottingham F." : element.teams.away.name === "Paris Saint Germain" ? "Paris SG" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name}</Text>
                </View>
              </View>
            </TouchableOpacity> : element.fixture.status.long === 'Match Finished' ?
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate('FicheMatch', { id: element.fixture.id })}  // Naviguer vers la fiche du match
              >
                <View style={styles.match}>

                  {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
                    source={ligue1}
                    style={styles.matchCompetition}
                    resizeMode="contain"
                  /> :
                    <Image
                      source={{ uri: element.league.logo }}
                      style={styles.matchCompetition}
                      resizeMode="contain"
                    />}

                  <Text style={styles.matchEquipeDom}>{element.teams.home.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.home.name === "Nottingham Forest" ? "Nottingham F." : element.teams.home.name === "Paris Saint Germain" ? "Paris SG" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name}</Text>
                  <Image style={styles.matchLogoDom} source={{ uri: element.teams.home.logo }} />

                  {element.goals.home === element.goals.away ? (
                    <View style={styles.matchScore}>
                      <Text style={styles.nul}>{element.goals.home === null ? "-" : element.goals.home}</Text>
                      <Text style={styles.nul}>{element.goals.away === null ? "-" : element.goals.away}</Text>
                    </View>
                  ) : (
                    <View style={styles.matchScore}>
                      <Text style={element.goals.home > element.goals.away ? styles.winner : styles.looser}>{element.goals.home}</Text>
                      <Text style={element.goals.away > element.goals.home ? styles.winner : styles.looser}>{element.goals.away}</Text>
                    </View>
                  )}

                  <Image style={styles.matchLogoExt} source={{ uri: element.teams.away.logo }} />
                  <Text style={styles.matchEquipeExt}>{element.teams.away.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.away.name === "Nottingham Forest" ? "Nottingham F." : element.teams.away.name === "Paris Saint Germain" ? "Paris SG" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name}</Text>
                </View>
              </TouchableOpacity>
              : null
            : null
          )}
        </View>)
        }
      </ScrollView>
}
{demain && <ScrollView style={styles.liveTableau}>
        
{tomorrowLeagues.map((league) => <View style={{ marginBlock: 5 }}>
          <Text style={{ color: "white", fontFamily: "Kanitus" }}>{league}</Text>
          {tomorrowMatch.map((element) => element.league.name === league ?
            
              <TouchableOpacity
                key={element.fixture.id}
                style={styles.link}
                onPress={() => { navigation.navigate("FicheMatch", { id: element.fixture.id }) }}
              >
                <View style={styles.match}>
                  {element.league.logo === "https://media.api-sports.io/football/leagues/61.png" ? <Image
                    source={ligue1}
                    style={styles.matchCompetition}
                    resizeMode="contain"
                  /> :
                    <Image
                      source={{ uri: element.league.logo }}
                      style={styles.matchCompetition}
                      resizeMode="contain"
                    />}                                    <Text style={styles.matchEquipeDom}>{element.teams.home.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.home.name === "Nottingham Forest" ? "Nottingham F." : element.teams.home.name === "Paris Saint Germain" ? "Paris SG" : element.teams.home.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.home.name}</Text>
                  <Image source={{ uri: element.teams.home.logo }} style={styles.matchLogoDom} />
                  <Text style={{ marginInline: 4 }}>-</Text>
                  <Image source={{ uri: element.teams.away.logo }} style={styles.matchLogoExt} />
                  <Text style={styles.matchEquipeExt}>{element.teams.away.name === "Borussia Mönchengladbach" ? "B. Monchengladbach" : element.teams.away.name === "Nottingham Forest" ? "Nottingham F." : element.teams.away.name === "Paris Saint Germain" ? "Paris SG" : element.teams.away.name === "Stade Brestois 29" ? "Stade Brestois" : element.teams.away.name}</Text>
                  <View style={styles.rdv}>
                    <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedDate}</Text>
                    <Text style={{ fontFamily: "Kanitalic", fontSize: 11, color: "white" }}>{formatDateAndTime(element.fixture.date).formattedHour}</Text>
                  </View>
                </View>
              </TouchableOpacity> : null
          )}
        </View>)
        }
      </ScrollView> }


    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  today: {
    flex: 1,
    alignItems: 'center',
    padding: 2,
    borderRadius: 15,
    width: "100%",
    marginTop: 20,
    backgroundColor: "steelblue"

  },
  titre: {
    width: 150,
    borderRadius: 10,
    marginBlock: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  titreToday: {
    color: 'white',
    fontFamily: "Kanitt",
  },
  nomatch: {
    backgroundColor: 'red',
    color: 'white',
    width: '70%',
    textAlign: 'center',
    fontFamily: 'Permanent Marker',
    borderRadius: 5,
    height: 40,
    marginBlock: 10,
    paddingTop: 7
  },
  liveTableau: {
    width: '98%',
  },

  matchCompetition: {
    height: 35,
    width: "6%",
    objectFit: 'contain',
  },
  matchEquipeDom: {
    fontSize: 14,
    fontFamily: "Kanito",
    width: "27%",
    textAlign: "center"

  },
  matchLogoDom: {
    height: 35,
    width: "9%",
    objectFit: 'contain',
  },

  rdv: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    width: "10%",
    backgroundColor: "black",
    borderRadius: 5

  },
  matchLogoExt: {
    height: 35,
    width: "9%",
    objectFit: 'contain',
  },
  matchEquipeExt: {
    fontSize: 14,
    fontFamily: "Kanito",
    width: "27%",
    textAlign: "center"

  },
  nul: {
    backgroundColor: 'gray',
    color: "white",
    height: 30,
    width: 25,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanito",
    paddingTop: 4
  },
  winner: {
    backgroundColor: '#32b642',
    color: "white",
    height: 30,
    width: 25,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanito",
    paddingTop: 4

  },
  looser: {
    backgroundColor: 'red',
    color: "white",
    height: 30,
    width: 25,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanito",
    paddingTop: 4

  },
  matchScore: {
    flexDirection: "row",
    width: "15%",
    justifyContent: "space-around"
  },
  match: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
    width: "100%",
    backgroundColor: "aliceblue",
    borderRadius: 10,
    paddingBlock: 10,
    marginVertical: 5,
  },

  competitionLogo: {
    height: 25,
    width: 25,
    objectFit: 'contain',
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "35%",
    gap: 2,
    marginInline: 1

  },
  teamContainerDom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "33%",
    flexDirection: "row-reverse",
    gap: 2,
    marginInline: 1,


  },
  teamLogo: {
    height: 40,
    width: 30,
    objectFit: 'contain',
    alignItems: "center",
    marginInline: 5
  },
  teamName: {
    fontSize: 12,
    fontFamily: "Kanito"
  },
  scoreContainer: {
    alignItems: 'center',
    width: "22%",
    marginInline: 1
  },
  liveSticker: {
    alignItems: "center",
    marginInline: 5

  },
  liveText: {
    color: "white",
    fontFamily: "Kanitalic",
    fontSize: 12,
    backgroundColor: "darkred",
    paddingInline: 5,
    borderRadius: 5


  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  scoreText: {
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: 5,
    height: 30,
    width: 25,
    fontFamily: "Kanito",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 4
  },
  arrow : {
    backgroundColor: "midnightblue",
    color: "white",
    fontFamily: "Kanitt",
    height: 35,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10


  }
});

export default Aujourdhui;