import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Profile = () => {
  return (
    <View>
      <Text className= "text-red-500 text-2xl">Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
})