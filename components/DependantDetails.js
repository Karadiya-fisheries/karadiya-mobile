
import { useState } from 'react';
import React from "react";
import { Button, ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import RTask from "./RTask";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DependantDetails = () => {

    const [dname, setDname] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        setTaskItems([...taskItems, dname]);
        setTaskItems([...taskItems, dtext]);
        setDname(null);
        setDtext(null);


        console.log(taskItems);
    }
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dtext, setDtext] = useState('');


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setDtext(fDate)
        console.log(fDate)

    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const deleteItem = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    }

    return (
        <View>
            <View style={{ borderWidth: 1, borderColor: '#333C8D', borderRadius: 10, padding: 5, marginTop: 10 }}>
                <Text style={styles.text_footer}>Details of Children</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.txt}>Name</Text>
                    <TextInput style={styles.textInput}
                        value={dname}
                        onChangeText={txt3 => setDname(txt3)}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.txt}>Birthday</Text>
                    <TouchableOpacity onPress={showDatepicker}>
                                                <Icon 
                                                name="calendar" 
                                                size={30} 
                                                color="#333C8D"
                                                />
                                            </TouchableOpacity>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />

                    )}
                    <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{dtext}</Text>


                </View>
            </View>






            <TouchableOpacity
                style={styles.button}
                onPress={() => handleAddTask()}
            >
                <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>

            <ScrollView>
                {/* this is the where tasks will go */}
                {
                    taskItems.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => deleteItem(index)}>
                                <RTask txt3={item} txt2={item} />
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
        flex: 2,
        height: 35,
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
    },

    cordinateContainer: {
        margin: 10,
        borderColor: '#333C8D',
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
        borderRadius: 15,
        backgroundColor: '#333C8D',
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

    header: {
        flex: 0.8,
        justifyContent: 'flex-end',
        //paddingHorizontal: 10,
        paddingBottom: 20,



    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderBottomRightRadius: 100,
        paddingHorizontal: 20,

    },

    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#333C8D',
        borderBottomWidth: 0.5,
        borderBottomColor: '#333C8D',
        fontSize: 18,
        flexDirection: 'row-reverse',
        //borderWidth: 5,
        maxWidth: 250,
        paddingRight: 10
    },

    txt: {
        fontSize: 16,
        padding: 15,
        paddingLeft: 5,
        color: '#333C8D',
        //marginEnd: 50,
        minWidth: 160
    },

    picker: {
        backgroundColor: '#333C8D',
        textAlign: 'center',
    },

    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#333C8D',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20


    },
    headTitle1: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',

    },

    headTitle2: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        flexDirection: "column-reverse",
        marginTop: 10,
        backgroundColor: '#333C8D',
        padding: 10,
        width: 120,
        borderRadius: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        marginRight: 10


    }, textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    },

    rowContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },


    checkBox: {
        marginEnd: 10,
        flex: 1,
        flexDirection: 'row',
    },
    label: {
        marginTop: 8.5,
        color: '#333C8D',
        marginRight: 5,
        marginEnd: 4
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop: 30,
    },

    inputContainer: {
        //flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    buttonText: {

        textAlign: 'center',
        fontSize: 15,
        color: '#fff'

    },


    signature: {

        height: 250,
        width: 350

    },
    errorText: {
        fontSize: 12,
        color: 'red',
        textAlign: 'right'
    },


});

export default DependantDetails;