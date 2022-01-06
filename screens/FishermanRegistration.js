
import React, { useState, useEffect, Component, useRef, createRef } from "react";
import { TouchableHighlight, Image, Platform, LogBox, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Button, SafeAreaView, ScrollView, Alert } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Checkbox, RadioButton, RadioButtonGroup } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from "react-native-image-picker";
import SignatureCapture from 'react-native-signature-capture';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import ChildrenDetails from '../components/ChildrenDetails';
import DependantDetails from '../components/DependantDetails';


const fishermanregValidationSchema = yup.object().shape({
  fidivision: yup
    .string()
    .required('*This is a required field'),
  gndivision: yup
    .string()
    .required('*This is a required field'),
  dsdivision: yup
    .string()
    .required('*This is a required field'),
  district: yup
    .string()
    .required('*This is a required field'),
  surname: yup
    .string()
    .required('*This is a required field'),
  othernames: yup
    .string()
    .required('*This is a required field'),
  nicno: yup
    .string()
    .required('*This is a required field'),
  numofboats: yup
    .number()
    .required('*This is a required field'),
  insuarance: yup
    .string()
    .required('*This is a required field'),
  membershipno: yup
    .string()
    .required('*This is a required field'),

  selectedZone: yup.string().required('this field is required'),

  imul: yup.boolean(),
  ntrb: yup.boolean(),
  mtrb: yup.boolean(),
  iday: yup.boolean(),
  ofrp: yup.boolean(),
  nbsb: yup.boolean(),

});




function FishermanRegistration() {

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
  //signature pad
  const sign = createRef();

  const saveSign = () => {
    sign.current.saveImage();
  };

  const resetSign = () => {
    sign.current.resetImage();
  };

  const _onSaveEvent = (result) => {
    alert('Signature Captured Successfully');
    console.log(result.encoded);
  };

  const _onDragEvent = () => {
    console.log('dragged');
  };

  //----------------------------------------------
  //image picker

  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const openPicker = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
    })

  };
  //--------------------------------------------
  //Checkboxes

  const [imul, setImul] = React.useState(false);
  const [iday, setIday] = React.useState(false);
  const [mtrb, setMtrb] = React.useState(false);
  const [ofrp, setOfrp] = React.useState(false);
  const [ntrb, setNtrb] = React.useState(false);
  const [nbsb, setNbsb] = React.useState(false);



  //=--------------------------------------------
  //radio button
  const [value, setValue] = React.useState('Yes');


  //------------------------------------
  //Dropdown Menu 


  const [selectedZone, setSelectedZone] = useState();
  const [selectedOccupation, setSelectedOccupation] = useState();
  const [selectedNaocc, setSelectedNaocc] = useState();
  const [selectedNatrip, setSelectedNatrip] = useState();
  const [selectedOpact, setSelectedOpact] = useState();

  //-----------------------------

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, [])

  return (

    <Formik
      validationSchema={fishermanregValidationSchema}

      initialValues={{
        fidivision: '',
        gndivision: '',
        dsdivision: '',
        district: '',
        surname: '',
        othernames: '',
        nicno: '',
        occupation: '',
        numofboats: '',
        insuarance: '',
        membershipno: '',
        childrenname: '',
        dependentname: '',

      }}

      onSubmit={values => console.log(values)}

    >

      {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, }) => (

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
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('fidivision')}
                        onBlur={handleBlur('fidivision')}
                        value={values.fidivision}
                      />
                    </View>

                    {errors.fidivision && touched.fidivision ? (
                      <Text style={styles.errorText}>{errors.fidivision}</Text>
                    ) : null}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>GN Division</Text>
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('gndivision')}
                        onBlur={handleBlur('gndivision')}
                        value={values.gndivision}
                      />

                    </View>
                    {errors.gndivision && touched.gndivision ? (
                      <Text style={styles.errorText}>{errors.gndivision}</Text>
                    ) : null}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Divisional {"\n"}Secretariat {"\n"}Division</Text>
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('dsdivision')}
                        onBlur={handleBlur('dsdivision')}
                        value={values.dsdivision}
                      />
                    </View>
                    {errors.dsdivision && touched.dsdivision ? (
                      <Text style={styles.errorText}>{errors.dsdivision}</Text>
                    ) : null}

                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Text style={styles.txt}>Fisheries District</Text>
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('district')}
                        onBlur={handleBlur('district')}
                        value={values.district}
                      />
                    </View>
                    {errors.district && touched.district ? (
                      <Text style={styles.errorText}>{errors.district}</Text>
                    ) : null}
                  </View>



                  <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 10, borderColor: '#333C8D', padding: 5 }}>
                    <Text style={styles.text_footer}>Personal Details</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Surname</Text>
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('surname')}
                        onBlur={handleBlur('surname')}
                        value={values.surname}
                      />
                    </View>
                    {errors.surname && touched.surname ? (
                      <Text style={styles.errorText}>{errors.surname}</Text>
                    ) : null}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Other Names</Text>
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('othernames')}
                        onBlur={handleBlur('othernames')}
                        value={values.othernames}
                      />
                    </View>
                    {errors.othernames && touched.othernames ? (
                      <Text style={styles.errorText}>{errors.othernames}</Text>
                    ) : null}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>NIC Number</Text>
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('nicno')}
                        onBlur={handleBlur('nicno')}
                        value={values.nicno}
                      />
                    </View>
                    {errors.nicno && touched.nicno ? (
                      <Text style={styles.errorText}>{errors.nicno}</Text>
                    ) : null}
                  </View>
                </ProgressStep>


                <ProgressStep>
                  <View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Fishing Zone</Text>
                      <View style={{ borderRadius: 10, overflow: 'hidden', width: 210, height: 25, justifyContent: 'center', alignContent: 'center' }}>
                        <Picker style={styles.picker}
                          mode='dropdown'
                          selectedValue={selectedZone}
                          onValueChange={(itemValue, itemIndex) =>
                            setSelectedZone(itemValue)
                          }>
                          <Picker.Item label="Internal waters" value="internal waters" />
                          <Picker.Item label="Territorial Sea" value="territorial sea" />
                          <Picker.Item label="Contiguous Zone" value="contiguous zone" />
                          <Picker.Item label="Economic Zone" value="economic zone" />
                          <Picker.Item label="Continental Shelf" value="continental shelf" />
                          <Picker.Item label="High Seas and Deap Ocean" value="high and deep" />

                        </Picker>
                      </View>


                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Occupation</Text>

                      <View style={{ borderRadius: 10, overflow: 'hidden', width: 210, height: 25, justifyContent: 'center', alignContent: 'center' }}>
                        <Picker style={styles.picker}


                          mode='dropdown'
                          selectedValue={selectedOccupation}
                          onValueChange={(itemValue, itemIndex) =>
                            setSelectedOccupation(itemValue)
                          }>
                          <Picker.Item label="Boat Owner" value="boat owner" />
                          <Picker.Item label="Skipper" value="skipper" />
                          <Picker.Item label="Fisherman" value="Fisherman" />

                        </Picker>
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
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('numofboats')}
                        onBlur={handleBlur('numofboats')}
                        keyboardType='numeric'
                        value={values.numofboats}
                      />
                    </View>
                    <ErrorMessage name="acceptTerms" />

                    {errors.numofboats && touched.numofboats ? (
                      <Text style={styles.errorText}>{errors.numofboats}</Text>
                    ) : null}

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <Text style={styles.txt}>Nature of {"\n"}Occupation</Text>
                      <View style={{ borderRadius: 10, overflow: 'hidden', width: 210, height: 25, justifyContent: 'center', alignContent: 'center' }}>
                        <Picker style={styles.picker}
                          mode='dropdown'
                          selectedValue={selectedNaocc}
                          onValueChange={(itemValue, itemIndex) =>
                            setSelectedNaocc(itemValue)
                          }>
                          <Picker.Item label="Full Time" value="full time" />
                          <Picker.Item label="Part Time" value="part time" />


                        </Picker>
                      </View>

                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Nature of Fishing {"\n"}Operation</Text>
                      <View style={{ borderRadius: 10, overflow: 'hidden', width: 210, height: 25, justifyContent: 'center', alignContent: 'center' }}>
                        <Picker style={styles.picker}
                          mode='dropdown'
                          selectedValue={selectedNatrip}
                          onValueChange={(itemValue, itemIndex) =>
                            setSelectedNatrip(itemValue)
                          }>
                          <Picker.Item label="Multi Day" value="multiday" />
                          <Picker.Item label="One Day" value="one day" />


                        </Picker>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>For associate {"\n"}Occupational {"\n"}activities</Text>
                      <View style={{ borderRadius: 10, overflow: 'hidden', width: 210, height: 25, justifyContent: 'center', alignContent: 'center' }}>
                        <Picker style={styles.picker}
                          mode='dropdown'
                          selectedValue={selectedOpact}
                          onValueChange={(itemValue, itemIndex) =>
                            setSelectedOpact(itemValue)
                          }>
                          <Picker.Item label="Supply" value="supply" />
                          <Picker.Item label="Catch" value="catch" />


                        </Picker>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Life insurance Number</Text>
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('insuarance')}
                        onBlur={handleBlur('insuarance')}
                        value={values.insuarance}
                      />
                    </View>
                    {errors.insuarance && touched.insuarance ? (
                      <Text style={styles.errorText}>{errors.insuarance}</Text>
                    ) : null}



                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Membership of {"\n"}Fisheries Society</Text>

                      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <View style={{ flexDirection: 'row' }}>

                          <RadioButton color='#333C8D' value="yes" />
                          <Text style={styles.txt}>Yes</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <RadioButton value="no" color='#333C8D' />
                          <Text style={styles.txt}>No</Text>
                        </View>
                      </RadioButton.Group>

                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Fisheries Society {"\n"}Membership Number</Text>
                      <TextInput style={styles.textInput}
                        onChangeText={handleChange('membershipno')}
                        onBlur={handleBlur('membershipno')}
                        value={values.membershipno}
                      />
                    </View>

                  </View>
                </ProgressStep>






                <ProgressStep>
                  <ChildrenDetails />
                  <DependantDetails />
                </ProgressStep>

                <ProgressStep
                  onSubmit={handleSubmit}
                  disabled={!isValid}
                >

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


});