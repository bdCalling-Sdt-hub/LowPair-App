import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {EyeIcon, EyeOffIcon, LockIcon, LoginIcon} from '../../assets/Icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SvgXml} from 'react-native-svg';
import Header from '../../components/Header';
import tw from '../../lib/tailwind';
import {useResetPasswordMutation} from '../../redux/features/users/UserApi';

interface PasswordProps {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const CreateNewPassword = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<PasswordProps>();
  const [resetPassword] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(prev => !prev);
  const toggleOldPasswordVisibility = () => setShowOldPassword(prev => !prev);

  const [attorney, setAttorney] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);

  const onSubmit = async (data: PasswordProps) => {
    if (data.password === data.confirmPassword) {
      const alldata = {
        old_password: data.oldPassword, // Added old password field
        password: data.password,
        password_confirmation: data.confirmPassword,
      };

      console.log('alldata', alldata);

      try {
        const response = await resetPassword(alldata).unwrap();
        console.log('Reset Password Response:', response);
        if (response.success === true) {
          Alert.alert('Success', 'Password updated successfully!');
          AsyncStorage.setItem('token', JSON.stringify(response?.access_token));
          AsyncStorage.setItem('user', JSON.stringify(response?.user));
          if (response?.user?.role === 'attorney') {
            setAttorney(true);
          } else {
            setUser(true);
          }
          navigation.navigate(
            attorney ? 'attorneybottomroutes' : 'bottomroutes',
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
        console.log(error);
      }
    } else {
      Alert.alert('Error', 'Passwords do not match!');
    }
  };

  return (
    <View style={tw`flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Reset password"
          subtitle="You have to reset your password to log in."
          isbackbutton={true}
        />

        <View style={tw`p-4 px-4 pt-10`}>
          {/* Old Password Input */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-[#41414D] text-[14px] font-normal pb-[4px]`}>
              Old Password
            </Text>
            <View
              style={tw`relative flex-row items-center border px-2 rounded-md ${
                errors.oldPassword ? 'border-red-500' : 'border-gray-300'
              }`}>
              <SvgXml xml={LockIcon} width={20} height={20} style={tw`mr-2`} />
              <Controller
                control={control}
                name="oldPassword"
                rules={{required: 'Old Password is required'}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={tw`flex-1 text-[#41414D] h-[48px]`}
                    placeholder="Enter old password"
                    secureTextEntry={!showOldPassword}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Pressable onPress={toggleOldPasswordVisibility}>
                <SvgXml
                  xml={showOldPassword ? EyeOffIcon : EyeIcon}
                  width={20}
                  height={20}
                  style={tw`ml-2`}
                />
              </Pressable>
            </View>
            {errors.oldPassword && (
              <Text style={tw`text-red text-xs`}>
                {errors.oldPassword.message}
              </Text>
            )}
          </View>

          {/* New Password Input */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-[#41414D] text-[14px] font-normal pb-[4px]`}>
              New Password
            </Text>
            <View
              style={tw`relative flex-row items-center border px-2 rounded-md ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}>
              <SvgXml xml={LockIcon} width={20} height={20} style={tw`mr-2`} />
              <Controller
                control={control}
                name="password"
                rules={{required: 'Password is required'}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={tw`flex-1 text-[#41414D] h-[48px]`}
                    placeholder="Enter new password"
                    secureTextEntry={!showPassword}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Pressable onPress={togglePasswordVisibility}>
                <SvgXml
                  xml={showPassword ? EyeOffIcon : EyeIcon}
                  width={20}
                  height={20}
                  style={tw`ml-2`}
                />
              </Pressable>
            </View>
            {errors.password && (
              <Text style={tw`text-red text-xs`}>
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Confirm Password Input */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-[#41414D] text-[14px] font-normal pb-[4px]`}>
              Confirm Password
            </Text>
            <View
              style={tw`relative flex-row items-center border px-2 rounded-md ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}>
              <SvgXml xml={LockIcon} width={20} height={20} style={tw`mr-2`} />
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === watch('password') || 'Passwords do not match',
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={tw`flex-1 text-[#41414D] h-[48px]`}
                    placeholder="Confirm new password"
                    secureTextEntry={!showConfirmPassword}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <Pressable onPress={toggleConfirmPasswordVisibility}>
                <SvgXml
                  xml={showConfirmPassword ? EyeOffIcon : EyeIcon}
                  width={20}
                  height={20}
                  style={tw`ml-2`}
                />
              </Pressable>
            </View>
            {errors.confirmPassword && (
              <Text style={tw`text-red text-xs`}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={tw`bg-primary p-3 rounded-md flex flex-row items-center justify-center mt-4`}
            onPress={handleSubmit(onSubmit)}>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Text style={tw`text-[#E7E7E9] text-[16px] font-bold pr-1`}>
                Submit
              </Text>
              <SvgXml xml={LoginIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNewPassword;
