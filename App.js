/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import RootStackScreen from './screens/RootStackScreen';
import HomeStackScreen from './screens/HomeStackScreen';
import { AuthContext } from './components/context';
import { DrawerContent } from './screens/DrawerContent';
import HomeScreen from './screens/HomeScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import FishermanRegistration from './screens/FishermanRegistration';
import ElogBookScreen from './screens/ElogBookScreen';
import NavigationScreen from './screens/Navigation/NavigationScreen';
import PredictionScreen from './screens/PredictonScreen';
import BoatRegistrtionScreen from './screens/BoatRegistrationScreen';
import DepartureApprovalScreen from './screens/DepartureApprovalScreen';
import ProfileScreen from './screens/ProfileScreen';
import WayPoint from './screens/Navigation/WayPoint';
import ManOverBoard from './screens/Navigation/ManOverBoard';
import Compass from './screens/Navigation/Compass';
import Forcasting from './screens/Navigation/Forcasting';

const Drawer = createDrawerNavigator();







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

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken != null ? (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="E-logBook" component={ElogBookScreen} />
            <Drawer.Screen name="Navigation" component={NavigationScreen} />
            <Drawer.Screen
              name="Fisherman-Registration"
              component={FishermanRegistration}
            />
            <Drawer.Screen name="Prediction" component={PredictionScreen} />
            <Drawer.Screen
              name="Boat-Registration"
              component={BoatRegistrtionScreen}
            />
            <Drawer.Screen
              name="Departure-Approval"
              component={DepartureApprovalScreen}
            />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="WayPoint" component={WayPoint} />
            <Drawer.Screen name="ManOverBoard" component={ManOverBoard} />
            <Drawer.Screen name="Compass" component={Compass} />
            <Drawer.Screen name="Forcasting" component={Forcasting} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
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
