import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FiltaredHeader from '../../components/FiltaredHeader';
import tw from '../../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import {
  emailIcon,
  experiencedicon,
  glovalicon,
  jobicon,
  Linkicon,
  locationicon,
  phoneicon,
} from '../../assets/Icons';

import { useGetMyprofileQuery } from '../../redux/features/users/UserApi';
type DayButton = {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
};

const LawyerProfile = () => {



  const { data, isLoading } = useGetMyprofileQuery();
  console.log('lawyerprofile', data);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days: DayButton[] = [
    { id: 1, day: 'Monday', startTime: '01:00 AM', endTime: '02:30 PM' },
    { id: 2, day: 'Tuesday', startTime: '01:00 AM', endTime: '02:30 PM' },
    { id: 3, day: 'Wednesday', startTime: '01:00 AM', endTime: '02:30 PM' },
    { id: 4, day: 'Thursday', startTime: '01:00 AM', endTime: '02:30 PM' },
  ];

  if (isLoading) {
    return (
      <View style={tw`bg-[#F5F5F7] h-full`}>
        <FiltaredHeader title={'Attorney profile'} />
        <View style={tw`flex-1 justify-center items-center`}>
          <Text>Loading...</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={tw`bg-[#F5F5F7] h-full`}>
      <FiltaredHeader title={'Attorney profile'} />
      <Text>Lawyer profile</Text>
    </View>
  );
};

export default LawyerProfile;
