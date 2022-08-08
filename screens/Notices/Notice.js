import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';


function Notice({ route, navigation }) {

    const { post } = route.params;



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.header}>
                <Text style={styles.headTitle1}>Notice</Text>


            </View>
            <View style={styles.footer}>
                <ScrollView>
                    <View style={styles.rowContainer}>
                        <Text style={styles.footertxt1}>Title:</Text>

                        <Text style={styles.footertxt2}>{post.title}</Text>

                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.footertxt1}>Author:</Text>

                        <Text style={styles.footertxt2}>{post.author.name}</Text>

                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={styles.footertxt1}>Notice:</Text>

                        <Text style={styles.footertxt2}>{post.text}</Text>

                    </View>

                </ScrollView>

            </View>

        </View>
    );
}

export default Notice;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;


const styles = StyleSheet.create({
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },

    button: {
        flex: 0.8,
        borderColor: '#333C8D',
        borderWidth: 2,
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        height: 80,
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: '#333C8D',
    },
    imageContainer: {
        width: height_logo,
        height: height_logo,
        marginTop: 12,
    },
    icon: {
        height: 50,
        marginBottom: 5,
        marginTop: 5,
        alignContent: 'center',
        alignItems: 'center',
    },
    footertxt1: {
        flex: 1,
        color: '#333C8D',
        fontSize: 20,
        marginTop: 20,
    },
    footertxt2: {
        flex: 4,
        color: '#333C8D',
        fontSize: 20,
        marginTop: 20,
    },




});