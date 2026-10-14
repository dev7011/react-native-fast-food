import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {router} from "expo-router";

const HomeNested = () => {
  return (
    <View style={styles.container}>
      <Text>HomeNested</Text>
        <Button title = "Go Back"
           onPress = {() => router.back()} />
    </View>
  );
};

export default HomeNested;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

