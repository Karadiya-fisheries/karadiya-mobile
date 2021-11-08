
import React, { useState, useEffect, Component, useRef, createRef } from "react";
import { TouchableHighlight, Image, Platform, LogBox, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Button, SafeAreaView, ScrollView } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Checkbox, RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "react-native-image-picker";
import SignatureCapture from 'react-native-signature-capture';









function NavScreen() {

    const progressStepsStyle = {
        activeStepIconBorderColor: '#333C8D',
        activeLabelColor: '#333C8D',
        activeStepNumColor: '#333C8D',
        completedStepIconColor: '#333C8D',
        completedProgressBarColor: '#333C8D',
        completedCheckColor: 'white',
        marginBottom: 35,

    };



    //---------------------------------------------
    const sign = createRef();

    const saveSign = () => {
        sign.current.saveImage();
    };

    const resetSign = () => {
        sign.current.resetImage();
    };

    const _onSaveEvent = (result) => {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        alert('Signature Captured Successfully');
        console.log(result.encoded);
    };

    const _onDragEvent = () => {
        // This callback will be called when the user enters signature
        console.log('dragged');
    };

    //----------------------------------------------

    //----------------------------------------------

    const options = {

        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const openPicker = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
        }


        )
    };


    //--------------------------------------------
    //Checkboxex

    const [imul, setImul] = React.useState(false);
    const [iday, setIday] = React.useState(false);
    const [mtrb, setMtrb] = React.useState(false);
    const [ofrp, setOfrp] = React.useState(false);
    const [ntrb, setNtrb] = React.useState(false);
    const [nbsb, setNbsb] = React.useState(false);



    //=--------------------------------------------

    const [checked, setChecked] = React.useState('first');
    //radio btn

    //------------------------------------
    //Dropdown Menu 

    const zone = ["Internal waters", "Territorial Sea", "Contiguous Zone", "Economic Zone", "Continental Shelf", "High Seas and Deap Ocean"];
    const occupation = ["Boat Owner", "Skipper", "Fisherman"];
    const na_occ = ["Full Time", "Part Time"];
    const na_trip = ["Multiday", "Oneday"];
    const op_act = ["Supply", "Catch"];

    //-----------------------------

    const [inputs, setInputs] = useState([{ key: '', value: '' }]);


    const addHandler = () => {
        const _inputs = [...inputs];
        _inputs.push({ key: '', value: '' });
        setInputs(_inputs);
    }



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
    const deleteHandler = (key) => {
        const _inputs = inputs.filter((input, index) => index != key);
        setInputs(_inputs);
    }




    //-----------------------------


    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])








    return (

        <View style={styles.container}>




            <View style={styles.header}>
                <Text style={styles.headTitle1}>Fisherman Registration</Text>


            </View>
            <View style={styles.footer}>

                <View style={{ flex: 1 }}>


                    <ProgressSteps {...progressStepsStyle}>

                        <ProgressStep>
                            <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, borderColor: '#333C8D', padding: 5 }}>
                                <Text style={styles.text_footer}>Fishing Details</Text>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Fisheries Inspector {"\n"}Division</Text>
                                    <TextInput style={styles.textInput} />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>GN Division</Text>
                                    <TextInput style={styles.textInput} />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Divisional {"\n"}Secretariat {"\n"}Division</Text>
                                    <TextInput style={styles.textInput} />
                                </View>

                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={styles.txt}>Fisheries District</Text>
                                    <TextInput style={styles.textInput} />



                                </View>
                            </View>



                            <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 10, borderColor: '#333C8D', padding: 5 }}>
                                <Text style={styles.text_footer}>Personal Details</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Surname</Text>
                                    <TextInput style={styles.textInput} />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Other Names</Text>
                                    <TextInput style={styles.textInput} />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>NIC Number</Text>
                                    <TextInput style={styles.textInput} />
                                </View>


                            </View>
                        </ProgressStep>


                        <ProgressStep>
                            <SafeAreaView>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Fishing Zone</Text>
                                    <View style={{ flex: 1, zIndex: 1, flexDirection: 'row-reverse' }}>

                                        <SelectDropdown

                                            data={zone}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem, index)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {

                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {

                                                return item
                                            }}
                                        />
                                    </View>

                                </View>



                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Occupation</Text>

                                    <View style={{ flex: 1, zIndex: 1, flexDirection: 'row-reverse' }}>

                                        <SelectDropdown

                                            data={occupation}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem, index)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {

                                                return item
                                            }}
                                        />
                                    </View>

                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Categories of Boats</Text>

                                    <View style={styles.checkBox}>
                                        <Checkbox
                                            status={imul ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setImul(!imul);
                                            }}
                                            color={'#333C8D'}



                                        />
                                        <Text style={styles.label}>IMUL</Text>
                                    </View>
                                    <View style={styles.checkBox}>
                                        <Checkbox

                                            status={iday ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setIday(!iday);
                                            }}
                                            color={'#333C8D'}


                                        />
                                        <Text style={styles.label}>IDAY</Text>
                                    </View>
                                    <View style={styles.checkBox}>
                                        <Checkbox

                                            status={mtrb ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setMtrb(!mtrb);
                                            }}
                                            color={'#333C8D'}


                                        />
                                        <Text style={styles.label}>MTRB</Text>
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 157 }}>

                                    <View style={styles.checkBox} >
                                        <Checkbox

                                            status={ofrp ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setOfrp(!ofrp);
                                            }}
                                            color={'#333C8D'}


                                        />
                                        <Text style={styles.label}>OFRP</Text>
                                        <Checkbox

                                            status={ntrb ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setNtrb(!ntrb);
                                            }}
                                            color={'#333C8D'}


                                        />
                                        <Text style={styles.label}>NTRB</Text>
                                        <Checkbox

                                            status={nbsb ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setNbsb(!nbsb);
                                            }}
                                            color={'#333C8D'}


                                        />
                                        <Text style={styles.label}>NBSB</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Number of Boats</Text>
                                    <TextInput style={styles.textInput} />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.txt}>Nature of {"\n"}Occupation</Text>
                                    <View style={{ flex: 1, zIndex: 1, flexDirection: 'row-reverse' }}>

                                        <SelectDropdown

                                            data={na_occ}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem, index)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {

                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {

                                                return item
                                            }}
                                        />
                                    </View>

                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Nature of Fishing {"\n"}Operation</Text>
                                    <View style={{ flex: 1, zIndex: 1, flexDirection: 'row-reverse' }}>

                                        <SelectDropdown

                                            data={na_trip}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem, index)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {

                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {

                                                return item
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>For associate {"\n"}Occupational {"\n"}activities</Text>
                                    <View style={{ flex: 1, zIndex: 1, flexDirection: 'row-reverse' }}>

                                        <SelectDropdown

                                            bgColor={"white"}

                                            data={op_act}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem, index)
                                            }}
                                            buttonTextAfterSelection={(selectedItem, index) => {

                                                return selectedItem
                                            }}
                                            rowTextForSelection={(item, index) => {

                                                return item
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Life insurance Number</Text>
                                    <TextInput style={styles.textInput} />
                                </View>



                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Membership of {"\n"}Fisheries Society</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <RadioButton

                                                color='#333C8D'

                                                value="first"
                                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('first')}

                                            />
                                            <Text style={styles.label}>Yes</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <RadioButton
                                                color='#333C8D'

                                                value="second"
                                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                                onPress={() => setChecked('second')}
                                            />
                                            <Text style={styles.label}>No</Text>
                                        </View>
                                    </View>
                                </View>



                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txt}>Fisheries Society {"\n"}Membership Number</Text>
                                    <TextInput style={styles.textInput} />
                                </View>




                            </SafeAreaView>
                        </ProgressStep>




                        <ProgressStep>
                            <View style={{ borderWidth: 1, borderColor: '#333C8D', borderRadius: 10, padding: 5, marginBottom: 10 }}>
                                <Text style={styles.text_footer}>Children Details</Text>
                                <View>
                                    {inputs.map((input, key) => (

                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    padding: 15,
                                                    paddingLeft: 5,
                                                    color: '#333C8D',
                                                }}>Name</Text>
                                                <TextInput style={styles.textInput} />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    padding: 15,
                                                    paddingLeft: 5,
                                                    color: '#333C8D',
                                                }}>Birthday</Text>
                                                <TextInput style={styles.textInput} />



                                                < TouchableOpacity onPress={() => deleteHandler(key)}>
                                                    <Text style={{ color: "#333C8D", fontSize: 15, paddingRight: 10 }}>Remove</Text>
                                                </TouchableOpacity>



                                            </View>
                                        </View>
                                    ))}


                                    <View style={{ margin: 10, marginLeft: 200, }}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={addHandler}
                                        >
                                            <Text style={styles.buttonText}>ADD</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>



                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#333C8D', borderRadius: 10, padding: 5, marginTop: 10 }}>


                                <Text style={styles.text_footer}>Details of Other Dependent</Text>



                                <View>

                                    {inputs1.map((input1, key1) => (


                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    padding: 15,
                                                    paddingLeft: 5,
                                                    color: '#333C8D',
                                                }}>Name</Text>
                                                <TextInput style={styles.textInput} />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    padding: 15,
                                                    paddingLeft: 5,
                                                    color: '#333C8D',
                                                }}>Birthday</Text>
                                                <TextInput style={styles.textInput} />



                                                < TouchableOpacity onPress={() => deleteHandler1(key1)}>
                                                    <Text style={{ color: "#333C8D", fontSize: 16, }}>Remove</Text>
                                                </TouchableOpacity>


                                            </View>

                                        </View>



                                    ))}

                                </View>



                                <View style={{ margin: 20, marginLeft: 200 }}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={addHandler1}
                                    >
                                        <Text style={styles.buttonText}>ADD</Text>
                                    </TouchableOpacity>
                                </View>





                            </View>
                        </ProgressStep>





                        <ProgressStep>

                            <Text style={styles.text_footer}>Photo of Applicant</Text>

                            <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                                <Image
                                    source={require('../assets/fish.png')}
                                    style={styles.logo}
                                    resizeMode="stretch"

                                />
                            </View>

                            <View style={{ alignItems: 'center', paddingBottom: 10 }}>


                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={openPicker}
                                >
                                    <Text style={styles.buttonText}>Choose File</Text>
                                </TouchableOpacity>




                            </View>
                            <Text style={styles.text_footer}>Declaration of Applicant</Text>
                            <Text style={styles.txt}>I declare that the above said information are true and accurate</Text>
                            <View style={{ borderWidth: 1, padding: 10, borderColor: '#333C8D' }}>
                                <SignatureCapture
                                    style={styles.signature}
                                    ref={sign}
                                    onSaveEvent={_onSaveEvent}
                                    onDragEvent={_onDragEvent}
                                    showNativeButtons={false}
                                    showTitleLabel={false}
                                    viewMode={'portrait'}
                                />
                            </View>




                            <View style={{ flexDirection: 'row-reverse' }}>
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={() => {
                                        saveSign();
                                    }}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={() => {
                                        resetSign();
                                    }}>
                                    <Text style={styles.buttonText}>Reset</Text>
                                </TouchableHighlight>
                            </View>







                        </ProgressStep>






                    </ProgressSteps>
                </View >
            </View >





        </View >
    );
}

export default NavScreen;


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
    datePickerStyle: {
        width: 200,
        marginTop: 10,
        height: 20
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


});