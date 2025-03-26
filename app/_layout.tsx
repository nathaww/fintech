import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const colorScheme = useColorScheme();
  const { isLoaded, isSignedIn } = useAuth();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    console.log(isSignedIn);
    // if (!isLoaded) return;

    // const inAuthGroup = segments[0] === '(authenticated)';

    // if (isSignedIn && !inAuthGroup) {
    //   router.replace('/(authenticated)/(tabs)/home');
    // } else if (!isSignedIn) {
    //   router.replace('/');
    // }
  }, [isSignedIn]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, animation: "none" }}
      />
      <Stack.Screen
        name="help"
        options={{ title: "Help", animation: "none" }}
      />
      <Stack.Screen
        name="verify/[email]"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor:
              colorScheme === "light"
                ? Colors.backgroundLight
                : Colors.backgroundDark,
          },
          animation: "ios_from_right",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor:
              colorScheme === "light"
                ? Colors.backgroundLight
                : Colors.backgroundDark,
          },
          animation: "ios_from_right",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor:
              colorScheme === "light"
                ? Colors.backgroundLight
                : Colors.backgroundDark,
          },
          headerRight: () => (
            <Link href={"/help"}>
              <FontAwesome
                name="question-circle"
                size={30}
                color={Colors.primaryLight}
              />
            </Link>
          ),
          animation: "ios_from_right",
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      >
        <InitialLayout />
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default RootLayoutNav;
