import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ReactWeather, { useOpenWeather } from 'react-open-weather';


const Forcasting = () => {
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '4a83dac02e036df66c95ecf71bec65dd',
        lat: '48.137154',
        lon: '11.576124',
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });

    const customStyles = {
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
    };


    return (
        <View style={styles.container}>
            <Text>Forcasting</Text>
            <ReactWeather
                theme={customStyles}
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel="Munich"
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
        </View>
    );
};

export default Forcasting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});