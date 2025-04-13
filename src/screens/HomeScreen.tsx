import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TopBar from '../components/homeScreen/TopBar';

const HomeScreen = () => {
  return (
   
        <View style={styles.container}>

          <TopBar/>

      <View style={styles.content}>
        <Text style={{ color: '#fff' }}>HomeScreen</Text>
      </View>
      </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
