import React, { useEffect, useState } from 'react';
import { TextInput, Modal, View, Text, Button, StyleSheet, Dimensions, PermissionsAndroid } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';


MapboxGL.setAccessToken("pk.eyJ1IjoibGFzaXRoYTk3IiwiYSI6ImNsNWd3a2g2cjAzcTgzanVyemE5Y3hnMGgifQ.Q00itaRuT0oH6oUN6lYFlQ");



const WayPonit = ({ route, navigation }) => {

    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    //const { lat1, lon1 } = route.params;



    //const [location, setLocation] = useState(route.params.location);
    // console.log("location1");
    // console.log(lat1);
    // console.log(lon1);
    // console.log("location2");






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

                    //console.log(position);


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



    const actions = [
        {
            text: "Add Location",
            icon: ({ color, size }) => (
                <Icon
                    name="account-outline"
                    color={color}
                    size={size}
                />
            ),
            name: "add_location",
            position: 1
        },
        {
            text: "Save Waypoint",
            icon: ({ color, size }) => (
                <Icon
                    name="account-outline"
                    color={color}
                    size={size}
                />
            ),
            name: "save_waypoint",
            position: 2
        },
        {
            text: "Load Waypoint",
            icon: ({ color, size }) => (
                <Icon
                    name="account-outline"
                    color={color}
                    size={size}
                />
            ),
            name: "load_waypoint",
            position: 3
        },

    ];

    const floatonPress = () => {
        console.log("Action button Pressed");
        navigation.navigate('SetWayPoint')

    };

    const [polygon, setPolygon] = useState({
        type: "Feature",
        geometry: {
            type: "Polygon",
            coordinates: [
                [
                    [72.685547, 20.055931],
                    [76.640625, 21.207458],
                    [76.904297, 17.978733],
                    [72.685547, 20.055931],
                ],
            ],
        },
    });

    const [isModalVisible, setModalVisible] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };


    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView
                    //onDidFailLoadingMap={() => { console.log("Map is Not Loaded"); }}
                    style={styles.map}>
                    <MapboxGL.Camera
                        zoomLevel={6}
                        centerCoordinate={[lon, lat]}
                    />
                    <MapboxGL.PointAnnotation
                        title="Current Location"
                        coordinate={[lon, lat]} />

                    <MapboxGL.ShapeSource id="source" shape={polygon}>
                        <MapboxGL.FillLayer id="fill" style={{ fillColor: "blue" }} />
                        <MapboxGL.LineLayer
                            id="line"
                            style={{ lineColor: "red", lineWidth: 2 }}
                        />
                    </MapboxGL.ShapeSource>


                </MapboxGL.MapView>





            </View>

            <View >

                <FloatingAction
                    actions={actions}
                    color='#333C8D'
                    position='left'
                    //style={styles.floatView}
                    onPressItem={floatonPress}
                />


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
        backgroundColor: "#333C8D"
    },
    map: {
        flex: 1
    },

});