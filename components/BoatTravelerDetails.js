
import { useState } from 'react';
import React from "react";
import { Button, ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import BTask from "./BTask";


const BoatTravelerDetails = () => {

    const [pname, setPname] = useState();
    const [pnic, setPnic] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handleAddTask = () => {
        setTaskItems([...taskItems, pname]);
        setPname(null);
        setTaskItems([...taskItems, pnic]);
        setPnic(null);
        setTaskItems([...taskItems, dtext]);
        setDtext(null);




        console.log(taskItems);

    }
    const [dtext, setDtext] = useState('');

    const deleteItem = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
    }

    return (
        <View style={{paddingHorizontal:15}}>
             <Text style={styles.txt}>11. Boat Traveler Details (Fill in the number of travelers only)</Text>
            <View style={{ borderWidth: 0, borderColor: '#333C8D', borderRadius: 10, padding: 5, marginTop: 10 }}>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.txt}>Name of first{"\n"}passenger</Text>
                    <TextInput style={styles.textInput}
                        value={pname}
                        onChangeText={txt3 => setPname(txt3)}
                    />
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.txt}>NIC number</Text>
                    <TextInput style={styles.textInput}
                        value={pnic}
                        onChangeText={txt4 => setPnic(txt4)}
                    />
                 

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
                                <BTask txt3={item} txt4={item} />
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
        color: '#333C8D',
        borderBottomWidth: 0.5,
        borderBottomColor: '#333C8D',
        fontSize: 18,
        flexDirection: 'row-reverse',
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
        fontSize: 18,
        padding: 15,
        paddingLeft: 5,
        color: '#333C8D',
        //marginEnd: 50,
        minWidth: 160,
        //margin:10
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

export default BoatTravelerDetails;