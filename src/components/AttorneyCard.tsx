import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { SvgXml } from 'react-native-svg';
import { chekcircle, correctchekcircle } from '../assets/Icons';
import tw from '../lib/tailwind';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useMarkAsFevoriteMutation } from '../redux/features/Categorys/CategoryApi';

type RootStackParamList = {
  atonomyProfile: undefined;
  // Add other screens here
};

interface AttorneyCardProps {
  id: number;
  name: string;
  description: string;
  image: string;

  selected: boolean;
  onSelect: (id: number) => void;
  attorneyDetails: any;
}

const AttorneyCard: React.FC<AttorneyCardProps> = ({ 
  name, 
  description, 
  image, 
  selected, 
  id,
  onSelect,
  attorneyDetails,

}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [token, setToken] = React.useState<string>('');
  const [markAsFavorite, { isLoading }] = useMarkAsFevoriteMutation();


console.log('attorneyDetails', attorneyDetails?.is_favorite);
  
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('Retrieved token:', storedToken); // Log retrieved token
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    getToken();
  }, []);

  const handleFavoritePress = async () => {
    // console.log('detials', attorneyDetails);
    console.log(id);

    try {
     const resp = await markAsFavorite(id).unwrap();
     console.log('mark as favorite------------------', resp);
    } catch (error) {
      console.log(error);
    }

  };




  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('atonomyProfile', { id:attorneyDetails.id || id })}
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
      <Image 
        source={{ uri: image }} 
        style={tw`w-24 h-24 rounded-sm mr-4`}
        defaultSource={require('../assets/images/avater.png')}
      />

      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-bold text-[#121221]`}>{name}</Text>
        <Text style={tw`text-sm text-[#60606A]`} numberOfLines={3}>
          {description}
        </Text>
      </View>

      <TouchableOpacity 
        onPress={handleFavoritePress} 
        disabled={isLoading}
        style={tw`ml-2`}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <SvgXml 
            xml={attorneyDetails?.is_favorite ? correctchekcircle : chekcircle} 
            width="24" 
            height="24" 
            fill={attorneyDetails?.is_favorite ? 'green' : 'gray'} 
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default AttorneyCard;