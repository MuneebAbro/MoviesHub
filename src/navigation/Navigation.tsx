import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TopRatedScreen from '../screens/TopRatedScreen'; 
import UpcommingScreen from '../screens/UpcommingScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import CastDetailScreen from '../screens/CastDetailScreen'; // 👈 import it

export type RootStackParamList = {
  HomeScreen: undefined;
  TopRatedScreen: undefined;
  UpcommingScreen: undefined;
  SearchScreen: undefined;
  MovieDetail: { movieId: string };
  CastDetailScreen: { personId: number }; // ✅ add param type here
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TopRatedScreen" component={TopRatedScreen} />
        <Stack.Screen name="UpcommingScreen" component={UpcommingScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen 
          name="MovieDetail" 
          component={MovieDetailScreen} 
          options={{ headerShown: false, title: 'Movie Details' }}
        />
        <Stack.Screen 
          name="CastDetailScreen" 
          component={CastDetailScreen} 
          options={{ headerShown: false, title: 'Actor Details' }} // optional
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
