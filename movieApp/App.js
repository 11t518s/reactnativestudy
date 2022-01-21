import React, { useEffect, useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tab";
import Stack from "./navigation/Stack";

export default function App() {
  const [assets] = useAssets([require("./test.jpeg")]);
  const [loaded] = useFonts([Ionicons.font]);
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    colorScheme === "dark" ? setIsDark(true) : setIsDark(false);
  }, [colorScheme]);
  if (!assets && !loaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      {/*<Tabs />*/}
      <Stack />
    </NavigationContainer>
  );
}
