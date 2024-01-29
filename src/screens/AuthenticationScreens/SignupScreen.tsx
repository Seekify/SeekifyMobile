import { useNavigation } from '@react-navigation/native'
import { signUp } from 'aws-amplify/auth'
import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CheckCircle, Mail, MapPin, Phone, PhoneMissed, Unlock, User } from 'react-native-feather'
import { ROOT_ACCESS_KEY, ROOT_ACCESS_SECRET } from '@env';
import axios from 'axios'
const AWS = require('aws-sdk');


const SignupScreen = () => {
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')

  const [viewTab, setViewTab] = useState('signup')

  const [availableUsername, setAvailableUsername] = useState(true)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [availableEmail, setAvailableEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(false)
  const [validVerify, setValidVerify] = useState(false)

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  AWS.config.update({
      region: 'us-west-1', 
      accessKeyId: ROOT_ACCESS_KEY,
      secretAccessKey: ROOT_ACCESS_SECRET
  });

  const cognito = new AWS.CognitoIdentityServiceProvider();

  const isUsernameExists = (text: string) => {
    setCheckingUsername(true)
    const params = {
        UserPoolId: 'us-west-1_obzfYKyVY', // e.g., 'us-west-2_1a2b3c4d5'
        Filter: `username = "${text}"`,
        Limit: 1
    };

    return cognito.listUsers(params).promise()
        .then(response => {
            return response.Users.length > 0;
        })
        .catch(error => {
            console.error('Error checking username:', error);
            throw error;
        });
  };

  const isEmailExists = (text: string) => {
    const params = {
        UserPoolId: 'us-west-1_obzfYKyVY', // e.g., 'us-west-2_1a2b3c4d5'
        Filter: `email = "${text}"`,
        Limit: 1
    };

    return cognito.listUsers(params).promise()
        .then(response => {
            return response.Users.length > 0;
        })
        .catch(error => {
            console.error('Error checking username:', error);
            throw error;
        });
  };

  const isPasswordValid = (password: string) => {
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    const containsNumber = /\d/.test(password);
  
    return containsUppercase && containsLowercase && containsNumber;
  };

  const handleUsernameChage = (text: string) => {
    setUsername(text)
    isUsernameExists(text)
      .then(exists => {
        exists
          ? setAvailableUsername(false)
          : setAvailableUsername(true)
        setCheckingUsername(false)
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

  const handleEmailChage = (text: string) => {
    setEmail(text.toLowerCase())
    emailRegex.test(text)
      ? setValidEmail(true)
      : setValidEmail(false)
    isEmailExists(text.toLowerCase())
      .then(exists => {
        exists
          ? setAvailableEmail(false)
          : setAvailableEmail(true)
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

  const handlePasswordChage = (text: string) => {
    setPassword(text)
    setValidPassword(isPasswordValid(text))
    setValidVerify(verify === text)
  }

  const handleVerifyChage = (text: string) => {
    setVerify(text)
    setValidVerify(password === text)
  }

  const handleFirstNameChage = (text: string) => {
    setFirstName(text)
  }

  const handleLastNameChage = (text: string) => {
    setLastName(text)
  }

  const handlePhoneChage = (text: string) => {
    setPhone(text)
  }

  const handleLocationChage = (text: string) => {
    setLocation(text)
  }

  const handleUpdateView = (text: string) => {

    viewTab === 'signup'
      ? validEmail && availableEmail && availableUsername && validPassword && validVerify
          ? setViewTab('profile')
          : null
      : setViewTab('signup')
  }

  async function handleSignUp(){

    let userDate = {
      username: username, 
      email: email,
      phone: phone,
      location: location,
      first_name: firstName,
      last_name: lastName,
      full_name: firstName + ' ' + lastName,
      following: 0,
      followers: 0,
      favorites: 0
    }

    signUp({
      username,
      password,
      options: {
        userAttributes: {
          email: email,
          phone_number: `+1${phone}`, 
          given_name: firstName,
          family_name: lastName,
          nickname: firstName,
          name: `${firstName} ${lastName}`,
          locale: location,
          'custom:followers': '0',
          'custom:following': '0',
          'custom:favorites': '0'
        }
      }
    })
    .then((response) => {
      console.log(response)
      userDate.user_id = response.userId
      addProfile(userDate, username)
    })
    .catch((error) => {
      console.log('error: ', error)
    })
  }

  const addProfile = (userDate: any, username: string) => {
    const url = 'http://localhost:3000/api/v1/profiles/'; 
    axios.post(url, userDate)
      .then(response => {
        console.log('Profile created successfully:', response.data);
        navigation.navigate('ConfirmEmailScreen', {username: username})
      })
      .catch(error => {
        console.error('Error creating new list:', error)
      });
  }
  
  const displayProfile = () => {
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Create Profile</Text>
        </View>
        <View style={styles.mainFormContainer}>
          <View style={styles.formContainer}>
            <View style={styles.nameFields}>
              <View style={styles.userInputContainerSplit}>
                <User style={styles.label} stroke={'black'} height={22} width={22} />
                <TextInput
                  style={styles.inputSplit}
                  returnKeyType="done"
                  placeholder={'first name'}
                  autoCapitalize="none"
                  value={firstName}
                  onChangeText={(text) => {handleFirstNameChage(text)}}
                />
              </View>
              <View style={styles.userInputContainerSplit}>
                <User style={styles.label} stroke={'black'} height={22} width={22} />
                <TextInput
                  style={styles.inputSplit}
                  returnKeyType="done"
                  placeholder={'name'}
                  autoCapitalize="none"
                  value={lastName}
                  onChangeText={(text) => {handleLastNameChage(text)}}
                />
              </View>
            </View>
            <View style={styles.userInputContainer}>
              <Phone style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'phone'}
                autoCapitalize="none"
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
                autoCapitalize="none"
                value={location}
                onChangeText={(text) => {handleLocationChage(text)}}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => {handleSignUp()}} style={styles.loginButton}>
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
                autoCapitalize="none"
                onChangeText={(text) => {handleUsernameChage(text)}}
              />
              {
                checkingUsername
                  ? <ActivityIndicator style={styles.labelLoading} size={22}/>
                  : availableUsername
                      ? <CheckCircle style={styles.labelError} stroke={'green'} height={22} width={22} />
                      : <CheckCircle style={styles.labelError} stroke={'red'} height={22} width={22} />
              }
            </View>
            {
              availableUsername
                ? null
                : <View style={styles.validMessage}>
                    <Text style={styles.validMessageText}>Username In Use</Text>
                  </View>
            }
            <View style={styles.userInputContainer}>
              <Mail style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'email'}
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {handleEmailChage(text)}}
              />
              {
                availableEmail
                  ? <CheckCircle style={styles.labelError} stroke={'green'} height={22} width={22} />
                  : <CheckCircle style={styles.labelError} stroke={'red'} height={22} width={22} />
              }
            </View>
            {
              availableEmail
                ? null
                : <View style={styles.validMessage}>
                    <Text style={styles.validMessageText}>Email In Use</Text>
                  </View>
            }
            <View style={styles.userInputContainer}>
              <Unlock style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                placeholder={'password'}
                autoCapitalize="none"
                secureTextEntry
                value={password}
                onChangeText={(text) => {handlePasswordChage(text)}}
              />
              {
                validPassword
                  ? <CheckCircle style={styles.labelError} stroke={'green'} height={22} width={22} />
                  : <CheckCircle style={styles.labelError} stroke={'red'} height={22} width={22} />
              }
            </View>
            {
              validPassword
                ? null
                : <View style={styles.validMessage}>
                    <Text style={styles.validMessageText}>A-Z, a-z, 0-9, 8-16 charaactersKraken</Text>
                  </View>
            }
            <View style={styles.userInputContainer}>
              <Unlock style={styles.label} stroke={'black'} height={22} width={22} />
              <TextInput
                style={styles.inputSplit}
                returnKeyType="done"
                autoCapitalize="none"
                placeholder={'verify password'}
                secureTextEntry
                value={verify}
                onChangeText={(text) => {handleVerifyChage(text)}}
              />
              {
                validVerify
                  ? <CheckCircle style={styles.labelError} stroke={'green'} height={22} width={22} />
                  : <CheckCircle style={styles.labelError} stroke={'red'} height={22} width={22} />
              }
            </View>
            {
              validVerify
                ? null
                : <View style={styles.validMessage}>
                    <Text style={styles.validMessageText}>Password & Verify don't match</Text>
                  </View>
            }
          </View>
          <TouchableOpacity onPress={() => {handleUpdateView('profile')}} style={styles.loginButton}>
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
    alignItems: 'flex-start',
  },
  nameFields: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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
    marginTop: 12,
    backgroundColor: 'white'
  },
  userInputContainerSplit: {
    borderColor: 'lightgrey',
    borderWidth: 2,
    width: '49%',
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
  labelError: {
    marginLeft: 8
  },
  labelLoading: {
    marginLeft: 8
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
  },
  validMessage: {
    width: '100%',
    marginTop: 6,
    marginLeft: 6,
  },
  validMessageText: {
    fontWeight: 'bold',
    color: '#e94f4e'
  }
})

export default SignupScreen
