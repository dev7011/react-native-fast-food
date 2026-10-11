import {FlatList, View, Image, Text, Pressable} from "react-native";
import { offers } from "@/constants"
import {SafeAreaView} from "react-native-safe-area-context";
import {Fragment} from "react"
import cn from "clsx"

const Index = () => {
  return (
    <SafeAreaView>
      <FlatList
        data = {offers}

        renderItem= { ({item, index}) => {
          const isEven: boolean = index % 2 === 0

          return (
            <View >
              <Pressable className= {cn("offer-card", isEven ? "flex-row-reverse" : "flex-row")} style = {{backgroundColor: item.color}}>
                  {({pressed}) => {
                    return (
                      <Fragment>
                        <View className="h-48 w-1/2">
                          <Image
                            source={item.image}
                            className="size-full"
                            resizeMode="center"
                          />
                        </View>
                        <View>
                          <Text> { item.title } </Text>
                        </View>
                      </Fragment>
                    )
                  }}
              </Pressable>
            </View>
          )
        }}
        keyExtractor = {(item) => item.id.toString()}
      >
      </FlatList>
    </SafeAreaView>
  );
}

export default Index