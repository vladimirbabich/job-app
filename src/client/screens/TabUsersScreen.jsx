import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, View, Text } from 'react-native';

import Job from '../components/Job';
import { Gallery } from '../components/Gallery';

import { getNumberFromPercent } from '../../support-features/supportFunctions';

export default function TabJobsScreen() {

  const [data, setData] = useState([]);
  useEffect(() => {
    getDataFromServer();//placeholder for now
  }, [data]);

  const [openedJobId, setOpenedJobId] = useState(-1);


  async function getDataFromServer() {
    let c = setData([...testData]);
    let data = await 
    return c;
  }



  useEffect(() => {
    console.log('openedJobId:' + openedJobId);
  }, [openedJobId]);

  function toggleGalleryView(jobId) {
    setOpenedJobId(jobId);
  }



  // f().then(alert); // 1
  let data2 = [];
  //get data from server, and make job component for each task
  let isPromiseFulfilled = false;

  if (!true) return <Text>Загрузка...</Text>;

  if (data.length == 0 && isPromiseFulfilled) {
    return (
      <View>
        <Text>На данный момент нет доступных работ :(</Text>
        <Text>При появлении новый работ вы получите уведомление</Text>
      </View>
    );
  }
  function showOverlay(openedJobId) {
    return (
      <GalleryStyleContext.Provider value={galleryStyle}>
        <Overlay data={testData} openedJobId={openedJobId} toggleGalleryView={toggleGalleryView} />
      </GalleryStyleContext.Provider>
    )
  }

  return (
    <View style={styles.container}>
      {(openedJobId > -1) ? showOverlay(openedJobId) : null}
      <GalleryStyleContext.Provider value={previewStyle}>
        {testData.map((el => {
          return (
            <Job job={el} key={el.jobID} toggleGalleryView={toggleGalleryView} />
          )
        }))}
      </GalleryStyleContext.Provider>
    </View>
  );
}


const previewStyle = StyleSheet.create({
  mainImg: {
    margin: '1%',
    height: 100,
    width: 100,
    backgroundColor: 'white',
    zIndex: 2,
  },
  scroll: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 10,
    zIndex: 3,
  },
  preview: {
    height: 10,
    width: 10,
    zIndex: 3,
  },
});

const galleryStyle = StyleSheet.create({
  mainImg: {
    margin: 'auto',
    height: mainImageSize.h,
    width: mainImageSize.w,
    backgroundColor: 'purple',
    zIndex: 2,
  },
  scroll: {
    height: scrollSize.h,
    width: scrollSize.w,
  },
  preview: {
    height: scrollSize.h,
    width: 50,
    marginHorizontal: '0.4%',
    flexDirection: 'row',
    zIndex: 191,
  },
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  preview: {
    margin: '1%',
    height: 100,
    width: 100,
    backgroundColor: 'white',
    zIndex: 2,
  },
  img: {
    height: 'inherit',
    flexDirection: 'row',
    width: 'inherit',
    zIndex: 101,

  },
  imgList: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 2,
    // marginBottom: '100%',
    // width: 250,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});



export const GalleryStyleContext = React.createContext(galleryStyle);