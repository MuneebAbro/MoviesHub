import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

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
}

const MovieList: React.FC<Props> = ({ movies }) => {
  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.itemContainer}>
      <Image source={item.poster} style={styles.poster} />
      
    </View>
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
    justifyContent:'flex-end',
    alignContent:'flex-end',
    textAlign: 'center',
    position:'absolute'
  },
});

export default MovieList;
