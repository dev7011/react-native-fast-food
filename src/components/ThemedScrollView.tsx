import React from 'react'

import {Image, ScrollView, View, ViewProps} from "react-native";
import {images} from "@/constants";
import {SafeAreaView} from "react-native-safe-area-context";

const ThemedScrollView = ({children, style, ...props}: ViewProps) => {
  return (
    <View className= "flex-1">
      <Image className= "absolute w-full bg-primary-400 z-0"/>
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}
        >
          <Image
            source={images.logo}
            className= "w-12 h-10 mt-10 mb-5 mx-auto"
            resizeMode="cover"
          />

          {children}

        </ScrollView>
    </View>
  )
}

export default ThemedScrollView