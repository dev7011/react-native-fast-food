import React from 'react';
import {Slot} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAvoidingView, Text, ScrollView, Image, View, Dimensions, ImageBackground, Platform} from "react-native";
import {images} from "@/constants"
import "@/global.css"


const _AuthLayout = () => {
  return (
    <KeyboardAvoidingView behavior={ Platform.OS ? "padding" : "height"}>
      <ScrollView
        className={"bg-white h-full"}
        keyboardShouldPersistTaps={"handled"}
      >
        <View className={"w-full relative"} style={{ height: Dimensions.get("screen").height / 2.25 }}>
          <ImageBackground source={images.loginGraphic} className={"size-full rounded-b-lg"} resizeMode={"stretch"}/>
          <Image source={images.logo} className={"absolute self-center size-48 -bottom-16 z-0"}/>
        </View>

        <Slot />
      </ScrollView>

    </KeyboardAvoidingView>
  );
};

export default _AuthLayout;