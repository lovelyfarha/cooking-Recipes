
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SystemBars } from "react-native-edge-to-edge";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const customTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f9fafb',
      card: '#ffffff',
      text: '#111827',
      border: '#e5e7eb',
      primary: '#f97316',
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={customTheme}>
        <SystemBars style="dark" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: '#111827',
            },
            headerTintColor: '#111827',
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="recipe/[id]" 
            options={{ 
              presentation: 'card',
              headerBackTitle: 'Back',
            }} 
          />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
