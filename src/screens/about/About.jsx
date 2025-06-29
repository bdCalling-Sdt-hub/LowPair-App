import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useAboutUsQuery} from '../../redux/features/Categorys/CategoryApi';
import tw from 'twrnc';
import {SvgXml} from 'react-native-svg';
import {backIcon2} from '../../assets/Icons';
import {useNavigation} from '@react-navigation/native';

const About = () => {
  const {data, isLoading, error} = useAboutUsQuery();
  const Navigation = useNavigation();

  const stripHtml = html => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#164D8E" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white p-4`}>
        <Text style={tw`text-red-500 text-lg`}>Error loading content</Text>
        <TouchableOpacity
          style={tw`mt-4 bg-blue-600 py-2 px-6 rounded-full`}
          onPress={() => refetch()}>
          <Text style={tw`text-white font-medium`}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const aboutText = data?.settings?.about
    ? stripHtml(data.settings.about)
    : 'No information available';

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View
        style={tw`flex-row items-center px-4 py-3 border-b border-gray-100`}>
        <TouchableOpacity
          onPress={() => Navigation.goBack()}
          style={tw`p-2 -ml-2`}>
          <SvgXml xml={backIcon2} width={24} height={24} />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-gray-900 ml-4`}>About Us</Text>
      </View>

      {/* Content */}
      <ScrollView style={tw`flex-1 px-5`}>
        {/* Hero Image */}
        <Image
          source={require('../../assets/images/legalresource1.png')} // Add your own image
          style={tw`w-full h-48 rounded-lg mt-6 mb-6`}
          resizeMode="cover"
        />

        {/* Main Content */}
        <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>
          Welcome to LawPair
        </Text>
        <Text style={tw`text-base text-gray-600 leading-6 mb-6`}>
          {aboutText}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
