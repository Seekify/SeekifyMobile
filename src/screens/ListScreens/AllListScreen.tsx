import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import SignupScreen from './SignupScreen';

const AllListScreen = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Text>All List Screen</Text>
      <Text onPress={() => {navigation.navigate('LoginScreen')}}>LoginScreen</Text>
      <Text onPress={() => {navigation.navigate('SignupScreen')}}>SignupScreen</Text>
      <Text onPress={() => {navigation.navigate('ProfileCreateScreen')}}>ProfileScren</Text>
    </View>
  )
}

export default AllListScreen
