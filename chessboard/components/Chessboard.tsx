import React from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";

const { width, height } = Dimensions.get("window");
const GRID_SIZE = 8;
const SQUARE_SIZE = width / GRID_SIZE; // Each square is equally wide

const ChessGrid: React.FC = () => {
  const generateGridData = () => {
    // Generate a grid of 64 cells, alternating colors
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
    <FlatList
      data={generateGridData()}
      renderItem={renderSquare}
      keyExtractor={(item) => item.id}
      numColumns={GRID_SIZE}
      scrollEnabled={false}
      style={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    width: width,
    height: height,
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },
});

export default ChessGrid;
