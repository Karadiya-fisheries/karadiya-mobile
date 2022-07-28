import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Formik} from 'formik';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import TaskContainer from '../components/TaskContainer';
import FishCatchContainer from '../components/FIshCatchContainer';

class ElogBook extends Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    header: null,
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  onNextStep = () => {
    console.log('called next step');
  };

  onPrevStep = () => {
    console.log('called previous step');
  };

  onSubmitSteps = () => {
    console.log('called on submit step.');
  };

  setSelectedLanguage = Item => {
    console.log(Item);
  };

  render() {
    const progressStepsStyle = {
      activeStepIconBorderColor: '#333C8D',
      activeLabelColor: '#333C8D',
      activeStepNumColor: 'white',
      activeStepIconColor: '#333C8D',
      completedStepIconColor: '#333C8D',
      completedProgressBarColor: '#333C8D',
      completedCheckColor: 'white',
      disabledStepIconColor: '#AEBEE8',
    };

    const buttonTextStyle = {
      color: '#333C8D',
      fontWeight: 'bold',
    };

    return (
      <View style={{flex: 1, marginTop: 50}}>
        <Formik
          initialValues={{
            email: '',
            age: '',
            WesselID: '',
            SkipperID: '',
            Harbor: '',
            DepartureDate: '',
            DepartureTime: '',
            GearType: '',
            MainLine: '',
            BranchLine: '',
            HookTypes: '',
            Depth: '',
            Bait: '',
            FishingDate: '',
            FishingTime: '',
          }}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <ProgressSteps {...progressStepsStyle}>
              <ProgressStep
                label="First"
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}
                scrollable={true}>
                <View style={{alignItems: 'center', flex: 1}}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Wessel ID</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('WesselID')}
                      onBlur={handleBlur('WesselID')}
                      value={values.WesselID}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Skipper ID</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('SkipperID')}
                      onBlur={handleBlur('SkipperID')}
                      value={values.SkipperID}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Departure Harbor</Text>

                    <Picker
                      mode="dropdown"
                      style={styles.pickerStyle}
                      selectedValue={values.Harbor}
                      onValueChange={handleChange('Harbor')}>
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

                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Departure Date</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('DepartureDate')}
                      onBlur={handleBlur('DepartureDate')}
                      value={values.DepartureDate}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Departure Time</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('DepartureTime')}
                      onBlur={handleBlur('DepartureTime')}
                      value={values.DepartureTime}
                    />
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                label="Second"
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}>
                <View style={{alignItems: 'center', flex: 1}}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Gear Type</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('GearType')}
                      onBlur={handleBlur('GearType')}
                      value={values.GearType}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Main Line</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('MainLine')}
                      onBlur={handleBlur('MainLine')}
                      value={values.MainLine}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Branch Line</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('BranchLine')}
                      onBlur={handleBlur('BranchLine')}
                      value={values.BranchLine}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Hook Types</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('HookTypes')}
                      onBlur={handleBlur('HookTypes')}
                      value={values.HookTypes}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Depth</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('Depth')}
                      onBlur={handleBlur('Depth')}
                      value={values.Depth}
                    />
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={styles.label}>Bait</Text>

                    <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('Bait')}
                      onBlur={handleBlur('Bait')}
                      value={values.Bait}
                    />
                  </View>
                </View>
              </ProgressStep>
              <ProgressStep
                label="Third"
                onNext={this.onNextStep}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}>
                <View style={styles.rowContainer}>
                  <Text style={styles.label}>Fishing Date</Text>

                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('FishingDate')}
                    onBlur={handleBlur('FishingDate')}
                    value={values.FishingDate}
                  />
                </View>

                <View style={styles.rowContainer}>
                  <Text style={styles.label}>Fishing Time</Text>

                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange('FishingTime')}
                    onBlur={handleBlur('FishingTime')}
                    value={values.FishingTime}
                  />
                </View>
                <View>
                  <TaskContainer />
                </View>
              </ProgressStep>
              <ProgressStep
                label="Fourth"
                onSubmit={handleSubmit}
                onPrevious={this.onPrevStep}
                scrollViewProps={this.defaultScrollViewProps}
                nextBtnTextStyle={buttonTextStyle}
                previousBtnTextStyle={buttonTextStyle}>
                <FishCatchContainer />
              </ProgressStep>
            </ProgressSteps>
          )}
        </Formik>
      </View>
    );
  }
}

export default ElogBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  textInput: {
    flex: 2,
    height: 30,
    marginRight: 15,
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },

  label: {
    flex: 1,
    width: '50%',
    marginLeft: 15,
    color: '#333C8D',
    fontWeight: 'bold',
    fontSize: 15,
  },
  pickerStyle: {
    marginRight: 15,
    height: 10,
    width: '60%',
    color: '#333C8D',
    fontWeight: 'bold',
  },

  cordinateContainer: {
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    height: 400,
    backgroundColor: '#EEECEB',
  },

  button: {
    flexDirection: 'row-reverse',
    backgroundColor: '#333C8D',
    padding: 10,
    borderRadius: 20,
    width: '40%',
    margin: 10,
    alignItems: 'center',
  },
  textADD: {
    color: 'white',
    alignContent: 'center',
    alignContent: 'center',
  },
  items: {
    marginTop: 30,
  },
});
