import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Header />,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>

      {/* Footer global */}
      <Footer />
    </NavigationContainer>
  );
}