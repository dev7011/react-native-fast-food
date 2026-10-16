import {Image, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {images} from "@/constants";
import useCartStore from "@/store/cart.store";

const CartButton = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <TouchableOpacity className={"cart-btn"}>
      <Image source={images.bag} resizeMode="contain" className={"size-5"}/>

      <View className={"cart-badge"}>
        <Text className={"small-bold text-white"}>{totalItems}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CartButton