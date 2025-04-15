import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {availableatorny} from '../assets/Icons';
import tw from '../lib/tailwind';

interface AttorneyCardProps {
  name: string;
  description: string;
  image: { uri: string };
  onPress: () => void;
}

const AvailableAttorneyCard: React.FC<AttorneyCardProps> = ({
  name,
  description,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
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
      <Image 
        source={image} 
        style={tw`w-24 h-24 rounded-sm mr-4`} 
        resizeMode="cover"
      />

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
    </TouchableOpacity>
  );
};

export default AvailableAttorneyCard;