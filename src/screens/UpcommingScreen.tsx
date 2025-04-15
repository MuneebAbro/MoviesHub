import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';  // Import the hook
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // Import the type
import { RootStackParamList } from '../navigation/Navigation';  // Import RootStackParamList

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 10;
const ITEM_WIDTH = (width - ITEM_MARGIN * 4) / 3; // 3 items + margins


interface Movie {
  id: string;
  title: string;
  poster: any;
}
type TopRatedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UpcommingScreen'>;
const UpcommingScreen = () => {
  const [UpcommingMovies, setUpcommingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
    const navigation = useNavigation<TopRatedScreenNavigationProp>(); // Type the navigation

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const headers = {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWJkMjQ1ZWM2OTQ2OTg0OWM4ZmU1ZmFlMzcxMjRiYiIsIm5iZiI6MTc0NDI3MzUyMC43MDcsInN1YiI6IjY3Zjc4MDcwZWE4MGQ4NTE3NTk5NTgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9sy-_j8LGrabTBwQhhVo1p3Snc0rRUG9GBcXjtOSogA',
          Accept: 'application/json',
        };

        const res = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
          headers,
        });

        const movies = res.data.results
          .filter((movie: any) => movie.poster_path)
          .map((movie: any) => ({
            id: movie.id.toString(),
            title: movie.title,
            poster: { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` },
          }));

        setUpcommingMovies(movies);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching top upcoming movies:', error);
        setLoading(false); // Make sure to stop the loading state if there's an error
      }
    };

    fetchUpcoming();
  }, []);

  const renderItem = ({ item }: { item: Movie }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })} // Navigation with correct parameters
        style={styles.itemContainer}
        activeOpacity={1}
      >
        <Image source={item.poster} style={styles.poster} />
      </TouchableOpacity>
    );
  

  return (
    <View style={styles.containerMain}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Upcoming Movies</Text>

        <TouchableOpacity>
          <Icon name="heart" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Loading Spinner */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={UpcommingMovies}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.grid}
          />
        </View>
      )}
    </View>
  );
};

export default UpcommingScreen;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: ITEM_MARGIN,
  },
  grid: {
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#121212',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily:'MonsterBold',
    color: '#fff',
  },
  itemContainer: {
    width: ITEM_WIDTH,
    margin: ITEM_MARGIN / 3,
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3, // poster shape
    borderRadius: 8,
    backgroundColor: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
