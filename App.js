import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import React, { createContext } from 'react';
import Ionicon from 'react-native-ionicons'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/client/components/TabNavigator'

let jwtToken = require('./src/support-features/globalVariables')

export const GlobalContext = createContext(jwtToken)

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Black.ttf'),
  });
  return (
    <GlobalContext.Provider value={{
      jwtToken,
      fonts: fontsLoaded
    }}>
      <View style={styles.screen}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </View>
      </View>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#FFF',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  main: {
    width: '100%',
    height: '100%',
  },
});
