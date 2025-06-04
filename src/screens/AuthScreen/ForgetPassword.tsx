import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {SvgXml} from 'react-native-svg';
import {emailIcon} from '../../assets/Icons';
import Header from '../../components/Header';
import tw from '../../lib/tailwind';

interface LoginProps {
  email: string;
}

const ForgetPassword = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    console.log(data);
    if (data.email) {
      navigation.navigate('otpverify', {email: data.email});
    }
  };

  return (
    <View style={tw`flex-1 `}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Forgot your password?"
          subtitle="No worries, we'll help you recover it."
          isbackbutton={true}
        />

        <View style={tw`px-4 pt-[80% ] pb-6`}>
          {/* Email Input */}
          <View style={tw`mb-4 relative`}>
            <Text style={tw`text-[#41414D] text-[14px] font-normal pb-[4px]`}>
              Email
            </Text>
            <View style={tw`relative`}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View style={tw`relative`}>
                    <TextInput
                      style={tw`border p-2 h-[48px] text-[#41414D] rounded-md focus:border-2 border-[#4B8FCB] pl-10 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {/* Email Icon */}
                    <View style={tw`absolute top-3 left-3`}>
                      <SvgXml xml={emailIcon} width={20} height={20} />
                    </View>
                  </View>
                )}
              />
            </View>
            {errors.email && (
              <Text style={tw`text-red text-xs`}>{errors.email.message}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={tw`bg-primary p-3 rounded-md flex flex-row items-center justify-center`}
            onPress={handleSubmit(onSubmit)}>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Text style={tw`text-[#E7E7E9] text-[16px] font-bold pr-1`}>
                Get OTP
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPassword;
