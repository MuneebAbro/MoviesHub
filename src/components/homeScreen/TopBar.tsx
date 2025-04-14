import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const TopBar = () => {
  return (
    <View>
         <View style={styles.header}>
           <TouchableOpacity>
             <Icon name="menu" size={22} color="#fff" />
           </TouchableOpacity>
   
           <Text style={styles.title}>MovieHub</Text>
   
           <TouchableOpacity>
             <Icon name="search" size={22} color="#fff" />
           </TouchableOpacity>
         </View>
    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 8,
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
   
  });
  