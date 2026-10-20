import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SectionList,
  StatusBar
} from "react-native";
import {router} from "expo-router";
import Slider from "@react-native-community/slider";
import {useState} from "react";

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

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];


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
  const [value, setValue] = useState<number>(0)
  return (
    <>
    <ScrollView >
        <View style={ styles.container }>
        <Text>Home</Text>
        <Button title = "Home nested" onPress = {() => router.push("/home_nested")} />
        <Button title = "Go Back" onPress = {() => router.canGoBack()} />
        <CustomButton title = "Alert" onPress = {() => handleOpenAlert("custom alert")}/>

          <View
            style={{
              width: "100%",
              backgroundColor: "red",
              paddingHorizontal: 10,
              overflow: "hidden",
              marginVertical: 5,
              borderRadius: 5
            }}
          >
            <Slider
              style={{
                width: "100%",
                height: 40,
              }}
              minimumValue={0}
              maximumValue={100}
              value={value}
              onValueChange={setValue}
              thumbTintColor="orange"
            />
          </View>
      </View>
    </ScrollView>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}

        ListFooterComponent = {
          <>
            <Text className={"text-red-900"}>leer</Text>
            <Text className={"text-red-900"}>leer</Text>
          </>
        }
      />
  </>
  );
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 10,
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
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
  },
  header: {
    fontSize: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 12,
  },
});