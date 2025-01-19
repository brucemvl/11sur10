import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import Home from '../screens/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Apropos from '../screens/Apropos';
import Contact from '../screens/Contact';
import FicheChampionnat from '../screens/FicheChampionnat';
import FicheEurope from "../screens/FicheEurope"
import FicheJoueur from '../screens/FicheJoueur';
import Menu from '../components/Menu';
import LivePage from '../screens/LivePage';
import ClubPage from '../screens/ClubPage';
import FicheMatch from '../screens/FicheMatch';
import SelectionsPage from '../screens/SelectionsPage';
import FicheSelections from '../screens/FicheSelections';
import FicheEquipe from '../screens/FicheEquipe';
import { SharedElement } from 'react-navigation-shared-element';



const Stack = createSharedElementStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer  >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Header />
        }}
        >
      
        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Apropos" component={Apropos} />
        <Stack.Screen name='Contact' component={Contact} />
        <Stack.Screen name="FicheChampionnat" component={FicheChampionnat} />
        <Stack.Screen name="FicheEurope" component={FicheEurope} />
        <Stack.Screen name="LivePage" component={LivePage} />
        <Stack.Screen name="ClubPage" component={ClubPage} sharedElements={(route, otherRoute, showing) => {
            return ['img'];}}/>
        <Stack.Screen name="FicheMatch" component={FicheMatch} />
        <Stack.Screen name="FicheJoueur" component={FicheJoueur} />
        <Stack.Screen name="SelectionsPage" component={SelectionsPage} />
        <Stack.Screen name='FicheSelections' component={FicheSelections} />
        <Stack.Screen name='FicheEquipe' component={FicheEquipe}  />




      </Stack.Navigator>
      <Menu component={Menu}/>
    </NavigationContainer>
  );

  
}

