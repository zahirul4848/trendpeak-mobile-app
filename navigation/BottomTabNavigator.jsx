import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthStackScreen } from "./StackNavigator";
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { COLORS, icons } from "../constants";
import { Image, Pressable } from "react-native";
import { useSelector } from "react-redux";
import CategoryScreen from "../screens/CategoryScreen";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";

const AppTab = createBottomTabNavigator();

export const AppTabScreen = () => {
  const {cart} = useSelector(state=> state.cart);
  const {userInfo} = useSelector(state=> state.auth);
  return (
    <AppTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.lightWhite,
        }
      }}    
    >
      <AppTab.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused})=> (
            focused ? <Ionicons name="home" size={size} color={COLORS.primary}/> : 
            <Ionicons name="home-outline" size={size} color={COLORS.secondary}/>
          ),
          title: "Home",
        }}
      />
      <AppTab.Screen
        name="CategoryScreen" 
        component={CategoryScreen}
        options={({navigation})=> ({
          //headerShown: false,
          tabBarIcon: ({color, size, focused})=> (
            focused ? <Image source={icons.categoryPrimary} style={{height: 20, width: 20, resizeMode: "cover"}} /> : 
            <Image source={icons.categorySecondary} style={{height: 20, width: 20, resizeMode: "cover"}} />
          ),
          title: "Category",
          headerTitle: "All Categories",
          headerTitleAlign: "center",
          headerLeft: ()=> (
            <Pressable style={{marginLeft: 10}} onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </Pressable>
          ),
        })}
      />
      <AppTab.Screen
        name="CartScreen" 
        component={CartScreen}
        options={({navigation})=> ({
          headerLeft: ()=> (
            <Pressable style={{marginLeft: 10}} onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </Pressable>
          ),
          title: `Cart(${cart.length})`,
          headerTitle: `Your Cart (${cart.length})`,
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size, focused})=> (
            focused ? <MaterialCommunityIcons name="shopping" size={size} color={COLORS.primary} /> : 
            <MaterialCommunityIcons name="shopping-outline" size={size} color={COLORS.secondary} />
          ),
        })}
      />
      <AppTab.Screen 
        name="AuthStackScreen" 
        component={AuthStackScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused})=> (
            focused ? <Ionicons name="person" size={size} color={COLORS.primary} /> : 
            <Ionicons name="person-outline" size={size} color={COLORS.secondary} />
          ),
          title: userInfo?.name ? "Profile" : "Signin",
        }}
      />
    </AppTab.Navigator>
  )
}
