import React, { Component, useEffect } from "react";
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

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Geolocation from 'react-native-geolocation-service';
import WeatherTask from "../../components/WeatherUpdate";
import { ScrollView } from "react-native-gesture-handler";




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
        this.getWeather();
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
                `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=minutely,hourly&appid=${this.Api.key}`
            );


            const data = await response.json();
            //console.log(data);
            this.setState({
                data: data,
            })
        }


    };




    render() {
        const { data } = this.state;

        console.log(data);

        if (data != null) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>

                        <View style={styles.topPanel}>
                            <Text style={styles.Title}>Current Weather</Text>
                            <WeatherTask des={data.current.weather[0].main} temp={(data.current.temp - 272.15)}
                                preas={data.current.pressure} hum={data.current.humidity} speed={data.current.wind_speed} deg={data.current.wind_deg} />
                        </View>
                    </View>
                    <View style={styles.footer}>



                        <View style={styles.bottomPanel}>
                            <Text style={styles.Title}>Weather Forecast</Text>
                            <ScrollView >

                                <WeatherTask des={data.daily[0].weather[0].main} temp={(data.daily[0].temp.day - 272.15)}
                                    preas={data.daily[0].pressure} hum={data.daily[0].humidity} speed={data.daily[0].wind_speed} deg={data.daily[0].wind_deg} />

                                <WeatherTask des={data.daily[1].weather[0].main} temp={(data.daily[1].temp.day - 272.15)}
                                    preas={data.daily[1].pressure} hum={data.daily[1].humidity} speed={data.daily[1].wind_speed} deg={data.daily[1].wind_deg} />

                                <WeatherTask des={data.daily[2].weather[0].main} temp={(data.daily[2].temp.day - 272.15)}
                                    preas={data.daily[2].pressure} hum={data.daily[2].humidity} speed={data.daily[2].wind_speed} deg={data.daily[2].wind_deg} />

                                <WeatherTask des={data.daily[3].weather[0].main} temp={(data.daily[3].temp.day - 272.15)}
                                    preas={data.daily[3].pressure} hum={data.daily[3].humidity} speed={data.daily[3].wind_speed} deg={data.daily[3].wind_deg} />

                                <WeatherTask des={data.daily[4].weather[0].main} temp={(data.daily[4].temp.day - 272.15)}
                                    preas={data.daily[4].pressure} hum={data.daily[4].humidity} speed={data.daily[4].wind_speed} deg={data.daily[4].wind_deg} />

                                <WeatherTask des={data.daily[5].weather[0].main} temp={(data.daily[5].temp.day - 272.15)}
                                    preas={data.daily[5].pressure} hum={data.daily[5].humidity} speed={data.daily[5].wind_speed} deg={data.daily[5].wind_deg} />

                                <WeatherTask des={data.daily[6].weather[0].main} temp={(data.daily[6].temp.day - 272.15)}
                                    preas={data.daily[6].pressure} hum={data.daily[6].humidity} speed={data.daily[6].wind_speed} deg={data.daily[6].wind_deg} />



                            </ScrollView>


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
        marginTop: 0,
        backgroundColor: '#333C8D',
    },
    Title: {
        marginTop: 10,
        fontSize: RFPercentage(4),
        textAlign: 'center',
    },
    header: {
        flex: 1,

    },
    footer: {
        flex: 2,
        marginTop: 10,
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