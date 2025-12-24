import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

function Details({
  match, 
  possession, 
  expectedGoals, 
  tirs, 
  tirsCadres, 
  jaune, 
  rouge, 
  passes, 
  passesReussies, 
  accuracy
}) {

  const navigation = useNavigation()

  if (match.statistics.length === 0){
    return (
      <Text style={{fontFamily: "Permanent"}}>Aucune info pour le moment</Text>
    )
  }
    
  return (
    <View style={styles.article}>
      <Text style={styles.title}>Match en détails</Text>
      <View style={{flexDirection: "row", justifyContent: "space-between",  width: "65%", paddingBlock: 10}}>
       <TouchableOpacity onPress={()=> navigation.navigate("FicheEquipe", {id: match.teams.home.id, league: match.league.id})}> <Image source={{uri: match.teams.home.logo}} style={{width: 50, height: 50, objectFit: "contain"}} /></TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("FicheEquipe", {id: match.teams.away.id, league: match.league.id})}><Image source={{uri: match.teams.away.logo}} style={{width: 50, height: 50, objectFit: "contain"}} /></TouchableOpacity>
      </View>
      <View style={styles.statistiques}>
        <LinearGradient colors={['rgba(21, 60, 130, 0.6)', 'rgba(0, 0, 0, 0.8)']} style={styles.statistiquesItem}>
          <Text style={styles.value}>{possession[0][0]?.value}</Text>
          <Text style={styles.label}>Possession</Text>
          <Text style={styles.value}>{possession[1][0]?.value}</Text>
        </LinearGradient>
        <LinearGradient colors={['rgba(21, 60, 130, 0.6)', 'rgba(0, 0, 0, 0.8)']} style={styles.statistiquesItem}>
          <Text style={styles.value}>{expectedGoals[0][0]?.value}</Text>
          <Text style={styles.label}>Expected Goals</Text>
          <Text style={styles.value}>{expectedGoals[1][0]?.value}</Text>
        </LinearGradient>
        <LinearGradient colors={['rgba(21, 60, 130, 0.6)', 'rgba(0, 0, 0, 0.8)']} style={styles.statistiquesItem}>
          <Text style={styles.value}>{tirs[0][0]?.value} ({tirsCadres[0][0]?.value})</Text>
          <Text style={styles.label}>Tirs (cadrés)</Text>
          <Text style={styles.value}>{tirs[1][0]?.value} ({tirsCadres[1][0]?.value})</Text>
        </LinearGradient>
        <LinearGradient colors={['rgba(21, 60, 130, 0.6)', 'rgba(0, 0, 0, 0.8)']} style={styles.statistiquesItem}>
          <Text style={styles.value}>{passes[0][0]?.value}</Text>
          <Text style={styles.label}>Passes</Text>
          <Text style={styles.value}>{passes[1][0]?.value}</Text>
        </LinearGradient>
        <LinearGradient colors={['rgba(21, 60, 130, 0.6)', 'rgba(0, 0, 0, 0.8)']} style={styles.statistiquesItem}>
          <Text style={styles.value}>{passesReussies[0][0]?.value} ({accuracy[0][0]?.value})</Text>
          <Text style={styles.label}>Passes réussies</Text>
          <Text style={styles.value}>{passesReussies[1][0]?.value} ({accuracy[1][0]?.value})</Text>
        </LinearGradient>
        <LinearGradient colors={['rgba(21, 60, 130, 0.6)', 'rgba(0, 0, 0, 0.8)']} style={styles.statistiquesItem}>
          <Text style={styles.value}>{jaune[0][0]?.value === null ? "0" : jaune[0][0]?.value}</Text>
          <Text style={styles.label}>Cartons jaune</Text>
          <Text style={styles.value}>{jaune[1][0]?.value === null ? "0" : jaune[1][0]?.value}</Text>
        </LinearGradient>
        <LinearGradient colors={['rgba(21, 60, 130, 0.6)', 'rgba(0, 0, 0, 0.8)']} style={styles.statistiquesItem}>
          <Text style={styles.value}>{rouge[0][0]?.value === null ? "0" : rouge[0][0]?.value}</Text>
          <Text style={styles.label}>Cartons rouge</Text>
          <Text style={styles.value}>{rouge[1][0]?.value === null ? "0" : rouge[1][0]?.value}</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  article: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    paddingBottom: 100
  },
  title: {
    fontSize: 18,
fontFamily: "Kanitt",
    marginBottom: 20,
    color: '#000',
  },
  statistiques: {
    width: '85%',
    flexDirection: 'column',
  },
  statistiquesItem: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    color: 'white',
  },
  value: {
    color: 'white',
    fontSize: 16,
fontFamily: "Kanito",
  },
  label: {
    color: 'white',
    fontSize: 15,
    fontFamily: "Kanitus"
  },
});

export default Details;