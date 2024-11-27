import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Filtres from "../components/Filtres";
import Banner from "../components/Banner";
import Live from "../components/Live";




function Home() {
  

  return (
    <ScrollView >
    <View style={styles.blocpage}>
      <Banner />
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