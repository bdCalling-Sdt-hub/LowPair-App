import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDisclaimarsQuery} from '../../redux/features/Categorys/CategoryApi';
import RenderHtml from 'react-native-render-html';
import tw from 'twrnc';
import {useWindowDimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {backIcon2} from '../../assets/Icons';
import {useNavigation} from '@react-navigation/native';

const Disclaimer = () => {
  const Navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {data, isLoading, error} = useDisclaimarsQuery();

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#164D8E" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500`}>Error loading disclaimer</Text>
      </View>
    );
  }

  const htmlContent =
    data?.settings?.disclaimer || '<p>No disclaimer available</p>';

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw`pb-6`}
      style={tw`flex-1 p-4  bg-white`}>
      <View>
        <TouchableOpacity
          onPress={() => Navigation.goBack()}
          style={tw` top-4 mb-4 bg-[#cacaca] w-[40px] h-[40px] rounded-full flex items-center justify-center ml-4 `}>
          <SvgXml xml={backIcon2} width="24" height="24" />
        </TouchableOpacity>
      </View>
      <RenderHtml
        contentWidth={width}
        source={{html: htmlContent}}
        baseStyle={tw`text-gray-800`}
        tagsStyles={{
          h4: tw`text-lg font-bold mt-4 mb-2 text-gray-900`,
          strong: tw`font-bold text-gray-900`,
          p: tw`mb-3 text-justify leading-5`,
          ul: tw`mb-3 pl-4`,
          li: tw`mb-2`,
          span: tw`text-base`,
        }}
      />
    </ScrollView>
  );
};

export default Disclaimer;
