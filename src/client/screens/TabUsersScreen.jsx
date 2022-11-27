import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, View, Text } from 'react-native';

import User from '../components/User';

const getAllUrl = 'http://localhost:7000/api/user/getall'

export default function TabUsersScreen() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(getDataFromServer());//placeholder for now
  }, []);

  function getDataFromServer() {
    axios.get(getAllUrl)
      .then(function (response) {
        setUsers([...response.data])
        console.log('data done loading');
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  if (!users) return <Text>Загрузка...</Text>;
  console.log(users)
  return (
    <View style={styles.container}>
      {users.map((el) => {
        // return el.name
        return <User key={el.id} user={el} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userBlock: {
    margin: '1%',
    height: 100,
    width: 100,
  },
  img: {
    height: 'inherit',
    flexDirection: 'row',
    width: 'inherit',
    zIndex: 101,

  },
  imgList: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});