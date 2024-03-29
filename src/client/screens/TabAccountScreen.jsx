import React, { BackHandler, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Image, StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const jwt = require('jsonwebtoken')

import DropDownPicker from '../components/DropDownPicker';
import generalStyles, { colors, mainWidth } from '../../../generalStyles';
import { CustomButton } from '../components/CustomButton';
import TextUpdater from '../components/TextUpdater';
import { GlobalContext } from '../../../App';


import {
  getAllSkillsUrl, getAccountUrl,
  avatarFolderUrl, noAvatarUrl,
  updateUserUrl, createUserSkillUrl, deleteUserSkillUrl
} from '../../../API'

export default function TabAccountScreen() {
  let globalContext = useContext(GlobalContext);
  const userId = jwt.decode(globalContext.jwtToken).id;
  //screen states
  const [account, setAccount] = useState();//raw data of an acc from server
  const [accountUI, setAccountUI] = useState();
  const [isDropdown, setIsDropdown] = useState(false);

  //dropDownStates
  const [open, setOpen] = useState();
  const [currentSkills, setCurrentSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  //textUpdater state
  const [renderTU, setRenderTU] = useState(false);
  const [currentProperty, setCurrentProperty] = useState();

  useEffect(() => {
    if (globalContext.jwtToken) {
      axios.get(getAccountUrl + userId).then(res => {
        setAccount(res.data)
        setAccountUI({
          pass: '*****',
          about: res.data.about?.length > 50
            ? res.data.about.substring(0, 37) + '...'
            : res.data.about ? res.data.about : '',
          rating: res.data.rating,
          phone: res.data.phone,
          email: res.data.email ? res.data.email : '',
          skills: [...res.data.skills],
          createdAt: res.data.createdAt.split('T')[0]
        })
        setCurrentSkills([...res.data.skills])
      });
      axios.get(getAllSkillsUrl).then(res => { setAllSkills(res.data) });
    }
  }, []);

  useEffect(() => {
  }, [accountUI]);

  const handleCloseSessionClick = () => {
    AsyncStorage.clear();
    globalContext.setJwtToken(null)
  }

  const updateTextValue = ({ key, value }) => {
    if (value != account[key]) {
      axios.get(`${updateUserUrl}?id=${userId}&${key}=${value}`)
        .then((result) => {
          setAccountUI(prev => {
            return { ...prev, [key]: value }
          })
        }).catch((e) => {
          console.log(e.response.data.message)
          Alert.alert(e.response.data.message)
        })
    }
    setRenderTU(!renderTU);
  }
  const toggleRenderTU = ({ key, value }) => {
    setCurrentProperty({ key, value })
    setRenderTU(!renderTU);
  }
  const showDropdown = (isActive) => {
    if (isActive)
      return <DropDownPicker
        open={open}
        setOpen={setOpen}
        selection={currentSkills}
        setSelection={setCurrentSkills}
        list={allSkills.map(el => el.name)} />
  }
  if (!accountUI) return <Text>Loading...</Text>;
  return (
    <ScrollView contentContainerStyle={generalStyles.screenScroll}>
      <View style={{
        flexDirection: 'row',
        width: mainWidth,
        marginHorizontal: 'auto',
        paddingTop: '2%',
        justifyContent: 'center',
      }}>
        <Image style={styles.photo}
          source={{
            uri: account?.photo ? (avatarFolderUrl + account?.photo) : noAvatarUrl,
          }}></Image>
        <View style={{ paddingLeft: '1vh', }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between'
          }}>
            <Text style={{
              fontFamily: 'Roboto-Black',
              textAlign: 'left',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
              {account.name}
            </Text>
            <Text style={{ alignSelf: 'flex-end' }}>{accountUI.rating}/5</Text></View>
          <Text style={styles.creationDate}>Account created: {accountUI.createdAt}</Text>
        </View>
      </View>
      <View style={styles.table}>
        {Object.keys(accountUI).map(el => {
          return el == 'createdAt' || el == 'rating' || el == 'skills' ? null
            : <View key={el} style={styles.row}>
              <Text style={styles.key}>{`${el.charAt(0).toUpperCase() + el.slice(1)}:`}</Text>
              <View style={styles.right}>
                <Text style={styles.value}>{accountUI[el]?.length > 0 ? accountUI[el] : `${el} not described`}</Text>
                <CustomButton
                  title='🖊'
                  btnStyle={styles.redactorBtn}
                  callback={() => { toggleRenderTU({ key: el, value: accountUI[el] }) }} />
              </View>
            </View>

        })}
        {renderTU ? <TextUpdater
          updateHandler={(property) => updateTextValue(property)}
          cancelHandler={(property) => toggleRenderTU(property)}
          name={'test'}
          currentProperty={currentProperty} />
          : null}
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.key}>Skills:</Text>
          <CustomButton
            title='🖊'
            btnStyle={styles.redactorBtn}
            callback={() => {
              if (isDropdown) {//if drop down closing ->update screen and DB
                setAccountUI(prev => {
                  return { ...prev, skills: currentSkills }
                })
                const skillsToDelete = account.skills.filter((el) => !currentSkills.includes(el));
                const skillsToAdd = currentSkills.filter((el) => !account.skills.includes(el));
                skillsToDelete.map(el => {
                  let str = `${deleteUserSkillUrl}?userId=${userId}&skillId=${allSkills[allSkills.map(skill => skill.name).indexOf(el)].id}`
                  axios.delete(str).then(res => console.log(res))
                })
                skillsToAdd.forEach(el => {
                  axios.post(createUserSkillUrl, {
                    userId,
                    skillId: allSkills[allSkills.map(skill => skill.name).indexOf(el)].id
                  })
                })
              }
              setIsDropdown(!isDropdown)
            }} />
        </View>
        {showDropdown(isDropdown)}
        <View style={{ flexFlow: 'row wrap' }}>
          {accountUI.skills.map((el, i) =>
            <Text key={el} style={styles.skill}>{el}</Text>)}
        </View>
      </View>
      <CustomButton
        title='Close session'
        btnStyle={generalStyles.btn}
        textStyle={generalStyles.btnTxt}
        callback={handleCloseSessionClick} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '1vh',
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  photo: {
    width: '5vh',
    borderRadius: '50%',
  },
  table: {
    width: mainWidth,
    marginHorizontal: 'auto',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: '1px',
    borderColor: colors.actionColor,
    borderStyle: 'dashed',
  },
  right: {
    flexDirection: 'row',
  },
  skill: {
    borderColor: colors.actionColor,
    borderWidth: '1px',
    alignContent: 'center',
    borderStyle: 'dotted',
    fontSize: 16,
    width: 'max-content',
    padding: '0.5vh',
  },
  key: {

    fontFamily: 'Roboto-Black',
    fontSize: 20,
    paddingTop: '2vh',
  },
  value: {

    fontFamily: 'Roboto-Black',
    fontSize: 20,
    paddingTop: '2vh',
  },
  redactorBtn: {
    paddingTop: '2vh',
  },
});