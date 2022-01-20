import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import {Text, View} from "react-native";

const Tab = createBottomTabNavigator()

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelPosition: 'beside-icon',
      tabBarLabelStyle : {
        backgroundColor: "red",
      }
    }}
  >
    <Tab.Screen name='Movies' component={Movie}/>
    <Tab.Screen name='Tv' component={Tv} options={{tabBarBadge:3,  headerTitleStyle: {color:'purple'}, headerRight: () => <View><Text style={{color: 'black'}}>tesfasdfst</Text></View>}}/>
    <Tab.Screen name='Search' component={Search}/>
  </Tab.Navigator>
)

export default Tabs