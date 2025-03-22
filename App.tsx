
import React from 'react';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppRoutes from './src/routes/AppRoutes';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <>
    <Provider store={store}>


      <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}} >
          <AppRoutes />
          </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
    </>
  );
};

export default App;
