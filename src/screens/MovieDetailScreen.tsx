import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // make sure you have this installed

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

const MovieDetailScreen = () => {
  const route = useRoute<MovieDetailRouteProp>();
  const movieId = route.params.movieId; // Get the movieId from route parameters
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<boolean>(true); // Track image loading state
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [trailerLoaded, setTrailerLoaded] = useState<boolean>(false); // Track whether the trailer has been loaded

  // Fetch movie details
  useEffect(() => {
    // 👇 Updated API call to include credits but not videos initially
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWJkMjQ1ZWM2OTQ2OTg0OWM4ZmU1ZmFlMzcxMjRiYiIsIm5iZiI6MTc0NDI3MzUyMC43MDcsInN1YiI6IjY3Zjc4MDcwZWE4MGQ4NTE3NTk5NTgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9sy-_j8LGrabTBwQhhVo1p3Snc0rRUG9GBcXjtOSogA',
              Accept: 'application/json',
            },
          }
        );
        const data = response.data;
        setMovie(data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Handle image loading state
  const handleImageLoad = () => setImageLoading(false);

  // Function to load the trailer URL when the button is clicked
  const loadTrailer = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWJkMjQ1ZWM2OTQ2OTg0OWM4ZmU1ZmFlMzcxMjRiYiIsIm5iZiI6MTc0NDI3MzUyMC43MDcsInN1YiI6IjY3Zjc4MDcwZWE4MGQ4NTE3NTk5NTgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9sy-_j8LGrabTBwQhhVo1p3Snc0rRUG9GBcXjtOSogA',
            Accept: 'application/json',
          },
        }
      );
      const data = response.data;
      const trailer = data.results?.find((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube');

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        setTrailerLoaded(true); // Set trailer as loaded
      }
    } catch (error) {
      console.error('Error loading trailer:', error);
    }
  };

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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.posterContainer}>
          {imageLoading && <View style={styles.placeholder} />}
          {imageLoading && (
            <View style={styles.placeholder}>
              <ActivityIndicator size="small" color="#FFD700" />
            </View>
          )}

          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w780${movie.poster_path}` }}
            style={styles.poster}
            onLoad={handleImageLoad}
            resizeMode="cover"
          />

          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradientOverlay}>
            <Text style={styles.title}>{movie.title}</Text>
          </LinearGradient>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.dotText}>• {movie.release_date?.split('-')[0]}</Text>
            <Text style={styles.dotText}>• {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</Text>
            <Text style={styles.dotText}>• {Math.round(movie.vote_average)}/10</Text>
            <Text style={styles.dotText}>• {movie.genres?.map((g: any) => g.name).join(', ')}</Text>
          </View>

          <Text style={styles.overview}>{movie.overview}</Text>
          {trailerUrl && trailerLoaded && (
            <TouchableOpacity style={styles.playButton} onPress={() => Linking.openURL(trailerUrl)}>
              <View style={styles.btnBkg}>
                <Icon name="play-circle" size={58} color="#fff" />
                <Text style={styles.playText}>Play Trailer</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Show the play trailer button only if the trailer is not loaded yet */}
          {!trailerLoaded && (
            <TouchableOpacity style={styles.playButton} onPress={loadTrailer}>
              <View style={styles.btnBkg}>
                <Icon name="play-circle" size={58} color="#fff" />
                <Text style={styles.playText}>Load Trailer</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.castContainer}>
          <Text style={styles.sectionTitle}>Top Cast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {movie.credits?.cast?.slice(0, 10).map((actor: any) => (
              <View key={actor.id} style={styles.actorCard}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w185${actor.profile_path}` }}
                  style={styles.actorImage}
                />
                <Text style={styles.actorName}>{actor.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',


  },
  posterContainer: {
    position: 'relative',
  },
  playButton: {
              // Distance from the right side
    borderRadius: 12,    // Makes it circular
    width: 150,           // Width of the button
    height: 60,          // Height of the button (same as width for circular)

    zIndex: 999,         // Ensure it stays on top of other elements
  }
  ,
  btnBkg:{
    flexDirection:'row',
    backgroundColor:"#FFD700",
    borderRadius:12,
    justifyContent:"space-between",
    alignItems:'center',
    paddingEnd:10
  },
  playText:{
    color:"#000",
    fontWeight:'bold',
    fontSize:14
  },

  castContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actorCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  actorImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#333',
  },
  actorName: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? 0 : 0, // ignore top safe area
  },

  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#555',
    justifyContent: 'center', // centers vertically
    alignItems: 'center',     // centers horizontally
    zIndex: 1,

    height: 500,
  },
  poster: {
    width: '100%',
    height: 500,
    marginTop: 0
  },

  detailsContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  dotText: {
    color: '#aaaaaa',
    fontSize: 14,
  },

  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220, // You can increase this for a longer fade
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 15,

  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
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
    color: '#cccccc',
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
