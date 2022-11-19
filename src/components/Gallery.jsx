import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, TouchableOpacity, TextInput, View, Text } from 'react-native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';



export function Gallery(props) {
  console.log('%c: ' + props,'color:red')
  console.dir( props)
  const { media } = props;
  console.log('media: ' + media + ' |')
  if (!media || (typeof media == 'string' && media.length > 0)) {
    console.log('undefined')
    return <Image
      style={props.styles.mainImg}
      source={{
        uri: 'https://upload.wikimedia.org/wikipedia/commons/3/31/ProhibitionSign2.svg',
      }}
    />;
  }
  // return <Text>HUUHUHUH</Text>;
  if (typeof media == 'string') {
    console.log('%cstring', 'color:green')
     let img = <Image
      style={props.styles.mainImg}
      source={{
        uri: media,
      }}
    />;
   console.log('%c!!!huis!!!', 'color:red')
   console.dir(img.defaultSource)

    return img;

  }
  if (media instanceof Array) {
    console.log('array')

    return (
      <View>
        <Image
          style={props.styles.mainImg}
          source={{
            uri: media[0],
          }}
        />
        <View style={props.styles.scroll}>
          {media.map((el) => {
            return <Image
              style={props.styles.preview}
              source={{
                uri: el,
              }}
            />
          })}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  pointsLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 10,
    zIndex: 3,
  },
  points: {
    height: 10,
    width: 10,
    zIndex: 3,
  },
});
