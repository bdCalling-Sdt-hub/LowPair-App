import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
import {useNavigation} from '@react-navigation/native';
import {backIcon, backIcon2} from '../assets/Icons';
import {SvgXml} from 'react-native-svg';



const FiltaredHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={tw`p-4`}>
      <View style={tw`flex flex-row items-center gap-1 mt-4 `}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={tw`text-[#121221] text-[20px]  font-bold`}>
            <SvgXml xml={backIcon2} />
          </Text>
        </TouchableOpacity>

        <Text style={tw`text-[#121221] text-[20px] font-bold`}>{title}</Text>
      </View>
    </View>
  );
};

export default FiltaredHeader;
