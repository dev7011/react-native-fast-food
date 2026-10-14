♦️ mit appwrite
https://appwrite.io/docs/quick-starts/react-native

npx expo install react-native-appwrite react-native-url-polyfill

♦️ Button call seed()

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