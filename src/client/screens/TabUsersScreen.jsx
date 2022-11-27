import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, View, Text } from 'react-native';

import Job from '../components/Job';
import { Gallery } from '../components/Gallery';
import { getNumberFromPercent } from '../../support-features/supportFunctions';

const getAllUrl = 'http://localhost:7000/api/user/getall'

export default function TabJobsScreen() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(getDataFromServer());//placeholder for now
  }, []);

  function getDataFromServer() {
    axios.get(getAllUrl)
      .then(function (response) {
        // console.log(response.data);
        setUsers([...response.data])
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
        return <View style={styles.userBlock}>
          <Text>{el}</Text>
        </View>
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
  preview: {
    margin: '1%',
    height: 100,
    width: 100,
    backgroundColor: 'white',
    zIndex: 2,
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