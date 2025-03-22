import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {menuitem} from '../assets/Icons';
import {SvgXml} from 'react-native-svg';
import tw from '../lib/tailwind';

const MainScreenHeader: React.FC = () => {
  const navigation = useNavigation();

  const attorney = false
  const user = false
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#F5F5F7',
      }}>
      {/* Sidebar Toggle Button */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Text style={{fontSize: 24}}>
          <SvgXml xml={menuitem} />
        </Text>
      </TouchableOpacity>

      <View>
        <Text
          style={{
            fontSize: 16,
            color: '#121221',
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          Hi, Imad{' '}
        </Text>
        <Text
          style={tw`text-xs text-[#929299] text-center font-normal pl-[10px]`}>
          Los angles, USA
        </Text>
      </View>

      {/* User Info */}
      <TouchableOpacity
      onPress={()=>navigation.navigate(`${attorney ?'attornyProfile':'Profile'}`)}
        style={{
          marginLeft: 'auto',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/avater.png')}
          style={{width: 40, height: 40, borderRadius: 20}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MainScreenHeader;
