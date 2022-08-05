import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';




MapboxGL.setAccessToken("pk.eyJ1IjoibGFzaXRoYTk3IiwiYSI6ImNsNWd3a2g2cjAzcTgzanVyemE5Y3hnMGgifQ.Q00itaRuT0oH6oUN6lYFlQ");



const WayPonit = ({ route, navigation }) => {

    // const [lat, setLat] = useState(0);
    // const [lon, setLon] = useState(0);
    // const { location } = route.params;
    // console.log(location);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            console.log("get:" + jsonValue + "end");
            return jsonValue != null ? JSON.parse(jsonValue) : null;

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();

    });

    const Marker = ({ coordinate, image, id }) => {
        return (
            <MapboxGL.MarkerView coordinate={coordinate} id={id}>
          // Add any image or icon or view for marker
                <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                />
            </MapboxGL.MarkerView>
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

                    style={styles.map}>
                    <MapboxGL.Camera
                        zoomLevel={6}
                        centerCoordinate={[81, 8]}
                    />

                    <MapboxGL.ShapeSource id="source" shape={polygon}>
                        <MapboxGL.FillLayer id="fill" style={{ fillColor: "blue" }} />
                        <MapboxGL.LineLayer
                            id="line"
                            style={{ lineColor: "red", lineWidth: 2 }}
                        />
                    </MapboxGL.ShapeSource>

                    {/* {location &&
                        location?.length > 0 &&
                        location.map((marker, index) => (
                            <Marker
                                coordinate={[location.lon, location.lat]}
                                // id must be a string
                                id={`index + 1`}
                            //image={require('../../assets/waypoint.png')}
                            />
                        ))
                    } */}


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