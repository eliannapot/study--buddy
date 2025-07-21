import "expo-dev-client";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import colors from "./config/colors";

import { AuthProvider } from "../contexts/AuthContext";
import { BadgeProvider } from "../contexts/BadgeContext";
import { CategoryProvider } from "../contexts/CategoryContext";
import { EventsProvider } from "../contexts/EventContext";
import { TasksProvider } from "../contexts/TaskContext";
import { UserBadgeProvider } from "../contexts/UserBadgeContext";
import { UsersProvider } from "../contexts/UserContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  
  const [loaded, error] = useFonts({
    InterBlack : require("../assets/fonts/inter/Inter-Black.otf"),
    InterBold : require("../assets/fonts/inter/Inter-Bold.otf"),
    InterBlackItalic : require("../assets/fonts/inter/Inter-BlackItalic.otf"),
    InterExtraBold : require("../assets/fonts/inter/Inter-ExtraBold.otf"),
    InterLight : require("../assets/fonts/inter/Inter-Light-BETA.otf"),
    InterLightItalic: require("../assets/fonts/inter/Inter-LightItalic-BETA.otf"),
    InterMedium : require("../assets/fonts/inter/Inter-Medium.otf"),
    InterRegular : require("../assets/fonts/inter/Inter-Regular.otf"),
    InterSemiBold : require("../assets/fonts/inter/Inter-SemiBold.otf"),
    InterItalic : require("../assets/fonts/inter/Inter-Italic.otf"),  
    InterBoldItalic : require("../assets/fonts/inter/Inter-BoldItalic.otf"),

    LailaBold : require("../assets/fonts/laila/Laila-Bold.ttf"),
    LailaLight : require("../assets/fonts/laila/Laila-Light.ttf"),
    LailaMedium : require("../assets/fonts/laila/Laila-Medium.ttf"),
    LailaRegular : require("../assets/fonts/laila/Laila-Regular.ttf"),
    LailaSemiBold : require("../assets/fonts/laila/Laila-SemiBold.ttf"),

    NunitoBlack : require("../assets/fonts/nunito/Nunito-Black.ttf"),
    NunitoBold : require("../assets/fonts/nunito/Nunito-Bold.ttf"),
    NunitoExtraBold : require("../assets/fonts/nunito/Nunito-ExtraBold.ttf"),
    NunitoExtraLight : require("../assets/fonts/nunito/Nunito-ExtraLight.ttf"),
    NunitoLight : require("../assets/fonts/nunito/Nunito-Light.ttf"),
    NunitoRegular : require("../assets/fonts/nunito/Nunito-Regular.ttf"),
    NunitoSemiBold : require("../assets/fonts/nunito/Nunito-SemiBold.ttf"),
    NunitSemiBoldItalic : require("../assets/fonts/nunito/Nunito-SemiBoldItalic.ttf"),
    NunitoItalic : require("../assets/fonts/nunito/Nunito-Italic.ttf"),
    NunitoBlackItalic : require("../assets/fonts/nunito/Nunito-BlackItalic.ttf"),
    NunitoExtraBoldItalic : require("../assets/fonts/nunito/Nunito-ExtraBoldItalic.ttf"),
    NunitoLightItalic : require("../assets/fonts/nunito/Nunito-LightItalic.ttf"),    
    

  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  
  return (
  <>
  <AuthProvider>
  <CategoryProvider>
  <TasksProvider>
  <EventsProvider>
  <BadgeProvider>
  <UserBadgeProvider>
  <UsersProvider>
  <StatusBar backgroundColor = {colors.primary} />
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.lightbackground,
      headerTitleStyle: {
        fontSize: 24,
        fontFamily: "InterSemiBold",
      },
      contentStyle: {
        padding: 5,
        paddingBottom: 0,
        backgroundColor: colors.lightbackground,
      },
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen name="index" options={{ title: "Welcome" }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="(screens)" options={{ headerShown: false }} />
    <Stack.Screen name="auth" options={{ headerShown: false }} />

  </Stack>
  </UsersProvider>
  </UserBadgeProvider>
  </BadgeProvider>
  </EventsProvider>
  </TasksProvider>
  </CategoryProvider>
  </AuthProvider>
  </>
  );
};

export default RootLayout;