import { useState, useEffect } from 'react';
import React from "react";
import { ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import Task from "./Task";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Divider} from 'react-native-paper';



const DependentDetails = ({ childToParent }) => {



    

    const [item, setItem] = useState([]);

    const [name, setName] = useState();

    const [nic,setNic] =useState();

    const handleAddTask = () => {

        setItem([...item, {
            name: name,
           nic:nic

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
    });




    return (

        <View>

            <View style={{ borderWidth: 0.5, borderRadius: 10, marginBottom: 50, borderColor: '#333C8D', padding: 10 }}>
                <View style={styles.rowContainer}>



                    <Text style={styles.label}>Name of the passenger</Text>
                    
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setName}
                        //placeholder={'Longitude'}
                        value={name}
                    />

                </View>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.label}>NIC No</Text>

                    <TextInput
                        style={styles.textInput}
                        onChangeText={setNic}
                        //placeholder={'Longitude'}
                        value={nic}
                    />


                </View>



                <View >


                    {item.length <= 2 ?

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleAddTask()}
                        >
                            <Text style={styles.textADD}>ADD</Text>
                        </TouchableOpacity>

                        : null}



                </View>




            </View>

            <View style={{ borderWidth: 0, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>



                <View style={{ borderWidth: 0, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>
                    {/* this is the where tasks will go */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, flex: 1, fontWeight: 'bold' }}>
                        <Text style={{ flex: 1, alignItems: 'center', marginLeft: 30,color:'#333C8D' }}>Name </Text><Divider />
                        <Text style={{ flex: 1, alignItems: 'center',marginLeft: 30,color:'#333C8D' }}>Nic</Text>


                    </View>
                    {
                        item.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => deleteItem(index)}>
                                  <Task text1={item.name} text2={item.nic} />
                                  
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
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#333C8D',
        fontSize: 16,
        marginBottom: 15,
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 20,
        width: "100%",
        backgroundColor: "white",
        //padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 50,
        shadowRadius: 5,
      },

    rowContainer: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'baseline',


    },


    label: {
        fontSize: 18,
        paddingTop: 10,
        paddingLeft: 5,
        color: '#333C8D',
        marginBottom: 15,
        textAlign: 'justify'
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
        borderColor: '#333C8D',
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
        borderColor: '#333C8D',
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
        borderWidth: 0,


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

export default DependentDetails;