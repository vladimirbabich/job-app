import React, { useContext, useState } from 'react';
import { Button, Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { GlobalContext } from '../../../App';
import generalStyles from '../../../generalStyles';
const jwt = require('jsonwebtoken')

export default function MenuField(props) {
  const { field } = props;
  const globalContext = useContext(GlobalContext);
  const [phone, setPhone] = useState(jwt.decode(globalContext.jwtToken)?.phone || '');
  return (

    < View style={styles.field} key={'key_' + field[0]} >
      <View style={styles.wrapper}>
        <Text style={styles.fieldDesc} >{field[1] + '\n'}</Text>
        {field[2] ? <Text style={styles.necessary}> *</Text> : null}
      </View>
      {
        field[0] == 'workList' ?
          <TextInput
            name={field[0]}
            multiline={true}
            numberOfLines={4}
            type="text"
            style={generalStyles.textInput}
            onChange={(e) => { props.onChange(e, field[0]) }}
          />
          :
          field[0] == 'phone' ?
            <TextInput name={field[0]}
              type="text"
              value={phone}
              style={generalStyles.textInput}
              onChange={(e) => { setPhone(e.target.value); props.onChange(e, field[0]) }}
            />
            :
            <TextInput name={field[0]}
              type="text"
              style={generalStyles.textInput}
              onChange={(e) => { props.onChange(e, field[0]) }}
            />
      }
    </View >
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
    justifyContent: 'center',
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
