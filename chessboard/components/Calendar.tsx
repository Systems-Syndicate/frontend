import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { CalendarList } from "react-native-calendars";

const { width, height } = Dimensions.get("window");
const GRID_SIZE = 8;
const BOARD_SIZE = Math.min(width, height); // Ensure board is smaller than the screen size

const CalendarListComponent = () => {
  return (
    <View style={styles.container}>
      <CalendarList
        pastScrollRange={6} // Show current and future months only
        futureScrollRange={12} // Show the next 12 months
        horizontal={true} // Scroll horizontally
        scrollEnabled={true} // Enable scrolling between months
        // showScrollIndicator={true} // Show a scroll indicator
        current={new Date().toISOString().split("T")[0]} // Start at current month
        style={styles.calendar}
        calendarWidth={BOARD_SIZE}
        calendarHeight={BOARD_SIZE}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE, // Set calendar width equal to the chessboard size
    height: BOARD_SIZE, // Set calendar height equal to the chessboard size
    justifyContent: "center",
    alignItems: "center",
  },
  calendar: {
    width: BOARD_SIZE, // Calendar width equal to the chessboard
    height: BOARD_SIZE, // Calendar height equal to the chessboard
  },
});

export default CalendarListComponent;
