import React, { useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, TextInput, View, Text } from 'react-native';
import { GalleryStyleContext } from '../screens/TabJobsScreen'

const createImageComponent = (uri, style) => {
  console.log('111' + uri)
  return <Image
    style={style}
    source={{
      uri: uri,
    }}
  />;
}
export function Gallery(props) {
  const { media } = props;
  const [mainMedia, setMainMedia] = useState('');

  function handleClickFlatItem(uri) {
    const calcSize = {
      w: -1,
      h: -1
    }
    console.log(uri)
    const size = Image.getSize(uri, (w, h) => {
      console.log({ w, h })
      calcSize.w = w;
      calcSize.h = h;
    }, (e) => console.log('PIZDA'))
    console.log(calcSize)

    setMainMedia({ uri, ...calcSize });
    console.log(mainMedia)
  }
  const style = useContext(GalleryStyleContext);
  // console.log(style);

  if (!media || (typeof media == 'string' && media.length == 0)) {
    return createImageComponent(
      'https://upload.wikimedia.org/wikipedia/commons/3/31/ProhibitionSign2.svg',
      style.mainImg);
  }
  else if (typeof media == 'string') {
    return createImageComponent(
      mainMedia.uri || media,
      style.mainImg);
  }
  else if (media instanceof Array) {
    let image = null;
    return (
      <View>
        {image = createImageComponent(
          mainMedia.uri || media[0],
          style.mainImg)}
        <FlatList
          data={media}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            width: style.scroll.width
          }}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => handleClickFlatItem(item, image)}>
              <Image
                style={style.preview}
                source={{
                  uri: item,
                }}
              />

            </TouchableWithoutFeedback>
          )
          }
          keyExtractor={(item, index) => index
          }
        />
      </View >
    );
  }
  else {
    console.error('unpredicted type of job.media');
  }
}
