import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';
import { useNavigation, useRoute } from '@react-navigation/native';

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

const MovieDetailScreen = () => {
  const route = useRoute<MovieDetailRouteProp>();
  const movieId = route.params.movieId; // Get the movieId from route parameters
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: 'Bearer YOUR_API_KEY', // Replace with your API key
              Accept: 'application/json',
            },
          }
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // If loading, show the loader
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  // If no movie data, show error message
  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load movie details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <Text style={styles.rating}>Rating: {movie.vote_average} / 10</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 12,
  },
  detailsContainer: {
    marginTop: 15,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  releaseDate: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  rating: {
    color: '#FFD700',
    fontSize: 16,
    marginBottom: 10,
  },
  overview: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MovieDetailScreen;
