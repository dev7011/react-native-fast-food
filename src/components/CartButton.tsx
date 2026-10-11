import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {images} from "@/constants";

const CartButton = () => {
  return (
    <TouchableOpacity className={"cart-btn"}>
      <Image source={images.bag} resizeMode="contain" className={"size-5"}/>

      <View className={"cart-badge"}>
        <Text className={"small-bold text-white"}>10</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CartButton

const styles = StyleSheet.create({})