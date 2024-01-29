import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { ChevronLeft, ChevronsLeft, Info, MessageSquare, Plus } from 'react-native-feather'
import Stars from 'react-native-stars'

const currentWidth = Dimensions.get('window').width
const imageWidth = Dimensions.get('window').width - 16
const imageHeight = (imageWidth / 16) * 9

const SingleListCardComponent = (props: any) => {
  const {place} = props
  const navigation = useNavigation()

  const [commentCount, setCommentCount] = useState(0)

  function limitStringLength(str, maxLength = 35) {
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
    return limitStringLength(`${place.address_street} ${place.address_city}, ${place.address_state} ${place.address_zipcode}`)
  }

  useEffect(() => {
    grabListPlaceComments()
  })

  const grabListPlaceComments = () => {
    const url = `http://localhost:3000/api/v1/listplacecomment/${place.list_place_id}`;
    axios.get(url)
      .then(response => {
        console.log('list place comments:', response.data.length);
        setCommentCount(response.data.length)
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('SinglePlaceScreen', {place: place})}} key={place.yelp_id} style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.placeImage} source={{uri: place.picture}}/>
        <View style={styles.overlay}>
          <View style={styles.overlayContainer}>
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
                <Text style={styles.rating}>{place.review_count} Reviews</Text>
              </View>
              <View style={styles.commentComtainer}>
                <MessageSquare height={20} width={20} fill={'#e94f4e'} stroke={'#e94f4e'}/>
                <Text style={styles.rating}>{commentCount}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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

export default SingleListCardComponent
