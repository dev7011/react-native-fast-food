import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import seed from "../../../lib/seed";

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Search</Text>
      </View>
      <TouchableOpacity
        className={"bg-amber-700 py-3 px-10 rounded-2xl mt-10 mb-2"}
        onPress={() => seed().catch(err => console.log(err))}>
         <Text className={"text-white font-bold"}>Insert value to  Tables (/SEED)</Text>
      </TouchableOpacity>

      <Text className={"text-red-700 text-[10px]"}>Es muss Datenbank-Paramerts angepasst werden</Text>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

