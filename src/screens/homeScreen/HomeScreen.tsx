import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import MainScreenHeader from '../../components/MainScreenHeader';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { Immigration, ImmigrationactiveIcon } from '../../assets/Icons';
import Animated from 'react-native-reanimated';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

import { useNavigation } from '@react-navigation/native';
import { useGetAllCategoriesQuery, useGetAllLeagalresourcesQuery } from '../../redux/features/Categorys/CategoryApi';
// Define types for legal help categories

interface LegalHelpCategory {
  name: string;
  icon: string;
}




const HomeScreen: React.FC = () => {
  const Navigation = useNavigation();

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
  const toggleSelection = (id: string) => {
    Navigation.navigate('categoryfilter',{id});
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id) // Remove if already selected
        : [...prevSelected, id] // Add if not selected
    );
  };


  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);


  const [legalpage, setlegalPage] = useState(1);
  const [legalper_page, legalsetPerPage] = useState(10);

  const { data, error, isLoading } = useGetAllCategoriesQuery({ page, per_page });

  const { data: legaldata, error: legalerror, isLoading: legalisLoading } = useGetAllLeagalresourcesQuery({ page: legalpage, per_page: legalper_page });

  console.log('data====================', legalerror);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching categories</Text>;

  return (
    <ScrollView style={tw`flex-1 bg-[#F5F5F7]`}>
      {/* Header */}
      <MainScreenHeader />

      {/* Attorney Search Section */}
      <View style={tw`bg-[#164D8E] py-6 px-[20px]  items-center`}>
        <Text
          style={[
            tw`text-white font-CrimsonPro px-12 text-[32px] font-bold text-center`,
            { fontFamily: 'CrimsonPro' },
          ]}>
          Find An Attorney Made Easy.
        </Text>
        <Text style={tw`text-[#E7E7E9] text-sm font-normal text-center mt-2`}>
          No hassle. No fees. We've streamlined the attorney search process so
          that you can focus on what matters most.
        </Text>
        <TouchableOpacity
          onPress={() => Navigation.navigate('Category')}
          style={tw`mt-6 bg-white py-2 px-4 rounded-sm shadow-lg shadow-[#00537D1A] max-w-[198px] w-full h-[40px]`}>
          <Text style={tw`text-[16px] font-bold text-[#10101E] text-center`}>
            Find your lawyer
          </Text>
        </TouchableOpacity>
      </View>

      {/* Legal Help Categories */}
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

      {/* Free Legal Resources */}
      <View style={tw`px-4 pt-2`}>
        <Text style={tw`text-[20px] pl-1 text-[#121221]  font-bold mb-3`}>
          Free legal resources
        </Text>

        {/* Legal Compass Card */}


        <FlatList
          data={legaldata?.legal_resources?.data || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={tw`rounded-lg overflow-hidden relative mb-4`}>

           
              <Image
                source={{ uri: item?.image }}
                style={tw`w-full h-40 `} // Placeholder background
                resizeMode="cover"
                onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
              />

              {/* Black Overlay */}
              <View style={tw`absolute inset-0 bg-black opacity-40`} />

              {/* Text and Button */}
              <View style={tw`absolute inset-0 p-5`}>
                <Text style={tw`text-white text-xl font-bold`}>
                  {item?.title}
                </Text>
                <Text style={tw`text-gray-200 text-xs font-normal mt-2`}>
                  {item.description?.slice(0, 120) + '...'}
                </Text>
                <TouchableOpacity
                  style={tw`mt-4 bg-white py-2 px-4 rounded-lg shadow-lg shadow-[#00537D1A] max-w-[126px] w-full h-[40px]`}>
                  <Text style={tw`text-[16px] font-bold text-[#001018] text-center`}>
                    Read more
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          removeClippedSubviews={true}
        />


      </View>
    </ScrollView>
  );
};

export default HomeScreen;
