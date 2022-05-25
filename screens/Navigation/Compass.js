import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Compass = () => {
    return (
        <View style={styles.container}>
            <Text>Compass</Text>
            <Button
                title="Compass"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default Compass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});