import React from 'react';
import * as Animatable from 'react-native-animatable';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Button
} from 'react-native';

const SplashScreen=({navigation})=>{
    return (
        <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.header}>
                <Animatable.Image
                        animation="bounceInDown"
                        
                         
                    source={require('../assets/KaradiyaLogo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />

              

            </View>
            <Animatable.View
                animation="fadeInUpBig" 
                style={styles.footer}>

                <Text style={styles.title}>Karadiya Mobile App</Text>
                <Text style={styles.text}>Sign in with account</Text>
           
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>navigation.navigate('SignInScreen')}
                >
                    <Text style={styles.textSign}>GET STARTED</Text>
                    
                </TouchableOpacity>

            </Animatable.View>
            
        </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#BDD9F5'
      },
      header: {
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center'
      },
      footer: {
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomRightRadius:100,
          paddingVertical: 50,
          paddingHorizontal: 30
      },
      logo: {
          width: height_logo,
          height: height_logo
      },
      title: {
          color: '#05375a',
          fontSize: 30,
          fontWeight: 'bold',
          textAlign:'center'
      },
      text: {
          color: 'black',
          marginTop:5,
          fontSize:20,
          marginTop:10,
          marginBottom:10,
          textAlign:'center',

      },
      button: {
        alignItems: 'center',
        flexDirection:"column-reverse",
        marginTop: 10,
        backgroundColor: '#333C8D',
        padding: 10,
        borderRadius:20,
      },
      signIn: {
          width: 150,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          flexDirection: 'row'
      },
      textSign: {
          color: 'black',
          fontWeight: 'bold',
          alignItems:'center',
          justifyContent: 'center',
      },
      textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color:"#fff"
    },
});