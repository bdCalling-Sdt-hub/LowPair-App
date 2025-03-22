import { View, Text, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import MainScreenHeader from '../../components/MainScreenHeader';
import tw from '../../lib/tailwind';
import Animated from 'react-native-reanimated';
import { SvgXml } from 'react-native-svg';
import { Immigration, ImmigrationactiveIcon } from '../../assets/Icons';
import { useNavigation } from '@react-navigation/native';

interface LegalHelpCategory {
  name: string;
  icon: string;
}

const Category = () => {
  const naviagation = useNavigation ();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const legalHelpCategories: LegalHelpCategory[] = [
    { name: 'Immigration', icon: 'account-group' },
    { name: 'Advance Care Planning', icon: 'file-document-edit' },
    { name: 'Residential Real Estate', icon: 'home-city' },
    { name: 'Wills & Trusts', icon: 'clipboard-text' },
    { name: 'Criminal Defense', icon: 'gavel' },
    { name: 'Family & Matrimonial', icon: 'human-male-female-child' },
    { name: 'Commercial Real Estate', icon: 'city' },
    { name: 'Trademarks', icon: 'trademark' },
    { name: 'Business Formation', icon: 'briefcase' },
  ];

  // Toggle selection
  const toggleSelection = (name: string) => {
    naviagation.navigate('categoryfilter')
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(name)? prevSelected.filter((item) => item !== name)   : [...prevSelected, name] 
    );
  };

  return (
    <View style={tw`bg-[#F5F5F7] h-full`}>
      <MainScreenHeader />

      <View style={tw`p-1`}>
        <Text style={tw`text-[20px] pl-2 text-[#41414D] mt-[24px] font-bold mb-3`}>
          Find the Legal Help You Need
        </Text>

        <FlatList
          data={legalHelpCategories}
          numColumns={2}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            const isSelected = selectedCategories.includes(item.name);

            return (
              <View style={tw`w-1/2 p-2`}>
                <Pressable
                  onPress={() => toggleSelection(item.name)}
                  style={[
                    tw`h-22 rounded-lg items-center p-2 justify-center shadow-lg`,
                    {
                      backgroundColor: isSelected ? '#1B69AD' : '#FFFFFF',
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
                  <SvgXml xml={isSelected ? ImmigrationactiveIcon : Immigration} />
                   
                  </Animated.View>
                  <Text
                    style={[
                      tw`mt-1 text-center text-xs`,
                      { color: isSelected ? '#FFFFFF' : '#10101E' },
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
