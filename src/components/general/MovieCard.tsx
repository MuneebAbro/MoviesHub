import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const SPACING = 2;
const POSTER_HEIGHT = CARD_WIDTH * 1.5;

interface MovieCardProps {
  poster: any;
  scale: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
}

const MovieCard = ({ poster, scale, opacity }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }], opacity }]}>
      {/* Placeholder with loading spinner */}
      <View style={styles.placeholderCard}>
        {!imageLoaded && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#FFD700" />
          </View>
        )}
      </View>

      {/* Image appears on top when loaded */}
      <Image
        source={poster}
        style={[styles.poster, { opacity: imageLoaded ? 1 : 0 }]}
        onLoad={() => setImageLoaded(true)}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginHorizontal: SPACING / 2,
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: POSTER_HEIGHT,
    borderRadius: 12,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  placeholderCard: {
    width: '100%',
    height: POSTER_HEIGHT,
    borderRadius: 12,
    backgroundColor: '#2e2e2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
