import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TopRatedScreen from '../screens/TopRatedScreen'; // Make sure this exists

export type RootStackParamList = {
  HomeScreen: undefined;
  TopRatedScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TopRatedScreen" component={TopRatedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
