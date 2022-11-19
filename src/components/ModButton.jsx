import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, TouchableOpacity, TextInput, View, Text } from 'react-native';

export function ModButton(props) {

  return <Button
    title={props.title}
    color={props.color}
    onPress={props.callback}
  />;
}

