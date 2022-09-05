import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput } from 'react-native';
import {
  Button,
  Divider,
  Paragraph,
  Portal,
  Subheading,
} from 'react-native-paper';
import authService from '../service/auth.service';
import {
  Avatar,
  Title,
  List,
  Headline,
  Appbar,
  Card,
  Modal,
  Surface,
  Image
} from 'react-native-paper';
import { Subheader } from 'react-native-paper/lib/typescript/components/List/List';

function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    authService.getCurrentUser().then(res => {
      setUser(JSON.parse(res));
    });
  }, []);
  console.log(user);
  console.log("url :" + user.profileUrl);
  const DATA = [
    {
      title: 'Full Name',
      data: [user.fullname],
    },
    {
      title: 'E-Mail',
      data: [user.email],
    },
    {
      title: 'Phone/Tel',
      data: [user.phone],
    },
    {
      title: 'userToken',
      data: [user.accessToken],
    },
    {
      title: 'profileUrl',
      data: [user.profileURL],
    },
  ];

  const _handleMore = function () {
    setVisible(true);
  };

  const hideMore = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={200}
        source={{ uri: user.profileUrl }}
        style={styles.avatar}
      />
      <View style={styles.surface}>
        <View style={{ top: '10%', flex: 1, paddingBottom: 100, paddingTop: 50 }}>
          <View style={{ flexDirection: 'column', marginTop: 10, flex: 1 }}>

            <Text style={styles.txt}>Name</Text>
            <View style={{ alignItems: 'center' }}>
              <TextInput style={styles.textInput}
                //onChangeText={handleChange('imul')}
                //onBlur={handleBlur('imul')}
                value={user.fullname}
              />

            </View>

          </View>
          <View style={{ flexDirection: 'column', marginTop: 10, flex: 1 }}>

            <Text style={styles.txt}>Email</Text>
            <View style={{ alignItems: 'center' }}>
              <TextInput style={styles.textInput}
                //onChangeText={handleChange('imul')}
                //onBlur={handleBlur('imul')}
                value={user.email}
              />

            </View>


          </View>
          <View style={{ flexDirection: 'column', marginTop: 10, flex: 1 }}>

            <Text style={styles.txt}>Phone Number</Text>
            <View style={{ alignItems: 'center' }}>
              <TextInput style={styles.textInput}
                //onChangeText={handleChange('imul')}
                //onBlur={handleBlur('imul')}
                value={user.phone}
              />

            </View>


          </View>

          <View style={{ flexDirection: 'column', marginTop: 10, flex: 1 }}>

            <Text style={styles.txt}>Role</Text>
            <View style={{ alignItems: 'center' }}>
              <TextInput style={styles.textInput}
                //onChangeText={handleChange('imul')}
                //onBlur={handleBlur('imul')}
                value={user.roles}
              />

            </View>


          </View>


        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333C8D',
    position: 'relative',
  },
  text_header: {
    fontFamily: 'Roboto Condensed',
    fontStyle: 'normal',
    fontweight: 'bold',
    fontSize: 36,
    lineHeight: 42,
    color: '#FFFFFF',
  },
  more: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '40%',
    height: '20%',
    backgroundColor: '#fff',
    elevation: 4,
    zIndex: 1,
  },
  surface: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    height: '70%',
    width: '100%',
    backgroundColor: '#d3d9f0',
    paddingBottom: 50,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 120,

  },
  avatar: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    borderColor: '#0b1647',
    borderWidth: 3,
    zIndex: 1,
  },
  name: {
    marginTop: 3,
    fontFamily: 'Roboto Condensed',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 28,
    fontweight: 'bold'
  },
  detail: {
    margin: 5,
    fontFamily: 'Roboto Condensed',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 21,
    textDecorationColor: '#2B6ED3',
  },
  textInput: {

    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#333C8D',
    fontSize: 16,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 20,
    width: "80%",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 50,
    shadowRadius: 5,

  },
  txt: {
    fontSize: 18,
    paddingTop: 0,
    paddingLeft: 5,
    color: '#333C8D',
    marginBottom: 25,
    textAlign: 'justify',
    marginLeft: 40,
    fontWeight: 'bold',

  },
});
