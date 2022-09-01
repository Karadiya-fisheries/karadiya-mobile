import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const PredictionScreen = () => {

  const [fishType, setfishType] = useState('Tuna');

  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));
  function showDatePicker() {
    setDatePicker(true);
  };

  function showTimePicker() {
    setTimePicker(true);
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Text style={styles.headTitle1}>Predictor</Text>


      </View>
      <View style={styles.footer}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>


          <Text style={styles.txt}>Fish Type</Text>
          <Picker
            mode='dropdown'
            style={styles.pickerStyle}
            selectedValue={fishType}
            onValueChange={setfishType}
          >
            <Picker.Item label="Tuna" value="Tuna" />
            <Picker.Item label="Senric Tuna" value="Sentic_Tuna" />
            <Picker.Item label="Bill Fish" value="Bill_Fish" />
            <Picker.Item label="Sharks Rays" value="Sharks_Rays" />
            <Picker.Item label="Other Fish" value="Other_Fish" />
          </Picker>


        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Text style={styles.txt}>From</Text>


          {!datePicker && (

            <TouchableOpacity onPress={showDatePicker}>
              <Icon
                name="calendar"
                size={30}
                color="#333C8D"
              />
            </TouchableOpacity>
          )}




          {datePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelected}
            //style={styleSheet.datePicker}
            />
          )}

          <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{date.toString()}</Text>



        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Text style={styles.txt}>To</Text>


          {!datePicker && (

            <TouchableOpacity onPress={showDatePicker}>
              <Icon
                name="calendar"
                size={30}
                color="#333C8D"
              />
            </TouchableOpacity>
          )}




          {datePicker && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelected}
            //style={styleSheet.datePicker}
            />
          )}

          <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{date.toString()}</Text>



        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Forcasting')}
            style={styles.button}>
            <Text style={styles.btnText}>Request & Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>


          <View style={styles.coodCon}>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                //onPress={ }
                style={styles.button}>
                <Text style={styles.btnText}>Display Location</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>

      </View>

    </View>
  );
};

export default PredictionScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333C8D'

  },
  header: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,

  },

  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderBottomRightRadius: 100,
    paddingHorizontal: 20,
    justifyContent: 'space-between',

  },

  headTitle1: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },

  button: {
    flex: 0.8,
    borderColor: '#333C8D',
    borderWidth: 2,
    borderRadius: 10,
    width: "80%",
    alignItems: 'center',
    height: 80,
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: '#333C8D',
  },

  btnText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
  },
  pickerStyle: {
    marginRight: 15,
    height: 10,
    width: "60%",
    color: '#333C8D',
    fontWeight: 'bold',
    backgroundColor: '#EEECEB',

  },
  txt: {
    fontSize: 16,
    padding: 15,
    paddingLeft: 5,
    color: '#333C8D',
    //marginEnd: 50,
    minWidth: 160
  },
  coodCon: {
    backgroundColor: '#b3ccff',
    borderRadius: 20,
    opacity: 0.8

  }


});