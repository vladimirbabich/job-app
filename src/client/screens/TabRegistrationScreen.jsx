import React, { useState, useRef } from 'react';
import { Pressable, View, Text, StyleSheet, Alert, TextInput } from 'react-native';


export default function TabRegistrationScreen() {
  const refName = useRef('');
  const refPhone = useRef('');
  const refEmail = useRef('');


  const signUp = (e) => {
    console.dir([refName.current.value, refPhone.current.value, refEmail.current.value]);
    if (refName.current.value == '') {
      Alert.alert('Ошибка', 'Поле "ФИО" пустое');
      // console.log('Поле "ФИО" пустое');
      return;
    }
    if (refPhone.current.value == '') {
      Alert.alert('Ошибка', 'Поле "Номер телефона" пустое');
      // console.log('Поле "ФИО" пустое');
      return;
    }
    //if not empty - look at database for that name,phone,email. if same data not found - put in DB and log in into app
    //some axios request
    //if axios return 'true' data - log in
    //if not - error, this email or phone already registered
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Пройдите регистрацию, чтобы найти клиентов или исполнителей:</Text>
      <View style={styles.wrapper}>
        <Text style={styles.label}>ФИО</Text>
        <Text style={styles.necessary}>*</Text>
      </View>
      <TextInput style={styles.input}
        ref={refName}
        placeholder=""
      />
      <View style={styles.wrapper}>
        <Text style={styles.label}>Номер телефона</Text>
        <Text style={styles.necessary}>*</Text>
      </View>
      <TextInput style={styles.input}
        ref={refPhone}
        placeholder=""
      />
      <View style={styles.wrapper}>
        <Text style={styles.label}>Электронная почта</Text>
      </View>
      <TextInput style={styles.input}
        ref={refEmail}
        placeholder=""
      />
      <Pressable style={styles.btn} onPress={signUp}>
        <Text style={styles.btnTxt}>Зарегистрироваться</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edede9',
    padding: '1%',
    paddingTop: '5%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    width: '65%',
    fontWeight: 'bold',
  },
  wrapper: {
    padding: '1%',
    flexDirection: 'row',
  },
  label: {
    fontSize: 20,
  },
  input: {
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 1,
  },
  necessary: {
    fontSize: 20,
    color: 'red',
  },
  btn: {
    marginTop: '2%',
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: '#8ecae6',
    width: '60%',
    height: '5%',
  },
  btnTxt: {
    fontSize: 20,
    margin: 'auto',

  },
});
