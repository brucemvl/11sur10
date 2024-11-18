import React from 'react';
import AppNavigator from './src/navigation/AppNavigator'; // Importer le fichier de navigation
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';  // Importer le hook useFonts d'Expo

export default function App() {
  // Charger les polices avec le hook useFonts
  const [fontsLoaded] = useFonts({
    'Kanit-Regular': require('./src/assets/fonts/Kanit/Kanit-Regular.ttf'),
    'Kanit-Bold': require('./src/assets/fonts/Kanit/Kanit-Bold.ttf'),
  });

  // Afficher le contenu de l'app seulement quand les polices sont chargées
  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        {/* Envelopper le texte dans un composant <Text> */}
        <Text>Chargement des polices...</Text>
      </View>
    );
  }

  return (
    <View style={styles.app}>
      <AppNavigator />  {/* Afficher la navigation */}
    </View>
  );
}

// Appliquer les styles généraux de l'application
const styles = StyleSheet.create({
  app: {
    flex: 1,  // Assurer que le style s'étend sur tout l'écran
    fontFamily: 'Kanit-Regular',  // Appliquer la police par défaut à l'ensemble de l'application
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});