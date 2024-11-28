import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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


    
  return (
    <View style={styles.article}>
      <Text style={styles.title}>Match en détails</Text>
      <View style={styles.statistiques}>
        <View style={styles.statistiquesItem}>
          <Text style={styles.value}>{possession[0][0].value}</Text>
          <Text style={styles.label}>Possession</Text>
          <Text style={styles.value}>{possession[1][0].value}</Text>
        </View>
        <View style={styles.statistiquesItem}>
          <Text style={styles.value}>{expectedGoals[0][0].value}</Text>
          <Text style={styles.label}>Expected Goals</Text>
          <Text style={styles.value}>{expectedGoals[1][0].value}</Text>
        </View>
        <View style={styles.statistiquesItem}>
          <Text style={styles.value}>{tirs[0][0].value} ({tirsCadres[0][0].value})</Text>
          <Text style={styles.label}>Tirs (cadrés)</Text>
          <Text style={styles.value}>{tirs[1][0].value} ({tirsCadres[1][0].value})</Text>
        </View>
        <View style={styles.statistiquesItem}>
          <Text style={styles.value}>{passes[0][0].value}</Text>
          <Text style={styles.label}>Passes</Text>
          <Text style={styles.value}>{passes[1][0].value}</Text>
        </View>
        <View style={styles.statistiquesItem}>
          <Text style={styles.value}>{passesReussies[0][0].value} ({accuracy[0][0].value})</Text>
          <Text style={styles.label}>Passes réussies</Text>
          <Text style={styles.value}>{passesReussies[1][0].value} ({accuracy[1][0].value})</Text>
        </View>
        <View style={styles.statistiquesItem}>
          <Text style={styles.value}>{jaune[0][0].value === null ? "0" : jaune[0][0].value}</Text>
          <Text style={styles.label}>Cartons jaune</Text>
          <Text style={styles.value}>{jaune[1][0].value === null ? "0" : jaune[1][0].value}</Text>
        </View>
        <View style={styles.statistiquesItem}>
          <Text style={styles.value}>{rouge[0][0].value === null ? "0" : rouge[0][0].value}</Text>
          <Text style={styles.label}>Cartons rouge</Text>
          <Text style={styles.value}>{rouge[1][0].value === null ? "0" : rouge[1][0].value}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  article: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
  },
  title: {
    fontSize: 22,
fontFamily: "Kanito",
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
    backgroundColor: 'steelblue',
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