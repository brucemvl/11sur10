import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Precedent() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.text}>{"<"}  Précédent</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window'); // Get the screen width

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Fix the container at the top
    zIndex: 999, // Ensure it's above other components
    width: width - 10, // Make the button width match the screen width
    paddingHorizontal: 10,
    width: "100%",
    paddingTop: 5,
    paddingBottom: 2,
backgroundColor: "#f0f0f0" },
  button: {
    backgroundColor: "midnightblue",
    paddingVertical: 12,
    borderRadius: 20,
    width: 105,
    height: 48,
    justifyContent: 'center', // Center the text inside the button
    alignItems: 'center', // Center the text horizontally
  },
  text: {
    color: "white",
    fontFamily: "Kanito",
    textAlign: "center",
  },
});

export default Precedent;