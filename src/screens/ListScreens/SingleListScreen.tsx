import { HubInternal } from '@aws-amplify/core/internals/utils'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import { ChevronLeft, ChevronsLeft, Info, MessageSquare, Plus } from 'react-native-feather'
import Stars from 'react-native-stars'
import SingleListCardComponent from '../../components/List/SingleListCardComponent'

const currentWidth = Dimensions.get('window').width
const imageWidth = Dimensions.get('window').width - 16
const imageHeight = (imageWidth / 16) * 9

const SingleListScreen = ({route}) => {
  const navigation = useNavigation()
  const {list_id} = route.params

  const [places, setPlace] = useState([])
  const [viewComments, setViewComments] = useState(false)

  useEffect(() => {
    getListPlaces()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getListPlaces();
    }, []) // Add dependencies here
  );

  const getListPlaces = () => {
    const url = `http://localhost:3000/api/v1/listplaces/${list_id}`;
    axios.get(url)
      .then(response => {
        console.log('User lists:', response.data);
        setPlace(response.data) 
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  };

  const displayPlaces = () => {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        {
          places.map((place) => {
            return(
              <>
                <SingleListCardComponent place={place}/>
              </>
            )
          })
        }
        </ScrollView>
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
          <Text style={styles.listUsers}>o-jandali, daniawareh</Text>
        </View>
        <TouchableOpacity onPress={() => {navigation.navigate('AddPlaceToListScreen', {list_id: list_id})}} style={styles.plusContainer}>
          <Plus style={styles.plus}/>
        </TouchableOpacity>
      </View>
      {
        places.length > 0
          ? displayPlaces()
          : <Text>No places in this list</Text>
      }
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
  cardContainer: {
    width: imageWidth,
    height: imageWidth,
    backgroundColor: '#e2e2e2',
    borderRadius: 10,
    marginVertical: 8
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  placeImage: {
    height: imageWidth,
    width: imageWidth,
    borderRadius: 8
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: imageWidth,
    height: imageWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    borderRadius: 10
  },
  overlayContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10
  },
  overlayBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  overlayTextHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white'
  },
  overlayText: {
    color: 'white',
    fontSize: 22,
  },
  overlayTextSmall: {
    color: 'white',
    fontSize: 18,
  },
  starRating: {
    marginTop: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  rating: {
    color: 'white',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
    paddingTop: 2
  },
  commentComtainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default SingleListScreen
