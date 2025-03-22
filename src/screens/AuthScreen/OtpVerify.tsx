import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import tw from '../../lib/tailwind';
import Header from '../../components/Header';

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

  const handleVerify = () => {
    console.log('Entered OTP Code:', code.join(''));

    if (code.join('').length === 6) {
      navigation.navigate('createpassword');
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
          <TouchableOpacity>
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
