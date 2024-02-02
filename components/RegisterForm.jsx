import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react';
import { MaterialIcons, Fontisto, Feather, Ionicons } from '@expo/vector-icons';
import {COLORS} from "../constants";
import { useNavigation } from '@react-navigation/native';


const RegisterForm = ({userRegistration, isLoading}) => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const errorFound = ()=> {
    let errorMessage = "";
    if(!name) {
      return errorMessage = "Please enter a name";
    } else if(!email) {
      return errorMessage = "Please enter email address";
    } else if(!password) {
      return errorMessage = "Please enter a password";
    } else if (name.length < 3 || name.length > 30) {
      return errorMessage = "Please enter a name between 3 and 30 characters";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return errorMessage = "Please enter a valid email address";
    } else if (password.length < 6 || password.length > 30) {
      return errorMessage = "Please enter a password between 6 and 30 characters";
    } else {
      return errorMessage = "";
    }
  };
   
  const handleSubmit = ()=> {
    if(!errorFound()) {
      return userRegistration({name, email, password});
    } else {
      Alert.alert("Error", errorFound());
    }
  }

  return (
    <View>
      <Text style={styles.signInText}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder='Your Name'
          value={name}
          onChangeText={(text)=> setName(text)}
        />
        <Ionicons style={styles.icon(25)} name="person" size={24} color={COLORS.primary} />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          autoCapitalize='none'
          value={email}
          onChangeText={(text)=> setEmail(text)}
        />
        <MaterialIcons style={styles.icon(25)} name="alternate-email" size={24} color={COLORS.primary} />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput} 
          placeholder='Password'
          value={password}
          onChangeText={(text)=> setPassword(text)}
          secureTextEntry={!isVisible}
          autoCapitalize='none'
        />
        <Fontisto name="locked" size={22} color={COLORS.primary} style={styles.icon(28)} />
        {isVisible ? 
        <TouchableOpacity onPressOut={()=> setIsVisible(prev=> !prev)} style={styles.rightIcon}>
          <Feather name="eye" size={22} color="gray" /> 
        </TouchableOpacity>
        : 
        <TouchableOpacity onPressIn={()=> setIsVisible(prev=> !prev)} style={styles.rightIcon}>
          <Feather name="eye-off" size={24} color="gray" />
        </TouchableOpacity>
        }
      </View>
      {isLoading && <ActivityIndicator/>}
      <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
        <Text style={styles.signInButtonTxt}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpTxt}>Already have an account?</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("LoginScreen")}>
          <Text style={styles.signUpBtnTxt}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterForm;

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
    color: COLORS.white,
  },
  signUpBtnTxt: {
    color: COLORS.lightWhite,
    fontWeight: "bold",
    fontSize: 16,
  }
})