import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';






const PredictionScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
    return (
      <View style={styles.container}>
        <Text>Prediction Screen</Text>
        <Picker style={styles.pickerStyle}  
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
};

export default PredictionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },


  pickerStyle:{  
    height: 150,  
    width: "80%",  
    color: '#344953',  
    justifyContent: 'center',  
}  ,
});