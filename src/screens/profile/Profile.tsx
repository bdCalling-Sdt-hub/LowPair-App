import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import tw from '../../lib/tailwind';
import {ScrollView} from 'react-native-gesture-handler';
import MainScreenHeader from '../../components/MainScreenHeader';
import {SvgXml} from 'react-native-svg';
import {editicon, emailIcon, locationicon, phoneicon} from '../../assets/Icons';
import {launchImageLibrary} from 'react-native-image-picker';

const Profile = ({navigation}: any) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, (response) => {
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
      <MainScreenHeader />
      <View style={tw`p-4`}>
        <View style={tw`flex items-center justify-center`}>
          <TouchableOpacity onPress={handleImageUpload}>
            <Image
              source={
                profileImage
                  ? {uri: profileImage}
                  : require('../../assets/images/avater.png')
              }
              style={tw`w-24 h-24 rounded-full`}
            />
          </TouchableOpacity>
          <Text style={tw`text-[20px] text-[#121221] font-bold mt-2`}>
            Riley Morgan
          </Text>
        </View>

        <View style={tw`mt-8`}>
          <Text style={tw`text-lg text-[#41414D] pb-1 font-semibold`}>
            Personal information:
          </Text>

          <View style={tw`flex-row items-center mt-2`}>
            <SvgXml xml={phoneicon} />
            <Text style={tw`text-[#41414D] ml-2`}>+123 456 7892</Text>
          </View>

          <View style={tw`flex-row items-center mt-2`}>
            <SvgXml xml={emailIcon} />
            <Text style={tw`text-[#41414D] ml-2`}>riley254@gmail.com</Text>
          </View>

          <View style={tw`flex-row items-center mt-2`}>
            <SvgXml xml={locationicon} />
            <Text style={tw`text-[#41414D] ml-2`}>43/2 New York, USA</Text>
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
