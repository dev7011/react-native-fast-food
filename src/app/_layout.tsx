import {SplashScreen, Stack, useRouter, useSegments} from "expo-router";
import {useFonts} from "expo-font";
import "@/global.css";
import { useEffect } from "react";
import { getToken } from "@/services/auth_storage";

export default function TabLayout() {
  const [fontsLoaded, error] = useFonts({
    "QuickSand-Bold": require('@/assets/fonts/Quicksand-Bold.ttf'),
    "QuickSand-Medium": require('@/assets/fonts/Quicksand-Medium.ttf'),
    "QuickSand-Regular": require('@/assets/fonts/Quicksand-Regular.ttf'),
    "QuickSand-SemiBold": require('@/assets/fonts/Quicksand-SemiBold.ttf'),
    "QuickSand-Light": require('@/assets/fonts/Quicksand-Light.ttf'),
  });

  const router = useRouter();
  const segments = useSegments();
  const rootSegment = segments[0];

  useEffect(() => {
    if (!rootSegment) return;

    async function checkAuth() {
      try {
        const token = await getToken();

        token
          ? router.replace("/")
          : router.replace("/sign_in")

      } catch (error) {
        console.error("Auth check failed:", error);
        if (rootSegment !== "(auth)" )
          router.replace("/sign_in")

      } finally {
        await SplashScreen.hideAsync();
      }
    }
    checkAuth();

  }, [rootSegment, router]);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync()

  }, [fontsLoaded, error])

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}