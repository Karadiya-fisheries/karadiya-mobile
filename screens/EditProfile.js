import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Switch,Image,Dimensions,TextInput,SafeAreaView} from 'react-native';
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

import * as ImagePicker from "react-native-image-picker";
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';

function SettingsScreen({navigation}) {
  
 
  const options = {
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const openPicker = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
    })

};
  return (
    <SafeAreaView style={styles.container}>
       <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
        />
        <Appbar.Content title="Profile" />
       
      </Appbar.Header>
      
      <Avatar.Image
      
        size={120}
        source={require('../assets/avatar.jpg')}
        style={styles.avatar}
      />
     
      <View style={styles.surface}>
      <DataTable>
        <DataTable.Header>
          
        </DataTable.Header>
        </DataTable>
        <DataTable.Row>
          <DataTable.Cell> <Text  style={styles.content}>Name</Text><TextInput style={styles.tool}/></DataTable.Cell>
          <DataTable.Cell><TextInput style={styles.tool}/></DataTable.Cell>
          
        </DataTable.Row>

            
           <View style={{flexDirection:'row'}}>
            <Text  style={styles.content}>Name    </Text>
            <TextInput style={styles.tool}></TextInput>
            </View>
            
            <View style={{flexDirection:'row'}}>
                <Text  style={styles.content}>NIC Number</Text>
                <TextInput style={styles.tool}></TextInput>
             </View>

            <View style={{flexDirection:'row'}}>
            <Text  style={styles.content}>Boat License</Text>
            <TextInput style={styles.tool}></TextInput>
            </View>

            <View style={{flexDirection:'row'}}>
          
            <Text  style={styles.content}>Gear Type</Text>
            <TextInput style={styles.tool}></TextInput>
           
           
           </View>
           

           <View style={{flexDirection:'row'}}>
          
            <Text  style={styles.content}>Boat Type</Text>
            <TextInput style={styles.tool}></TextInput>
           
           
           </View>
           <View style={{flexDirection:'row'}}>
            <Text  style={styles.content}>Local Vessel{"\n"}License No</Text>
            <TextInput style={styles.tool}></TextInput>
           </View>
           <View style={{flexDirection:'row'}}>
            <Text  style={styles.content}>International {"\n"}Vessel{"\n"}License No</Text>
            <TextInput style={styles.tool}></TextInput>
           </View>

           <View>
               <TouchableOpacity>
               <Button style={styles.button}>abba</Button>
               </TouchableOpacity>
           </View>
           
           
            </View>

   
            

            <View>
            
            


            </View>
      
    </SafeAreaView>
  );
}

export default SettingsScreen;


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333c8d',
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


button: {
    alignItems:'center',
    flexDirection: "column-reverse",
   // marginTop: 10,
    backgroundColor: '#333C8D',
    //padding: 10,
    width: 120,
    borderRadius: 20,
    fontSize:18,
    fontWeight: 'bold',
    color: "#fff",
    paddingLeft:10,
    marginEnd:10


},
  content:{

   //fontFamily: 'Roboto Condensed',
    fontStyle: 'normal',
    //fontWeight: 'bold',
    fontSize: 20,
    color: '#2B6ED4',
    paddingLeft:30,
    height:50,
    marginTop:25,
    //marginEnd:50
   
  
   

  },
  tool:{
    flex: 1,
   marginTop: Platform.OS === 'ios' ? 0 : -12,
   maxWidth:300,
    paddingRight:"50%",
    flexDirection:'row-reverse',
    marginTop:20,
    color: '#333C8D',
    fontSize: 16,
    height: 40,
    borderRadius: 15,
    paddingHorizontal: 20,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 50,
    shadowRadius: 5,
    marginHorizontal:30,
    
    
   
    
 
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
    position: 'absolute',
    bottom: 0,
    height: '70%',
    width: '100%',
//alignItems: 'center',
    backgroundColor: '#fff',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 120,
    zIndex: 0,
    paddingTop:30
  },
  avatar: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    borderColor: '#0b1647',
    borderWidth: 3,
    zIndex: 1,
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