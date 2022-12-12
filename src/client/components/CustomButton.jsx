import React from 'react';
import { Pressable, Text } from 'react-native';

export function CustomButton({ title, btnStyle, textStyle, callback }) {

  return <Pressable style={btnStyle} onPress={callback}>
    <Text style={textStyle}>{title}</Text>
  </Pressable>
}

