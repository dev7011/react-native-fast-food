import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {deleteToken} from "@/services/auth_storage";
import {router} from "expo-router";


const Profile = () => {

  const handleLogout = async () => {
    try {
      await deleteToken();
      router.replace("/sign_in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <SafeAreaView className={"flex-1 justify-center items-center w-full p-5"}>
      <Text className= "text-red-500 text-2xl">Profile</Text>
      <TouchableOpacity
        className={"bg-primary px-10 py-2 rounded-2xl flex-center flex-row gap-x-1"}
        onPress={handleLogout}
      >
          <Text className={"font-bold-bold text-white"}>Log out</Text>
      </TouchableOpacity>
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