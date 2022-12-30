import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Gallery } from './Gallery';


export function Overlay(props) {
  const { data, openedJobId, galleryStyle, onClick } = props;

  let jobIndexInData = data.map(el => {
    return el.id
  }).indexOf(openedJobId);

  return (
    <TouchableOpacity style={styles.overlay} onPress={() => { onClick(-1) }}>
      <Gallery media={data[jobIndexInData].media} isOverlay={true} />
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
  }
});
