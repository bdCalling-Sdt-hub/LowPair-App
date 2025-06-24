import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import tw from '../../lib/tailwind';
import FevoriteListCard from '../../components/FevoriteListCard';
import { useGetFevoriteListQuery, useMarkasUnfevoriteMutation } from '../../redux/features/Categorys/CategoryApi';
import MainScreenHeader from '../../components/MainScreenHeader';

const FevoriteList = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [combinedData, setCombinedData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [markasUnfevorite, { isLoading: isUnfevoriteLoading }] = useMarkasUnfevoriteMutation();
  const { data, isLoading, isFetching, error, refetch } = useGetFevoriteListQuery(
    { page, per_page: perPage },
    { refetchOnMountOrArgChange: true }
  );


  useEffect(() => {
    if (data?.favoriteList?.data) {
      setCombinedData(data.favoriteList.data);
      setHasMore(data.favoriteList.current_page < data.favoriteList.last_page);
    }
  }, [data, page]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      setPage(1);
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const handleunfevorite = async (id: any) => {
    const response = await markasUnfevorite(id);
    if (response?.data?.success) {
      Alert.alert('Success', response?.data?.message);
      handleRefresh();
    }
  }

  const renderItem = useCallback(({ item }) => (
    <FevoriteListCard
      onPress={() => handleunfevorite(item.id)}
      item={item}
    />
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const handleNextPage = () => {
    if (!isFetching && hasMore) {
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
      <MainScreenHeader ofuser={true} />
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={<Text style={tw`text-center py-4`}>No favorite items found</Text>}
        contentContainerStyle={tw`pb-16`}
      />

      {/* Pagination controls */}
      <View style={tw`absolute bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-200`}>
        <View style={tw`flex-row justify-between items-center`}>
          <TouchableOpacity
            onPress={handlePrevPage}
            disabled={page === 1 || isFetching}
            style={tw`px-4 py-2 rounded ${(page === 1 || isFetching) ? 'bg-gray-200' : 'bg-blue-500'}`}
          >
            <Text style={tw`${(page === 1 || isFetching) ? 'text-gray-500' : 'text-white'}`}>Previous</Text>
          </TouchableOpacity>

          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-gray-700`}>
              Page {page} {data?.favoriteList?.last_page ? `of ${data.favoriteList.last_page}` : ''}
            </Text>
            {isFetching && (
              <ActivityIndicator size="small" style={tw`ml-2`} />
            )}
          </View>

          <TouchableOpacity
            onPress={handleNextPage}
            disabled={isFetching || !hasMore}
            style={tw`px-4 py-2 rounded ${(isFetching || !hasMore) ? 'bg-gray-200' : 'bg-blue-500'}`}
          >
            <Text style={tw`${(isFetching || !hasMore) ? 'text-gray-500' : 'text-white'}`}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FevoriteList;