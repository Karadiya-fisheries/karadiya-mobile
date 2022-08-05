
import React, { useState, useEffect, Component, useRef, createRef } from "react";
import { TouchableHighlight, Image, Platform, LogBox, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Button, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';


const fishermanregValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('*This is a required field'),
  confirmPassword: yup
  .string()
  .required('Confirm Password is required')
  .oneOf([yup.ref('password'), null], 'Passwords does not match'),

});


function ConfirmNewPassword( {navigation}) {
   
  return (

    <Formik
      validationSchema={fishermanregValidationSchema}

      initialValues={{
        newPassword: '',
        confirmPassword: '',
      }}

      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, }) => (

<View style={styles.container}>
<View style={styles.header}>

</View>
    <View style={styles.footer}>
        <Text style={styles.headTitle1}>Create New Password</Text>
        <Text style={styles.headTitle2}>Your new passwords must be different from your previously used passwords</Text>
            <Text style={styles.label}>Password</Text>
            <View style={styles.action}>
                <TextInput
                    placeholder="newPassword"
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                />
         

    </View>
        {errors.newPassword && touched.newPassword ? (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              ) : null}


        <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.action}>
                <TextInput
                    placeholder="confirmPassword"
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                />
         

            </View>
            {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}

   
   


            <View style={styles.rowContainer}>
                <TouchableOpacity
                    style={styles.button}
                    //onPress={() => {ResetPwdHandle(); }}
                    onPress={() => navigation.navigate('PwdResetSuccessfully')}
                    >
                
                <Text style={styles.textSign}>RESET PASSWORD</Text>
                </TouchableOpacity>

            </View>

        </View>
    </View>
      )
      }
    </Formik >
  )
};
export default ConfirmNewPassword;


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
   
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 40

    },

    action: {
        flexDirection: 'row',
        marginTop: 10,
       // borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 10
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#333C8D',
        fontSize:16,
        marginBottom:0,
        borderWidth: 0.3,
        borderColor: '#333C8D',
        borderRadius:10
       
    },

    headTitle1: {
        color: '#333C8D',
        fontSize: 25,
        fontWeight: 'bold',
       paddingBottom:5
    },

    headTitle2: {
        marginTop: 15,
        color: '#333C8D',
        fontSize: 16,
        paddingBottom:50
        
        
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
        marginBottom:10,
        paddingHorizontal:10
        

    },
  
    rowContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
  errorText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'right'
  },


});