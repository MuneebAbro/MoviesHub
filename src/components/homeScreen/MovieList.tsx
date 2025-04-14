import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 120;
const ITEM_HEIGHT = 180;
const ITEM_SPACING = 12;

interface Movie {
  id: string;
  title: string;
  poster: any;
}

interface Props {
  movies: Movie[];
  onPress: (movieId: string) => void; // Add the onPress callback
}

const MovieList: React.FC<Props> = ({ movies, onPress }) => {
  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => onPress(item.id)} style={styles.itemContainer} activeOpacity={1}>
      <Image source={item.poster} style={styles.poster} />
      
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    marginRight: ITEM_SPACING,
    position: 'relative',
  },
  poster: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center',
    position: 'absolute',
    bottom: 8, // Position the title at the bottom of the poster
    width: '100%',
  },
});

export default MovieList;
