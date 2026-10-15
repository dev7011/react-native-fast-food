import React, {useState} from 'react';
import {Text, TouchableOpacity, FlatList} from 'react-native';
import {Category} from "../../interfaces";
import cn from "clsx"
import {router} from "expo-router"


const CategoryItem = ({ categories }: {categories: Category[]}) => {
  const [active, setActive] = useState("")

  const filterToggle = (value: string) => {
    const newActive = active === value ? "" : value
    setActive(newActive)

    router.setParams({
      category: newActive
    })
  }

  return (
    <FlatList
      data= {categories}
      renderItem = {({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => filterToggle(item.name)}
            key={index}
            className={cn("filter", active === item.name ? "bg-primary" : "bg-white")}>
            <Text className={"paragraph-semibold text-dark-100"}> {item.name} </Text>
          </TouchableOpacity>
        )
      }}
      keyExtractor={(_, index) => index.toString()}

      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-1 pb-3 mt-2"
    />
  );
};

export default CategoryItem;
