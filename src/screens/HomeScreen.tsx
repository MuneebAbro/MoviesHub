import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MovieCarousel from '../components/MovieCarousel'

const HomeScreen = () => {
  return (
   

    
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="#fff" />
        </TouchableOpacity>

<View style={styles.titleText}>
<Text style={styles.titleYellow}>M</Text>
<Text style={styles.title}>ovieHub</Text>
</View>
       

        <TouchableOpacity>
          <Icon name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
      <Text>HomeScreen</Text>
      </View>
    </View>
    
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  titleText:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleYellow:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFF00',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
