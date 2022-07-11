import { useState } from 'react';
import React from "react";
import { ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import Task from "./Task";
import { Picker } from '@react-native-picker/picker';





const FishCatchContainer = () => {

  const [item, setItem] = useState([]);

  const [fishType, setfishType] = useState();
  const [subfishType, setsubfishType] = useState();
  const [QTY, setQTY] = useState();
  const [Weight, setWeight] = useState();

  //const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {

    setItem([...item, {
      fishType: fishType,
      subFishType: subfishType,
      QTY: QTY,
      Weight: Weight,
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
        <Text style={styles.text_footer}>Catch Details</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>


          <Text style={styles.txt}>Fish Type</Text>
          <Picker
            mode='dropdown'
            style={styles.pickerStyle}
            selectedValue={fishType}
            onValueChange={setfishType}
          >
            <Picker.Item label="Tuna" value="Tuna" />
            <Picker.Item label="End GPS" value="EndGPS" />
          </Picker>


        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>


          <Text style={styles.txt}>Sub Fish Type</Text>
          <Picker
            mode='dropdown'
            style={styles.pickerStyle}
            selectedValue={subfishType}
            onValueChange={setsubfishType}
          >
            <Picker.Item label="Yellow Fin" value="Yellow_Fin" />
            <Picker.Item label="Red Fin " value="Red_Fin" />
          </Picker>


        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>

          <TextInput
            style={styles.textInput}
            onChangeText={setQTY}
            placeholder={'QTY'}
            value={QTY}

          />


          <TextInput
            style={styles.textInput}
            onChangeText={setWeight}
            placeholder={'Weight'}
            value={Weight}

          />

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddTask()}
        >
          <Text style={styles.textADD}>ADD</Text>
        </TouchableOpacity>





      </View>

      <ScrollView style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, flex: 1 }}>
          <Text style={{ flex: 1, alignItems: 'center' }}>Fish Type</Text>
          <Text style={{ flex: 1, alignItems: 'center' }}>Qty</Text>
          <Text style={{ flex: 1, alignItems: 'center' }}>Weight</Text>

        </View>
        {/* this is the where tasks will go */}
        {
          item.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => deleteItem(index)}>
                <Task text1={item.subFishType} text2={item.QTY} text3={item.Weight} />
              </TouchableOpacity>

            )
          })
        }


      </ScrollView>

    </View>

  )


}

const styles = StyleSheet.create({

  textInput: {
    flex: 1,
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    borderColor: '#333C8D',
    flexDirection: 'row-reverse',
    fontSize: 18,
    height: 40,

  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'baseline',


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
    height: 200,
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

    height: 250,
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#EEECEB',
    marginLeft: 10,
    marginRight: 10,
    position: 'relative',

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

  txt: {
    fontSize: 16,
    padding: 15,
    paddingLeft: 5,
    color: '#333C8D',
    //marginEnd: 50,
    minWidth: 160
  },
  text_footer: {
    color: '#333C8D',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20


  },

});

export default FishCatchContainer;