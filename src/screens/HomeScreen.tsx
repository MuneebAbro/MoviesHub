import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TopBar from '../components/homeScreen/TopBar';
import MovieList from '../components/homeScreen/MovieList';
import axios from 'axios';  // Import axios
import { useNavigation } from '@react-navigation/native';
import MovieCard from '../components/general/MovieCard'; // update with correct path
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/Navigation'; // ✅ your path may vary
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;


const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const SPACING = 2;
const POSTER_HEIGHT = CARD_WIDTH * 1.5;
const ITEM_SIZE = CARD_WIDTH + SPACING;
const SPACER_WIDTH = (width - CARD_WIDTH) / 2;

interface Movie {
  id: string;
  title: string;
  poster: any;
}

const HomeScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]); // State for trending movies
  const [allMovies, setAllMovies] = useState<Movie[]>([]); // State for popular movies (All Movies)
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]); // State for upcoming movies
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [loading, setLoading] = useState(true); // 👈 Add this




  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const headers = {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWJkMjQ1ZWM2OTQ2OTg0OWM4ZmU1ZmFlMzcxMjRiYiIsIm5iZiI6MTc0NDI3MzUyMC43MDcsInN1YiI6IjY3Zjc4MDcwZWE4MGQ4NTE3NTk5NTgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9sy-_j8LGrabTBwQhhVo1p3Snc0rRUG9GBcXjtOSogA',  // Make sure to replace with your actual API key
          Accept: 'application/json',
        };

        // 👑 Trending for carousel
        const trendingResponse = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day',
          { headers }
        );

        const trending = trendingResponse.data.results
          .filter((movie: any) => movie.poster_path)
          .map((movie: any) => ({
            id: movie.id.toString(),
            title: movie.title,
            poster: { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` },
          }));

        const paddedTrending = [
          { id: 'left-spacer', title: '', poster: null },
          ...trending,
          { id: 'right-spacer', title: '', poster: null },
        ];

        setTrendingMovies(paddedTrending);
        setLoading(false);

        // 🌍 Popular for the full list
        const popularResponse = await axios.get(
          'https://api.themoviedb.org/3/movie/top_rated',
          { headers }
        );

        const allMovies = popularResponse.data.results
          .filter((movie: any) => movie.poster_path)
          .map((movie: any) => ({
            id: movie.id.toString(),
            title: movie.title,
            poster: { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` },
          }));

        setAllMovies(allMovies);
        setLoading(false);

        // 🎬 Upcoming movies
        const upcomingResponse = await axios.get(
          'https://api.themoviedb.org/3/movie/upcoming',
          { headers }
        );

        const upcomingMovies = upcomingResponse.data.results
          .filter((movie: any) => movie.poster_path)
          .map((movie: any) => ({
            id: movie.id.toString(),
            title: movie.title,
            poster: { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` },
          }));

        setUpcomingMovies(upcomingMovies);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

 

  const renderMovieCard = ({ item, index }: { item: Movie; index: number }) => {
    if (!item.poster) return <View style={{ width: SPACER_WIDTH }} />;
  
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];
  
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });
  
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });
  
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })} // Pass movieId as a parameter
        style={styles.card}
        activeOpacity={1}
      >
        <MovieCard poster={item.poster} scale={scale} opacity={opacity} />
      </TouchableOpacity>
    );
  };
  
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopBar />

      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.content}>
          {/* Trending Movies Section */}
         
          <Animated.FlatList
            data={trendingMovies}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            renderItem={renderMovieCard}
            snapToInterval={ITEM_SIZE}
            decelerationRate="fast"
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          />

          {/* All Movies Section */}
          <View style={styles.sectionHeaderList}>
            <Text style={styles.sectionTitle}>Top Rated Movies</Text>
            <TouchableOpacity style={styles.seeAllButton}  onPress={() => navigation.navigate('TopRatedScreen')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <MovieList movies={allMovies.filter((movie) => movie.poster !== null)}
           onPress={(movieId) => {
            // Handle the press event here, e.g., navigate to the movie detail screen
            navigation.navigate('MovieDetail', { movieId });
          }} />

          {/* Upcoming Movies Section */}
          <View style={styles.sectionHeaderList}>
            <Text style={styles.sectionTitle}>Upcoming Movies</Text>
            <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate('UpcommingScreen')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <MovieList movies={upcomingMovies.filter((movie) => movie.poster !== null)}
           onPress={(movieId) => {
            // Handle the press event here, e.g., navigate to the movie detail screen
            navigation.navigate('MovieDetail', { movieId });
          }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#121212'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  
  scrollViewContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    
   
    paddingHorizontal: 10,
  },
  scrollContent: {
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sectionHeaderList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 0
  },
  seeAllButton: {
    padding: 5,
    
  },
  seeAllText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    width: CARD_WIDTH ,
    marginHorizontal: SPACING / 2,
    alignItems: 'center',
    marginBottom:30
  },
  poster: {
    width: '100%',
    height: POSTER_HEIGHT,
    borderRadius: 12,
    backgroundColor: '#333',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default HomeScreen;
