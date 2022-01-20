import React, {useState} from 'react';
import { Text, View } from 'react-native';
import AppLoading from 'expo-app-loading'
import {Ionicons} from "@expo/vector-icons"
import {Asset, useAssets} from 'expo-asset'
import {useFonts} from "expo-font";
import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./navigation/Tab";



export default function App() {
  const [assets] = useAssets([require('./test.jpeg')])
  // const [loaded] = useFonts([Ionicons.font])
  if (!assets) {
    return <AppLoading />
  }
  return <NavigationContainer>
    <Tabs/>
  </NavigationContainer>
}
