import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, View, Text } from 'react-native';

/* props
  styles - contains 3 stylesheet objects:
  mainImg
  scroll
  preview
*/

export function Gallery(props) {
  const { media } = props;
  if (!media || (typeof media == 'string' && media.length == 0)) {
    return <Image
      style={props.styles.mainImg}
      source={{
        uri: 'https://upload.wikimedia.org/wikipedia/commons/3/31/ProhibitionSign2.svg',
      }}
    />;
  }
  else if (typeof media == 'string') {
    return <Image
      style={props.styles.mainImg}
      source={{
        uri: media,
      }}
    />;;

  }
  else if (media instanceof Array) {
    return (
      <View>
        <Image
          style={props.styles.mainImg}
          source={{
            uri: media[0],
          }}
        />
        <FlatList
          // style={props.styles.scroll}
          data={media}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            width: props.styles.scroll.width
          }}
          horizontal={true}
          renderItem={({ item }) => (
            <Image
              style={props.styles.preview}
              source={{
                uri: item,
              }}
            />)}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
  else {
    console.error('unpredicted type of job.media');
  }
}
