
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, PermissionsAndroid, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



MapboxGL.setAccessToken("pk.eyJ1IjoibGFzaXRoYTk3IiwiYSI6ImNsNWd3a2g2cjAzcTgzanVyemE5Y3hnMGgifQ.Q00itaRuT0oH6oUN6lYFlQ");


const ManOverBoard = () => {

    const [geolat, setgeolat] = useState(5);
    const [geolon, setgeolon] = useState(80);
    const [moblat, setmoblat] = useState();
    const [moblon, setmoblon] = useState();

    useEffect(() => {

        getLoaction();


    });

    const MOB = () => {

        console.log("MOB Clicked");
        setmoblat(geolat);
        setmoblon(geolon);

    }


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

    return (

        <View style={styles.page}>
            <View style={styles.container}>

                <MapboxGL.MapView
                    style={styles.map}>
                    <MapboxGL.Camera
                        zoomLevel={8}
                        centerCoordinate={[geolon, geolat]}
                    />



                    <MapboxGL.PointAnnotation

                        title={"Current"}
                        coordinate={[geolon, geolat]} >

                    </MapboxGL.PointAnnotation>



                    {moblat !== undefined ?

                        <MapboxGL.PointAnnotation coordinate={[moblon, moblat]} />
                        :
                        null}

                </MapboxGL.MapView>

            </View>
            <View style={styles.Btncontainer}>

                <TouchableOpacity
                    onPress={MOB}
                    style={styles.button}>
                    <Text style={styles.btnText}>Man Over Board</Text>
                </TouchableOpacity>

            </View>



        </View>




    );
};

export default ManOverBoard;

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
        flex: 5,
        width: windowWidth,
        backgroundColor: "#333C8D",
        borderRadius: 20,

    },
    Btncontainer: {
        flex: 1,
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

});


{/* <MapboxGL.MapView

style={styles.map}>
<MapboxGL.Camera
    zoomLevel={6}
    centerCoordinate={[81, 8]}
/>
{/* {
    loc.map((point, index) => (
        <MapboxGL.PointAnnotation coordinate={[parseFloat(point.lon), parseFloat(point.lat)]} />
    ))
} */}

{/* <MapboxGL.PointAnnotation coordinate={[80.566, 5.941]} />

<MapboxGL.PointAnnotation coordinate={[82.566, 4.941]} />

<MapboxGL.PointAnnotation coordinate={[78.566, 3.941]} /> */}

{/* <MapboxGL.ShapeSource id="source" shape={polygon}>
    <MapboxGL.FillLayer id="fill" style={{ fillColor: "blue" }} />
    <MapboxGL.LineLayer
        id="line"
        style={{ lineColor: "red", lineWidth: 2 }}
    />
</MapboxGL.ShapeSource> */}

{/* {location &&
    location?.length > 0 &&
    location.map((marker, index) => (
        <Marker
            key={index}
            coordinate={[marker.lat, marker.lon]}
            // id must be a string
            id={index.toString()}
        //image={require('../../assets/waypoint.png')}
        />
    ))
} */}


// */}
