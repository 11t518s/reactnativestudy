import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import {Text} from 'react-native';
import * as Font from 'expo-font';
import {Ionicons} from "@expo/vector-icons"


export default function App() {
  const [ready, setReady] = useState(false)
  const onFinish = () => setReady(true)
  const startLoading = async () => {
    // await Font.loadAsync(Ionicons.font)
    // await Image.prefetch('https://microchipdeveloper.com/local--files/32bit:mz-arch-memory-prefetch-module/prefetch-buffer-v2.png')
  }
  if (!ready) {
    return (
      <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error}/>
    );
  }
  return <Text>testdsafasdf</Text>
}


