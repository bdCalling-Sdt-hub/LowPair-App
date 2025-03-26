import { View, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import FiltaredHeader from '../../components/FiltaredHeader';
import AttorneyCard from '../../components/AttorneyCard';
import tw from '../../lib/tailwind';

const SuggestedAttorneys: React.FC = () => {
  const route = useRoute();
  const lawyers = route.params?.lawyers || []; // Navigated data

  console.log('Received Lawyers:', lawyers);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <ScrollView style={tw`bg-[#F5F5F7]`}>
      <FiltaredHeader title={'Back'} />
      <View style={tw`p-4`}>
        <FlatList
          data={lawyers} // **Using lawyers from route**
          keyExtractor={(item) => item.id.toString()} // Convert ID to string for key
          renderItem={({ item }) => (
            <AttorneyCard
              id={item.id}
              name={item.full_name}
              description={`${item.experience} experience in ${item.categories.join(', ')}`}
              image={item.avatar}
              selected={selectedIds.includes(item.id)}
              onPress={handleSelect}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default SuggestedAttorneys;
