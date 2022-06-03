import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ManOverBoard = () => {
    return (
        <View style={styles.container}>
            <Text>ManOverBoard</Text>
            <Button
                title="ManOverBoard"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default ManOverBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});