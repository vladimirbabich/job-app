import React from 'react';
import { Button, Pressable, StyleSheet, Text, View, TextInput } from 'react-native';

import MenuField from '../components/MenuField';

export default function TabNewJobScreen() {
  let fields = [
    ['phone', 'Номер телефона'],
    ['clientName', 'ФИО клиента'],
    ['clientAddress', 'Адрес клиента'],
    ['workList', 'Список запрашиваемых работ'],
    ['deadline', 'Приемлемая дата завершения работ'],
    ['extraInfo', 'Дополнительная информация'],
    ['price', 'Сумма']
  ];
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
  const createTask = async () => {
    console.dir(arguments[0].navigation.navigate("Jobs"));

  }

  const testF = async () => {
    alert('test');
  };
  
  return (
    <View style={styles.container}>
      {/* <TestForm style={styles.testForm} className="test-form"/> */}
      <Text style={styles.title}>Заполните данные:</Text>
      {fields.map((el) => {
        return <MenuField field={el}/>
      })}
      <Pressable style={styles.btn} onPress={pickImage}>
        <Text>Добавить фото/видео</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={createTask}>
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
