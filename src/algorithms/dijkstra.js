export const dijkstra = (grid, start, target, rows, cols) => {
  const visitedNodesInOrder = []; // Menyimpan urutan node yang dikunjungi
  const path = [];
  const distances = Array(rows * cols).fill(Infinity);
  const previousNodes = Array(rows * cols).fill(null);
  distances[start] = 0;

  const unvisitedNodes = Array.from({ length: rows * cols }, (_, i) => i);

  while (unvisitedNodes.length > 0) {
    // Cari node dengan jarak terpendek
    unvisitedNodes.sort((a, b) => distances[a] - distances[b]);
    const closestNode = unvisitedNodes.shift();

    // Jika jarak terdekat adalah Infinity, berarti semua node yang tersisa tidak dapat dijangkau
    if (distances[closestNode] === Infinity) break;

    // Tandai node sebagai visited dan simpan ke visitedNodesInOrder
    visitedNodesInOrder.push(closestNode);

    // Jika node adalah target, selesai
    if (closestNode === target) {
      let currentNode = target;
      while (currentNode !== start && currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previousNodes[currentNode];
      }
      if (currentNode === start) {
        path.unshift(start);
      } else {
        console.error("Path reconstruction failed. No valid path found.");
      }
      break;
    }

    // Perbarui jarak ke neighbors
    const neighbors = getNeighbors(closestNode, rows, cols);
    for (const neighbor of neighbors) {
      if (!grid[neighbor]) {
        const newDistance = distances[closestNode] + 1;
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previousNodes[neighbor] = closestNode;
        }
      }
    }
  }

  // Cek apakah target ditemukan
  if (distances[target] === Infinity) {
    alert("Target tidak dapat ditemukan karena terhalang oleh wall.");
    return { visitedNodesInOrder: [], path: [], distances };
  }

  return { visitedNodesInOrder, path, distances };
};

// Fungsi untuk mendapatkan neighbors dari suatu node
const getNeighbors = (node, rows, cols) => {
  const neighbors = [];
  const row = Math.floor(node / cols);
  const col = node % cols;

  if (row > 0) neighbors.push(node - cols); // Atas
  if (row < rows - 1) neighbors.push(node + cols); // Bawah
  if (col > 0) neighbors.push(node - 1); // Kiri
  if (col < cols - 1) neighbors.push(node + 1); // Kanan

  return neighbors.filter(
    (neighbor) => neighbor >= 0 && neighbor < rows * cols
  );
};
