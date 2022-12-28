import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, TouchableOpacity, TextInput, View, Text } from 'react-native';
import generalStyles, { colors } from '../../../generalStyles';

import { CustomButton } from './CustomButton';
import { Gallery } from './Gallery';

const JOBSETTINGSFONTSIZE = 25;
const WORKLISTFONTSIZE = 16;

export default function Job(props) {
  let tempWL = props.job.workList.length > 80 ?
    props.job.workList.substring(0, 80) + '...' :
    props.job.workList;
  const [workListUI, setWorkListUI] = useState(tempWL);
  const { job } = props;


  const deadlineJSX = job.deadline ?
    <Text style={styles.deadline} >Выполнить до: {job.deadline.split('T')[0]}</Text> :
    <Text style={styles.deadline} >Без даты завершения</Text>;

  const clientAddressJSX = job.clientAddress ?
    <Text style={styles.clientAddress} >Адрес: {props.job.clientAddress}</Text> :
    <Text style={styles.clientAddress} >Адрес не указан</Text>;

  const priceJSX = job.price ?
    <Text style={styles.clientAddress} >Бюджет на работу: {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(props.job.price)}</Text> :
    <Text style={styles.clientAddress} >Рабочий бюджет не указан</Text>;

  function showExtra() {
    if (job.workList.length < 80) return;
    setWorkListUI(job.workList == workListUI ?
      props.job.workList.substring(0, 80) + '...' :
      props.job.workList)
  }

  useEffect(() => {
    if (props.job.extraInfo) setExtraBtnBool(true);
  }, []);


  return (
    <TouchableOpacity style={styles.job} onPress={showExtra}>
      {/* <Pressable id='extraInfo' style={styles.btnExtra} onPress={showExtra}> */}

      <View style={styles.header}>
        <Text style={styles.jobID} >{props.job.jobID}</Text>
        {/* <View style={styles.jobSettings}>
          <Pressable style={styles.favorites} onPress={() => { console.log('Избранное button'); }}>
            <Text style={{ fontSize: JOBSETTINGSFONTSIZE }}>☆</Text>
          </Pressable>
          <Pressable style={styles.options} onPress={() => { console.log('options button'); }}>
            <Text style={{ fontSize: JOBSETTINGSFONTSIZE }}>☰</Text>
          </Pressable>
        </View> */}
      </View>
      <View style={styles.middle}>
        <TouchableOpacity style={styles.gallery} onPress={() => {
          console.dir(props)
          console.log(`%cjobID: ${props.job.id}`, 'color:cyan')
          props.onClick(props.job.id)
        }}>
          <Gallery media={props.job.media} key={job.id} />
        </TouchableOpacity>
        <View style={styles.description}>
          <Text style={styles.workList} >{workListUI}</Text>
          {priceJSX}
          {clientAddressJSX}
          {deadlineJSX}
          <CustomButton
            title='Предложить свои услуги'
            btnStyle={generalStyles.btnSmall}
            textStyle={generalStyles.btnTxtSmall}
            callback={() => { console.log('Предложить свои услуги'); }} />
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  job: {
    alignItems: 'center',
    width: '100%',
    display: 'block',
    borderWidth: '1px',
    backgroundColor: colors.cartColor,
    borderColor: colors.actionColor,
    color: 'red',
    margin: 5
  },
  header: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    width: '98%',
    margin: '1%'
  },
  workList: {
    // width: '96%',
    // marginLeft: '2%',
    textAlign: 'justify',
    // borderWidth: 4,
    fontSize: WORKLISTFONTSIZE,
  },
  gallery: {
    margin: '1%',
    height: 100,
    width: 100,
    backgroundColor: 'purple',
    zIndex: 2,
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSide: {
    flexDirection: 'column',
    margin: '1%'
  },
  description: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '2%',
    width: '66%'
  },
  btnPropose: {
    zIndex: 1,
  },
  btnExtra: {
    alignItems: 'center',
  },
  extraInfo: {
    // alignItems: 'left',
    margin: '1%',
  },
  jobSettings: {
    flexDirection: 'row',
    // alignItems: 'left',
    margin: '1%',
  },
  favorites: {
    fontSize: 35,
  },
  options: {
    fontSize: 35,
  },
});
