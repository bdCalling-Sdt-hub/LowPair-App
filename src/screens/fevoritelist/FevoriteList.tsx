import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import tw from '../../lib/tailwind';
import FevoriteListCard from '../../components/FevoriteListCard';
import { useGetFevoriteListQuery } from '../../redux/features/Categorys/CategoryApi';
import MainScreenHeader from '../../components/MainScreenHeader';

const FevoriteList = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(20); // Made constant if not changing
  const [combinedData, setCombinedData] = useState([]); // Stores all loaded data

  const { data, isLoading, isFetching, error } = useGetFevoriteListQuery(
    { page, per_page: perPage },
    { refetchOnMountOrArgChange: true }
  );

  // Combine new data with existing data
  useEffect(() => {
    if (data?.favoriteList?.data) {
      setCombinedData(prev => {
        // Only add new data if page changed
        if (page === 1) return data.favoriteList.data;
        return [...prev, ...data.favoriteList.data];
      });
    }
  }, [data, page]);

  const renderItem = useCallback(({ item }) => (
    <FevoriteListCard item={item} />
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const handleNextPage = () => {
    if (!isFetching) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1 && !isFetching) {
      setPage(prev => prev - 1);
    }
  };

  if (isLoading && page === 1) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[#F5F5F7]`}>
      <MainScreenHeader/>
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        windowSize={5}
        ListEmptyComponent={<Text>No items found</Text>}
      />

      <View style={tw`p-2 bg-white border-t border-gray-200`}>
        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            onPress={handlePrevPage}
            disabled={page === 1 || isFetching}
            style={tw`px-4 py-2 rounded ${(page === 1 || isFetching) ? 'bg-gray-200' : 'bg-blue-500'}`}
          >
            <Text style={tw`${(page === 1 || isFetching) ? 'text-gray-500' : 'text-white'}`}>Previous</Text>
          </TouchableOpacity>
          
          <Text style={tw`self-center`}>
            Page {page}
          </Text>
          
          <TouchableOpacity
            onPress={handleNextPage}
            disabled={isFetching}
            style={tw`px-4 py-2 rounded ${isFetching ? 'bg-gray-200' : 'bg-blue-500'}`}
          >
            <Text style={tw`${isFetching ? 'text-gray-500' : 'text-white'}`}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FevoriteList;