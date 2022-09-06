import React from 'react';
import { useEffect, useState, createContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useNetInfo } from "@react-native-community/netinfo";
import Task from '../../components/Task';
import { useToast } from "react-native-toast-notifications";
import triplogService from '../../service/triplog.service';
import catchService from '../../service/catch.service';

function createTrip({ navigation }) {

    const [logRecord, setRecord] = useState([]);
    const [items, setItem] = useState([null]);
    const [show, setShow] = useState(false);
    const isFocused = useIsFocused();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const toast = useToast();


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            async function fetchMyAPIItem() {

                try {
                    const savedItem = await AsyncStorage.getItem('Itemlocal')
                    const currentItem = JSON.parse(savedItem)
                    console.log(currentItem[0])
                    setItem(currentItem.item)
                } catch (error) {

                }


            }
            fetchMyAPIItem()

            async function fetchMyAPI() {
                const savedData = await AsyncStorage.getItem('Elog')
                const currentData = JSON.parse(savedData)
                console.log(currentData)
                setRecord(currentData)
            }

            fetchMyAPI()

            const loadData = async () => {

                try {
                    const savedTripData = await AsyncStorage.getItem('Tripdata')
                    const currentTripData = JSON.parse(savedTripData)
                    console.log(currentTripData.Tripdata)
                    setShow(currentTripData.Tripdata);

                } catch (error) {
                    console.log(error)
                }

            };

            // then call it here
            loadData();
            // The screen is focused
            // Call any action
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);




    const claerData = async () => {

        try {
            await AsyncStorage.removeItem('Elog')
            await AsyncStorage.removeItem('Itemlocal')

        } catch (e) {
            console.log(e);
        }


        const val = {
            Tripdata: false
        }
        storeTripData(val);
        setShow(false);

        console.log("claered");

    }



    useEffect(() => {
        async function fetchMyAPIItem() {

            try {
                const savedItem = await AsyncStorage.getItem('Itemlocal')
                const currentItem = JSON.parse(savedItem)
                console.log(currentItem[0])
                setItem(currentItem.item)
            } catch (error) {

            }


        }

        fetchMyAPIItem()
    }, [])
    useEffect(() => {
        async function fetchMyAPI() {
            const savedData = await AsyncStorage.getItem('Elog')
            const currentData = JSON.parse(savedData)
            console.log(currentData)
            setRecord(currentData)
        }

        fetchMyAPI()
    }, [])

    useEffect(() => {

        const loadData = async () => {
            const savedTripData = await AsyncStorage.getItem('Tripdata')
            const currentTripData = JSON.parse(savedTripData)
            console.log(currentTripData.Tripdata)
            setShow(currentTripData.Tripdata);
        };

        // then call it here
        loadData();
    }, [])
    console.log("in");
    console.log(show);
    console.log(logRecord);
    console.log(items);
    console.log("out");




    const netInfo = useNetInfo();

    const onsubmithanddle = () => {
        console.log("submit in");
        console.log(show);
        console.log(logRecord);
        console.log(items);
        console.log("submit out");


        if (netInfo.isConnected) {

            triplogService
                .createTripLog({
                    WesselID: logRecord.WesselID,
                    SkipperID: logRecord.SkipperID,
                    Harbor: logRecord.Harbor,
                    DepartureDate: logRecord.DepartureDate,
                    DepartureTime: logRecord.DepartureTime,
                    GearType: logRecord.GearType,
                    MainLine: logRecord.MainLine,
                    BranchLine: logRecord.BranchLine,
                    HookNo: logRecord.HookNo,
                    HookTypes: logRecord.HookTypes,
                    Depth: logRecord.Depth,
                    Bait: logRecord.Bait,

                }).then(res => {

                    console.log(res);


                    console.log(res.data.tripId);




                    items.forEach((value, index) => {
                        const list = {
                            tripId: res.data.tripId,
                            FishingDate: value.FishingDate,
                            FishingTime: value.FishingTime,
                            GPSPoint: {
                                start: {
                                    long: value.GPSPoint.long1,
                                    lat: value.GPSPoint.lat1
                                },
                                end: {
                                    long: value.GPSPoint.long2,
                                    lat: value.GPSPoint.lat2
                                }
                            },
                            Catch: value.Catch
                        }
                        console.log(list)
                        catchService.createCatch(list).then(res => {
                            console.log(res.data);
                            toast.show("submitted !!", {
                                type: "success",
                                placement: "bottom",
                                duration: 4000,
                                offset: 30,
                                animationType: "slide-in",
                            });
                            //claerData();
                        }).catch(err => {
                            console.log(err.response);
                            console.log(err.request);
                            console.log(err.message);
                        })
                    })




                }).catch(err => {
                    console.log(err.response);
                    console.log(err.request);
                    console.log(err.message);
                    toast.show(err.message, {
                        type: "warning",
                        placement: "bottom",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in",
                    });
                });


        } else {
            toast.show("no network. try again later !!", {
                type: "warning",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
        }

    }






    const storeTripData = async (value) => {
        try {

            const jsonValue = await JSON.stringify(log)
            await AsyncStorage.setItem('Tripdata', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.header}>
                <Text style={styles.headTitle1}>Create Trip</Text>


            </View>
            <View style={styles.footer}>
                <View style={styles.scrollContainer}>
                    <ScrollView style={styles.scroll}>

                        <View style={styles.rowContainer}>



                            {show == true ?
                                <TouchableOpacity

                                    onPress={() =>


                                        navigation.navigate({
                                            name: 'catchDetail',
                                            params: { logRecord: logRecord },

                                        })
                                    }
                                    style={styles.tripbutton}>

                                    <Text style={styles.btnText}>Enter a Catch</Text>
                                    {/* {logRecord.DepartureDate} */}

                                </TouchableOpacity>
                                :

                                <TouchableOpacity

                                    onPress={() => navigation.navigate('E-logBook')}
                                    style={styles.catchbutton}>

                                    <Text style={styles.btnText}>Create Trip</Text>
                                </TouchableOpacity>


                            }


                        </View>


                        {/* {
                            items.map((items, index) => {
                                return (
                                    <TouchableOpacity key={index} >
                                        <Task text1={items.FishingDate} text2={items.FishingTime} />
                                    </TouchableOpacity>

                                )
                            })
                        } */}

                        <View style={styles.rowContainer}>

                            {/* <TouchableOpacity

                                onPress={() =>


                                    navigation.navigate({
                                        name: 'catchDetail',
                                        params: { logRecord: logRecord },

                                    })
                                }
                                style={styles.button}>

                                <Text style={styles.btnText}>Trip Log : </Text>

                            </TouchableOpacity> */}





                        </View>








                    </ScrollView>
                </View>
                <View style={styles.list}>

                    <View style={styles.rowContainer}>
                        <View style={styles.clearbtn}>

                            <TouchableOpacity

                                onPress={claerData}
                                style={styles.button}>

                                <Text style={styles.btnText}>Clear</Text>
                            </TouchableOpacity>




                        </View>
                        <View style={styles.updatebtn}>

                            <TouchableOpacity

                                onPress={onsubmithanddle}
                                style={styles.button}>

                                <Text style={styles.btnText}>Upload</Text>
                            </TouchableOpacity>




                        </View>
                    </View>

                </View>



            </View >

        </View >
    );
}

export default createTrip;

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
        fontSize: 25,
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
        flex: 0.9,
        borderColor: '#333C8D',
        borderWidth: 2,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: '#333C8D',
    },

    btnText: {
        color: '#fff',
        fontSize: 25,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    clearbtn: {

        flex: 0.5,
        //borderColor: '#333C8D',
        borderWidth: 2,
        borderRadius: 20,
        width: '90%',
        height: '80%',
        fontWeight: 'bold',
        //fontSize: 20,
        backgroundColor: '#fff',
        marginBottom: 50,

    },
    updatebtn: {

        flex: 0.5,
        borderColor: '#333C8D',
        borderWidth: 2,
        borderRadius: 20,
        width: '90%',
        height: '80%',
        fontWeight: 'bold',
        //fontSize: 20,
        backgroundColor: '#fff',
        marginBottom: 50,

    },
    tripbutton: {

        flex: 0.9,
        borderColor: '#333C8D',
        borderWidth: 2,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: '#5661c2',
    },
    catchbutton: {

        flex: 0.9,
        borderColor: '#333C8D',
        borderWidth: 2,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: '#009999',
    },
    scrollContainer: {
        flex: 4,
    }


});


 // useEffect(async () => {
    //     try {
    //         const savedData = await AsyncStorage.getItem('Elog')
    //         const currentData = JSON.parse(savedData)
    //         setRecord(currentData)

    //         if (currentData != null) {
    //             console.log("currentData");
    //             console.log(currentData);
    //             ;
    //             setShow(true);
    //         } else {
    //             setShow(false);
    //         }



    //     } catch (error) {
    //         console.log(error);
    //     }

    //     return () => {
    //         console.log('This will be logged on unmount');
    //     };

    // }, []);


    // useEffect(async () => {
    //     try {
    //         const savedTripData = await AsyncStorage.getItem('Tripdata');
    //         const currentTripData = JSON.parse(savedTripData);

    //         if (currentTripData != null) {
    //             setShow(currentTripData.Tripdata);

    //         } else {
    //             setShow(false);
    //         }



    //     } catch (error) {
    //         console.log(error);
    //     }

    //     return () => {
    //         console.log('This will be logged on unmount');
    //     };

    // }, []);




    // useEffect(async () => {
    //     try {
    //         const savedItem = await AsyncStorage.getItem('Itemlocal');
    //         const currentItem = JSON.parse(savedItem);
    //         console.log("item data")
    //         console.log(currentItem.item[0]);
    //         setItem(savedItem.item);

    //         if (currentItem != null) {

    //             console.log(items);

    //         } else {

    //             console.log("item null")

    //         }



    //     } catch (error) {
    //         console.log(error);
    //     }

    //     return () => {
    //         console.log('This will be logged on unmount');
    //     };

    // }, []);