import React, { useEffect, useState } from 'react';
import { Button, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, View, Text } from 'react-native';

import Job from '../components/Job';
import { Gallery } from '../components/Gallery';

import { getNumberFromPercent } from '../support-features/supportFunctions';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// alert(`w:${windowWidth}, h:${windowHeight}`)
//component sizes
const mainImage = {
  w: getNumberFromPercent(windowWidth, 90),
  h: getNumberFromPercent(windowHeight, 50)
};

const scroll = {
  w: getNumberFromPercent(windowWidth, 90),
  h: getNumberFromPercent(windowHeight, 5)
};

export default function TabJobsScreen() {

  const [data, setData] = useState([]);
  const testData = [
    {
      jobID: 1,
      accountID: undefined,
      clientID: 11,
      clientName: 'Андрей',
      clientAddress: "",
      workList: `арпао а еще вот так и вот здесь.
А также вот это и вот то.
И таких 4 штуки:
1.фршщшпыршщпщрып аыв
2. ыаываыва ыва ыв аыв 
3. ываыва ыв ы ваыв аыв
4. выаываываываы ывава!`,
      startDate: "02.12.2022",
      deadline: "",
      media: [
        "https://placeimg.com/640/480/any",
        "https://placeimg.com/640/480/any",
        "https://placeimg.com/640/480/any",
        "https://placeimg.com/640/480/any",
        "https://placeimg.com/640/480/any",
        "https://placeimg.com/640/480/any",
        "https://placeimg.com/640/480/any"
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
        "https://placeimg.com/640/480/any"
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
      media: '',
      price: 15000
    },
    {
      jobID: 4,
      accountID: undefined,
      clientID: 777,
      clientName: 'Петрова Валентина',
      clientAddress: "ulica 33b",
      workList: "One task",
      startDate: "03.03.2023",
      deadline: "03.04.2023",
      media: "https://placeimg.com/640/480/any",
      price: 15000
    }
  ];

  const [openedJobId, setOpenedJobId] = useState(-1);


  function getDataFromServer() {
    let c = setData([...testData]);
    return c;
  }

  useEffect(() => {
    getDataFromServer();
  }, []);
  useEffect(() => {
    console.log('openedJobId:' + openedJobId);
  }, [openedJobId]);

  function toggleGalleryView(jobId) {
    // console.log('before state: ' + openedJobId);
    
    setOpenedJobId(jobId);
    
console.log(`%cw:${mainImage.w} - ${windowWidth}`, 'color:blue')
console.log(`%ch:${mainImage.h} - ${windowHeight}`, 'color:purple')
    // console.log('after state: ' + openedJobId);

  }


  // f().then(alert); // 1
  let data2 = [];
  //get data from server, and make job component for each task
  let isPromiseFulfilled = false;
  // console.dir(data)
  if (!true) return <Text>Загрузка...</Text>;
  // console.log(data.length)
  if (data.length == 0 && isPromiseFulfilled) {
    return (
      <View>
        <Text>На данный момент нет доступных работ :(</Text>
        <Text>При появлении новый работ вы получите уведомление</Text>
      </View>
    );
  }

  if (openedJobId > -1) {
    let jobIndexInData = testData.map(el => {
      return el.jobID
    }).indexOf(openedJobId);

    // console.log('%cjobIndexInData:' + jobIndexInData, "color:green");

    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.overlay} onPress={() => { setOpenedJobId(-1) }}>
          <TouchableOpacity style={styles.mainImage} activeOpacity={1}>
            {console.log('%copenedJobId: ' + jobIndexInData, 'color:green')}
            {console.dir(testData[jobIndexInData])}
            <Gallery media={testData[jobIndexInData].media} styles={galleryStyle} />
          </TouchableOpacity>
        </TouchableOpacity>
        {testData.map((el => {
          return <Job job={el} key={el.jobID} toggleGalleryView={toggleGalleryView} styles={previewStyle} />;
        }))}
        {/* <View style={styles.shade}></View> */}
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {testData.map((el => {
        return <Job job={el} key={el.jobID} toggleGalleryView={toggleGalleryView} styles={previewStyle}/>;
      }))}
      {/* <View style={styles.shade}></View> */}
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
    height: mainImage.h,
    width: mainImage.w, 
    backgroundColor: 'purple',
    zIndex: 2,
  },
  scroll: {
    height: scroll.h,
    width: scroll.w,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 101,
    // margin: '1%',
  },
  preview: {
    height: scroll.h,
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 100,
  },
  preview: {
    margin: '1%',
    height: 100,
    width: 100,
    backgroundColor: 'white',
    zIndex: 2,
  },
  gallery: {
    margin: 'auto',
    height: mainImage.h,
    width: mainImage.w, 
    backgroundColor: 'purple',
    zIndex: 2,
  },
  mainImage: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'green',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50%',
    height: mainImage.h,
    width: mainImage.w,

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
  scroll: {
    height: scroll.h,
    width: scroll.w,
    flexDirection: 'row',
    zIndex: 101,
    // margin: '1%',
  },
  smallImg: {
    height: 50,
    width: 50,
    marginHorizontal: '0.4%',
    flexDirection: 'row',
    zIndex: 191,
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
