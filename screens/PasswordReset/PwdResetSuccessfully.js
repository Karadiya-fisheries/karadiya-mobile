import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions, Image,alignItems } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function PwdResetSuccessfully({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.header}>
              
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}>
                    <View style={{borderWidth:1,height:150, alignItems: 'center',padding:40,marginHorizontal:20,borderRadius:20,borderColor:'#333C8D'}}>
                    <Text style={styles.headTitle1}>Password Reset Successfully</Text>
                    <View style={{ flexDirection: 'column', alignItems: 'center',marginTop:10 }}>
                    <Icon 
                                                name="check-circle" 
                                                size={35} 
                                                color="green"
                                                alignItems="center"
                                                
                                                />
                            </View> 
                            </View>

                            <View style={{ flexDirection: 'row', marginTop:150 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignInScreen')}>
                        <Text style={styles.signup_button}>SignIn</Text>
                    </TouchableOpacity>
                    <Text style={styles.textSign}>To Continue</Text>
                   
                    </View>
                                          
                                          

            </Animatable.View>

        </View>
    );
}

export default PwdResetSuccessfully;


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
        paddingVertical: 200

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
        color: '#333C8D',
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
        color: "#333C8D"
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
       alignItems:'center',
        fontSize: 20,
        color: '#333C8D',

    },
    rowContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },



});