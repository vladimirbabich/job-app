
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import TabJobsScreen from './../screens/TabJobsScreen';
import TabUsersScreen from './../screens/TabUsersScreen';
import TabNewJobScreen from './../screens/TabNewJobScreen';
import TabRegistrationScreen from './../screens/TabRegistrationScreen';
import TabAccountScreen from './../screens/TabAccountScreen';
import { colors } from './../../../generalStyles';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      style={{ backgroundColor: 'red' }}
      initialRouteName={'Account'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.actionColor,
        tabBarInactiveTintColor: 'black',
        tabBarIcon: ({ focused }) => {
          const urlsObj = {
            'New Job': 'http://localhost:7000/menu/plus.svg',
            'Jobs': 'http://localhost:7000/menu/job.svg',
            'Users': 'http://localhost:7000/menu/users.svg',
            'Account': 'http://localhost:7000/menu/user.svg',
          }
          if (!urlsObj[route.name]) {
            console.error(`Error: link to image of [${route.name}] does not found`)
          }
          return <Image
            style={focused ? styles.iconActive : styles.icon}
            source={{
              uri: urlsObj[route.name] || '',
            }}></Image>
        }
      })}
    >
      {/* <Tab.Screen name="Registration" component={TabRegistrationScreen} /> */}
      <Tab.Screen name="New Job" component={TabNewJobScreen} />
      <Tab.Screen name="Jobs" component={TabJobsScreen} />
      <Tab.Screen name="Users" component={TabUsersScreen} />
      <Tab.Screen name="Account" component={TabAccountScreen} />
    </Tab.Navigator >
  );
}

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'stretch',
    width: '3vh',
    height: '3vh',
  },
  iconActive: {
    resizeMode: 'stretch',
    width: '3vh',
    height: '3vh',
    filter: 'invert(47%) sepia(88%) saturate(322%) hue-rotate(125deg) brightness(95%) contrast(88%)',
  },
  label: {
    color: 'black',
  },
  labelActive: {
    color: colors.actionColor,
  },
});
