import { useState, useEffect } from 'react';
import React from "react";
import { ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import Task from "./Task";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox, RadioButton, RadioButtonGroup } from 'react-native-paper';



import TaskContainer from './TaskContainer';





const CoodinateContainer = ({ childToParent }) => {


    const [size, setsize] = useState(0);
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

    const [item, setItem] = useState([]);

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [GPS, setGPS] = useState('StartGPS');

    const handleAddTask = () => {

        setItem([...item, {
            fishDate: date.toLocaleDateString('en-US'),
            fishTime: time.toLocaleTimeString('en-US'),
            gps: GPS,
            lat: latitude,
            lon: longitude,
        }])

        //console.log(item);

    }
    const deleteItem = (index) => {
        let itemsCopy = [...item];
        itemsCopy.splice(index, 1);
        setItem(itemsCopy);
    }

    useEffect(() => {
        childToParent(item);
        setsize(item.length);
    });




    return (

        <View>

            <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>
                <Text style={styles.text_footer}>Fishing Details</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={styles.txt}>Fishing Date</Text>


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

                    <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{date.toLocaleDateString()}</Text>



                </View>

                {/* {errors.FishingDate && touched.FishingDate ? (
                                            <Text style={styles.errorText}>{errors.FishingDate}</Text>
                                        ) : null} */}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Text style={styles.txt}>Fishing Time</Text>



                    {!timePicker && (

                        <TouchableOpacity onPress={showTimePicker}>
                            <Icon
                                name="clock"
                                size={30}
                                color="#333C8D"
                            />
                        </TouchableOpacity>
                    )}

                    {timePicker && (
                        <DateTimePicker
                            value={time}
                            mode={'time'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={false}
                            onChange={onTimeSelected}
                        //style={styleSheet.datePicker}
                        />
                    )}

                    <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{time.toLocaleTimeString('en-US')}</Text>

                </View>
                {/* {errors.FishingTime && touched.FishingTime ? (
                                            <Text style={styles.errorText}>{errors.FishingTime}</Text>
                                        ) : null} */}







            </View>

            <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>

                <View >

                    <View style={styles.rowContainer}>


                        <Text style={styles.label}>GPS Point</Text>
                        {/* <Picker
                            mode='dropdown'
                            style={styles.pickerStyle}
                            selectedValue={GPS}
                            onValueChange={setGPS}
                        >
                            <Picker.Item label="Start GPS" value="StartGPS" />
                            <Picker.Item label="End GPS" value="EndGPS" />
                        </Picker> */}
                        <RadioButton.Group
                            onValueChange={setGPS}
                            value={GPS}>
                            <View style={{ flexDirection: 'row' }}>
                                <RadioButton color="#333C8D" value="StartGPS" />
                                <Text style={styles.txt}>Start</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <RadioButton value="EndGPS" color="#333C8D" />
                                <Text style={styles.txt}>End</Text>
                            </View>
                        </RadioButton.Group>


                    </View>

                    <View style={styles.rowContainer}>

                        <Text style={styles.label}>Latitude</Text>
                        <TextInput
                            style={styles.textInput}
                            //placeholder={'Latitude'}
                            value={latitude}
                            onChangeText={setLatitude}
                            keyboardType={'numeric'}
                        />


                    </View>

                    <View style={styles.rowContainer}>



                        <Text style={styles.label}>Longitude</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={setLongitude}
                            //placeholder={'Longitude'}
                            value={longitude}
                            keyboardType={'numeric'}


                        />

                    </View>



                    {size <= 1 ?

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleAddTask()}
                        >
                            <Text style={styles.textADD}>ADD</Text>
                        </TouchableOpacity>

                        : null}



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
        color: '#333C8D'


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

export default CoodinateContainer;