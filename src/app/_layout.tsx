import {SplashScreen, Stack, useRouter} from "expo-router";
import {useFonts} from "expo-font";
import "@/global.css"
import {useEffect} from "react";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: 'https://ac100ee88f6a340a3c00e53844700de5@o4512245548515328.ingest.de.sentry.io/4512245619753040'
});

export default function TabLayout() {
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('@/assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('@/assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('@/assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('@/assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('@/assets/fonts/Quicksand-Light.ttf'),
  });

  const router = useRouter();
  const isAuthenticated = false

  useEffect(() => {
    if (!isAuthenticated)
      router.replace("/sign_in")
  }, []);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync()

  }, [fontsLoaded, error])

  useEffect(() => {
    const timer = setTimeout(() => {
      throw new Error(`Sentry automatic test error ${timer}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
