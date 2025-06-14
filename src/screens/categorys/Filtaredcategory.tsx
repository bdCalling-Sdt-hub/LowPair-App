import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FiltaredHeader from '../../components/FiltaredHeader';
import tw from '../../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import { Doropdown } from '../../assets/Icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFindLawyerQuery } from '../../redux/features/Categorys/CategoryApi';

const Filtaredcategory = () => {
  const route = useRoute();
  const { id } = route.params; // Extract id from params
  const Navigation = useNavigation();
  
  const { control, handleSubmit } = useForm({
    defaultValues: {
      location: 'New Jersey', // Set default value for location
      language: 'English'    // Set default value for language
    }
  });
  
  const [openLocation, setOpenLocation] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);



  const [service_ids, setServiceIds] = useState([]);
  const [state, setState] = useState('New Jersey');
  const [language, setLanguage] = useState('English');
  const { data, error, isLoading } = useFindLawyerQuery({
    service_ids,
    state,
    language,
  });
  

  // Fetch data only when queryParams is set

  console.log('shobkisu',service_ids, state, language);

  

  // Dropdown items
  const LocatedItems = [
    { label: 'New Jersey', value: 'New Jersey' },
    { label: 'New York', value: 'New York' },
    { label: 'Pennsylvania', value: 'Pennsylvania' },
    { label: 'Washington, D.C', value: 'Washington, D.C' },
  ];

  const LanguageItems = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'German', value: 'German' },
    { label: 'Russian', value: 'Russian' },
  ];

  // Handle form submission
 const onSubmit = (formData) => {
  setServiceIds(Array.isArray(formData.service_ids) ? formData.service_ids : []);
  setState(formData.location);
  setLanguage(formData.language);

  if(data?.lawyers?.data){
    Navigation.navigate('suggestedatoreny', { lawyers: data?.lawyers?.data });
  }
  if(!data?.lawyers?.data){
    Alert.alert('No lawyers found');
  }
};

  useEffect(() => {
    if (data) {
      console.log('Received data:', data);
      // You can navigate to results screen here if needed
      // Navigation.navigate('ResultsScreen', { lawyers: data });
    }
  //  if(data?.lawyers?.data){
  //    Navigation.navigate('suggestedatoreny', { lawyers: data?.lawyers?.data });
  //  }



   
    
  }, [data, error]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

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
                  {LocatedItems.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => {
                        onChange(item.value); // Use item.value instead of item.label
                        setOpenLocation(false);
                      }}
                      style={tw`p-2 ${value === item.value ? 'bg-red-100' : 'bg-white'}`}>
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
                  {LanguageItems.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => {
                        onChange(item.value); // Use item.value instead of item.label
                        setOpenLanguage(false);
                      }}
                      style={tw`p-2 ${value === item.value ? 'bg-red-100' : 'bg-white'}`}>
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
        <TouchableOpacity
          style={tw`bg-primary h-[44px] text-white flex flex-row items-center justify-center mt-[100%] rounded-lg`}
          onPress={handleSubmit(onSubmit)}>
          <Text style={tw`text-[#E7E7E9] font-bold text-[16px]`}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filtaredcategory;