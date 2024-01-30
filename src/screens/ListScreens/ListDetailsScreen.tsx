import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ChevronsLeft, Edit, Edit2, Edit3, Plus, Search, User, X } from 'react-native-feather'
import { TextInput } from 'react-native-gesture-handler'

const ListDetailsScreen = ({route}) => {
  const {list_id} = route.params
  const navigation = useNavigation()

  const [listDetails, setListDetails] = useState('')
  const [listMembers, setListMembers] = useState([])

  const [searchUsers, setSearchUsers] = useState(false)
  const [userSearch, setUserSearch] = useState('')
  const [searchedUsers, setSearchedUsers] = useState([])

  const [loading, setLoading] = useState(true)

  const [editDetails, setEditDetails] = useState(false)

  useEffect(() => {
    getListDetails()
  }, [])

  const getListDetails = () => {
    const url = `http://localhost:3000/api/v1/list/id/${list_id}`;
    axios.get(url)
      .then(response => {
        setListDetails(response.data[0]) 
        getListMembers()
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  };

  const getListMembers = () => {
    const url = `http://localhost:3000/api/v1/members/list/${list_id}`;
    axios.get(url)
      .then(response => {
        console.log('ListMembers:', response.data);
        setListMembers(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const showEditDetails = () => {
    return(
      <View>
        <Text>Editing details</Text>
      </View>
    )
  }

  const handleUserSearch = (text: string) => {
    setUserSearch(text)
    searchForUsers(text)
  }

  const searchForUsers = (search_term: string) => {
    if(search_term === ''){
      null
    } else {
      const url = `http://localhost:3000/api/v1/profiles/search/${search_term}`;
      axios.get(url)
        .then(response => {
          console.log('ListMembers:', response.data);
          setSearchedUsers(response.data)
        })
        .catch(error => {
          console.error('Error fetching places:', error);
          throw error; // Rethrow the error for further handling, if necessary
        });
    }
  }

  const addMemberToList = (user_id: string) => {
    const url = `http://localhost:3000/api/v1/members/`;
    const userData = {
      list_id: list_id,
      user_id: user_id
    }
    axios.post(url, userData)
      .then(response => {
        console.log('list member added:', response.data);
        setUserSearch('')
        setSearchUsers(false)
        getListMembers()
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const ShowUserSearch = () => {
    return(
      <View style={{marginTop: 8}}>
        <View style={styles.row}>
          <View style={styles.searchContainer}>
            <User style={{marginRight: 8}} height={20} width={20} color={'#e94f4e'}/>
            <TextInput 
              style={styles.input}
              placeholder='search'
              returnKeyLabel='Done'
              value={userSearch}
              autoCapitalize='none'
              onChangeText={handleUserSearch}
            />
          </View>
          <TouchableOpacity style={styles.searchIcon} onPress={() => {}}>
            <Search height={20} width={20} color={'white'}/>
          </TouchableOpacity>
        </View>
        {
          userSearch != ''
            ? searchedUsers.length === 0
                ? null
                : <View style={styles.searchResultsContainer}>
                    <ScrollView>
                      {
                        searchedUsers.map((currentUser) => {
                          return(
                            <View style={styles.userInfo}>
                              <View style={styles.userInfoDetails}>
                                <Text style={{fontWeight: '600', fontSize: 20}}>{currentUser.username}</Text>
                                <Text>{currentUser.full_name}</Text>
                              </View>
                              <TouchableOpacity onPress={() => {addMemberToList(currentUser.user_id)}}>
                                <Plus height={20} width={20} color={'#e94f4e'}/>
                              </TouchableOpacity>
                            </View>
                          )
                        })
                      }
                    </ScrollView>
                  </View>
            : null
        }
      </View>
    )
  }

  const showMembers = () => {
    return(
      <View style={styles.memberListContainer}>
        {
          listMembers.map((member) => {
            return(
              <View key={member.user_id} style={styles.singleMember}>
                <View style={styles.singleMemberRow}>
                  <Text style={styles.singleMemberUser}>{member.username}</Text>
                  <Text style={styles.singleMemberstatus}>({member.status})</Text>
                </View>
                <View>
                  <Text style={styles.singleMemberstatus}>{member.full_name}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <ChevronsLeft style={styles.goBack}/>
        </TouchableOpacity>
        <Image style={styles.listImage} />
        <View style={{flex: 1}}>
          <Text style={styles.listName}>OC Dinner Dates</Text>
          <Text style={styles.listUsers}>{listDetails.description}</Text>
        </View>
        <TouchableOpacity>
          <Edit3 style={styles.plus} stroke={'#e94f4e'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {
          editDetails
            ? showEditDetails()
            : null
        }
        <View style={styles.section}>
          <View style={styles.sectionheader}>
            <Text style={styles.sectionText}>
              Members
            </Text>
            {
              searchUsers
                ? <TouchableOpacity onPress={() => {setSearchUsers(!searchUsers)}}>
                    <X style={styles.plus} stroke={'#e94f4e'}/>
                  </TouchableOpacity>
                : <TouchableOpacity onPress={() => {setSearchUsers(!searchUsers)}}>
                    <Plus style={styles.plus} stroke={'#e94f4e'}/>
                  </TouchableOpacity>
            }
          </View>
          {
            searchUsers
              ? ShowUserSearch()
              : null 
          }
          {
            listMembers.length > 0
              ? showMembers()
              : null
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: 'white'
  },
  scrollView: {
    height: '100%',
    width: '100%',
  },
  noListContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  noListText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24
  },
  header: {
    height: 70,
    width: '100%',
    backgroundColor: '#E9E9E9',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  goBack: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#e94f4e',
    marginRight: 8
  },
  listName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  listUsers: {
    fontSize: 12
  },
  info: {
    height: 20,
    width: 20,
    color: 'black',
    marginRight: 8
  },
  plusContainer: {
    padding: 3,
    borderRadius: 7,
    backgroundColor: '#e94f4e'
  },
  plus: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listImage: {
    height: 45,
    width: 45,
    backgroundColor: 'grey',
    borderRadius: 7,
    marginRight: 8
  },
  content: {
    flex: 1,
  },
  section: {
    marginHorizontal: 16,
    paddingVertical: 16,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  sectionheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionText: {
    fontWeight: '600',
    fontSize: 18
  }, 
  memberListContainer: {
    marginTop: 16
  },
  singleMember: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomColor: 'lightgrey',
    borderTopColor: 'lightgrey',
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  singleMemberRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  singleMemberUser: {
    fontSize: 20,
    fontWeight: '600'
  },
  singleMemberstatus: {
    fontWeight: '600'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
    width: '100%',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 8
  },
  input: {
    flex: 1, 
    fontSize: 18,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
  icon: {
    marginRight: 10, 
  },
  searchIcon: {
    padding: 8,
    backgroundColor: '#e94f4e',
    borderRadius: 8,
    marginLeft: 8
  },
  searchResultsContainer: {
    marginTop: 2,
    height: 300,
    width: '100%',
    borderRadius: 8
  },
  userInfo: {
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userInfoDetails: {
    flex: 1
  }
})

export default ListDetailsScreen
