/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ToastProvider } from 'react-native-toast-notifications'

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import RootStackScreen from './screens/RootStackScreen';
import HomeStackScreen from './screens/HomeStackScreen';

import { ActivityIndicator } from 'react-native-paper';

import { AuthContext } from './components/context';
import { DrawerContent } from './screens/DrawerContent';
import HomeScreen from './screens/HomeScreen';

import FishermanRegistration from './screens/FishermanRegistration';
import ElogBookScreen from './screens/ElogBookScreen';
import NavigationScreen from './screens/Navigation/NavigationScreen';
import PredictionScreen from './screens/Prediction/PredictonScreen'
import NoticesScreen from './screens/Notices/NoticesScreen'
import DepartureApprovalScreen from './screens/DepartureApprovalScreen';
import ProfileScreen from './screens/ProfileScreen';
import ManOverBoard from './screens/Navigation/ManOverBoard';
import Forcasting from './screens/Navigation/Forecast';
import Compass from './screens/Navigation/Compass';
import WayPoint from './screens/Navigation/WayPoint';
import Setwaypoint from './screens/Navigation/Setwaypoint.js';
import Notice from './screens/Notices/Notice';

const Drawer = createDrawerNavigator();
const NaviDrawer = createDrawerNavigator();







const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  const API_URL = 'https://serene-woodland-83390.herokuapp.com/api/auth/';

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        var userToken;
        userToken = null;
        try {
          const email = userName;
          axios
            .post(API_URL + 'signin', {
              email,
              password,
            })
            .then(response => {
              if (response.data.accessToken) {
                userToken = response.data.accessToken;
                AsyncStorage.setItem('userToken', userToken);
                AsyncStorage.setItem('user', JSON.stringify(response.data));
                console.log(userToken);
                dispatch({ type: 'LOGIN', id: userName, token: userToken });
              }
              return response.data;
            });
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('user');
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: 'LOGOUT' });
      },
      signUp: user => {
        axios.post(API_URL + 'signup', user).then(res => {
          console.log(res);
        });
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      //setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken);
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  function NaviStackScreen() {
    return (
      <NaviDrawer.Navigator>
        <NaviDrawer.Screen name="Navigation" component={NavigationScreen} />
        <NaviDrawer.Screen name="WayPoint" component={WayPoint} />
        <NaviDrawer.Screen name="ManOverBoard" component={ManOverBoard} />
        <NaviDrawer.Screen name="Compass" component={Compass} />
        <NaviDrawer.Screen name="Forcasting" component={Forcasting} />


      </NaviDrawer.Navigator>
    );
  }

  function NoticeStackScreen() {
    return (
      <NaviDrawer.Navigator>
        <NaviDrawer.Screen name="NoticeScreen" component={NoticesScreen} />
        <NaviDrawer.Screen name="Notice" component={Notice} />
      </NaviDrawer.Navigator>
    );
  }

  return (
    <ToastProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken != null ? (
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="Home" component={HomeStackScreen} />
              <Drawer.Screen name="E-logBook" component={ElogBookScreen} />
              <Drawer.Screen name="Navigation" component={NaviStackScreen} />

              <Drawer.Screen
                name="Fisherman-Registration"
                component={FishermanRegistration}
              />
              <Drawer.Screen name="Prediction" component={PredictionScreen} />
              <Drawer.Screen
                name="NoticesScreen"
                component={NoticeStackScreen}
              />
              <Drawer.Screen
                name="Departure-Approval"
                component={DepartureApprovalScreen}
              />

              <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
              />

              <Drawer.Screen
                name="SetWayPoint"
                component={Setwaypoint}
              />



            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
