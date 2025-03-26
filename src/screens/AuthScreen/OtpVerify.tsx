import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import tw from '../../lib/tailwind';
import Header from '../../components/Header';
import { useVerifyEmailMutation, useVerifyOtpMutation } from '../../redux/features/users/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';




type NavigationProp = {
  navigate: (screen: string) => void;
};

type TextInputRef = TextInput | null;

const OtpVerify: React.FC = ({route}: any) => {
  const {email} = route.params;
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const inputs = useRef<TextInputRef[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const translateY = useSharedValue(0);
const [verifyOtp]=useVerifyOtpMutation();

const [ verifyEmail]=useVerifyEmailMutation();
  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !code[index]) inputs.current[index - 1]?.focus();
  };

  const handleVerify = async () => {
    const otpCode = code?.join('') || '';
  
    console.log('Entered OTP Code:', otpCode);
  
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter a 6-digit OTP.');
      return;
    }
  
    const data = { otp: otpCode };
  
    try {
      const resp = await verifyOtp(data).unwrap();
  
      if (resp?.success) {
        Alert.alert('Success', resp?.message);
        await AsyncStorage.setItem('token', resp?.access_token);
        navigation.navigate('createpassword');
      } else {
        Alert.alert('Error', resp?.message || 'OTP verification failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  

  const handleresendOtp = async () => {
    if (!email) {
      Alert.alert('Error', 'Email is required');
      return;
    }
  
    const data = { email };
  
    try {
      const res = await verifyEmail(data).unwrap();
      console.log('response otp-emailverify', res);
  
      if (res?.success) {
        Alert.alert('Success', res?.message);
      } else {
        Alert.alert('Error', res?.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('OTP Resend Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <View style={tw``}>
        <Header title='Account verification' isbackbutton={true} />

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={[tw`px-4 pt-10`, animatedStyle]}>
        {/* Header */}
        <View style={tw` mb-8`}>
          <Text style={tw`text-[26px] font-bold text-[#121221]`}>
            Check your email to verify your OTP
          </Text>
          <Text style={tw`text-[16px] font-normal text-[#41414D] pt-2 `}>
            {email}
          </Text>
        </View>

        {/* OTP Input Fields */}
        <View style={tw`flex-row justify-between mb-8`}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref)}
              style={tw`w-12 h-12 bg-[#E9F1F9] border border-gray-300 rounded-md text-lg text-center mx-1`}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={value => handleChange(value, index)}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') handleBackspace(index);
              }}
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={tw`w-full flex flex-row justify-center  rounded-lg items-center bg-primary h-[44px]`}
          onPress={handleVerify}>
          <Text style={tw`text-base font-bold text-white`}>Submit</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={tw`flex-row mt-6`}>
          <Text style={tw`text-sm text-[#41414D]`}>
            Haven’t received your OTP yet?
          </Text>
          <TouchableOpacity onPress={handleresendOtp}>
            <Text style={tw`text-sm font-bold ml-1 text-primary`}>Re-send</Text>
            <View style={tw`h-px mt-[-2px] bg-primary`} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
    </View>
  );
};

export default OtpVerify;
