import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
