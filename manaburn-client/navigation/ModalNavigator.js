import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ModalScreen from '../screens/FeedbackModalScreen';

const Stack = createStackNavigator();

export default function FeedbackModalStack (){
  return (
    <Stack.Navigator initialRouteName="FeedbackModal" header mode='modal'>
      <Stack.Screen name="FeedbackModal" component={ModalScreen}/>
    </Stack.Navigator>
  );
}