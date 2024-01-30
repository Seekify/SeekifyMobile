import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import Stars from 'react-native-stars'
import { Heart, Plus } from 'react-native-feather'

const currentWidth = Dimensions.get('window').width
const imageWidth = Dimensions.get('window').width - 16
const imageHeight = (imageWidth / 16) * 9

const FavoriteScreen = () => {
  const navigation = useNavigation()

  const {user} = useContext(AuthContext)

  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    grabFavorites()
  })

  const grabFavorites = () => {
    const url = `http://localhost:3000/api/v1/favorites/user/${user.userId}`;
    axios.get(url)
      .then(response => {
        setFavorites(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const deleteFavorites = (favorites_id: number) => {
    const url = `http://localhost:3000/api/v1/favorites/${favorites_id}`;
    axios.get(url)
      .then(response => {
        grabFavorites()
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const showLoading = () => {
    return(
      <View style={styles.blankPage}>
        <ActivityIndicator size={'large'} color={'#e94f4e'}/>
      </View>
    )
  }

  const showNoFavorites = () => {
    return(
      <View style={styles.blankPage}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>No Favorites Saved</Text>
      </View>
    )
  }

  const limitStringLength18 = (str: string, maxLength = 20) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }

  const formatAddress = (place) => {
    return limitStringLength18(`${place.address_street} ${place.address_city}, ${place.address_state} ${place.address_zipcode}`)
  }

  const showFavoritesList = () => {
    return(
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scrollView}>
        {
          favorites.map((place) => {
            return(
              <View key={place.yelp_id} style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                  <Image style={styles.placeImage} source={{uri: place.picture}}/>
                  <View style={styles.overlay}>
                    <View style={styles.overlayContainer}>
                      <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => {deleteFavorites(place.favorites_id)}} style={styles.menuIconContainer}>
                          <Heart style={styles.iconMenuRight} strokeWidth={2.5} height={20} width={20} fill={'white'}/>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <View style={styles.overlayBar}>
                          <Text style={styles.overlayTextHeader}>{limitStringLength18(place.name)}</Text>
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
              </View>
            )
          })
        }
        </ScrollView>
      </View>
    )
  }

  return (
    <View>
      {
        loading
          ? showLoading()
          : favorites.length > 0
              ? showFavoritesList()
              : showNoFavorites()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 8,
    backgroundColor: 'white'
  },
  scrollView: {
    height: '100%',
    width: '100%',
  },
  cardContainer: {
    width: imageWidth,
    height: imageHeight,
    backgroundColor: '#e2e2e2',
    borderRadius: 10,
    marginBottom: 16
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  placeImage: {
    height: imageHeight,
    width: imageWidth,
    borderRadius: 8
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: imageWidth,
    height: imageHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    borderRadius: 10
  },
  overlayContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 8,
  },
  menuIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: '#d94f4e',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 8
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
  modalContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: '90%',
    height: 450,
    backgroundColor: 'white',
    borderRadius: 10, 
    overflow: 'hidden',
    alignItems: 'center'
  },
  closeText: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
    color: '#e94f4e'
  },
  scroll: {
    width: '90%',
    marginTop: 16,
    flex: 1,
    borderRadius: 8,
  },
  ListItemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2
  },
  iconMenuRight: {
    color: 'white'
  },
  blankPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FavoriteScreen
