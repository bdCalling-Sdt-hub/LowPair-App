import { View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import FiltaredHeader from '../../components/FiltaredHeader';
import AttorneyCard from '../../components/AttorneyCard';
import tw from '../../lib/tailwind';

interface Lawyer {
  id: number;
  full_name: string;
  experience: string;
  categories: string[];
  avatar: string;
}

const SuggestedAttorneys: React.FC = () => {
  const route = useRoute();

  const [lawyers, setLawyers] = useState<Lawyer[]>(route.params?.lawyers || []);


  const [selectedIds, setSelectedIds] = useState<number[]>([]);






  const toggleFavorite = (id: number) => {
    setLawyers((prevLawyers) =>
      prevLawyers.map((lawyer) =>
        lawyer.id === id
          ? { ...lawyer, is_favorite: !lawyer.is_favorite }
          : lawyer
      )
    );
  };

  const handleSelect = (id: number) => {
    console.log('Toggling favorite for lawyer ID:', id);
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <View style={tw`flex-1 bg-[#F5F5F7]`}>
      <FiltaredHeader title={'Back'} />
      <FlatList
        data={lawyers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AttorneyCard
            id={item.id}
            name={item.full_name}
            description={`${item.experience} experience in ${item.categories.join(', ')}`}
            image={item.avatar}
            selected={selectedIds.includes(item.id)}
            onSelect={handleSelect}
            attorneyDetails={item}
            onToggleFavorite={toggleFavorite}
          />
        )}
        contentContainerStyle={tw`p-4`}
      />
    </View>
  );
};

export default SuggestedAttorneys;