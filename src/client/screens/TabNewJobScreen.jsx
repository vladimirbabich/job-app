import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, ScrollView } from 'react-native';
import MenuField from '../components/MenuField';
import generalStyles from '../../../generalStyles';
import { CustomButton } from '../components/CustomButton';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const newJobUrl = 'http://localhost:7000/api/job'
import axios from 'axios';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

export default function TabNewJobScreen() {
  //fields values: name, description for user, necessarity
  let fields = [
    ['phone', 'Phone number', true],
    ['clientName', 'Username', true],
    ['workAddress', 'Work address', true],
    ['workList', 'Requested tasks', true],
    ['price', 'Budget', false]
  ];
  const [newJobData, setNewJobData] = useState({});
  const [isActiveCalendar, setIsActiveCalendar] = useState(false);
  // fields.map(()=>{

  // })

  const handleJobData = ({ target }, name) => {
    setNewJobData((prev) => ({
      ...prev,
      [name]: target.value
    }))
  }
  useEffect(() => {
    console.log('%cnewJobData:', 'color:green; font-size: 15px');
    console.dir(newJobData);
  }, [newJobData]);

  const handleClickAddMedia = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.dir(result);

    if (!result.cancelled) {
      for (let el in result) {
        console.log(el);
      }
      console.dir('%c' + result, 'color:red');
    }
  };
  const handleClickCreateJob = async () => {
    axios.post(newJobUrl,
      newJobData).then(res =>
        console.log(res))
  }

  const testF = async () => {
    alert('test');
  };
  const showCalendar = (isActive) => {
    if (isActive) {
      return <Calendar
        minDate={new Date().toISOString().split('T')[0]}
        onDayPress={day => {
          setNewJobData((prev) => ({
            ...prev,
            'deadline': day.dateString
          }))
          setIsActiveCalendar(!isActiveCalendar);
        }}></Calendar>
    }
  }
  const handleClickChooseDate = () => {
    setIsActiveCalendar(!isActiveCalendar);
  }
  return (
    <ScrollView contentContainerStyle={generalStyles.screenScroll}>
      <Text style={generalStyles.title}>Fill in the details of a job:</Text>
      {fields.map((el) => {
        return <MenuField key={el[0]} field={el} onChange={(e, name) => handleJobData(e, name)} />
      })}
      <CustomButton
        title='Choose deadline date'
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
    backgroundColor:'red',
  },
  input: {
    alignItems: 'center',
    height: 40,
    width: '80%',
    // margin: 12,
    borderWidth: 1,
    // padding: 10,
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
    // height: 1,
    // width: 'auto',
  },
});
