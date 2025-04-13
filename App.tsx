import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
