import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Sidebar from "./components/Sidebar";
import { dijkstra } from "./algorithms/dijkstra";
import { aStar } from "./algorithms/aStar";

const rows = 20;
const cols = 40;

function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: rows * cols }, () => false)
  );
  const [initialPoint, setInitialPoint] = useState(null);
  const [targetPoint, setTargetPoint] = useState(null);
  const [mode, setMode] = useState(null);
  const [algorithm, setAlgorithm] = useState("dijkstra");
  const [isRunning, setIsRunning] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const [stats, setStats] = useState({
    visitedNodes: 0,
    executionTime: 0,
    pathLength: 0,
  });

  // untuk hapus visited node dan path
  const clearVisitedAndPath = () => {
    const newGrid = grid.map((cell, index) => {
      if (cell === "visited" || cell === "path") {
        return false; // Hapus visited dan path
      }
      return cell; // Pertahankan nilai lainnya
    });
    setGrid(newGrid);
  };

  // handler untuk button initial point
  const handleSetInitialPoint = () => {
    setMode("initial");
  };

  // handler untuk button target point
  const handleSetTargetPoint = () => {
    setMode("target");
  };

  // handler untuk set initial / target cell ketika diklik
  const handleCellClick = (index) => {
    if (mode === "initial") {
      setInitialPoint(index);
      grid[index] = false;
      setMode(null);
    } else if (mode === "target") {
      setTargetPoint(index);
      grid[index] = false;
      setMode(null);
    }
  };

  // handler untuk button random maze
  const handleRandomMaze = () => {
    // reset
    setGrid(Array.from({ length: rows * cols }, () => false));
    setInitialPoint(null);
    setTargetPoint(null);
    setStats({ visitedNodes: 0, executionTime: 0, pathLength: 0 }); // Reset statistik
    // generate random maze
    const newGrid = grid.map(() => Math.random() > 0.75);
    setGrid(newGrid);
  };

  // handler untuk button clear grid
  const handleClearGrid = () => {
    setGrid(Array.from({ length: rows * cols }, () => false));
    setInitialPoint(null);
    setTargetPoint(null);
    setStats({ visitedNodes: 0, executionTime: 0, pathLength: 0 }); // Reset statistik
  };

  // handler untuk slider kecepatan
  const handleSpeedChange = (speed) => {
    setAnimationSpeed(speed);
  };

  // handler untuk dropdown algoritma
  const handleAlgorithmChange = (value) => {
    setAlgorithm(value); // Set algoritma baru
    clearVisitedAndPath(); // Hapus visitedNodes dan path
    setStats({ visitedNodes: 0, executionTime: 0, pathLength: 0 }); // Reset statistik
  };

  // handler untuk button start
  const handleStart = () => {
    if (initialPoint === null || targetPoint === null) {
      alert("Silakan tentukan initial point dan target point terlebih dahulu!");
      return;
    }

    setIsRunning(true);

    // jalankan sesuai algoritma yg dipilih
    let result;
    if (algorithm === "dijkstra") {
      result = dijkstra(grid, initialPoint, targetPoint, rows, cols);
    } else if (algorithm === "a-star") {
      result = aStar(grid, initialPoint, targetPoint, rows, cols);
    }

    // animasi hasil algoritma
    visualizeAlgorithm(result);
    setIsRunning(false);
  };

  // handler untuk button stop
  const handleStop = () => {
    console.log("stop");
    timeoutIds.forEach((id) => clearTimeout(id));
    setTimeoutIds([]);
    setIsRunning(false);
  };

  // animasi / visualisasi
  const visualizeAlgorithm = (result) => {
    console.log("visualize algorithm");
    timeoutIds.forEach((id) => clearTimeout(id));
    setTimeoutIds([]);

    const { visitedNodesInOrder, path } = result;
    const newTimeoutIds = [];

    // Hitung durasi animasi
    const totalDuration =
      (visitedNodesInOrder.length + path.length) * (20 / animationSpeed);

    // Animasi untuk visited nodes
    visitedNodesInOrder.forEach((node, index) => {
      const timeoutId = setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[node] = "visited"; // Tandai node sebagai visited
          return newGrid;
        });
      }, (20 / animationSpeed) * index);
      newTimeoutIds.push(timeoutId);
    });

    // Animasi untuk path
    const pathTimeoutId = setTimeout(() => {
      path.forEach((node, index) => {
        const timeoutId = setTimeout(() => {
          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[node] = "path";
            return newGrid;
          });
        }, (20 / animationSpeed) * index);
        newTimeoutIds.push(timeoutId);
      });
    }, (20 / animationSpeed) * visitedNodesInOrder.length);

    newTimeoutIds.push(pathTimeoutId);
    setTimeoutIds(newTimeoutIds);

    // Perbarui statistik setelah animasi selesai
    setTimeout(() => {
      setStats(() => ({
        visitedNodes: visitedNodesInOrder.length,
        executionTime: totalDuration, // Gunakan durasi animasi sebagai execution time
        pathLength: path.length,
      }));
    }, totalDuration);
  };

  return (
    <>
      {/* disable mobile view */}
      <div className="block md:hidden relative w-full h-screen">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-sm font-bold text-center">
            Fitur ini hanya tersedia di desktop
          </div>
        </div>
      </div>

      {/* desktop view */}
      <div className="hidden min-h-screen md:flex justify-center items-center p-10">
        <div className="max-w-[1440px] mx-auto p-4 bg-white rounded-xl">
          <Header />
          <Controls
            onSetInitialPoint={handleSetInitialPoint}
            onSetTargetPoint={handleSetTargetPoint}
            onRandomMaze={handleRandomMaze}
            onClearGrid={handleClearGrid}
            onStart={handleStart}
            onStop={handleStop}
            onAlgorithmChange={handleAlgorithmChange}
            onSpeedChange={handleSpeedChange}
            isRunning={isRunning}
            mode={mode}
            animationSpeed={animationSpeed}
          />
          <div className="flex mt-2">
            <Grid
              rows={rows}
              cols={cols}
              grid={grid}
              initialPoint={initialPoint}
              targetPoint={targetPoint}
              onCellClick={handleCellClick}
              onGridChange={setGrid}
              mode={mode}
            />
            <Sidebar stats={stats} /> {/* Teruskan statistik ke Sidebar */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
