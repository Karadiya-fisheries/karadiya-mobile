import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView, SectionList, StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import authService from '../service/auth.service';

function ProfileScreen({navigation}) {
  const [user, setUser] = useState({});
  useEffect(() => {
    authService.getCurrentUser().then(res => {
      setUser(JSON.parse(res));
    });
  }, []);

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
  ];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Profile Screen</Text>
      </View>
      <SafeAreaView style={{flex: 5}}>
        <SectionList
          style={{borderWidth: 2, borderRadius: 5, borderColor: '#41484e'}}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item title={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.list_header}>{title}</Text>
          )}
        />
      </SafeAreaView>
      <View style={styles.footer}>
        <View style={styles.styleHomeBtn}>
          <Button
            color="black"
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
            Back to Home
          </Button>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  styleHomeBtn: {
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#41484e', //button background/border color
    overflow: 'hidden',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#333C8D',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    justifyContent: 'center',
    color: 'rgb(126, 126, 126)',
    fontWeight: 'bold',
    padding: 20,
    fontSize: 40,
  },
  Button: {
    color: 'red',
    fontStyle: 'italic',
  },
  footer: {
    flex: 1,
    backgroundColor: '#88abce',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 100,
    paddingHorizontal: 60,
    paddingVertical: 10,
    color: 'red',
  },
  text_footer: {
    color: 'rgb(214, 236, 245)',
    fontSize: 18,
  },
  list_header: {
    fontSize: 20,
    backgroundColor: '#fff',
    paddingTop: 5,
    margin: 3,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
  },
});
