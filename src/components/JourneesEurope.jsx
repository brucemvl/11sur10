import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

function JourneesEurope({ setFilterp, round, filterp, id }) {
    const [index, setIndex] = useState(7);
  
        const [rotateJournee, setRotateJournee] = useState(new Animated.Value(0));

        const rotateJourneeInterpolate = rotateJournee.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });
    
   
  
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
      setFilterp(round[index]);
    }, [index, round, setFilterp]);

    console.log("Index:", index);
console.log("Filter:", filterp);
  
    return (
      <View style={styles.container}>
        {/* Bouton précédent */}
        <TouchableOpacity style={styles.button} onPress={filtragePrev}>
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
  
        {/* Sélecteur de journée */}
        <View style={styles.headInfo}>
          <Animated.Text style={{fontFamily: "Kanitalik", fontSize: 18, color: "white",  transform: [{ rotate: rotateJourneeInterpolate }] }}>{`Journée ${id === 848? index - 1 : index + 1}`}</Animated.Text>
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
    fontSize: 36,
color: "white",
fontFamily: "Kanitalic"  },
  headInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: 150,
  },
});

export default JourneesEurope;