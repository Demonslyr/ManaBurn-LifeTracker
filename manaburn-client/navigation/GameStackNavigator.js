import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeGameScreen from '../screens/HomeGameScreen';
import WebviewScreen from '../screens/WebviewScreen';
import FeedbackIcon from '../components/FeedbackIcon';
import LocalGameScreen from '../screens/LocalGameScreen';
import NetworkGameScreen from '../screens/NetworkGameScreen';


const Stack = createStackNavigator();

export default function GameStackNavigator (){
  return (
    <Stack.Navigator initialRouteName="GameHome">
        <Stack.Screen name="GameHome" component={HomeGameScreen} options={({ navigation }) =>({ headerTitle: 'Start Game', headerRight: () => FeedbackIcon(navigation,"GameHome")})}/>
        <Stack.Screen name="LocalGame" component={LocalGameScreen} options={({ navigation }) =>({ headerTitle: 'Local Game', headerRight: () => FeedbackIcon(navigation,"LocalGame")})}/>
        <Stack.Screen name="NetworkGame" component={NetworkGameScreen} options={({ navigation }) =>({ headerTitle: 'Network Game', headerRight: () => FeedbackIcon(navigation,"NetworkGame")})}/>
        <Stack.Screen name="ScryfallScreen" component={WebviewScreen} options={({ navigation }) =>({ headerTitle: 'Search for a card', headerRight: () => FeedbackIcon(navigation,"ScryfallScreen")})}/>
    </Stack.Navigator>
  );
}