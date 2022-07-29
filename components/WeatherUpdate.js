import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




const WeatherTask = (props) => {



    console.log(props);

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>


                <Text style={styles.itemText1}>{props.des}</Text>
                <Text style={styles.itemText1}>{Math.round(props.temp)} &deg;C</Text>
                <Text style={styles.itemText2}>Preasure: {props.preas}  hPa</Text>
                <Text style={styles.itemText2}>Humidity:{props.hum} %</Text>
                <Text style={styles.itemText2}>Wind Speed: {props.speed} km/h</Text>
                <Text style={styles.itemText2}>Wind Degree: {props.deg} from north</Text>

            </View>

        </View>
    )


}

const styles = StyleSheet.create({

    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        shadowColor: 'black',
        marginTop: 10,
        width: 350,
        height: 200,


    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 8.4,
        borderRadius: 5,
        marginRight: 15,


    },

    itemText1: {
        maxWidth: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        color: '#333C8D',
        fontSize: RFPercentage(3),
        fontWeight: 'bold',

    },

    itemText2: {
        maxWidth: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        color: '#333C8D',
        fontSize: RFPercentage(2),

    },




});

export default WeatherTask;