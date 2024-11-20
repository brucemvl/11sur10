import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Apropos from './src/screens/Apropos';
import AppNavigator from './src/navigation/AppNavigator';


const Stack = createStackNavigator();



function App() {
  return (
   <AppNavigator />
  );
}

export default App