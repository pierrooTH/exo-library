import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import LibraryScreen from './screens/LibraryScreen';
import BookScreen from './screens/BookScreen';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
          backgroundColor: '#385fc2'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: 'white',
          fontSize: 25,
          
        },
        
      }}>
        <Stack.Screen name="Home" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Livres" component={LibraryScreen} />
        <Stack.Screen name="Détails d'un livre" component={BookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
