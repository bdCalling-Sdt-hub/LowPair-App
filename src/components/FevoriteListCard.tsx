import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { correctchekcircle } from '../assets/Icons';
import tw from '../lib/tailwind';
import { useNavigation } from '@react-navigation/native';

interface AttorneyCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    image: any; // যদি এটা uri হয় তাহলে image={{ uri: item.image }} দিতে হবে
  };
  onPress: () => void;
}

const FevoriteListCard: React.FC<AttorneyCardProps> = ({ item, onPress }) => {
  const navigation = useNavigation<any>();
console.log('itemfromfebcard', item);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('atonomyProfile', { id: item.id })}
      style={[
        tw`flex-row items-center bg-white p-4 rounded-xl shadow-sm mb-3 border`,
        tw`border-gray-300`,
        {
          backgroundColor: '#FFFFFF',
          shadowColor: '#00537D',
          shadowOpacity: 0.5,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
          elevation: 4,
          transform: [{ scale: 0.97 }],
        },
      ]}
    >
      {/* Attorney Image */}
      <Image source={{ uri: item.avatar }} style={tw`w-24 h-24 rounded-sm mr-4`} />

      {/* Attorney Details */}
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-bold text-[#121221]`}>{item.first_name + ' ' + item.last_name}</Text>
        <Text style={tw`text-sm text-[#60606A]`} numberOfLines={3}>
          {item.experience}
        </Text>
      </View>

      {/* Selection Icon */}
      <TouchableOpacity onPress={onPress}>
        <SvgXml xml={correctchekcircle} width="24" height="24" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FevoriteListCard;
