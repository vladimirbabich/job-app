import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, TextInput } from 'react-native';

import MenuField from '../components/MenuField';
// import axios from 'axios';

export default function TabNewJobScreen() {
  //fields values: name, description for user, necessarity
  let fields = [
    ['phone', 'Номер телефона', true],
    ['clientName', 'ФИО клиента', true],
    ['clientAddress', 'Адрес клиента', true],
    ['workList', 'Список запрашиваемых работ', true],
    ['deadline', 'Приемлемая дата завершения работ', false],
    ['price', 'Сумма', false]
  ];
  const [newJobData, setNewJobData] = useState({});
  // fields.map(()=>{

  // })

  const handleJobData = ({ target }, name) => {
    setNewJobData((prev) => ({
      ...prev,
      [name]: target.value
    }))
  }
  useEffect(() => {
    console.log('%cnewJobData:', 'color:green; font-size: 15px');
    console.dir(newJobData);
  }, [newJobData]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // console.log(result);

    // if (!result.cancelled) {
    //   alert(result.uri);
    // }
  };
  const createNewJob = async (data) => {
    
  }

  const testF = async () => {
    alert('test');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Заполните данные:</Text>
      {fields.map((el) => {
        return <MenuField key={el[0]} field={el} onChange={(e, name) => handleJobData(e, name)} />
      })}
      <Pressable style={styles.btn} onPress={pickImage}>
        <Text>Добавить фото/видео</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={(e) => { createNewJob(newJobData) }}>
        <Text>Создать задачу</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: '80%',
    backgroundColor: '#841584',
  },
  field: {
    alignItems: 'center',
    width: '100%',
  },
  fieldDesc: {
    textAlign: 'center',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    alignItems: 'center',
    height: 40,
    width: '80%',
    // margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  testForm: {
    display: 'flex',
    flexDirection: 'column',
    // height: 1,
    // width: 'auto',
  },
});