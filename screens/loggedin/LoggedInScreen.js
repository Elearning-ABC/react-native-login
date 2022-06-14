import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoggedInScreen = ({route, navigation}) => {
    const {displayName, email, phoneNumber, uid} = route.params;
  return (
    <View>
      <Text>Display name: {displayName}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone number: {phoneNumber ? phoneNumber : "null"}</Text>
      <Text>uid: {uid}</Text>
    </View>
  )
}

export default LoggedInScreen

const styles = StyleSheet.create({})