import React, {useState} from 'react';
import { Text, View } from 'react-native';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import {Ionicons} from "@expo/vector-icons"
import {Asset, useAssets} from 'expo-asset'
import {useFonts} from "expo-font";

const loadFonts = (fonts)=> fonts.map((font) => Font.loadAsync(font))
const loadImages = (images)=> images.map((image) => {
  if(typeof image === 'string') {
    return Image.prefetch(image);
  }
  return Asset.loadAsync(image)
})

export default function App() {
  const [assets] = useAssets([require('./test.jpeg')])
  const [loaded] = useFonts([Ionicons.font])
  if (!assets || !loaded) {
    return <AppLoading />
  }
  return (<View>
    <Text>not finㄱㅏ나다라마바사아자차카타파하</Text>
  </View>)
}
