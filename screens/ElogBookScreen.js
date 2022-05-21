import React, { useState, useEffect } from "react";
import {Platform, LogBox, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Button, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TaskContainer from '../components/TaskContainer';
import FishCatchContainer from '../components/FIshCatchContainer';


const ElogBookValidationSchema = yup.object().shape({
    WesselID: yup
        .string()
        .required('*This is a required field'),
    SkipperID: yup
        .string()
        .required('*This is a required field'),
    DepartureDate: yup
        .date()
        .required('*This is a required'),
    DepartureTime: yup
        .string()
        .required('*This is a required field'),
    MainLine: yup
        .number()
        .required('*This is a required field'),
    BranchLine: yup
        .number()
        .required('*This is a required field'),
    HookNo: yup
        .number()
        .required('*This is a required field'),
    Depth: yup
        .number()
        .required('*This is a required field'),
    FishingDate: yup
        .string()
        .required('*This is a required field'),
    FishingTime: yup
        .string()
        .required('*This is a required field'),

   
});




function ElogBook() {

    const progressStepsStyle = {
        activeStepIconBorderColor: '#333C8D',
        activeLabelColor: '#333C8D',
        activeStepNumColor: '#333C8D',
        completedStepIconColor: '#333C8D',
        completedProgressBarColor: '#333C8D',
        completedCheckColor: 'white',
        marginBottom: 35,


    };



   

   

    //-----------------------------
    //Dynamiccaly Adding input fields 
   

    const [inputs, setInputs] = useState([{ key: '', value: '' }]);


    const addHandler = () => {
        const _inputs = [...inputs];
        _inputs.push({ key: '', value: '' });
        setInputs(_inputs);
    }
    const deleteHandler = (key) => {
        const _inputs = inputs.filter((input, index) => index != key);
        setInputs(_inputs);
    }

    //dependant details
    const [inputs1, setInputs1] = useState([{ key1: '', value1: '' }]);

    const addHandler1 = () => {
        const _inputs1 = [...inputs1];
        _inputs1.push({ key1: '', value1: '' });
        setInputs1(_inputs1);
    }

    const deleteHandler1 = (key1) => {
        const _inputs1 = inputs1.filter((input1, index1) => index1 != key1);
        setInputs1(_inputs1);

    }
    //-----------------------------
    //date picker
    const [date, setDate] = useState(new Date());
    
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');


    

    

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();



        setText1(fDate);
        setText2(fTime);
        setText3(fDate);
        setText4(fTime);
        console.log(fDate)

    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
      };


    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    return (

        <Formik
            validationSchema={ElogBookValidationSchema}

            initialValues={{
                
                WesselID:'',
                SkipperID:'',
                Harbor:'',
                DepartureDate:'',
                DepartureTime:'',
                GearType:'',
                MainLine:'',
                BranchLine:'',
                HookTypes:'',
                Depth:'',
                Bait:'',
                FishingDate:'',
                FishingTime:'',
                HookNo:'',

            }}

            onSubmit={values => console.log(values)}

        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, }) => (

                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headTitle1}>E-Log Book</Text>


                    </View>
                    <View style={styles.footer}>

                        <View style={{ flex: 1 }}>


                            <ProgressSteps {...progressStepsStyle}>

                                <ProgressStep>
                                    <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>
                                        <Text style={styles.text_footer}>Departure Details</Text>


                                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                                            
                                            <Text style={styles.txt}>Wessel ID</Text>
                  

                                            <TextInput
                                              style={styles.textInput}
                                              onChangeText={handleChange('WesselID')}
                                              onBlur={handleBlur('WesselID')}
                                              value={values.WesselID}
                                            />
                                        </View>

                                        {errors.WesselID && touched.WesselID ? (
                                            <Text style={styles.errorText}>{errors.WesselID}</Text>
                                        ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                          <Text style={styles.txt}>Skipper ID</Text>
                  

                                          <TextInput
                                            style={styles.textInput}
                                            onChangeText={handleChange('SkipperID')}
                                            onBlur={handleBlur('SkipperID')}
                                            value={values.SkipperID}
                                          />

                                        </View>
                                        {errors.SkipperID && touched.SkipperID ? (
                                            <Text style={styles.errorText}>{errors.SkipperID}</Text>
                                        ) : null}

                                    

                                        <View style={{ alignItems: 'center', flexDirection: 'row' ,marginTop:5}}>
                                          <Text style={styles.txt}>Departure Harbor</Text>
                  

                                          <Picker
                                              mode='dropdown'
                                              style={styles.pickerStyle}
                                              selectedValue={values.Harbor}
                                              onValueChange={handleChange('Harbor')}
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
                                        


                                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                                            
                                        <Text style={styles.txt}>Departure Date</Text>
                                            <TouchableOpacity onPress={showDatepicker}>
                                                <Icon 
                                                name="calendar" 
                                                size={30} 
                                                color="#333C8D"
                                                />
                                            </TouchableOpacity>
                  

                                        

                                                    {show && (
                                                        <DateTimePicker


                                                            testID="dateTimePicker1"
                                                            value={date}
                                                            mode={mode}
                                                            is24Hour={true}
                                                            display="default"
                                                            onChange={onChange}
                                                        />

                                                    )}

                                                    <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{text1}</Text>
                                                    < TouchableOpacity onPress={() => deleteHandler(key)}>
                                                    <Text style={{ color: "#333C8D", fontSize: 15, paddingRight: 10 }}>{'\n'}Remove</Text>
                                                    </TouchableOpacity>

                                            
                                        </View>
                                                    {errors.DepartureDate && touched.DepartureDate ? (
                                                        <Text style={styles.errorText}>{errors.DepartureDate}</Text>
                                                    ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                                            
                                            <Text style={styles.txt}>Departure Time</Text>

                                            <TouchableOpacity onPress={showTimepicker}>
                                                <Icon 
                                                name="clock" 
                                                size={30} 
                                                color="#333C8D"
                                                />
                                            </TouchableOpacity>
                  
                                            {show && (
                                                <DateTimePicker


                                                    testID="dateTimePicker2"
                                                    value={date}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={onChange}
                                                    />
                                                    )}

                                                    <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{text2}</Text>
                                                    < TouchableOpacity onPress={() => deleteHandler(key)}>
                                                    <Text style={{ color: "#333C8D", fontSize: 15, paddingRight: 10 }}>{'\n'}Remove</Text>
                                                    </TouchableOpacity>

                                            
                                                    </View>
                                                    {errors.DepartureTime && touched.DepartureTime ? (
                                                        <Text style={styles.errorText}>{errors.DepartureTime}</Text>
                                                    ) : null}
                                    </View>



                                    
                                </ProgressStep>


                                <ProgressStep>
                                    <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>
                                        <Text style={styles.text_footer}>Gear Details</Text>              
                                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                                            <Text style={styles.txt}>Gear Type</Text>


                                            

                                            <Picker
                                              mode='dropdown'
                                              style={styles.pickerStyle}
                                              selectedValue={values.GearType}
                                              onValueChange={handleChange('GearType')}
                                              >
                                              <Picker.Item label="Longline" value="Longline" />
                                              <Picker.Item label="Gillnet" value="Gillnet" />
                                              <Picker.Item label="Ring Net" value="RingNet" />
                                              

                                            </Picker> 




                                        </View>



                                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                                            <Text style={styles.txt}>Main Line</Text>

                                            <TextInput
                                              style={styles.textInput}
                                              onChangeText={handleChange('MainLine')}
                                              onBlur={handleBlur('MainLine')}
                                              value={values.MainLine}
                                            />


                                        </View>
                                        {errors.MainLine && touched.MainLine ? (
                                            <Text style={styles.errorText}>{errors.MainLine}</Text>
                                        ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                                            
                                          <Text style={styles.txt}>Branch Line</Text>


                                            <TextInput
                                              style={styles.textInput}
                                              onChangeText={handleChange('BranchLine')}
                                              onBlur={handleBlur('BranchLine')}
                                              value={values.BranchLine}
                                            />

                                        </View>

                                        {errors.BranchLine && touched.BranchLine ? (
                                            <Text style={styles.errorText}>{errors.BranchLine}</Text>
                                        ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:5}}>
                                            <Text style={styles.txt}>No of Hooks</Text>


                                            <TextInput
                                              style={styles.textInput}
                                              onChangeText={handleChange('HookNo')}
                                              onBlur={handleBlur('HookNo')}
                                              value={values.HookNo}
                                            />
                                          

                                        </View>

                                        {errors.HookNo && touched.HookNo ? (
                                            <Text style={styles.errorText}>{errors.HookNo}</Text>
                                        ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                                            <Text style={styles.txt}>Hook Types</Text>


                                            

                                            <Picker
                                              mode='dropdown'
                                              style={styles.pickerStyle}
                                              selectedValue={values.HookTypes}
                                              onValueChange={handleChange('HookTypes')}
                                              >
                                              <Picker.Item label="17" value="17" />
                                              <Picker.Item label="26" value="26" />
                                              <Picker.Item label="36" value="36" />
                                              <Picker.Item label="83" value="83" />
                                              
                                              

                                            </Picker> 
                                        </View>
                                        

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:5}}>
                                            <Text style={styles.txt}>Depth(m)</Text>


                                            <TextInput
                                              style={styles.textInput}
                                              onChangeText={handleChange('Depth')}
                                              onBlur={handleBlur('Depth')}
                                              value={values.Depth}
                                            />
                                          

                                        </View>

                                        {errors.Depth && touched.Depth ? (
                                            <Text style={styles.errorText}>{errors.Depth}</Text>
                                        ) : null}


                                        <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:5}}>
                                              <Text style={styles.txt}>Bait</Text>


                                              
                                              <Picker
                                              mode='dropdown'
                                              style={styles.pickerStyle}
                                              selectedValue={values.Bait}
                                              onValueChange={handleChange('Bait')}
                                              >
                                              <Picker.Item label="Squid" value="Squid" />
                                              <Picker.Item label="Flying Fish" value="Flying Fish" />
                                              <Picker.Item label="Milk Fish" value="Milk Fish" />
                                              <Picker.Item label="Other" value="Other" />
                                              
                                              

                                            </Picker> 

                                        </View>

                                       

                                    </View>
                                </ProgressStep>






                                <ProgressStep>
                                    <View style={{ borderWidth: 1, borderColor: '#333C8D', borderRadius: 10, padding: 5, marginBottom: 10 }}>
                                        <Text style={styles.text_footer}>Fishing Details</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' ,marginTop:5}}>
                                            <Text style={styles.txt}>Fishing Date</Text>
                                            <TouchableOpacity onPress={showDatepicker}>
                                                <Icon 
                                                name="calendar" 
                                                size={30} 
                                                color="#333C8D"
                                                />
                                            </TouchableOpacity>
                  

                                        

                                                    {show && (
                                                        <DateTimePicker


                                                            testID="dateTimePicker1"
                                                            value={date}
                                                            mode={mode}
                                                            is24Hour={true}
                                                            display="default"
                                                            onChange={onChange}
                                                        />

                                                    )}

                                                    <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{text3}</Text>
                                                    < TouchableOpacity onPress={() => deleteHandler(key)}>
                                                    <Text style={{ color: "#333C8D", fontSize: 15, paddingRight: 10 }}>{'\n'}Remove</Text>
                                                    </TouchableOpacity>

                                        </View>

                                        {errors.FishingDate && touched.FishingDate ? (
                                            <Text style={styles.errorText}>{errors.FishingDate}</Text>
                                        ) : null}

                                        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5 }}>
                                            <Text style={styles.txt}>Departure Time</Text>

                                            <TouchableOpacity onPress={showTimepicker}>
                                                <Icon 
                                                name="clock" 
                                                size={30} 
                                                color="#333C8D"
                                                />
                                            </TouchableOpacity>

                                            {show && (
                                                <DateTimePicker


                                                    testID="dateTimePicker1"
                                                    value={date}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={onChange}
                                                    />
                                                    )}

                                                    <Text style={{ fontSize: 18, margin: 20, color: '#333C8D' }}>{text4}</Text>
                                                    < TouchableOpacity onPress={() => deleteHandler(key)}>
                                                    <Text style={{ color: "#333C8D", fontSize: 15, paddingRight: 10 }}>{'\n'}Remove</Text>
                                                    </TouchableOpacity>

                                        </View>
                                        {errors.FishingTime && touched.FishingTime ? (
                                            <Text style={styles.errorText}>{errors.FishingTime}</Text>
                                        ) : null}
                                        

                                        <View >
                                        
                                          <TaskContainer />

                                        </View>



                                    </View>
                                    
                                </ProgressStep>

                                <ProgressStep>

                                    <FishCatchContainer />
                                </ProgressStep>

                            </ProgressSteps>
                        </View >
                    </View >

                </View >
            )
            }
        </Formik >
    )
};
export default ElogBook;


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
        marginTop: Platform.OS === 'android' ? 0 : -12,
        color: '#333C8D',
        borderWidth:1,
        borderColor: '#333C8D',
        borderRadius:10,
        fontSize: 18,
        flexDirection: 'row-reverse',
        //borderWidth: 5,
        maxWidth: 250,
        paddingRight: 10,
        height:40,
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
        marginBottom: 20


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
    pickerStyle:{ 
      marginRight:15,
      height:10,
      width: "60%",  
      color: '#333C8D',
      fontWeight:'bold',
      backgroundColor:'#EEECEB',
        
  }  ,


});