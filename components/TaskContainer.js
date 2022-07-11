import { useState } from 'react';
import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import Task from "./Task";
import { Picker } from '@react-native-picker/picker';






const TaskContainer = () => {

  const [item, setItem] = useState([]);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [GPS, setGPS] = useState('StartGPS');
  //const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {

    setItem([...item, {
      gps: GPS,
      lat: latitude,
      lon: longitude,
    }])

    console.log(item);

  }

  const deleteItem = (index) => {
    let itemsCopy = [...item];
    itemsCopy.splice(index, 1);
    setItem(item);
  }

  return (
    <View>
      <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>

        <View style={styles.rowContainer}>


          <Text style={styles.label}>GPS Point</Text>
          <Picker
            mode='dropdown'
            style={styles.pickerStyle}
            selectedValue={GPS}
            onValueChange={setGPS}
          >
            <Picker.Item label="Start GPS" value="StartGPS" />
            <Picker.Item label="End GPS" value="EndGPS" />
          </Picker>


        </View>

        <View style={styles.rowContainer}>

          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.textInput}
            //placeholder={'Latitude'}
            value={latitude}
            onChangeText={setLatitude}
          />


        </View>

        <View style={styles.rowContainer}>



          <Text style={styles.label}>Longitude</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setLongitude}
            //placeholder={'Longitude'}
            value={longitude}
          />

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddTask()}
        >
          <Text style={styles.textADD}>ADD</Text>
        </TouchableOpacity>





      </View>

      <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>
        {/* this is the where tasks will go */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, flex: 1, fontWeight: 'bold' }}>
          <Text style={{ flex: 1, alignItems: 'center', marginLeft: 30 }}>GPS Point</Text>
          <Text style={{ flex: 1, alignItems: 'center' }}>Latitude</Text>
          <Text style={{ flex: 1, alignItems: 'center' }}>Longitude</Text>

        </View>
        {
          item.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => deleteItem(index)}>
                <Task text1={item.gps} text2={item.lat} text3={item.lon} />
              </TouchableOpacity>

            )
          })
        }


      </View>

    </View>

  )


}

const styles = StyleSheet.create({

  textInput: {
    flex: 2,
    height: 45,
    marginRight: 15,
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,



  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10,
    marginTop: 10,


  },


  label: {
    flex: 1,
    width: '50%',
    marginLeft: 15,
    color: '#333C8D',
    fontWeight: 'bold',
    fontSize: 15,

  },
  pickerStyle: {
    marginRight: 15,
    height: 10,
    width: "60%",
    color: '#333C8D',
    fontWeight: 'bold',
    backgroundColor: '#EEECEB',

  },

  cordinateContainer: {
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    height: 250,
    backgroundColor: '#EEECEB',

  },

  button: {
    flexDirection: 'row-reverse',
    backgroundColor: '#333C8D',
    padding: 10,
    borderRadius: 20,
    width: '20%',
    margin: 10,
    textAlign: 'center',

  },
  textADD: {
    color: 'white',
    marginRight: 10,
  },
  items: {

    height: 150,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#EEECEB',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,


  },


});

export default TaskContainer;