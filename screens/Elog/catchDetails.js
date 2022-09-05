
import React, { useState, useEffect, Component, useRef, createRef } from "react";
import { TouchableHighlight, Image, Platform, LogBox, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Button, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { Formik, Field, Form, ErrorMessage, formik } from 'formik';
import CoodinateContainer from "../../components/CoodinateContainer";
import FishCatchContainer from "../../components/FIshCatchContainer";


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";










function catchDetail({ route, navigation }) {

    //const { logRecord } = route.params;


    //console.log(netInfo.isConnected);

    const toast = useToast();
    const [item, setItem] = useState([]);
    const [logrec, setLogrec] = useState([]);
    //console.log("catch log");
    //console.log(logRecord);



    // const storeData = async (log) => {
    //     //console.log(log)
    //     try {
    //         const jsonValue = await JSON.stringify(log)
    //         await AsyncStorage.setItem('Elog', jsonValue)
    //     } catch (e) {
    //         console.log(e);
    //     }

    // }

    const storeItem = async (log) => {
        console.log(log)
        try {
            const jsonValue = await JSON.stringify(log)
            await AsyncStorage.setItem('Itemlocal', jsonValue)
        } catch (e) {
            console.log(e);
        }

    }


    // useEffect(async () => {
    //     try {
    //         const savedData = await AsyncStorage.getItem('Elog');
    //         const currentData = JSON.parse(savedData);

    //         if (currentData != null) {
    //             console.log("currentData");
    //             console.log(currentData);
    //             setLogrec(currentData);

    //         } else {
    //             console.log("read error")
    //         }



    //     } catch (error) {
    //         console.log(error);
    //     }

    //     // return () => {
    //     //     console.log('This will be logged on unmount');
    //     // };

    // }, []);

    const [coods, setCoods] = useState([]);
    const [fishList, setFish] = useState([]);

    const childToParent1 = (childdata) => {
        setCoods(childdata);

    }

    const childToParent2 = (childdata) => {
        setFish(childdata);

    }


    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);


    }, [])






    // const triplog = {
    //     boatBoatId: 1,
    //     WesselID: logrec.WesselID,
    //     SkipperID: logrec.SkipperID,
    //     Harbor: logrec.depharbor,
    //     DepartureDate: logrec.depDate,
    //     DepartureTime: logrec.depTime,
    //     GearType: logrec.gearType,
    //     MainLine: logrec.mainLine,
    //     BranchLine: logrec.branchLine,
    //     HookNo: logrec.hookNo,
    //     HookTypes: logrec.hookType,
    //     Depth: logrec.depth,
    //     Bait: logrec.bait,
    //     CatchRecords: logrec.CatchRecords,

    // }








    const progressStepsStyle = {
        activeStepIconBorderColor: '#333C8D',
        activeLabelColor: '#333C8D',
        activeStepNumColor: '#333C8D',
        completedStepIconColor: '#333C8D',
        completedProgressBarColor: '#333C8D',
        completedCheckColor: 'white',
        marginBottom: 35,


    };


    return (

        <Formik

            initialValues={{


            }}


            onSubmit={values => {

                //console.log(coods);
                //console.log(fishList);



                try {



                    console.log("log");
                    console.log(logrec);
                    console.log("item");
                    console.log(item);

                    setItem((item) => [...item, {
                        FishingDate: coods[0].fishDate,
                        FishingTime: coods[0].fishTime,
                        GPSPoint: {

                            long1: coods[0].lon,
                            lat1: coods[0].lat,


                            long2: coods[1].lon,
                            lat2: coods[1].lat


                        },
                        Catch: fishList

                    }]);

                    if (item.length == null) {
                        setItem((item) => [...item, {
                            FishingDate: coods[0].fishDate,
                            FishingTime: coods[0].fishTime,
                            GPSPoint: {

                                long1: coods[0].lon,
                                lat1: coods[0].lat,


                                long2: coods[1].lon,
                                lat2: coods[1].lat


                            },
                            Catch: fishList

                        }]);

                    }

                    console.log("item");
                    console.log(item);
                    console.log("item");

                    const val = {
                        item: item
                    }


                    storeItem(val);
                    navigation.goBack();

                } catch (e) {
                    console.log("cood error");

                    toast.show("enter coodinates correctly !!", {
                        type: "warning",
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                    });
                }



            }}

        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, }) => (

                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headTitle1}>Catch record</Text>


                    </View>
                    <View style={styles.footer}>

                        <View style={{ flex: 1 }}>


                            <ProgressSteps {...progressStepsStyle}>

                                <ProgressStep>

                                    <CoodinateContainer childToParent={childToParent1} />

                                </ProgressStep>

                                <ProgressStep
                                    onSubmit={handleSubmit}
                                    disabled={!isValid}
                                >

                                    <FishCatchContainer childToParent={childToParent2} />

                                </ProgressStep>

                            </ProgressSteps>
                        </View >
                    </View >

                </View >
            )
            }
        </ Formik >
    )
};
export default catchDetail;


const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333C8D'

    },
    header: {
        flex: 0.8,
        justifyContent: 'flex-end',
        //paddingHorizontal: 10,
        paddingBottom: 20,

    },
    footer: {
        flex: 5,
        backgroundColor: '#fff',
        borderBottomRightRadius: 100,
        paddingHorizontal: 20,

    },

    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#333C8D',
        borderBottomWidth: 0.5,
        borderBottomColor: '#333C8D',
        fontSize: 18,
        flexDirection: 'row-reverse',
        //borderWidth: 5,
        maxWidth: 250,
        paddingRight: 10
    },

    txt: {
        fontSize: 16,
        padding: 15,
        paddingLeft: 5,
        color: '#333C8D',
        //marginEnd: 50,
        minWidth: 160
    },

    picker: {
        backgroundColor: '#333C8D',
        textAlign: 'center',
    },

    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#333C8D',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5


    },
    headTitle1: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',

    },

    headTitle2: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        flexDirection: "column-reverse",
        marginTop: 10,
        backgroundColor: '#333C8D',
        padding: 10,
        width: 120,
        borderRadius: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        marginRight: 10


    }, textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    },

    rowContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },


    checkBox: {
        marginEnd: 10,
        flex: 1,
        flexDirection: 'row',
    },
    label: {
        marginTop: 8.5,
        color: '#333C8D',
        marginRight: 5,
        marginEnd: 4
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop: 30,
    },

    inputContainer: {
        //flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    buttonText: {

        textAlign: 'center',
        fontSize: 15,
        color: '#fff'

    },
    logo: {
        width: height_logo,
        height: height_logo,
        borderColor: '#333C8D',
        borderWidth: 1

    },

    signature: {

        height: 250,
        width: 350

    },
    errorText: {
        fontSize: 12,
        color: 'red',
        textAlign: 'right'
    },

    pickerStyle: {
        marginRight: 15,
        height: 10,
        width: "60%",
        color: '#333C8D',
        fontWeight: 'bold',
        backgroundColor: '#EEECEB',

    },


});