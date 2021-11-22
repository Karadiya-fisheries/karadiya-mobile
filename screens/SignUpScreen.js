
import * as React from 'react';
import { View, Text,StyleSheet,TextInput,TouchableOpacity ,StatusBar,fetch} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';




function SignUpScreen() {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        phone:'',
        email:'',
        successful: false,
        message: '',
        // check_textInputChange: false,
        // secureTextEntry: true,
        // confirm_secureTextEntry: true,
    });

    const textUserNameChange = (val) => {
        
            setData({
                ...data,
                username: val,
                
            });
        
    }

    const textEmailChange = (val) => {
        
        setData({
            ...data,
            email: val,
            
        });
    
    }

    const textPhoneChange = (val) => {
        
        setData({
            ...data,
            phone: val,
            
        });
    
    }



    const PasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const onSubmitHanndle=(data)=>{
       
        console.log(data.username,data.password,data.phone,data.email);
         axios.post('https://serene-woodland-83390.herokuapp.com/api/auth/signup', {
            
                        
                fullname : data.username ,
                 email : data.email,
                 phone : data.phone,
                 password : data.password,
                 roles : ['user'],

           })
           .then(function (response) {
            console.log(response);


           })
           .catch(function (error) {
             console.log(error);
           });

    
    }

    
    



  return (
      
    <View style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.header}>
                <Text style={styles.headTitle1}>Welcome back</Text>
                <Text style={styles.headTitle2}>Continue to Sign In</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig" 
                style={styles.footer}>

                <View style={styles.editText}>

                    <Text style={styles.text_footer}>Full Name</Text>
                    <View style={styles.action}>
                    
                    <TextInput
                        placeholder="Your Full Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        //value={this.state.fullname}
                        //onChange={this.onChangeFullname}
                        onChangeText={(val)=>textUserNameChange(val)}

                    />
                    </View>

                    <Text style={styles.text_footer}>Email Address</Text>
                    <View style={styles.action}>
                    
                    <TextInput
                        placeholder="Your E-mail"
                        style={styles.textInput}
                        autoCapitalize="none"
                        // value={this.state.phone}
                        // onChange={this.onChangePhone}
                        onChangeText={(val)=>textEmailChange(val)}

                    />
                    </View>

                    <Text style={styles.text_footer}>Phone Number</Text>
                    <View style={styles.action}>
                    
                    <TextInput
                        placeholder="Your Phone Number"
                        style={styles.textInput}
                        autoCapitalize="none"
                        // value={this.state.phone}
                        // onChange={this.onChangePhone}
                        onChangeText={(val)=>textPhoneChange(val)}

                    />
                    </View>

                    {/* <Text style={styles.text_footer}>NIC</Text>
                    <View style={styles.action}>
                    
                    <TextInput
                        placeholder="Your NIC Number"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=>textInpitChange(val)}

                    />
                    </View> */}

                    <Text style={styles.text_footer}>Create Password</Text>
                    <View style={styles.action}>
                    
                    <TextInput
                        placeholder="Enter Your Password"
                        style={styles.textInput}
                        secureTextEntry={true} 
                        autoCapitalize="none"
                        // value={this.state.password}
                        // onChange={this.onChangePassword}
                        onChangeText={(val)=>PasswordChange(val)}

                    />
                    </View>

                    {/* <Text style={styles.text_footer}>Conform Password</Text>
                    <View style={styles.action}>
                    
                    <TextInput
                        placeholder="Reenter Your Password"
                        style={styles.textInput}
                        secureTextEntry={true} 
                        autoCapitalize="none"
                        onChangeText={(val)=>textInpitChange(val)}

                    />
                    </View> */}

                </View>

                <View style={styles.rowContainer}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>onSubmitHanndle(data)}
                    >
                    <Text style={styles.textSign}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            
        </View>
  );
}

export default SignUpScreen ;

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
        flex: 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius:100,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        //flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color:'#333C8D',
        fontSize: 18
    },
    headTitle1: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center'
    },

    headTitle2: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center'
    },
    button: {
        alignItems: 'center',
        flexDirection:"column-reverse",
        marginTop: 5,
        backgroundColor: '#333C8D',
        padding: 10,
        width:"50%",
        alignItems:"center",
        borderRadius:20,
    
    },textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color:"#fff"
    },

    rowContainer: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    editText:{
        flex:6,
    }



});