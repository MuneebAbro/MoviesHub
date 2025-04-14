import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TopRatedScreen from '../screens/TopRatedScreen'; 
import UpcommingScreen from '../screens/UpcommingScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  TopRatedScreen: undefined;
  UpcommingScreen: undefined;
  MovieDetail: { movieId: string };  // Make sure movieId is passed as a string
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TopRatedScreen" component={TopRatedScreen} />
        <Stack.Screen name="UpcommingScreen" component={UpcommingScreen} />
        <Stack.Screen 
          name="MovieDetail" 
          component={MovieDetailScreen} 
          options={{ headerShown: false, title: 'Movie Details' }} // Show header for MovieDetailScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
