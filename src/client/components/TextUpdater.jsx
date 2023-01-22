import React, { useEffect, useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, TouchableOpacity, TextInput, View, Text, Image } from 'react-native';
import generalStyles, { colors } from '../../../generalStyles';
import { userSkills } from '../../server/defaultData';
import { CustomButton } from './CustomButton';

export default function TextUpdater({ currentProperty, name, updateHandler, cancelHandler }) {
  const [currentText, setCurrentText] = useState(currentProperty.value);
  const inputRef = useRef(null);
  const handleTextInputUpdate = ({ target }, name) => {
    setCurrentText(target.value)
  }
  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return <View>
    <TextInput
      name={name}
      ref={inputRef}
      multiline={true}
      numberOfLines={6}
      type="text"
      style={styles.textInput}
      onChange={(e) => { handleTextInputUpdate(e, name) }}
      value={currentText} />
    <View style={styles.bottom}>
      <CustomButton title='Update'
        btnStyle={styles.bottomBtn}
        textStyle={styles.bottomTxtBtn}
        callback={(e) => { updateHandler({ key: currentProperty.key, value: currentText }) }} />
      <CustomButton title='Cancel'
        btnStyle={styles.bottomBtn}
        textStyle={styles.bottomTxtBtn}
        callback={(e) => cancelHandler({ key: currentProperty.key, value: currentText })} />
    </View>
  </View>

}


const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.actionColor,
  },
  bottom: {
    flexDirection: 'row',
  },
  bottomBtn: ({ pressed }) => {
    return {
      width: '50%',
      backgroundColor: pressed
        ? colors.actionColor
        : colors.mainColor,
      borderWidth: 1,
      marginHorizontal: 'auto',
      borderColor: colors.actionColor,
      textAlign: 'center',
    }
  },
  bottomTxtBtn: {
    fontFamily: 'Roboto-Black',
    fontSize: 16,
    margin: 'auto',

  },

});