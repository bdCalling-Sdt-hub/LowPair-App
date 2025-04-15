import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { menuitem } from '../assets/Icons';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { useAuthUser } from '../lib/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for your navigation parameters
type RootStackParamList = {
  attornyProfile: { id: string };
  Profile: { id: string };
  // Add other screens here as needed
};

// Extend the navigation type with your specific screens
type NavigationProps = {
  navigate: (screen: keyof RootStackParamList, params?: RootStackParamList[keyof RootStackParamList]) => void;
  dispatch: (action: any) => void;
};

const MainScreenHeader: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [attorney, setAttorney] = useState<boolean>(false);
  const { user } = useAuthUser();
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('user');
        const parsedUser = userInfo ? JSON.parse(userInfo) : null;
  
        console.log('user+++++++++++++++++++', parsedUser);
  
        if (parsedUser?.role === 'lawyer') {
          setAttorney(true);
       
        }
  
      } catch (error) {
        console.log("Error reading user info:", error);
      }
    };
  
    checkLoggedInUser();
  }, []);
  
  const handleProfilePress = () => {
    if (!user?.id) return;
    
    const screenName = attorney ? 'attornyProfile' : 'Profile';
    navigation.navigate(screenName, { id: user.id });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#F5F5F7',
      }}>
      {/* Sidebar Toggle Button */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Text style={{ fontSize: 24 }}>
          <SvgXml xml={menuitem} />
        </Text>
      </TouchableOpacity>

      <View>
        <Text
          style={{
            fontSize: 16,
            color: '#121221',
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          {`${user?.first_name || ''} ${user?.last_name || ''}`}
        </Text>
        <Text
          style={tw`text-xs text-[#929299] text-center font-normal pl-[10px]`}>
          {user?.address || 'address not set'}
        </Text>
      </View>

      {/* User Info */}
      <TouchableOpacity
        onPress={handleProfilePress}
        style={{
          marginLeft: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{ uri: user?.avatar }}
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MainScreenHeader;