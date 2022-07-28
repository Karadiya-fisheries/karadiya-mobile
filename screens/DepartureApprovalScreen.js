import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const DepartureApprovalScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Departure Approval Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default DepartureApprovalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
