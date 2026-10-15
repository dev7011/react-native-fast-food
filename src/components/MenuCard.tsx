import {Text, TouchableOpacity, Image, Platform} from 'react-native'
import {MenuItem} from "../../interfaces";
import cn from "clsx"

const MenuCard = ({ item: { image_url, name, price }}: { item: MenuItem}) => {
  const imageUrl = `${image_url}?project=${image_url}`;


  return (
    <TouchableOpacity className={cn("menu-card", "shadow-primary")}  style={Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787'}: {}}>
      <Image source={{ uri: imageUrl }}
             className="absolute -top-10 size-32"
             resizeMode={"contain"} />
      <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
      <TouchableOpacity onPress={() => alert("add")}>
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
export default MenuCard


