import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../components/context';

function SignUpScreen({ navigation }) {
  const [data, setData] = React.useState({
    fullname: '',
    email: '',
    phone: '',
    nic: '',
    password: '',
    passwordConfirm: '',
    check_textInputChange: false,
  });

  const { signUp } = React.useContext(AuthContext);

  const onFullnameChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        fullname: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        fullname: val,
        check_textInputChange: false,
      });
    }
  };

  const onEmailChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const onPhoneChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        phone: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        phone: val,
        check_textInputChange: false,
      });
    }
  };

  const onNicChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        nic: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        nic: val,
        check_textInputChange: false,
      });
    }
  };

  const onPasswordChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        password: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        check_textInputChange: false,
      });
    }
  };

  const onConfirmPasswordChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        passwordConfirm: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        passwordConfirm: val,
        check_textInputChange: false,
      });
    }
  };

  const onEndEditingConfirm = () => {
    if (data.password == '' || data.passwordConfirm == '') {
      console.log('please enter password first');
    } else if (data.password != data.passwordConfirm) {
      console.log("passwords don't match");
    } else if (data.passwordConfirm == data.password) {
      console.log('passwords match');
    }
  };
  //password validation need to fix

  const signupHandle = (fullname, password) => {
    const user = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      nic: data.nic,
      password: data.passwordConfirm,
    };
    signUp(user);
    navigation.navigate('SignInScreen');
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Text style={styles.headTitle1}>Welcome back</Text>
        <Text style={styles.headTitle2}>Continue to Sign In</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.editText}>
          <Text style={styles.text_footer}>Full Name</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Full Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => onFullnameChange(val)}
            />
          </View>

          <Text style={styles.text_footer}>Email Address</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your E-mail"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => onEmailChange(val)}
            />
          </View>

          <Text style={styles.text_footer}>Phone Number</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Phone Number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => onPhoneChange(val)}
            />
          </View>

          <Text style={styles.text_footer}>NIC</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your NIC Number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => onNicChange(val)}
            />
          </View>

          <Text style={styles.text_footer}>Create Password</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter Your Password"
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={val => onPasswordChange(val)}
            />
          </View>

          <Text style={styles.text_footer}>Conform Password</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Reenter Your Password"
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={val => onConfirmPasswordChange(val)}
              onEndEditing={() => onEndEditingConfirm()}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              signupHandle();
            }}>
            <Text style={styles.textSign}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

export default SignUpScreen;

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
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  action: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignContent: 'center'
  },
  textInput: {
    //flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333C8D',
    borderWidth: 1,
    borderRadius: 20,
    width: '90%',
    height: 40,

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
  headTitle1: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  headTitle2: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'column-reverse',
    marginTop: 5,
    backgroundColor: '#333C8D',
    padding: 10,
    width: '50%',
    borderRadius: 20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  editText: {
    flex: 6,
  },
});
