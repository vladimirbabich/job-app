import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import React, { createContext } from 'react';
import TabJobsScreen from './src/client/screens/TabJobsScreen';
import TabUsersScreen from './src/client/screens/TabUsersScreen';
import TabMenuScreen from './src/client/screens/TabMenuScreen';
import TabNewJobScreen from './src/client/screens/TabNewJobScreen';
import TabRegistrationScreen from './src/client/screens/TabRegistrationScreen';
let jwtToken = require('./src/support-features/globalVariables')

export const GlobalContext = createContext(jwtToken)
export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Black.ttf'),
  });
  console.log('ggugug')
  return (
    <GlobalContext.Provider value={{
      jwtToken,
      fonts: fontsLoaded
    }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <TabRegistrationScreen />
      </View>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    backgroundColor: '#FFF',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
});
