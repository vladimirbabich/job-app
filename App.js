import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/client/components/TabNavigator'
import TabRegistrationScreen from './src/client/screens/TabRegistrationScreen';
import { getStorageValue } from './src/support-features/supportFunctions';
import axios from 'axios';
import TabNewJobScreen from './src/client/screens/TabNewJobScreen';

export const GlobalContext = createContext(null)

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Black.ttf'),
  });

  const [jwtToken, setJwtToken] = useState();

  useEffect(() => {
    console.log('token: ' + jwtToken)
  }, [jwtToken]);

  useEffect(() => {
    // AsyncStorage.clear();
    // console.log('%cgetStorageValue', 'color:red')
    getStorageValue('token').then(token => {
      // const decodedToken = jwt.decode(token)
      // axios.get()
      if (token)
        setJwtToken(token)
    })
  }, []);

  return (
    <GlobalContext.Provider value={{
      jwtToken: jwtToken,
      setJwtToken: async (token) => {
        try {
          setJwtToken(token)
          await AsyncStorage.setItem(
            'token',
            token,
          );
        } catch (error) {
          // Error saving data
          console.log(`Error: ${error}`)
        }
      },
      fonts: fontsLoaded
    }
    } >
      <View style={styles.screen}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          {console.log(jwtToken)}
          {jwtToken ? <NavigationContainer >
            <TabNavigator />
          </NavigationContainer>
            : <TabRegistrationScreen />}
        </View>
      </View>
    </ GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto-Regular',
    alignItems: 'center',
    margin: 0,
    backgroundColor:'red',
    padding: 0
  },
  main: {
    width: '100%',
    height: '100%',
  },
});
