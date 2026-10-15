import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import useCartStore from "@/store/cart.store";
import {SafeAreaView} from "react-native-safe-area-context";

const Cart = () => {
  const { cartItems, getTotalPrice  } = useCartStore()
  const totalPrice = getTotalPrice()
  const { getItemPrice, getItemUnitPrice  }= useCartStore()

  return (
    <SafeAreaView>
      <Text>{totalPrice}</Text>
      <FlatList
        data={cartItems}

        renderItem={({item}) => {
            return (
              <Text> {item.name} {item.quantity} {getItemPrice(item)} {getItemUnitPrice(item)} </Text>
            )
          }}

        keyExtractor = {(_, index) => index.toString()}
        contentContainerClassName={"pb-28 px-5"}
      />
    </SafeAreaView>
  );
};

export default Cart;

