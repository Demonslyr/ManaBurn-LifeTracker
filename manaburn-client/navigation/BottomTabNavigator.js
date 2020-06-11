import React from 'react';
import { Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarFontAwesome from '../components/TabBarFontAwesome';

import AccountStack from './AccountNavigator';

import GameStackNavigator from '../navigation/GameStackNavigator';
import SignalrTestStackNavigator from '../navigation/SignalrTestStackNavigator';

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="GameStackNavigator"
      headerMode={Platform.OS === 'ios'?'float':'screen'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'GameStackNavigator') {
            return <TabBarFontAwesome focused={focused} size={size} name={'home'}/>;
          } else if (route.name === 'Account') {
            return <TabBarFontAwesome focused={focused} size={size} name={'user'} />;
          } else if (route.name === 'SignalrTestStackNavigator') {
            return <TabBarFontAwesome focused={focused} size={size} name={'plug'} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'darkgray',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="SignalrTestStackNavigator" component={SignalrTestStackNavigator}/>
      <Tab.Screen name="GameStackNavigator" component={GameStackNavigator}/>
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}