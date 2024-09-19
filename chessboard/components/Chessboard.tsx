import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, FlatList } from "react-native";

const { width, height } = Dimensions.get("window");
const GRID_SIZE = 8;
const BOARD_SIZE = Math.min(width, height); // Ensure board is smaller than the screen size
const SQUARE_SIZE = BOARD_SIZE / GRID_SIZE;

const ChessGrid: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean | null>(null); // Manages API state (initially null)

  // Function to simulate API call (replace with actual API call logic)
  const fetchStatusFromAPI = async () => {
    try {
      // Simulated API call, replace with actual API request
      const response = await fetch("http://localhost:3801/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      return data.isOn; // Assume the API returns an object with isOn field
    } catch (error) {
      console.error("Failed to fetch API status:", error);
      return null;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const status = await fetchStatusFromAPI();
      setIsOn(status);
    }, 1000); // Poll every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
      {isOn === null ? (
        <Text>Loading...</Text>
      ) : !isOn ? (
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
