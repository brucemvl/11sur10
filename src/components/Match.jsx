import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

function Match({ equipeDom, equipeExt, logoDom, logoExt, scoreDom, scoreExt, id, date}) {

    const [fontsLoaded] = useFonts({
        "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
        
      });

      const navigation = useNavigation();

  const dateh = new Date(date);
  const formattedDate = `${dateh.getDate().toString().padStart(2, '0')}/${(dateh.getMonth() + 1).toString().padStart(2, '0')}`;
  const formattedHour = `${dateh.getHours().toString().padStart(2, '0')}h${dateh.getMinutes().toString().padStart(2, '0')}`;


  // Convert scores to numbers for accurate comparison
  

  return (
   
                  <LinearGradient colors={['rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.3)']} style={{borderRadius: 10, marginVertical: 4, backgroundColor: "white", borderWidth: 1, borderColor: "black"}} >
                     <TouchableOpacity
      style={styles.match}
      onPress={() => navigation.navigate('FicheMatch', { id })}  // Naviguer vers la fiche du match
    >

      <View style={styles.dateheure}>
        <Text style={{fontSize: 8.5, fontFamily: "Kanitalic", color: "white"}}>{formattedDate}</Text>
        <Text style={{fontSize: 8.5, fontFamily: "Kanitalic", color: "white"}}>{formattedHour}</Text>
      </View>

      <Text style={styles.equipeDom}>{equipeDom === "Paris Saint Germain" ? "Paris St Germain" : equipeDom === "Stade Brestois 29" ? "Stade Brestois" : equipeDom}</Text>
      <Image style={styles.logoDom} source={{ uri: logoDom }} />

      {scoreDom === scoreExt ? (
        <View style={styles.matchScore}>
          <Text style={styles.nul}>{scoreDom === null ? "-" : scoreDom}</Text>
          <Text style={styles.nul}>{scoreExt === null ? "-" : scoreExt}</Text>
        </View>
      ) : (
        <View style={styles.matchScore}>
          <Text style={scoreDom > scoreExt ? styles.winner : styles.looser}>{scoreDom}</Text>
          <Text style={scoreExt > scoreDom ? styles.winner : styles.looser}>{scoreExt}</Text>
        </View>
      )}

      <Image style={styles.logoExt} source={{ uri: logoExt }} />
      <Text style={styles.equipeExt}>{equipeExt === "Paris Saint Germain" ? "Paris St Germain" : equipeExt === "Stade Brestois 29" ? "Stade Brestois" : equipeExt}</Text>
      </TouchableOpacity>
      </LinearGradient>
    
  );
}

Match.propTypes = {
  equipeDom: PropTypes.string.isRequired,
  equipeExt: PropTypes.string.isRequired,
  logoDom: PropTypes.string.isRequired,
  logoExt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
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

export default Match;