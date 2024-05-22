import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { COLORS, commonStyles } from "../constants";
import { Rating } from 'react-native-ratings';
import { AirbnbRating } from '@rneui/themed';
import { Divider } from '@rneui/themed';
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { useCreateReviewMutation } from '../store/productApiSlice';
import { useEffect } from 'react';

const RatingAndReviews = ({product, refetch}) => {
  const {userInfo} = useSelector(state=> state.auth);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [createReview, {isLoading, isSuccess}] = useCreateReviewMutation();

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

  const handleSubmit = async()=> {
    if(!comment) {
      Alert.alert("Error", "Comment is required");
      return;
    }
    if(userInfo.name) {
      try {
        const response = await createReview({
          id: product._id, data: {comment, rating}
        }).unwrap();
        Alert.alert("Success", response.message);
        refetch();
      } catch (err) {
        Alert.alert("Error", err?.data?.message || err.error);
      }
    } else {
      Alert.alert("Error", "You have to signin first");
    }
  }
  useEffect(() => {
    if(isSuccess) {
      setComment("");
    }    
  }, [isSuccess])
  
  return (
    <View style={{marginVertical: 10}}>
      <View>
        <Text style={commonStyles.titleTxt}>Average Ratings</Text>
        <Rating
          ratingCount={5}
          showRating
          readonly
          startingValue={product.rating}
          showReadOnlyText={false}
          style={{
            paddingVertical: 10,
          }}
        />
      </View>
      <Text style={[commonStyles.titleTxt, {marginVertical: 10}]}>Reviews</Text>
      {/* Revews */}
      {product.reviews.length === 0 && (
        <View style={[commonStyles.columnCenter, {marginVertical: 10}]}>
          <View style={styles.bigIconWrapper}>
            <MaterialIcons name="message" size={50} color={COLORS.primary} />
          </View>
          <Text style={{color: COLORS.secondary}}>This product has no reviews yet. Be the first one to write a review.</Text>
        </View>
      )}

      {product.reviews.map(review => (
        <View style={{marginVertical: 10}} key={review._id}>
          <View style={[commonStyles.rowSB, {marginVertical: 10}]}>
            <View style={commonStyles.row}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>{review.clientName.split("")[0]}</Text>
            </View>
              {/* <Avatar size={32} rounded title={review.clientName.split("")[0]} containerStyle={{backgroundColor: COLORS.primary}} /> */}
              <Text style={{fontWeight: "bold"}}>{review.clientName}</Text>
            </View>
            <View style={commonStyles.row}>
              <AntDesign name="star" size={20} color="gold" />
              <Text style={{fontSize: 18}}>{review.rating}</Text>
            </View>
          </View>
          <Text>{review.comment}</Text>
          <Text style={{textAlign: "right", color: COLORS.gray2, marginVertical: 10}}>{review.createdAt.split("T")[0]}</Text>
        </View>
      ))}
      {userInfo ? (
        <View>
          <View>
            <AirbnbRating
              count={5}
              defaultRating={5}
              onFinishRating={ratingCompleted}
              style={{
                paddingVertical: 10,
              }}
            />
          </View>
          <View>
            <TextInput
              editable
              placeholder='Write a comment'
              multiline
              numberOfLines={4}
              maxLength={40}
              onChangeText={text => setComment(text)}
              value={comment}
              style={styles.commentBox}
            />
          </View>
          <View>
            {isLoading && <ActivityIndicator/>}
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={{color: COLORS.lightWhite}}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : <Text>Please Sign In to review this product</Text>}
      <Divider style={{marginVertical: 10}}/>
    </View>
  )
}

export default RatingAndReviews;

const styles = StyleSheet.create({
  bigIconWrapper: {
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,    
  },
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTxt: {
    color: COLORS.lightWhite,
    fontSize: 18,
  },
  commentBox: {
    marginVertical: 20,
    borderColor: COLORS.primary,
    borderWidth: 1,
    height: 60,
    padding: 10,
    borderRadius: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

})