import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import React from 'react'
import { setItem } from '../utils/asyncStorage';
import {COLORS, images} from "../constants";

const OnboardingScreen = ({navigation}) => {
  
  const handleDone = async()=> {
    await setItem("onboarded", '1');
    navigation.navigate("AppStackScreen");
  }

  return (
    <Onboarding
      onSkip={handleDone}
      onDone={handleDone}
      pages={[
        {
          backgroundColor: COLORS.tertiary,
          image: <Image style={styles.imageStyle} source={images.onboarding_1} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: COLORS.primary,
          image: <Image style={styles.imageStyle} source={images.onboarding_2} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: COLORS.secondary,
          image: <Image style={styles.imageStyle} source={images.onboarding_3} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: Dimensions.get("window").width - 20,
    height: 280,
    resizeMode: "contain",
  }
})