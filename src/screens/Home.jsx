import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { useState } from "react";
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
    "Kanitalik": require("../assets/fonts/Kanit/Kanit-ExtraBoldItalic.ttf"),
    "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf")
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fonction de rafraîchissement
  const onRefresh = () => {
    setIsRefreshing(true);
    // Simule un appel réseau ou une mise à jour de données
    setTimeout(() => {
      // Logique de mise à jour des données, tu peux ici recharger des informations.
      setIsRefreshing(false);
    }, 2000);
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView 
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.blocpage}>
        <Banner />
        </View>
        <Filtres />
        <View style={styles.blocpage}>
        <Aujourdhui onRefresh={onRefresh} />
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
    marginBlock: 10
  },
});

export default Home;