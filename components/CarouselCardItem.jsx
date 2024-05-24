import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native'
import React, { useRef } from 'react';
import { images } from "../constants";

const {width, height} = Dimensions.get("screen");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.20;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const carouselImages = [
  images.carousel_1,
  images.carousel_2,
  images.carousel_3,
  images.carousel_4,
];

const CarouselCardItem = ({item, index}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={{height: ITEM_HEIGHT, overflow: "hidden"}}>
      <Animated.FlatList
        data={carouselImages}
        keyExtractor={(_, index)=> index.toString()}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        horizontal
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
        renderItem={({item})=> (
          <View>
            <Image source={item} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.pagination}>
        {carouselImages.map((_, index)=> (
          <View key={index} style={[styles.dot]} />
        ))}
        <Animated.View
          style={[styles.dotIndicator, {
            transform: [{
              translateX: Animated.divide(scrollX, ITEM_WIDTH).interpolate({
                inputRange: [0, 1],
                outputRange: [0, DOT_INDICATOR_SIZE],
              }) }]
          }]}

        />
      </View>
    </View>
  )
}

export default CarouselCardItem;

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    bottom: DOT_SPACING,
    right: 20,
    flexDirection: "row",
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: "#333",
    marginRight: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    borderColor: "#333",
    position: "absolute",
    top: - DOT_SIZE / 2,
    left: - DOT_SIZE / 2,
  },


});