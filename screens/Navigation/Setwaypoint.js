import { useState, useEffect } from 'react';
import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Setwaypoint({ navigation }) {
    const [geolat, setgeolat] = useState();
    const [geolon, setgeolon] = useState();
    const [lat, setlat] = useState();
    const [lon, setlon] = useState();
    //const [location, setLocation] = useState([]);
    const [item, setItem] = useState([]);



    useEffect(() => {

        getLoaction();


    });

    const getLoaction = async () => {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {


                    setgeolat(position.coords.latitude);
                    setgeolon(position.coords.longitude);


                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        }

    };

    const storeData = async (location) => {
        try {
            const jsonValue = JSON.stringify(location)
            console.log("after:" + jsonValue);
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            console.log(e);
        }
    }




    const handleAddLocation = () => {

        setItem([...item, {
            lat: lat,
            lon: lon,
        }]);

        console.log("before:" + item);

        storeData(item);

        // navigation.navigate('Navigation', {

        //     screen: 'WayPoint',
        //     params: {
        //         location: location
        //     }
        // });
    }

    const handleCurrentLocation = () => {

        setlat(geolat.toString());
        setlon(geolon.toString());

    }



    return (
        <View style={styles.outterContainer}>
            <View style={styles.innerContainer}>

                <View style={styles.rowContainer}>



                    <Text style={styles.label}>Latitude</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setlat}
                        placeholder={'Latitude'}
                        value={lat}
                        keyboardType={'numeric'}
                    //defaultValue={geolat}
                    />

                </View>
                <View style={styles.rowContainer}>



                    <Text style={styles.label}>Longitude</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setlon}
                        placeholder={'Longitude'}
                        value={lon}
                        keyboardType={'numeric'}
                    //defaultValue={geolon.toString()}
                    />

                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleCurrentLocation()}
                    >
                        <Text style={styles.textADD}>Set Current Location</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleAddLocation()}
                    >
                        <Text style={styles.textADD}>Add Location</Text>
                    </TouchableOpacity>
                </View>




            </View>
        </View>
    );
}



export default Setwaypoint;

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    outterContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333C8D'
    },
    innerContainer: {
        backgroundColor: '#fff',
        height: 350,
        width: height * 0.4,
        borderRadius: 20,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 2,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#333C8D',
        fontSize: 16,
        marginBottom: 15,
        marginRight: 15,
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
    label: {
        flex: 1,
        textAlign: 'center',
        marginTop: 8.5,
        color: '#333C8D',
        marginRight: 5,
        marginEnd: 4,
        fontWeight: 'bold'
    },
    button: {
        flexDirection: 'column',
        backgroundColor: '#333C8D',
        padding: 20,
        borderRadius: 20,
        width: '60%',
        margin: 10,
        textAlign: 'center',

    },
    textADD: {
        color: 'white',
        marginRight: 10,
        textAlign: 'center',
    },
});




