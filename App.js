import React from 'react';
import Categories from './Components/Categories';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Notes from './Components/Notes';
import PickImage from './Components/PickImage';




const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="PickImage" component={PickImage} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}