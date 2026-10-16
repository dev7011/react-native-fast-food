import {Redirect, Tabs} from "expo-router";
import {Image, Text, View } from "react-native";
import "@/global.css";
import cn from "clsx"

import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "~/interfaces";
import useCartStore from "@/store/cart.store";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="tab-icon">
    <Image source={icon} className="size-7" resizeMode="contain" tintColor={focused ? '#FE8C00' : '#5D5F6D'} />

    <Text className={cn('text-sm font-bold', focused ? 'text-primary':'text-gray-200')}>
      {title}
    </Text>
  </View>
)


export default function TabsLayout() {
  const { isAuthenticated, user } = useAuthStore();
  const { cartItems  } = useCartStore();

  //console.log(JSON.stringify(user, null, 2));
  if(!isAuthenticated) return <Redirect href="/sign_in" />


  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,

      tabBarItemStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 8
      },

      tabBarIconStyle: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0
      },

      tabBarStyle: {
        borderRadius: 50,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        height: 80,
        position: 'absolute',
        bottom: 40,
        backgroundColor: 'white',
        shadowColor: '#1a1a1a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          headerBackButtonDisplayMode: "minimal",

          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.search} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarBadge: cartItems.length > 0 ? cartItems.length : 0,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title="Cart" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
