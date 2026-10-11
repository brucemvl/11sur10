import React from "react";
 import { View, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
  import { useNavigation } from "@react-navigation/native";
   import { portraitsJoueurs } from "../datas/Portraits";
   
   export default function PlayerOnField({ player, teamId, positionStyle, borderColor, displayName, }) {
     const navigation = useNavigation();
      const portrait = portraitsJoueurs[player.id] || { uri: `https://media.api-sports.io/football/players/${player.id}.png`, };
      
      return (
      <TouchableOpacity onPress={() => navigation.navigate("FicheJoueur", { id: player.id, team: teamId, })} style={[positionStyle, styles.container,]} >
         <View style={[styles.player, { borderColor },]} > 
            <Image source={portrait} style={styles.photo} resizeMode="cover" /> </View> <Text style={styles.name} numberOfLines={1}> {displayName || player.name.split(" ").slice(-1).join(" ")} </Text> </TouchableOpacity>); } 
const styles = StyleSheet.create({ 
    container: { alignItems: "center", width: 54, },
     player: { width: 36, height: 40, borderRadius: 9, borderWidth: 2, overflow: "hidden", backgroundColor: "#f0f0f0", },
      photo: { width: "100%", height: "100%", },
       name: { fontSize: 8.3, color: "#fff", textShadowColor: "#000", textShadowRadius: 1, textShadowOffset: {height: 1}, fontFamily: "Kanito", textAlign: "center",

        }, });