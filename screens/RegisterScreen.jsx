import { Alert, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, images } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'
import RegisterForm from '../components/RegisterForm'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../store/userApiSlice'
import { setUserInfo } from '../store/authSlice'

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state=> state.auth);
  const [register, {isLoading}] = useRegisterMutation();

  const userRegistration = async(formData)=> {
    try {
      const response = await register(formData).unwrap();
      dispatch(setUserInfo(response));
      navigation.navigate("ProfileScreen");
    } catch (err) {
      Alert.alert("Error", err?.data?.message || err.error);  
    }
  }
  
  useEffect(() => {
    if(userInfo?.name !== undefined) {
      navigation.navigate("ProfileScreen");
    }
  }, [userInfo, navigation]);

  return (
    <LinearGradient colors={[COLORS.lightWhite, COLORS.secondary]} style={styles.container}>
      <KeyboardAvoidingWrapper>
        <View>
          <Image style={styles.logo} source={images.logo}/>
          <RegisterForm
            userRegistration={userRegistration}
            isLoading={isLoading}
          />
        </View>
      </KeyboardAvoidingWrapper>
    </LinearGradient>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: "80%",
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 50 : 100,
  },
});