
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, PermissionsAndroid, TouchableOpacity, TextInput } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { set } from 'react-native-reanimated';


function Setwaypoint({ navigation }) {

    const [lat, setlat] = useState();
    const [lon, setlon] = useState();
    //const [location, setLocation] = useState([]);
    const [item, setItem] = useState([]);

    const [geolat, setgeolat] = useState(5);
    const [geolon, setgeolon] = useState(80);



    useEffect(() => {

        getLoaction();


    });


    const [route, setRoute] = useState({
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: [
                        [77.5946, 12.9716],
                        [80.2707, 13.0827],
                    ],
                },
            },
        ],
    });

    const getLoaction = async () => {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {


                    setgeolat(parseFloat(position.coords.latitude));
                    setgeolon(parseFloat(position.coords.longitude));


                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        }

    };






    const handleAddLocation = () => {

        console.log(lat);
        console.log(lon);


        setItem([...item, {
            lat: parseFloat(lat),
            lon: parseFloat(lon),
        }]);

        console.log("items: " + item);



    }

    const handleCurrentLocation = () => {

        setlat(geolat.toString());
        setlon(geolon.toString());

    }



    return (

        <View style={styles.page}>
            <View style={styles.container}>

                <MapboxGL.MapView
                    style={styles.map}>
                    <MapboxGL.Camera
                        zoomLevel={8}
                        centerCoordinate={[geolon, geolat]}
                    />

                    <MapboxGL.UserLocation />

                    <MapboxGL.ShapeSource id="line1" shape={route}>
                        <MapboxGL.LineLayer
                            id="linelayer1"
                            style={{ lineColor: "red", lineWidth: 5 }}
                        />
                    </MapboxGL.ShapeSource>


                    {item[0] !== undefined ?

                        <MapboxGL.PointAnnotation
                            id={'MOB'}
                            coordinate={[item[0].lon, item[0].lat]}

                        />
                        :
                        null}

                    {item[1] !== undefined ?

                        <MapboxGL.PointAnnotation
                            id={'MOB'}
                            coordinate={[item[1].lon, item[1].lat]}

                        />
                        :
                        null}


                    {item[2] !== undefined ?

                        <MapboxGL.PointAnnotation
                            id={'MOB'}
                            coordinate={[item[2].lon, item[2].lat]}

                        />
                        :
                        null}


                    {item[3] !== undefined ?

                        <MapboxGL.PointAnnotation
                            id={'MOB'}
                            coordinate={[item[3].lon, item[3].lat]}

                        />
                        :
                        null}


                    {item[4] !== undefined ?

                        <MapboxGL.PointAnnotation
                            id={'MOB'}
                            coordinate={[item[4].lon, item[4].lat]}

                        />
                        :
                        null}


                    {item[5] !== undefined ?

                        <MapboxGL.PointAnnotation
                            id={'MOB'}
                            coordinate={[item[5].lon, item[5].lat]}

                        />
                        :
                        null}

                </MapboxGL.MapView>

            </View>
            <View style={styles.Btncontainer}>


                <View style={styles.rowContainer}>



                    <Text style={styles.label}>Latitude</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setlat}
                        placeholder={'Latitude'}
                        value={lat}
                        keyboardType={'numeric'}

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

                    />

                </View>


                {/* <View style={styles.rowContainer}>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={setItem(null)}
                        >
                            <Text style={styles.textADD}>Delete Location</Text>
                        </TouchableOpacity>
                    </View>


                </View> */}

                <View style={styles.rowContainer}>

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



        </View>


    );
}



export default Setwaypoint;

const { height } = Dimensions.get("screen");

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({


    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    container: {
        flex: 4,
        width: windowWidth,
        backgroundColor: "#333C8D",
        borderRadius: 20,

    },
    Btncontainer: {
        flex: 2,
        backgroundColor: "white",
        borderRadius: 20,
    },
    map: {
        flex: 0.95,
        borderRadius: 20,
    },
    btnText: {
        color: '#fff',
        fontSize: RFPercentage(4),
        margin: windowHeight * 0.03,
        fontWeight: 'bold',
        alignItems: 'center',

    },
    button: {
        borderRadius: 20,
        margin: windowHeight * 0.03,
        width: "80%",
        alignItems: 'center',
        height: windowHeight * 0.12,
        backgroundColor: 'red',
        textAlign: 'center'
    },
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
        padding: 10,
        borderRadius: 20,
        width: '80%',
        margin: 10,
        textAlign: 'center',

    },
    textADD: {
        color: 'white',
        marginRight: 10,
        textAlign: 'center',
    },

});




