import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Journees({ setFilter, round, currentIndex, roundd, filter }) {
    const [index, setIndex] = useState(currentIndex);
  
    useEffect(() => {
      setIndex(currentIndex);
    }, [currentIndex]);
  
    // Filtrage vers la prochaine journée
    const filtrageNext = () => {
      setIndex((prevIndex) => Math.min(prevIndex + 1, round.length - 1));
    };
  
    // Filtrage vers la journée précédente
    const filtragePrev = () => {
      setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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
          <Text style={{fontFamily: "Permanent", fontSize: 18}}>{`Journée ${index + 1}`}</Text>
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
    marginVertical: 10,
  },
  button: {
    paddingInline: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 42,
color: "grey"  },
  headInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: 150,
  },
});

export default Journees;