import {View, Text, TouchableOpacity, Platform, Alert, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import FiltaredHeader from '../../components/FiltaredHeader';
import tw from '../../lib/tailwind';
import {Controller, useForm} from 'react-hook-form';
import {SvgXml} from 'react-native-svg';
import {Doropdown, UploadIcon} from '../../assets/Icons';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import { MultiSelect } from 'react-native-element-dropdown';
import { useCreateYourOwnProfileMutation, useGetAllCategoryQuery } from '../../redux/features/Categorys/CategoryApi';
import { useNavigation } from '@react-navigation/native';

type DaySchedule = {
  day: string;
  openTime: Date | null;
  closeTime: Date | null;
  isActive: boolean;
};

type FormData = {
  practice_areas: number[];
  practice_area: string;
  experience: string;
  state: string;
  language: string;
  address: string;
  city: string;
  contact: string;
  website: string;
  avatar: string | null;
};

const CreateyourOwnprofile = () => {
  const {control, handleSubmit, setValue, reset} = useForm<FormData>({
    defaultValues: {
      practice_areas: [],
      practice_area: '',
      experience: '',
      language: '',
      state: '',
      address: '',
      city: '',
      contact: '',
      website: '',
      avatar: null
    }
  });

  const [openLanguage, setOpenLanguage] = useState(false);
  const [openExperience, setOpenExperience] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState<{
    visible: boolean;
    type: 'open' | 'close';
    dayIndex: number;
  }>({visible: false, type: 'open', dayIndex: 0});
  const [avatar, setAvatar] = useState<string | null>(null);
  const navigation = useNavigation();
  
  const {data, isLoading} = useGetAllCategoryQuery();
  const [createYourOwnProfile, {isLoading: isLoadingCreateYourOwnProfile}] = useCreateYourOwnProfileMutation();

  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {day: 'Sun', openTime: new Date(0, 0, 0, 19, 0), closeTime: new Date(0, 0, 0, 20, 0), isActive: true},
    {day: 'Mon', openTime: new Date(0, 0, 0, 19, 0), closeTime: new Date(0, 0, 0, 20, 0), isActive: true},
    {day: 'Tue', openTime: null, closeTime: null, isActive: false},
    {day: 'Wed', openTime: null, closeTime: null, isActive: false},
    {day: 'Thu', openTime: null, closeTime: null, isActive: false},
    {day: 'Fri', openTime: null, closeTime: null, isActive: false},
    {day: 'Sat', openTime: new Date(0, 0, 0, 21, 0), closeTime: new Date(0, 0, 0, 22, 0), isActive: true},
  ]);

  const practiceAreas = data?.categories?.data?.map((category: any) => ({
    label: category.name,
    value: category.id
  })) || [];

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setAvatar(response.assets[0].uri);
        setValue('avatar', response.assets[0].uri);
      }
    });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return 'Select time';
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const handleTimeChange = (event: any, selectedDate: Date | undefined) => {
    setShowTimePicker({...showTimePicker, visible: false});
    
    if (selectedDate) {
      const updatedSchedule = [...schedule];
      const {dayIndex, type} = showTimePicker;
      
      if (type === 'open') {
        updatedSchedule[dayIndex].openTime = selectedDate;
        updatedSchedule[dayIndex].isActive = true;
      } else {
        if (updatedSchedule[dayIndex].isActive) {
          updatedSchedule[dayIndex].closeTime = selectedDate;
        } else {
          Alert.alert('Please select day first', 'You need to activate the day before setting the time.');
          return;
        }
      }
      
      setSchedule(updatedSchedule);
    }
  };

  const toggleDayActive = (index: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].isActive = !updatedSchedule[index].isActive;
    
    if (!updatedSchedule[index].isActive) {
      updatedSchedule[index].openTime = null;
      updatedSchedule[index].closeTime = null;
    }
    
    setSchedule(updatedSchedule);
  };

  const handleTimePress = (type: 'open' | 'close', dayIndex: number) => {
    if (!schedule[dayIndex].isActive) {
      Alert.alert('Select Day First', 'Please activate the day before selecting time.');
      return;
    }
    setShowTimePicker({visible: true, type, dayIndex});
  };

  const resetForm = () => {
    // Reset form values
    reset({
      practice_areas: [],
      practice_area: '',
      experience: '',
      language: '',
      state: '',
      address: '',
      city: '',
      contact: '',
      website: '',
      avatar: null
    });

    // Reset schedule
    setSchedule([
      {day: 'Sun', openTime: new Date(0, 0, 0, 19, 0), closeTime: new Date(0, 0, 0, 20, 0), isActive: true},
      {day: 'Mon', openTime: new Date(0, 0, 0, 19, 0), closeTime: new Date(0, 0, 0, 20, 0), isActive: true},
      {day: 'Tue', openTime: null, closeTime: null, isActive: false},
      {day: 'Wed', openTime: null, closeTime: null, isActive: false},
      {day: 'Thu', openTime: null, closeTime: null, isActive: false},
      {day: 'Fri', openTime: null, closeTime: null, isActive: false},
      {day: 'Sat', openTime: new Date(0, 0, 0, 21, 0), closeTime: new Date(0, 0, 0, 22, 0), isActive: true},
    ]);

    // Reset avatar
    setAvatar(null);
  };

  const onSubmit = async (data: FormData) => {
    const activeDays = schedule.filter(day => day.isActive);
    const availability = activeDays.map(day => ({
      day: day.day.toLowerCase(),
      time: `${formatTime(day.openTime)} - ${formatTime(day.closeTime)}`
    }));

    const formData = {
      service_ids: JSON.stringify(data.practice_areas),
      practice_area: data.practice_area,
      experience: data.experience,
      languages: data.language,
      state: data.state,
      address: data.address,
      city: data.city,
      phone: data.contact,
      web_link: data.website,
      avatar: data.avatar,
      schedule: JSON.stringify(availability)
    };

    try {
      const response = await createYourOwnProfile(formData).unwrap();
      
      if(response.success === true){
        Alert.alert("Success", response.message);
        resetForm(); // Clear all values after successful submission
        navigation.navigate('attornyProfile');
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      Alert.alert('Error', error?.data?.message || 'Something went wrong');
      console.error('Submission error:', error);
    }
  };

  const Languageitems = [
    {label: 'English', value: 'English'},
    {label: 'Spanish', value: 'Spanish'},
    {label: 'German', value: 'German'},
    {label: 'Russian', value: 'Russian'},
  ];

  const experienceItems = [
    {label: '4 years', value: '4 years'},
    {label: '1-3 years', value: '1-3 years'},
    {label: '3-5 years', value: '3-5 years'},
    {label: '5+ years', value: '5+ years'},
  ];

  const stateItems = [
    {label: 'New York', value: 'New York'},
    {label: 'California', value: 'California'},
    {label: 'Texas', value: 'Texas'},
  ];

  if(isLoading || isLoadingCreateYourOwnProfile){
    return (
      <View style={tw`bg-[#F5F5F7] h-full`}>
        <FiltaredHeader title={'Create your own profile'} />
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#121221" />
        </View>
      </View>
    )
  }

  return (
    <ScrollView>
      <FiltaredHeader title={'Create your own profile'} />
      <View style={tw`p-4 bg-white`}>
        <Text style={tw`text-[18px] text-[#41414D] font-bold`}>
          Please share some information about your practice in the fields below
        </Text>

        <View style={tw`mt-6 mb-2`}>
          <Text style={tw`text-[16px] font-normal text-[#121221]`}>
            Services you can provide? (up to five)
          </Text>
          <Controller
            control={control}
            name="practice_areas"
            render={({field: {value, onChange}}) => (
              <MultiSelect
                style={tw`mt-2 border border-gray-300 rounded-lg p-2 mb-2`}
                placeholderStyle={tw`text-gray-500`}
                selectedTextStyle={tw`text-gray-600`}
                inputSearchStyle={tw`h-10 text-gray-600`}
                iconStyle={tw`w-8`}
                data={practiceAreas}
                labelField="label"
                valueField="value"
                placeholder="Select services"
                value={value}
                onChange={onChange}
                selectedStyle={tw`bg-blue-100 rounded-lg`}
                containerStyle={tw`border border-gray-300 rounded-lg mt-1`}
                itemTextStyle={tw`text-gray-600`}
                activeColor="#f0f0f0"
                search
                searchPlaceholder="Search services..."
                maxSelect={5}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity
                    onPress={() => unSelect && unSelect(item)}
                    style={tw`bg-blue-100 rounded-lg p-2 mr-2 mb-2 flex-row items-center`}
                  >
                    <Text style={tw`text-blue-800`}>{item.label}</Text>
                    <Text style={tw`ml-2 text-blue-800`}>×</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          />
        </View>

        <View style={tw`my-2`}>
          <Text style={tw`text-[16px] text-[#121221] pb-1 font-normal`}>
            Where do you practice?
          </Text>
          <Controller
            control={control}
            name="practice_area"
            render={({field: {value, onChange, onBlur}}) => (
              <TextInput
                style={tw`border border-gray-300 px-2 rounded-lg h-[44px] bg-white`}
                placeholder="eg.. Supreme Court"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>

        <View>
          <Text style={tw`text-[16px] font-normal text-[#121221]`}>
            Your experience
          </Text>
          <Controller
            control={control}
            name="experience"
            render={({field: {value, onChange}}) => (
              <DropdownComponent
                value={value}
                onChange={onChange}
                items={experienceItems}
                open={openExperience}
                setOpen={setOpenExperience}
              />
            )}
          />
        </View>

        <View>
          <Text style={tw`text-[16px] font-normal text-[#121221]`}>
            Enter state
          </Text>
          <Controller
            control={control}
            name="state"
            render={({field: {value, onChange}}) => (
              <DropdownComponent
                value={value}
                onChange={onChange}
                items={stateItems}
                open={openState}
                setOpen={setOpenState}
              />
            )}
          />
        </View>

        <View>
          <Text style={tw`text-[16px] font-normal text-[#121221]`}>
            Language(s)
          </Text>
          <Controller
            control={control}
            name="language"
            render={({field: {value, onChange}}) => (
              <DropdownComponent
                value={value}
                onChange={onChange}
                items={Languageitems}
                open={openLanguage}
                setOpen={setOpenLanguage}
              />
            )}
          />
        </View>

        <View style={tw`mt-4 mb-2`}>
          <Text style={tw`text-[16px] font-normal text-[#121221]`}>
            Upload your headshot
          </Text>
          <TouchableOpacity 
            onPress={pickImage}
            style={tw`border border-gray-300 rounded-lg h-32 items-center justify-center mt-2`}
          >
            {avatar ? (
              <Image 
                source={{uri: avatar}} 
                style={tw`w-full h-full rounded-lg`}
                resizeMode="cover"
              />
            ) : (
              <View style={tw`items-center`}>
                <SvgXml xml={UploadIcon} width={24} height={24} style={tw`mb-2`} />
                <Text style={tw`text-gray-400`}>Click to upload a headshot</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={tw`my-2`}>
          <Text style={tw`text-[16px] text-[#121221] pb-1 font-normal`}>
            City
          </Text>
          <Controller
            control={control}
            name="city"
            render={({field: {value, onChange, onBlur}}) => (
              <TextInput
                style={tw`border border-gray-300 px-2 rounded-lg h-[44px] bg-white`}
                placeholder="Enter your city"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>

        <View style={tw`my-2`}>
          <Text style={tw`text-[16px] text-[#121221] pb-1 font-normal`}>
            Address
          </Text>
          <Controller
            control={control}
            name="address"
            render={({field: {value, onChange, onBlur}}) => (
              <TextInput
                style={tw`border border-gray-300 px-2 rounded-lg h-[44px] bg-white`}
                placeholder="Enter your office address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>

        <View style={tw`my-2`}>
          <Text style={tw`text-[16px] text-[#121221] pb-1 font-normal`}>
            Contact
          </Text>
          <Controller
            control={control}
            name="contact"
            render={({field: {value, onChange, onBlur}}) => (
              <TextInput
                style={tw`border border-gray-300 px-2 rounded-lg h-[44px] bg-white`}
                placeholder="Enter your mobile number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
              />
            )}
          />
        </View>

        <View style={tw`my-2`}>
          <Text style={tw`text-[16px] text-[#121221] pb-1 font-normal`}>
            Website link
          </Text>
          <Controller
            control={control}
            name="website"
            render={({field: {value, onChange, onBlur}}) => (
              <TextInput
                style={tw`border border-gray-300 px-2 rounded-lg h-[44px] bg-white`}
                placeholder="Write your Website link"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="url"
              />
            )}
          />
        </View>

        <View style={tw`mt-6`}>
          <Text style={tw`text-[16px] font-bold text-[#121221] mb-4`}>
            Availability (optional)
          </Text>
          
          <View style={tw`mb-2`}>
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw`text-[14px] text-[#60606A] w-1/4`}>Day</Text>
              <Text style={tw`text-[14px] text-[#60606A] w-1/3 text-center`}>Open time</Text>
              <Text style={tw`text-[14px] text-[#60606A] w-1/3 text-center`}>Close time</Text>
            </View>
            
            {schedule.map((day, index) => (
              <View key={day.day} style={tw`flex-row items-center justify-between mb-3`}>
                <TouchableOpacity
                  onPress={() => toggleDayActive(index)}
                  style={tw`w-1/4`}
                >
                  <Text style={tw`text-[14px] ${day.isActive ? 'text-[#1E73BE] font-bold' : 'text-[#60606A]'}`}>
                    {day.day}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleTimePress('open', index)}
                  style={tw`w-1/3 border border-gray-300 rounded-lg p-2 mx-1 ${!day.isActive ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <Text style={tw`text-center ${day.openTime ? 'text-black' : 'text-gray-400'}`}>
                    {formatTime(day.openTime)}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => handleTimePress('close', index)}
                  style={tw`w-1/3 border border-gray-300 rounded-lg p-2 mx-1 ${!day.isActive ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <Text style={tw`text-center ${day.closeTime ? 'text-black' : 'text-gray-400'}`}>
                    {formatTime(day.closeTime)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {showTimePicker.visible && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}

        <View style={tw`mt-12`}>
          <TouchableOpacity
            style={tw`bg-primary h-[44px] w-full text-white flex flex-row items-center justify-center rounded-lg`}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoadingCreateYourOwnProfile}
          >
            {isLoadingCreateYourOwnProfile ? (
              <ActivityIndicator color="#E7E7E9" />
            ) : (
              <Text style={tw`text-[#E7E7E9] font-bold text-[16px]`}>Done</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const DropdownComponent = ({value, onChange, items, open, setOpen}: any) => {
  return (
    <View style={tw`relative`}>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={tw`flex flex-row justify-between items-center mt-2 rounded-lg p-2 bg-white border border-gray-300`}>
        <Text style={tw`text-gray-600`}>{value || 'Select'}</Text>
        <SvgXml xml={Doropdown} width="24" height="24" />
      </TouchableOpacity>
      {open && (
        <View
          style={tw`p-2 mt-1 rounded-lg bg-white border border-gray-300 absolute top-12 z-50 w-full`}>
          {items.map((item: any) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => {
                onChange(item.label);
                setOpen(false);
              }}
              style={tw`p-2 ${
                value === item.label ? 'bg-red-100' : 'bg-white'
              }`}>
              <Text style={tw`text-gray-600`}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CreateyourOwnprofile;