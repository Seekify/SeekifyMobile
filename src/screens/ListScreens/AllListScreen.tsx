import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { signOut } from 'aws-amplify/auth';
import { AuthContext } from '../../context/AuthContext';

const AllListScreen = () => {
  const navigation = useNavigation()

  const {signOutUser} = useContext(AuthContext)


  return (
    <View>
      <Text>All List Screen</Text>
      <Text onPress={() => {signOutUser()}}>Logout</Text>
    </View>
  )
}

export default AllListScreen
