import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import Sidebar from '../components/Sidebar';
import tw from '../lib/tailwind';
import AttorneyProfile from '../screens/Attorneyscreen/AttorneyProfile';
import AvailavleAttorneys from '../screens/Attorneyscreen/AvailavleAttorneys';
import CreateyourOwnprofile from '../screens/Attorneyscreen/CreateyourOwnprofile';
import CreateNewPasword from '../screens/AuthScreen/CreateNewPasword';
import ForgetPassword from '../screens/AuthScreen/ForgetPassword';
import Login from '../screens/AuthScreen/Login';
import OtpVerify from '../screens/AuthScreen/OtpVerify';
import OtpVerifyAfterRegister from '../screens/AuthScreen/OtpVerifyAfterRegister';
import Register from '../screens/AuthScreen/Register';
import SplashScreen from '../screens/SplashScreen';
import AtonomyProfile from '../screens/categorys/AtonomyProfile';
import Filtaredcategory from '../screens/categorys/Filtaredcategory';
import SuggestedAttorneys from '../screens/categorys/SuggestedAttorneys';
import FevoriteList from '../screens/fevoritelist/FevoriteList';
import EditProfile from '../screens/profile/EditProfile';
import AttorneyBottomRoutes from './AttorneyBottomRoutes';
import BottomRoutes from './BottomRoutes';
import Abou from '../screens/about/About';
import LegalResources from '../screens/legalResources/LegalResources';
import disclaimer from '../screens/disclaimer/disclaimer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// 👉 Stack Navigator for authentication screens
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      statusBarAnimation: 'fade',
      statusBarBackgroundColor: '#19578F',
      statusBarStyle: 'light',
      animation: 'slide_from_right',
    }}
    initialRouteName="SplashScreen">
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="LoginScreen" component={Login} />
    <Stack.Screen
      name="OtpVerifyAfterRegister"
      component={OtpVerifyAfterRegister}
    />
    <Stack.Screen name="forgetpassword" component={ForgetPassword} />
    <Stack.Screen name="otpverify" component={OtpVerify} />
    <Stack.Screen name="createpassword" component={CreateNewPasword} />
    <Stack.Screen name="register" component={Register} />
    <Stack.Screen name="bottomroutes" component={BottomRoutes} />
    <Stack.Screen
      name="attorneybottomroutes"
      component={AttorneyBottomRoutes}
    />

    <Stack.Screen name="editprofile" component={EditProfile} />
    <Stack.Screen name="categoryfilter" component={Filtaredcategory} />
    <Stack.Screen name="suggestedatoreny" component={SuggestedAttorneys} />
    <Stack.Screen name="atonomyProfile" component={AtonomyProfile} />

    <Stack.Screen name="attornyProfile" component={AttorneyProfile} />
    <Stack.Screen name="Favorite list" component={FevoriteList} />
    <Stack.Screen name="AvailableAttorneys" component={AvailavleAttorneys} />
    <Stack.Screen name="createownprofile" component={CreateyourOwnprofile} />
    <Stack.Screen name="About" component={Abou} />
    <Stack.Screen name="legalresources" component={LegalResources} />
    <Stack.Screen name="disclaimer" component={disclaimer} />
  </Stack.Navigator>
);

// 👉 Drawer Navigator (Sidebar on front-layer)
const AppRoutes = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <Sidebar {...props} />}
          screenOptions={{
            headerShown: false,
            drawerType: 'front',
          }}>
          <Drawer.Screen name="Main" component={AuthStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppRoutes;
