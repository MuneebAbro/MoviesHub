import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
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
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>Some short description here...</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginBottom: ITEM_SPACING,
    marginHorizontal: 10,
    backgroundColor: '#222',
    borderRadius: 12,
    overflow: 'hidden',
  },
  poster: {
    width: ITEM_HEIGHT * 0.66,
    height: ITEM_HEIGHT,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
    marginTop: 4,
    fontSize: 13,
  },
});

export default MovieList;
