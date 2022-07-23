import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, PermissionsAndroid } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
MapboxGL.setAccessToken("pk.eyJ1IjoibGFzaXRoYTk3IiwiYSI6ImNsNWd3a2g2cjAzcTgzanVyemE5Y3hnMGgifQ.Q00itaRuT0oH6oUN6lYFlQ");


export default class WayPoint extends Component {

    state = {
        lat: 6.9641717,
        lon: 80.0473799,

    };



    componentDidMount() {
        MapboxGL.setTelemetryEnabled(false);
        this.getLoaction();


    }

    renderAnnotations = () => {
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


    getLoaction = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    this.setState({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });

                    console.log(this.state.lat);
                    console.log(this.state.lon);

                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        }

    };








    render() {


        return (
            <View style={styles.page}>
                <View style={styles.container}>


                    <MapboxGL.MapView style={styles.map}>
                        <MapboxGL.Camera
                            zoomLevel={2}
                            //centerCoordinate={[this.state.lat, this.state.lon]}
                            centerCoordinate={[6.0329, 80.2168]}
                            showUserLocation={true}
                            animationMode={'flyTo'}
                        />
                        <MapboxGL.PointAnnotation

                            coordinate={[this.state.lon, this.state.lat]} />
                        <View>{this.renderAnnotations()}</View>


                    </MapboxGL.MapView>

                </View>
            </View>
        );
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
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