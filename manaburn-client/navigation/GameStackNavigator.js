import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeGameScreen from '../screens/HomeGameScreen';
import FeedbackIcon from '../components/FeedbackIcon';

const Stack = createStackNavigator();

export default function GameStackNavigator (){
  return (
    <Stack.Navigator initialRouteName="GameHome">
        <Stack.Screen name="GameHome" component={HomeGameScreen} options={({ navigation }) =>({ headerTitle: 'Start Game', headerRight: () => FeedbackIcon(navigation,"Account")})}/>
    </Stack.Navigator>
  );
}