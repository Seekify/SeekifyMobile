import { signOut } from 'aws-amplify/auth'
import React, { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'

const ProfileScreen = () => {

  const { signOutUser } = useContext(AuthContext)

  return (
    <View>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={() => {signOutUser()}} >
        <Text>Signout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen
