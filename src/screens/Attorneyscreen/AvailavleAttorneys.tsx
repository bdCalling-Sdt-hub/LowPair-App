import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AvailableAttorneyCard from '../../components/AvailableAttorneyCard';
import FiltaredHeader from '../../components/FiltaredHeader';
import tw from '../../lib/tailwind';
import { useGetLawyersQuery } from '../../redux/features/users/UserApi';

type RootStackParamList = {
  createownprofile: undefined;
  attornyProfile: { id: number }; // Fixed typo from 'atonomyProfile'
};

type Attorney = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string | null;
  avatar: string;
  role: string;
  created_at: string;
};

const AvailableAttorneys = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error
  } = useGetLawyersQuery({
    page,
    per_page: perPage,
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const availableLawyers = data?.lawyers?.data ?? [];
  const hasMore = Boolean(data?.lawyers?.next_page_url);

  const loadMoreAttorneys = () => {
    if (hasMore && !isFetching) {
      setPage(prev => prev + 1);
    }
  };

  const handleAttorneyPress = (id: number) => {
    navigation.navigate('attornyProfile', { id }); // Fixed route name
  };

  if (isLoading && page === 1) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-[#F5F5F7]`}>
        <ActivityIndicator size="large" color="#1B69AD" />
      </View>
    );
  }

  if (isError) {
    console.log('Error fetching attorneys:', error);
    return (
      <View style={tw`flex-1 justify-center items-center bg-[#F5F5F7]`}>
        <Text style={tw`text-lg text-[#41414D]`}>
          {error?.data?.message || 'Failed to fetch attorneys'}
        </Text>
      </View>
    );
  }

  if (!availableLawyers?.length) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-[#F5F5F7]`}>
        <Text style={tw`text-lg text-[#41414D]`}>No attorneys found</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[#F5F5F7]`}>
      <View style={tw`flex flex-row items-center justify-between pr-4`}>
        <FiltaredHeader title={'Back'} />
        <TouchableOpacity
          onPress={() => navigation.navigate('createownprofile')}
          style={tw`pt-2 border-b border-[#1B69AD]`}
        >
          <Text style={tw`text-[#1B69AD] font-semibold`}>
            Create your own profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`p-2 flex-1`}>
        <Text style={tw`text-[#41414D] text-xl font-bold pl-2 pb-4`}>
          Available attorneys of <Text style={tw`text-primary`}>LawPair</Text>
        </Text>

        <FlatList
          data={availableLawyers}
          keyExtractor={item => item?.id?.toString()}
          renderItem={({ item }) => (
            <AvailableAttorneyCard
              name={item?.full_name ?? 'Attorney'}
              description={`Specializes in ${item?.role ?? 'law'}`}
              image={{ uri: item?.avatar ?? '' }}
              onPress={() => handleAttorneyPress(item?.id)}
            />
          )}
          onEndReached={loadMoreAttorneys}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetching ? (
              <ActivityIndicator
                size="small"
                color="#1B69AD"
                style={tw`my-4`}
              />
            ) : null
          }
          contentContainerStyle={tw`pb-4`}
        />
      </View>
    </View>
  );
};

export default AvailableAttorneys;