import React, { useEffect, useState } from "react";
import CalendarExample from "./CalendarExample";

const GRID_SIZE = 8;

const ChessGrid: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean | null>(null);
  const [boardSize, setBoardSize] = useState<number>(0); // State to hold the board size
  const SQUARE_SIZE = boardSize / GRID_SIZE;

  const fetchStatusFromAPI = async () => {
    try {
      const response = await fetch("http://localhost:3801/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      return data.isOn; 
    } catch (error) {
      console.error("Failed to fetch API status:", error);
      return null;
    }
  };

  useEffect(() => {
    // Set the board size when the component mounts
    const newBoardSize = Math.min(window.innerWidth, window.innerHeight);
    setBoardSize(newBoardSize);

    const intervalId = setInterval(async () => {
      const status = await fetchStatusFromAPI();
      setIsOn(status);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const generateGridData = () => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => ({
      id: index.toString(),
      color: (Math.floor(index / GRID_SIZE) + (index % GRID_SIZE)) % 2 === 0 ? "black" : "white",
    }));
  };

  const renderSquare = (item: { id: string; color: string }) => (
    <div
      key={item.id}
      style={{
        width: `${SQUARE_SIZE}px`,
        height: `${SQUARE_SIZE}px`,
        backgroundColor: item.color,
      }}
    />
  );

  return (
    <div>
      {isOn === null ? (
        <CalendarExample />
      ) : !isOn ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${SQUARE_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${SQUARE_SIZE}px)`,
            justifyContent: "center",
            alignItems: "center",
            width: `${boardSize}px`,
            height: `${boardSize}px`,
            margin: "auto",
          }}
        >
          {generateGridData().map(renderSquare)}
        </div>
      ) : (
        <p>User is scanned</p>
      )}
    </div>
  );
};

export default ChessGrid;
