import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

function JourneesSelections({ setFilter, round, currentIndex, roundd, filter }) {
    const [index, setIndex] = useState(currentIndex);
  
        const [rotateJournee, setRotateJournee] = useState(new Animated.Value(0));

        const rotateJourneeInterpolate = rotateJournee.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });
    
    useEffect(() => {
      setIndex(0);
    }, [currentIndex]);
  
    // Filtrage vers la prochaine journée
    const filtrageNext = () => {
      setIndex((prevIndex) => Math.min(prevIndex + 1, round.length - 1));
      Animated.timing(rotateJournee, {
        toValue: 1, // Valeur cible de la rotation
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Réinitialiser la valeur de la rotation à 0 après l'animation
        rotateJournee.setValue(0); 
      });
    };
  
    // Filtrage vers la journée précédente
    const filtragePrev = () => {
      setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      Animated.timing(rotateJournee, {
        toValue: 1, // Valeur cible de la rotation
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Réinitialiser la valeur de la rotation à 0 après l'animation
        rotateJournee.setValue(0); 
      });
    };
  
    // Mettre à jour le filtre pour la journée sélectionnée
    useEffect(() => {
      // Mettre à jour le filtre avec la journée sélectionnée
      setFilter(round[index]);
    }, [index, round, setFilter]);

    console.log("Index:", index);
console.log("Current Round:", roundd[index]);
console.log("Filter:", filter);
console.log(currentIndex)
  
    return (
      <View style={styles.container}>
        {/* Bouton précédent */}
        <TouchableOpacity style={styles.button} onPress={filtragePrev}>
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
  
        {/* Sélecteur de journée */}
        <View style={styles.headInfo}>
          <Animated.Text style={{fontFamily: "Permanent", fontSize: 18, color: "black",  transform: [{ rotate: rotateJourneeInterpolate }] }}>{`Journée ${index + 1}`}</Animated.Text>
        </View>
  
        {/* Bouton suivant */}
        <TouchableOpacity style={styles.button} onPress={filtrageNext}>
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    paddingInline: 10,
    borderRadius: 5,
    marginHorizontal: 18,
  },
  buttonText: {
    fontSize: 42,
color: "black"  },
  headInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: 150,
  },
});

export default JourneesSelections;