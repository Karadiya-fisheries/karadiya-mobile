import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions, Image, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import AuthService from  "../services/auth.service";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const fishermanregValidationSchema = yup.object().shape({
    email: yup
    .string()
    .email("Please enter a valid email")
    .required('*This is a required field'),
  
  });
  
  

function ForgotPwdScreen({ navigation }) {

    const ResetPwdHandle = (email) => {
        signIn(username, password);
      };





    return (

        <Formik
      validationSchema={fishermanregValidationSchema}

      initialValues={{
       email: '',
       

      }}

      onSubmit={values => console.log(values)}

    >

      {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, }) => (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.header}>
                <Image
                    source={require('../assets/lock.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />

                <Text style={styles.headTitle1}>Forgot Password</Text>
                <Text style={styles.headTitle2}>We just need your registered email address to send you passsword reset</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>

                <Text style={styles.label}>Email</Text>
                <View style={styles.action}>

                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20} />
                     <TextInput style={styles.textInput}
                      name="email"
                      placeholder="Email Address"

                      keyboardType='email-address'
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}

                </View>


                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('ConfirmNewPassword')}
                    >
                        <Text style={styles.textSign}>SEND RESET LINK</Text>
                    </TouchableOpacity>

                </View>


                <View style={styles.bottomContainer}>
                    <Text style={styles.label}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}>
                        <Text style={styles.signup_button}>SignUp</Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>

        </View>
  )
}
</Formik >
)
};
export default ForgotPwdScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333C8D'

    },
    header: {
        flex: 1.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,

    },
    logo: {
        width: height_logo,
        height: height_logo,

    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 30

    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 10
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',

    },

    headTitle1: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    headTitle2: {
        marginTop: 15,
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        flexDirection: "column-reverse",
        marginTop: 10,
        backgroundColor: '#333C8D',
        padding: 10,
        width: "60%",
        alignItems: "center",
        borderRadius: 30,

    },

    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    },
    bottomContainer: {
        flexDirection: "row",
        marginTop: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },

    label: {
        color: '#333C8D',

    },
    signup_button: {
        marginLeft: 10,
        fontSize: 18,
        color: '#333C8D',

    },
    rowContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },



});