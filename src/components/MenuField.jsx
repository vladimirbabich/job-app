import React from 'react';
import { Button, Pressable, StyleSheet, TextInput, View, Text} from 'react-native';

export default function MenuField (props){
    const {field} = props;
    console.log(props);
    console.log('hui');
    // console.log(key);
    return (
        <View style={styles.field} key={'key_' + field[0]}>
          <Text style={styles.fieldDesc} >{field[1] + '\n'}</Text>
          {/* <TextInput name={field[0]} type="text" /> */}
          <TextInput name={field[0]} type="text" style={styles.input} />
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
      width: '80%',
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
  