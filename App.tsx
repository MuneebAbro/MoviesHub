import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  const backgroundColor = '#121212'
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <StatusBar barStyle="light-content" backgroundColor= "#121212" />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
