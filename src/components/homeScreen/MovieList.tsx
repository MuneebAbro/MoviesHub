import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SmolMovieCard from '../general/smolMovieCard'; // adjust path if needed

const ITEM_WIDTH = 120;
const ITEM_SPACING = 12;

interface Movie {
  id: string;
  title: string;
  poster: any;
}

interface Props {
  movies: Movie[];
  onPress: (movieId: string) => void;
}

const MovieList: React.FC<Props> = ({ movies, onPress }) => {
  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => onPress(item.id)} style={styles.itemContainer} activeOpacity={0.9}>
      <SmolMovieCard poster={item.poster} />
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
  },
});

export default MovieList;
