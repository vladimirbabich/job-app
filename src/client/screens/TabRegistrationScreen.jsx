import React, { useRef, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import axios from 'axios';
import { GlobalContext } from '../../../App';
import { CustomButton } from '../components/CustomButton';
import generalStyles, { colors } from '../../../generalStyles';
import { checkValueOfString, pickImage } from '../../support-features/supportFunctions';

const regUrl = 'http://localhost:7000/api/user/registration'
const loginUrl = 'http://localhost:7000/api/user/login'

export default function TabRegistrationScreen() {
  const refName = useRef();
  const refPhone = useRef();
  const refEmail = useRef();
  const refPass = useRef();
  const refAbout = useRef();
  let photo = undefined;
  let globalContext = useContext(GlobalContext);
  console.log(globalContext)

  const checkFieldValues = (name, phone, pass) => {
    if (!checkValueOfString(phone, (phone == ''),
      `Поле "Номер телефона" должно быть заполнено`)) {
      return false;
    }
    if (!checkValueOfString(phone, (phone.length < 6),
      'Вы написали не настоящий номер телефона')) {
      return false;
    }
    if (!checkValueOfString(pass, (pass == ''),
      `Поле "Пароль" должно быть заполнено`)) {
      return false;
    }
    if (!checkValueOfString(name, (name == ''),
      `Поле "ФИО" должно быть заполнено`)) {
      return false;
    }
    return true;
  }

  const handleClickSignUp = (e) => {
    const fixedEmail = refEmail.current?.value ? refEmail.current?.value.toLowerCase() : '';
    const phone = refPhone.current?.value
    const fixedPhone = phone.replace(/\D+/g, '');
    if (refName.current?.value == '' && fixedPhone && refPass.current?.value) {
      const url = `${loginUrl}/?pass=${refPass.current?.value}&phoneOrEmail=${fixedPhone}`
      axios.get(url).then((result) => {
        globalContext.setJwtToken(result.data.token)
      }).catch((e) => {
        console.log(e.response.data.message)
        Alert.alert(e.response.data.message)
      })
    }
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
      photoUri: photo?.uri,
      photoW: photo?.w,
      photoH: photo?.h
    }
    axios.post(regUrl, obj, {
      headers: {
        'Content-Type': 'multipart/form-data;'
      }
    })
      .then((result) => {
        console.log(result)
        globalContext.setJwtToken(result.data)
      }).catch((e) => {
        console.log(e)
        Alert.alert(e)
      })
  }

  const handleClickPhoto = async () => {
    photo = await pickImage();
    // console.log(photo)
  }

  return (
    <ScrollView contentContainerStyle={generalStyles.screenScroll}>
      <Text style={generalStyles.title}>Create an account to find clients or workers:</Text>
      <View style={styles.wrapper}>
        <View style={styles.fieldName}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.necessary}>*</Text>
        </View>
        <TextInput style={generalStyles.textInput}
          ref={refName}
          placeholder=""
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.fieldName}>
          <Text style={styles.label}>Phone number</Text>
          <Text style={styles.necessary}>*</Text>
        </View>
        <TextInput style={generalStyles.textInput}
          ref={refPhone}
          placeholder=""
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.fieldName}>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.necessary}>*</Text>
        </View>
        <TextInput style={generalStyles.textInput}
          ref={refPass}
          placeholder=""
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.fieldName}>
          <Text style={styles.label}>Email</Text>
        </View>
        <TextInput style={generalStyles.textInput}
          ref={refEmail}
          placeholder=""
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.fieldName}>
          <Text style={styles.label}>About</Text>
        </View>
        <TextInput style={{ ...generalStyles.textInput, minHeight: '10%' }}
          multiline={true}
          numberOfLines={4}
          ref={refAbout}
          placeholder="Type about your experience, which types of work you can do etc."
          placeholderTextColor={colors.descriptionColor}
        />
      </View>
      <CustomButton
        title='Choose a photo'
        btnStyle={generalStyles.btn}
        textStyle={generalStyles.btnTxt}
        callback={handleClickPhoto} />
      <CustomButton
        title='Sign up'
        btnStyle={generalStyles.btn}
        textStyle={generalStyles.btnTxt}
        callback={handleClickSignUp} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: 0,
    margin: 0,
    alignItems: 'center',
  },
  fieldName: {
    padding: '1%',
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
  },
  necessary: {
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    color: 'red',
  },
});
