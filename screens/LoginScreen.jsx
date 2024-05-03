import { StyleSheet, Image, Platform, StatusBar } from 'react-native'
import React, { Fragment, useEffect } from 'react';
import {COLORS, images} from "../constants";
import { removeItem } from '../utils/asyncStorage';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from '../components/LoginForm';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { useLoginMutation } from '../store/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../store/authSlice';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state=> state.auth);
  const [login, {isLoading}] = useLoginMutation();
  
  const userLogin = async(formData)=> {
    try {
      const response = await login(formData).unwrap();
      dispatch(setUserInfo(response));
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  }

  useEffect(()=> {
    //removeItem("onboarded")
    if(userInfo?.name !== undefined) {
     navigation.navigate("ProfileScreen");
    }
  }, [userInfo, navigation]);

  return (
    <LinearGradient colors={[COLORS.lightWhite, COLORS.secondary]} style={styles.container}>
      <KeyboardAvoidingWrapper>
        <Fragment>
          <Image style={styles.logo} source={images.logo}/>
          <LoginForm userLogin={userLogin} isLoading={isLoading} />
        </Fragment>
      </KeyboardAvoidingWrapper>
    </LinearGradient>
  )
}

export default LoginScreen;

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
})