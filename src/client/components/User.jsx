import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, TouchableOpacity, TextInput, View, Text } from 'react-native';
import generalStyles from '../../../generalStyles';
import { CustomButton } from './CustomButton';

export default function User(props) {
  console.log(props)
  const { user } = props;
  return (<View style={styles.user}>
    <View style={styles.leftSide}>
      <View style={styles.avatar}>
        {/* <Image style={styles.img}></Image> */}
      </View>
      <CustomButton
        title='Предложить работу'
        btnStyle={generalStyles.btn}
        textStyle={generalStyles.btnTxt}
        callback={() => { console.log('propose') }} />
      <CustomButton
        title='Узнать подробнее'
        btnStyle={generalStyles.btn}
        textStyle={generalStyles.btnTxt}
        callback={() => { console.log('about') }} />
    </View>
    <View style={styles.main}>
      <View style={styles.head}>
        <Text style={styles.texts}>{user.name}</Text>
        <Text style={styles.texts}>*{user.avgRating}</Text>
      </View>
      <Text style={styles.texts}>Выполнено заказов: 0</Text>
      <Text style={styles.texts}>Навыки:</Text>
      {/* skillsBOX */}
    </View>
    <Text>{props.user.name}</Text>
  </View>);
}


const styles = StyleSheet.create({
  user: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftSide: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  avatar: {},
  img: {},
  main: {},
  head: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});