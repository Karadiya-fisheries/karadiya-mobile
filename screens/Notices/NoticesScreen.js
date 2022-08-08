import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Dimensions, ScrollView } from 'react-native';
import NoticeService from '../../service/notice.service';
import AsyncStorage from '@react-native-async-storage/async-storage';


function NoticesScreen({ navigation }) {

  const [post, setPost] = useState([]);

  useEffect(() => {
    NoticeService.getNotices().then((notices) => {
      const posts = notices.data.map((notice) => ({
        id: notice.NoticeId,
        cover: notice.NoticeCover,
        title: notice.NoticeTitle,
        view: notice.NoticeView,
        text: notice.NoticeText,
        cat: notice.NoticeCat,
        createdAt: notice.createdAt,
        author: {
          name: notice.user.fullname,
          avatarUrl: notice.user.profileUrl,
        },
      }));
      storeData(posts);

      getData();

    });
  }, []);

  const storeData = async (post) => {
    try {
      const jsonValue = JSON.stringify(post)
      //console.log("after:" + jsonValue);
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e);
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      console.log("get:" + jsonValue + "end");
      setPost(jsonValue != null ? JSON.parse(jsonValue) : null);

    } catch (e) {
      console.log(e);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Text style={styles.headTitle1}>Important Notices</Text>


      </View>
      <View style={styles.footer}>
        <ScrollView>


          {
            post.map((post, index) => {
              return (
                <View style={styles.rowContainer}>

                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('Notice', {
                        post: post,

                      })
                    }
                    style={styles.button}>
                    <Text style={styles.btnText}>{post.title}</Text>
                  </TouchableOpacity>

                </View>

              )
            })
          }







        </ScrollView>

      </View >

    </View >
  );
}

export default NoticesScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333C8D'

  },
  header: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,

  },

  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderBottomRightRadius: 100,
    paddingHorizontal: 20,
    justifyContent: 'space-between',

  },

  headTitle1: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  button: {
    flex: 0.9,
    borderColor: '#333C8D',
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    height: '100%',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: '#333C8D',
  },

  btnText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    fontWeight: 'bold',
  },




});