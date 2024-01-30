import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { YELP_API_KEY } from '@env'
import axios from 'axios'
import Stars from 'react-native-stars'
import { ChevronsLeft, Youtube } from 'react-native-feather'
import image from '../../assets/yelp-svgrepo-com.svg'
import { AuthContext } from '../../context/AuthContext'
import SingleComment from '../../components/List/SingleComment'
import { useNavigation } from '@react-navigation/native'

const currentWidth = Dimensions.get('window').width
const imageWidth = Dimensions.get('window').width - 16

const SinglePlaceScreen = ({route}) => {
  const {place} = route.params
  const navigation = useNavigation()

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true)

  const [comment, setCommet] = useState('')
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    grabListPlaceComments()
  }, [])

  const grabListPlaceComments = () => {
    const url = `http://localhost:3000/api/v1/listplacecomment/${place.list_place_id}`;
    axios.get(url)
      .then(response => {
        console.log('list place comments:', response.data.length);
        setCommentList(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const addListPlaceComments = () => {
    const url = `http://localhost:3000/api/v1/listplacecomment/`;
    let data = {
      list_place_id: place.list_place_id,
      user_id: user.userId,
      comment: comment
    }
    axios.post(url, data)
      .then(response => {
        console.log('list place comments:', response.data.length);
        setCommentList(response.data)
        setCommet('')
        setLoading(false)
        grabListPlaceComments()
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        throw error; // Rethrow the error for further handling, if necessary
      });
  }

  const handleCommentChange = (text: string) => {
    setCommet(text)
  }

  const limitStringLength18 = (str: string, maxLength = 30) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }

  const showComments = () => {
    return(
      <>
        {
          commentList.map((comment, index) => {
            return(
              <>
                <SingleComment comment={comment} index={index}/>
              </>
            )
          })
        }
      </>
    )
  }

  const showDetails = () => {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image  style={styles.placeImage} source={{uri: place.picture}}/>
        </View>
        <View style={styles.section}>
          <Text style={styles.name}>{limitStringLength18(place.name)}</Text>
          <View style={styles.row}>
            <Text style={styles.address}>{place.address_street}</Text>
            <Text style={styles.address}>{place.address_city}, {place.address_state} {place.address_zipcode}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.starRating}>
              <Stars
                half={true}
                default={place.rating}
                spacing={2}
                starSize={20}
                count={5}
                fullStar={require('../../assets/rating-star-full.png')}
                emptyStar={require('../../assets/rating-star-empty.png')}
                halfStar={require('../../assets/rating-star-half.png')}/
              >
              <Text style={styles.rating}>{place.review_count} Reviews</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionYelp}>
          <View style={styles.yelpContainer}>
            <Image style={styles.image} source={require('../../assets/yelp.png')}/>
          </View>
        </View>
        <View style={styles.sectionYelp}>
          <View style={styles.commentWrapper}>
            <View style={styles.textContainer}>
              <TextInput
                placeholder='Add Comment...'
                editable
                multiline
                numberOfLines={4}
                onChangeText={handleCommentChange}
                value={comment}
                style={styles.input}
              />
            </View>
            <TouchableOpacity onPress={() => {addListPlaceComments()}} style={styles.yelpContainer}>
              <Text style={styles.commentText}>Add Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionYelp}>
          {
            commentList.length > 0
              ? showComments()
              : <Text>No Comments</Text>
          }
        </View>
      </ScrollView>
    )
  }

  return (
    <View style={{height: '100%', width: '100%'}}>
      <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.backIcon}>
        <ChevronsLeft height={30} width={30} color={'white'}/>
      </TouchableOpacity>
      {
        loading
          ? <View style={styles.loadingScreen}><ActivityIndicator size="large" color="#00ff00" /></View>
          : showDetails()
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  loadingScreen: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backIcon: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 2,
    padding: 4,
    backgroundColor: 'rgba(150, 150, 150, .7)',
    borderRadius: 30
  },
  imageContainer: {
    height: imageWidth,
    width: imageWidth,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    overflow: 'hidden'
  },
  placeImage: {
    height: '100%',
    width: '100%'
  },
  section: {
    paddingVertical: 16,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  sectionYelp: {
    paddingVertical: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22
  },
  address: {
    fontSize: 16
  },
  starRating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rating: {
    marginLeft: 8,
    fontSize: 16,
    paddingTop: 2,
    marginBottom: 8
  },
  yelpContainer: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#e94f4e',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8
  },
  image: {
    height: 24,
    width: 24,
  },
  textContainer: {
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 2,
    marginBottom: 8
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    margin: 8,
    fontSize: 16
  },
  commentText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  commentContainer: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'lightgrey'
  },
  commentContent: {
    marginBottom: 8
  }
})

export default SinglePlaceScreen
