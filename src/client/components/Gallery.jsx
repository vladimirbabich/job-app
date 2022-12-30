import React, { useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, TextInput, View, Text } from 'react-native';
import generalStyles, { overlayImageSize } from '../../../generalStyles';
import { GalleryStyleContext } from '../screens/TabJobsScreen'

const photoFolderUrl = 'http://localhost:7000/job-photos/'
const noImgUrl = 'http://localhost:7000/noImg.svg'

const createImageComponent = (uri, style) => {
  return <Image
    style={style}
    source={{
      uri: uri,
    }}
  />;
}

export function Gallery(props) {

  const { media, isOverlay } = props;
  const [mainMedia, setMainMedia] = useState(media ? media[0] : undefined);
  useEffect(() => {
    // console.dir(mainMedia);
  }, [mainMedia]);

  function handleClickScrollItem(image) {
    setMainMedia({ ...image });
  }

  const style = useContext(GalleryStyleContext);

  if (!media || media.length == 0) {
    return createImageComponent(
      noImgUrl,
      style.mainImg);
  }
  // console.log('%cnewJobData:', 'color:green; font-size: 15px')
  const imgWidth = overlayImageSize.w;
  const imgHeight = mainMedia.height / (mainMedia.width / generalStyles.overlayImage.width)
  const imgStyle = isOverlay ? {
    ...generalStyles.overlayImage, resizeMode: 'contain',
    height: imgHeight
  } : style.mainImg;

  return (
    <View style={isOverlay ? generalStyles.centerBlock({width: imgWidth}) : null}>
      {createImageComponent(
        photoFolderUrl + mainMedia.fileName,
        imgStyle
      )}
      <FlatList
        data={media}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          width: style.scroll.width
        }}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => isOverlay ? handleClickScrollItem(item) : console.log('no effect in this mode')}>
            <Image
              style={style.preview}
              source={{
                uri: photoFolderUrl + item.fileName,
              }}
            />
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item, index) => index
        }
      />
    </View >
  );
}
