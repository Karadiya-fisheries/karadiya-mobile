import React from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
            <Text style={styles.MainText1}>Hi {user.fullname}!!!</Text>
            <Text style={styles.MainText2}>Welcome to</Text>
            <Text style={styles.MainText3}>KARADIYA MOBILE</Text>

        </View>
    )


}

const styles = StyleSheet.create({

    Main: {

        height: '100%',
        width: 400,
        padding: 15,
        borderRadius: 30,
        shadowColor: 'black',





    },
    MainText1: {
        marginTop: 10,
        color: '#fff',
        fontSize: RFPercentage(4),
        fontFamily: 'sans-serif',
    },

    MainText2: {
        marginTop: 0,
        color: '#fff',
        fontSize: RFPercentage(3),
        fontFamily: 'sans-serif',
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