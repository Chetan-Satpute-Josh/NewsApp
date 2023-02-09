import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './navigation';

const MainApp = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <AppNavigation />
    </NavigationContainer>
  );
};

export default MainApp;
