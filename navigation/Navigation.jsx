import { NavigationContainer } from "@react-navigation/native";
// import OnboardingScreen from "../screens/OnboardingScreen";
import { DrawerNavigator } from "./DrawerNavigator";

// const Stack = createNativeStackNavigator();

// const StackNavigator = ()=> {
  // const [showOnboarding, setShowOnboarding] = useState(null);
  
  // useEffect(()=> {
  //   const checkIfAlreadyOnboarded = async()=> {
  //     let onboarded = await getItem("onboarded");
  //     if(onboarded == 1) {
  //       setShowOnboarding(false);
  //     } else {
  //       setShowOnboarding(true);
  //     }
  //   }
  //   checkIfAlreadyOnboarded();
  // }, []);

  // if(showOnboarding === null) {
  //   return null;
  // }

  // if(showOnboarding) {
  //   return(
  //     <Stack.Navigator>
  //       <Stack.Screen options={{headerShown: false}} name="Onboarding" component={OnboardingScreen} />
  //       <Stack.Screen name="AppStackScreen" component={AppStackScreen} options={{headerShown: false}} />
  //     </Stack.Navigator>
  //   );
  // } else {
  //   return(
  //     <AppStackScreen/>
  //     //<DrawerNavigator/>
  //     // <Stack.Navigator>
  //     // <Stack.Screen name="AppStackScreen" component={AppStackScreen} options={{headerShown: false}} />
  //     // </Stack.Navigator>
  //   );  
  // }
// };

const Navigation = ()=> (
  <NavigationContainer>
    <DrawerNavigator/>
  </NavigationContainer>
);

export default Navigation;