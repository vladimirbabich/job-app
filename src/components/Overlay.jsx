import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, TextInput, View, Text } from 'react-native';

import { getNumberFromPercent } from '../support-features/supportFunctions';
import { Gallery } from './Gallery';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// alert(`w:${windowWidth}, h:${windowHeight}`)
//component sizes
const mainImageSize = {
  w: getNumberFromPercent(windowWidth, 90),
  h: getNumberFromPercent(windowHeight, 50)
};
/* props
  styles - contains 3 stylesheet objects:
  mainImg
  scroll
  preview
*/

export function Overlay(props) {
  const { data, jobIndexInData, galleryStyle, toggleGalleryView } = props;

  return (
    <TouchableOpacity style={styles.overlay} onPress={() => { toggleGalleryView(-1) }}>
      <TouchableOpacity style={styles.mainImageBlock} activeOpacity={1}>
        {console.log('%copenedJobId: ' + jobIndexInData, 'color:green')}
        {console.dir(data[jobIndexInData])}
        <Gallery media={data[jobIndexInData].media} styles={galleryStyle} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 100,
  },
  mainImageBlock: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: 'green',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50%',
    height: mainImageSize.h,
    width: mainImageSize.w,
  }
});
