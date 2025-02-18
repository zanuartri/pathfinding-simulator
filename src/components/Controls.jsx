import React from "react";

const Controls = ({
  onSetInitialPoint,
  onSetTargetPoint,
  onRandomMaze,
  onClearGrid,
  onStart,
  onStop,
  onAlgorithmChange,
  onSpeedChange,
  isRunning,
  mode,
  animationSpeed,
}) => {
  return (
    <div className="px-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="flex space-x-2">
        {/* button start */}
        <button
          onClick={onStart}
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[100px]"
        >
          🚀 Start
        </button>
        {/* button stop */}
        <button
          onClick={onStop}
          className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[100px]"
        >
          Stop
        </button>
        {/* button intial point */}
        <button
          onClick={onSetInitialPoint}
          className={`hover:cursor-pointer font-semibold py-2 px-4 rounded-lg transition duration-300 w-[140px] ${
            mode === "initial"
              ? "bg-yellow-300"
              : "bg-gray-700 hover:bg-gray-800 text-white"
          }`}
        >
          Initial Point
        </button>
        {/* button target point */}
        <button
          onClick={onSetTargetPoint}
          className={`hover:cursor-pointer font-semibold py-2 px-4 rounded-lg transition duration-300 w-[140px] ${
            mode === "target"
              ? "bg-yellow-300"
              : "bg-gray-700 hover:bg-gray-800 text-white"
          }`}
        >
          Target Point
        </button>
        {/* button random maze */}
        <button
          onClick={onRandomMaze}
          className="bg-gray-700 hover:bg-gray-800 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[140px]"
        >
          Random Maze
        </button>
        {/* button clear grid */}
        <button
          onClick={onClearGrid}
          className="bg-gray-700 hover:bg-gray-800 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[140px]"
        >
          Clear Grid
        </button>
      </div>

      {/* Dropdown untuk memilih algoritma */}
      <select
        onChange={(e) => onAlgorithmChange(e.target.value)}
        className="bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="dijkstra">Dijkstra</option>
        <option value="a-star">A* (A Star)</option>
      </select>

      {/* Slider untuk mengatur kecepatan */}
      <div className="flex items-center space-x-1">
        <span className="text-gray-700">Speed:</span>
        <input
          type="range"
          min="1"
          max="10"
          value={animationSpeed}
          onChange={(e) => onSpeedChange(e.target.value)}
          className="w-32"
        />
        <span className="text-gray-700 text-sm">{animationSpeed}x</span>
      </div>
    </div>
  );
};

export default Controls;
