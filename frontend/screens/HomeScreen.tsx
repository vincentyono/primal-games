import React from "react";
import { View, Text } from "react-native";
import { RootTabScreenProps } from "../types";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  return (
    <React.Fragment>
      <View>
        <Text>Hello World!</Text>
      </View>
    </React.Fragment>
  );
};

export default HomeScreen;
