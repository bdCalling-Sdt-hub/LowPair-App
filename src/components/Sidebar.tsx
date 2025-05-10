import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {LogoutIcon} from '../assets/Icons';
import logo from '../assets/images/Logo.png';
import {useAuthUser} from '../lib/AuthProvider';
import tw from '../lib/tailwind';

const Sidebar: React.FC = () => {
  const {user} = useAuthUser();

  const navigation = useNavigation<any>();
  const {height} = Dimensions.get('window');
  const adjustedHeight = height - 250;

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [password, setPassword] = useState(''); // State for holding password input

  // Function to handle delete profile action
  const handleDeleteProfile = async () => {
    if (password) {
      try {
        // Remove user data from AsyncStorage
        await AsyncStorage.multiRemove(['token', 'user']);
        Alert.alert(
          'Profile Deleted',
          'Your profile has been successfully deleted.',
        );
        setModalVisible(false); // Close modal after delete
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      } catch (error) {
        console.log('Error deleting profile:', error);
        Alert.alert('Error', 'Failed to delete profile. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please enter your password.');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            // Remove both token and user data
            await AsyncStorage.multiRemove(['token', 'user']);
            // Reset navigation stack and navigate to LoginScreen
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          } catch (error) {
            console.log('Error during logout:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  const userItems = [
    'About us',
    'Legal resources',
    'Disclaimers',
    'Favorite list',
  ];
  const LawyerItems = [
    'About us',
    'Legal resources',
    'Disclaimers',
    'Update personal information',
    'Update password',
  ];
  return (
    <DrawerContentScrollView contentContainerStyle={{flex: 1, padding: 20}}>
      <Image source={logo} style={tw`mt-4 ml-4`} resizeMode="contain" />

      {/* Navigation Links */}
      <View style={[tw`mt-8 pl-4`, {height: adjustedHeight}]}>
        {user?.role === 'user'
          ? userItems
          : LawyerItems.map((item, index) => (
              <Text
                style={tw`text-[#41414D] text-[16px] font-bold  mb-4 rounded-lg`}
                key={index}
                onPress={() => {
                  const screenName =
                    item === 'Update password' ||
                    item === 'Update personal information'
                      ? 'editprofile'
                      : item;

                  navigation.navigate(screenName, {title: item});
                }}
                // Modify to correct screen
              >
                {item}
              </Text>
            ))}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={tw`text-red-500 text-[16px] font-bold mb-4 rounded-lg`}>
            Delete your profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity onPress={handleLogout} style={{marginTop: 20}}>
        <View style={tw`flex flex-row items-center`}>
          <SvgXml xml={LogoutIcon} style={tw`mr-1`} />
          <Text style={tw`text-red text-[16px] font-normal`}>Log out</Text>
        </View>
      </TouchableOpacity>

      {/* Modal for Delete Profile */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-6 rounded-lg w-80`}>
            <Text style={tw`text-xl mb-4`}>Delete Your Profile</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              style={tw`border border-gray-300 p-2 rounded-lg mb-4`}
              value={password}
              onChangeText={setPassword}
            />
            <View style={tw`flex flex-row justify-between w-full gap-2`}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`bg-red p-2 rounded-lg h-[44px] w-1/2`}>
                <Text style={tw`text-center text-lg text-white`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteProfile}
                style={tw`bg-primary p-2 rounded-lg h-[44px] w-1/2`}>
                <Text style={tw`text-center text-lg text-white`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
};

export default Sidebar;
