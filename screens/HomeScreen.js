
import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox } from 'react-native-paper';



const HomeScreen = ({ navigation }) => {


    return (

        <View style={styles.rowContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('FishermanRegScreen')}
            >
                <Text style={styles.textSign}>Fisherman Registration </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('DepatureScreen')}
            >
                <Text style={styles.textSign}>Departure Approval</Text>
            </TouchableOpacity>
        </View>






    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333C8D'

    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#333C8D',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        flexDirection: "column-reverse",
        marginTop: 50,
        backgroundColor: '#333C8D',
        padding: 10,
        width: "50%",
        alignItems: "center",
        borderRadius: 20,

    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    },
    titleLeft: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    titleCenter: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    checkboxContainer: {
        flexDirection: "row",
        height: 50,

    },

    label: {
        marginTop: 8.5,
        color: '#333C8D',
        marginRight: 5,
    },
    forgot_button: {

        marginLeft: 140,
        color: '#333C8D',
        marginTop: 8.5,

    },
    rowContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

});