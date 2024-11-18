import { View, Text, Image, StyleSheet } from "react-native";
import Filtres from "../components/Filtres";
import Banner from "../components/Banner";





function Home() {
  

  return (
    <View style={styles.blocpage}>
      <Banner />
      <Filtres />
    </View>
  );
}

const styles = StyleSheet.create({
  blocpage: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "98%",
    paddingStart: "2%",
    gap: 20,
    marginTop: 20,
  },


  // Styles pour les petites tailles d'écran
  "@media (max-width: 767px)": {
    blocpage: {
      banner: {
        height: 80,
        bannerImage: {
          objectPosition: "0 -25px",
        },
        bannerText: {
          bannerTitle: {
            fontSize: 16,
          },
          bannerSubtitle: {
            fontSize: 12,
          },
        },
      },
    },
  },
});

export default Home;