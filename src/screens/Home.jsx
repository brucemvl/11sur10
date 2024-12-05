import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Filtres from "../components/Filtres";
import Banner from "../components/Banner";
import Live from "../components/Live";
import Aujourdhui from "../components/Aujourdhui";




function Home() {
  

  return (
    <ScrollView  >
    <View style={styles.blocpage}>
      <Banner />
      <Aujourdhui/>
      <Live />
      <Filtres />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blocpage: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "98%",
    paddingStart: "2%",
    marginTop: 20,
  },


  // Styles pour les petites tailles d'écran
 
});

export default Home;