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
import { Button } from 'react-native-paper';
import { AuthContext } from '../components/context';

function HomeScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <View>
          <Image
            style={styles.imageContainer}
            source={require('../assets/fishing.png')}
            resizeMode="stretch"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Fisherman-Registration')}
              style={styles.button}>
              <Text>Fisherman</Text>
              <Text>Registration</Text>
              <Image
                style={styles.icon}
                source={require('../assets/fishermanReg.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('E-logBook')}
              style={styles.button}>
              <Text>E log</Text>
              <Text>Book</Text>
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
              <Text>Navigation</Text>
              <Image
                style={styles.icon}
                source={require('../assets/navigation.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Prediction')}
              style={styles.button}>
              <Text>Prediction</Text>
              <Image
                style={styles.icon}
                source={require('../assets/prediction.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Boat-Registration')}
              style={styles.button}>
              <Text>Boat</Text>
              <Text>Registration</Text>
              <Image
                style={styles.icon}
                source={require('../assets/BoatReg.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Departure-Approval')}
              style={styles.button}>
              <Text>Departure</Text>
              <Text>Approval</Text>
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
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#333C8D',
    borderWidth: 5,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderColor: '#333C8D',
    borderWidth: 5,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    marginTop: 30,
  },

  button: {
    flex: 1,
    borderColor: '#333C8D',
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    height: 100,
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
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#333C8D',
    textAlign: 'center'

  },

  icon: {
    height: 50,
    marginBottom: 5,
    marginTop: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
});
