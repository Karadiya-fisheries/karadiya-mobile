import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, PermissionsAndroid } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
MapboxGL.setAccessToken("pk.eyJ1IjoibGFzaXRoYTk3IiwiYSI6ImNsNWd3a2g2cjAzcTgzanVyemE5Y3hnMGgifQ.Q00itaRuT0oH6oUN6lYFlQ");



const WayPonit = () => {

    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);


    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
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

                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude);

                    console.log(position);


                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        }

    };


    const renderAnnotations = () => {
        return (
            <MapboxGL.PointAnnotation
                key="pointAnnotation"
                id="pointAnnotation"
                coordinate={[74, 27]}
            >
                <View
                    style={{
                        height: 30,
                        width: 30,
                        backgroundColor: "red",
                        borderRadius: 50,
                        borderColor: "#fff",
                        borderWidth: 3,
                    }}
                />
            </MapboxGL.PointAnnotation>
        );
    };



    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.Camera
                        zoomLevel={6}
                        centerCoordinate={[lon, lat]}
                    />
                    <MapboxGL.PointAnnotation
                        title="Current Location"
                        coordinate={[lon, lat]} />
                    {/* <View>{renderAnnotations()}</View> */}
                </MapboxGL.MapView>
            </View>
        </View>
    );
};


export default WayPonit;



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        justifyContent: 'center'
    },
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333C8D"
    },
    container: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: "tomato"
    },
    map: {
        flex: 1
    },
});