import * as React from 'react';
import {View, Text, button, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import authService from '../service/auth.service';

function ProfileScreen({navigation}) {
  const user = authService.getCurrentUser();
  console.log(user);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Profile Screen</Text>
      </View>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          Back to Home
        </Button>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333C8D',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
