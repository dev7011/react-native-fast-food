import {Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "@/constants";


const Profile = () => {
  return (
    <SafeAreaView className="bg-white h-full">
        <View style = {styles.container} className={"mx-5"} >
          <Text className= "text-red-500 text-2xl">Profile</Text>

          <Pressable
            onPress={() => alert("log out")}
            className="flex-row items-center rounded-lg bg-primary py-2 px-5 mt-10">
            <Image
              source={images.logout}
              className= {"size-8 me-2"}
              resizeMode= "contain"
              tintColor= "#FFFFFF" />
            <Text className={"text-white base-bold"}>Log out</Text>
          </Pressable>

        </View>
    </SafeAreaView>
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