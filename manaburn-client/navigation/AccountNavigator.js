import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import FeedbackIcon from '../components/FeedbackIcon';
import WebviewScreen from '../screens/WebviewScreen';

const Stack = createStackNavigator();

export default function AccountStack (){
  return (
    <Stack.Navigator initialRouteName="Account">
        <Stack.Screen name="Account" component={AccountScreen} options={({ navigation }) =>({ headerTitle: 'Account', headerRight: () => FeedbackIcon(navigation,"Account")})}/>
        <Stack.Screen name="Profile" component={WebviewScreen} options={({ navigation }) =>({ headerTitle: 'Profile', headerRight: () => FeedbackIcon(navigation,"Profile")})}/>
        {/* <Stack.Screen name="Settings" component={SettingsScreen} options={({ navigation }) =>({ headerTitle: 'Settings', headerRight: () => FeedbackIcon(navigation,"Settings")})}/> */}
    </Stack.Navigator>
  );
}