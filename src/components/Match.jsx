import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

function Match({ equipeDom, equipeExt, logoDom, logoExt, scoreDom, scoreExt, id, date, navigation }) {

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
        <Text style={{fontSize: 9}}>{formattedDate}</Text>
        <Text style={{fontSize: 9}}>{formattedHour}</Text>
      </View>

      <Text style={styles.equipeDom}>{equipeDom}</Text>
      <Image style={styles.logoDom} source={{ uri: logoDom }} />

      {scoreDomNum === scoreExtNum ? (
        <View style={styles.matchScore}>
          <Text style={styles.nul}>{scoreDomNum}</Text>
          <Text style={styles.nul}>{scoreExtNum}</Text>
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
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,  // Assurez-vous que la navigation est passée en prop
};

const styles = StyleSheet.create({
  match: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: "100%"
  },
  dateheure: {
    flex: 1,
    alignItems: 'flex-start',
    width: "14%"
  },
  equipeDom: {
    fontSize: 12,
    width: "28%",
textAlign: "center",
fontFamily: "Kanitt"

  },
  logoDom: {
    width: "8%",
    height: 35,
    marginRight: 10,
    objectFit: "contain"
  },
  matchScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: "14%",
    justifyContent: "center"
  },
  nul: {
    fontSize: 16,
    backgroundColor: 'gray',
    color: "white",
    height: 28,
    width: 20,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanitt"

  },
  winner: {
    fontSize: 16,
    backgroundColor: 'green',
    color: "white",
    height: 25,
    width: 20,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanitt"

  },
  looser: {
    fontSize: 16,
    backgroundColor: 'red',
    color: "white",
    height: 25,
    width: 20,
    borderRadius: 5,
textAlign: "center",
fontFamily: "Kanitt"

  },
  logoExt: {
    width: "8%",
    height: 35,
    marginLeft: 10,
    objectFit: "contain"
  },
  equipeExt: {
    fontSize: 12,
    width: "28%",
textAlign: "center",
fontFamily: "Kanitt"
},

});

export default Match;