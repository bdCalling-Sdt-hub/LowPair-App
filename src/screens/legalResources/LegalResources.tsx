import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { useGetAllLeagalresourcesQuery } from '../../redux/features/Categorys/CategoryApi';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { SvgXml } from 'react-native-svg';
import { backIcon2 } from '../../assets/Icons';

const { width } = Dimensions.get('window');

const LegalResources = () => {
    const Navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState('All');
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);

    const {
        data: legalData,
        error,
        isLoading,
        isFetching
    } = useGetAllLeagalresourcesQuery({ page, per_page: perPage });

    const categories = [
        'All',

    ];

    const filteredResources = legalData?.legal_resources?.data



    const handleCategoryPress = (category: string) => {
        setActiveCategory(category);
        setPage(1); // Reset to first page when changing category
    };

    const loadMore = () => {
        if (legalData?.legal_resources?.next_page_url) {
            setPage(prev => prev + 1);
        }
    };

    if (isLoading && page === 1) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#164D8E" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-red-500`}>Error loading resources</Text>
            </View>
        );
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`bg-gray-50 flex-1 pb-4`}>
            <View>
                <TouchableOpacity
                    onPress={() => Navigation.goBack()}
                    style={tw` top-4 mb-4 bg-[#cacaca] w-[40px] h-[40px] rounded-full flex items-center justify-center ml-4 `}
                >
                    <SvgXml xml={backIcon2} width="24" height="24" />

                </TouchableOpacity>
            </View>
            <View style={tw`p-4`}>
                <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>Free Legal Resources</Text>
                <Text style={tw`text-gray-600 mb-4`}>Access helpful guides and information</Text>



                {/* Resources List */}
                {filteredResources.length > 0 ? (
                    <FlatList
                        scrollEnabled={false}
                        data={filteredResources}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={tw`bg-white rounded-lg shadow-sm mb-4 overflow-hidden`}
                                onPress={() => Navigation.navigate('ResourceDetail', { resourceId: item.id })}
                            >
                                <Image
                                    source={{ uri: item.image || 'https://via.placeholder.com/400x300?text=Legal+Resource' }}
                                    style={tw`w-full h-40`}
                                    resizeMode="cover"
                                />
                                <View style={tw`p-4`}>
                                    <View style={tw`flex-row justify-between items-start mb-2`}>
                                        <Text style={tw`text-lg font-semibold text-gray-900 flex-1`}>{item.title}</Text>
                                        {item.category && (
                                            <View style={tw`bg-blue-100 px-2 py-1 rounded-full`}>
                                                <Text style={tw`text-blue-800 text-xs`}>{item.category}</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text
                                        style={tw`text-gray-600 text-sm mb-3`}
                                        numberOfLines={2}
                                    >
                                        {item.description}
                                    </Text>
                                    <TouchableOpacity
                                        style={tw`flex-row items-center`}
                                        onPress={() => Navigation.navigate('ResourceDetail', { resourceId: item.id })}
                                    >
                                        <Text style={tw`text-blue-600 font-medium`}>Learn more</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={
                            isFetching && page > 1 ? (
                                <View style={tw`py-4`}>
                                    <ActivityIndicator size="small" color="#164D8E" />
                                </View>
                            ) : legalData?.legal_resources?.next_page_url ? (
                                <TouchableOpacity
                                    style={tw`bg-blue-50 py-3 rounded-lg items-center mt-2`}
                                    onPress={loadMore}
                                >
                                    <Text style={tw`text-blue-600 font-medium`}>Load More</Text>
                                </TouchableOpacity>
                            ) : null
                        }
                    />
                ) : (
                    <View style={tw`py-10 items-center`}>
                        <Text style={tw`text-gray-500`}>No resources found in this category</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default LegalResources;