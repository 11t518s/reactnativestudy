import React, { useRef } from "react";
import { Animated, PanResponder } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;

  const opacity = POSITION.y.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1],
  });
  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        POSITION.setValue({
          x: dx,
          y: dy,
        });
      },

      onPanResponderRelease: () => {
        POSITION.extractOffset();
      },
    })
  ).current;
  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: [...POSITION.getTranslateTransform()],
        }}
      />
    </Container>
  );
}
