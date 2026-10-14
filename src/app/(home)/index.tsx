import {Button, Text, View, StyleSheet, Pressable, TouchableOpacity, Alert} from "react-native";
import {router} from "expo-router";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};

const CustomButton = ( {title, onPress}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={onPress}
      activeOpacity={0.2}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  )
}

const handleOpenAlert = ( message: string) => {
   Alert.alert("Warning", message, [
       {
         text: "Cancel",
         style: "cancel"
      },
     {
       text: "OK",
       style: "destructive",
       onPress: () => { console.log("clicked OK") }
     }
    ]
   )
}

const Index = () => {


  return (
    <View style={ styles.container }>
      <Text>Home</Text>
      <Button title = "Home nested" onPress = {() => router.push("/home_nested")} />
      <Button title = "Go Back" onPress = {() => router.canGoBack()} />
      <CustomButton title = "Alert" onPress = {() => handleOpenAlert("custom alert")}/>

    </View>
  );
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn :{
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  }

})
