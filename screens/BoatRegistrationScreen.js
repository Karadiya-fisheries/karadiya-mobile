import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BoatRegistrationScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Boat Registration Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default BoatRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});