
import React, { useState, useEffect, Component, useRef, createRef } from "react";
import { TouchableHighlight, Image, Platform, LogBox, View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Button, SafeAreaView, ScrollView } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Checkbox, RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { Picker } from '@react-native-picker/picker';
import { Formik, Field, Form, ErrorMessage,resetForm } from 'formik';
import * as yup from 'yup';
import TravelerDetails from '../components/TravelerDetails';
import DepartureService from '../service/DepartureService';
import { useNetInfo } from '@react-native-community/netinfo';

const departureapprovalValidationSchema = yup.object().shape({
  imul: yup
    .string()
    .required('*This is a required field'),
  ownername: yup
    .string()
    .required('*This is a required field'),
  phnum: yup
  .number()
  .min(10, "Must be more than 10 characters")
  .required("This field is requried"),
  email: yup
    .string()
    .email("Please enter an valid email")
    .required('*This is a required field'),
  skippername: yup
    .string()
    .required('*This is a required field'),
  nic: yup
    .string()
    .required('*This is a required field'),
  skippernum: yup
    .string()
    .required('*This is a required field'),
  mlength: yup
    .number()
    .required('*This is a required field'),
  throns: yup
    .string()
    .required('*This is a required field'),
  cnet: yup
    .string()
    .required('*This is a required field'),
  ceye: yup
    .number()
    .required('*This is a required field'),
  netting: yup
    .string()
    .required('*This is a required field'),
  neteye: yup
    .number()
    .required('*This is a required field'),
  llicense: yup
    .string()
    .required('*This is a required field'),
  ilicense: yup
    .string()
    .required('*This is a required field'),


});




function DepartureApprovalScreen() {
  const progressStepsStyle = {
    activeStepIconBorderColor: '#333C8D',
    activeLabelColor: '#333C8D',
    activeStepNumColor: '#333C8D',
    completedStepIconColor: '#333C8D',
    completedProgressBarColor: '#333C8D',
    completedCheckColor: 'white',
    marginBottom: 35,

  };
  

  const [checked, setChecked] = React.useState();

  //--------------------------------------------------------------
  const [selectedStation, setSelectedStation] = useState();
  const [selectedCode, setSelectedCode] = useState();
  const [selectedPort, setSelectedPort] = useState();
  //----------------------------------------------------------
  const [agree, setAgree] = React.useState(false);

  const [travelerdata, settravelerData] = useState();
  
  const childToParent1 = (travelerdata) => {
    settravelerData(travelerdata);
  }

  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');
  const [data, setData] = React.useState('');
  const [synched, setSynched] = React.useState('');

  const netInfo = useNetInfo();

  if (netInfo.isConnected) {
    var networkConn = <Text style={{ color: "white",backgroundColor:"green" }}>Back Online</Text>
}
  else {
    networkConn = <Text style = {{ color: "white",backgroundColor:"red"}}>No internet</Text>
}


  return (
    <Formik
      validationSchema={departureapprovalValidationSchema}
      initialValues={{
        imul: '',
        ownername: '',
        phnum: '',
        email: '',
        skippername: '', 
        nic: '',
        skippernum: '',
        mlength: '',
        throns: '',
        cnet: '',
        ceye: '',
        netting: '',
        neteye: '',
        llicense: '',
        ilicense: '',
        vmsStatus:'yes',
        fishingArea:'indigenous sea',
        selectedCode:'4096hz',
        selectedPort:'galle',
        selectedStation:'galle'

      }}
      onSubmit={(values ,{resetForm})=> {
        if(netInfo.isConnected){
      
        DepartureService
          .createDeparture({
            Imul: values.imul,
            OwnerName: values.ownername,
            TelNo: values.phnum,
            Email: values.email,
            SkipperName: values.skippername,
            SkipperNic: values.nic,
            SkipperNo: values.skippernum,
            DepartingPort: values.selectedPort,
            FishingZone: values.fishingArea,
            MLength: values.mlength,
            NoThrons: values.throns,
            CNetLength: values.cnet,
            CEyeSize: values.ceye,
            NettingLength: values.netting,
            NetEyeSize: values.neteye,
            CrewDetails: travelerdata,
            LocalOpLicense: values.llicense,
            InterOpLicense:values.ilicense,
            RadioStation:values.selectedStation,
            Frequency:values.selectedCode,
            Vms:values.vmsStatus,
           
          })
          .then(res => {
            console.log(res);
            resetForm();
            settravelerData(null);
            navigation.navigate('Home');
          })
          .catch(err => {
            console.log(err.response);
            console.log(err.request);
            console.log(err.message);
          });
     
      
        }
        
          
      }
    
    
    
    }
      
      
      >
      {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, }) => (
        
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headTitle1}>Sea Voyage Request for {"\n"}Multiday Vessels</Text>
          </View>
          <View style={styles.footer}>
            <View style={{ flex: 1 }}>
              <ProgressSteps {...progressStepsStyle}>

                <ProgressStep>

                  <View style={{ flexDirection: 'column', padding: 15 }}>
                    <Text style={styles.txt}>01. IMUL Number</Text>
                    <TextInput style={styles.textInput}
                      onChangeText={handleChange('imul')}
                      onBlur={handleBlur('imul')}
                      value={values.imul}
                    />
                    {errors.imul && touched.imul ? (
                      <Text style={styles.errorText}>{errors.imul}</Text>
                    ) : null}

                    <Text style={styles.txt}>02. Name of the owner</Text>
                    <TextInput style={styles.textInput}
                      onChangeText={handleChange('ownername')}
                      onBlur={handleBlur('ownername')}
                      value={values.ownername}
                    />
                    {errors.ownername && touched.ownername ? (
                      <Text style={styles.errorText}>{errors.ownername}</Text>
                    ) : null}

                    <Text style={styles.txt}>03. Phone Number</Text>
                    <TextInput style={styles.textInput}
                      keyboardType='numeric'
                      onChangeText={handleChange('phnum')}
                      onBlur={handleBlur('phnum')}
                      value={values.phnum}
                    />
                    {errors.phnum && touched.phnum ? (
                      <Text style={styles.errorText}>{errors.phnum}</Text>
                    ) : null}

                    <Text style={styles.txt}>04. Email Address of the owner</Text>
                    <TextInput style={styles.textInput}
                      name="email"
                      placeholder="Email Address"

                      keyboardType='email-address'
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    ) : null}
                    <Text style={styles.txt}>05. Name of the Skipper</Text>
                    <TextInput style={styles.textInput}
                      onChangeText={handleChange('skippername')}
                      onBlur={handleBlur('skippername')}
                      value={values.skippername}
                    />
                    {errors.skippername && touched.skippername ? (
                      <Text style={styles.errorText}>{errors.skippername}</Text>
                    ) : null}

                    <Text style={styles.txt}>06. Skipper NIC Number</Text>
                    <TextInput style={styles.textInput}
                      onChangeText={handleChange('nic')}
                      onBlur={handleBlur('nic')}
                      value={values.nic}
                    />
                    {errors.nic && touched.nic ? (
                      <Text style={styles.errorText}>{errors.nic}</Text>
                    ) : null}

                    <Text style={styles.txt}>07. Skipper Number (Starts with SK or SL)</Text>
                    <TextInput style={styles.textInput}
                      onChangeText={handleChange('skippernum')}
                      onBlur={handleBlur('skippernum')}
                      value={values.skippernum}
                    />
                    {errors.skippernum && touched.skippernum ? (
                      <Text style={styles.errorText}>{errors.skippernum}</Text>
                    ) : null}

                  </View>

                </ProgressStep>

                <ProgressStep>
                  <View style={{ flexDirection: 'column', padding: 15 }}>
                    <Text style={styles.txt}>08. Port where the boat is expected to depart (select one from the list)</Text>

                    <View style={{ borderColor: '#bdc3c7', overflow: 'hidden', width: '100%' }}>
                        <Picker style={styles.picker}
                          mode='dropdown'
                          selectedValue={values.selectedPort}
                          onValueChange={handleChange('selectedPort')}
                          >
                          <Picker.Item label="Galle" value="galle" />
                          <Picker.Item label="Hambantota" value="hambantota" />
                          <Picker.Item label="Kirinda" value="kirinda" />
                          <Picker.Item label="Matara" value="matara" />
                          <Picker.Item label="Colombo" value="colombo" />
                          <Picker.Item label="Beruwala" value="beruwala" />
                          <Picker.Item label="Kalutara" value="kalutara" />
                        </Picker>
                      </View>

                    <View style={{ flexDirection: 'column', marginTop: 20 }}>
                      <Text style={styles.txt}>09. Fishing area during fishing operations</Text>

                       <RadioButton.Group
                        onValueChange={handleChange('fishingArea')}
                        value={values.fishingArea}>
                        <View style={{ flexDirection: 'row' }}>
                          <RadioButton color="#333C8D" value="indigenous sea" />
                          <Text style={styles.txt}>Indigenous Sea</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <RadioButton value="territorial sea" color="#333C8D" />
                          <Text style={styles.txt}>Territorial Sea</Text>
                        </View>
                      </RadioButton.Group>
                    </View>




                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.txt}>10. Description of the carrying device</Text>
                      <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.txt}>Length of {"\n"}Maruwela(Meter)</Text>
                          <TextInput style={styles.textInput}
                            keyboardType='numeric'
                            onChangeText={handleChange('mlength')}
                            onBlur={handleBlur('mlength')}
                            value={values.mlength}
                          />
                          {errors.mlength && touched.mlength ? (
                            <Text style={styles.errorText}>{errors.mlength}</Text>
                          ) : null}
                        </View>

                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.txt}>Number of thorns{"\n"}</Text>
                          <TextInput style={styles.textInput}
                            keyboardType='numeric'
                            onChangeText={handleChange('throns')}
                            onBlur={handleBlur('throns')}
                            value={values.throns}
                          />
                          {errors.throns && touched.throns ? (
                            <Text style={styles.errorText}>{errors.throns}</Text>
                          ) : null}
                        </View>

                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.txt}>Length of {"\n"}Caramel Net(KM)</Text>
                          <TextInput style={styles.textInput}
                            keyboardType='numeric'
                            onChangeText={handleChange('cnet')}
                            onBlur={handleBlur('cnet')}
                            value={values.cnet}
                          />
                          {errors.cnet && touched.cnet ? (
                            <Text style={styles.errorText}>{errors.cnet}</Text>
                          ) : null}
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.txt}>Eye Size (Inches){"\n"}</Text>
                          <TextInput style={styles.textInput}
                            keyboardType='numeric'
                            onChangeText={handleChange('ceye')}
                            onBlur={handleBlur('ceye')}
                            value={values.ceye}
                          />
                          {errors.ceye && touched.ceye ? (
                            <Text style={styles.errorText}>{errors.ceye}</Text>
                          ) : null}
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.txt}>Length of {"\n"}Netting  (Meter)</Text>
                          <TextInput style={styles.textInput}
                            keyboardType='numeric'
                            onChangeText={handleChange('netting')}
                            onBlur={handleBlur('netting')}
                            value={values.netting}
                          />
                          {errors.netting && touched.netting ? (
                            <Text style={styles.errorText}>{errors.netting}</Text>
                          ) : null}
                        </View>

                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.txt}>Eye Size (Inches){"\n"}</Text>
                          <TextInput style={styles.textInput}
                            keyboardType='numeric'
                            onChangeText={handleChange('neteye')}
                            onBlur={handleBlur('neteye')}
                            value={values.neteye}
                          />
                          {errors.neteye && touched.neteye ? (
                            <Text style={styles.errorText}>{errors.neteye}</Text>
                          ) : null}
                        </View>

                      </View>
                    </View>
                  </View>

                </ProgressStep>

                <ProgressStep>
                  <View style={{ padding: 15, }}>
                    <Text style={styles.txt}>11. Boat Traveler Details (Fill in the number of travelers only)</Text>
                    <View
                    style={{
                      //borderWidth: 1,
                      borderColor: '#333C8D',
                      borderRadius: 10,
                      padding: 5,
                      marginBottom: 10,
                    }}>
                    
                    <View>
                    <TravelerDetails childToParent={childToParent1} />

                    

                    </View>
                  </View>
                  <View>

                  <Text style={styles.txt}>12. Local Operating License Number of the Vessel</Text>
                                        <TextInput style={styles.textInput}
                                            onChangeText={handleChange('llicense')}
                                            onBlur={handleBlur('llicense')}
                                            value={values.llicense}
                                        />
                                        {errors.llicense && touched.llicense ? (
                                            <Text style={styles.errorText}>{errors.llicense}</Text>
                                        ) : null}
                                        <Text style={styles.txt}>13. International Operating License Number of the Vessel (If any)</Text>
                                        <TextInput style={styles.textInput}
                                            onChangeText={handleChange('ilicense')}
                                            onBlur={handleBlur('ilicense')}
                                            value={values.ilicense}
                                        />
                                        {errors.ilicense && touched.ilicense ? (
                                            <Text style={styles.errorText}>{errors.ilicense}</Text>
                                        ) : null}

                   </View>

                    <Text style={styles.txt}>14. Radio station and code addressed by the Vessel</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ borderColor: '#bdc3c7', overflow: 'hidden', width: 200 }}>
                        <Picker style={styles.picker}
                          mode='dropdown'
                          selectedValue={values.selectedStation}
                          onValueChange={handleChange('selectedStation')}>

                          <Picker.Item label="Galle" value="galle" />
                          <Picker.Item label="Hambantota" value="hambantota" />
                          <Picker.Item label="Kirinda" value="kirinda" />
                          <Picker.Item label="Matara" value="matara" />
                          <Picker.Item label="Colombo" value="colombo" />
                          <Picker.Item label="Beruwala" value="beruwala" />
                          <Picker.Item label="Kalutara" value="kalutara" />
                        </Picker>
                      </View>
                      <View style={{ borderColor: '#bdc3c7', overflow: 'hidden', width: 150 }}>

                        <Picker style={styles.picker}
                          mode='dropdown'
                          selectedValue={values.selectedCode}
                          onValueChange={handleChange('selectedCode')
                          }>
                          <Picker.Item label="4096.0Hz" value="4096hz" />
                          <Picker.Item label="1024.0Hz" value="1024hz" />
                          <Picker.Item label="8192.0Hz" value="8192hz" />

                        </Picker>
                      </View>

                    </View>
                    <View style={{ flexDirection: 'column', marginTop: 20, }}>
                      <Text style={styles.txt}>15. I have a VMS device on board and to the best of my knowledge it is in working condition.</Text>

                      <RadioButton.Group
                        onValueChange={handleChange('vmsStatus')}
                        value={values.vmsStatus}>
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

                  </View>

                </ProgressStep>

                <ProgressStep
                  onSubmit={handleSubmit}
                  disabled={!isValid}>
                  <View style={{ padding: 15, marginTop: 10 }}>

                    <Text style={styles.txt}>16. I will not take on this boat any of my boat's registration book, operating license, valid insurance certificate, log book, fire extinguishers, radio with call sign, life jacket, life-saving equipment, or any other means of disembarkation. I hereby promise that I will not be taken on board and will not engage in any activity that is detrimental to national security or the health of the people of the country.</Text>
                    <View style={styles.checkBox}>
                      <Checkbox

                        status={agree ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setAgree(!agree);
                        }}
                        color={'#333C8D'}


                      />
                      <Text style={styles.label}>I Agree</Text>
                    </View>
                    <Text style={styles.txt}>17. Click the button below to request the transit (check if you get a message that says 'successfully forwarded' after pressing that button).</Text>
                  </View>
                 


                  <View style={{marginTop:180}}>
                <Text style={styles.text1}>{networkConn}</Text>
                <Text style={styles.text1}>{synched}</Text>
                <Text style={styles.text1}>{data}</Text>
                

            </View>
                </ProgressStep>
                
              </ProgressSteps>
              
            </View>
          </View>
        </View>

      )}
    </Formik>
  )
};
export default DepartureApprovalScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333C8D'

  },

  text1: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    
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
  picker: {
    backgroundColor: '#333C8D',
    margin: 5,
    height: 50,
    justifyContent: 'center'

  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#333C8D',
    fontSize: 16,
    marginBottom: 15,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: "white",
    //padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 50,
    shadowRadius: 5,
  },
  inputSearch: {
    paddingLeft: 10,
    height: 44,
    flex: 1
  },
  txt: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 5,
    color: '#333C8D',
    marginBottom: 15,
    textAlign: 'justify'
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
  errorText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'right'
  },
});