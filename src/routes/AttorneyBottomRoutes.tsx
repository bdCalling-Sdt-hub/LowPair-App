import React from 'react';
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
            // Navigate to the route associated with the tab
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
        name="attornyProfile"
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