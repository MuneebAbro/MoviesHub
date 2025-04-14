import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import TopBar from '../components/homeScreen/TopBar'; // Assuming you already have a custom TopBar component

const { width } = Dimensions.get('window');
const POSTER_WIDTH = width * 0.35; // Poster width
const POSTER_HEIGHT = POSTER_WIDTH * 1.5; // Poster height with 2:3 aspect ratio

// Define a Movie interface for better type safety
interface Movie {
  id: string;
  title: string;
  poster: any; // The image source, can be either a URL or a local image
}

const HomeScreen = () => {
  // Dummy data for movie posters (using local images)
  const movies: Movie[] = [
    { id: '1', title: 'Movie 1', poster: require('../assets/movie.jpg') }, // Local image
    { id: '2', title: 'Movie 2', poster: require('../assets/movie.jpg') }, // Local image
    { id: '3', title: 'Movie 3', poster: require('../assets/movie.jpg') }, // Local image
  ];

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <View style={styles.card}>
      <Image source={item.poster} style={styles.poster} />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopBar /> {/* Your custom TopBar component */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Trending Movies</Text>
        <FlatList
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id}
          horizontal={true} // Scroll horizontally
          showsHorizontalScrollIndicator={false} // Hide scroll indicator
          contentContainerStyle={styles.scrollContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  content: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContent: {
    paddingLeft: 10,
  },
  card: {
    marginRight: 15,
    alignItems: 'center',
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 10,
    backgroundColor: '#444', // Placeholder color if image fails to load
  },
  movieTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default HomeScreen;
