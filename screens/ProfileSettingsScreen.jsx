import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, commonStyles } from '../constants'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '../store/userApiSlice';
import { CheckBox } from '@rneui/themed';
import { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { setUserInfo } from '../store/authSlice';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const ProfileSettingsScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const {data: userProfile, isLoading, refetch} = useGetUserProfileQuery();
  const [updateUserProfile, {isLoading: loadingUpdate}] = useUpdateUserProfileMutation();
 
  const handleSubmit = async()=> {
    if(password && password !== confirmPassword) {
      Alert.alert("Error", "Password and confirm password are not same")
    } else {
      try {
        const response = await updateUserProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setUserInfo(response));
        Alert.alert("Success", "Profile updated successfully");
        refetch();
      } catch (err) {
        Alert.alert("Error", err?.data?.message || err.error);
      }
    }
  }

  useEffect(()=> {
    if(userProfile) {
      setName(userProfile.name),
      setEmail(userProfile.email);
    }
    refetch();
  }, [userProfile]);
  
  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="lock" size={24} color={COLORS.lightWhite} />
        </View>
        <Text style={styles.heading}>Update Profile Info</Text>
        {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}
        {userProfile && (
          <>
          <View style={styles.inputContainer}>
            <View>
              <Text style={styles.labelTxt}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder='Full Name'
                value={name}
                onChangeText={(text)=> setName(text)}
              />
            </View>
            <View>
              <Text style={styles.labelTxt}>Email</Text>
              <TextInput
                style={styles.textInput}
                placeholder='Email'
                value={email}
                onChangeText={(text)=> setEmail(text)}
              />
            </View>
            <CheckBox
              checked={changePassword}
              onPress={()=> setChangePassword(!changePassword)}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon={'checkbox-blank-outline'}
              title="Change Password?"
              containerStyle={{
                margin: 0,
                padding: 0,
                backgroundColor: "transparent",
              }}
            />
            {changePassword && (
              <>
              <View>
                <Text style={styles.labelTxt}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry
                  placeholder='Password'
                  value={password}
                  onChangeText={(text)=> setPassword(text)}
                />
              </View>
              <View>
                <Text style={styles.labelTxt}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChangeText={(text)=> setConfirmPassword(text)}
                />
              </View>
              </>
            )}
          </View>
          {loadingUpdate && <ActivityIndicator size="large" color={COLORS.primary}/>}
          <View style={[commonStyles.rowSB, {marginTop: 30}]}>
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
              <Text style={styles.buttonPrimaryTxt}>Update Profile</Text>
            </TouchableOpacity>
          </View>
          </>
        )}  
      </View>
    </KeyboardAvoidingWrapper>
  )
}

export default ProfileSettingsScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  iconContainer: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 50,
  },
  heading: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: 'column',
    rowGap: 10,
  },
  labelTxt: {
    marginBottom: 10,
    fontSize: 14,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightGray,
    fontSize: 14,
    width: 270,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    padding: 12,
    width: 270,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonPrimaryTxt: {
    color: COLORS.lightWhite,
    fontWeight: "bold",
  },
});