import React from "react";
import styled from "styled-components/native";

const Btn = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.mainBgColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'> = ({
  navigation,
}) => (
  <Btn
    onPress={() => navigation.navigate("Stack", { screen: "Three" })}
    style={{ flex: 1, justifyContent: "center", alienItems: "center" }}
  >
    <Title>Movie</Title>
  </Btn>
);

export default Movies;
