import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FiltaredHeader from '../../components/FiltaredHeader';
import tw from '../../lib/tailwind';
import {SvgXml} from 'react-native-svg';
import {
  editicon,
  emailIcon,
  experiencedicon,
  glovalicon,
  jobicon,
  Linkicon,
  locationicon,
  phoneicon,
} from '../../assets/Icons';
import {useGetuserinfoByIdQuery} from '../../redux/features/users/UserApi';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const AttorneyProfile = ({route}) => {
  const {id} = route.params || 319;
  const {data: myprofile, isLoading} = useGetuserinfoByIdQuery(id);
  const userinfo = myprofile?.user || myprofile?.lawyer;
  const navigation = useNavigation();
  const attorneyDetails = userinfo;
  const availability = attorneyDetails?.schedule || [];
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  if (isLoading) {
    return (
      <View style={tw`bg-[#F5F5F7] h-full`}>
        <FiltaredHeader title={'Attorney profile'} />
        <View style={tw`flex-1 justify-center items-center`}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[#F5F5F7]`}>
      <FiltaredHeader title={'Attorney profile'} />
      
      <ScrollView contentContainerStyle={tw`pb-24 px-6`}>
        {/* Profile Header */}
        <View style={tw`items-center justify-center gap-1 my-10`}>
          <Image
            height={152}
            width={152}
            style={tw`rounded-full`}
            source={
              attorneyDetails?.avatar
                ? {uri: attorneyDetails?.avatar}
                : require('../../assets/images/atonomy2.png')
            }
          />
          <Text style={tw`text-[20px] text-[#121221] font-bold`}>
            {attorneyDetails?.first_name} {attorneyDetails?.last_name}
          </Text>
          <Text style={tw`text-[14px] text-[#60606A] font-normal`}>
            {attorneyDetails?.state || 'N/A'}
          </Text>
        </View>

        {/* Contact Details */}
        <View style={tw`gap-4 mb-8`}>
          <Text style={tw`text-lg text-[#121221] pb-1 font-bold`}>
            Contact details
          </Text>

          {/* Phone */}
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={phoneicon} />
            <Text style={tw`text-[#41414D] text-[16px]`}>
              {attorneyDetails?.phone || 'Not provided'}
            </Text>
          </View>

          {/* Email */}
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={emailIcon} />
            <Text style={tw`text-[#41414D] text-[16px]`}>
              {attorneyDetails?.email || 'Not provided'}
            </Text>
          </View>

          {/* Practice Areas */}
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={jobicon} />
            <Text style={tw`text-[#41414D] text-[16px]`}>
              {attorneyDetails?.categories?.join(', ') || 'Not specified'}
            </Text>
          </View>

          {/* Experience */}
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={experiencedicon} />
            <Text style={tw`text-[#41414D] text-[16px]`}>
              {attorneyDetails?.experience || 'Not specified'}
            </Text>
          </View>

          {/* Location */}
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={locationicon} />
            <Text style={tw`text-[#41414D] text-[16px]`}>
              {attorneyDetails?.address || 'Not specified'}
              {attorneyDetails?.city ? `, ${attorneyDetails.city}` : ''}
              {attorneyDetails?.state ? `, ${attorneyDetails.state}` : ''}
            </Text>
          </View>

          {/* Languages */}
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={glovalicon} />
            <Text style={tw`text-[#41414D] text-[16px]`}>
              {attorneyDetails?.languages || 'Not specified'}
            </Text>
          </View>

          {/* Website */}
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml xml={Linkicon} />
            <Text style={tw`text-[#1E73BE] text-[16px]`}>
              {attorneyDetails?.web_link || 'Not provided'}
            </Text>
          </View>
        </View>

        {/* Availability Section */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-lg text-[#121221] pb-1 font-bold`}>
            Availability
          </Text>

          {availability?.length > 0 ? (
            <>
              <View style={tw`flex-row flex-wrap gap-2 mt-2`}>
                {availability?.map((item, index) => (
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

              {selectedDay && (
                <View style={tw`mt-4`}>
                  <Text style={tw`text-[#60606A] text-[14px]`}>
                    Time:{' '}
                    <Text style={tw`text-[#41414D]`}>
                      {availability?.find(item => item.day === selectedDay)
                        ?.time || 'Not specified'}
                    </Text>
                  </Text>
                </View>
              )}
            </>
          ) : (
            <Text style={tw`text-[#60606A] text-[14px] mt-2`}>
              No availability information provided
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={tw`absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('editprofile')}
          style={tw`bg-primary py-3 rounded-lg flex-row justify-center items-center`}>
          <Text style={tw`text-white text-lg font-semibold`}>Edit Profile</Text>
          <View style={tw`ml-2`}>
            <SvgXml xml={editicon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AttorneyProfile;