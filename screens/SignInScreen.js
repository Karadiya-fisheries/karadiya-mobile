import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox } from 'react-native-paper';

import { AuthContext } from '../components/context';

const SignInScreen = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const { signIn } = React.useContext(AuthContext);

  const textInpitChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };
  //password validation need to fix

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (username, password) => {
    signIn(username, password);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Text style={styles.titleLeft}>Welcome TO</Text>
        <Text style={styles.titleCenter}>"KARADIYA"</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.editText}>
          <Text style={styles.text_footer}>User Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your User Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInpitChange(val)}
            />

            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
            <View style={styles.checkBox}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                color={'blue'}
                uncheckColor={'red'}
              />

              <Text style={styles.label}>Remember me</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPwdScreen')}>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}>
            <Text style={styles.textSign}>LogIn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.textSign}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333C8D',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#333C8D',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'column-reverse',
    marginTop: 50,
    backgroundColor: '#333C8D',
    padding: 10,
    width: '50%',
    borderRadius: 20,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleLeft: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  titleCenter: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 30,
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    flex: 1,
    flexDirection: 'row',
  },
  editText: {
    flex: 1,
  },

  forgot_button: {
    flex: 1,
    marginLeft: 140,
    color: '#333C8D',
    marginTop: 8.5,
  },

  label: {
    marginTop: 8.5,
    color: '#333C8D',
    marginRight: 5,
  },
});
