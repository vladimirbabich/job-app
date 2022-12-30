import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';

const avatarFolderUrl = 'http://localhost:7000/avatars/'
const noAvatarUrl = 'http://localhost:7000/noAvatar.png'
const getUserInfoUrl = 'http://localhost:7000/api/user/get';

export function Avatar({ id }) {
  // get from DB photo(if exists) and user.name
  const [user, setUser] = useState();
  useEffect(() => {
    axios.get(`${getUserInfoUrl}?id=${id}`)
      .then((result) => {
        console.dir(result.data);
        setUser(result.data);
      }).catch((e) => {
        console.log(e.response.data.message)
      })
  }, []);


  return <View style={styles.avatar} >
    <View style={styles.left}><Image
      style={styles.photo}
      source={{
        uri: user?.photo ? (avatarFolderUrl + user?.photo) : noAvatarUrl,
      }}></Image>
      <Text style={styles.userName}>{user?.name || 'Loading'}</Text>
    </View>
    <Text style={styles.rating}>{user?.rating || 'Loading'}</Text>
  </View >
}

const styles = {
  avatar: {
    marginTop: '2vh',
    marginBottom: '2vh',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  photo: {
    width: '3vh',
    height: '3vh',
    borderRadius: '50%',

  },
  left: {
    flexDirection: 'row',
  },
  userName: {

  },
}