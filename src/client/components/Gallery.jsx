import React, { useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, TextInput, View, Text } from 'react-native';
import { GalleryStyleContext } from '../screens/TabJobsScreen'

const photoFolderUrl = 'http://localhost:7000/job-photos/'
const avatarFolderUrl = 'http://localhost:7000/avatars/'
const noImgUrl = 'http://localhost:7000/noImg.svg'

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
  const [mainMedia, setMainMedia] = useState(media ? media[0] : undefined);
  useEffect(() => {
    console.dir(mainMedia);
  }, [mainMedia]);

  function handleClickScrollItem(uri, sourceSize) {
    const calcSize = {
      w: 1,
      h: -1
    }
    console.log(uri)
    console.log(calcSize)
    const imgUri = uri;
    console.log('%cimgUrl:' + imgUri, 'color:green; font-size: 15px')

    setMainMedia({ fileName: imgUri, ...calcSize });
    console.log(mainMedia)
  }

  const style = useContext(GalleryStyleContext);
  // console.log(style);

  if (!media || media.length == 0) {
    return createImageComponent(
      noImgUrl,
      { ...style.mainImg, resizeMode: 'auto' });
  }

  let image = null;
  const imageUris = media.map(el => {
    // return createImageComponent(el.fileName, style.scroll)
    return el.fileName
  })
  console.log('%cnewJobData:', 'color:green; font-size: 15px')
  // console.dir(imageScroll)
  return (
    <View>
      {createImageComponent(
        photoFolderUrl + mainMedia.fileName,
        //height: mainMedia.height*(mainMedia.width/style.mainImg.width)
        style.mainImg)}
      {/* { ...style.mainImg, resizeMode: 'contain', height: 500})} */}
      {console.dir(media)
      }
      <FlatList
        data={imageUris}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          width: style.scroll.width
        }}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleClickScrollItem(item)}>
            <Image
              style={style.preview}
              source={{
                uri: photoFolderUrl + item,
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
