import React, { useRef, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { GlobalContext } from '../../../App';
import { CustomButton } from '../components/CustomButton';

import generalStyles, { colors } from '../../../generalStyles';
import { checkValueOfString } from '../../support-features/supportFunctions';

const regUrl = 'http://localhost:7000/api/user/registration'

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
      photo = { uri: result.uri, w: result.width, h: result.height };
    }
  };

  const checkFieldValues = (name, phone, pass) => {
    console.dir([name, phone, pass]);
    if (!checkValueOfString(name, (name == ''),
      `Поле "ФИО" должно быть заполнено`)) {
      return false;
    }
    if (!checkValueOfString(phone, (phone == ''),
      `Поле "Номер телефона" должно быть заполнено`)) {
      return false;
    }
    if (!checkValueOfString(phone, (phone.length < 6),
      'Вы написали не существующий номер телефона')) {
      return false;
    }
    if (!checkValueOfString(pass, (pass == ''),
      `Поле "Пароль" должно быть заполнено`)) {
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
      photoUri: photo?.uri,
      photoW: photo?.w,
      photoH: photo?.h,
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
    console.log(jwtToken)
    pickImage()
  }

  return (
    <ScrollView contentContainerStyle={generalStyles.screenScroll}>
      {/* style={styles.container} */}
      <Text style={generalStyles.title}>Create an account to find clients or workers:</Text>
      <View style={styles.wrapper}>
        <View style={styles.fieldName}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.necessary}>*</Text>
        </View>
        <TextInput style={generalStyles.textInput}
          ref={refName}
          value='user1'
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
          // value='111111111'
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
          value='pass111'
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
