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
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


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



const App = () => {

  // const [isLoading,setIsLoading]=React.useState(true);
  // const [userToken,setUserToken]=React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
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

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(() => ({
    signIn: async(userName, password)=>{
      // setUserToken('fgkj');
      // setIsLoading(false);
      let userToken;
      userToken=null;

      if(userName == 'user' && password  =='pass'){ //userName and Password fetch from backend api 
        
        try {
          userToken='dfgdfg';       //usertoken fetch from api 
          await AsyncStorage.setItem('userToken', userToken );
        } catch(e) {
          console.log(e);
        }

      }
     
      dispatch({ type:'LOGIN', id:userName, token:userToken });

    },
    signOut: async()=>{
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }

      dispatch({ type:'LOGOUT' });

    },
    signUp: ()=>{
      setUserToken('fgkj');
      setIsLoading(false);
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      //setIsLoading(false);
      let userToken;
      userToken=null;
      try {
        await AsyncStorage.getItem('userToken' );
      } catch(e) {
        console.log(e);
      }


      dispatch({ type:'RETRIEVE_TOKEN', token:userToken });

    },1000);
  }, []);


  if (loginState.isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }
  

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken != null ? (
          <HomeStackScreen/>
        )
        :
          <RootStackScreen/>
        }
        
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
