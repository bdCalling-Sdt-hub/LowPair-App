import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import FiltaredHeader from '../../components/FiltaredHeader';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  emailIcon,
  experiencedicon,
  glovalicon,
  jobicon,
  Linkicon,
  locationicon,
  phoneicon,
} from '../../assets/Icons';
import MainScreenHeader from '../../components/MainScreenHeader';
import { ScrollView } from 'react-native-gesture-handler';
type DayButton = {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
  };
  
const AttorneyProfile = () => {


    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const days: DayButton[] = [
      {id: 1, day: 'Monday', startTime: '01:00 AM', endTime: '02:30 PM'},
      {id: 2, day: 'Tuesday', startTime: '01:00 AM', endTime: '02:30 PM'},
      {id: 3, day: 'Wednesday', startTime: '01:00 AM', endTime: '02:30 PM'},
      {id: 4, day: 'Thursday', startTime: '01:00 AM', endTime: '02:30 PM'},
    ];
  
  return (
    <ScrollView style={tw`bg-[#F5F5F7] h-full`}>
      <MainScreenHeader />

      <View style={tw`px-6`}>
        <View
          style={tw`text-center  flex items-center justify-center gap-1 my-10`}>
          <Image
            height={152}
            width={152}
            source={require('../../assets/images/atonomy2.png')}
          />
          <Text style={tw`text-[20px] text-[#121221] font-bold`}>
            Riley Morgan
          </Text>
          <Text style={tw`text-[14px] text-[#60606A] font-normal`}>
            Immigration, Wills & Trusts
          </Text>
        </View>

        <View style={tw` gap-4`}>
          <Text style={tw`text-lg text-[#121221] pb-1 font-bold`}>
            Contact details
          </Text>

          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={phoneicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>+123 456 7892</Text>
          </View>

          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={emailIcon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>
              riley254@gmail.com
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={jobicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>
              Riley & Associate Law Firm
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={experiencedicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>
              4 years experience
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={locationicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>New York</Text>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={glovalicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>English</Text>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={Linkicon} />
            <Text style={tw`text-[#1E73BE] text-[16px] `}>
              www.websitedomain.com
            </Text>
          </View>
        </View>

        

        <View style={tw`bg-[#F5F5F7] h-full`}>


      <View style={tw`mt-4`}>
        <Text style={tw`text-lg text-[#121221] pb-1 font-bold`}>
          Availability
        </Text>
        
        {/* Days row */}
        <View style={tw`flex-row gap-1 mt-2`}>
          {days.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedDay(item.id)}
              style={tw`${
                selectedDay === item.id
                  ? 'bg-[#1E73BE]'
                  : 'bg-white '
              } px-[14px] py-2 rounded-full border border-[#E5E5E5]`}>
              <Text 
                style={tw` font-bold text-sm ${
                  selectedDay === item.id ? 'text-white' : 'text-[#1E73BE]'
                } `}>
                {item.day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time details */}
        {selectedDay && (
          <View style={tw`mt-4 gap-2 flex flex-row`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-[#60606A] text-[14px]`}>.Starting time - </Text>
              <Text style={tw`text-[#41414D] text-[14px]`}>
                {days.find(day => day.id === selectedDay)?.startTime}
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-[#60606A] text-[14px]`}>.Ending time - </Text>
              <Text style={tw`text-[#41414D] text-[14px]`}>
                {days.find(day => day.id === selectedDay)?.endTime}
              </Text>
            </View>
          </View>
        )}
      </View>


      <TouchableOpacity style={tw`bg-primary h-[44px] flex flex-row items-center justify-center rounded-lg my-8`}>
        <Text style={tw`text-[16px] text-[#E7E7E9] font-bold`}>Edit attorney profile</Text>
      </TouchableOpacity>
    </View>



      </View>
    </ScrollView>
  );
};

export default AttorneyProfile;
