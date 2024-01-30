import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ChevronsLeft, Heart, Home, MapPin, Plus, Search } from 'react-native-feather'
import { YELP_API_KEY } from '@env'
import axios from 'axios'
import Stars from 'react-native-stars'
import { AuthContext } from '../../context/AuthContext'

const currentWidth = Dimensions.get('window').width
const imageWidth = Dimensions.get('window').width - 16
const imageHeight = (imageWidth / 16) * 9

const SearchScreen = () => {
  const navigation = useNavigation()
  
  const {user} = useContext(AuthContext)

  useEffect(() => {
    getUserLists()
    grabFavorites()
  }, [])

  const [searchPlace, setSearchPlace] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [lists, setLists] = useState([])
  const [showLists, setShowLists] = useState(false)

  const handleSearchPlaceChange = (text: string) => {
    setSearchPlace(text)
  }

  const handleSearchLocationChange = (text: string) => {
    setSearchLocation(text)
  }

  const getUserLists = () => {
    const url = `http://localhost:3000/api/v1/members/user/${user.userId}`;
    axios.get(url)
      .then(response => {
        setLists(response.data)
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const grabFavorites = () => {

    const url = `http://localhost:3000/api/v1/favorites/user/${user.userId}`;
    axios.get(url)
      .then(response => {
        setFavorites(response.data)
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const isFavoritePlace = (placeId: string, favorites: string) => {
    const favorite = favorites.find(fav => fav.yelp_id === placeId);
    return favorite ? { isFavorite: true, favoritesId: favorite.favorites_id } : { isFavorite: false };
  };

  const deleteFavorites = (favorites_id: any) => {
    const url = `http://localhost:3000/api/v1/favorites/${favorites_id}`;
    axios.delete(url)
      .then(response => {
        grabFavorites()
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const searchPlaceAndLocation = () => {
    setLoading(true)
    const apiKey = YELP_API_KEY;
    const yelpUrl = 'https://api.yelp.com/v3/businesses/search';
    const query = {
      term: searchPlace,
      location: searchLocation,
    };

    axios.get(yelpUrl, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: query,
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setSearchResults(response.data.businesses)
      setLoading(false)
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error('Error', error.message);
      }
      console.error(error.config);
    });

  }

  const addPlace = (place: any) => {
    const url = `http://localhost:3000/api/v1/places/`;
    console.log(place.image_url)
    let data = {
      name: place.name,
      phone: place.phone,
      address_street: place.location.address1,
      address_state: place.location.state,
      address_city: place.location.city,
      address_zipcode: place.location.zip_code,
      rating: place.rating,
      review_count: place.review_count,
      picture: place.image_url,
      price: place.price,
      yelp_id: place.id,
      yelp_url: place.url,
    }

    let categoriesItem = ''
    
    if(place.categories.length > 0){
      place.categories.map((categoryItem: any) => {
        categoriesItem += categoryItem.alias + ', '
      })
    }

    data.categories = categoriesItem

    console.log(JSON.stringify(data))

    axios.post(url, data)
      .then(response => {
        addToFavoriteTable(response.data.id)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error.nessage);
        throw error; // Rethrow the error for further handling, if necessary
      });
  };

  const AddPlaceToList = (place_id: any, list_id: string) => {
    console.log(`placeId: ${place_id} / listId: ${list_id}`)
    const url = `http://localhost:3000/api/v1/listplaces/`;
    const data = {
      list_id: list_id,
      place_id: place_id
    }
    axios.post(url, data)
      .then(response => {
        console.log('Place added to list: ', response.data)
        setShowLists(false)
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const checkPlaceInPlacesList = (place: any, list_id: string) => {
    console.log(place.id)
    const url = `http://localhost:3000/api/v1/places/yelp/${place.id}`;
    axios.get(url)
      .then(response => {
        console.log(response.data.length)
        response.data.length === 0
          ? addPlaceThenList(place, list_id)
          : AddPlaceToList(response.data[0]['place_id'], list_id)
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const addPlaceThenList = (place: any, list_id: string) => {
    const url = `http://localhost:3000/api/v1/places/`;
    console.log(place.image_url)
    let data = {
      name: place.name,
      phone: place.phone,
      address_street: place.location.address1,
      address_state: place.location.state,
      address_city: place.location.city,
      address_zipcode: place.location.zip_code,
      rating: place.rating,
      review_count: place.review_count,
      picture: place.image_url,
      price: place.price,
      yelp_id: place.id,
      yelp_url: place.url,
    }

    let categoriesItem = ''
    
    if(place.categories.length > 0){
      place.categories.map((categoryItem: any) => {
        categoriesItem += categoryItem.alias + ', '
      })
    }

    data.categories = categoriesItem

    console.log(JSON.stringify(data))

    axios.post(url, data)
      .then(response => {
        AddPlaceToList(response.data.id, list_id)
      })
      .catch(error => {
        console.error('Error fetching user lists:', error.nessage);
        throw error; // Rethrow the error for further handling, if necessary
      });
  };

  const checkPlaceInPlaces = (place: any) => {
    const url = `http://localhost:3000/api/v1/places/yelp/${place.id}`;
    axios.get(url)
      .then(response => {
        response.data.length === 0
          ? addPlace(place)
          : addToFavoriteTable(response.data[0]['place_id'])
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const addToFavoriteTable = (place_id: any) => {
    const url = `http://localhost:3000/api/v1/favorites/`;
    let data = {
      user_id: user.userId,
      place_id: place_id,
    }

    axios.post(url, data)
      .then(response => {
        grabFavorites()
      })
      .catch(error => {
        console.error('Error fetching user lists:', error.nessage);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  function limitStringLength(str: string, maxLength = 35) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }

  const limitStringLength18 = (str: string, maxLength = 20) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }

  const formatAddress = (place) => {
    return limitStringLength(`${place.location.address1} ${place.location.city}, ${place.location.state} ${place.location.zip_code}`)
  }

  const displayPlaces = () => {
    return(
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scrollView}>
        {
          searchResults.map((place) => {
            return(
              <View key={place.yelp_id} style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                  <Image style={styles.placeImage} source={{uri: place.image_url}}/>
                  <View style={styles.overlay}>
                    <View style={styles.overlayContainer}>
                      <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => {setShowLists(!showLists)}} style={styles.menuIconContainer}>
                          <Plus style={styles.iconMenu} strokeWidth={2.5} height={20} width={20}/>
                          <Text style={styles.iconMenuText}>Add To List</Text>
                        </TouchableOpacity>
                        {
                          !showLists
                            ? null 
                            : <View>
                                <Modal
                                  animationType="slide"
                                  transparent={true}
                                  visible={showLists}>
                                  <View style={styles.modalContainer}>
                                    <View style={styles.modalView}>
                                      <ScrollView style={styles.scroll}>
                                        {
                                          lists.map(listItem => {
                                            return(
                                              <View style={styles.ListItemContainer} key={listItem.list_id}>
                                                <View>
                                                  <Text style={{fontWeight: 'bold', fontSize: 20}}>{listItem.name}</Text>
                                                  <Text style={{fontWeight: '500'}}>{listItem.description}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => {checkPlaceInPlacesList(place, listItem.list_id)}}>
                                                  <Plus height={25} width={25} color={'#e94f4e'} />
                                                </TouchableOpacity>
                                              </View>
                                            )
                                          })
                                        }
                                      </ScrollView>
                                      <TouchableOpacity onPress={() => (setShowLists(!showLists))}>
                                        <Text style={styles.closeText}>Close</Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </Modal>
                              </View>
                        }
                        {
                          isFavoritePlace(place.id, favorites).isFavorite
                            ? <TouchableOpacity onPress={() => {deleteFavorites(isFavoritePlace(place.id, favorites).favoritesId)}} style={styles.menuIconContainer}>
                                <Heart style={styles.iconMenuRight} strokeWidth={2.5} height={20} width={20} fill={'white'}/>
                              </TouchableOpacity>
                            : <TouchableOpacity onPress={() => {checkPlaceInPlaces(place)}} style={styles.menuIconContainer}>
                                <Heart style={styles.iconMenuRight} strokeWidth={2.5} height={20} width={20}/>
                              </TouchableOpacity>
                        }
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
    <View style={styles.content}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <View style={styles.searchRow}>
            <Home style={styles.icon} height={18} width={18}/>
            <TextInput 
              style={styles.input}
              placeholder='search'
              returnKeyLabel='Done'
              value={searchPlace}
              onChangeText={handleSearchPlaceChange}
            />
          </View>
          <View style={[styles.searchRow, {marginBottom: 8}]}>
            <MapPin style={styles.icon} height={18} width={18}/>
            <TextInput 
              style={styles.input}
              placeholder='location'
              returnKeyLabel='Done'
              value={searchLocation}
              onChangeText={handleSearchLocationChange}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => {searchPlaceAndLocation()}} style={styles.searchButton}>
          <Search style={styles.searchIcon} height={20} width={20} color={'white'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        {
          loading
            ? <View style={styles.loadingScreen}><ActivityIndicator size="large" color="#00ff00" /></View>
            : searchResults.length > 0
                ? displayPlaces()
                : <View style={styles.noListContainer}><Text style={styles.noListText}>No Results Found</Text></View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 50,
    width: '100%',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  goBack: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#e94f4e',
    marginRight: 8
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
  },
  searchInputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  searchRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    borderColor: 'lightgrey',
    borderWidth: 2,
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 5
  },
  icon: {
    color: '#e94f4e',
    marginRight: 8,
  },
  iconMenu: {
    color: 'white',
    marginRight: 8,
  },
  iconMenuRight: {
    color: 'white'
  },
  iconMenuText: {
    color: 'white',
    fontWeight: '700',
    marginRight: 4
  },
  input: {
    flex: 1,
    fontSize: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
  searchButton: {
    height: '80%',
    backgroundColor: '#e94f4e',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 8,
    overflow: 'hidden',
    marginRight: 8
  },
  searchIcon: {
    color: 'white',
  },
  mainContent: {
    flex: 1,
  },
  loadingScreen: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  }
})

export default SearchScreen
