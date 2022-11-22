import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, TouchableOpacity, TextInput, View, Text } from 'react-native';

export function Preview({ media }) {
  console.log('media: ' + media + ' |')
  if (!media || (typeof media == 'string' && media.length > 0)) {
    console.log('undefined')
    return <Image
      style={styles.preview}
      source={{
        uri: 'https://upload.wikimedia.org/wikipedia/commons/3/31/ProhibitionSign2.svg',
      }}
    />;
  }
  // return <Text>HUUHUHUH</Text>;
  if (typeof media == 'string') {
    console.log('string')
    return <Image
      style={styles.preview}
      source={{
        uri: media,
      }}
    />;
  }
  if (media instanceof Array) {
    console.log('array')

    return (
      <View>
        <Image
          style={styles.preview}
          source={{
            uri: media[0],
          }}
        />
        <View style={styles.pointsLine}>
          {media.map((el) => {
            return <Image
              style={styles.points}
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
  preview: {
    margin: '1%',
    height: 100,
    width: 100,
    backgroundColor: 'white',
    zIndex: 2,
  },
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
