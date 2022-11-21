import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabJobsScreen from './src/screens/TabJobsScreen';
import TabMenuScreen from './src/screens/TabMenuScreen';
import TabNewJobScreen from './src/screens/TabNewJobScreen';
import TabRegistrationScreen from './src/screens/TabRegistrationScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TabNewJobScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin:0,
    padding:0
  },
});
