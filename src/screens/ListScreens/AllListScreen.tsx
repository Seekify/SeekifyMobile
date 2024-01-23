import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Edit, List, Menu, Plus, Search } from 'react-native-feather';

const AllListScreen = () => {
  const navigation = useNavigation()

  const {signOutUser, user} = useContext(AuthContext)

  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    fetchUserLists()
  }, [])

  const fetchUserLists = () => {
    const url = `http://localhost:3000/api/v1/list/user/${user.username}`;
    return axios.get(url)
      .then(response => {
        console.log('User lists:', response.data);
        setLists(response.data) // The response data is the list of user lists
      })
      .catch(error => {
        console.error('Error fetching user lists:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  };

  const formatDateOrTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
  
    // Check if the date is today
    if (date.toDateString() === now.toDateString()) {
      // Format as time
      return 'Today';
    } else {
      // Format as MM/DD/YYYY
      return date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
    }
  };

  const displayLists = () => {
    return(
      <View>
        {
          lists.length > 0
            ? <View>
                {
                  lists.map((list) => {
                    return(
                      <View style={styles.listContainer} key={list.list_id}>
                        <View style={styles.listRow}>
                          <Text style={styles.listName}>{list.name}</Text>
                          <Text style={styles.listDetail}>{list.place_count} Spots</Text>
                        </View>
                        <View style={[styles.listRow, styles.bottomListRow]}>
                          <Text style={styles.listDetail}>{list.last_added}</Text>
                          <Text style={styles.listDetail}>{formatDateOrTime(list.last_updated)}</Text>
                        </View>
                      </View>
                    )
                    })
                }
              </View>
            : <View><Text>No Lists Added</Text></View>
        }
      </View>
    )
  }

  return (
    <View style={styles.content}>
      <View style={styles.topMenu}>
        <Menu stroke={'#e94f4e'}/>
        <Text style={styles.centerHeader}>SEEKIFY</Text>
        <Plus stroke={'#e94f4e'}/>
      </View>
      {
        loading 
          ? <View><Text>Loading...</Text></View>
          : displayLists()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  topMenu: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  centerHeader: {
    fontSize: 21,
    fontWeight: 'bold'
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  listRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomListRow: {
    marginTop: 8
  },
  listName: {
    fontSize: 18,
    fontWeight: '600'
  },
  listDetail: {
    fontSize: 14,
    fontWeight: '500'
  }
})

export default AllListScreen
