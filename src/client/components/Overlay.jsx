import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';


// We can use this to make the overlay fill the entire width
var { width, height } = Dimensions.get('window');
import { Gallery } from './Gallery';


export function Overlay(props) {
  const { data, openedJobId, galleryStyle, onClick, contentOffsetY } = props;

  let jobIndexInData = data.map(el => {
    return el.id
  }).indexOf(openedJobId);
  return (
    < TouchableOpacity style={{
      ...styles.overlay,
      top: 0 + contentOffsetY,
    }
    } onPress={() => { onClick(-1) }}>

      <Gallery offsetY={contentOffsetY} media={data[jobIndexInData].media} />
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'fixed',
    left: 0,
    // right: 0,
    // bottom: 0,
    width: width,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 100,
  }
});
