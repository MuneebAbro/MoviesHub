import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="menu" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={styles.titleText}>
            <Text style={styles.titleYellow}>M</Text>
            <Text style={styles.title}>ovieHub</Text>
          </View>

          <TouchableOpacity>
            <Icon name="search" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Carousel Section */}
          <Swiper style={styles.wrapper} showsButtons={true}>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={{ uri: 'https://via.placeholder.com/350x150?text=Movie+1' }}
              />
              <Text style={styles.carouselText}>Movie 1</Text>
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={{ uri: 'https://via.placeholder.com/350x150?text=Movie+2' }}
              />
              <Text style={styles.carouselText}>Movie 2</Text>
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={{ uri: 'https://via.placeholder.com/350x150?text=Movie+3' }}
              />
              <Text style={styles.carouselText}>Movie 3</Text>
            </View>
          </Swiper>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  titleText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleYellow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFF00',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  carouselText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
