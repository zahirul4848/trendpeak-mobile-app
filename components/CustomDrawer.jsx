import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { COLORS, commonStyles, images } from '../constants';
import { Divider } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { resetCart, resetShippingInfo } from '../store/cartSlice';
import { setItem } from '../utils/asyncStorage';

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state=> state.auth);
  
  const handleLogout = async()=> {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetShippingInfo());
    await setItem("onboarded", '0');
  }
  
  return (
    <View style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} />
        </View>
        <Divider/>
        <View style={styles.listContainer}>
          <DrawerItemList {...props}/>
        </View>
        
      </DrawerContentScrollView>
      <Divider style={{marginVertical: 10}} />
      <View style={styles.contactContainer}>
        <View style={commonStyles.row}>
          <MaterialIcons name="perm-phone-msg" size={24} color={COLORS.secondary} />
          <Text style={styles.itemTxt}>Contact Us</Text>
        </View>
        <View style={styles.contactItemContainer}>
          <Divider style={{marginVertical: 10}} />
          <View style={commonStyles.row}>
            <Entypo name="mobile" size={20} color={COLORS.primary} />
            <Text style={{color: COLORS.primary}}>+88 01766 933 850</Text>
          </View>
          {/* <Divider style={{marginVertical: 10}} /> */}
          {/* <View style={commonStyles.row}>
            <Entypo name="email" size={20} color={COLORS.primary} />
            <Text style={{color: COLORS.primary}}>info@trendpeakbd.com</Text>
          </View> */}
        </View>
      </View>
      <Divider style={{marginVertical: 10}} />
      <View style={styles.footerContainer}>
        {userInfo ? (
          <TouchableOpacity onPress={handleLogout} style={commonStyles.row}>
            <Entypo name="log-out" size={24} color={COLORS.secondary} />
            <Text style={styles.itemTxt}>Logout</Text>
          </TouchableOpacity>
        ) : (
        <TouchableOpacity onPress={()=> props.navigation.navigate("AuthStackScreen")} style={commonStyles.row}>
          <Entypo name="login" size={24} color={COLORS.secondary} />
          <Text style={styles.itemTxt}>Sign In or Sign Up</Text>
        </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  logoContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',

  },
  logo: {
    height: 30,
    width: 200,
  },
  listContainer: {
    //flex: 1,
    paddingTop: 10,
  },
  footerContainer: {
    padding: 20,
    marginBottom: 30,
  },
  contactContainer: {
    padding: 10
  },
  itemTxt: {
    color: COLORS.primary,
    fontSize: 16,
    marginLeft: 10,
  },
  contactItemContainer: {
    marginLeft: 20,
  },
})