import { useNavigation } from '@react-navigation/native'
import { autoSignIn, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Mail, MapPin, Phone, Unlock, User } from 'react-native-feather'

const ConfirmEmailScreen = ({route}) => {
  const {username} = route?.params
  const navigation = useNavigation()

  const [confirmationCode, setConfirmationCode] = useState('')

  const handleUsernameChange = (text: string) => {
    setConfirmationCode(text)
  }

  const confirmEmailCode = () => {
    confirmSignUp({
        username: username,
        confirmationCode: confirmationCode
    })
    .then(response => {
      console.log(response)
      setConfirmationCode('')
      autoSignIn()
      navigation.navigate('LoginScreen');
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
    });
  };

  const resendConfirmationCode = () => {
    resendSignUpCode({
      username: username
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
        console.log('Error confirming sign up', error);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.slug}>Confirmation Email</Text>
        <Text style={styles.subSlug}>Enter the code that was emailed to you!</Text>
      </View>
      <View style={styles.mainFormContainer}>
        <View style={styles.formContainer}>
          <View style={styles.userInputContainer}>
            <User style={styles.label} stroke={'black'} height={22} width={22} />
            <TextInput
              style={styles.inputSplit}
              returnKeyType="done"
              placeholder={'confirmation code'}
              value={confirmationCode}
              onChangeText={(text) => {handleUsernameChange(text)}}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => {confirmEmailCode()}} style={styles.loginButton}>
          <Text style={styles.loginText}>Confirm Code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {resendConfirmationCode()}} style={styles.loginButtonInverse}>
          <Text style={styles.loginTextInverse}>Resend Code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.createContainer}>
          <Text style={styles.createText}>Go Back</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.icons} source={require('../../assets/abstract.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logoImage: {
    height: 48,
    width: 231
  },
  slug: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  subSlug: {
    marginTop: 6,
    fontSize: 16,
    color: 'black'
  },
  subHeader: {
    marginTop: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  subHeaderText: {
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
    alignItems: 'flex-end',
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
    marginTop: 16,
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
  forgotPassword: {
    marginTop: 6,
    fontSize: 16,
    color: '#e94f4e'
  },
  loginButton: {
    marginTop: 16,
    backgroundColor: '#e94f4e',
    borderRadius: 10,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  },
  loginButtonInverse: {
    marginTop: 16,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e94f4e',
    borderRadius: 10,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  loginTextInverse: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e94f4e'
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
  blueText: {
    color: '#e94f4e'
  },
  icons: {
    position: 'absolute',
    height: 400,
    width: 240,
    left: Dimensions.get('screen').width - 240,
    top: 0,
    opacity: .4,
    zIndex: -1
  }
})

export default ConfirmEmailScreen
