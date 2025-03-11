import React from 'react';
import 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './src/navigation/AppNavigator';


const Stack = createStackNavigator();



function App() {
  return (
   <AppNavigator />
  );
}

export default App