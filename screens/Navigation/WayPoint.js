import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WayPoint = () => {
    return (
        <View style={styles.container}>
            <Text>WayPoint</Text>
            <Button
                title="WayPoint"
                onPress={() => alert('Button WayPoint!')}
            />
        </View>
    );
};

export default WayPoint;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});