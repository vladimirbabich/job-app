import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, TextInput, View, Text } from 'react-native';

import Job from '../components/Job';

//dimensions
let mainImageWidth, mainImageHeight;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function TabJobsScreen() {

  const [data, setData] = useState([]);
  const [mainImgSrc, setMainImgSrc] = useState(undefined);
  const testData = [
    {
      jobID: 1,
      accountID: undefined,
      clientID: 11,
      clientName: 'Андрей',
      clientAddress: "",
      workList: `sosi,prosi а еще вот так и вот здесь.
А также вот это и вот то.
И таких 4 штуки:
1.фршщшпыршщпщрып аыв
2. ыаываыва ыва ыв аыв 
3. ываыва ыв ы ваыв аыв
4. выаываываываы ывава!`,
      startDate: "02.12.2022",
      deadline: "",
      media: [
        "https://random.imagecdn.app/640/480",
        "https://random.imagecdn.app/500/500",
        "https://random.imagecdn.app/500/1500",
        "https://random.imagecdn.app/1500/500",
        "https://random.imagecdn.app/50/50",
        "https://random.imagecdn.app/500/150",
        "https://random.imagecdn.app/50/200"
      ],
      price: undefined
    },
    {
      jobID: 2,
      accountID: undefined,
      clientID: 25,
      clientName: 'Дарья Иванова',
      clientAddress: "dom kolotushkina",
      workList: "abc,qwe,iuj,nah",
      startDate: "12.12.2022",
      deadline: "22.12.2022",
      media: [
        "https://random.imagecdn.app/640/480"
      ],
      price: 10600
    },
    {
      jobID: 3,
      accountID: undefined,
      clientID: 76,
      clientName: 'Петров Валентин Федорович',
      clientAddress: "ulica pushkina",
      workList: "task1,task2,task3",
      startDate: "03.02.2023",
      deadline: "03.03.2023",
      // extraInfo: "jopu nyuhai",
      price: 15000
    }
  ];

  console.log(windowHeight);


  const [isGalleryView, setIsGalleryView] = useState(false);


  const galleryViewJSX = <View style={styles.shade}>
  </View>

  useEffect(() => {
    getDataFromServer();
  }, []);
  useEffect(() => {
    toggleGalleryView();
  }, [isGalleryView]);

  function getDataFromServer() {
    let c = setData([...testData]);
    return c;
  }

  

  function closeGalleryView() {
    console.log('hui');
  }

  console.log(data);
  console.log('hui');
  const image = <Image
    style={styles.smallImg}
    source={{
      uri: 'https://random.imagecdn.app/640/480',
    }}
  />;
  return (
    <TouchableOpacity style={styles.shade} onPress={closeGalleryView}>
      <TouchableOpacity style={styles.mainImage} activeOpacity={1}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://random.imagecdn.app/640/480',
          }}
        />
      </TouchableOpacity>
      <ScrollView horizontal={true} style={styles.scroll}>
        {testData[0].media.map((imgSrc) => {
          return <Image
            style={styles.smallImg}
            source={{
              uri: imgSrc,
            }}
          />;
        })}
      </ScrollView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shade: {
    backgroundColor: 'black',
    opacity: '90%',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '80%',

  },
  mainImage: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'green',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50%',
    height: 250,
    width: 250,

  },
  img: {
    height: 'inherit',
    flexDirection: 'row',
    width: 'inherit',
    zIndex: 2,

  },
  imgList: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 2,
    // marginBottom: '100%',
    // width: 250,
  },
  scroll: {
    height: 50,
    flexDirection: 'row',
    zIndex: 2,
    // margin: '1%',
  },
  smallImg: {
    height: 50,
    width: 50,
    marginHorizontal: '0.4%',
    flexDirection: 'row',
    zIndex: 2,
  },
  // test: {
  //   height: 250,
  //   width: 250,
  //   zIndex:2,
  //   backgroundColor:'red'
  // },
});
