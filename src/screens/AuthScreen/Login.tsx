import {View, Text, TextInput, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import tw from '../../lib/tailwind';
import Header from '../../components/Header';
import {SvgXml} from 'react-native-svg';
import {
  emailIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LoginIcon,
  rememberme,
} from '../../assets/Icons';
import {useNavigation} from '@react-navigation/native';

interface LoginProps {
  email: string;
  password: string;
}

const Login = ({navigation}: any) => {

  const attorney =  false
  const user = true
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



  const onSubmit = (data: LoginProps) => {
    // if (data.email && data.password) {
      // navigation.navigate('bottomroutes');
    // }
  };

  return (
    <View style={tw`flex-1 `}>
      <Header title="Sign-in to your account..." isbackbutton={false} />

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

        {/* Password Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-[#41414D] text-[14px] font-normal pb-[4px]`}>
            Password
          </Text>
          <View
            style={tw`relative flex-row items-center border px-2 rounded-md ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}>
            {/* Lock Icon */}
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

            {/* Eye Toggle Icon */}
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
            <Text style={tw`text-red text-xs`}>{errors.password.message}</Text>
          )}
        </View>

        {/* Remember Me & Forgot Password */}
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={tw`flex-row items-center`}>
            {rememberMe ? (
              <SvgXml xml={rememberme} />
            ) : (
              <View
                style={tw`w-[20px] h-[20px] border rounded mr-2 border-gray-400`}
              />
            )}
            <Text style={tw`text-[#41414D] text-sm pl-1`}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('forgetpassword')}>
            <Text style={tw`text-[#4B8FCB] text-sm font-semibold`}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={tw`bg-primary p-3 rounded-md flex flex-row items-center justify-center`}
          onPress={
            
            // handleSubmit(onSubmit)
            () => navigation.navigate(`${attorney ? 'attorneybottomroutes' :'bottomroutes'}`)
            
            
            }>
          <View style={tw`flex flex-row items-center justify-center`}>
            <Text style={tw`text-[#E7E7E9] text-[16px] font-bold pr-1`}>
              Sign in
            </Text>
            <SvgXml xml={LoginIcon} />
          </View>
        </TouchableOpacity>

        <View style={tw`flex-row items-center justify-center pt-11 `}>
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
    </View>
  );
};

export default Login;
