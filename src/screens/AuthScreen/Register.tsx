import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Header from '../../components/Header';
import tw from '../../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import { EyeIcon, EyeOffIcon } from '../../assets/Icons';
import { useNavigation } from '@react-navigation/native';


// Define types for user role
type UserType = 'user' | 'attorney';

// Define types for form state
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC = ({navigation}:any) => {

  const [userType, setUserType] = useState<UserType>('user');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Function to handle form submission
  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    if(data){
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header
        isbackbutton={false}
        title="Sign up to create a new account..."
        subtitle="Enter correct information for sign in to your LawPair account"
      />

      <View style={tw`px-4`}>
        {/* User Type Selector */}
        <View style={tw`flex-row justify-between border-b-2 border-gray-300 mb-5`}>
          <TouchableOpacity
            style={tw`flex-1 items-center py-3 ${userType === 'user' ? 'border-b-4 border-blue-500' : ''}`}
            onPress={() => setUserType('user')}>
            <Text style={tw`text-lg ${userType === 'user' ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
              I'm a user
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 items-center py-3 ${userType === 'attorney' ? 'border-b-4 border-blue-500' : ''}`}
            onPress={() => setUserType('attorney')}>
            <Text style={tw`text-lg ${userType === 'attorney' ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
              I'm an attorney
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields with Validation */}
        <Controller
          control={control}
          name="firstName"
          rules={{ required: 'First name is required' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={tw`h-12 border border-gray-300 rounded px-4 bg-gray-100 mb-2`}
                placeholder="First name"
                value={value}
                onChangeText={onChange}
              />
              {errors.firstName && <Text style={tw`text-red-500`}>{errors.firstName.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="lastName"
          rules={{ required: 'Last name is required' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={tw`h-12 border border-gray-300 rounded px-4 bg-gray-100 mb-2`}
                placeholder="Last name"
                value={value}
                onChangeText={onChange}
              />
              {errors.lastName && <Text style={tw`text-red-500`}>{errors.lastName.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Enter a valid email address',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={tw`h-12 border border-gray-300 rounded px-4 bg-gray-100 mb-2`}
                placeholder="Email"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
              {errors.email && <Text style={tw`text-red-500`}>{errors.email.message}</Text>}
            </>
          )}
        />

        {/* Password Field with Toggleable Icon */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <View style={tw`relative`}>
                <TextInput
                  style={tw`h-12 border border-gray-300 rounded px-4 bg-gray-100 mb-2 pr-10`}
                  placeholder="Create password"
                  secureTextEntry={!passwordVisible}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  style={tw`absolute right-4 top-3`}
                  onPress={() => setPasswordVisible(!passwordVisible)}>
                 <SvgXml
                xml={passwordVisible ? EyeOffIcon : EyeIcon}
                width={20}
                height={20}
                style={tw`ml-2`}
              />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={tw`text-red-500`}>{errors.password.message}</Text>}
            </>
          )}
        />

        {/* Create Account Button */}
        <TouchableOpacity
          style={tw`bg-blue-500 h-11 rounded mt-3 flex flex-row items-center justify-center`}
          onPress={handleSubmit(onSubmit)}>
          <Text style={tw`text-white text-[16px] font-bold`}>Create account</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row items-center justify-center pt-11 `}>
          <Text style={tw`text-[#41414D] text-sm font-semibold`}>Don't have an account?</Text>
          <TouchableOpacity
           onPress={() => navigation.navigate('LoginScreen')}
           >
            <Text style={tw`text-[#4B8FCB] text-sm font-semibold pl-1`}>Sign in</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Register;
