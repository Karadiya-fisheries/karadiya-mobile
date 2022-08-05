import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Switch} from 'react-native';
import {
  Button,
  Divider,
  Paragraph,
  Portal,
  Subheading,
} from 'react-native-paper';

import {
  Avatar,
  Title,
  List,
  Headline,
  Appbar,
  Card,
  Modal,
  Surface,
} from 'react-native-paper';
import {Subheader} from 'react-native-paper/lib/typescript/components/List/List';
import{ AuthContext } from '../components/context';

function SettingsScreen({navigation}) {
  const { signOut } = React.useContext(AuthContext);

  const { signIn } = React.useContext(AuthContext);

  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(previousState1 => !previousState1);

  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState2 => !previousState2);
 
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <Portal.Host>
        
      </Portal.Host>
     
      <View style={styles.surface}>
        <View style={styles.border}>
        
        <Text  style={styles.content}>Profile</Text>
            <TouchableOpacity
            onPress={() => {navigation.navigate('Profile')}}>  
              <Text  style={styles.tool}>  > </Text>
            </TouchableOpacity>   
            


            
            </View>
            <View style={styles.border}>
           <View style={{marginBottom:20}}>
            <Text  style={styles.content}>Save the profile details {"\n"}when filling form</Text>
            
            </View>
            <Switch
                paddingLeft={70}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled1 ? "#2B6ED3" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch1}
                value={isEnabled1}
            />
            </View>
            

            <View style={styles.border}>
              <Divider />
           
            <Text  style={styles.content}>Battery save mode</Text>
            <Switch
                paddingLeft={113}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled2 ? "#2B6ED3" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2}
                value={isEnabled2}
            />
            </View>

            <View style={styles.border}>
           <TouchableOpacity onPress={() => {signOut()}} >
           <Text  style={styles.content}>Sign Out</Text>
           </TouchableOpacity>
           
           </View>
           

           <View style={styles.border}>
           <TouchableOpacity onPress={() => {signIn()}} >
           <Text  style={styles.content}>Switch to another account</Text>
           </TouchableOpacity>
           
           </View>
           
           
            </View>

   
            

            <View>
            
            


            </View>
      
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2B6ED3',
    position: 'relative',
  },
  text_header: {
    fontFamily: 'Roboto Condensed',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 42,
    color: '#FFFFFF',
  },
  content:{

   // fontFamily: 'Roboto Condensed',
    fontStyle: 'normal',
    //fontWeight: 'bold',
    fontSize: 22,
    color: '#2B6ED4',
    paddingLeft:40,
    height:50,
    marginTop:25,
    alignContent:'center'
    
   

  },
  tool:{

    // fontFamily: 'Roboto Condensed',
     fontStyle: 'normal',
     //fontWeight: 'bold',
     fontSize: 32,
     color: '#2b6ed3',
     paddingLeft:220,
     flexDirection:'row-reverse',
     marginTop:20
   
    
 
   },

  more: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '40%',
    height: '20%',
    backgroundColor: '#fff',
    elevation: 4,
    zIndex: 1,
  },
  surface: {
    //position: 'absolute',
    bottom: 0,
    height: '80%',
    width: '100%',
   // alignItems: 'center',
    backgroundColor: '#fff',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 120,
    zIndex: 0,
    paddingTop:50
  },
 
  name: {
    marginTop: 6,
    fontFamily: 'Roboto Condensed',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 28,
  },
  detail: {
    margin: 5,
    fontFamily: 'Roboto Condensed',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 21,
    textDecorationColor: '#2B6ED3',
  },

  border:{
    marginHorizontal:20,
    flexDirection:'row',
    borderWidth:0.5,
    borderColor:'#2B6ED3',
    marginVertical:5,
    borderRadius:10,
    
    
   
   
  
    

  },

});


/* <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    */