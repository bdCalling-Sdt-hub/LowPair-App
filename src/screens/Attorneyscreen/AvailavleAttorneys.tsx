import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FiltaredHeader from '../../components/FiltaredHeader';
import AttorneyCard from '../../components/AttorneyCard';
import tw from '../../lib/tailwind';

import atornyimg1 from '../../assets/images/Attorny1.png';
import atornyimg2 from '../../assets/images/atonomy2.png';
import {ScrollView} from 'react-native-gesture-handler';
import FevoriteListCard from '../../components/FevoriteListCard';
import AvailableAttorneyCard from '../../components/AvailableAttorneyCard';
import {useNavigation} from '@react-navigation/native';

const attorneys = [
  {
    id: '1',
    name: 'S.J Lucas',
    description:
      'S.J Lucas is an experienced attorney specializing in Immigration of law, e.g., Family Law, Criminal Defense, Corporate Law]. With over [4 years] of legal expertise...',
    image: atornyimg1,
  },
  {
    id: '2',
    name: 'Riley Morgan',
    description:
      'S.J Lucas is an experienced attorney specializing in Immigration of law, e.g., Family Law, Criminal Defense, Corporate Law]. With over [4 years] of legal expertise...',
    image: atornyimg2,
  },
  {
    id: '3',
    name: 'Avery Thompson',
    description: 'Helping clients with Family Law and Corporate Law cases.',
    image: atornyimg1,
  },
  {
    id: '4',
    name: 'Taylor Reed',
    description: 'Skilled in Criminal Defense and Immigration issues.',
    image: atornyimg2,
  },
  {
    id: '5',
    name: 'Jordan Blake',
    description: 'Providing expert legal guidance for 5+ years.',
    image: atornyimg1,
  },
  {
    id: '6',
    name: 'Casey Jordan',
    description: 'Specialist in Corporate Law with a strong reputation.',
    image: atornyimg1,
  },
];

const AvailavleAttorneys = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={tw` bg-[#F5F5F7] `}>
      <View style={tw`flex flex-row items-center justify-between pr-4`}>
        <FiltaredHeader title={'Back'} />
        <TouchableOpacity
          onPress={() => navigation.navigate('createownprofile')}
          style={tw`pt-2 border-b border-[#1B69AD]`}>
          <Text style={tw`text-[#1B69AD] font-semibold`}>
            Create your own profile
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`p-2`}>
        <Text style={tw`text-[#41414D] text-xl font-bold pl-2 pb-4 `}>
          Available attorneys of <Text style={tw`text-primary`}>LawPair</Text>
        </Text>
        <FlatList
          data={attorneys}
          keyExtractor={item => item.id}
          renderItem={({item}) => <AvailableAttorneyCard {...item} />}
        />
      </View>
    </ScrollView>
  );
};

export default AvailavleAttorneys;
