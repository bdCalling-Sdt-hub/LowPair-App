import React, { useEffect } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import {
  homeicon,
  profileicon,
  profileiconactive,
  homeiconactive,
} from '../assets/Icons';
import AttorneyHomeScreen from '../screens/Attorneyscreen/AttorneyHomeScreen';
import AttorneyProfile from '../screens/Attorneyscreen/AttorneyProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


function CustomTabBar({state, descriptors, navigation}: any) {

  const isFocused = useIsFocused();

  const [user, setUser] = React.useState(null);
  useEffect(() => {
    const logdinuser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('user');
        const parsedUser = userInfo ? JSON.parse(userInfo) : null;
        setUser(parsedUser);
      } catch (error) {
        console.log('Error reading user info:', error);
      }
    }
    logdinuser();
  }, [isFocused]);
  return (
    <View style={tw`flex-row justify-around px-4 h-16 items-center bg-white`}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // Navigate to the route associated with the tab
            navigation.navigate(route.name, { id: user?.id});
          }
        };

        // Icon Mapping for Each Tab
        let icon;
        switch (route.name) {
          case 'Home':
            icon = isFocused ? homeiconactive : homeicon;
            break;
          case 'atonomyProfile':
            icon = isFocused ? profileiconactive : profileicon;
            break;
          default:
            icon = homeicon;
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={tw`flex-row items-center px-4 py-2 rounded-full ${
              isFocused ? 'bg-primary' : 'bg-transparent'
            }`}>
            <SvgXml xml={icon} width={24} height={24} />
            <Text style={tw`ml-2 font-bold ${isFocused ? 'text-[#FFFFFF]' : 'text-[#929299]'}`}>
              {options.tabBarLabel || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const AttorneyBottomRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true, 
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      
      <Tab.Screen
        name="Home"
        component={AttorneyHomeScreen}
        options={{
          tabBarLabel: 'Home', // Explicit label
          tabBarLabelStyle: {
            color: '#000000', 
            fontSize: 16, 
          },
        }}
      />

      <Tab.Screen
        name="atonomyProfile"
        component={AttorneyProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            color: '#000000',
            fontSize: 16,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AttorneyBottomRoutes;