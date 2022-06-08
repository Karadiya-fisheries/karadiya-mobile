import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    PermissionsAndroid,
    Button,
    SafeAreaView,
    StatusBar,

} from "react-native";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Geolocation from 'react-native-geolocation-service';




export class Forcasting extends Component {
    Api = {
        key: '9313cc1f737fc41719b8cab7a7a73e97',
    };
    state = {
        lat: null,
        lon: null,
        data: null,
    };


    componentDidMount() {
        this.getLoaction();
    }
    //location permissions and set location
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
                    this.getWeather();
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        }

    };

    getWeather = async () => {
        if (this.state.lat != null) {

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=${this.Api.key}`
            );

            const data = await response.json();
            //console.log(data);
            this.setState({
                data: data,
            })
        }


    };


    round = (temp) => {
        let a = Math.trunc(temp * 100 + 0.5);
        let finalTemp = (a / 100);
        return finalTemp;
    }


    render() {
        const { data } = this.state;
        console.log(data);

        if (data != null) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>

                        <View style={styles.topPanel}>
                            <Text style={styles.Title}>Current Weather</Text>
                            <Text>{data.weather.main}</Text>
                            <Text>TEMP: {this.round(data.main.temp - 272.15)} C</Text>
                            <Text>Preasure: {data.main.pressure}</Text>
                            <Text>Humidity: {data.main.humidity}</Text>
                            <Text>Wind Speed: {data.wind.speed} km/h</Text>
                            <Text>Wind Degree: {data.wind.deg} from north</Text>

                        </View>
                    </View>
                    <View style={styles.footer}>



                        <View style={styles.bottomPanel}>
                            <Text style={styles.Title}>Weather Forecast</Text>

                        </View>




                    </View>


                </View>
            );

        } else {

            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.Title}>Weather Forecast</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.loadingTxt}>Loading...</Text>



                    </View>


                </View>
            );

        }



    }
}

export default Forcasting;





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    Title: {
        fontSize: RFPercentage(5),
    },
    header: {
        flex: 1,
        backgroundColor: '',
    },
    footer: {
        flex: 2,
        backgroundColor: '',
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },
    weathercontainer: {
        fontFamily: 'Helvetica, sans-serif',
        gradientStart: '#0181C2',
        gradientMid: '#04A7F9',
        gradientEnd: '#4BC4F7',
        locationFontColor: '#FFF',
        todayTempFontColor: '#FFF',
        todayDateFontColor: '#B5DEF4',
        todayRangeFontColor: '#B5DEF4',
        todayDescFontColor: '#B5DEF4',
        todayInfoFontColor: '#B5DEF4',
        todayIconColor: '#FFF',
        forecastBackgroundColor: '#FFF',
        forecastSeparatorColor: '#DDD',
        forecastDateColor: '#777',
        forecastDescColor: '#777',
        forecastRangeColor: '#777',
        forecastIconColor: '#4BC4F7',
    },
    loadingTxt: {
        fontSize: RFPercentage(5),
    },
    topPanel: {
        flex: 1,
    },
    bottomPanel: {
        flex: 3,
    }
});