import React, { useState, useRef, useContext } from 'react';
import { SecureStore } from 'expo';
import { Pressable, ScrollView, SafeAreaView, View, Text, TextArea, StyleSheet, Alert, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { GlobalContext } from '../../../App';
import { CustomButton } from '../components/CustomButton';
const regUrl = 'http://localhost:7000/api/user/registration'
const cssWidth = '95%';

export default function TabRegistrationScreen() {
  const refName = useRef();
  const refPhone = useRef();
  const refEmail = useRef();
  const refPass = useRef();
  const refAbout = useRef();
  let photo = undefined;
  let jwtToken = useContext(GlobalContext);
  console.log(jwtToken)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: false,
    });

    if (!result.cancelled) {
      console.log('%c' + result, 'color:red');
      console.log(result);
      photo = result.uri;
    }
  };

  const checkFieldValues = (name, phone, pass) => {
    console.dir([name, phone, pass]);
    if (name == '') {
      Alert.alert('Ошибка', 'Поле "ФИО" пустое');
      console.log('Поле "ФИО" должно быть заполнено');
      console.log(refName.current.value);
      return false;
    }
    if (phone == '') {
      Alert.alert('Ошибка', 'Поле "Номер телефона" пустое');
      console.log('Поле "Номер телефона" должно быть заполнено');
      return false;
    }
    if (pass == '') {
      Alert.alert('Ошибка', 'Поле "Пароль" должно быть заполнено');
      console.log('Поле "Пароль" должно быть заполнено');
      return false;
    }
    return true;
  }

  const handleClickSignUp = (e) => {

    const fixedEmail = refEmail.current?.value ? refEmail.current?.value.toLowerCase() : '';
    const phone = refPhone.current?.value
    const fixedPhone = phone.replace(/\D+/g, '');

    console.log(refName.current?.value, fixedPhone, refPass.current?.value)
    if (!checkFieldValues(refName.current?.value, fixedPhone, refPass.current?.value)) {
      return false;
    }
    let obj = {
      name: refName.current?.value,
      phone: fixedPhone,
      email: fixedEmail,
      pass: refPass.current?.value,
      about: refAbout.current?.value,
      photo: photo,
    }
    axios.post(regUrl, obj, {
      headers: {
        'Content-Type': 'multipart/form-data;'
      }
    })
      .then((result) => {
        // setCurrentToken(result.data);
        console.log(result);
        jwtToken = result.data;
        console.log(jwtToken);
      }).catch((e) => {

        console.log(e.response.data.message)
      })

    //if axios return 'true' data - log in???
    //if not - error, this email or phone already registered
  }
  const handleClickPhoto = () => {
    // console.log('Photo!')
    pickImage()
  }

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* style={styles.container} */}
        <Text style={styles.title}>Пройдите регистрацию, чтобы найти клиентов или исполнителей:</Text>
        <View style={styles.wrapper}>
          <Text style={styles.label}>ФИО</Text>
          <Text style={styles.necessary}>*</Text>
        </View>
        <TextInput style={styles.input}
          ref={refName}
          value='user1'
          placeholder=""
        />
        <View style={styles.wrapper}>
          <Text style={styles.label}>Номер телефона</Text>
          <Text style={styles.necessary}>*</Text>
        </View>
        <TextInput style={styles.input}
          ref={refPhone}
          // value='111111111'
          placeholder=""
        />
        <View style={styles.wrapper}>
          <Text style={styles.label}>Пароль</Text>
          <Text style={styles.necessary}>*</Text>
        </View>
        <TextInput style={styles.input}
          ref={refPass}
          value='pass111'
          placeholder=""
        />
        <View style={styles.wrapper}>
          <Text style={styles.label}>Эл. почта</Text>
        </View>
        <TextInput style={styles.input}
          ref={refEmail}
          placeholder=""
        />
        <View style={styles.wrapper}>
          <Text style={styles.label}>Раскажите о себе</Text>
        </View>
        <TextInput style={{ ...styles.input, minHeight: '10%' }}
          multiline={true}
          numberOfLines={4}
          ref={refAbout}
          placeholder="Какие задачи готовы выполнять, опыт работы, расценки и т.д."
          placeholderTextColor={'#8d99ae'}
        />
        <CustomButton
          title='Выбрать фото'
          btnStyle={styles.btn}
          textStyle={styles.btnTxt}
          callback={handleClickPhoto} />
        <CustomButton
          title='Зарегистрироваться'
          btnStyle={styles.btn}
          textStyle={styles.btnTxt}
          callback={handleClickSignUp} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: '#FDFFFE',
    padding: '1%',
    paddingTop: '5%',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Black',
    textAlign: 'center',
    padding: '2%',
    fontSize: 20,
    width: cssWidth,
    fontWeight: 'bold',
  },
  wrapper: {
    padding: '1%',
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
  },
  input: {
    width: cssWidth,
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#2f9f94',
    marginTop: '1%',
    marginBottom: '3%',
    minHeight: '6%',
  },
  necessary: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    color: 'red',
  },
  btn: ({ pressed }) => {
    return {
      backgroundColor: pressed
        ? '#2f9f94'
        : '#75ebe0',
      marginTop: '2%',
      width: cssWidth,
      borderWidth: 1,
      minHeight: '7%',
      borderColor: '#2f9f94',
      textAlign: 'center',
    }
  },
  btnTxt: {
    fontFamily: 'Roboto-Black',
    fontSize: 22,
    margin: 'auto',
  },
});
