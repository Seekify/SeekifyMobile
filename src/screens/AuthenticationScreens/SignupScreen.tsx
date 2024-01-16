import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Mail, MapPin, Phone, Unlock, User } from 'react-native-feather'

const SignupScreen = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')

  const [viewTab, setViewTab] = useState('signup')

  const handleUsernameChage = (text: string) => {
    setUsername(text)
  }

  const handleEmailChage = (text: string) => {
    setEmail(text)
  }

  const handlePasswordChage = (text: string) => {
    setPassword(text)
  }

  const handleVerifyChage = (text: string) => {
    setVerify(text)
  }

  const handleNameChage = (text: string) => {
    setName(text)
  }

  const handlePhoneChage = (text: string) => {
    setPhone(text)
  }

  const handleLocationChage = (text: string) => {
    setLocation(text)
  }

  const displayProfile = () => {
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Create Profile</Text>
        </View>
        <View style={styles.mainFormContainer}>
          <View style={styles.formContainer}>
            <View style={styles.userInputContainer}>
              <User style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'name'}
                value={name}
                onChangeText={(text) => {handleNameChage(text)}}
              />
            </View>
            <View style={styles.userInputContainer}>
              <Phone style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'phone'}
                value={phone}
                onChangeText={(text) => {handlePhoneChage(text)}}
              />
            </View>
            <View style={styles.userInputContainer}>
              <MapPin style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'location'}
                value={location}
                onChangeText={(text) => {handleLocationChage(text)}}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => {navigation.navigate('AllListScreen')}} style={styles.loginButton}>
            <Text style={styles.loginText}>Create Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setViewTab('signup')}} style={styles.createContainer}>
            <Text style={styles.createTextRed}>Go Back</Text>
          </TouchableOpacity>
        </View>
        <Image style={styles.icons} source={require('../../assets/abstract.png')}/>
      </View>
    )
  }

  const displayLogin = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Image style={styles.logoImage} source={require('../../assets/SeekifyLogoRedBlack.png')}/>
          <Text style={styles.slug}>Discover, Savor, and Share</Text>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Signup</Text>
        </View>
        <View style={styles.mainFormContainer}>
          <View style={styles.formContainer}>
            <View style={styles.userInputContainer}>
              <User style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'username'}
                value={username}
                onChangeText={(text) => {handleUsernameChage(text)}}
              />
            </View>
            <View style={styles.userInputContainer}>
              <Mail style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'email'}
                value={email}
                onChangeText={(text) => {handleEmailChage(text)}}
              />
            </View>
            <View style={styles.userInputContainer}>
              <Unlock style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'password'}
                value={password}
                onChangeText={(text) => {handlePasswordChage(text)}}
              />
            </View>
            <View style={styles.userInputContainer}>
              <Unlock style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'verify password'}
                value={verify}
                onChangeText={(text) => {handleVerifyChage(text)}}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => {setViewTab('profile')}} style={styles.loginButton}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.createContainer}>
          <Text style={styles.createText}>Have an account: <Text onPress={() => {navigation.navigate('LoginScreen')}} style={styles.blueText}>Login</Text></Text>
        </View>
        <Image style={styles.icons} source={require('../../assets/abstract.png')}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {
        viewTab === 'signup'
          ? displayLogin()
          : displayProfile()
      }
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
    color: '#e94f4e'
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
  loginText: {
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
  createTextRed: {
    fontWeight: '600',
    color: '#e94f4e'
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

export default SignupScreen
