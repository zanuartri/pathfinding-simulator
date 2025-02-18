import React from "react";

const Sidebar = ({ stats }) => {
  return (
    <div className="p-4 w-64 space-y-2">
      {/* info grid */}
      <div className="flex space-x-2">
        <div className="bg-green-500 w-[20px] h-[20px] rounded"></div>
        <span>Inital Point</span>
      </div>
      <div className="flex space-x-2">
        <div className="bg-red-500 w-[20px] h-[20px] rounded"></div>
        <span>Target Point</span>
      </div>
      <div className="flex space-x-2">
        <div className="bg-black w-[20px] h-[20px] rounded"></div>
        <span>Walls</span>
      </div>

      {/* Informasi Statistik */}
      <div className="mt-8">
        <h3 className="font-semibold">Statistik</h3>
        <div className="text-gray-700 text-sm">
          <span>Waktu Eksekusi:</span> {stats.executionTime.toFixed(2)} ms
        </div>
        <div className="text-gray-700 text-sm">
          <span>Panjang Jalur:</span> {stats.pathLength}
        </div>
        <div className="text-gray-700 text-sm">
          <span>Jumlah Node:</span> {stats.visitedNodes}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
