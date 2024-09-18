import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import ChessGrid from "@/components/Chessboard";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gridWrapper}>
        <ChessGrid />
      </View>
    </SafeAreaView>
  );
}

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
  },
});
