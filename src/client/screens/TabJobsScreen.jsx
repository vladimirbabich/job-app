import React, { useEffect, useState } from 'react';
import { Button, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, View, Text } from 'react-native';

import Job from '../components/Job';
import { Gallery } from '../components/Gallery';

import { getNumberFromPercent } from '../../support-features/supportFunctions';
import { Overlay } from '../components/Overlay';
import generalStyles from '../../../generalStyles';
import axios from 'axios';
const getJobsUrl = 'http://localhost:7000/api/job/getall';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// alert(`w:${windowWidth}, h:${windowHeight}`)
//component sizes
const mainImageSize = {
  w: getNumberFromPercent(windowWidth, 90),
  h: getNumberFromPercent(windowHeight, 50),
  windowWidth
};

const scrollSize = {
  w: getNumberFromPercent(windowWidth, 90),
  h: getNumberFromPercent(windowHeight, 5)
};

export default function TabJobsScreen() {
  const [data, setData] = useState([]);
  const [openedJobId, setOpenedJobId] = useState(-1);//if>=0 -> overlayMode with gallery of medias from jobArray[openedJobId]

  useEffect(() => {
    axios.get(getJobsUrl)
      .then((result) => {
        // console.dir(result.data);
        setData(result.data);
      }).catch((e) => {
        console.log(e.response.data.message)
      })
  }, []);

  useEffect(() => {
    // console.log('openedJobId:' + openedJobId);
  }, [openedJobId]);

  function handleCartClick(jobId) {
    if (!data)
      console.log('NO DATA! Somehow data is empty, this means that you dont see any imgs in JOB carts')
    const index = data.map(e => e.id).indexOf(jobId);

    //if job has media/s OR it`s Overlay component
    if (index == -1 || data[index]?.media != undefined) {
      setOpenedJobId(jobId);
    }
  }

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
        <Overlay data={data} openedJobId={openedJobId} onClick={handleCartClick} />
      </GalleryStyleContext.Provider>
    )
  }

  return (
    <View
      scrollEnabled={openedJobId > -1 ? false : true}
      style={generalStyles.screenScroll}>
      {(openedJobId > -1) ? showOverlay(openedJobId) : null}
      <Text style={generalStyles.title}>Доступные работы:</Text>
      <GalleryStyleContext.Provider value={previewStyle}>
        {data.map((el => {
          return (
            <Job job={el} key={el.id} onClick={handleCartClick} />
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
  title: {

  },
  preview: {
    height: 10,
    width: 10,
    zIndex: 3,
  },
});

const galleryStyle = StyleSheet.create({
  mainImg: {
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