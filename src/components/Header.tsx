import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from '../lib/tailwind';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { backIcon } from '../assets/Icons';

interface HeaderProps {
  title: string;
  subtitle?: string;
  isbackbutton?: boolean
}
const Header = ({title, subtitle , isbackbutton}: HeaderProps) => {
  const navigation = useNavigation<any>();
  return (
    <LinearGradient
      locations={[5, 0.5]}
      colors={['#0D3050', '#19578F']}
      start={{x: 0.2, y: 0.5}}
      end={{x: 0.2, y: 0.5}}>
      <View style={tw`px-4 pb-10 pt-20`}>
        <View style={tw`flex flex-row items-center gap-4`}>
          {
            isbackbutton && <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={tw`text-[#E7E7E9] text-10 font-bold`}>
              <SvgXml xml={backIcon} />
            </Text>
          </TouchableOpacity>
          }
        <Text style={tw`text-[#E7E7E9] text-10 font-bold`}>{title}</Text>
        </View>
        <Text style={tw`text-xs text-[#B6B6BA] font-normal pt-1`}>
          {subtitle || 'N/A'}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default Header;
