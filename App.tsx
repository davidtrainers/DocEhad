import React from "react";
import { View, StyleSheet } from "react-native";
import HomePage from "./screens/HomePage";

export default function App() {
  return (
    <View style={styles.container}>
      <HomePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
