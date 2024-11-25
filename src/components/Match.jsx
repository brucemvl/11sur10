import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useFonts } from 'expo-font';

function Match({ equipeDom, equipeExt, logoDom, logoExt, scoreDom, scoreExt, id, date, navigation }) {

    const [fontsLoaded] = useFonts({
        "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
        
      });

  const dateh = new Date(date);
  const formattedDate = `${dateh.getDate().toString().padStart(2, '0')}/${(dateh.getMonth() + 1).toString().padStart(2, '0')}`;
  const formattedHour = `${dateh.getHours().toString().padStart(2, '0')}h${dateh.getMinutes().toString().padStart(2, '0')}`;


  // Convert scores to numbers for accurate comparison
  const scoreDomNum = Number(scoreDom);
  const scoreExtNum = Number(scoreExt);

  return (
    <TouchableOpacity
      style={styles.match}
      onPress={() => navigation.navigate('FicheMatch', { id })}  // Naviguer vers la fiche du match
    >
      <View style={styles.dateheure}>
        <Text style={{fontSize: 8.5}}>{formattedDate}</Text>
        <Text style={{fontSize: 8.5}}>{formattedHour}</Text>
      </View>

      <Text style={styles.equipeDom}>{equipeDom}</Text>
      <Image style={styles.logoDom} source={{ uri: logoDom }} />

      {scoreDomNum === scoreExtNum ? (
        <View style={styles.matchScore}>
          <Text style={styles.nul}>{scoreDomNum === null ? "" : scoreDomNum}</Text>
          <Text style={styles.nul}>{scoreExtNum === null ? "" : scoreExtNum}</Text>
        </View>
      ) : (
        <View style={styles.matchScore}>
          <Text style={scoreDomNum > scoreExtNum ? styles.winner : styles.looser}>{scoreDomNum}</Text>
          <Text style={scoreExtNum > scoreDomNum ? styles.winner : styles.looser}>{scoreExtNum}</Text>
        </View>
      )}

      <Image style={styles.logoExt} source={{ uri: logoExt }} />
      <Text style={styles.equipeExt}>{equipeExt}</Text>
    </TouchableOpacity>
  );
}

Match.propTypes = {
  equipeDom: PropTypes.string.isRequired,
  equipeExt: PropTypes.string.isRequired,
  logoDom: PropTypes.string.isRequired,
  logoExt: PropTypes.string.isRequired,
  scoreDom: PropTypes.number.isRequired,
  scoreExt: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  match: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBlock: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: "100%"
  },
  dateheure: {
    flex: 1,
    alignItems: 'flex-start',
    width: "12%"
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
    height: 28,
    width: 20,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanito"

  },
  winner: {
    fontSize: 16,
    backgroundColor: 'green',
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

export default Match;