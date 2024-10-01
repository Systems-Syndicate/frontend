import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import ChessGrid from "@/components/Chessboard";
import { ApiProvider } from "@/components/ApiContext";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ApiProvider>
        <View style={styles.gridWrapper}>
          <ChessGrid />
        </View>
      </ApiProvider>
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
