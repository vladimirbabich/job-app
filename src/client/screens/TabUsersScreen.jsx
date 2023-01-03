import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pressable, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions, View, Text } from 'react-native';
import User from '../components/User';
import DropDownPicker from '../components/DropDownPicker';
import generalStyles from '../../../generalStyles';

const getAllUrl = 'http://localhost:7000/api/user/getall'
const getAllSkillsUrl = 'http://localhost:7000/api/skill/getall';

export default function TabUsersScreen() {
  const [users, setUsers] = useState([]);
  const [usersUI, setUsersUI] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getDataFromServer();
    axios.get(getAllSkillsUrl).then(res => { setSkills(res.data.map(el => el.name)) });
  }, []);

  useEffect(() => {
    // console.log(usersUI)
  }, [usersUI]);

  useEffect(() => {
    const arr = users.filter(el => {
      for (const item of filter) {
        if (el.skills.indexOf(item) > -1)
          return el
      }
    })
    if (filter.length > 0) {
      setUsersUI([...arr])
    } else {
      setUsersUI([...users])
    }
  }, [filter]);

  function getDataFromServer() {
    axios.get(getAllUrl)
      .then(function (response) {
        setUsers([...response.data])
        setUsersUI([...response.data])
        console.log('data loading completed!');
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const handleClickSkill = (e) => {
    const skill = e.target.innerText.substring(2);
    if (filter.indexOf(skill) > -1) {
      return;
    }
    setFilter(prev => {
      return [...prev, skill]
    });
  }

  if (!usersUI) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={generalStyles.title}>
        Choose a worker:
      </Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        selection={filter}
        setSelection={setFilter}
        list={skills}
      />
      {usersUI && usersUI?.map((el) => {
        return <User handleClickSkill={handleClickSkill} key={el.id} user={el} />;
      })}
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
  userBlock: {
    margin: '1%',
    height: 100,
    width: 100,
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});