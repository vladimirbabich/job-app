import React from 'react';
import { Button, Pressable, StyleSheet, TextInput, View, Text } from 'react-native';

export default function MenuField(props) {
  const { field } = props;

  return (
    <View style={styles.field} key={'key_' + field[0]}>
      <View style={styles.wrapper}>
        <Text style={styles.fieldDesc} >{field[1] + '\n'}</Text>
        {field[2] ? <Text style={styles.necessary}> *</Text> : null}
      </View>
      {/* <TextInput name={field[0]} type="text" /> */}
      <TextInput name={field[0]} type="text" style={styles.input} onChange={(e) => { props.onChange(e, field[0]) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    alignItems: 'center',
    width: '100%',
  },
  fieldDesc: {
    textAlign: 'center',
    alignItems: 'center',
    // width: '',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent:'center',
    width: '100%',
  },
  necessary: {
    fontSize: 20,
    color: 'red',
  },
  input: {
    alignItems: 'center',
    height: 40,
    width: '80%',
    // margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
