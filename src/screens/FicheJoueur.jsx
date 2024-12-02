import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Pour récupérer les paramètres de la route
import redcard from "../assets/redcard.png";

function FicheJoueur(playerId) {
  const [joueur, setJoueur] = useState(null);
  const [palmares, setPalmares] = useState(null);

  const [openPalmares, setOpenPalmares] = useState(false);
  const [rotateP, setRotationP] = useState(true);

  const route = useRoute();
  const { id } = route.params; // Utilisation des paramètres de route dans React Native

  console.log(playerId)


  const collapsePalmares = () => {
    setOpenPalmares(!openPalmares);
    setRotationP(!rotateP);
  };

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/trophies?player=${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      .then((result) => setPalmares(result.response))
      .catch((error) => { console.error(error) });
  }, [id]);

  useEffect(() => {
    fetch(`https://v3.football.api-sports.io/players?id=${id}&season=2024`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5ff22ea19db11151a018c36f7fd0213b",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      .then((result) => setJoueur(result.response[0]))
      .catch((error) => { console.error(error) });
  }, [id]);

  if (!joueur || !palmares) {
    return <Text>Loading...</Text>;
  }

  const teamNames = joueur.statistics.map((element) => element.team.name);
  const uniqueTeamNames = joueur.statistics.reduce((acc, element) => {
    if (!acc.includes(element.team.logo) && element.games.minutes > 0) {
      acc.push(element.team.logo);
    }
    return acc;
  }, []);

  const date = new Date(joueur.player.birth.date);
  const formattedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const trophees = palmares.filter((element) => element.place === "Winner");

  const trophies = trophees.reduce((acc, trophy) => {
    if (!acc[trophy.league]) {
      acc[trophy.league] = [];
    }
    acc[trophy.league].push(trophy);
    return acc;
  }, {});

  const trophiesArray = Object.entries(trophies).map(([league, trophies]) => ({
    league,
    trophies,
  }));

  return (
    <ScrollView contentContainerStyle={styles.blocJoueur}>
      <View style={styles.article}>
        <View style={styles.infosJoueur}>
          <Image source={{ uri: joueur.player.photo }} style={styles.photo} />
          <View style={styles.bio}>
            <Text style={styles.name}>{joueur.player.name}</Text>
            <Text style={styles.infoText}>Né le {formattedDate} à {joueur.player.birth.place}, {joueur.player.birth.country}</Text>
            <Text style={styles.infoText}>Taille: {joueur.player.height}, Poids: {joueur.player.weight}</Text>
            <Text style={styles.infoText}>Poste: {joueur.statistics[0].games.position}</Text>
            <View style={styles.logos}>
              {uniqueTeamNames.map((logo, index) => (
                <Image key={`logo-${index}`} source={{ uri: logo }} style={styles.logo} />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.palmares}>
          <TouchableOpacity style={styles.palmaresTitle} onPress={collapsePalmares}>
            <Text style={styles.palmaresText}>Palmarès</Text>
            <Text style={[styles.chevron, rotateP && styles.chevronActive]}>▼</Text>
          </TouchableOpacity>
          {openPalmares && (
            <View style={styles.palmaresInfos}>
              {trophiesArray.map((element, index) => (
                <Text key={index}>{element.trophies.length}x {element.league}</Text>
              ))}
            </View>
          )}
        </View>

        <Text style={styles.season}>2024/2025</Text>
        <View style={styles.stats}>
          {joueur.statistics.map((element, index) => (
            <View key={index} style={styles.statBlock}>
              {element.games.minutes > 0 && (
                <View>
                  <Text style={styles.leagueName}>{element.league.name === "Friendlies" ? "Amicaux" : element.league.name}</Text>
                  <View style={styles.statList}>
                    <Text>Matchs joués: {element.games.appearences}</Text>
                    <Text>Buts: {element.goals.total}</Text>
                    <Text>Passes Dec: {element.goals.assists}</Text>
                    <Text>Tirs (cadrés): {element.shots.total} ({element.shots.on})</Text>
                    <Text>Passes: {element.passes.total}</Text>
                    <Text>Note moyenne: {element.games.rating ? element.games.rating.slice(0, 4) : ""}</Text>
                    <Text>Cartons jaune: {element.cards.yellow}</Text>
                    <Image source={redcard} style={styles.redCard} />
                    <Text>Cartons Rouge: {element.cards.red}</Text>
                  </View>
                  <Image source={{ uri: element.league.logo }} style={styles.logoCompet} />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blocJoueur: {
    flexDirection: 'column',
    width: '98%',
    alignItems: 'center',
    margin: '1%',
    marginTop: 20,
  },
  article: {
    flexDirection: 'column',
    width: '90%',
  },
  infosJoueur: {
    backgroundColor: '#4682b4',
    borderRadius: 15,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    color: 'white',
  },
  photo: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  bio: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  infoText: {
    fontSize: 14,
    color: 'white',
  },
  logos: {
    flexDirection: 'row',
    marginTop: 10,
  },
  logo: {
    height: 40,
    width: 40,
    marginLeft: 5,
  },
  palmares: {
    marginBottom: 20,
    width: '100%',
  },
  palmaresTitle: {
    backgroundColor: '#4682b4',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
  },
  palmaresText: {
    fontSize: 16,
    color: 'white',
  },
  chevron: {
    marginLeft: 10,
  },
  chevronActive: {
    transform: [{ rotate: '180deg' }],
  },
  palmaresInfos: {
    marginTop: 10,
  },
  season: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stats: {
    width: '100%',
  },
  statBlock: {
    marginBottom: 20,
  },
  leagueName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statList: {
    marginTop: 10,
  },
  logoCompet: {
    height: 40,
    marginTop: 10,
  },
  redCard: {
    height: 20,
    width: 20,
  },
});

export default FicheJoueur;