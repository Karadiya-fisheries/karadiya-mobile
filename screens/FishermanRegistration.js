import React, { useState, useEffect, Component, useRef, createRef } from 'react';
import {
  TouchableHighlight,
  Image,
  Platform,
  LogBox,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Button,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Checkbox, RadioButton, RadioButtonGroup } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
//import * as ImagePicker from 'react-native-image-picker';
import SignatureCapture from 'react-native-signature-capture';
import { Formik, Field, Form, ErrorMessage, resetForm } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as yup from 'yup';
import fishermenService from '../service/fishermen.service';
import authService from '../service/auth.service';
import ChildDetails from '../components/ChildDetails';
import DependentDetails from '../components/DependentDetails';
import { launchImageLibrary } from 'react-native-image-picker';

import { useToast } from "react-native-toast-notifications";
import { useNetInfo } from '@react-native-community/netinfo';

//import { showImagePicker } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
//import { initializeApp } from 'firebase/app'; //validate yourself
//import { getStorage, ref, uploadBytes } from 'firebase/storage'; //access the storage database
//import storage from './firebase/firebaseConfig';
//import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const fishermanregValidationSchema = yup.object().shape({
  fidivision: yup.string().required('*This is a required field'),
  gndivision: yup.string().required('*This is a required field'),
  dsdivision: yup.string().required('*This is a required field'),
  district: yup.string().required('*This is a required field'),
  surname: yup.string().required('*This is a required field'),
  othernames: yup.string().required('*This is a required field'),
  nicno: yup.string().required('*This is a required field'),
  numofboats: yup.number().required('*This is a required field'),
  insuarance: yup.string().required('*This is a required field'),
  membershipno: yup.string().required('*This is a required field'),

  imul: yup.boolean(),
  ntrb: yup.boolean(),
  mtrb: yup.boolean(),
  iday: yup.boolean(),
  ofrp: yup.boolean(),
  nbsb: yup.boolean(),
});

function FishermanRegistration({ navigation }) {

  const toast = useToast();

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

  const _onSaveEvent = result => {
    alert('Signature Captured Successfully');
    console.log(result.encoded);
  };

  const _onDragEvent = () => {
    console.log('dragged');
  };

  //----------------------------------------------
  //image picker
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log(source);
        setImage(source);
      }
    });

    //uploadImage();

  };

  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
      const url = await storage().ref(uploadUri).getDownloadURL();
      console.log(url)
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    setImage(null);
  };


  //--------------------------------------------
  //Checkboxes

  const [imul, setImul] = React.useState(false);
  const [iday, setIday] = React.useState(false);
  const [mtrb, setMtrb] = React.useState(false);
  const [ofrp, setOfrp] = React.useState(false);
  const [ntrb, setNtrb] = React.useState(false);
  const [nbsb, setNbsb] = React.useState(false);

  const [userUid, setUseruid] = useState(null);
  authService.getCurrentUser().then(res => {
    setUseruid(JSON.parse(res).uid);
  });

  //=--------------------------------------------
  //radio button
  const [value, setValue] = React.useState('Yes');

  //-----------------------------
  //Dynamiccaly Adding input fields

  //-----------------------------
  //date picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setText(fDate);
    console.log(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const [childdata, setchildData] = useState();
  const [dependentdata, setdependentData] = useState();

  const childToParent1 = (childdata) => {
    setchildData(childdata);

  }

  const childToParent2 = (childdata) => {
    setdependentData(childdata);

  }
  const netInfo = useNetInfo();

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
        fishingZone: 'internal waters',
        occupation: 'boat owner',
        numofboats: '',
        natureOfOccu: 'full time',
        natureOfFishing: 'multiday',
        associateOccu: 'supply',
        insuarance: '',
        membershipStatus: 'no',
        membershipno: 'no',

      }}
      onSubmit={(values, { resetForm }) => {
        const boatCat = [
          { label: 'IMUL', value: imul },
          { label: 'IDAY', value: iday },
          { label: 'MTRB', value: mtrb },
          { label: 'OFRP', value: ofrp },
          { label: 'NBSB', value: nbsb },
          { label: 'NTRB', value: ntrb },
        ]
          .map(boat => {
            if (boat.value) {
              return boat.label;
            }
          })
          .filter(element => {
            return element !== undefined;
          });

        if (netInfo.isConnected) {
          fishermenService
            .createFishermen({
              uid: userUid,
              FIDivision: values.fidivision,
              GNDivision: values.gndivision,
              DSDivision: values.dsdivision,
              FDistrict: values.district,
              Surname: values.surname,
              OtherNames: values.othernames,
              NicNo: values.nicno,
              BoatCat: boatCat,
              NumofBoats: values.numofboats,
              FZone: [values.fishingZone],
              OccuType: values.occupation,
              FOpType: values.natureOfFishing,
              AssocAct: values.associateOccu,
              LInsuaranceNo: values.insuarance,
              MemberOfSoc: values.membershipStatus,
              MemberNo: values.membershipno,
              Children: childdata,
              Dependent: dependentdata,
              Photo: null,
              Sign: null,


            })
            .then(res => {
              console.log(res);
              toast.show("Submitted Successfully.Check Your Email!", {
                type: "success",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
              });
              resetForm();
              setchildData(null);
              setdependentData(null);
              navigation.navigate('Home');
            })
            .catch(err => {
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
        }
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
      }) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headTitle1}>Fisherman Registration</Text>
          </View>
          <View style={styles.footer}>
            <View style={{ flex: 1 }}>
              <ProgressSteps {...progressStepsStyle}>
                <ProgressStep>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      marginBottom: 10,
                      borderColor: '#333C8D',
                      padding: 5,
                    }}>
                    <Text style={styles.text_footer}>Fishing Details</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>
                        Fisheries Inspector {'\n'}Division
                      </Text>
                      <TextInput
                        style={styles.textInput}
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
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('gndivision')}
                        onBlur={handleBlur('gndivision')}
                        value={values.gndivision}
                      />
                    </View>
                    {errors.gndivision && touched.gndivision ? (
                      <Text style={styles.errorText}>{errors.gndivision}</Text>
                    ) : null}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>
                        Divisional {'\n'}Secretariat {'\n'}Division
                      </Text>
                      <TextInput
                        style={styles.textInput}
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
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('district')}
                        onBlur={handleBlur('district')}
                        value={values.district}
                      />
                    </View>
                    {errors.district && touched.district ? (
                      <Text style={styles.errorText}>{errors.district}</Text>
                    ) : null}
                  </View>

                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      marginTop: 10,
                      borderColor: '#333C8D',
                      padding: 5,
                    }}>
                    <Text style={styles.text_footer}>Personal Details</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Surname</Text>
                      <TextInput
                        style={styles.textInput}
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
                      <TextInput
                        style={styles.textInput}
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
                      <TextInput
                        style={styles.textInput}
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
                      <View
                        style={{
                          borderRadius: 10,
                          overflow: 'hidden',
                          width: 210,
                          height: 25,
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Picker
                          style={styles.picker}
                          mode="dropdown"
                          selectedValue={values.fishingZone}
                          onValueChange={handleChange('fishingZone')}>
                          <Picker.Item
                            label="Internal waters"
                            value="internal waters"
                          />
                          <Picker.Item
                            label="Territorial Sea"
                            value="territorial sea"
                          />
                          <Picker.Item
                            label="Contiguous Zone"
                            value="contiguous zone"
                          />
                          <Picker.Item
                            label="Economic Zone"
                            value="economic zone"
                          />
                          <Picker.Item
                            label="Continental Shelf"
                            value="continental shelf"
                          />
                          <Picker.Item
                            label="High Seas and Deap Ocean"
                            value="high and deep"
                          />
                        </Picker>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Occupation</Text>

                      <View
                        style={{
                          borderRadius: 10,
                          overflow: 'hidden',
                          width: 210,
                          height: 25,
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Picker
                          style={styles.picker}
                          mode="dropdown"
                          selectedValue={values.occupation}
                          onValueChange={handleChange('occupation')}>
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
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 157,
                      }}>
                      <View style={styles.checkBox}>
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
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('numofboats')}
                        onBlur={handleBlur('numofboats')}
                        keyboardType="numeric"
                        value={values.numofboats}
                      />
                    </View>
                    <ErrorMessage name="acceptTerms" />

                    {errors.numofboats && touched.numofboats ? (
                      <Text style={styles.errorText}>{errors.numofboats}</Text>
                    ) : null}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Nature of {'\n'}Occupation</Text>
                      <View
                        style={{
                          borderRadius: 10,
                          overflow: 'hidden',
                          width: 210,
                          height: 25,
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Picker
                          style={styles.picker}
                          mode="dropdown"
                          selectedValue={values.natureOfOccu}
                          onValueChange={handleChange('natureOfOccu')}>
                          <Picker.Item label="Full Time" value="full time" />
                          <Picker.Item label="Part Time" value="part time" />
                        </Picker>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>
                        Nature of Fishing {'\n'}Operation
                      </Text>
                      <View
                        style={{
                          borderRadius: 10,
                          overflow: 'hidden',
                          width: 210,
                          height: 25,
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Picker
                          style={styles.picker}
                          mode="dropdown"
                          selectedValue={values.natureOfFishing}
                          onValueChange={handleChange('natureOfFishing')}>
                          <Picker.Item label="Multi Day" value="multiday" />
                          <Picker.Item label="One Day" value="one day" />
                        </Picker>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>
                        For associate {'\n'}Occupational {'\n'}activities
                      </Text>
                      <View
                        style={{
                          borderRadius: 10,
                          overflow: 'hidden',
                          width: 210,
                          height: 25,
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Picker
                          style={styles.picker}
                          mode="dropdown"
                          selectedValue={values.associateOccu}
                          onValueChange={handleChange('associateOccu')}>
                          <Picker.Item label="Supply" value="supply" />
                          <Picker.Item label="Catch" value="catch" />
                        </Picker>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>Life insurance Number</Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('insuarance')}
                        onBlur={handleBlur('insuarance')}
                        value={values.insuarance}
                      />
                    </View>
                    {errors.insuarance && touched.insuarance ? (
                      <Text style={styles.errorText}>{errors.insuarance}</Text>
                    ) : null}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>
                        Membership of {'\n'}Fisheries Society
                      </Text>

                      <RadioButton.Group
                        onValueChange={handleChange('membershipStatus')}
                        value={values.membershipStatus}>
                        <View style={{ flexDirection: 'row' }}>
                          <RadioButton color="#333C8D" value="yes" />
                          <Text style={styles.txt}>Yes</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <RadioButton value="no" color="#333C8D" />
                          <Text style={styles.txt}>No</Text>
                        </View>
                      </RadioButton.Group>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.txt}>
                        Fisheries Society {'\n'}Membership Number
                      </Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('membershipno')}
                        onBlur={handleBlur('membershipno')}
                        value={values.membershipno}
                      />
                    </View>
                  </View>
                </ProgressStep>

                <ProgressStep>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#333C8D',
                      borderRadius: 10,
                      padding: 5,
                      marginBottom: 10,
                    }}>
                    <Text style={styles.text_footer}>Children Details</Text>
                    <View>

                      <ChildDetails childToParent={childToParent1} />

                    </View>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#333C8D',
                      borderRadius: 10,
                      padding: 5,
                      marginTop: 10,
                    }}>
                    <Text style={styles.text_footer}>
                      Details of Other Dependent
                    </Text>
                    <View>
                      <DependentDetails childToParent={childToParent2} />

                    </View>

                  </View>
                </ProgressStep>

                <ProgressStep onSubmit={handleSubmit} disabled={!isValid}>
                  <Text style={styles.text_footer}>Photo of Applicant</Text>

                  <View style={{ alignItems: 'center', paddingBottom: 10 }}>


                    {
                      image && (
                        <Image
                          source={{ uri: image.uri }}

                          style={styles.logo}
                          resizeMode="stretch">
                        </Image>
                      )
                    }

                  </View>

                  <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                    <TouchableOpacity
                      style={styles.button}

                      onPress={selectImage}>

                      <Text style={styles.buttonText}>Choose File</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.text_footer}>
                    Declaration of Applicant
                  </Text>
                  <Text style={styles.txt}>
                    I declare that the above said information are true and
                    accurate
                  </Text>



                </ProgressStep>
              </ProgressSteps>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}
export default FishermanRegistration;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333C8D',
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
    paddingRight: 10,
  },

  txt: {
    fontSize: 16,
    padding: 15,
    paddingLeft: 5,
    color: '#333C8D',
    //marginEnd: 50,
    minWidth: 160,
    fontWeight: 'bold'
  },

  picker: {
    backgroundColor: '#333C8D',
    textAlign: 'center',
  },

  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#333C8D',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
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
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'column-reverse',
    marginTop: 10,
    backgroundColor: '#333C8D',
    padding: 10,
    width: 120,
    borderRadius: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    marginEnd: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
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
    color: '#fff',
  },
  logo: {
    width: height_logo,
    height: height_logo * 1.2,
    borderColor: '#333C8D',
    borderWidth: 1,
  },

  signature: {
    height: 250,
    width: 350,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'right',
  },
});
