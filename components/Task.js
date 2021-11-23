import React from "react";
import { View,Text,StyleSheet,TouchableOpacity} from "react-native";



const Task=(props)=>{

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.square}><Text style={styles.itemText}>X</Text></View>
                <Text style={styles.itemText}>{props.text3}</Text>
                <Text style={styles.itemText}>{props.text1}</Text>
                <Text style={styles.itemText}>{props.text2}</Text>
                
            </View>
            
        </View>
    )


}

const styles = StyleSheet.create({

    item:{
       backgroundColor:'#FFF',
       padding:15,
       borderRadius:20,
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between',
       marginBottom:10,
       borderColor:'black',
       borderWidth:1,
       marginLeft:5,
       marginRight:5,
       shadowColor:'black',
       marginTop:10,


    },
    itemLeft:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
    },

    square:{
       width:24,
       height:24, 
       backgroundColor:'#55BCF6',
       opacity:8.4,
       borderRadius:5,
       marginRight:15,


    },

    itemText:{
        maxWidth:'80%',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:20,

    },

  

});

export default Task;