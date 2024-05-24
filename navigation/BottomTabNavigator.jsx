import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthStackScreen } from "./StackNavigator";
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { COLORS } from "../constants";
import { TouchableOpacity } from "react-native";
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
        tabBarActiveTintColor: COLORS.lightWhite,
        tabBarInactiveTintColor: COLORS.lightGray2,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }
      }}    
    >
      <AppTab.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused})=> (
            focused ? <Ionicons name="home" size={size} color={COLORS.lightWhite}/> : 
            <Ionicons name="home-outline" size={size} color={COLORS.lightGray2}/>
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
            focused ? <Ionicons name="grid" size={size} color={COLORS.lightWhite} /> : 
            <Ionicons name="grid-outline" size={size} color={COLORS.lightGray2} />
          ),
          title: "Category",
          headerTitle: "All Categories",
          headerTitleAlign: "center",
          headerLeft: ()=> (
            <TouchableOpacity style={{marginLeft: 10, padding: 5}} onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
        })}
      />
      <AppTab.Screen
        name="CartScreen" 
        component={CartScreen}
        options={({navigation})=> ({
          headerLeft: ()=> (
            <TouchableOpacity style={{marginLeft: 10, padding: 5}} onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
          title: `Cart(${cart.length})`,
          headerTitle: `Your Cart (${cart.length})`,
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size, focused})=> (
            focused ? <MaterialCommunityIcons name="shopping" size={size} color={COLORS.lightWhite} /> : 
            <MaterialCommunityIcons name="shopping-outline" size={size} color={COLORS.lightGray2} />
          ),
        })}
      />
      <AppTab.Screen 
        name="AuthStackScreen" 
        component={AuthStackScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused})=> (
            focused ? <Ionicons name="person" size={size} color={COLORS.lightWhite} /> : 
            <Ionicons name="person-outline" size={size} color={COLORS.lightGray2} />
          ),
          title: userInfo?.name ? "Profile" : "Signin",
        }}
      />
    </AppTab.Navigator>
  )
}
