import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';


export default function TabMenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>На</Text>
      <Pressable style={styles.btn} onPress={() =>{ console.log('Посмотреть заказы кнопка');}}>
        <Text>Посмотреть заказы</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={() =>{ console.log('Избранное кнопка');}}>
        <Text>Избранное</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={() =>{ console.log('Создать заказ');}}>
        <Text>Создать заказ</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={() =>{ console.log('Выйти');}}>
        <Text>Выйти</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    width: '80%',
  },
});
