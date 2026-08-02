import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native';
import PropTypes from 'prop-types';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { teamName } from '../datas/teamNames';

function Match({ equipeDom, equipeExt, logoDom, logoExt, scoreDom, scoreExt, id, date }) {

  const { width } = useWindowDimensions();

  const isMediumScreen = width <= 1024 && width > 767;

  const [fontsLoaded] = useFonts({
    "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),

  });

  const navigation = useNavigation();

  const dateh = new Date(date);
  const formattedDate = `${dateh.getDate().toString().padStart(2, '0')}/${(dateh.getMonth() + 1).toString().padStart(2, '0')}`;
  const formattedHour = `${dateh.getHours().toString().padStart(2, '0')}h${dateh.getMinutes().toString().padStart(2, '0')}`;


  return (<TouchableOpacity onPress={() => navigation.navigate('FicheMatch', { id })} accessibilityRole="button" accessibilityHint="Naviguer vers la fiche du match" >
    <LinearGradient colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.06)',]} style={styles.card} >
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.timeText}>{formattedHour}</Text>
      </View>
      <View style={styles.teamBlock}>
        <Image style={styles.logo} source={{ uri: logoDom }} />
        <Text numberOfLines={2} style={[styles.teamName, isMediumScreen && { fontSize: 15 }]} > {teamName[equipeDom] || equipeDom} </Text>
      </View>

      <View style={styles.scoreContainer}>
        {scoreDom === null ?
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>VS</Text> </View>
          :
          <View style={styles.scoreRow}> <View style={[styles.scoreBadge, scoreDom > scoreExt ? styles.scoreWinner : scoreDom === scoreExt ? styles.scoreDraw : styles.scoreLoser,]} >
            <Text style={styles.scoreText}>{scoreDom}</Text>
          </View>
            <View style={[styles.scoreBadge, scoreExt > scoreDom ? styles.scoreWinner : scoreDom === scoreExt ? styles.scoreDraw : styles.scoreLoser,]} >
              <Text style={styles.scoreText}>{scoreExt}</Text>
            </View>
          </View>} </View>

      <View style={styles.teamBlock}>
        <Image style={styles.logo} source={{ uri: logoExt }} />
        <Text numberOfLines={2} style={[styles.teamName, isMediumScreen && { fontSize: 15 }]} > {teamName[equipeExt] || equipeExt} </Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>);
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 6,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  dateBadge: {
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 14,
    paddingVertical: 6,
  },
  dateText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontFamily: 'Kanitalic',
  },
  timeText: {
    fontSize: 10,
    color: '#C7D2FE',
    marginTop: 2,
    fontFamily: 'Kanitalic',
  },
  teamBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 6,
  },
  logo: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
  teamName: {
    
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Bella',
    lineHeight: 16,
  },
  scoreContainer: {
    width: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 8,
  },
  scoreBadge: {
    minWidth: 32,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreWinner: { backgroundColor: '#22C55E', },
  scoreLoser: { backgroundColor: '#EF4444', },
  scoreDraw: { backgroundColor: '#64748B', },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Kanitt',
  },
  pendingBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  pendingText: {
    color: '#FFFFFF',
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: 'Kanitt',
  },
});

export default Match;