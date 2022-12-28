import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootTabScreenProps } from "../types";

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
  return (
    <React.Fragment>
      <View>
        <Text>Featured & Recommended</Text>
      </View>
      <View>
        <Text>Special Deals</Text>
      </View>
      <View>
        <Text>Browse by Genres</Text>
      </View>
      <View>
        <Text>Popular Title</Text>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  h2: {},
});

export default HomeScreen;
