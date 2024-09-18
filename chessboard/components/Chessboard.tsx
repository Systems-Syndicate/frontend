import React from "react";
import { Text, View, StyleSheet, Dimensions, FlatList } from "react-native";

const { width, height } = Dimensions.get("window");
const GRID_SIZE = 8;
const BOARD_SIZE = Math.min(width, height); // Ensure board is smaller than the screen size
const SQUARE_SIZE = BOARD_SIZE / GRID_SIZE;

const ChessGrid: React.FC = () => {
  const generateGridData = () => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => ({
      id: index.toString(),
      color:
        (Math.floor(index / GRID_SIZE) + (index % GRID_SIZE)) % 2 === 0
          ? "black"
          : "white",
    }));
  };

  const renderSquare = ({ item }: { item: { id: string; color: string } }) => (
    <View style={[styles.square, { backgroundColor: item.color }]} />
  );

  return (
    <>
      {1 === 1 ? (
        <FlatList
          data={generateGridData()}
          renderItem={renderSquare}
          keyExtractor={(item) => item.id}
          numColumns={GRID_SIZE}
          scrollEnabled={false}
          style={styles.grid}
        />
      ) : (
        <Text>User is scanned</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    width: BOARD_SIZE, // Set the grid size to be the board size
    height: BOARD_SIZE, // Ensures the grid is square
    alignSelf: "center", // Centers the grid in the view
  },
  square: {
    width: SQUARE_SIZE, // Square size based on the grid
    height: SQUARE_SIZE,
  },
});

export default ChessGrid;
