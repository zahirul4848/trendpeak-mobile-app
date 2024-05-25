import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react';
import {COLORS, commonStyles} from "../constants";
import { Divider } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { setShippingInfo } from '../store/cartSlice';
import { useEffect } from 'react';


const ShippingAddressForm = ({setOpenModal}) => {
  const dispatch = useDispatch();
  const {shippingInfo} = useSelector(state=> state.cart);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("Bangladesh");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");


  const errorFound = ()=> {
    let errorMessage = "";
    if(!fullName) {
      return errorMessage = "Please enter a name";
    } else if(!address) {
      return errorMessage = "Please enter address";
    } else if(!city) {
      return errorMessage = "Please enter a city";
    } else if (!phoneNumber) {
      return errorMessage = "Please enter phone number";
    } else {
      return errorMessage = "";
    }
  };
   
  const handleSubmit = ()=> {
    if(!errorFound()) {
      dispatch(setShippingInfo({shippingInfo: {shippingAddress: {fullName, address, city, postalCode, country, phoneNumber}}}));
      setOpenModal(false);
    } else {
      Alert.alert("Error", errorFound());
    }
  }

  useEffect(() => {
    if(shippingInfo) {
      const {shippingAddress} = shippingInfo;
      setFullName(shippingAddress?.fullName || "");
      setAddress(shippingAddress?.address || "");
      setCity(shippingAddress?.city || "");
      setPostalCode(shippingAddress?.postalCode || "");
      setCountry(shippingAddress?.country || "Bangladesh");
      setPhoneNumber(shippingAddress?.phoneNumber || "");
    }
  }, [shippingInfo]);
  

  return (
    <View>
      <Text style={styles.signInText}>{shippingInfo?.shippingAddress ? "Update Address" : "Add New Address"}</Text>
      <Divider style={{marginVertical: 20}} />
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.labelTxt}>Full Name*</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Full Name'
            value={fullName}
            onChangeText={(text)=> setFullName(text)}
          />
        </View>
        <View>
          <Text style={styles.labelTxt}>Address*</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Address'
            value={address}
            onChangeText={(text)=> setAddress(text)}
          />
        </View>
        <View style={commonStyles.rowSB}>
          <View style={{width: "48%"}}>
            <Text style={styles.labelTxt}>City*</Text>
            <TextInput
              style={styles.textInput}
              placeholder='City'
              value={city}
              onChangeText={(text)=> setCity(text)}
            />
          </View>
          <View style={{width: "48%"}}>
            <Text style={styles.labelTxt}>Postal Code</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Postal Code'
              value={postalCode}
              onChangeText={(text)=> setPostalCode(text)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.labelTxt}>Country</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Country'
            value={country}
            onChangeText={(text)=> setCountry(text)}
          />
        </View>
        <View>
          <Text style={styles.labelTxt}>Phone Number*</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Phone Number'
            value={phoneNumber}
            onChangeText={(text)=> setPhoneNumber(text)}
          />
        </View>
      </View>
      <View style={[commonStyles.rowSB, {marginTop: 30}]}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={()=> setOpenModal(false)}>
          <Text style={styles.buttonSecondaryTxt}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
          <Text style={styles.buttonPrimaryTxt}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ShippingAddressForm;

const styles = StyleSheet.create({
  signInText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: 'column',
    rowGap: 20,
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
    borderRadius: 10,
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 10,
    width: "45%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonSecondaryTxt: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    padding: 12,
    width: "45%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonPrimaryTxt: {
    color: COLORS.lightWhite,
    fontWeight: "bold",
  },
})