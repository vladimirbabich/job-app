import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabJobsScreen from './src/client/screens/TabJobsScreen';
import TabMenuScreen from './src/client/screens/TabMenuScreen';
import TabNewJobScreen from './src/client/screens/TabNewJobScreen';
import TabRegistrationScreen from './src/client/screens/TabRegistrationScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TabJobsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0
  },
});
