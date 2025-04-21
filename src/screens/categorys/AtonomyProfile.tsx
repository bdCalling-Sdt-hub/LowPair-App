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
import { useGetLawyerByIdQuery } from '../../redux/features/Categorys/CategoryApi';
type DayButton = {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
  };
  
const AtonomyProfile = ({route}) => {
const { id } = route.params || 319;


  const {data,isLoading}=useGetLawyerByIdQuery(id);
const attorneyDetails=data?.lawyer || data?.user;
console.log('userasdf',data);
const availavility = attorneyDetails?.schedule;
  console.log('Availability:====', attorneyDetails);
 
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const days: DayButton[] = [
      {id: 1, day: 'Monday', startTime: '01:00 AM', endTime: '02:30 PM'},
      {id: 2, day: 'Tuesday', startTime: '01:00 AM', endTime: '02:30 PM'},
      {id: 3, day: 'Wednesday', startTime: '01:00 AM', endTime: '02:30 PM'},
      {id: 4, day: 'Thursday', startTime: '01:00 AM', endTime: '02:30 PM'},
    ];
  
    if(isLoading){
      return(
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

      <View style={tw`px-6`}>
        <View
          style={tw`text-center  flex items-center justify-center gap-1 my-10`}>
          <Image
            height={152}
            width={152}
            style={tw`rounded-full`}
            source={(attorneyDetails?.avatar) ? {uri: attorneyDetails?.avatar} : require('../../assets/images/atonomy2.png')}
          />
          <Text style={tw`text-[20px] text-[#121221] font-bold`}>
           {attorneyDetails?.first_name} {attorneyDetails?.last_name } 
          </Text>

        
          
          <Text style={tw`text-[14px] text-[#60606A] font-normal`}>
           {attorneyDetails?.state  || 'N/A'}
          </Text>
        </View>

        <View style={tw` gap-4`}>
          <Text style={tw`text-lg text-[#121221] pb-1 font-bold`}>
            Contact details
          </Text>

          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={phoneicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>{attorneyDetails?.phone || 'N/A'}</Text>
          </View>

          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={emailIcon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>
              {attorneyDetails?.email || 'N/A'}
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={jobicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>
              {attorneyDetails?.categories}
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={experiencedicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>
             {attorneyDetails?.experience}
            </Text>
          </View>

          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={locationicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>{attorneyDetails?.state}</Text>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={glovalicon} />
            <Text style={tw`text-[#41414D] text-[16px] `}>
              {attorneyDetails?.languages}
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2 `}>
            <SvgXml xml={Linkicon} />
            <Text style={tw`text-[#1E73BE] text-[16px] `}>
              {attorneyDetails?.website || 'N/A'}
            </Text>
          </View>
        </View>

        {/* TO DO AVAILAVILITY SECTION  WHEN CLICK ON ANY DAYS BUTTON THEN IN THE BOTTOM WILL SHOW THIS FORMT : .STARTING TIME - 10:00 AM .ENDING TIME - 02:30PM AND THE BUTTONWILLE BE CHAKMARKED  */}

        <View style={tw`bg-[#F5F5F7] h-full`}>


        <View style={tw`mt-4`}>
      <Text style={tw`text-lg text-[#121221] pb-1 font-bold`}>
        Availability
      </Text>

      {/* Days row */}
      <View style={tw`flex-row flex-wrap gap-2 mt-2`}>
        {availavility?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedDay(item.day)}
            style={tw`${
              selectedDay === item.day ? 'bg-[#1E73BE]' : 'bg-white'
            } px-[14px] py-2 rounded-full border border-[#E5E5E5]`}>
            <Text
              style={tw`font-bold text-sm ${
                selectedDay === item.day ? 'text-white' : 'text-[#1E73BE]'
              }`}>
              {item.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time details */}
      {selectedDay && (
        <View style={tw`mt-4`}>
          <Text style={tw`text-[#60606A] text-[14px]`}>
            Time: 
            <Text style={tw`text-[#41414D] ml-1`}>
              {
                availavility.find(item => item.day === selectedDay)?.time || ' Not Available'
              }
            </Text>
          </Text>
        </View>
      )}
    </View>
    </View>



      </View>
    </View>
  );
};

export default AtonomyProfile;
