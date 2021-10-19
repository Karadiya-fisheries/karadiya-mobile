
import React from 'react';
import {View,Text,Button,StyleSheet, TextInput, TouchableOpacity,StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';



const SignInScreen =({navigation})=>{
    

    const [data,setData]=React.useState({
        username: '',
        password:'',
        check_textInputChange:false,
        secureTextEntry:true
    });

    const textInpitChange = (val) => {
        if(val.length!=0){
            setData({
                ...data,
                username:val,
                check_textInputChange:true

            });
        }else {
            setData({
                ...data,
                username:val,
                check_textInputChange:false
            });
        }
    }
    //password validation need to fix
    /*const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }*/


    const updateSecureTextEntry = () =>{
        setData({
            ...data,
            secureTextEntry:!data.secureTextEntry
        });
    }


    return (
        <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.header}>
                <Text style={styles.titleLeft}>Welcome TO</Text>
                <Text style={styles.titleCenter}>"KARADIYA"</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig" 
                style={styles.footer}>

                <Text style={styles.text_footer}>User Name</Text>
                <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Your User Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>textInpitChange(val)}

                />

                {data.check_textInputChange ?
                <Animatable.View
                    animation="bounceIn">

                <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                />

                </Animatable.View>
                
                :null}

                </View>
                <Text style={[styles.text_footer, {
                    marginTop:35
                }]}>Password</Text>
                <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Your Password"
                    secureTextEntry={true}                //{data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>handlePasswordChange(val)}

                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}>

                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
                </View>


                
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        //onPress={onPress}
                    >
                    <Text style={styles.textSign}>LogIn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>navigation.navigate('SignUpScreen')}
                    >
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
      backgroundColor: '#333C8D'
      
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius:100,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#333C8D',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        flexDirection:"column-reverse",
        marginTop: 50,
        backgroundColor: '#333C8D',
        padding: 10,
        width:"50%",
        alignItems:"center",
        borderRadius:20,
    
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
        color:"#fff"
    },
    titleLeft: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'left'
    },
    titleCenter: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
    checkbox: {
        alignSelf: "center",
      },
    rowContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInput: {
        flexDirection: "row",
        marginBottom: 20,
      },
  });