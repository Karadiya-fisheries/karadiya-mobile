
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-animatable';
import CompassHeading from 'react-native-compass-heading';


const Compass = () => {
    const [compassHeading, setCompassHeading] = useState(0);

    useEffect(() => {
        const degree_update_rate = 3;

        // accuracy on android will be hardcoded to 1
        // since the value is not available.
        // For iOS, it is in degrees
        CompassHeading.start(degree_update_rate, ({ heading, accuracy }) => {
            setCompassHeading(heading);
        });

        return () => {
            CompassHeading.stop();
        };
    }, []);

    return (


        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headTitle1}>Compass</Text>


            </View>
            <View style={styles.footer}>

                <Image
                    style={[
                        styles.image,
                        { transform: [{ rotate: `${360 - compassHeading}deg` }] },
                    ]}
                    resizeMode="contain"
                    source={require('../../assets/icon.png')}
                />


            </View>

        </View>




    );
};

const styles = StyleSheet.create({
    image: {
        width: '90%',
        flex: 1,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#333C8D'

    },
    header: {
        flex: 0.8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50,

    },

    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderBottomRightRadius: 100,
        paddingHorizontal: 20,
        justifyContent: 'space-between',

    },

    headTitle1: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },

});

export default Compass;

