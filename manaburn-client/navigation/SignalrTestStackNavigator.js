import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignalrTestPage from '../screens/SignalrTestPage';
import FeedbackIcon from '../components/FeedbackIcon';

const Stack = createStackNavigator();

export default function SignalrTestStackNavigator (){
  return (
    <Stack.Navigator initialRouteName="SignalrTest">
        <Stack.Screen name="SignalrTest" component={SignalrTestPage} options={({ navigation }) =>({ headerTitle: 'Signalr Test Page', headerRight: () => FeedbackIcon(navigation,"SignalrTest")})}/>
    </Stack.Navigator>
  );
}