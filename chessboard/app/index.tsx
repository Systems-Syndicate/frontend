// Index.tsx
import { Text, View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import React from "react";
import ChessGrid from "@/components/Chessboard";
import { ApiProvider, useApi } from "@/components/ApiContext"; // Combine imports
import Overlay from "@/components/Overlay"; // Import the overlay component

const { width, height } = Dimensions.get("window");
const BOARD_SIZE = Math.min(width, height);

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ApiProvider>
        <Content />
      </ApiProvider>
    </SafeAreaView>
  );
}

const Content = () => {
  const { isOn, loggedIn } = useApi(); // Access context states

  // The preview will automatically re-render when isOn or loggedIn changes
  const preview =
    (isOn && loggedIn) || (!isOn && loggedIn) ? (
      <View style={styles.test}>
        <Text>You are logged in! YAY</Text>
      </View>
    ) : (
      <ChessGrid />
    );

  return (
    <View style={styles.gridWrapper}>
      {preview}
      {/* Display overlay when isOn is false and loggedIn is true */}
      {!isOn && loggedIn && <Overlay />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full height of the screen
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  gridWrapper: {
    flex: 1, // Ensures ChessGrid can expand within available space
    justifyContent: "center",
    alignItems: "center",
    width: BOARD_SIZE, // Set the grid size to the screen size
    height: BOARD_SIZE,
    position: "relative", // Allow Overlay to be positioned absolutely over this
  },
  test: {
    flex: 1,
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
