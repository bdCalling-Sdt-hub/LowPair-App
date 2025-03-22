import { View, Text, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FiltaredHeader from '../../components/FiltaredHeader';
import tw from '../../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import { Doropdown } from '../../assets/Icons';
import { useNavigation } from '@react-navigation/native';

const Filtaredcategory = () => {

    const Navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const [openLocation, setOpenLocation] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);

  // Dropdown items
  const Locateditems = [
    { label: 'New Jersey', value: 'New Jersey' },
    { label: 'New York', value: 'New York' },
    { label: 'Pennsylvania', value: 'Pennsylvania' },
    { label: 'Washington, D.C', value: 'Washington, D.C' },
  ];

  const Languageitems = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'German', value: 'German' },
    { label: 'Russian', value: 'Russian' },
  ];

  // Handle form submission
  const onSubmit = (data:any) => {
    console.log('Form Data:', data);
    if(data){
        Navigation.navigate('suggestedatoreny')
    }
  };

  return (
    <View style={tw`bg-[#F5F5F7]`}>
      <FiltaredHeader title={'Immigration'} />
      <Text style={tw`text-lg font-bold text-[#41414D] mb-4 pl-4 mt-6`}>
        You have to fill some information to continue
      </Text>

      {/* Location Dropdown */}
      <View style={tw`mb-6 px-4`}>
        <Text style={tw`text-[16px] font-normal text-[#121221]`}>
          Where are you located?
        </Text>

        <Controller
          control={control}
          name="location"
          defaultValue={Locateditems[0].label} // প্রথম আইটেমকে ডিফল্ট হিসেবে রাখুন
          render={({ field: { value, onChange } }) => (
            <View style={tw`relative`}>
              <TouchableOpacity
                onPress={() => setOpenLocation(!openLocation)}
                style={tw`flex flex-row justify-between items-center mt-2 rounded-lg p-2 bg-white border border-gray-300`}>
                <Text style={tw`text-gray-600`}>{value}</Text>
                <SvgXml xml={Doropdown} width="24" height="24" />
              </TouchableOpacity>

              {openLocation && (
                <View style={tw`p-2 mt-1 rounded-lg bg-white border border-gray-300 absolute top-12 z-50 w-full`}>
                  {Locateditems.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => {
                        onChange(item.label);
                        setOpenLocation(false);
                      }}
                      style={tw`p-2 ${value === item.label ? 'bg-red-100' : 'bg-white'}`}>
                      <Text style={tw`text-gray-600`}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      </View>

      {/* Language Dropdown */}
      <View style={tw`px-4`}>
        <Text style={tw`text-[16px] font-normal text-[#121221]`}>
          Language(s)
        </Text>

        <Controller
          control={control}
          name="language"
          defaultValue={Languageitems[0].label} 
          render={({ field: { value, onChange } }) => (
            <View style={tw`relative`}>
              <TouchableOpacity
                onPress={() => setOpenLanguage(!openLanguage)}
                style={tw`flex flex-row justify-between items-center mt-2 rounded-lg p-2 bg-white border border-gray-300`}>
                <Text style={tw`text-gray-600`}>{value}</Text>
                <SvgXml xml={Doropdown} width="24" height="24" />
              </TouchableOpacity>

              {openLanguage && (
                <View style={tw`p-2 mt-1 rounded-lg bg-white border border-gray-300 absolute top-12 z-50 w-full`}>
                  {Languageitems.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => {
                        onChange(item.label);
                        setOpenLanguage(false);
                      }}
                      style={tw`p-2 ${value === item.label ? 'bg-red-100' : 'bg-white'}`}>
                      <Text style={tw`text-gray-600`}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      </View>

      {/* Submit Button */}
      <View style={tw`px-4 mt-4`}>
        {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
        <TouchableOpacity style={tw`bg-primary h-[44px] text-white flex flex-row items-center justify-center mt-[100%] rounded-lg`} onPress={handleSubmit(onSubmit)}>
            <Text style={tw`text-[#E7E7E9] font-bold text-[16px]`}>
                Done
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filtaredcategory;
