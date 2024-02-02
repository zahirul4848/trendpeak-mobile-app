import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import { MaterialIcons, Fontisto, Feather } from '@expo/vector-icons';
import {COLORS} from "../constants";
import {useNavigation} from "@react-navigation/native";

const LoginForm = ({userLogin, isLoading}) => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = ()=> {
    return userLogin({email, password});
  }

  return (
    <View>
      <Text style={styles.signInText}>Sign In</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          autoCapitalize='none'
          value={email}
          onChangeText={(text)=> setEmail(text)}
        />
        <MaterialIcons style={styles.icon(25)} name="alternate-email" size={30} color={COLORS.primary} />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput} 
          placeholder='Password'
          autoCapitalize='none'
          value={password}
          onChangeText={(text)=> setPassword(text)}
          secureTextEntry={!isVisible}
        />
        <Fontisto name="locked" size={25} color={COLORS.primary} style={styles.icon(28)} />
        {isVisible ? 
        <TouchableOpacity onPressOut={()=> setIsVisible(prev=> !prev)} style={styles.rightIcon}>
          <Feather name="eye" size={24} color="gray" /> 
        </TouchableOpacity>
        : 
        <TouchableOpacity onPressIn={()=> setIsVisible(prev=> !prev)} style={styles.rightIcon}>
          <Feather name="eye-off" size={24} color="gray" />
        </TouchableOpacity>
        }
      </View>
      {isLoading && <ActivityIndicator/>}
      <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
        <Text style={styles.signInButtonTxt}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotBtn} onPress={()=> navigation.navigate("ForgotPasswordScreen")}>
        <Text style={styles.forgotTxt}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpTxt}>Don't have an account?</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("RegisterScreen")}>
          <Text style={styles.signUpBtnTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  signInText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 18,
  },
  inputView: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: 16,
    position: "relative",
  },
  textInput: {
    width: "90%",
    height: 45,
    marginBottom: 5,
    paddingLeft: 50,
    paddingRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGray,
    fontSize: 16,
  },
  icon: (leftSize)=> ({
    position: "absolute",
    top: 8,
    left: leftSize,
  }),
  rightIcon: {
    position: "absolute",
    top: 8,
    right: 30,
  },
  signInButton: {
    width: "90%",
    height: 45,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
  signInButtonTxt: {
    color: COLORS.lightWhite,
    fontSize: 16,
  },
  forgotBtn: {
    marginTop: 16,
    alignItems: 'center',
    width: "40%",
    alignSelf: 'center',
    paddingVertical: 5,
  },
  forgotTxt: {
    fontSize: 16,
  },
  signUpContainer: {
    marginTop: 50,
    width: "90%",
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  signUpTxt: {
    fontSize: 16,
    color: COLORS.gray,
  },
  signUpBtnTxt: {
    color: COLORS.lightWhite,
    fontWeight: "bold",
    fontSize: 16,
  }
})