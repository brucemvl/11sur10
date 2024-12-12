import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

function Precedent() {

    const navigation = useNavigation();

  return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} >
        <Text style={styles.text}>Precedent</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "midnightblue",
        padding: 8,
        borderRadius: 5,
width: 95,
alignSelf: "flex-start",
marginBottom: 10,
marginLeft: 5,
height: 40
    },
    text: {
        color: "white",
        fontFamily: "Kanito",
        textAlign: "center"
    }
})

export default Precedent;