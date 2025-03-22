import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {availableatorny, chekcircle, correctchekcircle} from '../assets/Icons';
import tw from '../lib/tailwind';
import {useNavigation} from '@react-navigation/native';

interface AttorneyCardProps {
  name: string;
  description: string;
  image: any; // Local image import
}

const AvailableAttorneyCard: React.FC<AttorneyCardProps> = ({
  name,
  description,
  image,
}) => {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => Navigation.navigate('attornyProfile')}
      style={[
        tw`flex-row items-center bg-white p-4 rounded-xl shadow-sm mb-3 border`,
        tw`border-gray-300`,
        {
          backgroundColor: '#FFFFFF',
          shadowColor: '#00537D',
          shadowOpacity: 0.5,
          shadowOffset: {width: 0, height: 4},
          shadowRadius: 8,
          elevation: 4,
          transform: [{scale: 0.97}],
        },
      ]}>
      {/* Attorney Image */}
      <Image source={image} style={tw`w-24 h-24 rounded-sm mr-4`} />

      {/* Attorney Details */}
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-bold text-[#121221]`}>{name}</Text>
        <View style={tw`flex flex-row items-center justify-start gap-2 py-1`}>
        <Text style={tw`text-[12px] font-normal text-[#4B8FCB]`}>Immigration</Text>
        <SvgXml xml={availableatorny}/>
        </View>
        <Text style={tw`text-sm text-[#60606A]`} numberOfLines={3}>
          {description}
        </Text>
      </View>

      {/* Selection Indicator */}
    </TouchableOpacity>
  );
};

export default AvailableAttorneyCard;
