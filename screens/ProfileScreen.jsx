import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { COLORS, commonStyles } from '../constants';
import { Divider } from '@rneui/themed';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { resetCart, resetShippingInfo } from '../store/cartSlice';
import { setItem } from '../utils/asyncStorage';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state=> state.auth);
  const handleLogout = async()=> {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetShippingInfo());
    await setItem("onboarded", '0');
  }

  useEffect(() => {
    if(userInfo?.name == undefined) {
      navigation.navigate("LoginScreen");
    }
  }, [userInfo, navigation]);
  
  return (
    <SafeAreaView>
      <View style={styles.backgroundBar} />
      <View style={styles.mainBackground}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>{userInfo?.name?.split("")[0]}</Text>
          </View>
          {/* <Avatar 
            rounded
            size={100}
            title={userInfo?.name?.split("")[0]}
            containerStyle={{backgroundColor: COLORS.primary, borderColor: COLORS.lightGray, borderWidth: 1}}
          /> */}
          <Text style={styles.nameTxt}>{userInfo?.name}</Text>
          <Text style={styles.emailTxt}>{userInfo?.email}</Text>
          <Divider 
            style={{width: "100%", marginVertical: 10}} 
            width={1} 
            color={COLORS.lightWhite} 
            orientation="horizontal" 
          />
          <View>
            <TouchableOpacity onPress={()=> navigation.navigate("WishlistScreen")} style={[commonStyles.row, {marginVertical: 10}]}>
              <AntDesign name="heart" size={20} color={COLORS.primary} />
              <Text style={styles.itemTxt}>My Saved List</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("UserOrderListScreen")} style={[commonStyles.row, {marginVertical: 10}]}>
              <Entypo name="shopping-cart" size={20} color={COLORS.primary} />
              <Text style={styles.itemTxt}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("ProfileSettingsScreen")} style={[commonStyles.row, {marginVertical: 10}]}>
              <Ionicons name="settings" size={20} color={COLORS.primary} />
              <Text style={styles.itemTxt}>Settings</Text>
            </TouchableOpacity>
          </View>
          <Divider 
            style={{width: "100%", marginVertical: 10}} 
            width={1} 
            color={COLORS.lightWhite} 
            orientation="horizontal" 
          />
          <TouchableOpacity
            onPress={handleLogout}
            style={[commonStyles.row, {marginVertical: 10}]}
          >
            <AntDesign name="logout" size={20} color="red" />
            <Text style={styles.itemTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  backgroundBar: {
    width: "100%",
    height: 150,
    backgroundColor: COLORS.primary,
  },
  mainBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.secondary,
    //position: "relative",
  },
  profileInfo: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: -50
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTxt: {
    color: COLORS.lightWhite,
    fontSize: 50,
  },
  nameTxt: {
    color: COLORS.lightWhite,
    fontSize: 25,
    marginVertical: 10,
  },
  emailTxt: {
    color: COLORS.lightWhite,
    fontSize: 15,
    marginBottom: 10,
  },
  itemTxt: {
    color: COLORS.lightWhite,
    fontSize: 20,
  }
});