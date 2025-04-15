import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';
import  Icon  from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

type CastDetailRouteProp = RouteProp<RootStackParamList, 'CastDetailScreen'>;

const CastDetailScreen = () => {
  const route = useRoute<CastDetailRouteProp>();
  const { personId } = route.params;
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (!personId) return;  // Exit early if personId is invalid
    const fetchActorDetails = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/person/${personId}?append_to_response=movie_credits`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWJkMjQ1ZWM2OTQ2OTg0OWM4ZmU1ZmFlMzcxMjRiYiIsIm5iZiI6MTc0NDI3MzUyMC43MDcsInN1YiI6IjY3Zjc4MDcwZWE4MGQ4NTE3NTk5NTgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9sy-_j8LGrabTBwQhhVo1p3Snc0rRUG9GBcXjtOSogA',
            Accept: 'application/json',
          },
        });
        setPerson(res.data);
      } catch (error) {
        console.error('Failed to fetch actor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [personId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (!person) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: 'white' }}>Failed to load actor details.</Text>
      </View>
    );
  }

   const navigation = useNavigation<HomeScreenNavigationProp>();


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backbtn} onPress={() => navigation.goBack()}>
        
                     <Icon name="chevron-left" size={22} color="#000" />
                   </TouchableOpacity>
           
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${person.profile_path}` }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{person.name}</Text>

        {/* ➕ Bullet Info Section */}
        <View style={styles.infoSection}>
          {person.birthday && <Text style={styles.infoText}>🎂 DOB: {person.birthday}</Text>}
          {person.place_of_birth && <Text style={styles.infoText}>📍 Birthplace: {person.place_of_birth}</Text>}
          {person.known_for_department && <Text style={styles.infoText}>💼 Known for: {person.known_for_department}</Text>}
          {person.gender && (
            <Text style={styles.infoText}>
              🚻 Gender: {person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Other'}
            </Text>
          )}
          {person.popularity && <Text style={styles.infoText}>🔥 Popularity: {person.popularity.toFixed(1)}</Text>}
        </View>

        {/* 📖 Bio */}
        <Text style={styles.bio}>{person.biography || 'No bio available.'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  backbtn:{
    height:40,
    width:40,
    padding:8,
    backgroundColor:'#FFD700',
    borderRadius:12,
    position:"absolute",
    marginTop:32
   },
  profileImage: {
    width: 200,
    height: 300,
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 20,
    marginTop: 32,
  },
  name: {
    fontSize: 26,
    fontFamily:'MonsterBold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,fontFamily:'rubikSemi',
  },
  bio: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 100,
    fontFamily:'rubik',
  },
});

export default CastDetailScreen;
