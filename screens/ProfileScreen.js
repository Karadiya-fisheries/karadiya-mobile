import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
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
      <StatusBar translucent backgroundColor="transparent" />


      <Portal.Host>
        <Modal
          visible={visible}
          onDismiss={hideMore}
          contentContainerStyle={styles.more}>
          <Card>
            <List.Item title="Settings" />
            <List.Item title="Share" />
            <List.Item title="Edit Profile" />
          </Card>
        </Modal>
      </Portal.Host>
      <Avatar.Image
        size={120}
        source={user.profileUrl}
        style={styles.avatar}
      />
      <View style={styles.surface}>
        <View style={{ top: '23%' }}>
          <View style={{ alignItems: 'center' }}>
            <Headline style={styles.name}>{user.fullname}</Headline>
            <Subheading>{user.email}</Subheading>
          </View>
          <Divider />
          <View style={styles.detail}>
            <Paragraph style={styles.detail}>
              Phone Number: {user.phone}
            </Paragraph>
            <Divider />
            <Paragraph style={styles.detail}>NIC : {user.nic}</Paragraph>
            <Divider />
            <Paragraph style={styles.detail}>Boat License : { }</Paragraph>
            <Divider />
            <Paragraph style={styles.detail}>Gear type : { }</Paragraph>
            <Divider />
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
    position: 'absolute',
    bottom: 0,
    height: '70%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#d3d9f0',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 120,
    zIndex: 0,
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
});
