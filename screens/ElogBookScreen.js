
import React, { useState, useEffect, Component, useRef, createRef, useContext } from "react";
import { TouchableHighlight, Image, Platform, LogBox, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Button, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Checkbox, RadioButton, RadioButtonGroup } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from "react-native-image-picker";
import { Formik, Field, Form, ErrorMessage, formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import { useNetInfo } from "@react-native-community/netinfo";
// import CoodinateContainer from "../components/CoodinateContainer";
// import FishCatchContainer from "../components/FIshCatchContainer";

import triplogService from "../service/triplog.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import { LogContext } from "../service/log.context";


const fishermanregValidationSchema = yup.object().shape({
    wesselId: yup
        .string()
        .required('*This is a required field'),
    skipperId: yup
        .string()
        .required('*This is a required field'),
    depharbor: yup
        .string()
        .required('*This is a required field'),
    depDate: yup
        .string()
        .required('*This is a required field'),
    depTime: yup
        .string()
        .required('*This is a required field'),
    gearType: yup
        .string()
        .required('*This is a required field'),
    mainLine: yup
        .string()
        .required('*This is a required field'),
    branchLine: yup
        .number()
        .required('*This is a required field'),
    hookNo: yup
        .string()
        .required('*This is a required field'),
    hookType: yup
        .string()
        .required('*This is a required field'),


    depth: yup
        .string()
        .required('*This is a required field'),

    bait: yup
        .string()
        .required('*This is a required field'),




});




function FishermanRegistration({ navigation }) {

    const netInfo = useNetInfo();
    console.log(netInfo.isConnected);

    const toast = useToast();
    // const logrecord = useContext(LogContext)
    // console.log(logrecord)


    const storeData = async (log) => {
        console.log(log)
        try {
            const jsonValue = await JSON.stringify(log)
            //console.log("Set:" + jsonValue);
            await AsyncStorage.setItem('Elog', jsonValue)
        } catch (e) {
            console.log(e);
        }

        // try {
        //     await AsyncStorage.setItem('Elog', JSON.stringify(log));
        // } catch (error) {
        //     console.log(e);
        // }

    }


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('Elog')
            //console.log("get:" + jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;

        } catch (e) {
            console.log(e);
        }

        // try {
        //     const myArray = await AsyncStorage.getItem('Elog');
        //     if (myArray !== null) {
        //         setRecord(JSON.parse(myArray));
        //     }
        // } catch (error) {
        //     console.log(e);
        // }
    };

    const progressStepsStyle = {
        activeStepIconBorderColor: '#333C8D',
        activeLabelColor: '#333C8D',
        activeStepNumColor: '#333C8D',
        completedStepIconColor: '#333C8D',
        completedProgressBarColor: '#333C8D',
        completedCheckColor: 'white',
        marginBottom: 35,


    };

    const [datePicker, setDatePicker] = useState(false);

    const [date, setDate] = useState(new Date());

    const [timePicker, setTimePicker] = useState(false);

    const [time, setTime] = useState(new Date(Date.now()));
    function showDatePicker() {
        setDatePicker(true);
    };

    function showTimePicker() {
        setTimePicker(true);
    };

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };

    function onTimeSelected(event, value) {
        setTime(value);
        setTimePicker(false);
    };




    const [coods, setCoods] = useState([]);
    const [fishList, setFish] = useState([]);

    const childToParent1 = (childdata) => {
        setCoods(childdata);

    }

    const childToParent2 = (childdata) => {
        setFish(childdata);

    }



    const [logRecord, setRecord] = useState([]);

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        getData().then((value) => {
            //console.log("elog val: " + value);
            setRecord(value);
        });
    }, [])

    const storeTripData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('Tripdata', jsonValue)

        } catch (e) {
            // saving error
        }
    }

    const val = {
        Tripdata: true
    }



    return (

        <Formik
            //validationSchema={fishermanregValidationSchema}

            initialValues={{
                wesselId: '',
                skipperId: '',
                depharbor: 'Panadura',
                depDate: date,
                depTime: time,
                gearType: 'Longline',
                mainLine: '',
                branchLine: '',
                hookNo: '',
                hookType: '17',
                depth: '',
                bait: 'Squid',




            }}


            onSubmit={values => {




                //console.log(values);
                //console.log("Submitted");




                const triplog = {
                    boatBoatId: 1,
                    WesselID: values.wesselId,
                    SkipperID: values.skipperId,
                    Harbor: values.depharbor,
                    DepartureDate: values.depDate,
                    DepartureTime: values.depTime,
                    GearType: values.gearType,
                    MainLine: values.mainLine,
                    BranchLine: values.branchLine,
                    HookNo: values.hookNo,
                    HookTypes: values.hookType,
                    Depth: values.depth,
                    Bait: values.bait,
                    CatchRecords: {
                        FishingDate: null,
                        FishingTime: null,
                        GPSPoint: {
                            long1: null,
                            lat1: null,
                            long2: null,
                            lat2: null
                        },
                        Catch: null

                    },

                }

                storeData(triplog);
                storeTripData(val);

                //console.log(triplog);
                navigation.goBack();


            }}

        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, }) => (

                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headTitle1}>E log Book</Text>


                    </View>
                    <View style={styles.footer}>

                        <View style={{ flex: 1 }}>


                            <ProgressSteps {...progressStepsStyle}>

                                <ProgressStep>

                                    <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>
                                        <Text style={styles.text_footer}>Departure Details</Text>


                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Wessel ID</Text>
                                            <TextInput style={styles.textInput}
                                                onChangeText={handleChange('wesselId')}
                                                onBlur={handleBlur('wesselId')}
                                                value={values.wesselId}
                                            />
                                        </View>

                                        {errors.wesselId && touched.wesselId ? (
                                            <Text style={styles.errorText}>{errors.wesselId}</Text>
                                        ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Skipper ID</Text>
                                            <TextInput style={styles.textInput}
                                                onChangeText={handleChange('skipperId')}
                                                onBlur={handleBlur('skipperId')}
                                                value={values.skipperId}
                                            />

                                        </View>
                                        {errors.skipperId && touched.skipperId ? (
                                            <Text style={styles.errorText}>{errors.skipperId}</Text>
                                        ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Departure Harbor</Text>


                                            <Picker
                                                mode='dropdown'
                                                style={styles.pickerStyle}
                                                selectedValue={values.depharbor}
                                                onValueChange={handleChange('depharbor')}
                                            >
                                                <Picker.Item label="Panadura" value="Panadura" />
                                                <Picker.Item label="Beruwala" value="Beruwala" />
                                                <Picker.Item label="Hikkaduwa" value="Hikkaduwa" />
                                                <Picker.Item label="Ambalangoda" value="Ambalangoda" />
                                                <Picker.Item label="Dodanduwa" value="Dodanduwa" />
                                                <Picker.Item label="Galle" value="Galle" />
                                                <Picker.Item label="Mirissa" value="Mirissa" />
                                                <Picker.Item label="Puranawella" value="Puranawella" />
                                                <Picker.Item label="Nilwella" value="Nilwella" />
                                                <Picker.Item label="Kudawella" value="Kudawella" />
                                                <Picker.Item label="Tangalle" value="Tangalle" />
                                                <Picker.Item label="Hambanthota" value="Hambanthota" />
                                                <Picker.Item label="Kirinda" value="Kirinda" />
                                                <Picker.Item label="Valachchanai" value="Valachchanai" />
                                                <Picker.Item label="Cod-Bay" value="Cod-Bay" />
                                                <Picker.Item label="Kalpitiya" value="Kalpitiya" />
                                                <Picker.Item label="Chilaw" value="Chilaw" />
                                                <Picker.Item label="Negombo" value="Negombo" />
                                                <Picker.Item label="Dikkovita" value="Dikkovita" />

                                            </Picker>
                                        </View>
                                        {errors.depharbor && touched.depharbor ? (
                                            <Text style={styles.errorText}>{errors.depharbor}</Text>
                                        ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Departure Date</Text>



                                            {!datePicker && (

                                                <TouchableOpacity onPress={showDatePicker}>
                                                    <Icon
                                                        name="calendar"
                                                        size={30}
                                                        color="#333C8D"
                                                    />
                                                </TouchableOpacity>
                                            )}




                                            {datePicker && (
                                                <DateTimePicker
                                                    value={date}
                                                    mode={'date'}
                                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                    is24Hour={true}
                                                    onChange={onDateSelected}
                                                //style={styleSheet.datePicker}
                                                />
                                            )}

                                            <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{date.toLocaleDateString()}</Text>


                                        </View>
                                        {errors.depDate && touched.depDate ? (
                                            <Text style={styles.errorText}>{errors.depDate}</Text>
                                        ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Departure Time</Text>
                                            {/* <TextInput style={styles.textInput}
                                                onChangeText={handleChange('depTime')}
                                                onBlur={handleBlur('depTime')}
                                                value={values.depTime}
                                            /> */}
                                            {!timePicker && (

                                                <TouchableOpacity onPress={showTimePicker}>
                                                    <Icon
                                                        name="clock"
                                                        size={30}
                                                        color="#333C8D"
                                                    />
                                                </TouchableOpacity>
                                            )}

                                            {timePicker && (
                                                <DateTimePicker
                                                    value={time}
                                                    mode={'time'}
                                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                                    is24Hour={false}
                                                    onChange={onTimeSelected}
                                                //style={styleSheet.datePicker}
                                                />
                                            )}

                                            <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{time.toLocaleTimeString('en-US')}</Text>
                                        </View>
                                        {errors.depTime && touched.depTime ? (
                                            <Text style={styles.errorText}>{errors.depTime}</Text>
                                        ) : null}
                                    </View>




                                </ProgressStep>


                                <ProgressStep
                                    onSubmit={handleSubmit}
                                    disabled={!isValid}
                                >


                                    <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>
                                        <Text style={styles.text_footer}>Gear Details</Text>



                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Gear Type</Text>

                                            <Picker
                                                mode='dropdown'
                                                style={styles.pickerStyle}
                                                selectedValue={values.gearType}
                                                onValueChange={handleChange('gearType')}
                                            >
                                                <Picker.Item label="Longline" value="Longline" />
                                                <Picker.Item label="Gillnet" value="Gillnet" />
                                                <Picker.Item label="Ring Net" value="RingNet" />


                                            </Picker>
                                        </View>
                                        {errors.gearType && touched.gearType ? (
                                            <Text style={styles.errorText}>{errors.gearType}</Text>
                                        ) : null}


                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Main Line</Text>
                                            <TextInput style={styles.textInput}
                                                onChangeText={handleChange('mainLine')}
                                                onBlur={handleBlur('mainLine')}
                                                value={values.mainLine}
                                                keyboardType={'numeric'}
                                            />
                                        </View>
                                        {errors.mainLine && touched.mainLine ? (
                                            <Text style={styles.errorText}>{errors.mainLine}</Text>
                                        ) : null}


                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Branch Line</Text>
                                            <TextInput style={styles.textInput}
                                                onChangeText={handleChange('branchLine')}
                                                onBlur={handleBlur('branchLine')}
                                                value={values.branchLine}
                                                keyboardType={'numeric'}
                                            />
                                        </View>
                                        {errors.branchLine && touched.branchLine ? (
                                            <Text style={styles.errorText}>{errors.branchLine}</Text>
                                        ) : null}


                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>No of Hooks</Text>
                                            <TextInput style={styles.textInput}
                                                onChangeText={handleChange('hookNo')}
                                                onBlur={handleBlur('hookNo')}
                                                value={values.hookNo}
                                                keyboardType={'numeric'}
                                            />
                                        </View>
                                        {errors.hookNo && touched.hookNo ? (
                                            <Text style={styles.errorText}>{errors.hookNo}</Text>
                                        ) : null}


                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Hook Type</Text>

                                            <Picker
                                                mode='dropdown'
                                                style={styles.pickerStyle}
                                                selectedValue={values.hookType}
                                                onValueChange={handleChange('hookType')}
                                            >
                                                <Picker.Item label="17" value="17" />
                                                <Picker.Item label="26" value="26" />
                                                <Picker.Item label="36" value="36" />
                                                <Picker.Item label="83" value="83" />



                                            </Picker>
                                        </View>
                                        {errors.hookType && touched.hookType ? (
                                            <Text style={styles.errorText}>{errors.hookType}</Text>
                                        ) : null}


                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Depth</Text>
                                            <TextInput style={styles.textInput}
                                                onChangeText={handleChange('depth')}
                                                onBlur={handleBlur('depth')}
                                                value={values.depth}
                                                keyboardType={'numeric'}
                                            />
                                        </View>
                                        {errors.depth && touched.depth ? (
                                            <Text style={styles.errorText}>{errors.depth}</Text>
                                        ) : null}


                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={styles.txt}>Bait</Text>



                                            <Picker
                                                mode='dropdown'
                                                style={styles.pickerStyle}
                                                selectedValue={values.bait}
                                                onValueChange={handleChange('bait')}
                                            >
                                                <Picker.Item label="Squid" value="Squid" />
                                                <Picker.Item label="Flying Fish" value="Flying Fish" />
                                                <Picker.Item label="Milk Fish" value="Milk Fish" />
                                                <Picker.Item label="Other" value="Other" />



                                            </Picker>
                                        </View>
                                        {errors.bait && touched.bait ? (
                                            <Text style={styles.errorText}>{errors.bait}</Text>
                                        ) : null}


                                    </View>




                                </ProgressStep>


                                {/* <ProgressStep>

                                    <CoodinateContainer childToParent={childToParent1} />

                                </ProgressStep>

                                <ProgressStep
                                    onSubmit={handleSubmit}
                                    disabled={!isValid}
                                >

                                    <FishCatchContainer childToParent={childToParent2} />

                                </ProgressStep> */}

                            </ProgressSteps>
                        </View >
                    </View >

                </View >
            )
            }
        </Formik >
    )
};
export default FishermanRegistration;


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