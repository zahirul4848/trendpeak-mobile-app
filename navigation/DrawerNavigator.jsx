import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppTabScreen } from './BottomTabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import { Pressable, TouchableOpacity } from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ProductDetailsHeaderRight from '../components/ProductDetailsHeaderRight';
import ProductListScreen from '../screens/ProductListScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { COLORS, icons } from '../constants';
import CustomDrawer from '../components/CustomDrawer';
import CategoryScreen from '../screens/CategoryScreen';
import { Image } from 'react-native';
import InformationScreen from '../screens/InformationScreen';
import { Badge } from '@rneui/themed';
import { useSelector } from 'react-redux';
import OrderStatusScreen from '../screens/OrderStatusScreen';

const AppStack = createNativeStackNavigator();

const AppStackScreen = ()=> {
  const { cart } = useSelector(state=> state.cart);
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="AppTabScreen" component={AppTabScreen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="ProductDetailsScreen" 
        component={ProductDetailsScreen}
        options={({navigation, route})=> ({
          headerLeft: ()=> (
            <TouchableOpacity style={{padding: 5}} onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
          headerRight: ()=> (
            <ProductDetailsHeaderRight route={route} navigation={navigation} />
          ),
          headerTitle: "",
        })}
      />
      <AppStack.Screen
        name="ProductListScreen" 
        component={ProductListScreen}
        options={({navigation, route})=> ({
          headerLeft: ()=> (
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
          headerRight: ()=> (
            <Pressable style={{position: "relative", marginRight: 20}} onPress={()=> navigation.navigate("CartScreen")}>
              <MaterialCommunityIcons name="shopping-outline" size={24} color={COLORS.primary} />
              <Badge containerStyle={{position: "absolute", right: -10, top: -10}} value={cart.length} status='error' />
            </Pressable>
          ),
          title: route?.params?.title || "Products",
          headerTitleAlign: "center"
        })}
      />
      <AppStack.Screen
        name="CheckoutScreen" 
        component={CheckoutScreen}
        options={({navigation})=> ({
          headerLeft: ()=> (
            <TouchableOpacity style={{padding: 5}} onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
          headerTitle: "Checkout",
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="OrderStatusScreen" 
        component={OrderStatusScreen}
        options= {{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

export const DrawerNavigator = ()=> {
  const { cart } = useSelector(state=> state.cart);
  return (
    <Drawer.Navigator
      drawerContent={props=> <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.tertiary,
        drawerActiveTintColor: COLORS.lightWhite,
        drawerInactiveTintColor: COLORS.secondary,
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
        }
      }}
    >
      <Drawer.Screen
        name="AppStackScreen" component={AppStackScreen}
        options={{
          headerShown: false,
          drawerIcon: ({color, size, focused})=> (
            focused ? <Ionicons name="home" size={size} color={COLORS.lightWhite}/> : 
            <Ionicons name="home-outline" size={size} color={COLORS.secondary}/>
          ),
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="ProductListScreen" component={ProductListScreen}
        options={({navigation})=> ({
          drawerIcon: ({color, size, focused})=> (
            focused ? <Ionicons name="search" size={size} color={COLORS.lightWhite}/> : 
            <Ionicons name="search" size={size} color={COLORS.secondary}/>
          ),
          title: "Products",
          headerLeft: ()=> (
            <TouchableOpacity style={{marginLeft: 10, padding: 5}} onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
          headerRight: ()=> (
            <Pressable style={{position: "relative", marginRight: 20}} onPress={()=> navigation.navigate("CartScreen")}>
              <MaterialCommunityIcons name="shopping-outline" size={24} color={COLORS.primary} />
              <Badge containerStyle={{position: "absolute", right: -10, top: -10}} value={cart.length} status='error' />
            </Pressable>
          ),
          headerTitleAlign: 'center',
        })}
      />
      <Drawer.Screen
        name="CategoryScreen" component={CategoryScreen}
        options={({navigation})=> ({
          drawerIcon: ({color, size, focused})=> (
            focused ? <Image source={icons.categoryWhite} style={{height: 18, width: 18, resizeMode: "cover"}} /> : 
            <Image source={icons.categorySecondary} style={{height: 18, width: 18, resizeMode: "cover"}} />
          ),
          title: "All Categories",
          headerLeft: ()=> (
            <TouchableOpacity style={{marginLeft: 10, padding: 5}} onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
        })}
      />
      <Drawer.Screen
        name="InformationScreen" component={InformationScreen}
        options={({navigation})=> ({
          drawerIcon: ({color, size, focused})=> (
            focused ? <Ionicons name="information-circle-sharp" size={size} color={COLORS.lightWhite}/> : 
            <Ionicons name="information-circle-sharp" size={size} color={COLORS.secondary}/>
          ),
          title: "Information",
          headerLeft: ()=> (
            <TouchableOpacity style={{marginLeft: 10, padding: 5}} onPress={()=> navigation.goBack()}>
              <Entypo name="arrow-long-left" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
        })}
      />
      
    </Drawer.Navigator>
  );
}

