import React, {useState, useEffect, Component, useRef, createRef} from 'react';
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
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {Checkbox, RadioButton, RadioButtonGroup} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import SignatureCapture from 'react-native-signature-capture';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as yup from 'yup';
import fishermenService from '../service/fishermen.service';
import authService from '../service/auth.service';

const fishermanregValidationSchema = yup.object().shape({
  FDivision: yup.string().required('*This is a required field'),
  GNDivision: yup.string().required('*This is a required field'),
  DSDivision: yup.string().required('*This is a required field'),
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

  const _onSaveEvent = result => {
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
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
    });
  };
  //--------------------------------------------
  //Checkboxes

  const [imul, setImul] = React.useState(false);
  const [iday, setIday] = React.useState(false);
  const [mtrb, setMtrb] = React.useState(false);
  const [ofrp, setOfrp] = React.useState(false);
  const [ntrb, setNtrb] = React.useState(false);
  const [nbsb, setNbsb] = React.useState(false);

  const [uid, setUid] = useState(null);
  authService.getCurrentUser().then(res => {
    setUid(JSON.parse(res).uid);
  });

  //=--------------------------------------------
  //radio button
  const [value, setValue] = React.useState('Yes');

  //-----------------------------
  //Dynamiccaly Adding input fields
  //children details

  const [inputs, setInputs] = useState([{key: '', value: ''}]);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({key: '', value: ''});
    setInputs(_inputs);
  };
  const deleteHandler = key => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  //dependant details
  const [inputs1, setInputs1] = useState([{key1: '', value1: ''}]);

  const addHandler1 = () => {
    const _inputs1 = [...inputs1];
    _inputs1.push({key1: '', value1: ''});
    setInputs1(_inputs1);
  };

  const deleteHandler1 = key1 => {
    const _inputs1 = inputs1.filter((input1, index1) => index1 != key1);
    setInputs1(_inputs1);
  };
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

  // BoatCat: boatCat,
  //           OccuType: values.natureOfOccu,
  //           FOpType: values.natureOfFishing,
  //           AssocAct: values.associateOccu,
  //           MemberOfSoc: values.membershipStatus,
  //           MemberNo: values.membershipno,
  //           Children: null,
  //           Dependent: null,
  //           Sign: null,
  //           NumOfBoats: values.numofboats,
  //           LInsuaracneNo: values.insuarance,
  return (
    <Formik
      validationSchema={fishermanregValidationSchema}
      initialValues={{
        FDivision: '',
        GNDivision: '',
        DSDivision: '',
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
        childrenname: '',
        dependentname: '',
      }}
      onSubmit={values => {
        const boatCat = [
          {label: 'IMUL', value: imul},
          {label: 'IDAY', value: iday},
          {label: 'MTRB', value: mtrb},
          {label: 'OFRP', value: ofrp},
          {label: 'NBSB', value: nbsb},
          {label: 'NTRB', value: ntrb},
        ]
          .map(boat => {
            if (boat.value) {
              return boat.label;
            }
          })
          .filter(element => {
            return element !== undefined;
          });

        fishermenService
          .createFishermen(
            uid,
            values.FDivision,
            values.GNDivision,
            values.DSDivision,
            values.district,
            values.surname,
            values.othernames,
            values.nicno,
            values.fishingZone,
            values.occupation,
          )
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
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
            <View style={{flex: 1}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.txt}>
                        Fisheries Inspector {'\n'}Division
                      </Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('FDivision')}
                        onBlur={handleBlur('FDivision')}
                        value={values.FDivision}
                      />
                    </View>

                    {errors.FDivision && touched.FDivision ? (
                      <Text style={styles.errorText}>{errors.FDivision}</Text>
                    ) : null}

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.txt}>GN Division</Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('GNDivision')}
                        onBlur={handleBlur('GNDivision')}
                        value={values.GNDivision}
                      />
                    </View>
                    {errors.GNDivision && touched.GNDivision ? (
                      <Text style={styles.errorText}>{errors.GNDivision}</Text>
                    ) : null}

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.txt}>
                        Divisional {'\n'}Secretariat {'\n'}Division
                      </Text>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('DSDivision')}
                        onBlur={handleBlur('DSDivision')}
                        value={values.DSDivision}
                      />
                    </View>
                    {errors.DSDivision && touched.DSDivision ? (
                      <Text style={styles.errorText}>{errors.DSDivision}</Text>
                    ) : null}

                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.txt}>
                        Membership of {'\n'}Fisheries Society
                      </Text>

                      <RadioButton.Group
                        onValueChange={handleChange('membershipStatus')}
                        value={values.membershipStatus}>
                        <View style={{flexDirection: 'row'}}>
                          <RadioButton color="#333C8D" value="yes" />
                          <Text style={styles.txt}>Yes</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <RadioButton value="no" color="#333C8D" />
                          <Text style={styles.txt}>No</Text>
                        </View>
                      </RadioButton.Group>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      {inputs.map((input, key) => (
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.txt}>Name</Text>
                            <TextInput
                              style={styles.textInput}
                              onChangeText={handleChange('childrenname')}
                              onBlur={handleBlur('childrenname')}
                              value={values.childrenname}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                padding: 15,
                                paddingLeft: 5,
                                color: '#333C8D',
                              }}>
                              Birthday
                            </Text>
                            <Button
                              onPress={showDatepicker}
                              title="Select Date"
                              color="#333C8D"
                            />

                            {show && (
                              <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                              />
                            )}
                            <Text
                              style={{
                                fontSize: 18,
                                margin: 20,
                                color: '#333C8D',
                              }}>
                              {text}
                            </Text>
                            <TouchableOpacity
                              onPress={() => deleteHandler(key)}>
                              <Text
                                style={{
                                  color: '#333C8D',
                                  fontSize: 15,
                                  paddingRight: 10,
                                }}>
                                Remove
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}

                      <View style={{margin: 10, marginLeft: 200}}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={addHandler}>
                          <Text style={styles.buttonText}>ADD</Text>
                        </TouchableOpacity>
                      </View>
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
                      {inputs1.map((input1, key1) => (
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.txt}>Name</Text>
                            <TextInput style={styles.textInput} />
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                padding: 15,
                                paddingLeft: 5,
                                color: '#333C8D',
                              }}>
                              Birthday
                            </Text>

                            <Button
                              onPress={showDatepicker}
                              title="Select Date"
                              color="#333C8D"
                            />

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
                            <Text
                              style={{
                                fontSize: 18,
                                margin: 20,
                                color: '#333C8D',
                              }}>
                              {text}
                            </Text>

                            <TouchableOpacity
                              onPress={() => deleteHandler1(key1)}>
                              <Text style={{color: '#333C8D', fontSize: 16}}>
                                Remove
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>

                    <View style={{margin: 20, marginLeft: 200}}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={addHandler1}>
                        <Text style={styles.buttonText}>ADD</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ProgressStep>

                <ProgressStep onSubmit={handleSubmit} disabled={!isValid}>
                  <Text style={styles.text_footer}>Photo of Applicant</Text>

                  <View style={{alignItems: 'center', paddingBottom: 10}}>
                    <Image
                      source={require('../assets/fish.png')}
                      style={styles.logo}
                      resizeMode="stretch"
                    />
                  </View>

                  <View style={{alignItems: 'center', paddingBottom: 10}}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={openPicker}>
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
                  <View
                    style={{
                      borderWidth: 1,
                      padding: 10,
                      borderColor: '#333C8D',
                    }}>
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

                  <View style={{flexDirection: 'row-reverse'}}>
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
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}
export default FishermanRegistration;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.15;

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
    height: height_logo,
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
