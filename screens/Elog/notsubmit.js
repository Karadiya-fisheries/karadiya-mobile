import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function notsubmit({ navigation }) {

    const [log, setlog] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Elog')
            console.log("get not submit:" + jsonValue);
            setlog(JSON.parse(jsonValue));

        } catch (e) {
            console.log(e);
        }
    };

    const claerData = async () => {
        setlog([null]);

        try {
            await AsyncStorage.removeItem('Elog')
        } catch (e) {
            // remove error
        }



        console.log("claer" + log);

    }






    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.header}>
                <Text style={styles.headTitle1}>Not Submitted</Text>


            </View>
            <View style={styles.footer}>
                <ScrollView>



                    <View style={styles.rowContainer}>

                        <TouchableOpacity

                            onPress={claerData}
                            style={styles.button}>

                            <Text style={styles.btnText}>clear Data</Text>
                        </TouchableOpacity>




                    </View>









                </ScrollView>

            </View >

        </View >
    );
}

export default notsubmit;

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
        marginTop: 20,
    },

    button: {
        flex: 0.9,
        borderColor: '#333C8D',
        borderWidth: 2,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: '#333C8D',
    },

    btnText: {
        color: '#fff',
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },




});