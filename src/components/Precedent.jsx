import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

function Precedent() {

    const navigation = useNavigation();

  return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button} >
        <Text style={styles.text}>{"<"}  Précedent</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "midnightblue",
        paddingBlock: 12,
        borderRadius: 20,
width: 105,
alignSelf: "flex-start",
marginBottom: 10,
marginLeft: 5,
height: 48
    },
    text: {
        color: "white",
        fontFamily: "Kanito",
        textAlign: "center"
    }
})

export default Precedent;