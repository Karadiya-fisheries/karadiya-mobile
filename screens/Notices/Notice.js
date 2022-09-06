import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions, ScrollView, Image } from 'react-native';
import { Headline, Avatar } from 'react-native-paper';


function Notice({ route, navigation }) {

    const { post } = route.params;

    const imageUrl = post.author.avatarUrl;
    const img = post.cover;
    const view = post.view;

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.header}>
                <Text style={styles.headTitle1}>Notice</Text>
            </View>

            <View style={styles.footer}>
                <ScrollView>

                    <View style={{ borderWidth: 0.5, borderRadius: 40, marginTop: 20, borderColor: '#333C8D', padding: 10, marginBottom: 10 }}>

                        <Image
                            source={{ uri: img }}
                            style={styles.cover}
                        //resizeMode="stretch"
                        >
                        </Image>
                        <View style={styles.rowContainer}>
                            <Text style={styles.footertxt1}>Author:</Text>

                            <Text style={styles.footertxt2}>{post.author.name}</Text>




                        </View>
                        {/* <Avatar.Image
                          source={{uri: imageUrl}}
                          style={styles.logo}
                         //resizeMode="stretch"
                          >
                        </Avatar.Image> */}

                        <View style={styles.rowContainer}>
                            <Text style={styles.footertxt1}>Title:</Text>

                            <Text style={styles.footertxt2}>{post.title}</Text>


                        </View>


                        <View style={styles.rowContainer}>
                            <Text style={styles.footertxt1}>Notice:</Text>

                            <Text style={styles.footertxt2}>{post.text}</Text>

                        </View>


                        <View >
                        </View>

                    </View>
                    <View >

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
    textContainer: {


    },

    header: {
        flex: 0.8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // paddingHorizontal: 0,
        paddingBottom: 30,

    },

    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderRadius: 40,
        paddingHorizontal: 20,
        justifyContent: 'space-between',

    },
    logo: {
        position: 'absolute',
        top: '20%',
        alignSelf: 'flex-end',
        //borderColor: 'white',
        //borderWidth: 0,
        zIndex: 1,
        margin: 20,

    },


    cover: {
        width: height_logo * 3.85,
        height: height_logo * 2,
        borderColor: '#333C8D',
        borderWidth: 0,
        marginBottom: 0,
        borderRadius: 40
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
        //marginEnd:100
        flexDirection: 'column-reverse',
        //fontWeight:'bold'
    },
    footertxt2: {
        flex: 4,
        color: '#333C8D',
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold'
    },




});