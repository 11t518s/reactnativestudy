import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <Pressable onPress={() => navigate("Two")}>
    <Text>One</Text>
  </Pressable>
);

const ScreenTwo = ({ navigation: { navigate } }) => (
  <Pressable onPress={() => navigate("Three")}>
    <Text>Two</Text>
  </Pressable>
);
const ScreenThree = ({ navigation: { navigate } }) => (
  <Pressable onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Go to search</Text>
  </Pressable>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      // presentation: "modal",
      animation: "fade",
    }}
  >
    <NativeStack.Screen
      name="One"
      component={ScreenOne}
      options={{ title: "1" }}
    />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
