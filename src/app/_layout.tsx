import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import "@/global.css"
import {useEffect} from "react";

export default function TabLayout() {
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('@/assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('@/assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('@/assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('@/assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('@/assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync()
     console.log("Layout layout loaded", fontsLoaded);
  }, [fontsLoaded, error])

  return (
    <Stack
    />
  );
}
