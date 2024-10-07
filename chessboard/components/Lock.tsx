import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { GeneralPatternLock } from "react-native-patternlock-authentication";
import { useApi } from "@/components/ApiContext"; // Import useApi to access context

const { width, height } = Dimensions.get("window");
const BOARD_SIZE = Math.min(width, height); // Chessboard size
const GRID_SIZE = 8; // Chessboard grid size (assuming 8x8 chessboard)
const SQUARE_SIZE = BOARD_SIZE / GRID_SIZE; // Size of each square

const LOCK_SIZE = SQUARE_SIZE * 4;
const LOCK_POSITION_TOP = SQUARE_SIZE * 2;
const LOCK_POSITION_LEFT = SQUARE_SIZE * 2;

const PATTERN_DIMENSION = 3; // Pattern dimension (3x3)
const CORRECT_UNLOCK_PATTERN = "012345"; // Correct pattern

const Lock: React.FC = () => {
  const { setLoggedIn } = useApi(); // Access setLoggedIn from the context

  const onPatternMatch = () => {
    // Set loggedIn to true when the correct pattern is matched
    setLoggedIn(true);
  };

  const onWrongPattern = () => {
    // Handle wrong pattern
  };

  const onPatternMatchAfterDelay = () => {
    // Handle delayed pattern match
  };

  const onWrongPatternAfterDelay = () => {
    // Handle delayed wrong pattern
  };

  return (
    <View style={styles.lockContainer}>
      <GeneralPatternLock
        containerDimension={PATTERN_DIMENSION}
        containerWidth={LOCK_SIZE}
        containerHeight={LOCK_SIZE}
        correctPattern={CORRECT_UNLOCK_PATTERN}
        dotsAndLineColor="#380102"
        defaultDotRadius={10}
        snapDotRadius={15}
        snapDuration={100}
        lineStrokeWidth={5}
        wrongPatternColor="red"
        matchedPatternColor="green"
        onPatternMatch={onPatternMatch} // Use the new pattern match handler
        onWrongPatternAfterDelay={onWrongPatternAfterDelay}
        onPatternMatchAfterDelay={onPatternMatchAfterDelay}
        onWrongPattern={onWrongPattern}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lockContainer: {
    position: "absolute", // Overlay on the chessboard
    top: LOCK_POSITION_TOP, // Position the lock in the center 4x4 squares
    left: LOCK_POSITION_LEFT, // Same for the left position
    width: LOCK_SIZE, // Ensure the size fits the 4x4 grid
    height: LOCK_SIZE, // Ensure the height matches the width
    zIndex: 1, // Ensure it is above the chessboard
  },
});

export default Lock;
