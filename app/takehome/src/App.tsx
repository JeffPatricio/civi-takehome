import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainStack from './view/navigators/MainStack';
import { navigationRef } from './view/navigators/navigationRef';

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
