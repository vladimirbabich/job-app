import React, { useContext, useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, Image, TouchableOpacity, TextInput, View, Text } from 'react-native';
import generalStyles, { colors, mainWidth } from '../../../generalStyles';
const jwt = require('jsonwebtoken')

import { CustomButton } from './CustomButton';
import { Gallery } from './Gallery';
import { Avatar } from './Avatar';
import { GlobalContext } from '../../../App';

const JOBSETTINGSFONTSIZE = 25;
const WORKLISTFONTSIZE = 16;

export default function Job(props) {

  let globalContext = useContext(GlobalContext);
  const userId = jwt.decode(globalContext.jwtToken).id;

  const fixedWorkList = props.job.workList.replaceAll(/\n/gm, ' ');
  let tempWL = fixedWorkList.length > 80 ?
    fixedWorkList.substring(0, 80) + '...' :
    fixedWorkList;
  const [workListUI, setWorkListUI] = useState(tempWL);
  const { job } = props;


  const deadlineJSX = job.deadline ?
    <Text style={styles.deadline} >Deadline: {job.deadline.split('T')[0]}</Text> :
    <Text style={styles.deadline} >Deadline not specified</Text>;
  const workAddressJSX = job.workAddress ?
    <Text style={styles.workAddress} >Address: {job.workAddress}</Text> :
    <Text style={styles.workAddress} >Address not specified</Text>;

  const priceJSX = job.price ?
    <Text style={styles.workAddress} >Budget: {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(props.job.price)}</Text> :
    <Text style={styles.workAddress} >Budget not specified</Text>;

  function showExtra() {
    if (fixedWorkList.length < 80) return;
    setWorkListUI(fixedWorkList == workListUI ?
      fixedWorkList.substring(0, 80) + '...' :
      fixedWorkList)
  }

  useEffect(() => {
    if (props.job.extraInfo) setExtraBtnBool(true);
  }, []);

  return (userId == job.id) ? null :

    (
      <TouchableOpacity style={styles.job} onPress={showExtra}>
        {/* <Pressable id='extraInfo' style={styles.btnExtra} onPress={showExtra}> */}

        {/* <View style={styles.header}>
      </View> */}
        <View style={styles.middle}>
          <View style={styles.leftSide}>
            <Text style={styles.jobID} >Order №{job.id}</Text>
            <TouchableOpacity style={styles.gallery} onPress={() => {
              props.onClick(job.id)
            }}>
              <Gallery media={job.media} key={job.id} />
            </TouchableOpacity>
            <Avatar id={job.userId} />
          </View>
          <View style={styles.description}>
            <Text style={styles.workList} >{workListUI}</Text>
            {priceJSX}
            {workAddressJSX}
            {deadlineJSX}

            <CustomButton
              title='Offer your services'
              btnStyle={generalStyles.btnSmall}
              textStyle={generalStyles.btnTxtSmall}
              callback={() => { console.log('Offer your services'); }} />


          </View>
        </View>
      </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
  job: {
    alignItems: 'center',
    width: mainWidth,
    display: 'block',
    borderWidth: '1px',
    backgroundColor: colors.cartColor,
    borderColor: colors.actionColor,
    color: 'red',
    marginHorizontal: 'auto',
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

    float: 'left',
    textAlign: 'justify',
    // borderWidth: 4,
    fontSize: WORKLISTFONTSIZE,
  },
  gallery: {
    margin: '1%',
    height: 100,
    width: 100,
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
    justifyContent: 'space-evenly',
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
