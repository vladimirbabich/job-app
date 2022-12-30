import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, TextInput, View, Text, BackHandler } from 'react-native';
import generalStyles from '../../../generalStyles';

import { getNumberFromPercent } from '../../support-features/supportFunctions';
import { Gallery } from './Gallery';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//component sizes
const mainImageSize = {
  w: getNumberFromPercent(windowWidth, 90),
  h: getNumberFromPercent(windowHeight, 50)
};

export function Overlay(props) {
  const { data, openedJobId, galleryStyle, onClick } = props;

  let jobIndexInData = data.map(el => {
    return el.id
  }).indexOf(openedJobId);

  return (
    <TouchableOpacity style={styles.overlay} onPress={() => { onClick(-1) }}>
      {/* <TouchableOpacity style={styles.mainImageBlock} activeOpacity={1}> */}
        {/* {console.log('%copenedJobId: ' + jobIndexInData, 'color:green')} */}
        {/* {console.dir(data[jobIndexInData])} */}
        <Gallery media={data[jobIndexInData].media} isOverlay={true} />
      {/* </TouchableOpacity> */}
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
    position: 'fixed',
    marginLeft: 'auto',
    marginRight: 'auto',
    bottom: '10vh',
    left: (windowWidth - mainImageSize.w) / 2,
    // // marginTop: '100%',
    // height: '300px',
    // width: '300px',
    overflow:'auto' 
  }
});
