import { useNavigation } from '@react-navigation/native'
import { signIn } from 'aws-amplify/auth'
import React, { useContext, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Edit3, Lock, MessageSquare, Unlock, User } from 'react-native-feather'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const AddListScreen = () => {
  const navigation = useNavigation()

  const {user} = useContext(AuthContext)

  const [listName, setListName] = useState('')
  const [listDescription, setListDescription] = useState('')

  const handleListNameChage = (text: string) => {
    setListName(text)
  }

  const handleListDescriptionChage = (text: string) => {
    setListDescription(text)
  }

  const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  };

  const addNewList = () => {
    let newListAdded = `${user.username} created a new list: ${listName}`
    console.log(newListAdded)
    let newListObject = {
      list_reference: generateCode(),
      name: listName,
      description: listDescription,
      user_Count: 1,
      place_count: 0,
      last_added: newListAdded,
      created_by: user.username,
      created_at: new Date(),
      last_updated: new Date(),
    }
    const url = 'http://localhost:3000/api/v1/list'; 
    return axios.post(url, newListObject)
      .then(response => {
        console.log('List created successfully:', response.data);
        navigation.navigate('AllListScreen')
      })
      .catch(error => {
        console.error('Error creating new list:', error);
        throw error; 
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create A New List</Text>
      </View>
      <View style={styles.mainFormContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>List Name: </Text>
          <View style={styles.userInputContainer}>
            <Edit3 style={styles.label} stroke={'black'} height={22} width={22} />
            <TextInput
              style={styles.inputSplit}
              returnKeyType="done"
              placeholder={'List Name'}
              autoCapitalize='none'
              value={listName}
              onChangeText={(text) => {handleListNameChage(text)}}
            />
          </View>
          <Text style={styles.inputLabel}>List Description: </Text>
          <View style={styles.userInputContainer}>
            <MessageSquare style={styles.label} stroke={'black'} height={22} width={22} />
            <TextInput
              style={styles.inputSplit}
              returnKeyType="done"
              placeholder={'List Description'}
              autoCapitalize='none'
              value={listDescription}
              onChangeText={(text) => {handleListDescriptionChage(text)}}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => {addNewList()}} style={styles.addButton}>
          <Text style={styles.addText}>Add New List</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  mainFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inputLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500'
  },
  userInputContainer: {
    borderColor: 'lightgrey',
    borderWidth: 2,
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    backgroundColor: 'white'
  },
  label: {
    marginRight: 8
  },
  inputSplit: {
    flex: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    fontSize: 18,
    fontWeight: '500'
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#e94f4e',
    borderRadius: 10,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  },
  addText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  createContainer: {
    width: '100%',
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  createText: {
    fontWeight: '600'
  },
})

export default AddListScreen
