import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LoginIcon,
  emailIcon,
} from '../../assets/Icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import Header from '../../components/Header';
import tw from '../../lib/tailwind';
import {useLoginUserMutation} from '../../redux/features/users/UserApi';
import {setUser} from '../../redux/features/users/userslice';

interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [attorney, setAttorney] = useState<boolean>(false);
  const [userrole, setUserrole] = useState<boolean>(false);

  // Redux API hook
  const [loginUser, {isLoading, error}] = useLoginUserMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginProps>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('user');
        const parsedUser = userInfo ? JSON.parse(userInfo) : null;

        console.log('user+++++++++++++++++++', parsedUser);

        if (parsedUser?.role === 'lawyer') {
          setAttorney(true);
          navigation.navigate('attorneybottomroutes');
        } else if (parsedUser) {
          navigation.navigate('bottomroutes');
        }
      } catch (error) {
        console.log('Warning! reading user info:', error);
      }
    };

    checkLoggedInUser();
  }, []);

  useEffect(() => {
    const checktoken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate(attorney ? 'attorneybottomroutes' : 'bottomroutes');
      }
    };

    checktoken();
  });

  const onSubmit = async (data: LoginProps) => {
    // If you use JSON instead of FormData for login
    const loginData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await loginUser(loginData).unwrap();

      console.log('Login Response:', response);
      if (response.success === true) {
        Alert.alert('Success', 'Login successful!');
        dispatch(setUser(response?.user));
        AsyncStorage.setItem('token', JSON.stringify(response?.access_token));
        AsyncStorage.setItem('user', JSON.stringify(response?.user));

        if (response?.user?.role === 'lawyer') {
          setAttorney(true);
        } else {
          setUserrole(true);
        }
        navigation.navigate(attorney ? 'attorneybottomroutes' : 'bottomroutes');
      } else {
        Alert.alert('Warning!', response.message);
      }
    } catch (err) {
      console.error('Login failed:', err);
      // You can handle the error here and show a message to the user
    }
  };

  return (
    <View style={tw`flex-1 `}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}>
        <Header title="Sign-in to your account..." isbackbutton={false} />

        <View style={tw`px-4 pt-[20%] pb-6`}>
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

          {/* Password Input */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-[#41414D] text-[14px] font-normal pb-[4px]`}>
              Password
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
                    placeholder="Enter your password"
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

            {errors.password?.message && (
              <Text style={tw`text-red text-xs`}>
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={tw`bg-primary p-3 rounded-md flex flex-row items-center justify-center`}
            onPress={handleSubmit(onSubmit)}>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Text style={tw`text-[#E7E7E9] text-[16px] font-bold pr-1`}>
                Sign in
              </Text>

              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <SvgXml xml={LoginIcon} />
              )}
            </View>
          </TouchableOpacity>

          <View style={tw`flex-row items-center justify-center pt-11`}>
            <Text style={tw`text-[#41414D] text-sm font-semibold`}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('register')}>
              <Text style={tw`text-[#4B8FCB] text-sm font-semibold pl-1`}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
