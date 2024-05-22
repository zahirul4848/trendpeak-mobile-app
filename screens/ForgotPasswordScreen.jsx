import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { useForgotPasswordMutation } from '../store/userApiSlice';
import { useState } from 'react';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();
  
  const handleSubmit = async()=> {
    try {
      const response = await forgotPassword({email}).unwrap();
      Alert.alert(response.message);
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Error", err?.data?.message || err.error);
    }
  }

  return (
    <LinearGradient colors={[COLORS.lightWhite, COLORS.secondary]} style={styles.container}>
      <KeyboardAvoidingWrapper>
        <SafeAreaView >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="lock-question" size={100} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.description}>Please enter your email address registered on your account</Text>
          <TextInput
            style={styles.input}
            placeholder='Email Address'
            autoFocus
            autoCapitalize='none'
            value={email}
            onChangeText={text=> setEmail(text)}
          />
          {isLoading && <ActivityIndicator/>}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Reset Password</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    </LinearGradient>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: COLORS.primary,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    width: 300,
  },
  input: {
    width: 300,
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    backgroundColor: COLORS.lightGray,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    margin: 10,
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: COLORS.lightWhite,
    fontSize: 16,
    fontWeight: "bold",
  }

});