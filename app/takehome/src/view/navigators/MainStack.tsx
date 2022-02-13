import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListMessages from '../screens/ListMessages';
import DetailsMessage from '../screens/DetailsMessage';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={ListMessages} />
      <Stack.Screen name="details" component={DetailsMessage} />
    </Stack.Navigator>
  );
};

export default MainStack;
