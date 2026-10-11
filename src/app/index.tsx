import {FlatList, View, Image, Text, Pressable} from "react-native";
import {images, offers} from "@/constants"
import {SafeAreaView} from "react-native-safe-area-context";
import {Fragment} from "react"
import cn from "clsx"

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data = {offers}

        renderItem= { ({item, index}) => {
          const isEven: boolean = index % 2 === 0

          return (
            <View >
              <Pressable
                  className= {cn("offer-card", isEven ? "flex-row-reverse" : "flex-row")}
                  style = {{backgroundColor: item.color}}
                  android_ripple={{color: "#FFFF22"}}
              >
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
                        <View className= {cn("offer-card__info", isEven ? "pl-10" : "pr-10")}>
                          <Text className= "h1-bold text-white leading-tight">{ item.title }</Text>
                          <Image
                            source={images.arrowRight}
                            className= {"size-10"}
                            resizeMode= "contain"
                            tintColor= "#FFFFFF"
                          />
                        </View>
                      </Fragment>
                    )
                  }}
              </Pressable>
            </View>
          )
        }}
        keyExtractor = {(item) => item.id.toString()}
        contentContainerClassName={"pb-28 px-5"}
      />
    </SafeAreaView>
  );
}

export default Index