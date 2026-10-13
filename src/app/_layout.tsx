import {SplashScreen, Stack} from "expo-router"
import {useFonts} from "expo-font"
import "@/global.css"
import {useEffect} from "react"
import useAuthStore from "@/store/auth.store"

export default function TabLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('@/assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('@/assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('@/assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('@/assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('@/assets/fonts/Quicksand-Light.ttf'),
  })

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()

  }, [fontsLoaded, error])

  useEffect(() => {
    fetchAuthenticatedUser()
      .then((data) => console.log(data))
      .catch((error) => {console.log(error)})
  }, [])

  if(!fontsLoaded || isLoading) {
    return null;
  }


  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
