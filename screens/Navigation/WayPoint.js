import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken("pk.eyJ1IjoibGFzaXRoYTk3IiwiYSI6ImNsNWd3a2g2cjAzcTgzanVyemE5Y3hnMGgifQ.Q00itaRuT0oH6oUN6lYFlQ");

export default class WayPoint extends Component {
    componentDidMount() {
        MapboxGL.setTelemetryEnabled(false);
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <MapboxGL.MapView style={styles.map} />
                </View>
            </View>
        );
    }
}


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
        height: 300,
        width: 300,
        backgroundColor: "tomato"
    },
    map: {
        flex: 1
    },
});