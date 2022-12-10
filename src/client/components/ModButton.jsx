import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, TouchableOpacity, TextInput, View, Text } from 'react-native';

export function ModButton({title, color, callback}) {

  return <Button
    title={title}
    color={color || 'cyan'}
    onPress={callback}
  />;
}

