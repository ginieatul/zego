import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigation from './navigation/StackNavigation'
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})