import React, { useState, memo } from "react";

// gunakan memo karena component grid akan sering mengalami re-render
const Grid = memo(
  ({
    rows,
    cols,
    grid,
    initialPoint,
    targetPoint,
    onCellClick,
    onGridChange,
    mode,
  }) => {
    const [isDrawing, setIsDrawing] = useState(false);

    const fillCell = (index, value = "wall") => {
      const newGrid = [...grid];
      newGrid[index] = value;
      onGridChange(newGrid);
    };

    const handleClick = (index) => {
      onCellClick(index);
    };

    return (
      <div className="p-4">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((cell, index) => {
            let cellColor = "bg-white"; // Warna default
            if (index === initialPoint) {
              cellColor = "bg-green-500"; // Warna hijau untuk initial point
            } else if (index === targetPoint) {
              cellColor = "bg-red-500"; // Warna merah untuk target point
            } else if (cell === "visited") {
              cellColor = "bg-yellow-300"; // Warna kuning untuk visited nodes
            } else if (cell === "path") {
              cellColor = "bg-blue-500"; // Warna biru untuk path
            } else if (cell === true || cell === "wall") {
              cellColor = "bg-black"; // Warna hitam untuk maze / wall
            }

            return (
              <div
                key={index}
                className={`w-[20px] h-[20px] rounded-sm border border-gray-300 transition duration-200 ${cellColor}`}
                onClick={() => handleClick(index)}
                onMouseDown={() => {
                  if (mode === null) {
                    setIsDrawing(true);
                    fillCell(index, "wall");
                  }
                }}
                onMouseEnter={() => {
                  if (isDrawing && mode === null) {
                    fillCell(index, "wall");
                  }
                }}
                onMouseUp={() => setIsDrawing(false)}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Grid;
