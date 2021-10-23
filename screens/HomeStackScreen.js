import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator headerMode='none'>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
        

    </HomeStack.Navigator>
);

export default HomeStackScreen;