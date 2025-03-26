import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { chekcircle, correctchekcircle } from '../assets/Icons';
import tw from '../lib/tailwind';
import { useNavigation } from '@react-navigation/native';
import { useMarkAsFevoriteMutation } from '../redux/features/Categorys/CategoryApi';

interface AttorneyCardProps {
  id: number;
  name: string;
  description: string;
  image: any;
  selected: boolean;
  onPress: () => void;
}

const AttorneyCard: React.FC<AttorneyCardProps> = ({ name, description, image, selected, onPress, id }) => {
  const navigation = useNavigation();
  
  // Use the mutation hook
  const [markAsFavorite, { isLoading }] = useMarkAsFevoriteMutation();

  const handleFavoritePress = async () => {
    try {
      const response = await markAsFavorite(id).unwrap(); // Call the mutation
      console.log('Favorite marked successfully', response);
      onPress(id); // Update selected state after marking as favorite
    } catch (error) {
      console.error('Error marking as favorite', error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('atonomyProfile')}
      style={[
        tw`flex-row items-center bg-white p-4 rounded-xl shadow-sm mb-3 border border-gray-200`,
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
      <Image source={{ uri: image }} style={tw`w-24 h-24 rounded-sm mr-4`} />

      {/* Attorney Details */}
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-bold text-[#121221]`}>{name}</Text>
        <Text style={tw`text-sm text-[#60606A]`} numberOfLines={3}>
          {description}
        </Text>
      </View>

      {/* Favorite Button */}
      <TouchableOpacity onPress={handleFavoritePress}>
        <SvgXml xml={selected ? correctchekcircle : chekcircle} width="24" height="24" fill={selected ? 'green' : 'gray'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default AttorneyCard;
