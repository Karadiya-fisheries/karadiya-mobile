import { useState, useEffect } from 'react';
import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';


function Setwaypoint({ navigation }) {
    const [geolat, setgeolat] = React.useState();
    const [geolon, setgeolon] = React.useState();
    const [lat, setlat] = React.useState('');
    const [lon, setlon] = React.useState('');
    const [location, setLocation] = useState([]);



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
                    //console.log(position);

                    setgeolat(position.coords.latitude);
                    setgeolon(position.coords.longitude);

                    //console.log(position);


                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        }

    };


    const handleAddLocation = () => {
        setlat(lat);
        setlon(lon);
        setLocation([...location, {

            lat: lat,
            lon: lon,
        }])




        navigation.navigate('Navigation', {

            screen: 'WayPoint',
            params: {
                location: location
                // lat: geolat,
                // lon: geolon

            }
        });
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




