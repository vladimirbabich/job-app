import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, Alert, TextInput } from 'react-native';


export default function TabRegistrationScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');


  const signUp = (e) => {
    console.log(name);
    if (name == '') {
      Alert.alert('Ошибка', 'Поле "ФИО" пустое');
      // alert('Поле "ФИО" пустое');
      
      return;
    }
    if (phone == '') {
      Alert.alert('Ошибка', 'Поле "Номер телефона" пустое');
      return;
    }
    //if not empty - look at database for that name,phone,email. if no same fields - put in DB and log in into app

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Пройдите регистрацию, чтобы найти клиентов или исполнителей:</Text>
      <View style={styles.wrapper}>
        <Text style={styles.label}>ФИО</Text>
        <Text style={styles.necessery}>*</Text>
      </View>
      <TextInput style={styles.input}
        onChange={(e) => { setName(e.target.value) }}
        value={name}
        placeholder=""
      />
      <View style={styles.wrapper}>
        <Text style={styles.label}>Номер телефона</Text>
        <Text style={styles.necessery}>*</Text>
      </View>
      <TextInput style={styles.input}
        onChange={(e) => { setPhone(e.target.value) }}
        value={phone}
        placeholder=""
      />
      <View style={styles.wrapper}>
        <Text style={styles.label}>Электронная почта</Text>
      </View>
      <TextInput style={styles.input}
        onChange={(e) => { setEmail(e.target.value) }}
        value={email}
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
    width:'65%',
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
  necessery: {
    fontSize: 20,
    color: 'red',
  },
  btn: {
    marginTop:'2%',
    borderWidth: 1,
    textAlign:'center',
    backgroundColor: '#8ecae6',
    width: '60%',
    height:'5%',
  },
  btnTxt: {
    fontSize: 20,
    margin:'auto',
    
  },
});
