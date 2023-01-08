import React, { useEffect, useState } from 'react';
import { Button, Pressable, StyleSheet, TouchableOpacity, TextInput, View, Text, Image } from 'react-native';
import generalStyles, { colors, mainWidth } from '../../../generalStyles';
import { CustomButton } from './CustomButton';
const avatarFolderUrl = 'http://localhost:7000/avatars/'
const noAvatarUrl = 'http://localhost:7000/noAvatar.png'

export default function User(props) {
  // console.log(props)
  const [aboutUI, setAboutUI] = useState();
  const { user } = props;

  useEffect(() => {
    setAboutUI(user?.about?.length > 60 ?
      user?.about.substring(0, 60) + '...' :
      user?.about
    )
  }, []);

  

  return (<View style={styles.user}>
    <View style={styles.leftSide}>
      <View style={styles.head}>
        <Text style={{
          fontWeight: 'bold', paddingLeft: '0.5vh'
        }}>{user.name}</Text>
        <Text style={styles.texts}>{user.avgRating > 0 ? user.avgRating : '-'}/5</Text>
      </View>
      <Image style={styles.photo}
        source={{
          uri: user?.photoUri ? (avatarFolderUrl + user?.photoUri) : noAvatarUrl,
        }}></Image>
      <CustomButton
        title='Offer a job'
        btnStyle={generalStyles.btnSmall}
        textStyle={generalStyles.btnTxtSmall}
        callback={() => { console.log('propose') }} />
    </View>

    <View style={styles.main}>

      <Text style={styles.texts}>Completed jobs: {user.completedJobsCount}</Text>
      {aboutUI ?
        <>
          <Text >About:</Text>
          <Text style={styles.about}>{aboutUI}</Text>
        </> :
        null}
      {/* skillsBOX */}
      <Text>
        Skills:
      </Text>
      {user.skills ? user.skills.map(el => {
        return <Text key={el} value={el} onClick={props.handleClickSkill}>- {el}</Text>;
      }) :
        null}

    </View>
  </View>);
}


const styles = StyleSheet.create({
  user: {
    // padding: '1vh',
    width: mainWidth,
    // height: '20vh',
    // // flex: 1,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',

    alignItems: 'center',
    // display: 'block',
    borderWidth: '1px',
    backgroundColor: colors.cartColor,
    borderColor: colors.actionColor,
    // marginHorizontal: 'auto',
  },
  leftSide: {
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  photo: {
    width: '100%',
    height: '100px',
  },
  img: {},
  main: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '70%',
    padding: '1vh',
  },
  head: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});