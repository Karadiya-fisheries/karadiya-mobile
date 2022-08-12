import React from "react";
import { useState, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const Warning = () => {


    useEffect(() => {

        getLoaction();



    }, []);

    const [key, setKey] = useState('9313cc1f737fc41719b8cab7a7a73e97');
    const [geolat, setgeolat] = useState(13.0827);
    const [geolon, setgeolon] = useState(80.2707);
    const [data, setData] = useState([]);
    const getLoaction = async () => {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {


                    setgeolat(position.coords.latitude);
                    setgeolon(position.coords.longitude);

                    getWeather();
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        }

    };




    const getWeather = async () => {
        if (geolat != null) {



            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${geolat}&lon=${geolon}&exclude=current,minutely,hourly,daily&appid=${key}`
            );


            try {

                const Alartdata = await response.json();
                setData(Alartdata);
                console.log(Alartdata.timezone);

            } catch {
                console.log("undefined");
            }

        }


    };








    if (data.alerts !== undefined) {
        return (

            <View style={styles.Main2}>
                <Text style={styles.MainText3}>Time Zone:{data.timezone}</Text>

                <Text style={styles.MainText3}>Event:{data.alerts[0].event}</Text>

            </View>
        );

    } else {

        return (
            <View style={styles.Main1}>

                <Text style={styles.MainText3}>No Weather Warnings</Text>

            </View>

        );

    }




}

const styles = StyleSheet.create({

    Main1: {

        height: '100%',
        width: '90%',
        padding: 15,
        borderRadius: 20,
        backgroundColor: 'green',

    },
    Main2: {

        height: '100%',
        width: '90%',
        padding: 15,
        borderRadius: 20,
        backgroundColor: 'red',

    },
    MainText3: {
        fontWeight: 'bold',
        marginTop: 0,
        color: '#fff',
        fontSize: RFPercentage(2.5),
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'sans-serif',
    },
});

export default Warning;