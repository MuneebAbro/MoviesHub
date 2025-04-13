import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>MovieHub</Text>

        <TouchableOpacity>
          <Icon name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
