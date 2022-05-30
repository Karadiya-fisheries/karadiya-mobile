import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPwdScreen from './ForgotPwdScreen';
import ConfirmNewPassword from './PasswordReset/ConfirmNewPassword';
import PwdResetSuccessfully from './PasswordReset/PwdResetSuccessfully'


const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="ForgotPwdScreen" component={ForgotPwdScreen} />
    <RootStack.Screen name="ConfirmNewPassword" component={ConfirmNewPassword} />
    <RootStack.Screen name="PwdResetSuccessfully" component={PwdResetSuccessfully} />
  </RootStack.Navigator>
);

export default RootStackScreen;
