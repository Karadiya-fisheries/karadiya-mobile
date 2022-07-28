import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const FishermanRegistration = () => {
  return (
    <View style={styles.container}>
      <Text>Fisherman Registration</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default FishermanRegistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
