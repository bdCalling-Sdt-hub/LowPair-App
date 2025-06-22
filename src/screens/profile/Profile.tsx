import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import tw from '../../lib/tailwind';
import { ScrollView } from 'react-native-gesture-handler';

import { SvgXml } from 'react-native-svg';
import { editicon, emailIcon, locationicon, phoneicon } from '../../assets/Icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuthUser } from '../../lib/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainScreenHeader from '../../components/MainScreenHeader';

const Profile = ({ navigation }: any) => {
  const { user } = useAuthUser();
  const [userinfo, setUserinfo] = useState<string>('');
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('user');
        const parsedUser = userInfo ? JSON.parse(userInfo) : null;

        console.log('user+++++++++++++++++++', parsedUser);
        setUserinfo(parsedUser);


      } catch (error) {
        console.log("Error reading user info:", error);
      }
    };

    checkLoggedInUser();
  }, [user]);
  const [profileImage, setProfileImage] = useState<string | null>(user?.avatar);

  const handleImageUpload = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        Alert.alert('Image upload cancelled');
      } else if (response.errorCode) {
        Alert.alert('Image upload failed', response.errorMessage);
      } else {
        setProfileImage(response.assets[0].uri); // Set the image URI to state
      }
    });
  };

  return (
    <ScrollView style={tw`bg-white h-full`}>
      <MainScreenHeader ofuser={true} />
      <View style={tw`p-4`}>
        <View style={tw`flex items-center justify-center`}>
          <TouchableOpacity >
            <Image
              source={
                userinfo?.avatar
                  ? { uri: userinfo?.avatar }
                  : require('../../assets/images/avater.png')
              }
              style={tw`w-24 h-24 rounded-full`}
            />
          </TouchableOpacity>
          <Text style={tw`text-[20px] text-[#121221] font-bold mt-2`}>
            {userinfo?.first_name} {userinfo?.last_name}
          </Text>


        </View>

        <View style={tw`mt-8`}>
          <Text style={tw`text-lg text-[#41414D] pb-1 font-semibold`}>
            Personal information:
          </Text>

          <View style={tw`flex-row items-center mt-2`}>
            <SvgXml xml={phoneicon} />
            <Text style={tw`text-[#41414D] ml-2`}>+{userinfo?.phone || 'N/A'}</Text>
          </View>

          <View style={tw`flex-row items-center mt-2`}>
            <SvgXml xml={emailIcon} />
            <Text style={tw`text-[#41414D] ml-2`}>{userinfo?.email || 'N/A'}</Text>
          </View>

          <View style={tw`flex-row items-center mt-2`}>
            <SvgXml xml={locationicon} />
            <Text style={tw`text-[#41414D] ml-2`}>{userinfo?.address || 'N/A'}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('editprofile')}
          style={tw`mt-[10%] bg-primary px-4 py-2 rounded-lg flex flex-row justify-center items-center`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-white text-lg font-semibold`}>
              Edit Profile
            </Text>
            <View style={tw`ml-2`}>
              <SvgXml xml={editicon} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
