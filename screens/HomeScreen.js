import * as React from 'react';
import {
  View,
  Text,
  button,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { Button } from 'react-native-paper';
import { AuthContext } from '../components/context';
import WelcomeScreen from '../components/WelcomeScreen';
import Warning from '../components/warning';

function HomeScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <View>
          <WelcomeScreen />
        </View>
      </View>
      <View style={styles.footer}>

        <ScrollView>
          <View style={styles.rowContainer}>
            <Warning />
          </View>
          <View style={styles.rowContainer}>

            <TouchableOpacity
              onPress={() => navigation.navigate('Fisherman-Registration')}
              style={styles.button}>
              <Text style={styles.btnText}>Fisherman Registration</Text>

              <Image
                style={styles.icon}
                source={require('../assets/fishermanReg.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('E-logBook')}
              style={styles.button}>
              <Text style={styles.btnText}>E-log Book</Text>

              <Image
                style={styles.icon}
                source={require('../assets/Ebook.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Navigation')}
              style={styles.button}>
              <Text style={styles.btnText}>Navigation</Text>

              <Image
                style={styles.icon}
                source={require('../assets/navigation.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Prediction')}
              style={styles.button}>
              <Text style={styles.btnText}>Prediction</Text>

              <Image
                style={styles.icon}
                source={require('../assets/prediction.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('NoticesScreen')}
              style={styles.button}>
              <Text style={styles.btnText}>Notice</Text>
              <Image
                style={styles.icon}
                source={require('../assets/notice.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Departure-Approval')}
              style={styles.button}>

              <Text style={styles.btnText}>Departure Approval</Text>

              <Image
                style={styles.icon}
                source={require('../assets/departure.png')}
                resizeMode="stretch"
              />

            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default HomeScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.4;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#333C8D',
    borderColor: '#333C8D',
    borderWidth: 5,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333C8D',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#333C8D',
    borderWidth: 5,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 20,
  },

  button: {
    //flex: 1,
    borderColor: '#333C8D',
    borderWidth: 5,
    borderRadius: 10,
    width: 130,
    alignItems: 'center',
    height: 130,
    fontWeight: 'bold',
    fontSize: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
  },
  btnText: {
    flex: 2,
    marginTop: 10,
    marginBottom: 0,
    fontSize: RFPercentage(2.3),
    fontWeight: 'bold',
    color: '#333C8D',
    textAlign: 'center'

  },

  icon: {
    flex: 3,
    height: height_logo * 0.2,
    //width: height_logo * 0.4,
    marginBottom: 15,
    //marginTop: 10,
    alignContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
});
