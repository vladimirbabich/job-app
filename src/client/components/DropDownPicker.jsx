import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View, Text } from 'react-native';
import { colors, mainWidth } from '../../../generalStyles';

const createFlatList = (data, contentContainerStyle, horizontal, renderItem) => {
  return <FlatList
    data={data}
    contentContainerStyle={contentContainerStyle}
    horizontal={horizontal}
    renderItem={renderItem}
    keyExtractor={(item, index) => index
    }
  />
}

export default function DropDownPicker(props) {

  const { open, setOpen, selection, setSelection, list } = props
  const [icon, setIcon] = useState('︾');

  const handleClickItemList = (item) => {
    const index = selection.indexOf(item)
    setSelection(prev => {
      if (index == -1)
        return [...prev, item]
      else {
        prev.splice(index, 1)
        return [...prev]
      }
    })
  }

  const showDropdownList = (isOpen, list) => {
    if (isOpen) {
      return createFlatList(list, styles.dropdownList, false, ({ item }) => (
        <TouchableOpacity
          style={styles.dropdownListItem}
          onPress={(e) => { handleClickItemList(item); }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item}</Text>
            {selection.indexOf(item) > -1 ? <Text>✓</Text> : null}
          </View>
        </TouchableOpacity >
      ))
    }
  }

  const handleClickDropDownPicker = () => {
    setOpen(prev => !prev)
    setIcon(prev => {
      return prev == '︾' ? '︽' : '︾'
    })
  };

  return <View style={styles.dropDownPicker} onClick={handleClickDropDownPicker}>
    <View style={styles.container}>
      {selection.length == 0 ?
        <Text>Select items</Text> :
        createFlatList(selection, styles.selection, true, ({ item }) => (
          <TouchableOpacity
            style={styles.selectionItem}
            onPress={(e) => { handleClickItemList(item); }}>
            <Text>{item} ✕</Text>
          </TouchableOpacity >
        ))
      }
      <Text style={styles.icon}>{icon}</Text>
    </View>
    {showDropdownList(open, list)}
  </View>
}
const styles = StyleSheet.create({
  dropDownPicker: {
    width: mainWidth,
    padding: '1vh',
    borderWidth: '1px',
    borderColor: colors.actionColor,
    flexDirection: 'column',
    marginHorizontal: 'auto',
  },
  container: {
    flexDirection: 'row',
    padding: '1vh',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  dropdownList: {

    flexGrow: 1,
    display: 'fixed',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: colors.cartColor,
  },
  dropdownListItem: {
    padding: '1vh',
  },
  selection: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
  selectionItem: {
    backgroundColor: colors.cartColor,
    padding: '0.5vh',
  },
  icon: {
    paddingLeft: '0.5vh',
  },
});
