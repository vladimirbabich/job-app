import React, { useContext, useEffect, useRef, useState } from 'react';
const jwt = require('jsonwebtoken')
import axios from 'axios';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import MenuField from '../components/MenuField';
import generalStyles, { colors, mainWidth } from '../../../generalStyles';
import { CustomButton } from '../components/CustomButton';
import { pickImage } from '../../support-features/supportFunctions';
import { GlobalContext } from '../../../App';

import { newJobUrl } from '../../../API'

export default function TabNewJobScreen() {
  //fields values: name, description for user, necessarity
  let fields = [
    ['phone', 'Phone number', true],
    ['workAddress', 'Work address', true],
    ['workList', 'Work list', true],
    ['price', 'Budget', false]
  ];
  const [newJobData, setNewJobData] = useState({});
  const [isActiveCalendar, setIsActiveCalendar] = useState(false);

  let globalContext = useContext(GlobalContext);

  const handleJobData = ({ target }, name) => {
    setNewJobData((prev) => ({
      ...prev,
      [name]: target.value
    }))
  }

  const handleClickAddMedia = async () => {
    const photo = await pickImage();
    // No permissions request is necessary for launching the image library
    setNewJobData(prev => ({
      ...prev,
      photoUri: photo?.uri,
      photoW: photo?.w,
      photoH: photo?.h,
    }))
  };
  const handleClickCreateJob = async () => {
    if (!newJobData?.workList) return;
    var bodyFormData = new FormData();
    for (const el in newJobData) {
      bodyFormData.append(el, newJobData[el]);
    }
    axios.post(newJobUrl,
      {
        ...newJobData,
        userId: jwt.decode(globalContext.jwtToken).id,

      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${globalContext.jwtToken}`
        }
      }).then(res =>
        globalContext.setJwtToken(res.data))
  }

  const testF = async () => {
    alert('test');
  };
  const showCalendar = (isActive) => {
    if (isActive) {
      // const direction = 'left';
      return <Calendar
        theme={{
          textSectionTitleColor: '#000',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayTextColor: 'purple',
          todayTextColor: 'red',
          dayTextColor: '#000',
          textDisabledColor: colors.descriptionColor,
          disabledArrowColor: 'red',
          monthTextColor: '#000',
          textDayFontFamily: 'Roboto',
          textMonthFontFamily: 'Roboto',
          textDayHeaderFontFamily: 'Roboto',
        }}
        style={{
          width: '95%',
          margin: 'auto',
        }}
        renderArrow={(direction) => direction === 'left' ? <Text>〈</Text > : <Text>〉</Text >}
        minDate={new Date().toISOString().split('T')[0]}
        onDayPress={day => {
          setNewJobData((prev) => ({
            ...prev,
            'deadline': day.dateString
          }))
          setIsActiveCalendar(!isActiveCalendar);
        }
        }></Calendar >
    }
  }
  const handleClickChooseDate = (e) => {
    setIsActiveCalendar(!isActiveCalendar);
  }
  return (
    <ScrollView contentContainerStyle={generalStyles.screenScroll}>
      <Text style={generalStyles.title}>Fill in the details of a job:</Text>
      {fields.map((el) => {
        if (el[0] == 'phone') return <MenuField newJobData={newJobData} key={el[0]} field={el} onChange={(e, name) => handleJobData(e, name)} />
        return <MenuField key={el[0]} field={el} onChange={(e, name) => handleJobData(e, name)} />
      })}
      <CustomButton
        title={newJobData?.deadline ? `Deadline: ${newJobData.deadline}` : 'Choose deadline date'}
        btnStyle={generalStyles.btn}
        textStyle={generalStyles.btnTxt}
        callback={handleClickChooseDate} />
      {showCalendar(isActiveCalendar)}
      <CustomButton
        title='Add media files'
        btnStyle={generalStyles.btn}
        textStyle={generalStyles.btnTxt}
        callback={handleClickAddMedia} />
      <CustomButton
        title='Create a job'
        btnStyle={generalStyles.btn}
        textStyle={generalStyles.btnTxt}
        callback={handleClickCreateJob} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'red',
  },
  input: {
    alignItems: 'center',
    height: 40,
    width: '80%',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  testForm: {
    display: 'flex',
    flexDirection: 'column',
  },
});
