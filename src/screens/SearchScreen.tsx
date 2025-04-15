import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/Navigation'; 
import SearchTopBar from '../components/searchScreen/SearchTopBar';
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
  };
  

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    

 
    const navigation = useNavigation<HomeScreenNavigationProp>();

    useEffect(() => {
        const fetchPopularMovies = async () => {
          setLoading(true);
          try {
            const res = await axios.get(
                'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc',
              {
                headers: {
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWJkMjQ1ZWM2OTQ2OTg0OWM4ZmU1ZmFlMzcxMjRiYiIsIm5iZiI6MTc0NDI3MzUyMC43MDcsInN1YiI6IjY3Zjc4MDcwZWE4MGQ4NTE3NTk5NTgxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9sy-_j8LGrabTBwQhhVo1p3Snc0rRUG9GBcXjtOSogA',
                  Accept: 'application/json',
                },
              }
            );
            setAllMovies(res.data.results);
            setMovies(res.data.results); // Show them by default
          } catch (err) {
            console.error('Popular fetch error:', err);
          } finally {
            setLoading(false);
          }
        };
      
        fetchPopularMovies();
      }, []);
      

      const searchMovies = (text: string) => {
        setQuery(text);
      
        if (text.length > 0) {
          const filtered = allMovies.filter((movie) =>
            movie.title.toLowerCase().includes(text.toLowerCase())
          );
          setMovies(filtered);
        } else {
          setMovies(allMovies); // Reset to full list if empty
        }
      };
      

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() =>
        navigation.navigate('MovieDetail', { movieId: item.id })
      }>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w185${item.poster_path}`,
        }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.release_date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <SearchTopBar/>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies..."
        placeholderTextColor="#aaa"
        onChangeText={searchMovies}
        value={query}
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          query.length > 1 && !loading ? (
            <Text style={styles.noResults}>No movies found.</Text>
          ) : null
        }
      />
    </View>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      paddingHorizontal: 15,
      
    },
    searchBar: {
      height: 45,
      backgroundColor: '#1e1e1e',
      borderRadius: 8,
      paddingHorizontal: 15,
      color: '#fff',
      fontSize: 16,
      marginBottom: 10,
      fontFamily:'rubik',
    },
    list: {
      paddingBottom: 20,
      paddingTop:20
    },
    movieItem: {
      flexDirection: 'row',
      marginBottom: 15,
      backgroundColor: '#1e1e1e',
      borderRadius: 10,
      overflow: 'hidden',
    },
    poster: {
      width: 80,
      height: 120,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    info: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 16,
      fontFamily:'MonsterBold',
    },
    date: {
      color: '#aaa',
      marginTop: 5,
      fontSize: 14,
      fontFamily:'rubik',
    },
    noResults: {
      color: '#aaa',
      textAlign: 'center',
      marginTop: 30,
      fontSize: 16,
      fontFamily:'rubikSemi',
    },
  });
  