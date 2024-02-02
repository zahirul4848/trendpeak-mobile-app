import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import { COLORS } from "../constants";
import {Entypo} from "@expo/vector-icons";
import { Pressable } from "react-native";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useSelector } from "react-redux";
import WishlistScreen from "../screens/WishlistScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";
import UserOrderListScreen from "../screens/UserOrderListScreen";


const AuthStack = createNativeStackNavigator();

export const AuthStackScreen = ()=> {
  const {userInfo} = useSelector(state=> state.auth);
  return (
    <AuthStack.Navigator>
      {userInfo?.name ? (
        <>
        <AuthStack.Screen
          name="ProfileScreen" 
          component={ProfileScreen}
          options={{
            headerTitleAlign: "center",
            headerTitle: "User Profile"
          }}
        />
        <AuthStack.Screen
          name="WishlistScreen" 
          component={WishlistScreen}
          options={({navigation})=> ({
            headerLeft: ()=> (
              <Pressable onPress={()=> navigation.goBack()}>
                <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
              </Pressable>
            ),
            headerTitle: "Your Saved Items",
            headerTitleAlign: "center",
          })}
        />
        <AuthStack.Screen
          name="UserOrderListScreen" 
          component={UserOrderListScreen}
          options={({navigation})=> ({
            headerLeft: ()=> (
              <Pressable onPress={()=> navigation.goBack()}>
                <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
              </Pressable>
            ),
            headerTitle: "Your Orders",
            headerTitleAlign: "center",
          })}
        />
        <AuthStack.Screen
          name="OrderDetailsScreen" 
          component={OrderDetailsScreen}
          options={({navigation})=> ({
            headerLeft: ()=> (
              <Pressable onPress={()=> navigation.navigate("UserOrderListScreen")}>
                <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
              </Pressable>
            ),
            headerTitle: "Order Details",
            headerTitleAlign: "center",
          })}
        />
        <AuthStack.Screen
          name="ProfileSettingsScreen" 
          component={ProfileSettingsScreen}
          options={({navigation})=> ({
            headerLeft: ()=> (
              <Pressable onPress={()=> navigation.goBack()}>
                <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
              </Pressable>
            ),
            headerTitle: "Profile Settings",
            headerTitleAlign: "center",
          })}
        />
        </>

      ) : (
        <>
        <AuthStack.Screen
          name="LoginScreen" 
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="ForgotPasswordScreen" 
          component={ForgotPasswordScreen}
          options={({navigation})=> ({
            headerLeft: ()=> (
              <Pressable onPress={()=> navigation.navigate("LoginScreen")}>
                <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
              </Pressable>
            ),
            headerTitle: "Forgot Password",
            headerTransparent: true,
          })}
        />
        <AuthStack.Screen
          name="ResetPasswordScreen" 
          component={ResetPasswordScreen}
          options={({navigation})=> ({
            headerLeft: ()=> (
              <Pressable onPress={()=> navigation.navigate("ForgotPasswordScreen")}>
                <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
              </Pressable>
            ),
            headerTitle: "Reset Password",
            headerTransparent: true,
          })}
        />
        <AuthStack.Screen
          name="RegisterScreen" 
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        </>
      )}      
    </AuthStack.Navigator>
  )
}