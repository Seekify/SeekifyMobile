import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SingleComment = (props) => {
  const {comment, index} = props

  function convertToMMDDYYYY(dateString: string) {
    // Convert the date string to a Date object
    const date = new Date(dateString);

    // Extract the month, day, and year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because getMonth() returns 0-11
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    // Format and return the date in MM/DD/YYYY format
    return `${month}/${day}/${year}`;
}

  return (
    <View key={index} style={styles.commentContainer}>
      <View style={styles.commentContent}>
        <Text style={{fontSize: 16}}>{comment.comment}</Text>
      </View>
      <View style={styles.bottomBar}>
        <Text style={{fontWeight: '600'}}>{comment.user_id}</Text>
        <Text>{convertToMMDDYYYY(comment.created_at)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  bottomBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default SingleComment
