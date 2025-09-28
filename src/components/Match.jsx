import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

function Match({ equipeDom, equipeExt, logoDom, logoExt, scoreDom, scoreExt, id, date}) {

  const { width } = useWindowDimensions();
      
          const isMediumScreen = width <= 1024 && width > 767;

    const [fontsLoaded] = useFonts({
        "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
        
      });

      const navigation = useNavigation();

  const dateh = new Date(date);
  const formattedDate = `${dateh.getDate().toString().padStart(2, '0')}/${(dateh.getMonth() + 1).toString().padStart(2, '0')}`;
  const formattedHour = `${dateh.getHours().toString().padStart(2, '0')}h${dateh.getMinutes().toString().padStart(2, '0')}`;

const teamName = {
  "Germany": "Allemagne",
  "Spain": "Espagne",
  "Paris Saint Germain": "Paris St Germain",
  "Barcelona" : "FC Barcelone",
  "Italy" : "Italie",
  "Austria" : "Autriche",
  "Moldova" : "Moldavie",
  "Cyprus" : "Chypre",
  "Norway" : "Norvege",
  "Hungary" : "Hongrie"
};
  

  return (
   
                  <LinearGradient colors={['rgba(0, 0, 0, 0.09)', 'rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.4)']} style={{borderRadius: 10, marginVertical: 4, backgroundColor: "white", borderWidth: 1, borderColor: "black"}} >
                     <TouchableOpacity
      style={styles.match}
      onPress={() => navigation.navigate('FicheMatch', { id })}  // Naviguer vers la fiche du match
    >

      <View style={styles.dateheure}>
        <Text style={{fontSize: isMediumScreen ? 10 : 8.5, fontFamily: "Kanitaliq", color: "white"}}>{formattedDate}</Text>
        <Text style={{fontSize: isMediumScreen ? 10 : 8.5, fontFamily: "Kanitaliq", color: "white"}}>{formattedHour}</Text>
      </View>

      <Text style={[styles.equipeDom, isMediumScreen && {fontSize: 14}]}>{teamName[equipeDom] || equipeDom}</Text>
      <Image style={[styles.logoDom, isMediumScreen && {height: 35}]} source={{ uri: logoDom }} />

      {scoreDom === scoreExt ? (
        <View style={styles.matchScore}>
          <Text style={[scoreDom === null ? styles.notStarted : styles.nul, isMediumScreen && {width: 25, height: 30, fontSize: 18}]}>{scoreDom === null ? "-" : scoreDom}</Text>
          <Text style={[scoreExt === null ? styles.notStarted : styles.nul, isMediumScreen && {width: 25, height: 30, fontSize: 18}]}>{scoreExt === null ? "-" : scoreExt}</Text>
        </View>
      ) : (
        <View style={styles.matchScore}>
          <Text style={[scoreDom > scoreExt ? styles.winner : styles.looser, isMediumScreen && {width: 25, height: 30, fontSize: 18}]}>{scoreDom}</Text>
          <Text style={[scoreExt > scoreDom ? styles.winner : styles.looser, isMediumScreen && {width: 25, height: 30, fontSize: 18}]}>{scoreExt}</Text>
        </View>
      )}

      <Image style={[styles.logoExt, isMediumScreen && {height: 35}]} source={{ uri: logoExt }} />
      <Text style={[styles.equipeExt, isMediumScreen && {fontSize: 14}]}>{teamName[equipeExt] || equipeExt}</Text>
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
    paddingBlock: 7,
    width: "100%",
    justifyContent: "center",
    paddingInline: 3
  },
  dateheure: {
    alignItems: 'flex-start',
    width: "9%",
    backgroundColor: "black",
    borderRadius: 5,
    alignItems: "center",
    padding: 1
  },
  equipeDom: {
    fontSize: 12,
    width: "26%",
textAlign: "center",
fontFamily: "Bella"

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
    backgroundColor: 'grey',
    color: "white",
    height: 25,
    width: 20,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanitt"

  },
  notStarted: {
fontSize: 16,
    backgroundColor: 'black',
    color: "white",
    height: 25,
    width: 20,
    borderRadius: 5,
    textAlign: "center",
    fontFamily: "Kanitt"
  },
  winner: {
    fontSize: 16,
    backgroundColor: '#32b642',
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
    width: "9%",
    height: 30,
    marginLeft: 10,
    objectFit: "contain",
  },
  equipeExt: {
    fontSize: 12,
    width: "28%",
textAlign: "center",
fontFamily: "Bella"
},

});

export default Match;