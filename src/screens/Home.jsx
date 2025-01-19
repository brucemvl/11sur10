import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Filtres from "../components/Filtres";
import Banner from "../components/Banner";
import Aujourdhui from "../components/Aujourdhui";
import { useFonts } from "expo-font";





function Home() {

  const [fontsLoaded] = useFonts({
    "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"),
    "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"),
    "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"),
    "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"),
    "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf")
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  

  return (
    <ScrollView  >
    <View style={styles.blocpage}>
      <Banner />
      <Aujourdhui/>
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