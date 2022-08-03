import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions, ScrollView } from 'react-native';




function NavigationScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Text style={styles.headTitle1}>Navigation</Text>


      </View>
      <View style={styles.footer}>
        <ScrollView>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SetWayPoint')}
              style={styles.button}>
              <Text style={styles.btnText}>Way Point</Text>

            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ManOverBoard')}
              style={styles.button}>
              <Text style={styles.btnText}>Man Over Board</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Compass')}
              style={styles.button}>
              <Text style={styles.btnText}>Compass</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Forcasting')}
              style={styles.button}>
              <Text style={styles.btnText}>Forcasting</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

      </View>

    </View>
  );
}

export default NavigationScreen;

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
    marginTop: 40,
  },

  button: {
    flex: 0.8,
    borderColor: '#333C8D',
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    height: 80,
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: '#333C8D',
  },
  imageContainer: {
    width: height_logo,
    height: height_logo,
    marginTop: 12,
  },
  icon: {
    height: 50,
    marginBottom: 5,
    marginTop: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
  },




});