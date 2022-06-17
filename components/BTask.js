import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";



const RTask = (bdetails) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.itemText}>Name   :   {bdetails.txt3}</Text>
                <Text style={styles.itemText}>NIC        :   {bdetails.txt4}</Text>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({

    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderColor: '#333C8D',
        borderWidth: 1,
        shadowColor: 'black',
        marginTop: 10,


    },
    itemLeft: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },

    itemText: {
        alignItems: 'center',
        color: '#333C8D',
        margin: 10,
        fontSize: 16,



    },



});

export default RTask;