import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import TopBar from '../components/homeScreen/TopBar';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const SPACING = 10;
const POSTER_HEIGHT = CARD_WIDTH * 1.5;
const ITEM_SIZE = CARD_WIDTH + SPACING;
const SPACER_WIDTH = (width - CARD_WIDTH) / 2;

interface Movie {
  id: string;
  title: string;
  poster: any;
}

const HomeScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const movies: Movie[] = [
    { id: 'left-spacer', title: '', poster: null },
    { id: '1', title: 'Movie 1', poster: require('../assets/movie.jpg') },
    { id: '2', title: 'Movie 2', poster: require('../assets/movie.jpg') },
    { id: '3', title: 'Movie 3', poster: require('../assets/movie.jpg') },
    { id: 'right-spacer', title: '', poster: null },
  ];

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
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <Image source={item.poster} style={styles.poster} />
        <Text style={styles.movieTitle}>{item.title}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Trending Movies</Text>
        <Animated.FlatList
          data={movies}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // just looks better 👌
  },
  content: {
    flex: 1,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  scrollContent: {
   marginTop: 40
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: SPACING / 2,
    alignItems: 'center',
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
