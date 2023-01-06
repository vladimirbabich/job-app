import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, View, Text } from 'react-native';
import DropDownPicker from '../components/DropDownPicker';
import generalStyles from '../../../generalStyles';
import { CustomButton } from '../components/CustomButton';
const userId = 3;
const getAccountUrl = 'http://localhost:7000/api/user/get?id=' + userId
const avatarFolderUrl = 'http://localhost:7000/avatars/'
const noAvatarUrl = 'http://localhost:7000/noAvatar.png'

const getAllSkillsUrl = 'http://localhost:7000/api/skill/getall';
const createUserSkillUrl = 'http://localhost:7000/api/userskill/';
const deleteUserSkillUrl = 'http://localhost:7000/api/userskill/delete';

export default function TabAccountScreen() {
  const [account, setAccount] = useState();
  const [accountUI, setAccountUI] = useState();
  const [isDropdown, setIsDropdown] = useState(false);

  //dropDownStates
  const [open, setOpen] = useState();
  const [currentSkills, setCurrentSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    console.log(allSkills)
  }, [allSkills]);

  useEffect(() => {
    axios.get(getAccountUrl).then(res => {
      console.log(res.data)
      setAccount(res.data)
      setAccountUI({
        pass: res.data.pass,
        about: res.data.about.length > 50
          ? res.data.about.substring(0, 37) + '...'
          : res.data.about,
        skills: [...res.data.skills],
      })
      setCurrentSkills([...res.data.skills])
    });
    axios.get(getAllSkillsUrl).then(res => { setAllSkills(res.data) });
  }, []);
  useEffect(() => {
    console.log(accountUI?.skills)
  }, [accountUI?.skills])
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
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
        <Image style={styles.photo}
          source={{
            uri: account?.photo ? (avatarFolderUrl + account?.photo) : noAvatarUrl,
          }}></Image>
        <Text style={{
          fontFamily: 'Roboto-Black',
          textAlign: 'center',
          padding: '2%',
          fontSize: 20,
          fontWeight: 'bold',
        }}>
          {account.name}
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.key}>About:</Text>
          <View style={styles.right}><Text style={styles.value}>{accountUI.about || 'Write something about yourself'}</Text>
            <CustomButton
              title='🖊'
              callback={() => { console.log('Change'); }} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Pass:</Text>
          <Text style={styles.value}>*****</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Rating:</Text>
          <Text style={styles.value}>{account.rating}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Account created:</Text>
          <Text style={styles.value}>{account.createdAt}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Phone:</Text>
          <Text style={styles.value}>{account.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Email:</Text>
          <Text style={styles.value}>{account.email}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.key}>Skills:</Text>
          <CustomButton
            title='🖊'
            callback={() => {
              console.log('Change');
              if (isDropdown) {//if drop down closing ->update screen and DB
                setAccountUI(prev => {
                  return { ...prev, skills: currentSkills }
                })
                console.log('account.skills')
                console.log(account.skills)
                console.log('currentSkills')
                console.log(currentSkills)
                const skillsToDelete = account.skills.filter((el) => !currentSkills.includes(el));
                const skillsToAdd = currentSkills.filter((el) => !account.skills.includes(el));
                console.log(allSkills)
                skillsToDelete.map(el => {
                  let str = `${deleteUserSkillUrl}?userId=${userId}&skillId=${allSkills[allSkills.map(skill => skill.name).indexOf(el)].id}`
                  console.log('213123')
                  console.log(str)
                  axios.delete(str).then(res => console.log(res))
                })
                console.dir('skillsToDelete')
                console.dir(skillsToDelete)
                console.dir('skillsToAdd')
                console.dir(skillsToAdd)
                skillsToAdd.forEach(el => {
                  axios.post(createUserSkillUrl, {
                    userId,
                    skillId: allSkills[allSkills.map(skill => skill.name).indexOf(el)].id
                  })
                })

                // axios.post()
              }
              setIsDropdown(!isDropdown)
            }} />
        </View>
        {showDropdown(isDropdown)}
        {accountUI.skills.map((el, i) =>
          <Text key={el} style={styles.skill}>{el}</Text>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  photo: {
    width: '5vh',
    borderRadius: '50%',
    // height: '100px',
  },
  table: {
    width: '95%',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: '1px',
    borderStyle: 'dashed',
  },
  right: {
    flexDirection: 'row',
  },
  skill: {
    // borderColor:'red',
    // borderWidth:'3px',
  }

});