
import { useState } from 'react';
import React from "react";
import { Button, ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import RTask from "./RTask";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage,formik } from 'formik';

const childrenValidationSchema = yup.object().shape({

    
  });

const ChildrenDetails = () => {

    const [cname, setCname] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        setTaskItems([...taskItems, cname]);
        setCname(null);
        setTaskItems([...taskItems, dtext]);
        setDtext(null);




        console.log(taskItems);

    }
    const [cdate, setcDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dtext, setDtext] = useState('');


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || cdate;
        setShow(Platform.OS === 'ios');
        setcDate(currentDate);

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
        <Formik
      validationSchema={childrenValidationSchema}

      initialValues={{
        cname:'',
        date:'',
        

      }}

      onSubmit={values => console.log(values)}

    >

      {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, }) => (
        <View>
            <View style={{ borderWidth: 1, borderColor: '#333C8D', borderRadius: 10, padding: 5, marginTop: 10 }}>
                <Text style={styles.text_footer}>Detals of Children</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.txt}>Name</Text>
                    <TextInput style={styles.textInput}
                     onChangeText={handleChange('cname')}
                    
                  //  value={values.nicno}
                        value={cname}
                        //onChangeText={txt3 => setCname(txt3)}
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
                            value={cdate}
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
</Formik >
)
};
const styles = StyleSheet.create({

    textInput: {
        flex: 1,

        color: '#333C8D',
        borderBottomWidth: 0.5,
        borderBottomColor: '#333C8D',
        fontSize: 18,
        flexDirection: 'row-reverse',

        maxWidth: 250,
        paddingRight: 10
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

    button: {
        alignItems: 'center',
        flexDirection: "column-reverse",
        marginTop: 10,
        backgroundColor: '#333C8D',
        padding: 10,
        width: 120,
        borderRadius: 20,
        fontSize: 10,
        fontWeight: 'bold',
        color: "#fff",
        marginRight: 10,



    },
    buttonText: {

        textAlign: 'center',
        fontSize: 15,
        color: '#fff'

    },




});

export default ChildrenDetails;