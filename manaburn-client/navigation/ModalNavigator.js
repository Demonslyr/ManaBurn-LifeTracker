import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ModalScreen from '../screens/FeedbackModalScreen';

const Stack = createStackNavigator();

export default function FeedbackModalStack (){
  return (
    <Stack.Navigator initialRouteName="FeedbackModal" mode='modal' screenOptions={{headerShown: false }}>
      <Stack.Screen name="FeedbackModal" component={ModalScreen}/>
    </Stack.Navigator>
  );
}