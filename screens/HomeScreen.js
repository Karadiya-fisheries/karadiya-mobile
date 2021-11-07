import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {AuthContext} from '../components/context';

function HomeScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Home Screen</Text>
        <View style={styles.styleLoginBtn}>
          <Button
            color="black" //button color
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}
            title="Profile"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          style={styles.Button}
          onPress={() => {
            signOut();
          }}
          title="Sign out"
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  styleLoginBtn: {
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'white', //button background/border color
    overflow: 'hidden',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#333C8D',
  },
  header: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    flex: 4,
    justifyContent: 'center',
    color: 'rgb(126, 126, 126)',
    fontWeight: 'bold',
    padding: 20,
    fontSize: 40,
  },
  Button: {
    color: 'red',
    fontStyle: 'italic',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 100,
    paddingHorizontal: 60,
    paddingVertical: 70,
    color: 'red',
  },
  text_footer: {
    color: 'rgb(214, 236, 245)',
    fontSize: 18,
  },
});
