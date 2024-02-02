import { Animated, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { baseApiUrl, images } from "../constants";

const {width, height} = Dimensions.get("screen");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.30;
const DOT_SIZE = 40;
const DOT_SPACING = 10;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

const CarouselDetailsProduct = ({carouselImages}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewPosition, setViewPosition] = useState(0);

  useEffect(()=> {
    ref.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
      viewPosition,
    })
  }, [currentIndex, viewPosition])  
  return (
    <View style={{height: ITEM_HEIGHT}}>
      <Animated.FlatList
        ref={ref}
        initialScrollIndex={currentIndex}
        data={carouselImages}
        keyExtractor={(_, index)=> index.toString()}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        horizontal
        bounces={false}
        //getItemLayout={({_, index})=> ({length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index})}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
        renderItem={({item})=> (
          <View>
            <Image source={{uri: baseApiUrl + item}} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.pagination}>
        {carouselImages.map((image, index)=> (
          <TouchableOpacity key={index} style={[styles.dot]} onPress={()=> setCurrentIndex(index)}>
            <Image source={{uri: baseApiUrl + image}} style={styles.paginationImage} />
          </TouchableOpacity>
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

export default CarouselDetailsProduct;

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    bottom: - (DOT_SPACING + DOT_SIZE),
    alignSelf: "center",
    flexDirection: "row",
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    //borderRadius: DOT_SIZE,
    backgroundColor: "#333",
    marginRight: DOT_SPACING,
  },
  paginationImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    borderColor: "#333",
    position: "absolute",
    top: - DOT_SIZE / 8,
    left: - DOT_SIZE / 8,
  },


});