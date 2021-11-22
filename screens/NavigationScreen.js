import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const NavigationScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Navigation Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default NavigationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});