import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import Navigation from './src/navigation/Navigation';

const App = () => {
  const backgroundColor = '#121212'
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Navigation />
    </>
  );
};

export default App;
