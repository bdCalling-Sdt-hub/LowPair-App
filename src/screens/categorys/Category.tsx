import { View, Text, FlatList, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import MainScreenHeader from '../../components/MainScreenHeader';
import tw from '../../lib/tailwind';
import Animated from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import { Immigration, ImmigrationactiveIcon } from '../../assets/Icons';
import { useNavigation } from '@react-navigation/native';
import { useGetAllCategoriesQuery } from '../../redux/features/Categorys/CategoryApi';

interface LegalHelpCategory {
  name: string;
  icon: string;
}

const Category = () => {
  const naviagation = useNavigation ();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  
    const [page, setPage] = useState(1);
    const [per_page,setPerPage] = useState(10);
  
    const { data, error, isLoading } = useGetAllCategoriesQuery({ page, per_page });

  // Toggle selection
  const toggleSelection = (id: string) => {
    naviagation.navigate('categoryfilter',{id});
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(id)? prevSelected.filter((item) => item !== id)   : [...prevSelected, id] 
    );
  };

  return (
    <View style={tw`bg-[#F5F5F7] h-full`}>
      <MainScreenHeader />

      <View style={tw`p-2`}>
        <Text
          style={tw`text-[20px] pl-2 text-[#121221] mt-[24px] font-bold mb-3`}>
          Find the Legal Help You Need
        </Text>

        <FlatList
          data={data?.categories?.data}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = selectedCategories.includes(item.id);

            return (
              <View style={tw`w-1/3 p-2`}>
                <Pressable
                  onPress={() => toggleSelection(item.id)}
                  style={[
                    tw`h-22 rounded-lg items-center p-2 justify-center shadow-lg`,
                    {
                      backgroundColor: '#FFFFFF',
                      shadowColor: '#00537D',
                      shadowOpacity: 0.5,
                      shadowOffset: { width: 0, height: 4 },
                      shadowRadius: 8,
                      elevation: 4,
                      transform: [{ scale: isSelected ? 0.97 : 1 }],
                      opacity: isSelected ? 0.9 : 1,
                    },
                  ]}
                >
                  <Animated.View
                    style={{
                      transform: [{ scale: isSelected ? 1.05 : 1 }],
                    }}
                  >
                    <Image
                      source={{ uri: item.image_icon }}  // Use the uri key for the image URL
                      style={tw`w-[20px] h-[20px]`}  // Tailwind CSS for styling
                      resizeMode="contain"  // Make sure the image fits inside the bounds
                    />

                  </Animated.View>
                  <Text
                    style={[
                      tw`mt-1 text-center text-xs`,
                      { color: '#10101E' },
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              </View>
            );
          }}
          removeClippedSubviews={true}
        />
      </View>
    </View>
  );
};

export default Category;
