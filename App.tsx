
import React from 'react';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppRoutes from './src/routes/AppRoutes';

const App = () => {
  return (
    <>
      <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}} >
          <AppRoutes />
          </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default App;
