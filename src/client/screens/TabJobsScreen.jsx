import React, { useEffect, useState } from 'react';
import { Button, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, View, Text } from 'react-native';

import Job from '../components/Job';
import { Gallery } from '../components/Gallery';

import { getNumberFromPercent } from '../../support-features/supportFunctions';
import { Overlay } from '../components/Overlay';
import generalStyles from '../../../generalStyles';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// alert(`w:${windowWidth}, h:${windowHeight}`)
//component sizes
const mainImageSize = {
  w: getNumberFromPercent(windowWidth, 90),
  h: getNumberFromPercent(windowHeight, 50)
};

const scrollSize = {
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
        "https://placeimg.com/640/480/any",
        "https://placeimg.com/640/480/any",
        "https://placeimg.com/640/480/any",
        "https://placeimg.com/640/480/any",
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
        "https://imgs.ca/wp-content/uploads/2021/09/IMGS-Group-Logo-Web-Optimize.png",
        "https://www.pegasusforkids.com/uploads/product/ff8dd10df920229c17d8249eb311ee01.jpg",
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
    },
    {
      jobID: 5,
      accountID: undefined,
      clientID: 777,
      clientName: 'Петрова Валентина',
      clientAddress: "ulica 33b",
      workList: "One task",
      startDate: "03.03.2023",
      deadline: "03.04.2023",
      media: "https://placeimg.com/640/480/any",
      price: 15000
    },
    {
      jobID: 6,
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
    getDataFromServer();//placeholder for now
  }, []);

  useEffect(() => {
    console.log('openedJobId:' + openedJobId);
  }, [openedJobId]);
  function handleCartClick(jobId) {
    if (!data)
      console.log('NO DATA! Somehow data is empty, this means that you dont see any imgs in JOB carts')
    const index = data.map(e => e.jobID).indexOf(jobId);

    //if job has media/s OR it`s Overlay component
    if (data[index]?.media?.length > 0 || index == -1)
      setOpenedJobId(jobId);
  }

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
        <Overlay data={testData} openedJobId={openedJobId} onClick={handleCartClick} />
      </GalleryStyleContext.Provider>
    )
  }

  return (
    <View style={generalStyles.screenScroll}>
      {(openedJobId > -1) ? showOverlay(openedJobId) : null}
      <Text style={generalStyles.title}>Активные работы:</Text>
      <GalleryStyleContext.Provider value={previewStyle}>
        {testData.map((el => {
          return (
            <Job job={el} key={el.jobID} onClick={handleCartClick} />
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