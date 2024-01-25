import { HubInternal } from '@aws-amplify/core/internals/utils'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { ChevronLeft, ChevronsLeft, Info, Plus } from 'react-native-feather'
import Stars from 'react-native-stars'

const currentWidth = Dimensions.get('window').width
const imageWidth = Dimensions.get('window').width - 16
const imageHeight = (imageWidth / 16) * 9

const SingleListScreen = ({route}) => {
  const navigation = useNavigation()
  const {list_id} = route.params

  const [places, setPlace] = useState([])

  useEffect(() => {
    getListPlaces()
  }, [])

  const getListPlaces = () => {
    const url = `http://localhost:3000/api/v1/listplaces/${list_id}`;
    axios.get(url)
      .then(response => {
        console.log('User lists:', response.data);
        setPlace(response.data) // The response data is the list of user lists
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  };

  function limitStringLength(str, maxLength = 35) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }

  const formatAddress = (place) => {
    return limitStringLength(`${place.address_street} ${place.address_city}, ${place.address_state} ${place.address_zipcode}`)
  }

  const displayPlaces = () => {
    return (
      <View style={styles.container}>
        {
          places.map((place) => {
            return(
              <View key={place.yelp_id} style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                  <Image style={styles.placeImage} source={{uri: 'https://s3-media1.fl.yelpcdn.com/bphoto/Uja67ZEHFWO4D9P_WShKBA/o.jpg'}}/>
                  <View style={styles.overlay}>
                    <View style={styles.overlayContainer}>
                      <View style={styles.overlayBar}>
                        <Text style={styles.overlayTextHeader}>{place.name}</Text>
                        <Text style={styles.overlayText}>({place.price})</Text>
                      </View>
                      <View style={styles.overlayBar}>
                        <Text style={styles.overlayTextSmall}>{formatAddress(place)}</Text>
                      </View>
                      <View style={styles.overlayBar}>
                        <View style={styles.starRating}>
                          <Stars
                            half={true}
                            default={place.rating}
                            spacing={3}
                            starSize={20}
                            count={5}
                            fullStar={require('../../assets/rating-star-full-white.png')}
                            emptyStar={require('../../assets/rating-star-empty-whote.png')}
                            halfStar={require('../../assets/rating-star-half-white.png')}/
                          >
                        </View>
                        <View>
                          <Text style={styles.rating}>{place.review_count} Reviews</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <ChevronsLeft style={styles.goBack}/>
        </TouchableOpacity>
        <Image style={styles.listImage} />
        <View style={{flex: 1}}>
          <Text style={styles.listName}>OC Dinner Dates</Text>
          <Text style={styles.listUsers}>o-jandali, daniawareh</Text>
        </View>
        <View style={styles.plusContainer}>
          <Plus style={styles.plus}/>
        </View>
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
    padding: 8,
    backgroundColor: 'white'
  },
  header: {
    height: 70,
    width: '100%',
    backgroundColor: '#E9E9E9',
    borderBottomColor: 'grey',
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
    borderRadius: 10
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
  }
})

export default SingleListScreen
