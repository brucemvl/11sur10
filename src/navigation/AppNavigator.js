import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Apropos from '../screens/Apropos';
import Contact from '../screens/Contact';
import FicheChampionnat from '../screens/FicheChampionnat';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer  >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Header />,
        }}
      >
        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Apropos" component={Apropos} />
        <Stack.Screen name='Contact' component={Contact} />
        <Stack.Screen name="FicheChampionnat" component={FicheChampionnat} />


      </Stack.Navigator>
    </NavigationContainer>
  );

  
}

