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
        <Text>{formattedDate}</Text>
        <Text>{formattedHour}</Text>
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
  },
  dateheure: {
    flex: 1,
    alignItems: 'flex-start',
  },
  equipeDom: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoDom: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  matchScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nul: {
    fontSize: 16,
    color: 'gray',
  },
  winner: {
    fontSize: 16,
    color: 'green',
  },
  looser: {
    fontSize: 16,
    color: 'red',
  },
  logoExt: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  equipeExt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Match;