import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import FiltaredHeader from '../../components/FiltaredHeader';
import AttorneyCard from '../../components/AttorneyCard';
import tw from '../../lib/tailwind';

import atornyimg1 from '../../assets/images/Attorny1.png'
import atornyimg2 from '../../assets/images/atonomy2.png'
import { ScrollView } from 'react-native-gesture-handler';
import FevoriteListCard from '../../components/FevoriteListCard';
import { useGetFevoriteListQuery } from '../../redux/features/Categorys/CategoryApi';



const FevoriteList = () => {

  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  const { data, isLoading } = useGetFevoriteListQuery({ page, per_page });
  console.log('dataaaaaaaaaaaaaaaaa', data);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const handleSelect = (id: string) => {
    setSelectedIds(prevSelectedIds =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter(selectedId => selectedId !== id) // Deselect if already selected
        : [...prevSelectedIds, id] // Select if not already selected
    );
  };


  console.log('selectedids', selectedIds);


  if (isLoading) {
    return (
      <View style={tw`flex-1 bg-[#F5F5F7]`}>
        <FiltaredHeader title={'Favorite list'} />
        <View style={tw`flex-1 justify-center items-center`}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }
  return (
    <ScrollView style={tw` bg-[#F5F5F7] `}>
      <FiltaredHeader title={'Favorite list'} />

      <View style={tw`p-2`}>
        <FlatList
          data={data?.favoriteList?.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <FevoriteListCard
              item={item} 
              {...item}
              onPress={() => handleSelect(item.id)}
            />
          )}
        />

      </View>

    </ScrollView>
  );
};

export default FevoriteList;
