import React from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import authService from '../service/auth.service';



const Task = () => {

    const [user, setUser] = useState({});
    const [visible, setVisible] = React.useState(false);
    useEffect(() => {
        authService.getCurrentUser().then(res => {
            setUser(JSON.parse(res));
        });
    }, []);




    return (
        <View style={styles.Main}>
            <Text style={styles.MainText1}>Hi {user.fullname}!</Text>

            <View style={styles.Main2} >

                <Text style={styles.MainText2}>KARADIYA MOBILE</Text>

            </View>



        </View >
    )


}

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({

    Main: {
        flex: 1,
        height: '100%',
        width: height * 0.45,
        padding: 15,
        borderRadius: 30,
        shadowColor: 'black',
        backgroundColor: '#b5b9e3',
        marginTop: 40,
        marginBottom: 20,

    },
    Main2: {

        marginTop: 5,
        //width: '100%',
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    MainText1: {
        marginTop: 10,
        color: '#333C8D',
        fontSize: RFPercentage(2.5),
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
    },

    MainText2: {
        color: '#333C8D',
        fontSize: RFPercentage(4),
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center'
    },
    MainText3: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 0,
        color: '#fff',
        fontSize: RFPercentage(4),
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'sans-serif',
    },
});

export default Task;