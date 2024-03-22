import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../Main';
import VideoCall from '../screens/VideoCall';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Main'}
        component={Main}
        options={{
          headerShown: false,
          // statusBarColor: '#0c2d57',
          // statusBarStyle: 'light',
        }}
      />

      <Stack.Screen
        name="videoCall"
        component={VideoCall}
        options={{
          headerShown: false,
          // statusBarColor: '#f6a192',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
