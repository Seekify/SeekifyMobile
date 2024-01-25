import React from 'react';
import { View } from 'react-native';
import { Star } from 'react-native-feather';
import Feather from 'react-native-vector-icons/Feather';

const RatingComponent = (props) => {
  const {rating} = props
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(5)].map((_, i) => {
        const iconName = i < fullStars ? 'star' : i === fullStars && halfStar ? 'star-half' : 'star';
        return <Star key={i} height={24} width={24} color="blue" fill={'blue'} />;
      })}
    </View>
  );
};

export default RatingComponent;