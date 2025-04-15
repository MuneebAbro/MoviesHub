import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/Navigation'; // ✅ your path may vary
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const TopBar = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View>
         <View style={styles.header}>
           <TouchableOpacity style={styles.paddingbtn}>
             <Icon name="menu" size={22} color="#fff" />
           </TouchableOpacity>
   
   <View style={styles.header}>
   <Text style={styles.titleGold}>M</Text>
   <Text style={styles.title}>ovieHub</Text>
   </View>
          
   
           <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={styles.paddingbtn}>
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
      paddingTop: 4,
      paddingHorizontal: 20,
      paddingBottom: 4,
    },
    title: {
      fontSize: 20,
      fontFamily:'MonsterBold',
      color: '#fff',
    },
    titleGold: {
      fontSize: 22,
      fontFamily:'MonsterBold',
      color: '#FFD700',
    },
   
    paddingbtn:{
      padding:8,
  
     }
     
  });
  