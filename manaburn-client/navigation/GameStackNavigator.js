import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeGameScreen from '../screens/HomeGameScreen';
import WebviewScreen from '../screens/WebviewScreen';
import FeedbackIcon from '../components/FeedbackIcon';


const Stack = createStackNavigator();

export default function GameStackNavigator (){
  return (
    <Stack.Navigator initialRouteName="GameHome">
        <Stack.Screen name="GameHome" component={HomeGameScreen} options={({ navigation }) =>({ headerTitle: 'Start Game', headerRight: () => FeedbackIcon(navigation,"GameHome")})}/>
        <Stack.Screen name="ScryfallScreen" component={WebviewScreen} options={({ navigation }) =>({ headerTitle: 'Search for a card', headerRight: () => FeedbackIcon(navigation,"ScryfallScreen")})}/>
    </Stack.Navigator>
  );
}