import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {AuthUserProvider} from './src/lib/AuthProvider';
import tw from './src/lib/tailwind';
import store from './src/redux/store';
import AppRoutes from './src/routes/AppRoutes';

const App = () => {
  return (
    <>
      <AuthUserProvider>
        <Provider store={store}>
          <SafeAreaView
            style={[styles.safeArea, {backgroundColor: tw.color('primary')}]}>
            <AppRoutes />
          </SafeAreaView>
        </Provider>
      </AuthUserProvider>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
