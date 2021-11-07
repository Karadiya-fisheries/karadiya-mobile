import * as React from 'react';
import {View, Text, button, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import authService from '../service/auth.service';

function ProfileScreen({navigation}) {
  const user = authService.getCurrentUser();
  console.log(user.accessToken);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Profile Screen</Text>
        <View>
          <Text></Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.styleHomeBtn}>
          <Button
            color="black"
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
            Back to Home
          </Button>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  styleHomeBtn: {
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#41484e', //button background/border color
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
    backgroundColor: '#88abce',
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
