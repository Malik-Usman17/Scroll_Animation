import React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, ImageBackground } from 'react-native';

// import faker from 'faker'
import { faker } from '@faker-js/faker';

const { width, height } = Dimensions.get('screen');
faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.alphaNumeric,
    // key:  faker.random.uuid(),
    image: faker.image.avatar(),
    // image: `https://randomuser.me/api/portraits/${faker.helpers.fake(['women', 'men'])}/${faker.random.numeric(60)}.jpg`,
    // image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    //name: faker.name.findName(),
    name: faker.name.fullName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const BG_IMG = `https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/`
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;


const ScrollAnimation = () => {

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <StatusBar hidden /> */}

      {/* <Image
        source={require('../assets/bg.jpg')}
        // resizeMode='contain'
        style={StyleSheet.absoluteFillObject}
        // style={{flex: 1}}
        blurRadius={80}
      /> */}
    <ImageBackground source={require('../assets/bg.jpg')} style={StyleSheet.absoluteFillObject} blurRadius={30}>
      
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{ padding: SPACING, paddingTop: StatusBar.currentHeight || 42 }}
        renderItem={({ item, index }) => {

          const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)]
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
          })

          const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)]
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0]
          })


          return (
            <Animated.View style={{ ...styles.flatListComponentContainer, transform: [{ scale }], opacity: opacity }}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.personName}>{item.name}</Text>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </Animated.View>
          )
        }}
      />

      </ImageBackground>
    
    </View>
  )
}


const styles = StyleSheet.create({
  flatListComponentContainer: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2
  },
  personName:{
    fontSize: 22, 
    fontWeight: '700', 
    color: 'black' 
  },
  jobTitle:{ 
    fontSize: 18, 
    opacity: 0.7, 
    color: 'black' 
  },
  email:{ 
    fontSize: 14, 
    opacity: 0.8, 
    color: '#0099cc' 
  }
})


export default ScrollAnimation;