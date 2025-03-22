import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import {
  homeicon,
  categoryicon,
  profileicon,
  profileiconactive,
  categoryiconactive,
  homeiconactive,
} from '../assets/Icons';
import Category from '../screens/categorys/Category';
import Profile from '../screens/profile/Profile';
import AttorneyHomeScreen from '../screens/Attorneyscreen/AttorneyHomeScreen';
import AttorneyProfile from '../screens/Attorneyscreen/AttorneyProfile';

const Tab = createBottomTabNavigator();

function CustomTabBar({state, descriptors, navigation}: any) {
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
            navigation.navigate(route.name);
          }
        };

        // Icon Mapping for Each Tab
        let icon;
        switch (route.name) {
          case 'Home':
            icon = isFocused ? homeiconactive : homeicon;
            break;
    
          case 'attornyProfile':
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
            {/* Always show the label */}
            <Text style={tw`ml-2 font-bold ${isFocused ? 'text-[#FFFFFF]' : 'text-[#929299]'}`}>
              {options.tabBarLabel || route.name} {/* Show custom label or default name */}
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
        tabBarShowLabel: true, // Ensure label is shown
      }}
      tabBar={props => <CustomTabBar {...props} />}>

        
      <Tab.Screen
        options={{
        
          tabBarLabelStyle: {
            color: '#000000', 
            fontSize: 16, 
          },
        }}
        name="Home"
        component={AttorneyHomeScreen}
      />


      <Tab.Screen
        options={{
          
          tabBarLabel: 'Profile', 
          tabBarLabelStyle: {
            color: '#000000', 
            fontSize: 16, 
          },
        }}
        name="attornyProfile"
        component={AttorneyProfile}
      />
    </Tab.Navigator>
  );
};


export default AttorneyBottomRoutes;
