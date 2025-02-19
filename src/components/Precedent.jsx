import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

function Precedent() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <LinearGradient colors={["rgba(26, 71, 129, 0.67)", 'rgb(0, 0, 0)']} style={styles.button}>
          <Text style={styles.text}>{"<"}  Précédent</Text>
        </LinearGradient>
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
    backgroundColor: "#f0f0f0",  // Container's background color
    opacity: 0.98
  },
  button: {
    backgroundColor: 'rgb(16, 26, 75)',  // Button background (solid, no opacity applied)
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