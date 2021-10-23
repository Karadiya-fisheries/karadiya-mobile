import * as React from 'react';
import { View, Text ,button } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../components/context';




function HomeScreen() {

  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={()=> {signOut()}}>Sign Out</Button>

    </View>

  );
}

export default HomeScreen;

