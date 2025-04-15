import React, { useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

const ITEM_WIDTH = 120;
const ITEM_HEIGHT = 180;

interface Props {
  poster: any;
}

const SmolMovieCard: React.FC<Props> = ({ poster }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.card}>
      {/* Placeholder while loading */}
      {!imageLoaded && (
        <View style={styles.placeholder}>
          <ActivityIndicator size="small" color="#FFD700" />
        </View>
      )}

      {/* Actual Poster Image */}
      <Image
        source={poster}
        style={[styles.poster, { opacity: imageLoaded ? 1 : 0 }]}
        onLoad={() => setImageLoaded(true)}
        resizeMode="cover"
      />
    </View>
  );
};

export default SmolMovieCard;

const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#333',
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
