import React, {useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import SearchBar from '@/components/SearchBar';
import ThemedScrollView from "@/components/ThemedScrollView";
import useFetch from "@/services/useFetch";
import {getMenu} from "@/services/api";
import MenuCard from "@/components/MenuCard";
import {MenuItem} from "../../../interfaces";
import cn from "clsx"
import {SafeAreaView} from "react-native-safe-area-context";
import CartButton from "@/components/CartButton";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { data, refetch, loading } = useFetch({fn: getMenu})

  useEffect(() => {
    const timeOut = setTimeout( async () => {
      console.log(searchQuery)
    }, 500)
    return () => clearTimeout(timeOut)
  }, [searchQuery]);

  useEffect(() => {

  }, []);


  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data = {data}
        renderItem={({item, index}) => {
          const isFirstRightColItem = index % 2 === 0
          return (
            <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? 'mt-10': 'mt-0')}>
              <MenuCard item= { item as MenuItem } />
            </View>
          )
        }}

        keyExtractor= {(_, index) => index.toString()}
        numColumns={2}


        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"

        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">Search</Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                </View>
              </View>

              <CartButton />
            </View>
            <SearchBar />
          </View>
        )}
      >
      </FlatList>
    </SafeAreaView>
  );
}
export default Search


